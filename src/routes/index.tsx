import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { HomePage } from '@/pages/Home'

const TransparenciaPage = lazy(() =>
  import('@/pages/Transparencia').then((m) => ({ default: m.TransparenciaPage }))
)

const HistoriaPage = lazy(() =>
  import('@/pages/Historia').then((m) => ({ default: m.HistoriaPage }))
)

const OrganigramaPage = lazy(() =>
  import('@/pages/Organigrama').then((m) => ({ default: m.OrganigramaPage }))
)

const PlanEstrategicoPage = lazy(() =>
  import('@/pages/PlanEstrategico').then((m) => ({ default: m.PlanEstrategicoPage }))
)

const PoliticasPage = lazy(() =>
  import('@/pages/Politicas').then((m) => ({ default: m.PoliticasPage }))
)

const PacientesPage = lazy(() =>
  import('@/pages/Pacientes').then((m) => ({ default: m.PacientesPage }))
)

const SolicitudHCPage = lazy(() =>
  import('@/pages/SolicitudHC').then((m) => ({ default: m.SolicitudHCPage }))
)

const PageFallback = () => <div className="min-h-screen bg-dark" />

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/transparencia-financiera"
          element={
            <Suspense fallback={<PageFallback />}>
              <TransparenciaPage />
            </Suspense>
          }
        />
        <Route
          path="/nosotros/historia"
          element={
            <Suspense fallback={<PageFallback />}>
              <HistoriaPage />
            </Suspense>
          }
        />
        <Route
          path="/nosotros/organigrama"
          element={
            <Suspense fallback={<PageFallback />}>
              <OrganigramaPage />
            </Suspense>
          }
        />
        <Route
          path="/nosotros/plan-estrategico"
          element={
            <Suspense fallback={<PageFallback />}>
              <PlanEstrategicoPage />
            </Suspense>
          }
        />
        <Route
          path="/nosotros/politicas"
          element={
            <Suspense fallback={<PageFallback />}>
              <PoliticasPage />
            </Suspense>
          }
        />
        <Route
          path="/pacientes"
          element={
            <Suspense fallback={<PageFallback />}>
              <PacientesPage />
            </Suspense>
          }
        />
        <Route
          path="/solicitud-historia-clinica"
          element={
            <Suspense fallback={<PageFallback />}>
              <SolicitudHCPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  )
}
