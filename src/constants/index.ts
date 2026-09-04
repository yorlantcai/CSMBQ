import type { NavLink, Specialty, Service, StatItem, ContactInfo, ResultPortal, NamedItem } from '@/types'

// ── Identidad institucional ─────────────────────────────────────────────────
// La clínica abrió sus puertas en 2009. Los años de servicio se calculan de
// forma dinámica para que se actualicen solos con el paso del tiempo.
export const FOUNDING_YEAR = 2009
export const YEARS_OF_SERVICE = new Date().getFullYear() - FOUNDING_YEAR

export const CLINIC_SLOGAN =
  'Nacimos, Crecemos y Trabajamos con un solo objetivo: tu Bienestar y el de tu Familia'

export const NAV_LINKS: NavLink[] = [
  { label: 'Inicio',         href: '#inicio' },
  { label: 'Nosotros',       href: '#nosotros' },
  { label: 'Especialidades', href: '#especialidades' },
  { label: 'Servicios',      href: '#servicios' },
  { label: 'Pacientes',      href: '/pacientes' },
  { label: 'Resultados',     href: '#resultados' },
  { label: 'Contacto',       href: '#contacto' },
]

// Consulta Externa Especializada (según el Portafolio de Servicios).
export const SPECIALTIES: Specialty[] = [
  { id: 'medicina-interna',  icon: 'Stethoscope',    title: 'Medicina Interna',            description: 'Evaluación, diagnóstico y manejo integral del paciente adulto con enfoque clínico y preventivo.' },
  { id: 'ginecobstetricia',  icon: 'Baby',           title: 'Ginecobstetricia',            description: 'Atención de la salud de la mujer y acompañamiento integral durante el embarazo y el parto.' },
  { id: 'pediatria',         icon: 'Star',           title: 'Pediatría',                   description: 'Cuidado especializado de la salud de niños y adolescentes en un piso exclusivo de pediatría.' },
  { id: 'cirugia-general',   icon: 'Scissors',       title: 'Cirugía General',             description: 'Procedimientos quirúrgicos de baja, mediana y alta complejidad con técnicas modernas y seguras.' },
  { id: 'cirugia-plastica',  icon: 'Sparkles',       title: 'Cirugía Plástica',            description: 'Procedimientos reconstructivos y estéticos realizados por especialistas certificados.' },
  { id: 'anestesiologia',    icon: 'Syringe',        title: 'Anestesiología',              description: 'Manejo seguro de la anestesia y el cuidado perioperatorio en todos nuestros servicios quirúrgicos.' },
  { id: 'gastroenterologia', icon: 'Activity',       title: 'Gastroenterología',           description: 'Diagnóstico y tratamiento de las enfermedades del sistema digestivo con tecnología de apoyo.' },
  { id: 'infectologia',      icon: 'ShieldAlert',    title: 'Infectología',                description: 'Manejo de infecciones en pacientes inmunocomprometidos y oncológicos con protocolos de bioseguridad.' },
  { id: 'ortopedia',         icon: 'Bone',           title: 'Ortopedia',                   description: 'Atención de lesiones y enfermedades del sistema osteomuscular en población adulta y pediátrica.' },
  { id: 'dolor-paliativos',  icon: 'Heart',          title: 'Dolor y Cuidados Paliativos', description: 'Control del dolor y atención humanizada para mejorar la calidad de vida del paciente y su familia.' },
  { id: 'rehab-oncologica',  icon: 'Dumbbell',       title: 'Rehabilitación Oncológica',   description: 'Recuperación funcional y acompañamiento del paciente oncológico durante y después del tratamiento.' },
  { id: 'nutricion',         icon: 'Apple',          title: 'Nutrición y Dietética',       description: 'Valoración y plan nutricional personalizado como parte del cuidado integral del paciente.' },
  { id: 'psicologia',        icon: 'Brain',          title: 'Psicología',                  description: 'Acompañamiento emocional al paciente y su familia en cada etapa del proceso salud-enfermedad.' },
  { id: 'enfermeria',        icon: 'HeartHandshake', title: 'Enfermería',                  description: 'Cuidado continuo, seguro y humanizado las 24 horas por un equipo de enfermería calificado.' },
]

