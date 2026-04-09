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

const ShoppingCartIcon = () => (
  <svg className="h-12 w-12 text-green-600" fill="currentColor" viewBox="0 0 24 24">
    <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
  </svg>
)

const CheckCircleIcon = () => (
  <svg className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
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

const TruckIcon = () => (
  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
  </svg>
)

const ShieldIcon = () => (
  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11H16V18H8V11H9.2V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.4,8.7 10.4,10V11H13.6V10C13.6,8.7 12.8,8.2 12,8.2Z" />
  </svg>
)

export default function ProcuraInternacionalPage() {
  const { t, language } = useLanguage()
  
  const featuresES = [
    "Gestión de compras internacionales llave en mano",
    "Identificación y validación de proveedores confiables",
    "Trazabilidad completa de la cadena logística",
    "Monitoreo de carga en tiempo real",
    "Cumplimiento normativo internacional",
    "Gestión de documentación y certificaciones",
  ]
  
  const featuresEN = [
    "Turnkey international purchasing management",
    "Identification and validation of reliable suppliers",
    "Complete traceability of the logistics chain",
    "Real-time cargo monitoring",
    "International regulatory compliance",
    "Documentation and certification management",
  ]

  const benefitsES = [
    "Reducción de costos de procura hasta 25%",
    "Acceso a proveedores globales verificados",
    "Minimización de riesgos en la cadena de suministro",
    "Optimización de tiempos de entrega",
    "Transparencia total en el proceso",
    "Cumplimiento regulatorio garantizado",
  ]
  
  const benefitsEN = [
    "Procurement cost reduction up to 25%",
    "Access to verified global suppliers",
    "Risk minimization in the supply chain",
    "Delivery time optimization",
    "Total transparency in the process",
    "Guaranteed regulatory compliance",
  ]

  const applicationsES = [
    "Sector Energético",
    "Industria de la Salud",
    "Infraestructura y Construcción",
    "Industria Alimentaria",
    "Tecnología y Telecomunicaciones",
    "Manufactura Industrial",
  ]
  
  const applicationsEN = [
    "Energy Sector",
    "Healthcare Industry",
    "Infrastructure and Construction",
    "Food Industry",
    "Technology and Telecommunications",
    "Industrial Manufacturing",
  ]
  
  const features = language === "es" ? featuresES : featuresEN
  const benefits = language === "es" ? benefitsES : benefitsEN
  const applications = language === "es" ? applicationsES : applicationsEN

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
        {/* Header */}
        <header className="bg-gradient-to-r from-slate-900 to-green-900 text-white py-6 shadow-xl">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-4">
              <Link href="/" className="inline-flex items-center space-x-2 text-green-200 hover:text-white">
                <ArrowLeftIcon />
                <span>{language === "es" ? "Volver al inicio" : "Back to Home"}</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-green-100 rounded-full">
                <ShoppingCartIcon />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">{t.services.procura.title}</h1>
                <p className="text-xl text-green-100">
                  {t.services.procura.description}
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12">
          {/* Introducción */}
          <div className="max-w-4xl mx-auto mb-16">
            <Card className="border-l-4 border-l-green-500 shadow-xl bg-gradient-to-r from-white to-green-50">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  {t.services.procura.mainTitle}
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  {t.services.procura.mainDesc}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16">
            {/* Características */}
            <Card className="shadow-xl border-t-4 border-t-green-500 bg-gradient-to-br from-white to-green-50">
              <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-2 text-xl">
                  <GlobeIcon />
                  <span>{t.services.procura.characteristics}</span>
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
                  <TruckIcon />
                  <span>{t.services.procura.benefits}</span>
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
          <Card className="shadow-xl border-t-4 border-t-purple-500 bg-gradient-to-br from-white to-purple-50 mb-16">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center space-x-2 text-xl">
                  <ShieldIcon />
                  <span>{language === "es" ? "Aplicaciones y Sectores" : "Applications and Sectors"}</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {applications.map((application, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="p-3 text-center bg-purple-100 text-purple-800 hover:bg-purple-200 transition-colors"
                  >
                    {application}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <Card className="max-w-2xl mx-auto shadow-xl bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">
                  {language === "es" ? "¿Necesitas optimizar tu cadena de suministro?" : "Do you need to optimize your supply chain?"}
                </h3>
                <p className="text-green-100 mb-6">
                  {language === "es"
                    ? "Contáctanos para descubrir cómo podemos reducir tus costos de procura y mejorar tu eficiencia operacional."
                    : "Contact us to discover how we can reduce your procurement costs and improve your operational efficiency."}
                </p>
                <ContactLink className="bg-white text-green-600 hover:bg-green-50 px-8 py-3 text-lg font-semibold rounded-md transition-colors">
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
