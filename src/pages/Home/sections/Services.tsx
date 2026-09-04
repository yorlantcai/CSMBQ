import { motion } from 'framer-motion'
import {
  BedDouble, Scissors, Droplets, ScanLine, Ambulance, HeartHandshake,
  Check, ArrowRight,
} from 'lucide-react'
import { staggerContainer, staggerItem, VIEWPORT_CONFIG } from '@/utils/animations'
import { Card3D } from '@/components/ui/Card3D'
import { SERVICES } from '@/constants'

const ICON_MAP: Record<string, React.ElementType> = {
  BedDouble, Scissors, Droplets, ScanLine, Ambulance, HeartHandshake,
}

export function Services() {
  return (
    <section id="servicios" className="section-padding bg-white overflow-hidden">
      <div className="container-xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="section-label mb-5 inline-flex">Servicios Médicos</span>
          <h2 className="font-display font-bold text-4xl xl:text-5xl text-dark mb-4 text-balance">
            Nuestros{' '}
            <span className="gradient-text">Servicios</span>
          </h2>
          <p className="text-dark/60 text-lg leading-relaxed">
            Brindamos atención integral hospitalaria y ambulatoria para pacientes adultos y pediátricos, con servicios especializados y un equipo multidisciplinario comprometido con la calidad, la seguridad y la humanización.
          </p>
        </motion.div>

        {/* Services grid con Card3D */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_CONFIG}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ perspective: '1400px' }}
        >
          {SERVICES.map((svc) => {
            const Icon = ICON_MAP[svc.icon] ?? BedDouble
            return (
              <motion.div key={svc.id} variants={staggerItem}>
                <Card3D
                  intensity={8}
                  className="group flex flex-col p-7 rounded-3xl border border-clinic-100/60 bg-white hover:shadow-clinic-lg hover:border-clinic-200 transition-shadow duration-350 h-full"
                >
                  {/* Icon row */}
                  <div className="flex items-center gap-4 mb-5" style={{ transform: 'translateZ(20px)' }}>
                    <div className="w-[52px] h-[52px] rounded-2xl bg-gradient-to-br from-clinic-500 to-clinic-600 flex items-center justify-center shadow-clinic flex-shrink-0">
                      <Icon size={22} className="text-white" strokeWidth={1.8} aria-hidden="true" />
                    </div>
                    <h3 className="font-display font-bold text-dark text-base leading-tight group-hover:text-clinic-600 transition-colors">
                      {svc.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-dark/60 text-sm leading-relaxed mb-5 flex-1">
                    {svc.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6" role="list">
                    {svc.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2.5 text-xs text-dark/65">
                        <div className="w-4 h-4 rounded-full bg-clinic-50 border border-clinic-200 flex items-center justify-center shrink-0">
                          <Check size={10} className="text-clinic-500" strokeWidth={3} aria-hidden="true" />
                        </div>
                        {feat}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex items-center gap-1.5 text-clinic-500 hover:text-clinic-700 text-sm font-semibold transition-colors group/btn mt-auto"
                  >
                    Más información
                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </Card3D>
              </motion.div>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}
