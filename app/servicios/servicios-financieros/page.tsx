import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { PageTransition } from "@/components/page-transition"
import { ContactLink } from "@/components/contact-link"

// Custom SVG icons to replace lucide-react
const ArrowLeftIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
  </svg>
)

const CreditCardIcon = () => (
  <svg className="h-12 w-12 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
  </svg>
)

const CheckCircleIcon = () => (
  <svg className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
)

const CheckCircleGreenIcon = () => (
  <svg className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
)

const GlobeIcon = () => (
  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
  </svg>
)

const ShieldIcon = () => (
  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11H16V18H8V11H9.2V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.4,8.7 10.4,10V11H13.6V10C13.6,8.7 12.8,8.2 12,8.2Z" />
  </svg>
)

const TrendingUpIcon = () => (
  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
  </svg>
)

export default function ServiciosFinancierosPage() {
  const features = [
    "Plataformas de Trading y colocaciones financieras",
    "Estructuración financiera personalizada",
    "Gestión de Títulos de Valores",
    "Repatriación de capitales para empresas transnacionales",
    "Sistemas de pago automatizados y confiables",
    "Facilitación de pagos a proveedores internacionales",
  ]

  const benefits = [
    "Acceso a mercados financieros globales",
    "Optimización de flujos de capital",
    "Reducción de costos de transacciones internacionales",
    "Mitigación de riesgos cambiarios",
    "Cumplimiento de regulaciones internacionales",
    "Trazabilidad completa de operaciones financieras",
  ]

  const applications = [
    "Consultoría Financiera Focalizada",
    "Comercio Internacional",
    "Inversiones Extranjeras",
    "Financiamiento de Proyectos",
    "Gestión de Tesorería Corporativa",
    "Operaciones de Cambio",
    "Estructuras de Pago Complejas",
  ]

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
        {/* Header */}
        <header className="bg-gradient-to-r from-slate-900 to-blue-900 text-white py-6 shadow-xl">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-4">
              <Link href="/" className="inline-flex items-center space-x-2 text-blue-200 hover:text-white">
                <ArrowLeftIcon />
                <span>Volver al inicio</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-blue-100 rounded-full">
                <CreditCardIcon />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">Servicios Financieros Internacionales</h1>
                <p className="text-xl text-blue-100">Soluciones financieras especializadas para mercados</p>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12">
          {/* Introducción - Título actualizado sin "Navegando" */}
          <div className="max-w-4xl mx-auto mb-16">
            <Card className="border-l-4 border-l-blue-500 shadow-xl bg-gradient-to-r from-white to-blue-50">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Mercados Financieros Globales</h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Nuestra división de Servicios Financieros Internacionales está dedicada a proveer soluciones adaptadas
                  a empresas que operan en mercados internacionales. Con una red de alianzas financieras en múltiples
                  continentes, facilitamos operaciones internacionales con garantía de trazabilidad y cumplimiento.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Características */}
            <Card className="shadow-xl border-t-4 border-t-blue-500 bg-gradient-to-br from-white to-blue-50">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-2 text-xl">
                  <TrendingUpIcon />
                  <span>Características Principales</span>
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
            <Card className="shadow-xl border-t-4 border-t-green-500 bg-gradient-to-br from-white to-green-50">
              <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-2 text-xl">
                  <ShieldIcon />
                  <span>Beneficios Clave</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircleGreenIcon />
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
            <Card className="max-w-2xl mx-auto shadow-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">¿Necesitas soluciones financieras especializadas?</h3>
                <p className="text-blue-100 mb-6">
                  Contáctanos para descubrir cómo podemos facilitar tus operaciones financieras internacionales.
                </p>
                <ContactLink className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg font-semibold rounded-md transition-colors">
                  Solicitar Consulta
                </ContactLink>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
