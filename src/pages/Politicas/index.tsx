import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle2, HelpCircle, ListChecks, Layers2, Users2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Card3D } from '@/components/ui/Card3D'
import { VIEWPORT_CONFIG } from '@/utils/animations'

// ── Contenido ─────────────────────────────────────────────────────────────────
const INTRO_PARAGRAPHS = [
  'El Ministerio de Salud y Protección Social como ente rector del sector, a través de la Oficina de Gestión Territorial Emergencias y Desastres, promueve la PPSS como instrumento para garantizar el ejercicio del derecho a la participación social en salud. En este sentido se impulsa el respeto, la protección y la promoción del derecho a la participación en salud a través de las orientaciones y lineamientos que se requieren, así como prestar el apoyo técnico que sea necesario para este mismo.',
  'Nuestra institución está comprometida en el desarrollo de capacidades por parte de la ciudadanía, para que esta logre cumplir un rol activo en el eje de salud. Asimismo, trabajamos continuamente en el fortalecimiento de las instancias formales y autónomas para el desarrollo de procesos participativos que permitan impulsar la incidencia, exigencia y decisión en el marco de la gestión de las políticas, planes y programas en salud.',
  'La Clínica San Martín Barranquilla Ltda. facilita la coordinación entre los usuarios del Sistema de Salud y los entes responsables y vinculados con la salud, para garantizar la defensa de los derechos de salud y de participación social, promoviendo las herramientas, instancias, formas y organismos dirigidos a la garantía del derecho fundamental a la salud. Lo que implica la coordinación entre instancias de participación y los mecanismos entre los diferentes actores que les permiten canalizar demandas relacionadas con la salud, elemento central para los planes estratégicos dentro del marco de la PPSS, dado que se amplía la base de participantes que generan articulaciones y sinergias en pro del derecho.',
  'La política pública de participación social en salud (PPSS) busca dar respuestas a las problemáticas, necesidades, dificultades, oportunidades, limitaciones y debilidades que afectan la participación social en salud, en la perspectiva de dar cumplimiento al marco legal vigente y, por ende, a la realización del derecho humano de la participación que se encuentra vinculado bajo una lógica de interdependencia con el derecho a la salud.',
]

const NECESIDADES = [
  'La visión de salud es limitada al sistema, a la enfermedad y a los servicios; aún no se logra que la Participación Social en Salud se vea como un derecho que se articula al derecho a la salud, ni mucho menos al bienestar.',
  'La falta de unicidad entre las leyes de participación hace que se conviertan a veces en obstáculos para participar.',
  'Muchas veces las leyes no son coherentes entre sí y se prestan a interpretaciones que terminan siendo "acomodadas" de acuerdo con los múltiples intereses de los actores.',
  'Algunas veces las instituciones de salud (EPS, ESE, IPS, etc.) no respetan y garantizan la autonomía de la ciudadanía, sus organizaciones, las formas y/o mecanismos de participación, generando cooptación o control que les limita su capacidad de incidencia, lo que termina afectando los procesos participativos.',
]

const RESPONSABILIDADES = [
  'Socialización de la Política de Participación Social.',
  'Apoyo y acompañamiento a todas las instancias y espacios de participación.',
  'Mecanismos y espacios de participación.',
  'Garantía de la transparencia de los procesos participativos.',
  'Garantía de derechos y oportunidades para todos los usuarios / ciudadanía.',
  'Reconocimiento del derecho a la autonomía de las organizaciones sociales.',
  'Operación de las estrategias de gestión, comunicación y educación para el cumplimiento del marco estratégico y las líneas de acción de acuerdo a su competencia.',
  'Gestionar recursos para los procesos de participación.',
]

const EJES = [
  'Fortalecimiento Institucional.',
  'Empoderamiento de la ciudadanía y las organizaciones sociales en salud.',
  'Impulsar la cultura de la salud.',
  'Control social.',
  'Gestión y garantía en salud con participación en el proceso de decisión.',
]

