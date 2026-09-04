// =============================================================================
// Edge Function: recibir-solicitud
// =============================================================================
// Único endpoint público del buzón. El formulario de la web hace POST aquí.
// - Valida la solicitud (campos mínimos, tipo, tamaño).
// - Sube los adjuntos + la constancia PDF al bucket privado "hc-adjuntos".
// - Inserta la fila en public.hc_solicitudes con la service_role key.
// La service_role key vive SOLO en las variables de entorno de la función,
// nunca llega al navegador. La web jamás toca la tabla ni el bucket directamente.
//
// Deploy:  supabase functions deploy recibir-solicitud --no-verify-jwt
// Secrets: SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY se inyectan automáticamente.
//          Configura ALLOWED_ORIGIN con el dominio del sitio.
// =============================================================================

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SERVICE_KEY  = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const ALLOWED_ORIGIN = Deno.env.get('ALLOWED_ORIGIN') ?? '*'
const BUCKET = 'hc-adjuntos'

const MAX_FILE_BYTES = 6 * 1024 * 1024   // 6 MB por archivo (post-decodificación)
const TIPOS = ['propia', 'tercero', 'menor', 'fallecido']

const cors = {
  'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'content-type',
}

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, 'Content-Type': 'application/json' } })

// Convierte un data URL (data:tipo;base64,xxxx) a bytes
function dataUrlToBytes(dataUrl: string): { bytes: Uint8Array; mime: string } {
  const m = /^data:([^;]+);base64,(.*)$/s.exec(dataUrl)
  if (!m) throw new Error('Formato de archivo inválido')
  const mime = m[1]
  const bin = atob(m[2])
  const bytes = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i)
  return { bytes, mime }
}

function safeName(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 80)
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors })
  if (req.method !== 'POST') return json(405, { ok: false, message: 'Método no permitido' })

  let body: any
  try {
    body = await req.json()
  } catch {
    return json(400, { ok: false, message: 'Cuerpo inválido' })
  }

  // ── Validación mínima ─────────────────────────────────────────────────────
  const { tipo, radicado, solicitante, finalidad, constanciaPdf, adjuntos = {} } = body ?? {}
  if (!TIPOS.includes(tipo)) return json(400, { ok: false, message: 'Tipo de solicitud inválido' })
  if (!radicado || typeof radicado !== 'string') return json(400, { ok: false, message: 'Radicado requerido' })
  if (!solicitante?.numDoc || !solicitante?.nombre) return json(400, { ok: false, message: 'Datos del solicitante incompletos' })
  if (!finalidad) return json(400, { ok: false, message: 'Finalidad requerida' })

  const supabase = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } })

  // ── Subir adjuntos + constancia al bucket privado ───────────────────────────
  const stored: { campo: string; path: string; nombre: string; tipo: string }[] = []
  const subir = async (campo: string, nombre: string, dataUrl: string) => {
    const { bytes, mime } = dataUrlToBytes(dataUrl)
    if (bytes.byteLength > MAX_FILE_BYTES) throw new Error(`El archivo "${nombre}" supera el tamaño permitido`)
    const path = `${radicado}/${campo}_${safeName(nombre)}`
    const { error } = await supabase.storage.from(BUCKET).upload(path, bytes, { contentType: mime, upsert: true })
    if (error) throw error
    stored.push({ campo, path, nombre, tipo: mime })
  }

  try {
    for (const [campo, f] of Object.entries<any>(adjuntos)) {
      if (f?.contenido) await subir(campo, f.nombre ?? campo, f.contenido)
    }
    if (constanciaPdf) await subir('constancia', `Constancia_${radicado}.pdf`, constanciaPdf)
  } catch (e) {
    return json(400, { ok: false, message: String((e as Error).message ?? e) })
  }

  // ── Insertar la solicitud (payload sin los binarios) ────────────────────────
  const { constanciaPdf: _pdf, adjuntos: _adj, ...payload } = body
  const origen_ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null

  const { error } = await supabase.from('hc_solicitudes').insert({
    radicado, tipo, payload, adjuntos: stored, origen_ip,
  })
  if (error) {
    // Limpia los archivos si la inserción falló (evita huérfanos)
    await supabase.storage.from(BUCKET).remove(stored.map((s) => s.path))
    const dup = (error as any).code === '23505'
    return json(dup ? 409 : 500, { ok: false, message: dup ? 'Solicitud duplicada' : 'No se pudo registrar la solicitud' })
  }

  return json(200, { ok: true, radicado })
})
