import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { TrendingUp, Users, Award, BedDouble } from 'lucide-react'
import { staggerContainer, staggerItem, VIEWPORT_CONFIG } from '@/utils/animations'
import { Card3D } from '@/components/ui/Card3D'
import { STATS } from '@/constants'

const ICONS = [TrendingUp, Users, Award, BedDouble]

function AnimatedCounter({ target, suffix, duration = 2200, trigger }: {
  target: number; suffix: string; duration?: number; trigger: boolean
}) {
  const [count, setCount] = useState(0)
  const started = useRef(false)
  useEffect(() => {
    if (!trigger || started.current) return
    started.current = true
    const t0 = performance.now()
    const step = (now: number) => {
      const p = Math.min((now - t0) / duration, 1)
      setCount(Math.round(target * (1 - Math.pow(1 - p, 3))))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [trigger, target, duration])
  return <span>{count.toLocaleString('es-CO')}{suffix}</span>
}

export function Statistics() {
  const ref      = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section id="estadisticas" className="relative py-24 lg:py-32 overflow-hidden" aria-label="Estadísticas">

      {/* ── Gradient background ─────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-br from-clinic-500 via-clinic-600 to-clinic-800" aria-hidden="true" />

      {/* ── Grid overlay ────────────────────────── */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />

      {/* ── Rotating 3D ring decoration ─────────── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden" aria-hidden="true">
        <motion.div
          className="rounded-full border border-white/8"
          style={{ width: 700, height: 700 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        >
          {/* Dot on the ring */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-sky-400/60" />
        </motion.div>
        <motion.div
          className="absolute rounded-full border border-white/5"
          style={{ width: 500, height: 500 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-clinic-300/80" />
        </motion.div>
        <motion.div
          className="absolute rounded-full border border-white/4"
          style={{ width: 300, height: 300 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* ── Orbs ────────────────────────────────── */}
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/5 blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-sky-400/10 blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="container-xl relative z-10" ref={ref}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-display font-bold text-3xl md:text-4xl xl:text-5xl text-white mb-3">
            Números que respaldan{' '}
            <span className="text-sky-200">nuestra trayectoria</span>
          </h2>
          <p className="text-white/60 text-base max-w-lg mx-auto">
            Décadas de experiencia, miles de vidas transformadas y un compromiso
            inquebrantable con la excelencia médica.
          </p>
        </motion.div>

        {/* Stats grid con Card3D */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_CONFIG}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          style={{ perspective: '1200px' }}
        >
          {STATS.map((stat, i) => {
            const Icon = ICONS[i]
            return (
              <motion.div key={stat.label} variants={staggerItem}>
                <Card3D
                  intensity={12}
                  className="relative text-center p-6 md:p-8 rounded-3xl bg-white/10 border border-white/15 backdrop-blur-sm hover:bg-white/18 transition-colors duration-300 h-full"
                >
                  <div style={{ transform: 'translateZ(24px)' }}>
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center mx-auto mb-4">
                      <Icon size={22} className="text-white/90" strokeWidth={1.8} aria-hidden="true" />
                    </div>

                    {/* Counter */}
                    <div className="font-display font-bold text-3xl md:text-4xl xl:text-5xl text-white mb-2 leading-none">
                      <AnimatedCounter target={stat.value} suffix={stat.suffix} trigger={isInView} />
                    </div>

                    <div className="text-white font-semibold text-sm mb-1">{stat.label}</div>
                    {stat.description && (
                      <div className="text-white/50 text-xs">{stat.description}</div>
                    )}
                  </div>
                </Card3D>
              </motion.div>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}
