import { motion } from 'framer-motion'
import { ArrowLeft, Target, Eye, Heart, Layers } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Card3D } from '@/components/ui/Card3D'
import { VIEWPORT_CONFIG } from '@/utils/animations'

// ── Contenido ─────────────────────────────────────────────────────────────────
const MISION =
  'Proteger la vida, cuidando integralmente la salud de nuestros pacientes con un firme compromiso hacia la excelencia.'

const VISION =
  'Ser reconocidos a nivel nacional como una institución de salud de mediana y alta complejidad, líder por su calidad, atención integral y profundo compromiso con la responsabilidad social.'

const VALORES = [
  { term: 'Empatía',                     def: 'Escuchamos, comprendemos y acompañamos a nuestros pacientes y sus familias en cada etapa de la enfermedad.' },
  { term: 'Integridad',                  def: 'Actuamos con ética, transparencia y responsabilidad en cada nivel de la organización.' },
  { term: 'Compromiso con la excelencia', def: 'Buscamos la mejora continua, la calidad clínica y la innovación para lograr los mejores resultados posibles en el bienestar de nuestros pacientes.' },
]

const PRINCIPIOS = [
  { term: 'Defensa de la vida',          def: 'Protegemos cada vida con respeto, cuidado y un compromiso inquebrantable.' },
  { term: 'Humanización en la atención', def: 'Basamos nuestra atención en la empatía, el respeto y la dignidad.' },
  { term: 'Trabajo en equipo',           def: 'Integramos conocimientos y competencias para brindar una atención de excelencia.' },
]

const IMG_HERO = import.meta.env.BASE_URL + 'images/DSC_0366.JPG'
const IMG_MISION = import.meta.env.BASE_URL + 'images/DSC_0144.JPG'
const IMG_VALORES = import.meta.env.BASE_URL + 'images/DSC_0146.JPG'
const IMG_PRINCIPIOS = import.meta.env.BASE_URL + 'images/DSC_0235.JPG'

// ── Lista de términos ─────────────────────────────────────────────────────────
function TermList({ items, accent = 'clinic' }: { items: { term: string; def: string }[]; accent?: 'clinic' | 'sky' | 'emerald' | 'violet' }) {
  const dotColor = {
    clinic:  'bg-clinic-500',
    sky:     'bg-sky-500',
    emerald: 'bg-emerald-500',
    violet:  'bg-violet-500',
  }[accent]

  return (
    <ul className="space-y-4" role="list">
      {items.map(({ term, def }, i) => (
        <motion.li
          key={term}
          initial={{ opacity: 0, x: -14 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.4, delay: i * 0.065, ease: [0.22, 1, 0.36, 1] }}
          className="flex gap-3"
        >
          <span className={`mt-[7px] shrink-0 w-1.5 h-1.5 rounded-full ${dotColor}`} aria-hidden="true" />
          <p className="text-dark/70 text-[15px] leading-relaxed">
            <span className="font-semibold text-dark">{term}:</span>{' '}{def}
          </p>
        </motion.li>
      ))}
    </ul>
  )
}

// ── Imagen con Card3D ─────────────────────────────────────────────────────────
function SectionImage({ src, alt, fromLeft = true }: { src: string; alt: string; fromLeft?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: fromLeft ? -28 : 28 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={VIEWPORT_CONFIG}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
      style={{ perspective: '1100px' }}
    >
      <Card3D intensity={8} className="rounded-3xl overflow-hidden shadow-clinic-xl">
        <div className="aspect-[4/3] overflow-hidden rounded-3xl">
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-700"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-clinic-900/35 via-transparent to-transparent" aria-hidden="true" />
        </div>
      </Card3D>
      {/* Borde decorativo */}
      <div
        className={`absolute -bottom-3 ${fromLeft ? '-left-3' : '-right-3'} w-full h-full rounded-3xl border-2 border-clinic-100/50 -z-10 pointer-events-none`}
        aria-hidden="true"
      />
    </motion.div>
  )
}

