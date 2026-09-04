import { motion } from 'framer-motion'
import { Building2, HeartPulse, TrendingUp, Star, FlaskConical, Award, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Card3D } from '@/components/ui/Card3D'
import { VIEWPORT_CONFIG } from '@/utils/animations'
import { YEARS_OF_SERVICE } from '@/constants'

const MILESTONES = [
  {
    year: '2007',
    icon: Building2,
    title: 'Fundación',
    colorFrom: 'from-amber-500/12',
    colorTo:   'to-amber-950/35',
    border:    'border-amber-400/25',
    accentTxt: 'text-amber-300',
    accentBar: 'bg-amber-400',
    glowColor: 'rgba(251,191,36,0.18)',
    desc: 'La Clínica San Martín Barranquilla fue constituida como ente jurídico en julio de 2007. Nació del sueño de sus fundadores de dar continuidad e integralidad a la atención en salud de los pacientes ambulatorios del Centro Cancerológico del Caribe, CECAC Ltda.',
  },
  {
    year: '2009',
    icon: HeartPulse,
    title: 'Inauguración',
    colorFrom: 'from-sky-500/12',
    colorTo:   'to-sky-950/35',
    border:    'border-sky-400/25',
    accentTxt: 'text-sky-300',
    accentBar: 'bg-sky-400',
    glowColor: 'rgba(56,189,248,0.18)',
    desc: 'Proyectada desde sus inicios con arquitectura moderna y acorde a las normas de salud, fue inaugurada el 16 de diciembre de 2009, ofreciendo al público los servicios de Urgencia, Hospitalización, Cirugía, UCI Adulto y Neonatal e Imagenología.',
  },
  {
    year: '2010',
    icon: TrendingUp,
    title: 'Consolidación',
    colorFrom: 'from-emerald-500/12',
    colorTo:   'to-emerald-950/35',
    border:    'border-emerald-400/25',
    accentTxt: 'text-emerald-300',
    accentBar: 'bg-emerald-400',
    glowColor: 'rgba(52,211,153,0.18)',
    desc: 'Entre 2010 y 2012 se consolidaron los servicios con la adquisición de tecnología avanzada y la incorporación de un recurso humano calificado y comprometido con la excelencia institucional.',
  },
  {
    year: '2013',
    icon: Star,
    title: 'Posicionamiento Regional',
    colorFrom: 'from-violet-500/12',
    colorTo:   'to-violet-950/35',
    border:    'border-violet-400/25',
    accentTxt: 'text-violet-300',
    accentBar: 'bg-violet-400',
    glowColor: 'rgba(167,139,250,0.18)',
    desc: 'Ante el crecimiento progresivo de usuarios y el deseo de ampliar el portafolio de servicios, se inicia el proyecto de ampliación. El excelente manejo de pacientes gineco-obstétricos y hemato-oncológicos posicionó a la clínica como referente en la región Caribe.',
  },
  {
    year: '2014',
    icon: FlaskConical,
    title: 'Nueva Infraestructura',
    colorFrom: 'from-clinic-500/12',
    colorTo:   'to-clinic-950/35',
    border:    'border-clinic-400/25',
    accentTxt: 'text-clinic-300',
    accentBar: 'bg-clinic-500',
    glowColor: 'rgba(27,94,166,0.20)',
    desc: 'Se inauguraron el laboratorio clínico y la unidad transfusional. El 2 de mayo, con la bendición de la primera piedra, comenzó la materialización del sueño: un moderno edificio para brindar una atención más amena, agradable y segura a los usuarios.',
  },
  {
    year: '2021',
    icon: Award,
    title: 'Innovación y Excelencia',
    colorFrom: 'from-rose-500/12',
    colorTo:   'to-rose-950/35',
    border:    'border-rose-400/25',
    accentTxt: 'text-rose-300',
    accentBar: 'bg-rose-400',
    glowColor: 'rgba(251,113,133,0.18)',
    desc: 'Seguimos creciendo e innovando, movidos por nuestra misión de proteger la vida y cuidar integralmente la salud de nuestros pacientes, siempre en pos de la excelencia médica y la humanización del cuidado.',
  },
]

