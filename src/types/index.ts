export interface NavLink {
  label: string
  href: string
  external?: boolean
}

export interface Specialty {
  id: string
  icon: string
  title: string
  description: string
  color?: string
  featured?: boolean
}

export interface Service {
  id: string
  icon: string
  title: string
  description: string
  features: string[]
}

export interface StatItem {
  value: number
  suffix: string
  label: string
  description?: string
}

export interface ContactInfo {
  address: string
  phones: string[]
  email: string
  web?: string
  schedule: string
}

/** Ítem genérico con título y descripción (programas, listados, etc.). */
export interface NamedItem {
  title: string
  description: string
}

export interface ResultPortal {
  id: string
  title: string
  subtitle: string
  description: string
  url: string
  icon: string
  color: string
  /** Si es true, la URL es una ruta interna (navega con el router en vez de abrir pestaña). */
  internal?: boolean
  /** Texto opcional del botón. Si no se define, usa "Acceder a {subtitle}". */
  ctaLabel?: string
}

export interface AppStore {
  isNavScrolled: boolean
  isMobileMenuOpen: boolean
  setNavScrolled: (v: boolean) => void
  setMobileMenuOpen: (v: boolean) => void
  toggleMobileMenu: () => void
}