// ── Página ────────────────────────────────────────────────────────────────────
export function PlanEstrategicoPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero — azul oscuro igual que el inicio ───────────── */}
      <section
        className="relative pt-[var(--nav-h)] pb-20 overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #020C1B 0%, #041A36 60%, #020C1B 100%)' }}
      >
        {/* Foto de fondo con baja opacidad */}
        <div className="absolute inset-0">
          <img
            src={IMG_HERO}
            alt=""
            className="w-full h-full object-cover object-center"
            aria-hidden="true"
            style={{ opacity: 0.12 }}
          />
        </div>

        {/* Grid blueprint */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: '52px 52px',
          }}
          aria-hidden="true"
        />

        {/* Orb ambiental */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-clinic-600/15 blur-[120px] pointer-events-none" aria-hidden="true" />

        <div className="container-xl relative z-10 pt-10">
          {/* Back button */}
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

          {/* Heading */}
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
              Plan Estratégico{' '}
              <span className="bg-gradient-to-r from-sky-300 via-white to-sky-200 bg-clip-text text-transparent">
                Institucional
              </span>
            </h1>
            <p className="text-white/50 text-lg leading-relaxed">
              Nuestra razón de ser, hacia dónde vamos y los principios
              que guían cada decisión en la Clínica San Martín.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Misión & Visión ───────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

            <SectionImage src={IMG_MISION} alt="Personal clínico Clínica San Martín" fromLeft />

            <motion.div
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEWPORT_CONFIG}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Misión */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-clinic-500/10 flex items-center justify-center shrink-0">
                    <Target size={18} className="text-clinic-500" strokeWidth={1.8} />
                  </div>
                  <h2 className="font-display font-bold text-3xl text-dark">Misión</h2>
                </div>
                <p className="text-dark/65 text-lg leading-relaxed border-l-4 border-clinic-400/50 pl-5">
                  {MISION}
                </p>
              </div>

              <div className="h-px bg-gradient-to-r from-clinic-100 to-transparent mb-10" aria-hidden="true" />

              {/* Visión */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center shrink-0">
                    <Eye size={18} className="text-sky-500" strokeWidth={1.8} />
                  </div>
                  <h2 className="font-display font-bold text-3xl text-dark">Visión</h2>
                </div>
                <p className="text-dark/65 text-lg leading-relaxed border-l-4 border-sky-400/50 pl-5">
                  {VISION}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Valores ───────────────────────────────────────────── */}
      <section className="py-20 bg-clinic-50/50 border-y border-clinic-100/50">
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

            {/* Texto */}
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEWPORT_CONFIG}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <Heart size={18} className="text-emerald-500" strokeWidth={1.8} />
                </div>
                <h2 className="font-display font-bold text-3xl text-dark">Valores</h2>
              </div>
              <TermList items={VALORES} accent="clinic" />
            </motion.div>

            {/* Imagen con badge */}
            <div className="relative">
              <SectionImage src={IMG_VALORES} alt="Atención humanizada Clínica San Martín" fromLeft={false} />
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={VIEWPORT_CONFIG}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-float border border-clinic-100/70 px-5 py-3 z-10"
              >
                <p className="text-2xl font-display font-bold text-clinic-600 leading-none mb-0.5">3</p>
                <p className="text-xs text-dark/50 font-medium">Valores institucionales</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Principios ────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

            {/* Imagen */}
            <div className="relative order-2 lg:order-1">
              <SectionImage src={IMG_PRINCIPIOS} alt="Pasillo Clínica San Martín" fromLeft />
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={VIEWPORT_CONFIG}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-float border border-clinic-100/70 px-5 py-3 z-10"
              >
                <p className="text-2xl font-display font-bold text-sky-500 leading-none mb-0.5">3</p>
                <p className="text-xs text-dark/50 font-medium">Principios rectores</p>
              </motion.div>
            </div>

            {/* Texto */}
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEWPORT_CONFIG}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="order-1 lg:order-2"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center shrink-0">
                  <Layers size={18} className="text-violet-500" strokeWidth={1.8} />
                </div>
                <h2 className="font-display font-bold text-3xl text-dark">Principios</h2>
              </div>
              <TermList items={PRINCIPIOS} accent="sky" />
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
