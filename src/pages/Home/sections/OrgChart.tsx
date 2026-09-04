import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Star, Scale, Shield, Users, Stethoscope,
  Heart, TrendingUp, Settings, CheckCircle2, ChevronDown,
  Building2, Microscope, HeartPulse, Award, UserCheck, Pill,
  ShieldCheck, Activity, Network, Calculator, Receipt, FileText,
  ShoppingCart, Package, Wrench, Archive, Lock, Leaf,
} from 'lucide-react'
import { Card3D } from '@/components/ui/Card3D'
import { VIEWPORT_CONFIG } from '@/utils/animations'

// ── Tipos ─────────────────────────────────────────────────────────────

interface OrgNode {
  id: string
  title: string
  icon?: React.ElementType
  children?: OrgNode[]
}

// ── Árbol de datos — Organigrama institucional 2025 ──────────────────

// Asesorías de la Gerencia General
const REVISION_FISCAL: OrgNode = { id: 'rf', title: 'Revisión Fiscal',  icon: CheckCircle2 }
const GESTION_JURIDICA: OrgNode = { id: 'gj', title: 'Gestión Jurídica', icon: Scale }

// Áreas staff — dependencias directas de la Gerencia General
const STAFF: OrgNode[] = [
  {
    id: 'cal', title: 'Gestión de la Calidad', icon: ShieldCheck,
    children: [{ id: 'sp', title: 'Seguridad del Paciente', icon: Shield }],
  },
  {
    id: 'th', title: 'Gestión del Talento Humano', icon: UserCheck,
    children: [{ id: 'sst', title: 'Sistema de Gestión de Seguridad y Salud en el Trabajo', icon: Shield }],
  },
  { id: 'tics', title: 'Sistema de la Información — TIC', icon: Network },
]

// Gerencia Asistencial
const ASISTENCIAL: OrgNode[] = [
  { id: 'au',  title: 'Atención al Usuario',                 icon: Users },
  { id: 'ce',  title: 'Consulta Externa',                    icon: Stethoscope },
  {
    id: 'ai', title: 'Atención Inmediata', icon: Activity,
    children: [
      { id: 'urg', title: 'Urgencias' },
      { id: 'ta',  title: 'Transporte Asistencial' },
    ],
  },
  { id: 'ahq', title: 'Atención Hospitalaria y Quirúrgica',  icon: HeartPulse },
  {
    id: 'ad', title: 'Apoyo Diagnóstico', icon: Microscope,
    children: [
      { id: 'lc',  title: 'Laboratorio Clínico' },
      { id: 'lp',  title: 'Laboratorio de Patología' },
      { id: 'gpt', title: 'Gestión Pre-transfusional' },
      { id: 'idx', title: 'Imágenes Diagnósticas' },
    ],
  },
  {
    id: 'at', title: 'Apoyo Terapéutico', icon: Pill,
    children: [
      { id: 'sf',  title: 'Servicio Farmacéutico' },
      { id: 'nut', title: 'Nutrición' },
      { id: 'psi', title: 'Psicología' },
      { id: 'fis', title: 'Fisioterapia' },
      { id: 'cp',  title: 'Cuidados Paliativos' },
    ],
  },
  { id: 'sm',  title: 'Subgerencia Médica',              icon: Stethoscope },
  { id: 'acc', title: 'Auditoría Concurrente',           icon: CheckCircle2 },
  { id: 'enf', title: 'Enfermería',                      icon: Heart },
  { id: 'ac',  title: 'Alto Costo',                      icon: TrendingUp },
  { id: 'epi', title: 'Epidemiología',                   icon: ShieldCheck },
  { id: 'rcr', title: 'Referencia y Contrarreferencia',  icon: Network },
]

// Gerencia Financiera y Administrativa
const FINANCIERA: OrgNode[] = [
  {
    id: 'gc', title: 'Gestión Contable', icon: Calculator,
    children: [
      { id: 'cont', title: 'Contabilidad' },
      { id: 'car',  title: 'Cartera' },
    ],
  },
  {
    id: 'fac', title: 'Facturación', icon: Receipt,
    children: [
      { id: 'rad', title: 'Radicación' },
      { id: 'adm', title: 'Admisión' },
      { id: 'aut', title: 'Autorización' },
    ],
  },
  {
    id: 'aud', title: 'Auditoría', icon: CheckCircle2,
    children: [
      { id: 'aucm', title: 'Cuentas Médicas' },
      { id: 'terc', title: 'Terceros Asistenciales' },
    ],
  },
  { id: 'contr', title: 'Contratación',        icon: FileText },
  { id: 'comp',  title: 'Compras',             icon: ShoppingCart },
  { id: 'alm',   title: 'Almacén',             icon: Package },
  { id: 'inf',   title: 'Infraestructura',     icon: Building2 },
  { id: 'bio',   title: 'Biomédico',           icon: Wrench },
  { id: 'sgen',  title: 'Servicios Generales', icon: Settings },
  { id: 'arc',   title: 'Archivo',             icon: Archive },
  { id: 'seg',   title: 'Seguridad',           icon: Lock },
  { id: 'ga',    title: 'Gestión Ambiental',   icon: Leaf },
]

