import { motion } from 'framer-motion'
import { Card3D } from '@/components/ui/Card3D'
import { staggerContainer, staggerItem, VIEWPORT_CONFIG } from '@/utils/animations'

// ── Tipado ────────────────────────────────────────────────────────────────────
interface TileData {
  src: string; alt: string; label: string; caption: string
  span: string; intensity: number; objectPos: string; aspect?: string
}

// ── Bento Grid — área clínica principal ──────────────────────────────────────
const TILES_1: TileData[] = [
  {
    src: import.meta.env.BASE_URL + 'images/URG_0001.png',
    alt: 'Equipo médico especializado Clínica San Martín Barranquilla',
    label: 'Equipo Médico',
    caption: 'Profesionales altamente especializados y comprometidos',
    span: 'md:col-span-2 md:row-span-2',
    intensity: 6,
    aspect: 'aspect-[4/3] md:aspect-auto md:h-full',
    objectPos: 'object-center',
  },
  {
    src: import.meta.env.BASE_URL + 'images/DSC_0149.JPG',
    alt: 'Atención humanizada Clínica San Martín Barranquilla',
    label: 'Humanización',
    caption: 'El paciente, siempre al centro de cada decisión',
    span: 'md:col-span-1 md:row-span-2',
    intensity: 8,
    aspect: 'aspect-[3/4] md:aspect-auto md:h-full',
    objectPos: 'object-top',
  },
]

// ── Subcomponente: tarjeta bento ──────────────────────────────────────────────
function BentoTile({ tile }: { tile: TileData }) {
  return (
    <motion.div
      variants={staggerItem}
      className={tile.span}
      style={{ perspective: '900px' }}
    >
      <Card3D
        intensity={tile.intensity}
        className="group relative overflow-hidden rounded-3xl h-full border border-white/10 shadow-clinic-lg hover:shadow-clinic-xl transition-shadow duration-500"
      >
        <div className={`relative overflow-hidden rounded-3xl h-full ${tile.aspect ?? ''}`}>
          <img
            src={tile.src}
            alt={tile.alt}
            className={`w-full h-full object-cover ${tile.objectPos} scale-105 group-hover:scale-100 transition-transform duration-700`}
            loading="lazy"
          />
          {/* Gradient base */}
          <div className="absolute inset-0 bg-gradient-to-t from-clinic-950/85 via-clinic-950/20 to-transparent" aria-hidden="true" />
          {/* Hover shine */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/5 group-hover:to-transparent transition-all duration-500" aria-hidden="true" />
          {/* Caption */}
          <div className="absolute bottom-0 left-0 right-0 p-5" style={{ transform: 'translateZ(16px)' }}>
            <p className="text-white font-display font-bold text-base leading-tight mb-1">{tile.label}</p>
            <p className="text-white/55 text-xs leading-relaxed translate-y-1 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
              {tile.caption}
            </p>
          </div>
          {/* Accent line */}
          <div className="absolute top-4 left-4 w-8 h-[2px] bg-sky-400/60 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" aria-hidden="true" />
        </div>
      </Card3D>
    </motion.div>
  )
}

// ── Componente principal ──────────────────────────────────────────────────────
export function Gallery() {
  return (
    <section className="section-padding bg-dark overflow-hidden relative">
      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: `radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)`, backgroundSize: '28px 28px' }}
        aria-hidden="true"
      />
      {/* Ambient orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] rounded-full bg-clinic-600/8 blur-[140px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[400px] rounded-full bg-sky-600/6 blur-[120px] pointer-events-none" aria-hidden="true" />

      <div className="container-xl relative z-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="inline-flex items-center gap-2 text-sky-300/80 font-semibold text-xs tracking-[0.15em] uppercase bg-sky-500/10 border border-sky-400/20 px-3.5 py-1.5 rounded-full mb-5">
            Nuestra Clínica
          </span>
          <h2 className="font-display font-bold text-4xl xl:text-5xl text-white mb-4 text-balance">
            Conózcanos{' '}
            <span className="bg-gradient-to-r from-sky-300 to-white bg-clip-text text-transparent">por dentro</span>
          </h2>
          <p className="text-white/50 text-lg leading-relaxed">
            Instalaciones de última generación, un equipo humano excepcional
            y un compromiso inquebrantable con cada paciente.
          </p>
        </motion.div>

        {/* ── Bento Grid ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_CONFIG}
          className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-[280px_280px] gap-4"
          style={{ perspective: '1200px' }}
        >
          {TILES_1.map((tile) => (
            <BentoTile key={tile.src} tile={tile} />
          ))}
        </motion.div>

        {/* ── Strip panorámico Principal ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 relative overflow-hidden rounded-3xl border border-white/10 shadow-clinic-xl"
          style={{ perspective: '900px' }}
        >
          <Card3D intensity={4} className="relative">
            <div className="relative aspect-[21/6] overflow-hidden rounded-3xl">
              <img
                src={import.meta.env.BASE_URL + 'images/Principal.jpg'}
                alt="Fachada principal Clínica San Martín Barranquilla Ltda."
                className="w-full h-full object-cover object-[center_40%] scale-105 hover:scale-100 transition-transform duration-1000"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-clinic-950/75 via-transparent to-clinic-950/40" aria-hidden="true" />
              <div className="absolute inset-0 bg-gradient-to-t from-clinic-950/60 via-transparent to-transparent" aria-hidden="true" />

              {/* Texto izquierda */}
              <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 max-w-[60%] md:max-w-none" style={{ transform: 'translate(0, -50%) translateZ(20px)' }}>
                <p className="text-sky-300/80 text-xs font-semibold tracking-[0.2em] uppercase mb-2">Barranquilla, Colombia</p>
                <h3 className="font-display font-bold text-white text-xl md:text-4xl leading-tight">
                  Clínica San Martín<br />
                  <span className="bg-gradient-to-r from-sky-300 to-white bg-clip-text text-transparent">
                    Barranquilla Ltda.
                  </span>
                </h3>
                <p className="text-white/50 text-xs md:text-sm mt-2">Carrera 43 No. 70 – 106</p>
              </div>

            </div>
          </Card3D>
        </motion.div>

      </div>
    </section>
  )
}
