import { useState, useEffect, useRef } from 'react'

export function useCounter(
  target: number,
  duration = 2000,
  startOnMount = false,
) {
  const [count,   setCount]   = useState(0)
  const [running, setRunning] = useState(startOnMount)
  const frameRef = useRef<number>(0)

  const start = () => setRunning(true)

  useEffect(() => {
    if (!running) return
    const startTime  = performance.now()
    const startValue = 0

    const step = (now: number) => {
      const elapsed  = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(startValue + (target - startValue) * eased))
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step)
      }
    }

    frameRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frameRef.current)
  }, [running, target, duration])

  return { count, start }
}
