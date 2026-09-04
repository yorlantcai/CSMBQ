import { jsPDF } from 'jspdf'
import { HC_RESERVA_LEGAL } from '@/constants'

// ── Datos normalizados que recibe la constancia ────────────────────────────
export interface HCPersona {
  tipoDoc: string
  numDoc: string
  expedidoEn?: string
  nombre: string
  direccion?: string
  telefono?: string
  correo?: string
}

export interface HCConstanciaData {
  tipo: 'propia' | 'tercero' | 'menor' | 'fallecido'
  tipoLabel: string
  codigoFormato: string   // p. ej. FAV-004
  radicado: string        // identificador único de la solicitud
  fechaHora: string       // momento de la aceptación electrónica
  solicitante: HCPersona
  paciente?: HCPersona
  autorizado?: HCPersona
  parentesco?: string
  estadoPaciente?: string
  fechaAtencion?: string
  fechaFallecimiento?: string
  finalidad: string
}

const MARGIN = 18
const LINE = 6

/**
 * Genera la constancia en PDF del formato oficial (FAV) auto-rellenado con los
 * datos del formulario y un sello de aceptación electrónica que reemplaza la
 * firma manuscrita. Devuelve el Blob, un data URL y el nombre de archivo.
 */
export function generarConstanciaHC(data: HCConstanciaData): { blob: Blob; dataUrl: string; filename: string } {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const pageW = doc.internal.pageSize.getWidth()
  const contentW = pageW - MARGIN * 2
  let y = MARGIN

  const text = (label: string, value: string, opts?: { bold?: boolean }) => {
    doc.setFont('helvetica', opts?.bold ? 'bold' : 'normal')
    doc.setFontSize(10)
    const line = label ? `${label} ${value}` : value
    const wrapped = doc.splitTextToSize(line, contentW)
    doc.text(wrapped, MARGIN, y)
    y += wrapped.length * LINE
  }

  const heading = (t: string) => {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11)
    doc.setTextColor(13, 59, 110) // clinic-700
    doc.text(t, MARGIN, y)
    doc.setTextColor(0, 0, 0)
    y += LINE + 1
  }

  const rule = () => {
    doc.setDrawColor(200)
    doc.line(MARGIN, y, pageW - MARGIN, y)
    y += LINE
  }

  const persona = (titulo: string, p: HCPersona) => {
    heading(titulo)
    text('Documento:', `${p.tipoDoc} N.º ${p.numDoc}${p.expedidoEn ? ` · Expedido en ${p.expedidoEn}` : ''}`)
    text('Nombre:', p.nombre)
    if (p.direccion) text('Dirección:', p.direccion)
    if (p.telefono)  text('Teléfono:', p.telefono)
    if (p.correo)    text('Correo:', p.correo)
    y += 2
  }

  // ── Encabezado institucional ──────────────────────────────────────────────
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(13)
  doc.setTextColor(13, 59, 110)
  doc.text('CLÍNICA SAN MARTÍN BARRANQUILLA LTDA.', pageW / 2, y, { align: 'center' })
  y += LINE
  doc.setFontSize(11)
  doc.text('SOLICITUD DE HISTORIA CLÍNICA', pageW / 2, y, { align: 'center' })
  y += LINE - 1
  doc.setTextColor(90)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(`${data.tipoLabel}  ·  Código ${data.codigoFormato}  ·  Servicio: Archivo`, pageW / 2, y, { align: 'center' })
  doc.setTextColor(0)
  y += LINE
  rule()

  // ── Datos de radicación ─────────────────────────────────────────────────
  text('Radicado:', data.radicado, { bold: true })
  text('Fecha y hora de solicitud:', data.fechaHora)
  y += 1

  // ── Partes ──────────────────────────────────────────────────────────────
  if (data.tipo === 'propia') {
    persona('Solicitante (titular de la historia clínica)', data.solicitante)
  } else if (data.tipo === 'tercero') {
    persona('Paciente (autoriza la entrega)', data.solicitante)
    if (data.autorizado) persona('Autorizado para reclamar', data.autorizado)
  } else {
    persona('Solicitante', data.solicitante)
    if (data.paciente) persona(data.tipo === 'fallecido' ? 'Paciente fallecido' : 'Paciente (menor / incapacitado)', data.paciente)
  }

  // ── Detalles de la solicitud ──────────────────────────────────────────────
  heading('Detalles de la solicitud')
  if (data.parentesco)         text('Parentesco del solicitante:', data.parentesco)
  if (data.estadoPaciente)     text('Condición del paciente:', data.estadoPaciente)
  if (data.fechaAtencion)      text('Fecha de atención de la HC:', data.fechaAtencion)
  if (data.fechaFallecimiento) text('Fecha de fallecimiento:', data.fechaFallecimiento)
  text('Finalidad de la solicitud:', data.finalidad)
  y += 2

  // ── Nota legal ────────────────────────────────────────────────────────────
  rule()
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(8)
  doc.setTextColor(90)
  const legal = doc.splitTextToSize(HC_RESERVA_LEGAL, contentW)
  doc.text(legal, MARGIN, y)
  y += legal.length * (LINE - 1) + 4
  doc.setTextColor(0)

  // ── Sello de aceptación electrónica (reemplaza la firma) ──────────────────
  doc.setDrawColor(13, 59, 110)
  doc.setFillColor(235, 243, 255) // clinic-50
  const boxH = 26
  doc.roundedRect(MARGIN, y, contentW, boxH, 2, 2, 'FD')
  const innerY = y + 6
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.setTextColor(13, 59, 110)
  doc.text('CONSTANCIA DE ACEPTACIÓN ELECTRÓNICA', MARGIN + 4, innerY)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(40)
  const stamp = doc.splitTextToSize(
    `${data.solicitante.nombre} (${data.solicitante.tipoDoc} ${data.solicitante.numDoc}) aceptó electrónicamente esta solicitud y declaró bajo gravedad de juramento que la información es veraz. Fecha y hora: ${data.fechaHora}. Radicado: ${data.radicado}.`,
    contentW - 8,
  )
  doc.text(stamp, MARGIN + 4, innerY + 5)
  doc.setTextColor(0)
  y += boxH + 6

  // ── Pie ───────────────────────────────────────────────────────────────────
  doc.setFontSize(7.5)
  doc.setTextColor(120)
  doc.text(
    'Documento generado digitalmente. La entrega de la historia clínica está sujeta a la verificación de identidad y al visto bueno de las áreas responsables.',
    pageW / 2, 285, { align: 'center', maxWidth: contentW },
  )

  const blob = doc.output('blob')
  // jsPDF inserts extra params (e.g. ;filename=generated.pdf;) — normalize to data:mime;base64,...
  const rawDataUrl = doc.output('datauristring')
  const dataUrl = rawDataUrl.replace(/^(data:[^;]+)(?:;[^;,]+)*;base64,/, '$1;base64,')
  const filename = `Constancia_${data.radicado}.pdf`
  return { blob, dataUrl, filename }
}
