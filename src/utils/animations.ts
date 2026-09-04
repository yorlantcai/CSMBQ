import type { Variants } from 'framer-motion'

export const SPRING = [0.22, 1, 0.36, 1] as const

export const fadeInUp: Variants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: SPRING } },
}

export const fadeInDown: Variants = {
  hidden:  { opacity: 0, y: -24 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.6, ease: SPRING } },
}

export const fadeInLeft: Variants = {
  hidden:  { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.7, ease: SPRING } },
}

export const fadeInRight: Variants = {
  hidden:  { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.7, ease: SPRING } },
}

export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
}

export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1,   transition: { duration: 0.5, ease: SPRING } },
}

export const staggerContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

export const staggerContainerSlow: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}

export const staggerItem: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: SPRING } },
}

export const slideInFromBottom: Variants = {
  hidden:  { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: SPRING } },
}

export const revealCard: Variants = {
  hidden:  { opacity: 0, y: 40, scale: 0.97 },
  visible: { opacity: 1, y: 0,  scale: 1,   transition: { duration: 0.6, ease: SPRING } },
}

export const headerVariants: Variants = {
  hidden:  { opacity: 0, y: -64 },
  visible: { opacity: 1, y: 0,   transition: { duration: 0.6, ease: SPRING } },
}

export const VIEWPORT_CONFIG = { once: true, amount: 0.2 } as const
