import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion'

interface Card3DProps {
  children: ReactNode
  className?: string
  intensity?: number
  shine?: boolean
}

function useShineBackground(x: MotionValue<number>, y: MotionValue<number>) {
  return useTransform([x, y], ([lx, ly]: number[]) =>
    `radial-gradient(circle at ${(lx + 0.5) * 100}% ${(ly + 0.5) * 100}%, rgba(255,255,255,0.14) 0%, transparent 55%)`
  )
}

export function Card3D({ children, className = '', intensity = 10, shine = true }: Card3DProps) {
  const ref  = useRef<HTMLDivElement>(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const x = useSpring(rawX, { stiffness: 180, damping: 22 })
  const y = useSpring(rawY, { stiffness: 180, damping: 22 })

  const rotateX = useTransform(y, [-0.5, 0.5], [ intensity, -intensity])
  const rotateY = useTransform(x, [-0.5, 0.5], [-intensity,  intensity])
  const shineBg = useShineBackground(x, y)

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    rawX.set((e.clientX - rect.left) / rect.width  - 0.5)
    rawY.set((e.clientY - rect.top)  / rect.height - 0.5)
  }

  const onLeave = () => { rawX.set(0); rawY.set(0) }

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`will-animate ${className}`}
    >
      {shine && (
        <motion.div
          style={{ background: shineBg }}
          className="absolute inset-0 pointer-events-none z-10 rounded-[inherit]"
          aria-hidden="true"
        />
      )}
      {children}
    </motion.div>
  )
}
