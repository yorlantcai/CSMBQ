import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, VIEWPORT_CONFIG } from '@/utils/animations'
import { HORA_DORADA_PROGRAMS } from '@/constants'

export function HoraDorada() {
  return (
    <section
      id="fundacion"
      className="section-padding overflow-hidden relative"
      style={{ background: 'linear-gradient(135deg, #fff8f0 0%, #fff3e0 50%, #fef9ec 100%)' }}
    >
      {/* Orb decorativo */}
      <div
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, #f97316, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 -left-24 w-[380px] h-[380px] rounded-full pointer-events-none opacity-15"
        style={{ background: 'radial-gradient(circle, #fbbf24, transparent 70%)' }}
        aria-hidden="true"
      />

      {/* ── Decoración izquierda: hojas y corazones ── */}
      <div className="absolute left-0 top-0 h-full pointer-events-none select-none hidden sm:block" aria-hidden="true" style={{ width: 120 }}>
        {/* Hoja grande superior izquierda */}
        <svg viewBox="0 0 90 120" className="absolute -left-6 top-16 w-20 opacity-70" xmlns="http://www.w3.org/2000/svg">
          <path d="M70 10 C70 10 80 60 40 100 C20 80 10 50 30 20 C45 5 70 10 70 10Z" fill="#f97316" opacity="0.55" />
          <path d="M70 10 C50 40 40 70 40 100" stroke="#ea580c" strokeWidth="1.5" fill="none" opacity="0.6" />
        </svg>
        {/* Hoja pequeña izquierda media */}
        <svg viewBox="0 0 60 80" className="absolute -left-3 top-[40%] w-12 opacity-60" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 8 C50 8 55 40 25 65 C10 50 8 30 20 12 C32 2 50 8 50 8Z" fill="#fbbf24" opacity="0.65" />
          <path d="M50 8 C35 28 28 48 25 65" stroke="#d97706" strokeWidth="1.2" fill="none" opacity="0.5" />
        </svg>
        {/* Corazón izquierda */}
        <svg viewBox="0 0 40 36" className="absolute left-4 top-[62%] w-8 opacity-70" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 32 C20 32 2 20 2 10 C2 4 7 1 12 3 C15 4 18 7 20 10 C22 7 25 4 28 3 C33 1 38 4 38 10 C38 20 20 32 20 32Z" fill="#f97316" />
        </svg>
        {/* Florecita izquierda abajo */}
        <svg viewBox="0 0 50 50" className="absolute -left-2 bottom-24 w-10 opacity-55" xmlns="http://www.w3.org/2000/svg">
          <circle cx="25" cy="25" r="7" fill="#fbbf24" />
          <ellipse cx="25" cy="10" rx="5" ry="8" fill="#fed7aa" />
          <ellipse cx="25" cy="40" rx="5" ry="8" fill="#fed7aa" />
          <ellipse cx="10" cy="25" rx="8" ry="5" fill="#fed7aa" />
          <ellipse cx="40" cy="25" rx="8" ry="5" fill="#fed7aa" />
          <ellipse cx="14" cy="14" rx="5" ry="8" fill="#fde68a" transform="rotate(-45 14 14)" />
          <ellipse cx="36" cy="14" rx="5" ry="8" fill="#fde68a" transform="rotate(45 36 14)" />
          <ellipse cx="14" cy="36" rx="5" ry="8" fill="#fde68a" transform="rotate(45 14 36)" />
          <ellipse cx="36" cy="36" rx="5" ry="8" fill="#fde68a" transform="rotate(-45 36 36)" />
        </svg>
        {/* Hoja abajo izquierda */}
        <svg viewBox="0 0 70 100" className="absolute -left-4 bottom-6 w-16 opacity-60" xmlns="http://www.w3.org/2000/svg">
          <path d="M55 8 C55 8 65 50 30 88 C12 68 8 40 22 16 C36 2 55 8 55 8Z" fill="#fb923c" opacity="0.50" />
          <path d="M55 8 C38 35 32 60 30 88" stroke="#ea580c" strokeWidth="1.2" fill="none" opacity="0.45" />
        </svg>
      </div>

      {/* ── Decoración derecha: hojas y corazones ── */}
      <div className="absolute right-0 top-0 h-full pointer-events-none select-none hidden sm:block" aria-hidden="true" style={{ width: 120 }}>
        {/* Hoja grande superior derecha — espejada */}
        <svg viewBox="0 0 90 120" className="absolute -right-6 top-12 w-20 opacity-70 scale-x-[-1]" xmlns="http://www.w3.org/2000/svg">
          <path d="M70 10 C70 10 80 60 40 100 C20 80 10 50 30 20 C45 5 70 10 70 10Z" fill="#f97316" opacity="0.55" />
          <path d="M70 10 C50 40 40 70 40 100" stroke="#ea580c" strokeWidth="1.5" fill="none" opacity="0.6" />
        </svg>
        {/* Corazón pequeño derecha alta */}
        <svg viewBox="0 0 30 27" className="absolute right-6 top-[30%] w-6 opacity-75" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 24 C15 24 1 15 1 7 C1 3 5 1 9 2.5 C11 3.5 13 5.5 15 8 C17 5.5 19 3.5 21 2.5 C25 1 29 3 29 7 C29 15 15 24 15 24Z" fill="#fbbf24" />
        </svg>
        {/* Hoja media derecha */}
        <svg viewBox="0 0 60 80" className="absolute -right-3 top-[45%] w-12 opacity-60 scale-x-[-1]" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 8 C50 8 55 40 25 65 C10 50 8 30 20 12 C32 2 50 8 50 8Z" fill="#fbbf24" opacity="0.65" />
          <path d="M50 8 C35 28 28 48 25 65" stroke="#d97706" strokeWidth="1.2" fill="none" opacity="0.5" />
        </svg>
        {/* Florecita derecha */}
        <svg viewBox="0 0 50 50" className="absolute right-2 top-[68%] w-9 opacity-55" xmlns="http://www.w3.org/2000/svg">
          <circle cx="25" cy="25" r="7" fill="#f97316" />
          <ellipse cx="25" cy="10" rx="5" ry="8" fill="#fed7aa" />
          <ellipse cx="25" cy="40" rx="5" ry="8" fill="#fed7aa" />
          <ellipse cx="10" cy="25" rx="8" ry="5" fill="#fed7aa" />
          <ellipse cx="40" cy="25" rx="8" ry="5" fill="#fed7aa" />
          <ellipse cx="14" cy="14" rx="5" ry="8" fill="#fde68a" transform="rotate(-45 14 14)" />
          <ellipse cx="36" cy="14" rx="5" ry="8" fill="#fde68a" transform="rotate(45 36 14)" />
          <ellipse cx="14" cy="36" rx="5" ry="8" fill="#fde68a" transform="rotate(45 14 36)" />
          <ellipse cx="36" cy="36" rx="5" ry="8" fill="#fde68a" transform="rotate(-45 36 36)" />
        </svg>
        {/* Corazón grande derecha abajo */}
        <svg viewBox="0 0 40 36" className="absolute -right-2 bottom-20 w-10 opacity-65" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 32 C20 32 2 20 2 10 C2 4 7 1 12 3 C15 4 18 7 20 10 C22 7 25 4 28 3 C33 1 38 4 38 10 C38 20 20 32 20 32Z" fill="#fb923c" />
        </svg>
        {/* Hoja abajo derecha */}
        <svg viewBox="0 0 70 100" className="absolute -right-4 bottom-4 w-16 opacity-55 scale-x-[-1]" xmlns="http://www.w3.org/2000/svg">
          <path d="M55 8 C55 8 65 50 30 88 C12 68 8 40 22 16 C36 2 55 8 55 8Z" fill="#fb923c" opacity="0.50" />
          <path d="M55 8 C38 35 32 60 30 88" stroke="#ea580c" strokeWidth="1.2" fill="none" opacity="0.45" />
        </svg>
      </div>

      <div className="container-xl relative z-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="flex items-center justify-center gap-8 mb-8">
            <img
              src="/images/L_Hora_Dorada.png"
              alt="Logo Fundación Hora Dorada"
              className="h-36 w-auto object-contain"
            />
            <img
              src="/images/N_Hora_Dorada.png"
              alt="Niños Fundación Hora Dorada"
              className="h-32 w-auto object-contain"
            />
          </div>
          <h2 className="font-display font-bold text-3xl xl:text-4xl text-dark mb-4 text-balance">
            Llevamos luz a los corazones de niños y adultos con{' '}
            <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
              cáncer en Barranquilla
            </span>
          </h2>
          <p className="text-dark/60 text-lg leading-relaxed">
            Fundación Hora Dorada acompaña a pacientes con cáncer, adultos y pediátricos, y a sus familias,
            ofreciendo apoyo emocional y soporte integral en un entorno humanizado y seguro. Esta alianza
            refuerza nuestro compromiso con una atención integral y multidisciplinaria.
          </p>
        </motion.div>

        {/* ── Galería de fotos ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-16"
        >
          <div className="flex flex-col md:flex-row gap-4 max-w-5xl mx-auto" style={{ height: 460 }}>
            {/* Imagen principal */}
            <div
              className="rounded-3xl overflow-hidden shadow-xl flex-[1.2] relative group"
              style={{ border: '2px solid rgba(251,191,36,0.30)' }}
            >
              <img
                src="/images/FHD_003.jpg"
                alt="Actividades Fundación Hora Dorada"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Overlay sutil en hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-orange-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Dos imágenes apiladas */}
            <div className="flex flex-col gap-4 flex-1">
              {[
                { src: '/images/FHD_001.jpg', alt: 'Programa Hora Dorada' },
                { src: '/images/FHD_002.jpg', alt: 'Taller Hora Dorada' },
              ].map((img) => (
                <div
                  key={img.src}
                  className="rounded-3xl overflow-hidden shadow-xl flex-1 relative group"
                  style={{ border: '2px solid rgba(251,191,36,0.30)' }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Programas ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_CONFIG}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {HORA_DORADA_PROGRAMS.map((program) => (
            <motion.div key={program.title} variants={staggerItem}>
              <div className="group h-full p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg"
                style={{
                  background: 'rgba(255,255,255,0.70)',
                  borderColor: 'rgba(251,191,36,0.35)',
                  backdropFilter: 'blur(8px)',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(249,115,22,0.50)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(251,191,36,0.35)')}
              >
                <div
                  className="w-2 h-2 rounded-full mb-3"
                  style={{ background: 'linear-gradient(135deg, #f97316, #fbbf24)' }}
                  aria-hidden="true"
                />
                <h3 className="font-display font-semibold text-dark text-base mb-2 group-hover:text-orange-600 transition-colors">
                  {program.title}
                </h3>
                <p className="text-dark/55 text-sm leading-relaxed">
                  {program.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
