import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle2, ShieldCheck, ClipboardList, FileText, QrCode, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import { Card3D } from '@/components/ui/Card3D'
import { VIEWPORT_CONFIG } from '@/utils/animations'
import { URL_SOLICITUD_HC } from '@/constants'

// ── Contenido ─────────────────────────────────────────────────────────────────
const DEBERES = [
  'Cumplir y respetar las normas institucionales y las instrucciones proporcionadas por el equipo de profesionales de la Clínica San Martín Barranquilla.',
  'Tratar con dignidad y respeto al personal que está a su servicio, además de respetar la intimidad de los demás usuarios.',
  'Cuidar y hacer uso racional de los recursos, las instalaciones, la dotación y demás servicios que la Clínica San Martín Barranquilla tiene disponible para usted.',
  'Suministrar información oportuna, clara, veraz y completa sobre su estado de salud para que la institución pueda brindarle el cuidado apropiado y pertinente.',
  'Informarse sobre los procedimientos, mediante el formato «Consentimiento informado» y expresar su aprobación mediante la firma de éste; además usted debe expresar por escrito su voluntad de no aceptar tratamiento o procedimientos.',
  'Utilizar los servicios de la oficina de atención al usuario (SIAU) para realizar de manera respetuosa sus quejas, reclamos, sugerencias o felicitaciones.',
  'Participar en la asociación de usuarios.',
  'Facilitar el pago de las Cuotas Moderadoras o del COPAGO por la prestación del servicio que tenga lugar.',
  'Cancelar oportunamente las citas cuando no pueda asistir.',
  'Procurar el cuidado integral de su salud y la de su familia, siendo parte activa del tratamiento.',
  'Utilizar adecuadamente el servicio al cual tiene derecho.',
]

const DERECHOS = [
  'Usted tiene derecho a elegir libremente el médico y en general los profesionales de la salud, como también a las instituciones de la salud que le presten la atención requerida dentro de los recursos disponibles del país; así como a recibir la mejor asistencia médica disponible, durante todo el proceso de la enfermedad.',
  'Derecho a disfrutar de una comunicación plena y clara con el médico tratante.',
  'Derecho a recibir un trato digno, respetando sus creencias y costumbres, así como las opiniones personales que tenga sobre la enfermedad que sufre.',
  'Derecho a que todos los informes de la historia clínica sean tratados de manera confidencial y secreta, y que sólo con autorización puedan ser conocidos.',
  'Derecho a revisar y recibir las explicaciones acerca de los costos por los servicios obtenidos.',
  'Derecho a recibir o rechazar apoyo espiritual o moral cualquiera que sea el culto religioso que profesa.',
  'Derecho a que se respete la voluntad de participar o no en investigaciones.',
  'Derecho a que se respete la voluntad de donar o no sus órganos para que estos sean trasplantados a otros pacientes.',
  'Derecho a morir con dignidad y a que se le respete su voluntad de permitir que el proceso de muerte siga su curso natural en la fase terminal de su enfermedad.',
  'Derecho a ser escuchado y obtener respuestas a sus reclamos e inquietudes; si tiene alguna duda puede dirigirse a la oficina de Atención al Usuario o llamar al 3614600 extensión 156. Además, tiene derecho a ser informado sobre sus derechos y deberes.',
]

// ── Imágenes ──────────────────────────────────────────────────────────────────
const IMG_HERO = import.meta.env.BASE_URL + 'images/DSC_0146.JPG'
const IMG_DEBERES = import.meta.env.BASE_URL + 'images/DSC_0308.JPG'
const IMG_DERECHOS = import.meta.env.BASE_URL + 'images/DSC_0290.JPG'

// ── Subcomponente: lista de ítems ─────────────────────────────────────────────
function ItemList({
  items, iconColor, delay = 0,
}: { items: string[]; iconColor: string; delay?: number }) {
  return (
    <ul className="space-y-3.5" role="list">
      {items.map((item, i) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.4, delay: delay + i * 0.055, ease: [0.22, 1, 0.36, 1] }}
          className="flex gap-3"
        >
          <CheckCircle2 size={16} className={`shrink-0 mt-0.5 ${iconColor}`} />
          <p className="text-dark/65 text-[15px] leading-relaxed">{item}</p>
        </motion.li>
      ))}
    </ul>
  )
}

