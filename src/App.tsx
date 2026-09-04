import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AppRoutes } from '@/routes'
import { WelcomeSplash } from '@/components/ui/WelcomeSplash'

export default function App() {
  const [splashDone, setSplashDone] = useState(() => {
    try { return sessionStorage.getItem('csmbq_splash') === '1' }
    catch { return false }
  })

  const handleSplashDone = () => {
    try { sessionStorage.setItem('csmbq_splash', '1') } catch { /* noop */ }
    setSplashDone(true)
  }

  return (
    <BrowserRouter>
      {!splashDone && <WelcomeSplash onDone={handleSplashDone} />}
      <AppRoutes />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '14px',
            borderRadius: '12px',
            padding: '12px 16px',
            boxShadow: '0 8px 32px rgba(10,22,40,0.14)',
          },
          success: {
            iconTheme: { primary: '#1B5EA6', secondary: '#EBF3FF' },
          },
        }}
      />
    </BrowserRouter>
  )
}
