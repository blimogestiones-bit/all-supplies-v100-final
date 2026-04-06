"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { PageTransition } from "@/components/page-transition"
import { ContactLink } from "@/components/contact-link"
import { useLanguage } from "@/lib/language-context"

// Custom SVG icons to replace lucide-react
const ArrowLeftIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
  </svg>
)

const ZapIcon = () => (
  <svg className="h-12 w-12 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
    <path d="M7 2v11h3v9l7-12h-4l4-8z" />
  </svg>
)

const CheckCircleIcon = () => (
  <svg className="h-6 w-6 text-orange-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
)

const CheckCircleBlueIcon = () => (
  <svg className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
)

const GlobeIcon = () => (
  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
  </svg>
)

const WrenchIcon = () => (
  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
  </svg>
)

const ShieldIcon = () => (
  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11H16V18H8V11H9.2V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.4,8.7 10.4,10V11H13.6V10C13.6,8.7 12.8,8.2 12,8.2Z" />
  </svg>
)

export default function EnergiaTecnologiaPage() {
  const { t, language } = useLanguage()
  const features = [
    "Equipos especializados: variadores, sistemas de instrumentación, sensores de fondo",
    "Válvulas de alta especificación y sistemas de bombeo avanzados",
    "Unidades de control y automatización industrial",
    "Tecnologías de monitoreo y control en tiempo real",
    "Soporte técnico 24/7 con equipos certificados",
    "Mantenimiento predictivo y análisis técnico especializado",
    "Integración y operación continua de sistemas complejos",
    "Soluciones tecnológicas innovadoras para optimización de procesos",
  ]

  const benefits = [
    "Reducción de tiempos de inactividad operacional",
    "Mejora en la eficiencia de producción",
    "Cumplimiento de estándares internacionales de seguridad",
    "Optimización de costos operativos",
    "Acceso a tecnología de vanguardia",
    "Soporte técnico especializado local e internacional",
    "Integración de sistemas inteligentes",
    "Monitoreo y control remoto de operaciones",
  ]

  const applications = [
    "Industria Energética",
    "Manufactura y Producción",
    "Automatización Industrial",
    "Sistemas de Monitoreo",
    "Control de Procesos",
    "Infraestructura Crítica",
    "Plantas de Procesamiento",
    "Instalaciones Industriales",
  ]

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
        {/* Header */}
        <header className="bg-gradient-to-r from-slate-900 to-orange-900 text-white py-6 shadow-xl">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-4">
              <Link href="/" className="inline-flex items-center space-x-2 text-orange-200 hover:text-white">
                <ArrowLeftIcon />
                <span>{language === "es" ? "Volver al inicio" : "Back to Home"}</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-orange-100 rounded-full">
                <ZapIcon />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">{t.services.energia.title}</h1>
                <p className="text-xl text-orange-100">
                  {t.services.energia.description}
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12">
          {/* Introducción */}
          <div className="max-w-4xl mx-auto mb-16">
            <Card className="border-l-4 border-l-orange-500 shadow-xl bg-gradient-to-r from-white to-orange-50">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  {t.services.energia.mainTitle}
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  {t.services.energia.mainDesc}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Características */}
            <Card className="shadow-xl border-t-4 border-t-orange-500 bg-gradient-to-br from-white to-orange-50">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-2 text-xl">
                  <WrenchIcon />
                  <span>{t.services.energia.characteristics}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-4">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircleIcon />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Beneficios */}
            <Card className="shadow-xl border-t-4 border-t-blue-500 bg-gradient-to-br from-white to-blue-50">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-2 text-xl">
                  <ShieldIcon />
                  <span>{t.services.energia.benefits}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircleBlueIcon />
                      <span className="text-slate-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Aplicaciones */}
          <Card className="shadow-xl border-t-4 border-t-green-500 bg-gradient-to-br from-white to-green-50 mb-16">
            <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center space-x-2 text-xl">
                <GlobeIcon />
                <span>Aplicaciones y Sectores</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                {applications.map((application, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="p-3 text-center bg-green-100 text-green-800 hover:bg-green-200 transition-colors"
                  >
                    {application}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <Card className="max-w-2xl mx-auto shadow-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">
                  {language === "es" ? "¿Listo para optimizar tus operaciones industriales?" : "Ready to optimize your industrial operations?"}
                </h3>
                <p className="text-orange-100 mb-6">
                  {language === "es" 
                    ? "Contáctanos para una consulta especializada y descubre cómo podemos impulsar la eficiencia tecnológica de tu empresa."
                    : "Contact us for a specialized consultation and discover how we can drive the technological efficiency of your company."}
                </p>
                <ContactLink className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-3 text-lg font-semibold rounded-md transition-colors">
                  {language === "es" ? "Solicitar Consulta" : "Request Consultation"}
                </ContactLink>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
