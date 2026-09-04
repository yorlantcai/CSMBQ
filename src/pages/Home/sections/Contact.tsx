import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { staggerContainer, staggerItem, fadeInLeft, fadeInRight, VIEWPORT_CONFIG } from '@/utils/animations'
import { CONTACT_INFO } from '@/constants'

interface FormData {
  name: string; email: string; phone: string; subject: string; message: string
}

const INITIAL_FORM: FormData = { name: '', email: '', phone: '', subject: '', message: '' }

const CONTACT_ITEMS = [
  { icon: MapPin,  label: 'Dirección',  value: CONTACT_INFO.address,      href: `https://maps.google.com/?q=${encodeURIComponent(CONTACT_INFO.address)}` },
  { icon: Phone,   label: 'Teléfono',   value: CONTACT_INFO.phones[0],    href: `tel:${CONTACT_INFO.phones[0].replace(/\s/g,'')}` },
  { icon: Phone,   label: 'Alternativo',value: CONTACT_INFO.phones[1],    href: `tel:${CONTACT_INFO.phones[1].replace(/\s/g,'')}` },
  { icon: Mail,    label: 'Email',      value: CONTACT_INFO.email,        href: `mailto:${CONTACT_INFO.email}` },
  { icon: Clock,   label: 'Atención',   value: CONTACT_INFO.schedule,     href: undefined },
]

export function Contact() {
  const [form, setForm]       = useState<FormData>(INITIAL_FORM)
  const [sending, setSending] = useState(false)
  const [sent, setSent]       = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      toast.error('Por favor completa los campos requeridos.')
      return
    }
    setSending(true)
    // Simulated submit — replace with actual API call
    await new Promise((r) => setTimeout(r, 1400))
    setSending(false)
    setSent(true)
    toast.success('¡Mensaje enviado! Te contactaremos pronto.')
    setTimeout(() => { setSent(false); setForm(INITIAL_FORM) }, 5000)
  }

  const inputCls = `w-full px-4 py-3 rounded-xl border border-clinic-100 bg-clinic-50/40
    text-dark placeholder:text-dark/35 text-sm
    focus:outline-none focus:ring-2 focus:ring-clinic-500/30 focus:border-clinic-400
    transition-all duration-200`

  return (
    <section id="contacto" className="section-padding bg-surface overflow-hidden">
      <div className="container-xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="section-label mb-5 inline-flex">Contacto</span>
          <h2 className="font-display font-bold text-4xl xl:text-5xl text-dark mb-4 text-balance">
            Estamos aquí para{' '}
            <span className="gradient-text">ayudarte</span>
          </h2>
          <p className="text-dark/60 text-lg leading-relaxed">
            Comunícate con nosotros para agendar una cita, solicitar información o resolver
            cualquier inquietud. Nuestro equipo está disponible para atenderte.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 xl:gap-12 items-start">

          {/* Left — Contact info + Map */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_CONFIG}
            className="lg:col-span-2 space-y-4"
          >
            {/* Contact items */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_CONFIG}
              className="bg-white rounded-3xl border border-clinic-100/60 shadow-card p-6 space-y-4"
            >
              {CONTACT_ITEMS.map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.div key={i} variants={staggerItem}>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-clinic-50 transition-colors group"
                      >
                        <div className="w-9 h-9 rounded-lg bg-clinic-50 group-hover:bg-clinic-500 border border-clinic-100 group-hover:border-clinic-500 flex items-center justify-center shrink-0 transition-colors duration-200">
                          <Icon size={15} className="text-clinic-500 group-hover:text-white transition-colors duration-200" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-dark/40 uppercase tracking-wider mb-0.5">{item.label}</p>
                          <p className="text-sm text-dark/80 font-medium group-hover:text-clinic-600 transition-colors">{item.value}</p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-start gap-3.5 p-3">
                        <div className="w-9 h-9 rounded-lg bg-clinic-50 border border-clinic-100 flex items-center justify-center shrink-0">
                          <Icon size={15} className="text-clinic-500" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-dark/40 uppercase tracking-wider mb-0.5">{item.label}</p>
                          <p className="text-sm text-dark/80 font-medium">{item.value}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Map embed */}
            <div className="rounded-3xl overflow-hidden border border-clinic-100/60 shadow-card h-56 bg-clinic-50">
              <iframe
                src="https://maps.google.com/maps?q=Barranquilla+Atlantico+Colombia&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Clínica San Martín Barranquilla"
                aria-label="Mapa de ubicación de la clínica"
              />
            </div>
          </motion.div>

          {/* Right — Contact form */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_CONFIG}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-3xl border border-clinic-100/60 shadow-card p-8">
              <h3 className="font-display font-bold text-xl text-dark mb-6">Envíanos un mensaje</h3>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-clinic-50 border border-clinic-200 flex items-center justify-center mb-4">
                    <CheckCircle size={32} className="text-clinic-500" />
                  </div>
                  <h4 className="font-display font-bold text-xl text-dark mb-2">¡Mensaje enviado!</h4>
                  <p className="text-dark/55 text-sm max-w-xs">
                    Gracias por contactarnos. Nuestro equipo te responderá en las próximas horas.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate aria-label="Formulario de contacto">
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-semibold text-dark/60 uppercase tracking-wider mb-1.5">
                        Nombre completo <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Tu nombre"
                        required
                        autoComplete="name"
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-dark/60 uppercase tracking-wider mb-1.5">
                        Correo electrónico <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="tu@email.com"
                        required
                        autoComplete="email"
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-xs font-semibold text-dark/60 uppercase tracking-wider mb-1.5">
                        Teléfono
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+57 300 000 0000"
                        autoComplete="tel"
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-xs font-semibold text-dark/60 uppercase tracking-wider mb-1.5">
                        Asunto
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        className={inputCls}
                      >
                        <option value="">Seleccionar asunto</option>
                        <option value="citas">Agendar Cita</option>
                        <option value="especialidades">Información de Especialidades</option>
                        <option value="resultados">Resultados Médicos</option>
                        <option value="urgencias">Urgencias</option>
                        <option value="otro">Otro</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="message" className="block text-xs font-semibold text-dark/60 uppercase tracking-wider mb-1.5">
                      Mensaje <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="¿En qué podemos ayudarte?"
                      required
                      rows={5}
                      className={`${inputCls} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="btn-primary w-full justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {sending ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        Enviar Mensaje
                      </>
                    )}
                  </button>

                  <p className="text-center text-dark/35 text-xs mt-4">
                    Tus datos están protegidos y nunca serán compartidos con terceros.
                  </p>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