export function HistoriaPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(160deg, #020C1B 0%, #041A36 60%, #020C1B 100%)' }}>

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative pt-[var(--nav-h)] overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 h-[420px]">
          <img
            src={import.meta.env.BASE_URL + 'images/Principal.jpg'}
            alt=""
            className="w-full h-full object-cover object-[center_35%]"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-clinic-950/80 via-clinic-950/75 to-[#020C1B]" />
        </div>

        {/* Blueprint grid */}
        <div
          className="absolute inset-0 h-[420px] opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: '52px 52px',
          }}
          aria-hidden="true"
        />

        <div className="container-xl relative z-10 pt-12 pb-20">
          {/* Back button */}
          <motion.button
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-white/45 hover:text-white/80 text-sm mb-12 transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            Volver
          </motion.button>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-center max-w-2xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 text-amber-300/80 font-semibold text-xs tracking-[0.15em] uppercase bg-amber-500/10 border border-amber-400/20 px-3.5 py-1.5 rounded-full mb-5">
              Clínica San Martín Barranquilla Ltda.
            </span>
            <h1 className="font-display font-bold text-4xl xl:text-5xl text-white mb-5 text-balance">
              Nuestra{' '}
              <span className="bg-gradient-to-r from-amber-300 via-sky-200 to-white bg-clip-text text-transparent">
                Historia
              </span>
            </h1>
            <p className="text-white/55 text-lg leading-relaxed">
              Más de {YEARS_OF_SERVICE} años de crecimiento, compromiso y dedicación al servicio de la salud en Barranquilla y la región Caribe.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Timeline ──────────────────────────────────────────────── */}
      <section className="pb-24 relative">
        <div className="container-xl max-w-3xl">

          <div className="relative">
            {/* Vertical connecting line */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              className="absolute left-[7px] top-4 bottom-4 w-px bg-gradient-to-b from-white/25 via-white/12 to-transparent origin-top"
              aria-hidden="true"
            />

            <div className="space-y-10 md:space-y-12">
              {MILESTONES.map((m, i) => {
                const Icon = m.icon
                return (
                  <motion.div
                    key={m.year}
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={VIEWPORT_CONFIG}
                    transition={{ duration: 0.55, delay: i * 0.06 }}
                    className="flex gap-6 md:gap-8 items-start"
                  >
                    {/* Dot */}
                    <div className="shrink-0 flex flex-col items-center pt-3 z-10">
                      <div
                        className={`w-3.5 h-3.5 rounded-full ${m.accentBar} ring-4 ring-[#020C1B] shadow-lg`}
                        style={{ boxShadow: `0 0 12px ${m.glowColor}` }}
                      />
                    </div>

                    {/* Card */}
                    <div className="flex-1" style={{ perspective: '900px' }}>
                      <Card3D
                        intensity={7}
                        className={`rounded-3xl border ${m.border} bg-gradient-to-br ${m.colorFrom} ${m.colorTo}`}
                      >
                        <div className="p-6 md:p-7">
                          {/* Header */}
                          <div className="flex items-center gap-3 mb-4">
                            <div
                              className="w-11 h-11 rounded-2xl bg-white/6 border border-white/10 flex items-center justify-center shrink-0"
                              style={{ transform: 'translateZ(12px)' }}
                            >
                              <Icon size={19} className={m.accentTxt} strokeWidth={1.7} aria-hidden="true" />
                            </div>
                            <div style={{ transform: 'translateZ(10px)' }}>
                              <p className={`${m.accentTxt} text-[10px] font-bold tracking-[0.18em] uppercase leading-none mb-0.5`}>
                                {m.year}
                              </p>
                              <h3 className="font-display font-bold text-white text-lg leading-tight">
                                {m.title}
                              </h3>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-white/60 leading-relaxed text-sm md:text-base">
                            {m.desc}
                          </p>
                        </div>
                      </Card3D>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* End arrow */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_CONFIG}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-6 mt-10"
            >
              <div className="shrink-0 flex justify-center" style={{ width: 14 }}>
                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-8 border-t-white/20" aria-hidden="true" />
              </div>
              <p className="text-white/25 text-xs italic">
                Y seguimos escribiendo historia…
              </p>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ── Footer strip ──────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={VIEWPORT_CONFIG}
        transition={{ duration: 0.6 }}
        className="border-t border-white/8 py-10"
      >
        <div className="container-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <img
            src={import.meta.env.BASE_URL + 'logo.png'}
            alt="Clínica San Martín Barranquilla"
            className="h-8 w-auto object-contain opacity-60"
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/logo-placeholder.svg' }}
          />
          <p className="text-white/25 text-sm text-center sm:text-right">
            Barranquilla, Atlántico, Colombia · Carrera 43 No. 70 – 106
          </p>
        </div>
      </motion.section>

    </div>
  )
}
