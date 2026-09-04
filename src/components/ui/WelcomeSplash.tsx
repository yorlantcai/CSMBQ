import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface WelcomeSplashProps { onDone: () => void }

const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  x:  Math.random() * 100,
  y:  Math.random() * 100,
  size: Math.random() * 3 + 1,
  dur:  Math.random() * 4 + 3,
  delay: Math.random() * 2,
  opacity: Math.random() * 0.4 + 0.1,
}))

const RINGS = [0, 1, 2, 3]

export function WelcomeSplash({ onDone }: WelcomeSplashProps) {
  const [exiting, setExiting] = useState(false)

  const mouseX  = useMotionValue(0)
  const mouseY  = useMotionValue(0)
  const sMouseX = useSpring(mouseX, { stiffness: 80, damping: 18 })
  const sMouseY = useSpring(mouseY, { stiffness: 80, damping: 18 })
  const rotateY = useTransform(sMouseX, [-300, 300], [-18, 18])
  const rotateX = useTransform(sMouseY, [-300, 300], [12, -12])

  const handleDone = useCallback(() => {
    if (exiting) return
    setExiting(true)
    setTimeout(onDone, 900)
  }, [exiting, onDone])

  // Auto dismiss after 5s
  useEffect(() => {
    const t = setTimeout(handleDone, 5000)
    return () => clearTimeout(t)
  }, [handleDone])

  const onMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX - window.innerWidth  / 2)
    mouseY.set(e.clientY - window.innerHeight / 2)
  }
  const onMouseLeave = () => { mouseX.set(0); mouseY.set(0) }

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden cursor-pointer select-none"
          style={{ background: 'radial-gradient(ellipse 120% 100% at 50% 0%, #0D3B6E 0%, #041A36 55%, #020C1B 100%)' }}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          onClick={handleDone}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ y: '-100%', transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] } }}
        >
          {/* ── Grid overlay ────────────────────── */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.05]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
              backgroundSize: '64px 64px',
            }}
            aria-hidden="true"
          />

          {/* ── Floating particles ──────────────── */}
          {PARTICLES.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-sky-400 pointer-events-none"
              style={{
                left: `${p.x}%`, top: `${p.y}%`,
                width: p.size, height: p.size,
                opacity: p.opacity,
              }}
              animate={{ y: [-12, 12, -12], opacity: [p.opacity, p.opacity * 2, p.opacity] }}
              transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden="true"
            />
          ))}

          {/* ── Ambient orbs ────────────────────── */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{ width: 700, height: 700, background: 'rgba(27,94,166,0.22)', filter: 'blur(100px)', top: '-15%', left: '-10%' }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          />
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{ width: 500, height: 500, background: 'rgba(14,165,233,0.18)', filter: 'blur(80px)', bottom: '-10%', right: '-8%' }}
            animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            aria-hidden="true"
          />

          {/* ── Pulsing rings ───────────────────── */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
            {RINGS.map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border border-clinic-400/20"
                initial={{ width: 160, height: 160, opacity: 0 }}
                animate={{ width: [160, 700], height: [160, 700], opacity: [0.5, 0] }}
                transition={{ duration: 3.5, delay: i * 0.9, repeat: Infinity, ease: 'easeOut' }}
              />
            ))}
          </div>

          {/* ── ECG line ────────────────────────── */}
          <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none" aria-hidden="true">
            <svg viewBox="0 0 1200 80" className="w-full h-full" preserveAspectRatio="none">
              <motion.path
                d="M0,40 L200,40 L240,40 L260,8 L280,72 L300,8 L320,72 L340,40 L400,40 L440,40 L460,15 L480,65 L500,40 L600,40 L640,40 L660,8 L680,72 L700,8 L720,72 L740,40 L900,40 L940,40 L960,15 L980,65 L1000,40 L1200,40"
                stroke="rgba(14,165,233,0.45)"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2.5, delay: 0.5, ease: 'easeInOut' }}
              />
            </svg>
          </div>

          {/* ── Main content ────────────────────── */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl" style={{ perspective: '1200px' }}>

            {/* Logo card 3D */}
            <motion.div
              style={{ rotateY, rotateX, transformStyle: 'preserve-3d' }}
              initial={{ opacity: 0, scale: 0.4, rotateX: -80, y: 60 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0,   y: 0  }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mb-10"
            >
              {/* Glow behind logo */}
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.35) 0%, transparent 70%)',
                  filter: 'blur(24px)',
                  transform: 'translateZ(-10px) scale(1.3)',
                }}
                aria-hidden="true"
              />

              {/* Logo on frosted card */}
              <div
                className="relative px-10 py-8 rounded-3xl flex items-center justify-center"
                style={{
                  background: 'rgba(255,255,255,0.10)',
                  backdropFilter: 'blur(24px)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  boxShadow: '0 32px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
                  transform: 'translateZ(40px)',
                }}
              >
                <img
                  src="/logo.png"
                  alt="Clínica San Martín Barranquilla Ltda."
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/logo-placeholder.svg' }}
                  className="h-20 sm:h-24 w-auto object-contain"
                  draggable={false}
                  style={{ filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.4))' }}
                />
              </div>
            </motion.div>

            {/* "Bienvenidos a" label */}
            <motion.p
              initial={{ opacity: 0, y: 20, letterSpacing: '0.5em' }}
              animate={{ opacity: 1, y: 0, letterSpacing: '0.2em' }}
              transition={{ duration: 0.7, delay: 1.0 }}
              className="text-sky-300/80 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] mb-3"
            >
              Bienvenidos a
            </motion.p>

            {/* Clinic name — main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30, scale: 0.94 }}
              animate={{ opacity: 1, y: 0,  scale: 1    }}
              transition={{ duration: 0.75, delay: 1.25, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-bold text-white mb-3 text-balance leading-tight"
              style={{ fontSize: 'clamp(1.6rem, 5vw, 3rem)' }}
            >
              Clínica San Martín{' '}
              <span className="bg-gradient-to-r from-sky-300 via-white to-sky-200 bg-clip-text text-transparent">
                Barranquilla LTDA.
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0  }}
              transition={{ duration: 0.65, delay: 1.7 }}
              className="text-white/60 text-base sm:text-xl font-light tracking-wide mb-10"
            >
              Trabajamos por tu bienestar.
            </motion.p>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.0 }}
              className="w-48 sm:w-64"
            >
              <div className="h-[2px] rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-clinic-400 to-sky-400"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 3.0, delay: 2.0, ease: 'linear' }}
                />
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.3 }}
                className="text-white/30 text-[11px] text-center mt-2 tracking-widest uppercase"
              >
                Toca para ingresar
              </motion.p>
            </motion.div>

          </div>

          {/* ── Top horizontal accent lines ─────── */}
          <div className="absolute top-0 left-0 right-0 pointer-events-none" aria-hidden="true">
            <motion.div
              className="h-[1px] bg-gradient-to-r from-transparent via-clinic-400/50 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
            />
          </div>

          {/* ── Corner decorations ──────────────── */}
          {[
            'top-6 left-6 border-t-2 border-l-2',
            'top-6 right-6 border-t-2 border-r-2',
            'bottom-6 left-6 border-b-2 border-l-2',
            'bottom-6 right-6 border-b-2 border-r-2',
          ].map((cls, i) => (
            <motion.div
              key={i}
              className={`absolute w-8 h-8 border-clinic-400/40 ${cls}`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
              aria-hidden="true"
            />
          ))}

        </motion.div>
      )}
    </AnimatePresence>
  )
}
