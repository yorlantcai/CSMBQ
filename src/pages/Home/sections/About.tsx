import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight, ShieldCheck, Microscope, Users, Stethoscope } from 'lucide-react'
import { staggerContainer, staggerItem, fadeInLeft, fadeInRight, VIEWPORT_CONFIG } from '@/utils/animations'
import { Card3D } from '@/components/ui/Card3D'
import { YEARS_OF_SERVICE } from '@/constants'

const PILLARS = [
  { icon: ShieldCheck,  label: 'Defensa de la Vida',         desc: 'Protegemos cada vida con respeto, cuidado y un compromiso inquebrantable.' },
  { icon: Microscope,   label: 'Alianza con CECAC Ltda.',    desc: 'Respaldo de nuestra IPS aliada especializada en Hemato-Oncología.' },
  { icon: Users,        label: 'Equipo Multidisciplinario',  desc: 'Profesionales altamente calificados para una atención de excelencia.' },
  { icon: Stethoscope,  label: 'Humanización del Cuidado',   desc: 'El paciente y su familia al centro de cada decisión clínica.' },
]

const DIFFERENTIATORS = [
  'Institución de mediana y alta complejidad',
  'Alianza estratégica con CECAC (Hemato-Oncología)',
  'Central de Mezcla certificada por el INVIMA',
  'Piso exclusivo de pediatría',
  'Habitaciones tipo suite',
  'Atención integral a adultos y pediátricos',
  'Atención humanizada e integral',
]

const IMG_MAIN = import.meta.env.BASE_URL + 'images/DSC_0032.JPG'
const IMG_SEC = import.meta.env.BASE_URL + 'images/DSC_0330.JPG'

export function About() {
  return (
    <section id="nosotros" className="section-padding bg-white overflow-hidden">
      <div className="container-xl">

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="section-label">Nuestra Institución</span>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center mb-20">

          {/* ── Columna visual con efecto 3D ──────────── */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_CONFIG}
            className="relative"
            style={{ perspective: '1200px' }}
          >
            {/* Imagen principal — con tilt 3D */}
            <Card3D intensity={7} className="relative rounded-3xl overflow-hidden shadow-clinic-xl">
              <div className="aspect-[4/3] overflow-hidden rounded-3xl">
                <img
                  src={IMG_MAIN}
                  alt="Equipo de profesionales Clínica San Martín Barranquilla"
                  className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-700"
                  loading="lazy"
                />
                {/* Overlay degradado suave */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-clinic-900/50 via-transparent to-transparent"
                  aria-hidden="true"
                />
                {/* Badge inferior */}
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                  <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3">
                    <p className="text-white font-bold text-lg leading-none">+{YEARS_OF_SERVICE} años</p>
                    <p className="text-white/70 text-xs mt-1">de excelencia médica</p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 rounded-xl px-3 py-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                    <span className="text-emerald-300 text-xs font-semibold">Activos 24/7</span>
                  </div>
                </div>
              </div>
            </Card3D>

            {/* Imagen secundaria — flotante con profundidad 3D */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 24 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={VIEWPORT_CONFIG}
              transition={{ duration: 0.65, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-8 -right-6 lg:-right-10 w-44 sm:w-52"
              style={{ perspective: '800px' }}
            >
              <Card3D intensity={14} className="rounded-2xl overflow-hidden shadow-float border-2 border-white">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                  <img
                    src={IMG_SEC}
                    alt="Tomógrafo GE Revolution — tecnología diagnóstica de punta"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-clinic-800/60 to-transparent" aria-hidden="true" />
                  <div className="absolute bottom-2.5 left-2.5">
                    <p className="text-white font-semibold text-[11px] leading-tight">Tomógrafo<br/>GE Revolution</p>
                  </div>
                </div>
              </Card3D>
            </motion.div>

            {/* Stat flotante */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={VIEWPORT_CONFIG}
              transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -top-5 -right-3 lg:-right-6 bg-white rounded-2xl shadow-float border border-clinic-100/60 px-5 py-4"
            >
              <p className="text-2xl font-display font-bold text-clinic-600 mb-0.5">100,000+</p>
              <p className="text-xs text-dark/60 font-medium">Pacientes atendidos</p>
            </motion.div>

            {/* Elemento decorativo de profundidad */}
            <div
              className="absolute -bottom-4 -left-4 w-full h-full rounded-3xl border-2 border-clinic-200/40 -z-10"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-8 -left-8 w-full h-full rounded-3xl border border-clinic-100/30 -z-20"
              aria-hidden="true"
            />
          </motion.div>

          {/* ── Columna de texto ─────────────────────── */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_CONFIG}
          >
            <h2 className="font-display font-bold text-4xl xl:text-6xl text-dark leading-tight mb-6 text-balance">
              Acerca de {/*YEARS_OF_SERVICE*/}{' '}
              <span className="gradient-text">Nosotros</span>{' '}              
            </h2>

            <p className="text-dark/65 text-lg leading-relaxed mb-6">
              La Clínica San Martín Barranquilla es una Institución Prestadora de Servicios de
              Salud de mediana y alta complejidad, ubicada en el corazón de la Región Caribe. Desde
              nuestra apertura en 2007 brindamos una atención integral, segura y humanizada.
            </p>

            <p className="text-dark/60 leading-relaxed mb-8">
              Contamos con el respaldo de CECAC Ltda. (Centro Cancerológico del Caribe), nuestra IPS aliada especializada en
              Hemato-Oncología. En 2020 inauguramos nuevas instalaciones con un piso exclusivo de
              pediatría, habitaciones tipo suite y una Central de Mezcla certificada por el INVIMA.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8" role="list">
              {DIFFERENTIATORS.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-dark/75">
                  <CheckCircle2 size={16} className="text-clinic-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <button
              onClick={() => document.getElementById('especialidades')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary"
            >
              Ver Especialidades
              <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>

        {/* ── Pilares institucionales ──────────────────── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_CONFIG}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {PILLARS.map(({ icon: Icon, label, desc }) => (
            <motion.div
              key={label}
              variants={staggerItem}
              className="group p-6 rounded-2xl border border-clinic-100/80 bg-clinic-50/50 hover:bg-white hover:shadow-card-hover hover:border-clinic-200 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-clinic-500/10 group-hover:bg-clinic-500 flex items-center justify-center mb-4 transition-colors duration-300">
                <Icon size={20} className="text-clinic-500 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-display font-semibold text-dark mb-2 text-sm">{label}</h3>
              <p className="text-dark/55 text-xs leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
