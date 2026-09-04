import { motion } from 'framer-motion'
import {
  Stethoscope, Baby, Star, Scissors, Sparkles, Syringe, Activity,
  ShieldAlert, Bone, Heart, Dumbbell, Apple, Brain, HeartHandshake,
  FileText, ArrowRight,
} from 'lucide-react'
import { staggerContainer, staggerItem, VIEWPORT_CONFIG } from '@/utils/animations'
import { Card3D } from '@/components/ui/Card3D'
import { SPECIALTIES } from '@/constants'

const ICON_MAP: Record<string, React.ElementType> = {
  Stethoscope, Baby, Star, Scissors, Sparkles, Syringe, Activity,
  ShieldAlert, Bone, Heart, Dumbbell, Apple, Brain, HeartHandshake,
}

const PDF_URL = '/documents/portafolio-servicios.pdf'

export function Specialties() {
  return (
    <section id="especialidades" className="section-padding bg-surface overflow-hidden">
      <div className="container-xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="section-label mb-5 inline-flex">Consulta Externa Especializada</span>
          <h2 className="font-display font-bold text-4xl xl:text-5xl text-dark mb-4 text-balance">
            Atención Especializada, Integral y {' '}
            <span className="gradient-text">Humana</span>{' '}            
          </h2>
          <p className="text-dark/60 text-lg leading-relaxed">
            Cuidamos de ti y de tu familia, con un equipo multidisciplinario altamente calificado que trabaja para ofrecer diagnóstico oportuno, tratamiento adecuado y seguimiento continuo, de acuerdo con las necesidades de cada paciente.
          </p>
        </motion.div>

        {/* Grid con efecto 3D en cada card */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_CONFIG}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10"
          style={{ perspective: '1400px' }}
        >
          {SPECIALTIES.map((spec) => {
            const Icon = ICON_MAP[spec.icon] ?? Stethoscope
            return (
              <motion.div key={spec.id} variants={staggerItem}>
                <Card3D
                  intensity={9}
                  className="relative h-full p-6 rounded-2xl bg-white border border-transparent hover:border-clinic-100 shadow-card hover:shadow-card-hover transition-shadow duration-300 cursor-default overflow-hidden group"
                >
                  {/* Hover gradient */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ background: 'linear-gradient(135deg, rgba(27,94,166,0.04) 0%, rgba(14,165,233,0.06) 100%)' }}
                    aria-hidden="true"
                  />

                  {/* Capa de profundidad 3D — proyecta "z hacia adelante" */}
                  <div className="relative" style={{ transform: 'translateZ(20px)' }}>
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-clinic-50 group-hover:bg-clinic-500 flex items-center justify-center mb-4 transition-colors duration-300 shadow-sm">
                      <Icon
                        size={22}
                        className="text-clinic-500 group-hover:text-white transition-colors duration-300"
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </div>

                    <h3 className="font-display font-semibold text-dark text-sm mb-2 group-hover:text-clinic-700 transition-colors">
                      {spec.title}
                    </h3>
                    <p className="text-dark/55 text-xs leading-relaxed line-clamp-3">
                      {spec.description}
                    </p>
                  </div>

                  {/* Línea de acento inferior */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-clinic-500 to-sky-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-b-2xl"
                    aria-hidden="true"
                  />
                </Card3D>
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA — Portafolio PDF */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
        >
          <p className="text-dark/50 text-sm">
            Consulta nuestro portafolio completo de especialidades y servicios.
          </p>
          <a
            href={PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-clinic-200 bg-white text-clinic-600 font-semibold text-sm shadow-card hover:shadow-clinic hover:border-clinic-400 hover:text-clinic-700 transition-all duration-200 active:scale-95"
          >
            <FileText size={16} aria-hidden="true" />
            Conocer más — Portafolio de Servicios
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </a>
        </motion.div>

      </div>
    </section>
  )
}
