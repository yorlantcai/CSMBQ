import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, FileText, ShieldCheck, Upload, CheckCircle, Download, Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { VIEWPORT_CONFIG } from '@/utils/animations'
import {
  HC_TIPOS, HC_DOC_TYPES, HC_DOC_TYPES_PACIENTE, HC_PARENTESCOS, HC_RESERVA_LEGAL,
  type HCTipoConfig,
} from '@/constants'
import { generarConstanciaHC, type HCConstanciaData } from '@/utils/generarConstanciaHC'

type Tipo = HCTipoConfig['id']

interface FormState {
  // Solicitante / representante / paciente-autorizante
  solTipoDoc: string; solNumDoc: string; solExpedidoEn: string
  solNombre: string; solDireccion: string; solTelefono: string; solCorreo: string
  // Autorizado (solo "tercero")
  autTipoDoc: string; autNumDoc: string; autNombre: string
  autDireccion: string; autTelefono: string; autCorreo: string
  // Paciente (menor / fallecido)
  pacTipoDoc: string; pacNumDoc: string; pacNombre: string
  // Específicos
  estadoPaciente: string
  parentesco: string
  fechaAtencion: string
  fechaFallecimiento: string
  finalidad: string
  // Consentimiento
  aceptaReserva: boolean
  aceptaHabeas: boolean
}

const INITIAL: FormState = {
  solTipoDoc: 'C.C.', solNumDoc: '', solExpedidoEn: '',
  solNombre: '', solDireccion: '', solTelefono: '', solCorreo: '',
  autTipoDoc: 'C.C.', autNumDoc: '', autNombre: '', autDireccion: '', autTelefono: '', autCorreo: '',
  pacTipoDoc: 'C.C.', pacNumDoc: '', pacNombre: '',
  estadoPaciente: 'Menor de edad', parentesco: HC_PARENTESCOS[0],
  fechaAtencion: '', fechaFallecimiento: '', finalidad: '',
  aceptaReserva: false, aceptaHabeas: false,
}

interface FileState {
  docSolicitante?: File
  docPaciente?: File
  docAutorizado?: File
  docParentesco?: File
}

const MAX_FILE_MB = 6
const inputCls =
  'w-full px-4 py-2.5 rounded-xl border border-clinic-100 bg-clinic-50/40 text-dark placeholder:text-dark/35 text-sm focus:outline-none focus:ring-2 focus:ring-clinic-500/30 focus:border-clinic-400 transition-all duration-200'
const labelCls = 'block text-xs font-semibold text-dark/60 uppercase tracking-wider mb-1.5'

type InputHandler = React.ChangeEventHandler<HTMLInputElement>
type SelectHandler = React.ChangeEventHandler<HTMLSelectElement>

// ── Subcomponentes de campo (a nivel de módulo para no perder el foco) ──────
function Field({ label, value, onChange, type = 'text', placeholder, required }: {
  label: string; value: string; onChange: InputHandler; type?: string; placeholder?: string; required?: boolean
}) {
  return (
    <div>
      <label className={labelCls}>{label} {required && <span className="text-red-400">*</span>}</label>
      <input type={type} value={value} onChange={onChange} placeholder={placeholder} className={inputCls} />
    </div>
  )
}

function DocSelect({ label, tipoValue, onTipo, numValue, onNum, paciente }: {
  label: string; tipoValue: string; onTipo: SelectHandler; numValue: string; onNum: InputHandler; paciente?: boolean
}) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-2">
      <div>
        <label className={labelCls}>Tipo</label>
        <select value={tipoValue} onChange={onTipo} className={inputCls}>
          {(paciente ? HC_DOC_TYPES_PACIENTE : HC_DOC_TYPES).map((d) => <option key={d.value} value={d.value}>{d.value}</option>)}
        </select>
      </div>
      <div>
        <label className={labelCls}>{label} <span className="text-red-400">*</span></label>
        <input value={numValue} onChange={onNum} placeholder="Número de documento" className={inputCls} />
      </div>
    </div>
  )
}