// Líneas de servicio (según el Portafolio de Servicios).
export const SERVICES: Service[] = [
  {
    id: 'hospitalaria',
    icon: 'BedDouble',
    title: 'Atención Hospitalaria',
    description: 'Cuidados continuo para pacientes adultos y pediátricos durante su estancia hospitalaria.',
    features: ['Hospitalización adulta y pediátrica', 'Servicio Farmacéutico – Central de Mezcla','Cuidados intensivos e intermedios adultos y pediátricos'],
  },
  {
    id: 'cirugia',
    icon: 'Scissors',
    title: 'Cirugía General y Especializada',
    description: 'Procedimientos quirúrgicos para diferentes niveles de complejidad y especialidades.',
    features: ['Cirugía oncológica', 'Cabeza y cuello, tórax y vascular', 'Neurocirugía, plástica y pediátrica', 'Otras cirugías no oncológicas'],
  },
  {
    id: 'hemato-onco',
    icon: 'Droplets',
    title: 'Hemato-Oncología y Quimioterapia',
    description: 'Tratamiento especializado para enfermedades hemato-oncológicas en adultos y pediátricos.',
    features: ['Quimioterapia adulto y pediátrica', 'Central de Mezcla certificada INVIMA', 'Medicina del dolor y cuidados paliativos', 'Red integrada con CECAC Ltda.'],
  },
  {
    id: 'diagnostico',
    icon: 'ScanLine',
    title: 'Ayudas Diagnósticas',
    description: 'Tecnología y servicios diagnósticos para apoyar la evaluación y seguimiento clínico.',
    features: ['Imágenes diagnósticas', 'Laboratorio clínico', 'Laboratorio de patología', 'Unidad de gestión pre transfusional'],
  },
  {
    id: 'urgencias',
    icon: 'Ambulance',
    title: 'Centro de Urgencias',
    description: 'Atención inmediata ante situaciones que requieren valoración y manejo prioritario.',
    features: ['Consultorio de triage', 'Sala de observación y reanimación', 'Sala ERA', 'Procedimientos menores'],
  },
  {
    id: 'apoyo',
    icon: 'HeartHandshake',
    title: 'Servicios de Apoyo',
    description: 'Acompañamiento profesional centrado en el bienestar físico, emocional y social.',
    features: ['Psicología y trabajo social', 'Fisioterapia y nutrición', 'Acompañamiento espiritual', 'Transporte asistencial medicalizado'],
  },
]

// Programas Integrales de Salud — cirugías por videolaparoscopia.
export const LAPAROSCOPIC_SURGERIES: string[] = [
  'Cirugía Antirreflujo',
  'Cirugía Bariátrica para Obesidad',
  'Cirugía de Hernias',
  'Cirugía de Tórax',
  'Colecistectomía',
  'Esplenectomía',
  'Laparoscopia Diagnóstica y Biopsia de Órganos',
  'Simpatectomía',
  'Supradrenalectomía',
  'Cirugía Ginecológica',
  'Cirugía Pediátrica',
]

// Medicina del Dolor y Cuidados Paliativos — alcance del programa.
export const PALLIATIVE_CARE_SERVICES: string[] = [
  'Valoración especializada en medicina del dolor y cuidados paliativos',
  'Manejo y seguimiento farmacológico del dolor agudo y crónico',
  'Intervenciones no farmacológicas complementarias',
  'Acompañamiento psicológico, espiritual y social al paciente y su familia',
  'Atención ambulatoria y hospitalaria',
  'Educación en el autocuidado y apoyo al cuidador',
  'Planes terapéuticos individualizados',
  'Orientación para la toma de decisiones clínicas y planificación anticipada',
]

// Fundación Hora Dorada — programas de acompañamiento integral.
export const HORA_DORADA_PROGRAMS: NamedItem[] = [
  { title: 'Escuela para cuidadores',                 description: 'Espacio formativo que brinda herramientas prácticas y emocionales a los cuidadores principales, fortaleciendo su rol frente al proceso de la enfermedad.' },
  { title: 'Manejo del duelo',                        description: 'Acompañamiento psicológico, espiritual y social para pacientes, familias y cuidadores en procesos de pérdida, con intervenciones individuales y grupales.' },
  { title: 'Actividades lúdicas y de recreación',     description: 'Jornadas que promueven el bienestar emocional, la integración familiar y el esparcimiento mediante juegos, arte, música y actividades temáticas.' },
  { title: 'Voluntariado terapéutico',                description: 'Red de voluntarios capacitados para brindar compañía, escucha activa, lectura y actividades significativas durante el tratamiento o la hospitalización.' },
  { title: 'Banco de apoyos solidarios',              description: 'Canaliza donaciones de medicamentos, ayudas técnicas, transporte e insumos básicos para pacientes en condición de vulnerabilidad.' },
  { title: 'Celebraciones de vida y reconocimiento',  description: 'Actividades conmemorativas que reconocen hitos en el tratamiento y brindan contención emocional en momentos clave del proceso.' },
  { title: 'Talleres de autocuidado y empoderamiento', description: 'Espacios educativos sobre la enfermedad, el manejo de efectos secundarios, los derechos del paciente y estrategias de afrontamiento positivo.' },
]

export const STATS: StatItem[] = [
  { value: YEARS_OF_SERVICE, suffix: '+', label: 'Años de Experiencia',   description: 'Cuidando la salud de la Región Caribe' },
  { value: 100000, suffix: '+', label: 'Pacientes Atendidos',   description: 'Confiaron en nuestra institución' },
  { value: 14,     suffix: '+', label: 'Especialidades',        description: 'En consulta externa especializada' },
  { value: 165,    suffix: '',  label: 'Camas Hospitalarias',   description: 'Con monitoreo permanente' },
]

