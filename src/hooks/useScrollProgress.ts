import { useState, useEffect } from 'react'

export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el     = document.documentElement
      const total  = el.scrollHeight - el.clientHeight
      const scrolled = total > 0 ? (window.scrollY / total) * 100 : 0
      setProgress(Math.min(scrolled, 100))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return progress
}
