import { motion } from 'framer-motion'
import { FlaskConical, ScanLine, FileText, ExternalLink, Lock, Shield, ArrowUpRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { staggerContainer, staggerItem, VIEWPORT_CONFIG } from '@/utils/animations'
import { Card3D } from '@/components/ui/Card3D'
import { RESULT_PORTALS } from '@/constants'

const ICON_MAP: Record<string, React.ElementType> = { FlaskConical, ScanLine, FileText }

function PortalCard({ portal, index }: { portal: typeof RESULT_PORTALS[0]; index: number }) {
  const navigate = useNavigate()
  const Icon  = ICON_MAP[portal.icon] ?? FlaskConical
  const isLab = index === 0
  const CtaIcon = portal.internal ? FileText : ExternalLink

  const handleClick = () => {
    if (portal.internal) navigate(portal.url)
    else window.open(portal.url, '_blank', 'noopener,noreferrer')
  }

  return (
    <motion.div variants={staggerItem} style={{ perspective: '1000px' }}>
      <Card3D
        intensity={6}
        className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-clinic-800 to-clinic-950 shadow-clinic-lg hover:shadow-clinic-xl transition-shadow duration-500"
      >
        {/* Color overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br opacity-60 ${portal.color}`} aria-hidden="true" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
          aria-hidden="true"
        />

        {/* Orb */}
        <div
          className={`absolute ${isLab ? '-top-16 -right-16' : '-bottom-16 -left-16'} w-48 h-48 rounded-full blur-3xl opacity-40 bg-white pointer-events-none`}
          aria-hidden="true"
        />

        {/* Content */}
        <div className="relative z-10 p-8 md:p-10 flex flex-col min-h-[360px]">
          {/* Top row */}
          <div className="flex items-start justify-between mb-8">
            <div className="w-16 h-16 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center backdrop-blur-sm" style={{ transform: 'translateZ(16px)' }}>
              <Icon size={30} className="text-white" strokeWidth={1.6} aria-hidden="true" />
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-full px-3 py-1 backdrop-blur-sm">
              <Lock size={11} className="text-white/80" />
              <span className="text-white/80 text-xs font-medium">Acceso seguro</span>
            </div>
          </div>

          {/* Text */}
          <div className="flex-1" style={{ transform: 'translateZ(8px)' }}>
            <p className="text-white/60 text-xs font-semibold tracking-[0.15em] uppercase mb-2">{portal.subtitle}</p>
            <h3 className="font-display font-bold text-white text-2xl md:text-3xl mb-4 leading-tight">{portal.title}</h3>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">{portal.description}</p>
          </div>

          {/* Security badges */}
          <div className="flex flex-wrap items-center gap-2 my-6">
            {['SSL Seguro', 'Privacidad', 'Datos protegidos'].map((badge) => (
              <span key={badge} className="flex items-center gap-1 text-white/50 text-xs px-2 py-1 rounded-full border border-white/10">
                <Shield size={10} aria-hidden="true" />
                {badge}
              </span>
            ))}
          </div>

          {/* CTA */}
          <motion.button
            onClick={handleClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-between px-6 py-4 rounded-2xl bg-white text-clinic-700 font-semibold text-sm shadow-xl hover:shadow-2xl transition-shadow duration-200 group/btn"
            aria-label={portal.ctaLabel ?? `Acceder a ${portal.title}`}
            style={{ transform: 'translateZ(20px)' }}
          >
            <span className="flex items-center gap-2">
              <CtaIcon size={16} aria-hidden="true" />
              {portal.ctaLabel ?? `Acceder a ${portal.subtitle}`}
            </span>
            <ArrowUpRight size={18} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" aria-hidden="true" />
          </motion.button>
        </div>
      </Card3D>
    </motion.div>
  )
}

export function MedicalResults() {
  return (
    <section id="resultados" className="section-padding bg-dark overflow-hidden relative">
      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: `radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)`, backgroundSize: '32px 32px' }}
        aria-hidden="true"
      />
      {/* Ambient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-clinic-600/20 blur-[100px] pointer-events-none" aria-hidden="true" />

      <div className="container-xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 text-sky-300/80 font-semibold text-xs tracking-[0.15em] uppercase bg-sky-500/10 border border-sky-400/20 px-3.5 py-1.5 rounded-full mb-5">
            Portal de Pacientes
          </span>
          <h2 className="font-display font-bold text-4xl xl:text-5xl text-white mb-4 text-balance">
            Tus resultados médicos,{' '}
            <span className="bg-gradient-to-r from-sky-300 to-white bg-clip-text text-transparent">al instante</span>
          </h2>
          <p className="text-white/55 text-lg leading-relaxed">
            Consulta de forma segura tus resultados de laboratorio e imágenes diagnósticas, y
            solicita tu historia clínica en línea desde cualquier dispositivo.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_CONFIG}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto"
        >
          {RESULT_PORTALS.map((portal, i) => (
            <PortalCard key={portal.id} portal={portal} index={i} />
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-white/35 text-xs mt-10"
        >
          ¿Problemas para acceder? Llámanos al{' '}
          <a href="tel:6053133990" className="text-clinic-300 hover:text-white transition-colors">
            605 3133990
          </a>
        </motion.p>
      </div>
    </section>
  )
}