const FORMAS = [
  'Los Comités de Participación Comunitaria en Salud (COPACOS).',
  'Los Comités de Ética Hospitalaria.',
  'Las Alianzas o Asociación de Usuarios.',
]

// ── Imágenes ──────────────────────────────────────────────────────────────────
const IMG_HERO = import.meta.env.BASE_URL + 'images/DSC_0123.JPG'  // nursing station / pasillo
const IMG_INTRO = import.meta.env.BASE_URL + 'images/DSC_0135.JPG'  // área clínica
const IMG_BOTTOM = import.meta.env.BASE_URL + 'images/DSC_0387.JPG'

// ── Subcomponente: sección con título e ícono ─────────────────────────────────
interface PolicySectionProps {
  icon: React.ElementType
  iconColor: string
  iconBg: string
  title: string
  items: string[]
  delay?: number
}
function PolicySection({ icon: Icon, iconColor, iconBg, title, items, delay = 0 }: PolicySectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_CONFIG}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white rounded-3xl border border-clinic-100/70 p-8 shadow-card"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center shrink-0`}>
          <Icon size={18} className={iconColor} strokeWidth={1.8} />
        </div>
        <h2 className="font-display font-bold text-xl md:text-2xl text-dark leading-tight">{title}</h2>
      </div>
      <ul className="space-y-3" role="list">
        {items.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT_CONFIG}
            transition={{ duration: 0.4, delay: delay + i * 0.06 }}
            className="flex gap-3"
          >
            <CheckCircle2 size={16} className={`shrink-0 mt-0.5 ${iconColor}`} />
            <p className="text-dark/65 text-[15px] leading-relaxed">{item}</p>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}

