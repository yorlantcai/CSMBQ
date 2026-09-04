import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { OrgChart } from '@/pages/Home/sections/OrgChart'

export function OrganigramaPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #020C1B 0%, #041A36 55%, #020C1B 100%)' }}>
      {/* Back navigation bar */}
      <div className="pt-[var(--nav-h)]">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container-xl py-5"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-white/45 hover:text-white/80 text-sm transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            Volver
          </button>
        </motion.div>
      </div>

      {/* OrgChart section (has its own header + background) */}
      <OrgChart />
    </div>
  )
}