export const RESULT_PORTALS: ResultPortal[] = [
  {
    id: 'laboratorio',
    title: 'Resultados de Laboratorio',
    subtitle: 'Laboratorio Clínico',
    description: 'Consulta en línea los resultados de tus exámenes de laboratorio de forma rápida, segura y confidencial.',
    url: 'http://190.71.183.26:8080/resultados/#nbb',
    icon: 'FlaskConical',
    color: 'from-clinic-500 to-clinic-700',
  },
  {
    id: 'imagenes',
    title: 'Imágenes Diagnósticas',
    subtitle: 'Radiología Digital',
    description: 'Accede a tus estudios de imágenes diagnósticas — TAC, resonancias, ecografías y radiografías digitales.',
    url: 'https://lumierdigital.com:8443/paciente/login.lu?ipsId=92&token=ZgjZSYG7cA',
    icon: 'ScanLine',
    color: 'from-sky-500 to-sky-700',
  },
  // {
  //   id: 'historia-clinica',
  //   title: 'Solicitud de Historia Clínica',
  //   subtitle: 'Trámite en Línea',
  //   description: 'Solicita tu historia clínica en línea. Verificamos tu identidad y la recibes en tu correo.',
  //   url: '/solicitud-historia-clinica',
  //   icon: 'FileText',
  //   color: 'from-emerald-500 to-emerald-700',
  //   internal: true,
  //   ctaLabel: 'Solicitar Historia Clínica',
  // },
]

export const CONTACT_INFO: ContactInfo = {
  address:  'Carrera 43 No. 70 – 106, Barranquilla, Atlántico, Colombia',
  phones:   ['605 3133990', '+57 5 360 0601'],
  email:    'atencionalusuario@csmbq.com',
  web:      'www.csmbq.com',
  schedule: 'Lunes a Domingo — 24 horas',
}

// ── Solicitud de Historia Clínica ───────────────────────────────────────────
export const HC_RESERVA_LEGAL =
  'La Resolución 1995 de 1999, en su Artículo 14, Parágrafo, establece que el acceso a la historia clínica se entiende, en todos los casos, única y exclusivamente para los fines que de acuerdo con la ley resulten procedentes, debiendo mantenerse la reserva legal.'

export const HC_DOC_TYPES: { value: string; label: string }[] = [
  { value: 'C.C.',      label: 'Cédula de Ciudadanía (C.C.)' },
  { value: 'C.E.',      label: 'Cédula de Extranjería (C.E.)' },
  { value: 'Pasaporte', label: 'Pasaporte' },
]

// El paciente menor/fallecido puede identificarse además con T.I. o R.C.
export const HC_DOC_TYPES_PACIENTE: { value: string; label: string }[] = [
  ...HC_DOC_TYPES,
  { value: 'T.I.', label: 'Tarjeta de Identidad (T.I.)' },
  { value: 'R.C.', label: 'Registro Civil (R.C.)' },
]

export const HC_PARENTESCOS: string[] = ['Padre o Madre', 'Hijo(a)', 'Compañero(a)']

export interface HCTipoConfig {
  id: 'propia' | 'tercero' | 'menor' | 'fallecido'
  titulo: string
  descripcion: string
  codigoFormato: string
  requisitos: string[]
}

export const HC_TIPOS: HCTipoConfig[] = [
  {
    id: 'propia',
    titulo: 'Mi propia historia clínica',
    descripcion: 'Solicito copia de mi historia clínica como titular.',
    codigoFormato: 'FAV-004',
    requisitos: ['Copia de tu documento de identidad'],
  },
  {
    id: 'tercero',
    titulo: 'Autorización a un tercero',
    descripcion: 'Como paciente, autorizo a otra persona a reclamar mi historia clínica.',
    codigoFormato: 'FAV-001',
    requisitos: ['Copia del documento del paciente', 'Copia del documento del autorizado'],
  },
  {
    id: 'menor',
    titulo: 'Menor de edad o incapacitado',
    descripcion: 'Solicito la historia clínica de un menor de edad o persona incapacitada que represento.',
    codigoFormato: 'FAV-002',
    requisitos: ['Copia del documento del solicitante', 'Registro civil o documento que pruebe el parentesco'],
  },
  {
    id: 'fallecido',
    titulo: 'Paciente fallecido',
    descripcion: 'Solicito la historia clínica de un familiar fallecido.',
    codigoFormato: 'FAV-003',
    requisitos: ['Copia del documento del solicitante', 'Documento que pruebe el parentesco'],
  },
]

// URL pública del formulario (para el QR). Configurable por entorno.
export const URL_SOLICITUD_HC = `${(import.meta.env.VITE_SITE_URL ?? 'https://www.csmbq.com').replace(/\/$/, '')}/solicitud-historia-clinica`

export const SOCIAL_LINKS = [
  { label: 'Facebook',  icon: 'Facebook',  href: 'https://www.facebook.com/clinicasanmartinbaq' },
  { label: 'Instagram', icon: 'Instagram', href: 'https://www.instagram.com/clinicasanmartinbaq' },
  { label: 'Twitter',   icon: 'Twitter',   href: 'https://twitter.com/csmbaq' },
  { label: 'YouTube',   icon: 'Youtube',   href: 'https://www.youtube.com/@clinicasanmartinbaq' },
]