// ── Página ────────────────────────────────────────────────────────────────────
export function PacientesPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section
        className="relative pt-[var(--nav-h)] pb-20 overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #020C1B 0%, #041A36 60%, #020C1B 100%)' }}
      >
        <div className="absolute inset-0">
          <img
            src={IMG_HERO}
            alt=""
            className="w-full h-full object-cover object-top"
            aria-hidden="true"
            style={{ opacity: 0.14 }}
          />
        </div>
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: '52px 52px',
          }}
          aria-hidden="true"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-clinic-600/15 blur-[120px] pointer-events-none" aria-hidden="true" />

        <div className="container-xl relative z-10 pt-10">
          <motion.button
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-white/40 hover:text-white/75 text-sm mb-12 transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            Volver
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-center max-w-2xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 text-sky-300/80 font-semibold text-xs tracking-[0.15em] uppercase bg-sky-500/10 border border-sky-400/20 px-3.5 py-1.5 rounded-full mb-5">
              Clínica San Martín Barranquilla Ltda.
            </span>
            <h1 className="font-display font-bold text-4xl xl:text-5xl text-white mb-5 text-balance leading-tight">
              Derechos y Deberes{' '}
              <span className="bg-gradient-to-r from-sky-300 via-white to-sky-200 bg-clip-text text-transparent">
                del Paciente
              </span>
            </h1>
            <p className="text-white/50 text-lg leading-relaxed">
              Conozca sus derechos como paciente y los compromisos
              que nos permiten brindarle una atención de excelencia.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Solicitud de Historia Clínica (QR) ─────────────────── */}
      <section className="py-16 bg-white">
        <div className="container-xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_CONFIG}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl border border-clinic-100 bg-gradient-to-br from-clinic-50 to-white shadow-card"
          >
            <div className="grid md:grid-cols-[1fr_auto] gap-8 items-center p-8 md:p-10">
              {/* Texto */}
              <div>
                <span className="inline-flex items-center gap-2 text-clinic-600 font-semibold text-xs tracking-[0.15em] uppercase bg-clinic-500/10 border border-clinic-200 px-3.5 py-1.5 rounded-full mb-4">
                  <FileText size={13} /> Trámite en línea
                </span>
                <h2 className="font-display font-bold text-3xl text-dark mb-3 text-balance">
                  Solicita tu <span className="gradient-text">Historia Clínica</span>
                </h2>
                <p className="text-dark/60 leading-relaxed mb-6 max-w-md">
                  Escanea el código QR o ingresa al formulario en línea. Verificamos tu identidad y,
                  tras la aprobación, recibirás tu historia clínica en tu correo.
                </p>
                <button onClick={() => navigate('/solicitud-historia-clinica')} className="btn-primary">
                  Ir al formulario
                  <ArrowRight size={16} />
                </button>
              </div>

              {/* QR */}
              <div className="flex flex-col items-center gap-3 md:pl-8 md:border-l border-clinic-100">
                <div className="p-4 bg-white rounded-2xl border border-clinic-100 shadow-card">
                  <QRCodeSVG
                    value={URL_SOLICITUD_HC}
                    size={148}
                    level="M"
                    bgColor="#ffffff"
                    fgColor="#0D3B6E"
                  />
                </div>
                <div className="flex items-center gap-1.5 text-dark/45 text-xs">
                  <QrCode size={13} /> Escanéame con tu celular
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Deberes ───────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-start">

            {/* Imagen */}
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEWPORT_CONFIG}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative lg:sticky lg:top-28"
              style={{ perspective: '1100px' }}
            >
              <Card3D intensity={7} className="rounded-3xl overflow-hidden shadow-clinic-xl">
                <div className="aspect-[4/3] overflow-hidden rounded-3xl">
                  <img
                    src={IMG_DEBERES}
                    alt="Equipo médico Clínica San Martín"
                    className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-clinic-900/45 via-transparent to-transparent" aria-hidden="true" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 rounded-xl px-3.5 py-2">
                      <ClipboardList size={14} className="text-sky-300" aria-hidden="true" />
                      <span className="text-white text-xs font-semibold">Sus deberes como paciente</span>
                    </div>
                  </div>
                </div>
              </Card3D>
              <div className="absolute -bottom-3 -left-3 w-full h-full rounded-3xl border-2 border-clinic-100/50 -z-10 pointer-events-none" aria-hidden="true" />
            </motion.div>

            {/* Lista */}
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEWPORT_CONFIG}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                  <ClipboardList size={18} className="text-amber-500" strokeWidth={1.8} />
                </div>
                <h2 className="font-display font-bold text-3xl text-dark">Deberes</h2>
              </div>
              <ItemList items={DEBERES} iconColor="text-amber-500" delay={0.1} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Derechos ──────────────────────────────────────────── */}
      <section className="py-20 bg-clinic-50/40 border-t border-clinic-100/50">
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-start">

            {/* Lista */}
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEWPORT_CONFIG}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-clinic-500/10 flex items-center justify-center shrink-0">
                  <ShieldCheck size={18} className="text-clinic-500" strokeWidth={1.8} />
                </div>
                <h2 className="font-display font-bold text-3xl text-dark">Derechos</h2>
              </div>
              <ItemList items={DERECHOS} iconColor="text-clinic-500" delay={0} />
            </motion.div>

            {/* Imagen */}
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEWPORT_CONFIG}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative lg:sticky lg:top-28"
              style={{ perspective: '1100px' }}
            >
              <Card3D intensity={7} className="rounded-3xl overflow-hidden shadow-clinic-xl">
                <div className="aspect-[4/3] overflow-hidden rounded-3xl">
                  <img
                    src={IMG_DERECHOS}
                    alt="Humanización del cuidado Clínica San Martín"
                    className="w-full h-full object-cover object-top scale-105 hover:scale-100 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-clinic-900/45 via-transparent to-transparent" aria-hidden="true" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 rounded-xl px-3.5 py-2">
                      <ShieldCheck size={14} className="text-sky-300" aria-hidden="true" />
                      <span className="text-white text-xs font-semibold">Sus derechos como paciente</span>
                    </div>
                  </div>
                </div>
              </Card3D>
              <div className="absolute -bottom-3 -right-3 w-full h-full rounded-3xl border-2 border-clinic-100/50 -z-10 pointer-events-none" aria-hidden="true" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Footer strip ──────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={VIEWPORT_CONFIG}
        transition={{ duration: 0.6 }}
        className="border-t border-clinic-100/60 py-10 bg-clinic-50/30"
      >
        <div className="container-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <img
            src={import.meta.env.BASE_URL + 'logo.png'}
            alt="Clínica San Martín Barranquilla"
            className="h-8 w-auto object-contain opacity-60"
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/logo-placeholder.svg' }}
          />
          <p className="text-dark/35 text-sm text-center sm:text-right">
            Barranquilla, Atlántico, Colombia · Carrera 43 No. 70 – 106
          </p>
        </div>
      </motion.section>

    </div>
  )
}
