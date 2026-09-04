import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Globe, Heart, ExternalLink, Facebook, Instagram, Youtube } from 'lucide-react'
import { NAV_LINKS, CONTACT_INFO, YEARS_OF_SERVICE, CLINIC_SLOGAN } from '@/constants'
import { staggerContainer, staggerItem, VIEWPORT_CONFIG } from '@/utils/animations'

function scrollToSection(href: string) {
  const id = href.replace('#', '')
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const QUICK_ACCESS = [
  { label: 'Resultados de Laboratorio',   href: 'http://190.71.183.26:8080/resultados/#nbb', external: true },
  { label: 'Imágenes Diagnósticas',        href: 'https://lumierdigital.com:8443/paciente/login.lu?ipsId=92&token=ZgjZSYG7cA', external: true },
]

const SOCIAL = [
  { label: 'Facebook',  href: 'https://www.facebook.com/clinicasanmartinbaq',  Icon: Facebook  },
  { label: 'Instagram', href: 'https://www.instagram.com/clinicasanmartinbaq', Icon: Instagram },
  { label: 'YouTube',   href: 'https://www.youtube.com/@clinicasanmartinbaq',  Icon: Youtube   },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-dark text-white/80 pt-16 pb-6" role="contentinfo">
      <div className="container-xl">
        {/* Main grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_CONFIG}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10"
        >
          {/* Brand column */}
          <motion.div variants={staggerItem} className="lg:col-span-1">
            <img
              src="/logo.png"
              alt="Clínica San Martín Barranquilla Ltda."
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/logo-placeholder.svg' }}
              className="h-12 w-auto object-contain mb-5 brightness-0 invert opacity-90"
              width={200}
              height={48}
              draggable={false}
            />
            <p className="text-sm text-white/60 leading-relaxed mb-4">
              Institución de mediana y alta complejidad con más de {YEARS_OF_SERVICE} años cuidando la
              salud de la Región Caribe con excelencia, calidad y humanización.
            </p>
            <p className="text-sm text-clinic-300/90 font-medium leading-relaxed mb-5">
              {CLINIC_SLOGAN}
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-clinic-500 flex items-center justify-center transition-colors duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div variants={staggerItem}>
            <h3 className="text-white font-semibold text-sm tracking-wide mb-4">Navegación</h3>
            <ul className="space-y-2.5" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-200 text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Quick access */}
          <motion.div variants={staggerItem}>
            <h3 className="text-white font-semibold text-sm tracking-wide mb-4">Acceso Rápido</h3>
            <ul className="space-y-2.5" role="list">
              {QUICK_ACCESS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors duration-200"
                  >
                    <ExternalLink size={12} className="shrink-0" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <h3 className="text-white font-semibold text-sm tracking-wide mt-6 mb-4">Legal</h3>
            <ul className="space-y-2.5" role="list">
              {['Política de Privacidad', 'Términos de Uso', 'Habeas Data'].map((item) => (
                <li key={item}>
                  <span className="text-sm text-white/40 cursor-default">{item}</span>
                </li>
              ))}
              <li>
                <a
                  href="/transparencia-financiera"
                  className="flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors duration-200"
                >
                  <ExternalLink size={12} className="shrink-0" />
                  Estados Financieros
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={staggerItem}>
            <h3 className="text-white font-semibold text-sm tracking-wide mb-4">Contacto</h3>
            <address className="not-italic space-y-3">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(CONTACT_INFO.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 text-sm text-white/60 hover:text-white transition-colors group"
              >
                <MapPin size={15} className="shrink-0 mt-0.5 text-clinic-400 group-hover:text-clinic-300" />
                {CONTACT_INFO.address}
              </a>
              {CONTACT_INFO.phones.map((ph) => (
                <a
                  key={ph}
                  href={`tel:${ph.replace(/\s/g, '')}`}
                  className="flex items-center gap-2.5 text-sm text-white/60 hover:text-white transition-colors group"
                >
                  <Phone size={15} className="shrink-0 text-clinic-400 group-hover:text-clinic-300" />
                  {ph}
                </a>
              ))}
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-center gap-2.5 text-sm text-white/60 hover:text-white transition-colors group"
              >
                <Mail size={15} className="shrink-0 text-clinic-400 group-hover:text-clinic-300" />
                {CONTACT_INFO.email}
              </a>
              {CONTACT_INFO.web && (
                <a
                  href={`https://${CONTACT_INFO.web}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-white/60 hover:text-white transition-colors group"
                >
                  <Globe size={15} className="shrink-0 text-clinic-400 group-hover:text-clinic-300" />
                  {CONTACT_INFO.web}
                </a>
              )}
              <div className="flex items-center gap-2.5 text-sm text-white/60">
                <Clock size={15} className="shrink-0 text-clinic-400" />
                {CONTACT_INFO.schedule}
              </div>
            </address>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <span>
            © {year} Clínica San Martín Barranquilla Ltda. Todos los derechos reservados.
          </span>
          <span className="flex items-center gap-1">
            Hecho con <Heart size={11} className="text-red-400 fill-red-400" aria-hidden="true" /> en Barranquilla, Colombia
          </span>
        </div>
      </div>
    </footer>
  )
}