// ── Página ────────────────────────────────────────────────────────────────────
export function PoliticasPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section
        className="relative pt-[var(--nav-h)] pb-20 overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #020C1B 0%, #041A36 60%, #020C1B 100%)' }}
      >
        <div className="absolute inset-0">
          <img
            src={IMG_HERO}
            alt=""
            className="w-full h-full object-cover object-center"
            aria-hidden="true"
            style={{ opacity: 0.14 }}
          />
        </div>

        {/* Grid blueprint */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: '52px 52px',
          }}
          aria-hidden="true"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-clinic-600/15 blur-[120px] pointer-events-none" aria-hidden="true" />

        <div className="container-xl relative z-10 pt-10">
          <motion.button
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-white/40 hover:text-white/75 text-sm mb-12 transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            Volver
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-center max-w-2xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 text-sky-300/80 font-semibold text-xs tracking-[0.15em] uppercase bg-sky-500/10 border border-sky-400/20 px-3.5 py-1.5 rounded-full mb-5">
              Clínica San Martín Barranquilla Ltda.
            </span>
            <h1 className="font-display font-bold text-4xl xl:text-5xl text-white mb-5 text-balance leading-tight">
              Política de Participación{' '}
              <span className="bg-gradient-to-r from-sky-300 via-white to-sky-200 bg-clip-text text-transparent">
                Social en Salud
              </span>
            </h1>
            <p className="text-white/50 text-lg leading-relaxed">
              Nuestro compromiso con el ejercicio pleno del derecho
              a la participación ciudadana en salud.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Introducción + imagen ──────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-start">

            {/* Imagen */}
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEWPORT_CONFIG}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ perspective: '1100px' }}
              className="lg:sticky lg:top-28"
            >
              <Card3D intensity={7} className="rounded-3xl overflow-hidden shadow-clinic-xl">
                <div className="aspect-[4/3] overflow-hidden rounded-3xl">
                  <img
                    src={IMG_INTRO}
                    alt="Área clínica Clínica San Martín"
                    className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-clinic-900/40 via-transparent to-transparent" aria-hidden="true" />
                  <div className="absolute bottom-5 left-5">
                    <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md border border-white/20 rounded-xl px-3 py-1.5 text-white text-xs font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                      PPSS — Clínica San Martín
                    </span>
                  </div>
                </div>
              </Card3D>
              <div className="absolute -bottom-3 -left-3 w-full h-full rounded-3xl border-2 border-clinic-100/50 -z-10 pointer-events-none" aria-hidden="true" />
            </motion.div>

            {/* Texto */}
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEWPORT_CONFIG}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-5"
            >
              {INTRO_PARAGRAPHS.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT_CONFIG}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`leading-relaxed ${i === 0 ? 'text-dark/80 text-base font-medium' : 'text-dark/60 text-[15px]'}`}
                >
                  {p}
                </motion.p>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Secciones de política ──────────────────────────────── */}
      <section className="py-20 bg-slate-50 border-t border-clinic-100/40">
        <div className="container-xl space-y-6">

          <PolicySection
            icon={HelpCircle}
            iconColor="text-amber-500"
            iconBg="bg-amber-500/10"
            title="¿Qué necesidades o problemáticas afectan la participación en salud?"
            items={NECESIDADES}
            delay={0}
          />

          <PolicySection
            icon={ListChecks}
            iconColor="text-clinic-500"
            iconBg="bg-clinic-500/10"
            title="¿Cuáles son las responsabilidades de las EPS o IPS respecto a la PPSS?"
            items={RESPONSABILIDADES}
            delay={0.05}
          />

          <div className="grid md:grid-cols-2 gap-6">
            <PolicySection
              icon={Layers2}
              iconColor="text-violet-500"
              iconBg="bg-violet-500/10"
              title="¿Cuáles son los ejes estratégicos de la PPSS?"
              items={EJES}
              delay={0.1}
            />
            <PolicySection
              icon={Users2}
              iconColor="text-emerald-500"
              iconBg="bg-emerald-500/10"
              title="Algunas formas de participación Comunitaria en Salud son:"
              items={FORMAS}
              delay={0.15}
            />
          </div>
        </div>
      </section>

      {/* ── Imagen de cierre ──────────────────────────────────── */}
      <section className="py-16 bg-white border-t border-clinic-100/40">
        <div className="container-xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_CONFIG}
            transition={{ duration: 0.7 }}
            style={{ perspective: '900px' }}
          >
            <Card3D intensity={4} className="rounded-3xl overflow-hidden shadow-clinic-xl">
              <div className="relative aspect-[21/6] overflow-hidden rounded-3xl">
                <img
                  src={IMG_BOTTOM}
                  alt="Instalaciones Clínica San Martín Barranquilla"
                  className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-1000"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-clinic-950/75 via-transparent to-clinic-950/40" aria-hidden="true" />
                <div className="absolute inset-0 bg-gradient-to-t from-clinic-950/60 via-transparent to-transparent" aria-hidden="true" />
                <div className="absolute left-8 md:left-12 top-1/2 -translate-y-1/2" style={{ transform: 'translate(0,-50%) translateZ(20px)' }}>
                  <p className="text-sky-300/80 text-xs font-semibold tracking-[0.2em] uppercase mb-2">Barranquilla, Colombia</p>
                  <h3 className="font-display font-bold text-white text-xl md:text-3xl leading-tight">
                    Comprometidos con la<br />
                    <span className="bg-gradient-to-r from-sky-300 to-white bg-clip-text text-transparent">
                      participación ciudadana
                    </span>
                  </h3>
                </div>
              </div>
            </Card3D>
          </motion.div>
        </div>
      </section>

      {/* ── Footer strip ──────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={VIEWPORT_CONFIG}
        transition={{ duration: 0.6 }}
        className="border-t border-clinic-100/60 py-10 bg-clinic-50/30"
      >
        <div className="container-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <img
            src={import.meta.env.BASE_URL + 'logo.png'}
            alt="Clínica San Martín Barranquilla"
            className="h-8 w-auto object-contain opacity-60"
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/logo-placeholder.svg' }}
          />
          <p className="text-dark/35 text-sm text-center sm:text-right">
            Barranquilla, Atlántico, Colombia · Carrera 43 No. 70 – 106
          </p>
        </div>
      </motion.section>

    </div>
  )
}