// ── Organigrama del Servicio Farmacéutico 2025 ───────────────────────
const SF_SERVICIO: OrgNode[] = [
  { id: 'qfa',  title: 'Químico Farmacéutico Asistencial' },
  { id: 'reg1', title: 'Regente' },
  { id: 'auf1', title: 'Auxiliar de Farmacia' },
]
const SF_CENTRAL: OrgNode[] = [
  { id: 'qfp',  title: 'Químico Farmacéutico de Producción' },
  { id: 'qfc',  title: 'Químico Farmacéutico de Calidad' },
  { id: 'reg2', title: 'Regente' },
  { id: 'auf2', title: 'Auxiliar de Farmacia' },
]

// ── Componente recursivo de nodo ──────────────────────────────────────

function NodeRow({
  node, depth = 0, accentBg, accentText,
}: {
  node: OrgNode; depth?: number; accentBg: string; accentText: string
}) {
  const [open, setOpen] = useState(false)
  const hasChildren = (node.children?.length ?? 0) > 0
  const Icon = node.icon

  const isLeaf = depth >= 2

  return (
    <div>
      <button
        onClick={() => hasChildren && setOpen((p) => !p)}
        disabled={!hasChildren}
        className={[
          'w-full flex items-center gap-2.5 rounded-xl transition-colors duration-200 text-left',
          depth === 0 ? 'px-3 py-2.5 bg-white/5 border border-white/8' : 'px-2.5 py-1.5',
          hasChildren && !isLeaf ? 'hover:bg-white/8 cursor-pointer' : 'cursor-default',
        ].join(' ')}
        aria-expanded={hasChildren ? open : undefined}
      >
        {/* Indent guides */}
        {depth > 0 && (
          <span className="shrink-0 flex items-center" style={{ width: depth * 12 }}>
            <span className="w-full h-px bg-white/10" />
          </span>
        )}

        {Icon && (
          <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${depth === 0 ? `${accentBg}/15 border border-white/10` : 'bg-white/5'}`}>
            <Icon size={11} className={depth === 0 ? `${accentText}/80` : 'text-white/45'} strokeWidth={1.8} aria-hidden="true" />
          </div>
        )}

        <span className={[
          'flex-1 leading-tight',
          depth === 0 ? 'text-white/80 text-xs font-semibold' : depth === 1 ? 'text-white/65 text-[11px] font-medium' : 'text-white/45 text-[10px]',
        ].join(' ')}>
          {node.title}
        </span>

        {hasChildren && (
          <ChevronDown
            size={11}
            className={`text-white/30 transition-transform duration-200 shrink-0 ${open ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        )}
      </button>

      <AnimatePresence initial={false}>
        {open && hasChildren && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className={`mt-0.5 space-y-0.5 ${depth === 0 ? 'ml-3' : 'ml-4'}`}>
              {node.children!.map((child) => (
                <NodeRow
                  key={child.id}
                  node={child}
                  depth={depth + 1}
                  accentBg={accentBg}
                  accentText={accentText}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Tarjeta de proceso principal ──────────────────────────────────────

interface ProcessCardProps {
  title: string; subtitle: string; from: string; to: string
  border: string; accent: string; accentBg: string; accentText: string
  nodes: OrgNode[]; delay: number
}

function ProcessCard({ title, subtitle, from, to, border, accent, accentBg, accentText, nodes, delay }: ProcessCardProps) {
  const hasExpandable = nodes.some((n) => (n.children?.length ?? 0) > 0)
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_CONFIG} transition={{ duration: 0.55, delay }}
      style={{ perspective: '900px' }}
    >
      <Card3D intensity={6} className={`rounded-3xl border ${border} bg-gradient-to-br ${from} ${to} h-full`}>
        <div className="p-5 md:p-6">
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/8">
            <div className={`w-1.5 h-10 ${accent} rounded-full shrink-0`} />
            <div>
              <p className={`${accentText} text-[10px] font-bold tracking-[0.15em] uppercase mb-0.5`}>{subtitle}</p>
              <h4 className="font-display font-bold text-white text-base leading-tight">{title}</h4>
            </div>
          </div>
          <div className="space-y-1.5">
            {nodes.map((node) => (
              <NodeRow key={node.id} node={node} depth={0} accentBg={accentBg} accentText={accentText} />
            ))}
          </div>
          {hasExpandable && (
            <p className="text-white/45 text-[10px] text-center mt-5">
              Haz clic en las áreas con ▾ para expandir sus dependencias
            </p>
          )}
        </div>
      </Card3D>
    </motion.div>
  )
}

// ── Tarjeta de dependencia directa de Gerencia (área staff) ───────────

function GerenciaReport({ node, side }: { node: OrgNode; side: 'clinic' | 'sky' }) {
  const [open, setOpen] = useState(false)
  const Icon = node.icon!
  const hasChildren = (node.children?.length ?? 0) > 0
  const accentBg  = side === 'clinic' ? 'bg-clinic-500' : 'bg-sky-500'
  const accentTxt = side === 'clinic' ? 'text-clinic-300' : 'text-sky-300'
  const accentBdr = side === 'clinic' ? 'border-clinic-400/20' : 'border-sky-400/20'

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_CONFIG} style={{ perspective: '700px' }}
    >
      <Card3D intensity={12} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm h-full">
        <div className="p-3 md:p-4">
          <button
            onClick={() => hasChildren && setOpen((p) => !p)}
            disabled={!hasChildren}
            className={`w-full flex items-center gap-3 transition-opacity ${hasChildren ? 'hover:opacity-80 cursor-pointer' : 'cursor-default'}`}
            aria-expanded={hasChildren ? open : undefined}
          >
            <div className={`w-9 h-9 rounded-xl ${accentBg}/18 border ${accentBdr} flex items-center justify-center shrink-0`} style={{ transform: 'translateZ(10px)' }}>
              <Icon size={16} className={accentTxt} strokeWidth={1.8} aria-hidden="true" />
            </div>
            <div className="flex-1 text-left" style={{ transform: 'translateZ(8px)' }}>
              <p className="text-white/35 text-[9px] uppercase tracking-wider leading-none mb-0.5">Área staff</p>
              <p className="text-white font-semibold text-xs leading-tight">{node.title}</p>
            </div>
            {hasChildren && (
              <ChevronDown size={13} className={`text-white/30 transition-transform duration-200 shrink-0 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
            )}
          </button>

          <AnimatePresence initial={false}>
            {open && hasChildren && (
              <motion.div
                initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="mt-2 ml-3 space-y-1">
                  {node.children!.map((child) => {
                    const ChildIcon = child.icon
                    return (
                      <div key={child.id} className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-white/4 border border-white/6">
                        <span className="w-3 h-px bg-white/15 shrink-0" />
                        {ChildIcon && <ChildIcon size={11} className="text-white/40 shrink-0" aria-hidden="true" />}
                        <span className="text-white/55 text-[11px]">{child.title}</span>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card3D>
    </motion.div>
  )
}

// ── Tarjeta de asesoría (Revisión Fiscal / Gestión Jurídica) ──────────

function AsesoriaCard({ node, align }: { node: OrgNode; align: 'left' | 'right' }) {
  const Icon = node.icon!
  return (
    <motion.div
      initial={{ opacity: 0, x: align === 'left' ? -24 : 24 }} whileInView={{ opacity: 1, x: 0 }}
      viewport={VIEWPORT_CONFIG} transition={{ duration: 0.5 }}
      className="flex-1 min-w-0" style={{ perspective: '700px' }}
    >
      <Card3D intensity={12} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 text-center">
        <div style={{ transform: 'translateZ(10px)' }}>
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-2">
            <Icon size={17} className="text-white/60" aria-hidden="true" />
          </div>
          <p className="text-white/35 text-[9px] tracking-widest uppercase mb-0.5">Asesoría</p>
          <p className="text-white font-semibold text-xs leading-tight">{node.title}</p>
        </div>
      </Card3D>
    </motion.div>
  )
}

// ── Línea vertical conectora ──────────────────────────────────────────

function VLine({ h = 'h-8' }: { h?: string }) {
  return (
    <motion.div
      initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }}
      viewport={{ once: true }} transition={{ duration: 0.45 }}
      className={`mx-auto w-px ${h} bg-gradient-to-b from-white/25 to-white/5 origin-top`}
    />
  )
}

// ── Main export ───────────────────────────────────────────────────────

export function OrgChart() {
  return (
    <section
      className="section-padding overflow-hidden relative"
      style={{ background: 'linear-gradient(135deg, #020C1B 0%, #041A36 55%, #020C1B 100%)' }}
      aria-label="Organigrama estructural"
    >
      {/* Blueprint grid */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(56,189,248,0.9) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(56,189,248,0.9) 1px, transparent 1px)`,
          backgroundSize: '52px 52px',
        }}
        aria-hidden="true"
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full bg-clinic-600/8 blur-[130px] pointer-events-none" aria-hidden="true" />

      <div className="container-xl relative z-10 max-w-5xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_CONFIG} transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="inline-flex items-center gap-2 text-amber-300/80 font-semibold text-xs tracking-[0.15em] uppercase bg-amber-500/10 border border-amber-400/20 px-3.5 py-1.5 rounded-full mb-5">
            Gobierno Corporativo · 2025
          </span>
          <h2 className="font-display font-bold text-4xl xl:text-5xl text-white mb-4 text-balance">
            Estructura{' '}
            <span className="bg-gradient-to-r from-amber-300 via-sky-200 to-white bg-clip-text text-transparent">
              Organizacional
            </span>
          </h2>
          <p className="text-white/50 text-lg leading-relaxed">
            Organigrama institucional con una gobernanza sólida, orientada a la
            excelencia clínica y el servicio al paciente.
          </p>
        </motion.div>

        {/* ── NIVEL 1: JUNTA DIRECTIVA / GERENTE GENERAL ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={VIEWPORT_CONFIG} transition={{ duration: 0.6 }}
          className="max-w-md mx-auto" style={{ perspective: '900px' }}
        >
          <Card3D intensity={8} className="relative overflow-hidden rounded-3xl border border-amber-400/35 bg-gradient-to-br from-amber-500/22 to-amber-950/50 shadow-[0_0_70px_rgba(251,191,36,0.12)]">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-300/5 to-transparent pointer-events-none" aria-hidden="true" />
            <div className="relative flex items-center gap-4 p-5 md:p-6">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center shrink-0" style={{ transform: 'translateZ(14px)' }}>
                <Star size={26} className="text-amber-300" strokeWidth={1.5} aria-hidden="true" />
              </div>
              <div style={{ transform: 'translateZ(10px)' }}>
                <p className="text-amber-300/65 text-[10px] font-bold tracking-[0.18em] uppercase mb-0.5">Máxima Autoridad</p>
                <h3 className="font-display font-bold text-white text-xl md:text-2xl leading-tight">Junta Directiva</h3>
                <p className="text-white/55 text-xs mt-0.5">Gerente General</p>
              </div>
              <div className="ml-auto flex items-center gap-1.5 bg-amber-500/12 border border-amber-400/20 rounded-full px-3 py-1 shrink-0" style={{ transform: 'translateZ(8px)' }}>
                <Award size={11} className="text-amber-300" aria-hidden="true" />
                <span className="text-amber-300/80 text-[10px] font-semibold hidden sm:inline">Órgano de Gobierno</span>
              </div>
            </div>
          </Card3D>
        </motion.div>

        <VLine h="h-8" />

        {/* ── NIVEL 2: REVISIÓN FISCAL + GERENCIA GENERAL + GESTIÓN JURÍDICA ── */}
        <div className="flex items-center gap-2 md:gap-3 max-w-3xl mx-auto">
          <AsesoriaCard node={REVISION_FISCAL} align="left" />

          <div className="hidden sm:block w-8 md:w-14 border-t border-dashed border-white/15 shrink-0" />

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={VIEWPORT_CONFIG} transition={{ duration: 0.55, delay: 0.08 }}
            className="shrink-0 w-44 md:w-56" style={{ perspective: '900px' }}
          >
            <Card3D intensity={9} className="relative overflow-hidden rounded-3xl border border-clinic-400/40 bg-gradient-to-br from-clinic-500/28 to-clinic-900/50 shadow-clinic-lg">
              <div className="p-5 text-center">
                <div className="w-12 h-12 rounded-2xl bg-clinic-500/25 border border-clinic-400/30 flex items-center justify-center mx-auto mb-3" style={{ transform: 'translateZ(12px)' }}>
                  <Building2 size={22} className="text-clinic-200" strokeWidth={1.6} aria-hidden="true" />
                </div>
                <p className="text-clinic-300/65 text-[10px] font-bold tracking-[0.15em] uppercase mb-0.5" style={{ transform: 'translateZ(8px)' }}>Dirección Ejecutiva</p>
                <h3 className="font-display font-bold text-white text-lg md:text-xl" style={{ transform: 'translateZ(10px)' }}>Gerencia General</h3>
              </div>
            </Card3D>
          </motion.div>

          <div className="hidden sm:block w-8 md:w-14 border-t border-dashed border-white/15 shrink-0" />

          <AsesoriaCard node={GESTION_JURIDICA} align="right" />
        </div>

        <VLine h="h-8" />

        {/* ── NIVEL 3: ÁREAS STAFF (CALIDAD · TALENTO HUMANO · TICS) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
          <GerenciaReport node={STAFF[0]} side="clinic" />
          <GerenciaReport node={STAFF[1]} side="sky"    />
          <GerenciaReport node={STAFF[2]} side="clinic" />
        </div>

        <VLine h="h-8" />

        {/* Separator */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={VIEWPORT_CONFIG} transition={{ duration: 0.4 }}
          className="flex items-center gap-4 max-w-5xl mx-auto mb-5"
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/15" />
          <span className="text-white/25 text-[10px] tracking-[0.2em] uppercase font-semibold whitespace-nowrap">Dos grandes gerencias</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/15" />
        </motion.div>

        {/* ── NIVEL 4: GERENCIA ASISTENCIAL + GERENCIA FINANCIERA Y ADMINISTRATIVA ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <ProcessCard
            title="Gerencia Asistencial" subtitle="Atención en Salud"
            from="from-clinic-600/20" to="to-clinic-950/60"
            border="border-clinic-400/30" accent="bg-clinic-500"
            accentBg="bg-clinic-500" accentText="text-clinic-300"
            nodes={ASISTENCIAL} delay={0}
          />
          <ProcessCard
            title="Gerencia Financiera y Administrativa" subtitle="Soporte Administrativo"
            from="from-sky-600/20" to="to-sky-950/60"
            border="border-sky-400/30" accent="bg-sky-500"
            accentBg="bg-sky-500" accentText="text-sky-300"
            nodes={FINANCIERA} delay={0.08}
          />
        </div>

        {/* ── ANEXO: ORGANIGRAMA DEL SERVICIO FARMACÉUTICO 2025 ── */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={VIEWPORT_CONFIG} transition={{ duration: 0.4 }}
          className="flex items-center gap-4 max-w-5xl mx-auto mt-20 mb-8"
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/15" />
          <span className="inline-flex items-center gap-2 text-emerald-300/80 font-semibold text-[10px] tracking-[0.2em] uppercase whitespace-nowrap">
            <Pill size={12} aria-hidden="true" />
            Servicio Farmacéutico
          </span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/15" />
        </motion.div>

        {/* Gerencia Asistencial — nodo del que depende el servicio farmacéutico */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={VIEWPORT_CONFIG} transition={{ duration: 0.5 }}
          className="max-w-xs mx-auto" style={{ perspective: '800px' }}
        >
          <Card3D intensity={9} className="rounded-2xl border border-clinic-400/30 bg-gradient-to-br from-clinic-500/20 to-clinic-950/50 p-4 text-center">
            <p className="text-clinic-300/65 text-[9px] font-bold tracking-[0.15em] uppercase mb-0.5">Depende de</p>
            <h4 className="font-display font-bold text-white text-sm">Gerencia Asistencial</h4>
          </Card3D>
        </motion.div>

        <VLine h="h-8" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <ProcessCard
            title="Servicio Farmacéutico" subtitle="Director Técnico"
            from="from-clinic-600/20" to="to-clinic-950/60"
            border="border-clinic-400/30" accent="bg-clinic-500"
            accentBg="bg-clinic-500" accentText="text-clinic-300"
            nodes={SF_SERVICIO} delay={0}
          />
          <ProcessCard
            title="Central de Mezcla" subtitle="Director Técnico"
            from="from-emerald-600/20" to="to-emerald-950/60"
            border="border-emerald-400/30" accent="bg-emerald-500"
            accentBg="bg-emerald-500" accentText="text-emerald-300"
            nodes={SF_CENTRAL} delay={0.08}
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={VIEWPORT_CONFIG} transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-white/50 text-xs mt-12"
        >
          Organigrama Estructural — Clínica San Martín Barranquilla Ltda. · Vigente 2025
        </motion.p>

      </div>
    </section>
  )
}
