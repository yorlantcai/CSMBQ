import { motion } from 'framer-motion'
import { Activity, CheckCircle2, HeartPulse } from 'lucide-react'
import { staggerContainer, staggerItem, VIEWPORT_CONFIG } from '@/utils/animations'
import { LAPAROSCOPIC_SURGERIES, PALLIATIVE_CARE_SERVICES } from '@/constants'

export function Programas() {
  return (
    <section id="programas" className="section-padding bg-surface overflow-hidden">
      <div className="container-xl">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="section-label mb-5 inline-flex">Programas Integrales de Salud</span>
          <h2 className="font-display font-bold text-4xl xl:text-5xl text-dark mb-4 text-balance">
            Atención continua y{' '}
            <span className="gradient-text">personalizada</span>
          </h2>
          <p className="text-dark/60 text-lg leading-relaxed">
            Programas orientados a la gestión del riesgo y la mejora del estado de salud, que
            abarcan la prevención, el diagnóstico, el tratamiento, la rehabilitación y el seguimiento.
          </p>
        </motion.div>

        {/* ── Cirugías por videolaparoscopia ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-10 h-10 rounded-xl bg-clinic-500/10 flex items-center justify-center shrink-0">
            <Activity size={18} className="text-clinic-500" strokeWidth={1.8} aria-hidden="true" />
          </div>
          <h3 className="font-display font-bold text-2xl text-dark">Cirugías por Videolaparoscopia</h3>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_CONFIG}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-20"
        >
          {LAPAROSCOPIC_SURGERIES.map((surgery) => (
            <motion.div
              key={surgery}
              variants={staggerItem}
              className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-clinic-100/70 shadow-card hover:shadow-card-hover hover:border-clinic-200 transition-all duration-300"
            >
              <CheckCircle2 size={18} className="text-clinic-500 shrink-0" aria-hidden="true" />
              <span className="text-sm font-medium text-dark/80">{surgery}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Medicina del Dolor y Cuidados Paliativos ── */}
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT_CONFIG}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:sticky lg:top-28"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center shrink-0">
                <HeartPulse size={18} className="text-rose-500" strokeWidth={1.8} aria-hidden="true" />
              </div>
              <h3 className="font-display font-bold text-2xl text-dark">Medicina del Dolor y Cuidados Paliativos</h3>
            </div>            
            <p className="text-dark/60 leading-relaxed">    
              Alivio del dolor y acompañamiento integral.              
            </p>
            <p className="text-dark/60 leading-relaxed">
              Brindamos atención especializada a pacientes con dolor agudo, crónico o refractario, asociado o no a enfermedades oncológicas, con el propósito de aliviar el sufrimiento y favorecer la calidad de vida del paciente y su familia.
            </p>
          </motion.div>

          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_CONFIG}
            className="space-y-3.5"
            role="list"
          >
            {PALLIATIVE_CARE_SERVICES.map((item) => (
              <motion.li key={item} variants={staggerItem} className="flex gap-3">
                <CheckCircle2 size={16} className="text-rose-500 shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-dark/70 text-[15px] leading-relaxed">{item}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>

      </div>
    </section>
  )
}
