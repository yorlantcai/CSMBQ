import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, ArrowRight, FlaskConical, Award } from 'lucide-react'
import { YEARS_OF_SERVICE } from '@/constants'

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const FLOATING_ORBS = [
  { w: 700, h: 700, top: '-20%', left: '-12%',  color: 'rgba(27,94,166,0.30)',  delay: 0,   dur: 9  },
  { w: 450, h: 450, top: '25%',  right: '-8%',  color: 'rgba(14,165,233,0.22)', delay: 1.5, dur: 11 },
  { w: 320, h: 320, top: '60%',  left: '15%',   color: 'rgba(27,94,166,0.18)',  delay: 3,   dur: 7  },
  { w: 260, h: 260, top: '5%',   right: '28%',  color: 'rgba(78,150,220,0.15)', delay: 2,   dur: 10 },
]

const STATS_STRIP = [
  { value: `${YEARS_OF_SERVICE}+`, label: 'Años de Experiencia' },
  { value: '14+',  label: 'Especialidades'       },
  { value: '24/7', label: 'Urgencias'            },
  { value: '165',  label: 'Camas Hospitalarias'  },
]

const IMG_TEAM = '/images/Principal.jpg'

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
  const bgY      = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const opacity  = useTransform(scrollYProgress, [0, 0.55], [1, 0])

  return (
    <section
      id="inicio"
      ref={containerRef}
      className="relative min-h-screen flex flex-col overflow-hidden bg-hero-gradient"
      aria-label="Sección principal"
    >
      {/* ── Imagen de fondo ───────────────────────────── */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <img
          src={IMG_TEAM}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="eager"
        />
        <div className="absolute inset-0 bg-clinic-950/25" />
      </motion.div>

      {/* ── Orbs animados ─────────────────────────────── */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {FLOATING_ORBS.map((orb, i) => (
          <motion.div
            key={i}
            className="hero-orb absolute"
            style={{
              width: orb.w, height: orb.h,
              top: orb.top,
              left:  'left'  in orb ? orb.left  : undefined,
              right: 'right' in orb ? orb.right : undefined,
              background: orb.color,
            }}
            animate={{ y: [0, -18, 0], scale: [1, 1.06, 1] }}
            transition={{ duration: orb.dur, delay: orb.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </motion.div>


      {/* ── Vignette ──────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, transparent 0%, rgba(4,26,54,0.4) 100%)' }}
        aria-hidden="true"
      />

      {/* ── Contenido principal ───────────────────────── */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="container-xl w-full pt-[var(--nav-h)]">
          <div className="flex justify-start">

            {/* Texto izquierda */}
            <motion.div style={{ y: contentY, opacity }} className="text-left max-w-2xl">

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 mb-8"
              >
                <span className="flex items-center gap-1.5 text-xs font-semibold tracking-[0.15em] uppercase text-sky-300/90 bg-sky-500/10 border border-sky-400/20 px-4 py-1.5 rounded-full backdrop-blur-sm">
                  <Award size={12} className="text-sky-300" />
                  Alta Complejidad Médica — Barranquilla, Colombia
                </span>
              </motion.div>

              {/* Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-bold text-white leading-[1.05] mb-6 text-balance"
              >
                <span className="block text-4xl sm:text-5xl lg:text-5xl xl:text-5xl">Medicina de</span>
                <span className="block text-4xl sm:text-5xl lg:text-5xl xl:text-5xl bg-gradient-to-r from-sky-300 via-white to-sky-200 bg-clip-text text-transparent">
                  Alta Complejidad
                </span>
                {/* <span className="block text-4xl sm:text-5xl lg:text-5xl xl:text-6xl text-white/90">para Barranquilla</span> */}
              </motion.h1>

              {/* Subtítulo */}
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="text-white/70 text-lg sm:text-xl max-w-xl mb-10 leading-relaxed"
              >
                Nacimos, {/*YEARS_OF_SERVICE*/} Crecemos y Trabajamos con un solo objetivo: tu Bienestar y el de tu Familia.                
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-3"
              >
                <button
                  onClick={() => scrollTo('especialidades')}
                  className="group flex items-center gap-2 px-7 py-3.5 bg-white text-clinic-700 font-semibold text-sm rounded-xl shadow-xl hover:shadow-2xl hover:bg-white/95 transition-all duration-200 active:scale-95"
                >
                  Conocer Especialidades
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => scrollTo('resultados')}
                  className="group flex items-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm rounded-xl backdrop-blur-sm transition-all duration-200 active:scale-95"
                >
                  <FlaskConical size={16} className="text-sky-300" />
                  Resultados Médicos
                </button>
              </motion.div>
            </motion.div>


          </div>
        </div>
      </div>

      {/* ── Stats strip ───────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.9 }}
        className="relative z-10 border-t border-white/10 bg-dark/30 backdrop-blur-md"
      >
        <div className="container-xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
            {STATS_STRIP.map((stat) => (
              <div key={stat.label} className="px-6 py-5 text-center">
                <div className="text-2xl sm:text-3xl font-display font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs text-white/50 font-medium tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Scroll indicator ──────────────────────────── */}
      <motion.button
        onClick={() => scrollTo('nosotros')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors lg:left-[25%]"
        aria-label="Desplazarse hacia abajo"
      >
        <span className="text-xs font-medium tracking-widest uppercase">Explorar</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown size={20} />
        </motion.div>
      </motion.button>
    </section>
  )
}
