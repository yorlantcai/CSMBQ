import { lazy, Suspense } from 'react'
import { Hero } from './sections/Hero'

const About          = lazy(() => import('./sections/About').then((m) => ({ default: m.About })))
const Gallery        = lazy(() => import('./sections/Gallery').then((m) => ({ default: m.Gallery })))
const Specialties    = lazy(() => import('./sections/Specialties').then((m) => ({ default: m.Specialties })))
const Services       = lazy(() => import('./sections/Services').then((m) => ({ default: m.Services })))
const Programas      = lazy(() => import('./sections/Programas').then((m) => ({ default: m.Programas })))
const HoraDorada     = lazy(() => import('./sections/HoraDorada').then((m) => ({ default: m.HoraDorada })))
const MedicalResults = lazy(() => import('./sections/MedicalResults').then((m) => ({ default: m.MedicalResults })))
const Statistics     = lazy(() => import('./sections/Statistics').then((m) => ({ default: m.Statistics })))
const Contact        = lazy(() => import('./sections/Contact').then((m) => ({ default: m.Contact })))

function SectionSkeleton() {
  return (
    <div className="section-padding" aria-hidden="true">
      <div className="container-xl">
        <div className="animate-pulse space-y-6">
          <div className="h-4 bg-clinic-100 rounded-full w-24 mx-auto" />
          <div className="h-8 bg-clinic-100 rounded-full max-w-md mx-auto" />
          <div className="h-4 bg-clinic-50 rounded-full max-w-xs mx-auto" />
          <div className="grid grid-cols-3 gap-4 mt-8">
            {[1,2,3].map((i) => (
              <div key={i} className="h-40 bg-clinic-50 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function HomePage() {
  return (
    <>
      <Hero />
      <Suspense fallback={<SectionSkeleton />}><About /></Suspense>
      <Suspense fallback={<SectionSkeleton />}><Gallery /></Suspense>
      <Suspense fallback={<SectionSkeleton />}><Specialties /></Suspense>
      <Suspense fallback={<SectionSkeleton />}><Services /></Suspense>
      <Suspense fallback={<SectionSkeleton />}><Programas /></Suspense>
      <Suspense fallback={<SectionSkeleton />}><HoraDorada /></Suspense>
      <Suspense fallback={<SectionSkeleton />}><MedicalResults /></Suspense>
      <Suspense fallback={<SectionSkeleton />}><Statistics /></Suspense>
      <Suspense fallback={<SectionSkeleton />}><Contact /></Suspense>
    </>
  )
}
