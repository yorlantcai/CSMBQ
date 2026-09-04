import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  FileText, Download, ExternalLink, Shield, Calendar,
  HardDrive, TrendingUp, Lock, ChevronRight, BarChart3,
} from 'lucide-react'
import { Card3D } from '@/components/ui/Card3D'
import { staggerContainer, staggerItem, VIEWPORT_CONFIG } from '@/utils/animations'

interface FinancialDoc {
  id: string
  title: string
  period: string
  year: number
  file: string
  size: string
  date: string
}

const YEARS_COLORS: Record<number, string> = {
  2024: 'from-clinic-500/30 to-sky-600/20',
  2023: 'from-sky-600/25 to-clinic-700/20',
  2022: 'from-clinic-700/25 to-indigo-600/20',
  2021: 'from-indigo-600/25 to-clinic-500/20',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })
}

function DocCard({ doc, index }: { doc: FinancialDoc; index: number }) {
  const color = YEARS_COLORS[doc.year] ?? 'from-clinic-600/25 to-sky-500/20'
  const pdfUrl = `/documents/estados-financieros/${doc.file}`

  return (
    <motion.div variants={staggerItem} style={{ perspective: '1000px' }}>
      <Card3D
        intensity={7}
        className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-clinic-800 to-clinic-950 shadow-clinic-lg hover:shadow-clinic-xl transition-shadow duration-500 h-full"
      >
        {/* Color overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-70`} aria-hidden="true" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
          aria-hidden="true"
        />

        {/* Corner orb */}
        <div
          className={`absolute ${index % 2 === 0 ? '-top-12 -right-12' : '-bottom-12 -left-12'} w-40 h-40 rounded-full blur-3xl opacity-30 bg-sky-300 pointer-events-none`}
          aria-hidden="true"
        />

        {/* Content */}
        <div className="relative z-10 p-7 md:p-9 flex flex-col min-h-[320px]">
          {/* Top row */}
          <div className="flex items-start justify-between mb-7">
            <div
              className="w-14 h-14 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center backdrop-blur-sm"
              style={{ transform: 'translateZ(16px)' }}
            >
              <FileText size={26} className="text-white" strokeWidth={1.6} aria-hidden="true" />
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-full px-3 py-1 backdrop-blur-sm">
              <Lock size={10} className="text-white/70" />
              <span className="text-white/70 text-[11px] font-medium">Documento oficial</span>
            </div>
          </div>

          {/* Text */}
          <div className="flex-1" style={{ transform: 'translateZ(8px)' }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sky-300 font-bold text-3xl md:text-4xl">{doc.year}</span>
              <BarChart3 size={20} className="text-sky-300/60 mt-1" aria-hidden="true" />
            </div>
            <h3 className="font-display font-bold text-white text-xl md:text-2xl mb-2 leading-tight">
              {doc.title}
            </h3>
            <p className="text-white/55 text-sm mb-5">{doc.period}</p>

            {/* Meta badges */}
            <div className="flex flex-wrap gap-2">
              <span className="flex items-center gap-1.5 text-white/50 text-xs px-2.5 py-1 rounded-full border border-white/10 bg-white/5">
                <Calendar size={10} aria-hidden="true" />
                {formatDate(doc.date)}
              </span>
              <span className="flex items-center gap-1.5 text-white/50 text-xs px-2.5 py-1 rounded-full border border-white/10 bg-white/5">
                <HardDrive size={10} aria-hidden="true" />
                {doc.size}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6" style={{ transform: 'translateZ(20px)' }}>
            <motion.a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-white text-clinic-700 font-semibold text-sm shadow-xl hover:shadow-2xl transition-shadow duration-200"
              aria-label={`Abrir ${doc.title}`}
            >
              <ExternalLink size={15} aria-hidden="true" />
              Abrir
            </motion.a>
            <motion.a
              href={pdfUrl}
              download={doc.file}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-white/10 border border-white/20 text-white font-semibold text-sm hover:bg-white/20 transition-colors duration-200 backdrop-blur-sm"
              aria-label={`Descargar ${doc.title}`}
            >
              <Download size={15} aria-hidden="true" />
              Descargar
            </motion.a>
          </div>
        </div>
      </Card3D>
    </motion.div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {[0, 1, 2].map((i) => (
        <div key={i} className="rounded-3xl border border-white/10 bg-clinic-800/40 animate-pulse min-h-[320px]" />
      ))}
    </div>
  )
}

export function TransparenciaPage() {
  const [docs, setDocs] = useState<FinancialDoc[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, amount: 0.4 })

  useEffect(() => {
    fetch('/documents/estados-financieros/index.json')
      .then((r) => {
        if (!r.ok) throw new Error('Not found')
        return r.json()
      })
      .then((data: FinancialDoc[]) => {
        setDocs(data.sort((a, b) => b.year - a.year))
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [])

  return (
    <div className="min-h-screen bg-dark overflow-hidden relative">

      {/* ── Background dot pattern ── */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
        aria-hidden="true"
      />

      {/* ── Ambient orbs ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-clinic-600/15 blur-[120px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] rounded-full bg-sky-500/10 blur-[100px] pointer-events-none" aria-hidden="true" />

      {/* ── Rotating ring decoration ── */}
      <div className="absolute inset-0 flex items-start justify-center pt-32 pointer-events-none overflow-hidden" aria-hidden="true">
        <motion.div
          className="rounded-full border border-white/[0.04]"
          style={{ width: 900, height: 900, flexShrink: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-clinic-400/40" />
        </motion.div>
      </div>

      <div className="container-xl relative z-10 py-28 lg:py-36">

        {/* ── Header ── */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-sky-300/80 font-semibold text-xs tracking-[0.15em] uppercase bg-sky-500/10 border border-sky-400/20 px-4 py-1.5 rounded-full mb-6"
          >
            <Shield size={12} aria-hidden="true" />
            Transparencia Institucional
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-bold text-4xl xl:text-6xl text-white mb-5 leading-tight text-balance"
          >
            Estados{' '}
            <span className="bg-gradient-to-r from-sky-300 via-white to-clinic-300 bg-clip-text text-transparent">
              Financieros
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="text-white/50 text-lg leading-relaxed"
          >
            Información financiera oficial de la Clínica San Martín Barranquilla Ltda.,
            publicada en cumplimiento de nuestro compromiso con la transparencia y el
            buen gobierno corporativo.
          </motion.p>

          {/* Divider accent */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-10 mx-auto w-24 h-[2px] rounded-full bg-gradient-to-r from-transparent via-clinic-400/60 to-transparent"
          />
        </div>

        {/* ── Stats strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-16"
          style={{ perspective: '800px' }}
        >
          {[
            { icon: TrendingUp, label: 'Años publicados', value: docs.length > 0 ? `${docs.length}` : '—' },
            { icon: Shield,    label: 'Auditoría externa', value: 'Certificada' },
            { icon: Lock,      label: 'Acceso',             value: 'Público' },
          ].map(({ icon: Icon, label, value }) => (
            <Card3D key={label} intensity={10}
              className="text-center p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/8 transition-colors duration-300"
            >
              <div style={{ transform: 'translateZ(12px)' }}>
                <Icon size={18} className="text-sky-300/80 mx-auto mb-2" aria-hidden="true" />
                <div className="font-display font-bold text-white text-xl mb-0.5">{value}</div>
                <div className="text-white/40 text-[11px]">{label}</div>
              </div>
            </Card3D>
          ))}
        </motion.div>

        {/* ── Document grid ── */}
        {loading && <LoadingSkeleton />}

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-white/40 py-20"
          >
            No se pudieron cargar los documentos. Por favor intente más tarde.
          </motion.div>
        )}

        {!loading && !error && docs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-white/40 py-20"
          >
            No hay estados financieros publicados actualmente.
          </motion.div>
        )}

        {!loading && !error && docs.length > 0 && (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_CONFIG}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
            {docs.map((doc, i) => (
              <DocCard key={doc.id} doc={doc} index={i} />
            ))}
          </motion.div>
        )}

        {/* ── Footer note ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-2 text-white/25 text-xs">
            <Shield size={11} aria-hidden="true" />
            Documentos publicados por la Gerencia de la Clínica San Martín Barranquilla Ltda.
            <ChevronRight size={11} aria-hidden="true" />
            <a href="mailto:atencionalusuario@csmbq.com" className="text-clinic-300/60 hover:text-clinic-300 transition-colors">
              atencionalusuario@csmbq.com
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
