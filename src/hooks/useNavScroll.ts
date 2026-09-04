import { useEffect } from 'react'
import { useAppStore } from '@/store/appStore'

export function useNavScroll(threshold = 24) {
  const setNavScrolled = useAppStore((s) => s.setNavScrolled)

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > threshold)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold, setNavScrolled])
}
