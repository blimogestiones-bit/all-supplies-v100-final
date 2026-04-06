"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/lib/language-context"

// Simple SVG icons to replace lucide-react
const MessageCircleIcon = () => (
  <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
  </svg>
)

const SendIcon = () => (
  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </svg>
)

const UserIcon = () => (
  <svg className="h-4 w-4 text-brand-blue-dark" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
)

const MailIcon = () => (
  <svg className="h-4 w-4 text-brand-blue-dark" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
)

const BuildingIcon = () => (
  <svg className="h-4 w-4 text-brand-blue-dark" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
  </svg>
)

const PhoneIcon = () => (
  <svg className="h-4 w-4 text-brand-blue-dark" fill="currentColor" viewBox="0 0 24 24">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
  </svg>
)

interface FormData {
  name: string
  email: string
  phone: string
  company: string
  service: string
  message: string
}

export function ContactForm() {
  const { t, language } = useLanguage()
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Partial<FormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = language === "es" ? "El nombre es obligatorio" : "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = language === "es" ? "El email es obligatorio" : "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = language === "es" ? "El email no es válido" : "Email is not valid"
    }

    if (!formData.message.trim()) {
      newErrors.message = language === "es" ? "El mensaje es obligatorio" : "Message is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const generateWhatsAppMessage = () => {
    const message = `
🏢 *CONSULTA DESDE ALL SUPPLIES WEB*

👤 *Datos del Cliente:*
• Nombre: ${formData.name}
• Email: ${formData.email}
• Teléfono: ${formData.phone}
• Empresa: ${formData.company}

🔧 *Servicio de Interés:*
${formData.service}

💬 *Mensaje:*
${formData.message}

---
Enviado desde: allsuppliesinv.com
    `.trim()

    return encodeURIComponent(message)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Generar URL de WhatsApp
    const whatsappMessage = generateWhatsAppMessage()
    const whatsappURL = `https://wa.me/50762270820?text=${whatsappMessage}`

    // Abrir WhatsApp
    window.open(whatsappURL, "_blank")

    // Reset form
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        message: "",
      })
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl border-t-4 border-t-brand-green-dark">
      <CardHeader className="text-center bg-brand-green-dark text-white rounded-t-lg">
        <div className="mx-auto mb-4 p-3 bg-white/20 rounded-full w-fit">
          <MessageCircleIcon />
        </div>
        <CardTitle className="text-2xl font-bold">
          {language === "es" ? "Solicitar Consulta" : "Request Consultation"}
        </CardTitle>
        <CardDescription className="text-white">
          {language === "es" 
            ? "Completa el formulario y te contactaremos vía WhatsApp para brindarte una consulta personalizada"
            : "Fill out the form and we will contact you via WhatsApp to provide personalized assistance"}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 bg-white">
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center space-x-2 text-text-primary font-medium">
                <UserIcon />
                <span>{t.contact.form.name} *</span>
              </Label>
              <Input
                id="name"
                type="text"
                placeholder={language === "es" ? "Tu nombre completo" : "Your full name"}
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={`w-full border-2 transition-colors ${
                  errors.name
                    ? "border-error focus:border-error focus:ring-error"
                    : "border-slate-300 focus:border-brand-green-dark focus:ring-brand-green-dark"
                }`}
              />
              {errors.name && (
                <p id="name-error" className="text-sm text-error font-medium" role="alert">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center space-x-2 text-text-primary font-medium">
                <MailIcon />
                <span>Email *</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={`w-full border-2 transition-colors ${
                  errors.email
                    ? "border-error focus:border-error focus:ring-error"
                    : "border-slate-300 focus:border-brand-green-dark focus:ring-brand-green-dark"
                }`}
              />
              {errors.email && (
                <p id="email-error" className="text-sm text-error font-medium" role="alert">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center space-x-2 text-text-primary font-medium">
                <PhoneIcon />
                <span>{t.contact.form.phone}</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+507 1234-5678"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="w-full border-2 border-slate-300 focus:border-brand-green-dark focus:ring-brand-green-dark transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company" className="flex items-center space-x-2 text-text-primary font-medium">
                <BuildingIcon />
                <span>{language === "es" ? "Empresa" : "Company"}</span>
              </Label>
              <Input
                id="company"
                type="text"
                placeholder={language === "es" ? "Nombre de tu empresa" : "Your company name"}
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                className="w-full border-2 border-slate-300 focus:border-brand-green-dark focus:ring-brand-green-dark transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="service" className="text-text-primary font-medium">
              {t.contact.form.service}
            </Label>
            <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
              <SelectTrigger className="border-2 border-slate-300 focus:border-brand-green-dark">
                <SelectValue placeholder={t.contact.form.selectService} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="energia-tecnologia">{t.contact.serviceOptions.energia}</SelectItem>
                <SelectItem value="procura-internacional">{t.contact.serviceOptions.procura}</SelectItem>
                <SelectItem value="productos">{t.contact.serviceOptions.productos}</SelectItem>
                <SelectItem value="otro">{t.contact.serviceOptions.otro}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-text-primary font-medium">
              {t.contact.form.message} *
            </Label>
            <Textarea
              id="message"
              placeholder={t.contact.form.messagePlaceholder}
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              required
              rows={4}
              aria-invalid={errors.message ? "true" : "false"}
              aria-describedby={errors.message ? "message-error" : undefined}
              className={`w-full border-2 transition-colors ${
                errors.message
                  ? "border-error focus:border-error focus:ring-error"
                  : "border-slate-300 focus:border-brand-green-dark focus:ring-brand-green-dark"
              }`}
            />
            {errors.message && (
              <p id="message-error" className="text-sm text-error font-medium" role="alert">
                {errors.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand-green-dark hover:bg-brand-green text-white py-3 text-lg font-semibold border-0 focus:outline-none focus:ring-2 focus:ring-brand-green-dark focus:ring-offset-2 transition-all"
          >
            {isSubmitting ? (
              t.contact.form.sending
            ) : (
              <>
                <SendIcon />
                {t.contact.form.submit}
              </>
            )}
          </Button>

          <p className="text-xs text-text-muted text-center">
            {language === "es" 
              ? "Al enviar este formulario, serás redirigido a WhatsApp para completar tu consulta de forma directa y personalizada."
              : "By submitting this form, you will be redirected to WhatsApp to complete your inquiry directly and personally."}
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
