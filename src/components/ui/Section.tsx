import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp, VIEWPORT_CONFIG } from '@/utils/animations'

interface SectionProps {
  id?: string
  className?: string
  children: ReactNode
  animate?: boolean
}

export function Section({ id, className = '', children, animate = true }: SectionProps) {
  const Wrapper = animate ? motion.section : 'section'
  const props = animate
    ? { variants: fadeInUp, initial: 'hidden', whileInView: 'visible', viewport: VIEWPORT_CONFIG }
    : {}

  return (
    <Wrapper id={id} className={`section-padding ${className}`} {...(props as object)}>
      {children}
    </Wrapper>
  )
}
