import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, ChevronRight, ChevronDown, Clock, Network, BookOpen, Shield } from 'lucide-react'
import { useAppStore } from '@/store/appStore'
import { useNavScroll } from '@/hooks/useNavScroll'
import { NAV_LINKS } from '@/constants'

function scrollToSection(href: string) {
  const id = href.replace('#', '')
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const NOSOTROS_ITEMS = [
  { label: 'Historia',          href: '/nosotros/historia',         icon: Clock     },
  { label: 'Organigrama',       href: '/nosotros/organigrama',      icon: Network   },
  { label: 'Plan Estratégico',  href: '/nosotros/plan-estrategico', icon: BookOpen  },
  { label: 'Políticas',         href: '/nosotros/politicas',        icon: Shield    },
]

export function Navbar() {
  useNavScroll(60)
  const { isNavScrolled, isMobileMenuOpen, toggleMobileMenu, setMobileMenuOpen } = useAppStore()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [nosotrosOpen, setNosotrosOpen] = useState(false)
  const [nosotrosMobileExpanded, setNosotrosMobileExpanded] = useState(false)
  const nosotrosRef = useRef<HTMLLIElement>(null)

  const goToSection = useCallback((href: string) => {
    // Hrefs absolutos (ej. /pacientes) navegan directamente como ruta
    if (href.startsWith('/')) {
      navigate(href)
      return
    }
    if (pathname === '/') {
      scrollToSection(href)
    } else {
      navigate('/' + href)
    }
  }, [pathname, navigate])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMobileMenuOpen])

  const isScrolled = isNavScrolled

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1, height: isScrolled ? 68 : 96 }}
        transition={{
          y:      { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
          opacity:{ duration: 0.6, ease: [0.22, 1, 0.36, 1] },
          height: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
        }}
        role="banner"
        className={[
          'fixed top-0 left-0 right-0 z-50',
          isScrolled
            ? 'nav-blur bg-white/85 border-b border-clinic-100/60 shadow-[0_1px_24px_rgba(27,94,166,0.10)]'
            : 'bg-transparent border-b border-transparent',
        ].join(' ')}
      >
        <nav
          className="container-xl h-full flex items-center justify-between"
          aria-label="Navegación principal"
        >
          {/* Logo */}
          <a
            href="/#inicio"
            onClick={(e) => { e.preventDefault(); goToSection('#inicio') }}
            className="flex items-center shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-clinic-500 rounded-lg"
            aria-label="Clínica San Martín Barranquilla — Ir al inicio"
          >
            <img
              src={import.meta.env.BASE_URL + 'logo.png'}
              alt="Clínica San Martín Barranquilla Ltda."
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/logo-placeholder.svg' }}
              className={[
                'transition-all duration-300 object-contain select-none w-auto',
                isScrolled
                  ? 'h-9 md:h-10'
                  : 'h-14 md:h-16',
                isScrolled ? 'drop-shadow-none' : 'drop-shadow-[0_2px_16px_rgba(255,255,255,0.35)]',
              ].join(' ')}
              width={200}
              height={48}
              draggable={false}
            />
          </a>

          {/* Desktop nav links */}
          <ul className="hidden lg:flex items-center gap-1" role="list">
            {NAV_LINKS.map((link) => {
              const isNosotros = link.label === 'Nosotros'

              if (isNosotros) {
                return (
                  <li key={link.href} ref={nosotrosRef} className="relative">
                    <div
                      onMouseEnter={() => setNosotrosOpen(true)}
                      onMouseLeave={() => setNosotrosOpen(false)}
                    >
                      <button
                        onClick={() => goToSection(link.href)}
                        className={[
                          'flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                          'hover:bg-clinic-50 hover:text-clinic-600',
                          isScrolled ? 'text-dark/80' : 'text-white/90 hover:bg-white/10 hover:text-white',
                        ].join(' ')}
                      >
                        {link.label}
                        <motion.span animate={{ rotate: nosotrosOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                          <ChevronDown size={12} strokeWidth={2.5} />
                        </motion.span>
                      </button>

                      {/* Dropdown */}
                      <AnimatePresence>
                        {nosotrosOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -6, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -6, scale: 0.97 }}
                            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 w-48 bg-white rounded-2xl shadow-xl border border-clinic-100/80 overflow-hidden z-50"
                          >
                            {NOSOTROS_ITEMS.map((item, idx) => {
                              const Icon = item.icon
                              return (
                                <Link
                                  key={item.href}
                                  to={item.href}
                                  onClick={() => setNosotrosOpen(false)}
                                  className={[
                                    'flex items-center gap-2.5 px-4 py-3 text-sm text-dark/75 hover:bg-clinic-50 hover:text-clinic-600 transition-colors',
                                    idx < NOSOTROS_ITEMS.length - 1 ? 'border-b border-clinic-50' : '',
                                  ].join(' ')}
                                >
                                  <Icon size={14} className="text-clinic-400 shrink-0" />
                                  {item.label}
                                </Link>
                              )
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </li>
                )
              }

              return (
                <li key={link.href}>
                  <button
                    onClick={() => goToSection(link.href)}
                    className={[
                      'px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                      'hover:bg-clinic-50 hover:text-clinic-600',
                      isScrolled ? 'text-dark/80' : 'text-white/90 hover:bg-white/10 hover:text-white',
                    ].join(' ')}
                  >
                    {link.label}
                  </button>
                </li>
              )
            })}
          </ul>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+605-313-3990"
              className={[
                'flex items-center gap-1.5 text-sm font-medium transition-colors duration-200',
                isScrolled ? 'text-clinic-500 hover:text-clinic-700' : 'text-white/80 hover:text-white',
              ].join(' ')}
              aria-label="Llamar a la clínica"
            >
              <Phone size={14} strokeWidth={2.5} />
              <span className="hidden xl:inline">313 3990</span>
            </a>

            <button
              onClick={() => goToSection('#resultados')}
              className={[
                'flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold',
                'transition-all duration-200 active:scale-95',
                isScrolled
                  ? 'bg-clinic-500 text-white hover:bg-clinic-600 shadow-clinic'
                  : 'bg-white text-clinic-600 hover:bg-white/95 shadow-lg',
              ].join(' ')}
            >
              Resultados
              <ChevronRight size={14} strokeWidth={2.5} />
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={toggleMobileMenu}
            className={[
              'lg:hidden p-2.5 rounded-xl transition-all duration-200',
              isScrolled
                ? 'text-dark hover:bg-clinic-50'
                : 'text-white hover:bg-white/10',
            ].join(' ')}
            aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMobileMenuOpen
                ? <motion.span key="x"  initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X size={22} /></motion.span>
                : <motion.span key="mn" initial={{ rotate: 90, opacity: 0 }}  animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><Menu size={22} /></motion.span>
              }
            </AnimatePresence>
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-dark/50 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              id="mobile-menu"
              role="dialog"
              aria-label="Menú de navegación"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-80 max-w-[85vw] bg-white shadow-2xl lg:hidden flex flex-col"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between p-5 border-b border-clinic-100/60">
                <img src={import.meta.env.BASE_URL + 'logo.png'} alt="Clínica San Martín" onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/logo-placeholder.svg' }} className="h-9 w-auto object-contain" />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl text-dark/70 hover:bg-clinic-50 hover:text-clinic-600 transition-colors"
                  aria-label="Cerrar menú"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto p-4" aria-label="Navegación móvil">
                <ul className="space-y-1" role="list">
                  {NAV_LINKS.map((link, i) => {
                    const isNosotros = link.label === 'Nosotros'

                    return (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.3 }}
                      >
                        {isNosotros ? (
                          <div>
                            <button
                              onClick={() => setNosotrosMobileExpanded((p) => !p)}
                              className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-dark font-medium hover:bg-clinic-50 hover:text-clinic-600 transition-colors text-left"
                            >
                              {link.label}
                              <motion.span animate={{ rotate: nosotrosMobileExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                <ChevronDown size={16} className="text-clinic-400" />
                              </motion.span>
                            </button>
                            <AnimatePresence initial={false}>
                              {nosotrosMobileExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.22 }}
                                  className="overflow-hidden"
                                >
                                  <div className="ml-4 mt-0.5 space-y-0.5 border-l-2 border-clinic-100 pl-3">
                                    {NOSOTROS_ITEMS.map((item) => {
                                      const Icon = item.icon
                                      return (
                                        <Link
                                          key={item.href}
                                          to={item.href}
                                          onClick={() => setMobileMenuOpen(false)}
                                          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-dark/70 text-sm hover:bg-clinic-50 hover:text-clinic-600 transition-colors"
                                        >
                                          <Icon size={14} className="text-clinic-400 shrink-0" />
                                          {item.label}
                                        </Link>
                                      )
                                    })}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <button
                            onClick={() => { goToSection(link.href); setMobileMenuOpen(false) }}
                            className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-dark font-medium hover:bg-clinic-50 hover:text-clinic-600 transition-colors text-left"
                          >
                            {link.label}
                            <ChevronRight size={16} className="text-clinic-400" />
                          </button>
                        )}
                      </motion.li>
                    )
                  })}
                </ul>
              </nav>

              {/* Drawer footer */}
              <div className="p-4 border-t border-clinic-100/60 space-y-3">
                <a
                  href="tel:+575-360-0600"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-clinic-50 text-clinic-600 font-medium text-sm"
                >
                  <Phone size={16} />
                  +57 5 360 0600
                </a>
                <button
                  onClick={() => { goToSection('#resultados'); setMobileMenuOpen(false) }}
                  className="btn-primary w-full justify-center"
                >
                  Resultados Médicos
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