function FileField({ label, file, onChange }: {
  label: string; file?: File; onChange: InputHandler
}) {
  return (
    <div>
      <label className={labelCls}>{label} <span className="text-red-400">*</span></label>
      <label className="flex items-center gap-3 px-4 py-3 rounded-xl border border-dashed border-clinic-200 bg-clinic-50/40 cursor-pointer hover:border-clinic-400 transition-colors">
        <Upload size={16} className="text-clinic-500 shrink-0" />
        <span className="text-sm text-dark/70 truncate">{file?.name ?? 'Subir archivo (PDF o imagen, máx. 6 MB)'}</span>
        <input type="file" accept="image/*,application/pdf" onChange={onChange} className="hidden" />
        {file && <CheckCircle size={16} className="text-emerald-500 shrink-0 ml-auto" />}
      </label>
    </div>
  )
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

function genRadicado(): string {
  const d = new Date()
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `HC-${ymd}-${rand}`
}

export function SolicitudHCPage() {
  const navigate = useNavigate()
  const [tipo, setTipo] = useState<Tipo | ''>('')
  const [form, setForm] = useState<FormState>(INITIAL)
  const [files, setFiles] = useState<FileState>({})
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState<{ radicado: string } | null>(null)

  const cfg = HC_TIPOS.find((t) => t.id === tipo)

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target
    const value = target instanceof HTMLInputElement && target.type === 'checkbox' ? target.checked : target.value
    setForm((p) => ({ ...p, [k]: value }))
  }

  const setFile = (k: keyof FileState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    if (f.size > MAX_FILE_MB * 1024 * 1024) {
      toast.error(`El archivo supera ${MAX_FILE_MB} MB.`)
      return
    }
    setFiles((p) => ({ ...p, [k]: f }))
  }

  function validate(): string | null {
    if (!tipo) return 'Selecciona el tipo de solicitud.'
    const req = (v: string, name: string) => (!v.trim() ? name : null)

    // Solicitante (común a todos)
    const baseErr =
      req(form.solNumDoc, 'el número de documento del solicitante') ||
      req(form.solNombre, 'el nombre del solicitante') ||
      req(form.solTelefono, 'el teléfono del solicitante') ||
      req(form.solCorreo, 'el correo del solicitante')
    if (baseErr) return `Falta ${baseErr}.`
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.solCorreo)) return 'El correo del solicitante no es válido.'

    if (tipo === 'tercero') {
      const e = req(form.autNumDoc, 'el documento del autorizado') || req(form.autNombre, 'el nombre del autorizado') || req(form.autCorreo, 'el correo del autorizado')
      if (e) return `Falta ${e}.`
      if (!files.docPaciente) return 'Adjunta la copia del documento del paciente.'
      if (!files.docAutorizado) return 'Adjunta la copia del documento del autorizado.'
    } else if (tipo === 'propia') {
      if (!files.docSolicitante) return 'Adjunta la copia de tu documento de identidad.'
    } else {
      // menor / fallecido
      const e = req(form.pacNumDoc, 'el documento del paciente') || req(form.pacNombre, 'el nombre del paciente')
      if (e) return `Falta ${e}.`
      if (!files.docSolicitante) return 'Adjunta la copia del documento del solicitante.'
      if (!files.docParentesco) return 'Adjunta el documento que prueba el parentesco.'
    }

    if (tipo === 'fallecido') {
      if (!form.fechaFallecimiento) return 'Indica la fecha de fallecimiento.'
    } else if (!form.fechaAtencion) {
      return 'Indica la fecha de atención de la historia clínica.'
    }
    if (!form.finalidad.trim()) return 'Indica la finalidad de la solicitud.'
    if (!form.aceptaReserva || !form.aceptaHabeas) return 'Debes aceptar el tratamiento de datos y la reserva legal.'
    return null
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const err = validate()
    if (err) { toast.error(err); return }
    if (!cfg || !tipo) return

    setSending(true)
    try {
      const radicado = genRadicado()
      const fechaHora = new Date().toLocaleString('es-CO')

      const solicitante = {
        tipoDoc: form.solTipoDoc, numDoc: form.solNumDoc, expedidoEn: form.solExpedidoEn || undefined,
        nombre: form.solNombre, direccion: form.solDireccion || undefined,
        telefono: form.solTelefono || undefined, correo: form.solCorreo || undefined,
      }

      const constancia: HCConstanciaData = {
        tipo, tipoLabel: cfg.titulo, codigoFormato: cfg.codigoFormato, radicado, fechaHora,
        solicitante,
        finalidad: form.finalidad,
        ...(tipo === 'tercero' && {
          autorizado: {
            tipoDoc: form.autTipoDoc, numDoc: form.autNumDoc, nombre: form.autNombre,
            direccion: form.autDireccion || undefined, telefono: form.autTelefono || undefined, correo: form.autCorreo || undefined,
          },
        }),
        ...((tipo === 'menor' || tipo === 'fallecido') && {
          paciente: { tipoDoc: form.pacTipoDoc, numDoc: form.pacNumDoc, nombre: form.pacNombre },
          parentesco: form.parentesco,
        }),
        ...(tipo === 'menor' && { estadoPaciente: form.estadoPaciente, fechaAtencion: form.fechaAtencion }),
        ...(tipo === 'fallecido' && { fechaFallecimiento: form.fechaFallecimiento }),
        ...((tipo === 'propia' || tipo === 'tercero') && { fechaAtencion: form.fechaAtencion }),
      }

      // 1) Generar y descargar la constancia
      const { blob, dataUrl, filename } = generarConstanciaHC(constancia)
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url; a.download = filename; a.click()
      URL.revokeObjectURL(url)

      // 2) Preparar adjuntos (base64) para el buzón seguro
      const adjuntos: Record<string, { nombre: string; tipo: string; contenido: string }> = {}
      for (const [k, f] of Object.entries(files)) {
        if (f) adjuntos[k] = { nombre: f.name, tipo: f.type, contenido: await fileToBase64(f) }
      }

      const payload = { ...constancia, constanciaPdf: dataUrl, adjuntos }

      // 3) Enviar al buzón (si está configurado); si no, modo demo
      const endpoint = import.meta.env.VITE_URL_SOLICITUD_HC
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error(`Error ${res.status}`)
        toast.success('Solicitud enviada correctamente.')
      } else {
        toast.success('Constancia generada (modo demo — buzón no configurado).')
      }

      setDone({ radicado })
    } catch {
      toast.error('No se pudo completar la solicitud. Intenta de nuevo.')
    } finally {
      setSending(false)
    }
  }

  // ── Pantalla de éxito ─────────────────────────────────────────────────────
  if (done) {
    return (
      <div className="min-h-screen bg-white pt-[var(--nav-h)]">
        <div className="container-xl max-w-xl py-24 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-6">
              <CheckCircle size={40} className="text-emerald-500" />
            </div>
            <h1 className="font-display font-bold text-3xl text-dark mb-3">Solicitud registrada</h1>
            <p className="text-dark/60 leading-relaxed mb-2">
              Tu número de radicado es:
            </p>
            <p className="font-display font-bold text-2xl text-clinic-600 mb-6 tracking-wide">{done.radicado}</p>
            <p className="text-dark/55 text-sm max-w-md mb-8">
              Guarda este número y la constancia que se descargó. El área de Archivo verificará tu
              identidad y, una vez aprobada por las áreas responsables, recibirás tu historia clínica
              en el correo registrado.
            </p>
            <button onClick={() => { setDone(null); setTipo(''); setForm(INITIAL); setFiles({}) }} className="btn-primary">
              Nueva solicitud
            </button>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative pt-[var(--nav-h)] pb-16 overflow-hidden" style={{ background: 'linear-gradient(160deg, #020C1B 0%, #041A36 60%, #020C1B 100%)' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-clinic-600/15 blur-[120px] pointer-events-none" aria-hidden="true" />
        <div className="container-xl relative z-10 pt-10">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-white/40 hover:text-white/75 text-sm mb-10 transition-colors group">
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" /> Volver
          </button>
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-sky-300/80 font-semibold text-xs tracking-[0.15em] uppercase bg-sky-500/10 border border-sky-400/20 px-3.5 py-1.5 rounded-full mb-5">
              <FileText size={13} /> Trámite en línea
            </span>
            <h1 className="font-display font-bold text-4xl xl:text-5xl text-white mb-4 text-balance leading-tight">
              Solicita tu{' '}
              <span className="bg-gradient-to-r from-sky-300 via-white to-sky-200 bg-clip-text text-transparent">Historia Clínica</span>
            </h1>
            <p className="text-white/55 text-lg leading-relaxed">
              Diligencia el formulario según tu caso. Verificaremos tu identidad y, tras la
              aprobación de las áreas responsables, recibirás tu historia clínica por correo.
            </p>
          </div>
        </div>
      </section>

      {/* Formulario */}
      <section className="py-16">
        <div className="container-xl max-w-3xl">

          {/* Paso 1: tipo */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEWPORT_CONFIG} className="mb-10">
            <h2 className="font-display font-bold text-xl text-dark mb-1">1. ¿Qué tipo de solicitud necesitas?</h2>
            <p className="text-dark/55 text-sm mb-5">Selecciona la opción que corresponde a tu caso.</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {HC_TIPOS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTipo(t.id)}
                  className={[
                    'text-left p-4 rounded-2xl border transition-all duration-200',
                    tipo === t.id ? 'border-clinic-400 bg-clinic-50 shadow-card' : 'border-clinic-100 bg-white hover:border-clinic-200',
                  ].join(' ')}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-display font-semibold text-dark text-sm">{t.titulo}</span>
                    {tipo === t.id && <CheckCircle size={16} className="text-clinic-500" />}
                  </div>
                  <p className="text-dark/55 text-xs leading-relaxed">{t.descripcion}</p>
                </button>
              ))}
            </div>
          </motion.div>

          {cfg && (
            <motion.form
              key={tipo}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit} noValidate className="space-y-8"
            >
              {/* Requisitos */}
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-sky-50 border border-sky-100">
                <ShieldCheck size={18} className="text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-dark mb-1">Necesitarás adjuntar:</p>
                  <ul className="text-sm text-dark/65 list-disc pl-4 space-y-0.5">
                    {cfg.requisitos.map((r) => <li key={r}>{r}</li>)}
                  </ul>
                </div>
              </div>

              {/* Solicitante */}
              <div>
                <h3 className="font-display font-bold text-lg text-dark mb-4">
                  2. {tipo === 'tercero' ? 'Datos del paciente (autoriza la entrega)' : tipo === 'propia' ? 'Tus datos' : 'Datos del solicitante'}
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2"><DocSelect label="Documento" tipoValue={form.solTipoDoc} onTipo={set('solTipoDoc')} numValue={form.solNumDoc} onNum={set('solNumDoc')} /></div>
                  <Field label="Lugar de expedición" value={form.solExpedidoEn} onChange={set('solExpedidoEn')} placeholder="Ciudad" />
                  <Field label="Nombre completo" value={form.solNombre} onChange={set('solNombre')} required />
                  <Field label="Dirección" value={form.solDireccion} onChange={set('solDireccion')} />
                  <Field label="Teléfono" value={form.solTelefono} onChange={set('solTelefono')} type="tel" required />
                  <div className="sm:col-span-2"><Field label="Correo electrónico" value={form.solCorreo} onChange={set('solCorreo')} type="email" required /></div>
                </div>
              </div>

              {/* Autorizado (tercero) */}
              {tipo === 'tercero' && (
                <div>
                  <h3 className="font-display font-bold text-lg text-dark mb-4">3. Datos del autorizado (quien reclama)</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2"><DocSelect label="Documento" tipoValue={form.autTipoDoc} onTipo={set('autTipoDoc')} numValue={form.autNumDoc} onNum={set('autNumDoc')} /></div>
                    <Field label="Nombre completo" value={form.autNombre} onChange={set('autNombre')} required />
                    <Field label="Dirección" value={form.autDireccion} onChange={set('autDireccion')} />
                    <Field label="Teléfono" value={form.autTelefono} onChange={set('autTelefono')} type="tel" />
                    <div className="sm:col-span-2"><Field label="Correo electrónico (entrega)" value={form.autCorreo} onChange={set('autCorreo')} type="email" required /></div>
                  </div>
                </div>
              )}

              {/* Paciente (menor / fallecido) */}
              {(tipo === 'menor' || tipo === 'fallecido') && (
                <div>
                  <h3 className="font-display font-bold text-lg text-dark mb-4">3. Datos del paciente {tipo === 'fallecido' ? 'fallecido' : '(menor / incapacitado)'}</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2"><DocSelect label="Documento del paciente" tipoValue={form.pacTipoDoc} onTipo={set('pacTipoDoc')} numValue={form.pacNumDoc} onNum={set('pacNumDoc')} paciente /></div>
                    <Field label="Nombre completo del paciente" value={form.pacNombre} onChange={set('pacNombre')} required />
                    {tipo === 'menor' && (
                      <div>
                        <label className={labelCls}>Condición</label>
                        <select value={form.estadoPaciente} onChange={set('estadoPaciente')} className={inputCls}>
                          <option>Menor de edad</option>
                          <option>Incapacitado</option>
                        </select>
                      </div>
                    )}
                    <div>
                      <label className={labelCls}>Parentesco del solicitante</label>
                      <select value={form.parentesco} onChange={set('parentesco')} className={inputCls}>
                        {HC_PARENTESCOS.map((p) => <option key={p}>{p}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Detalles */}
              <div>
                <h3 className="font-display font-bold text-lg text-dark mb-4">{tipo === 'propia' ? '3' : '4'}. Detalles de la historia clínica</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {tipo === 'fallecido' ? (
                    <div>
                      <label className={labelCls}>Fecha de fallecimiento <span className="text-red-400">*</span></label>
                      <input type="date" value={form.fechaFallecimiento} onChange={set('fechaFallecimiento')} className={inputCls} />
                    </div>
                  ) : (
                    <div>
                      <label className={labelCls}>Fecha de atención de la HC <span className="text-red-400">*</span></label>
                      <input type="date" value={form.fechaAtencion} onChange={set('fechaAtencion')} className={inputCls} />
                    </div>
                  )}
                  <div className="sm:col-span-2">
                    <label className={labelCls}>Finalidad de la solicitud <span className="text-red-400">*</span></label>
                    <textarea value={form.finalidad} onChange={set('finalidad')} rows={2} placeholder="¿Para qué necesitas la historia clínica?" className={`${inputCls} resize-none`} />
                  </div>
                </div>
              </div>

              {/* Adjuntos */}
              <div>
                <h3 className="font-display font-bold text-lg text-dark mb-4">Documentos a adjuntar</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {tipo === 'propia' && <FileField label="Documento de identidad" file={files.docSolicitante} onChange={setFile('docSolicitante')} />}
                  {tipo === 'tercero' && <>
                    <FileField label="Documento del paciente" file={files.docPaciente} onChange={setFile('docPaciente')} />
                    <FileField label="Documento del autorizado" file={files.docAutorizado} onChange={setFile('docAutorizado')} />
                  </>}
                  {(tipo === 'menor' || tipo === 'fallecido') && <>
                    <FileField label="Documento del solicitante" file={files.docSolicitante} onChange={setFile('docSolicitante')} />
                    <FileField label="Documento que prueba el parentesco" file={files.docParentesco} onChange={setFile('docParentesco')} />
                  </>}
                </div>
              </div>

              {/* Consentimiento */}
              <div className="space-y-3 p-5 rounded-2xl bg-clinic-50/50 border border-clinic-100">
                <p className="text-xs text-dark/55 leading-relaxed italic">{HC_RESERVA_LEGAL}</p>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={form.aceptaReserva} onChange={set('aceptaReserva')} className="mt-0.5 w-4 h-4 accent-clinic-500 shrink-0" />
                  <span className="text-sm text-dark/70">Declaro bajo gravedad de juramento que la información es veraz y entiendo la reserva legal de la historia clínica.</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={form.aceptaHabeas} onChange={set('aceptaHabeas')} className="mt-0.5 w-4 h-4 accent-clinic-500 shrink-0" />
                  <span className="text-sm text-dark/70">Autorizo el tratamiento de mis datos personales conforme a la política de Habeas Data (Ley 1581 de 2012).</span>
                </label>
              </div>

              <button type="submit" disabled={sending} className="btn-primary w-full justify-center disabled:opacity-70 disabled:cursor-not-allowed">
                {sending ? <><Loader2 size={16} className="animate-spin" /> Enviando…</> : <><Download size={16} /> Enviar solicitud y descargar constancia</>}
              </button>
              <p className="text-center text-dark/40 text-xs">
                Al enviar, se generará tu constancia en PDF. Tus documentos se eliminan tras la entrega.
              </p>
            </motion.form>
          )}
        </div>
      </section>
    </div>
  )
}
