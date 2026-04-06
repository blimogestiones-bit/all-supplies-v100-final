"use client"

import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedSection } from "@/components/animated-section"
import { TouchOptimizedCard } from "@/components/touch-optimized-card"
import { ProductCarousel } from "@/components/product-carousel"
import { ContactForm } from "@/components/contact-form"
import { AlliesCarousel } from "@/components/allies-carousel"
import { SuppliersCarousel } from "@/components/suppliers-carousel"
import { MetricsSection } from "@/components/metrics-section"
import { SmoothScrollNav } from "@/components/smooth-scroll-nav"
import { Button } from "@/components/ui/button"
import { ScrollToTopLink } from "@/components/scroll-to-top-link"
import { useLanguage } from "@/lib/language-context"

// Simple SVG icons to replace lucide-react
const ZapIcon = () => (
  <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M7 2v11h3v9l7-12h-4l4-8z" />
  </svg>
)

const ShoppingCartIcon = () => (
  <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
  </svg>
)

const SettingsIcon = () => (
  <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
  </svg>
)


const MailIcon = () => (
  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
)

const MapPinIcon = () => (
  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
)

const PhoneIcon = () => (
  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
  </svg>
)

// Nuevo icono con engranaje en la parte superior del carrito
const ProcurementIcon = () => (
  <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
    <g>
      {/* Carrito de compras en la parte inferior */}
      <g transform="translate(0, 8)">
        <path d="M7 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1-6v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 5h7.45c.75 0 1.41-.41 1.75-1.03L21.7-4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
      </g>

      {/* Engranaje en la parte superior */}
      <g transform="translate(12, 2) scale(0.7)">
        <circle cx="0" cy="0" r="8" fill="currentColor" />
        <path
          d="M3.5,-6 L3.5,-8 L-3.5,-8 L-3.5,-6 L-1.5,-6 L-1.5,-4 L-3.5,-4 L-3.5,4 L-1.5,4 L-1.5,6 L-3.5,6 L-3.5,8 L3.5,8 L3.5,6 L1.5,6 L1.5,4 L3.5,4 L3.5,-4 L1.5,-4 L1.5,-6 Z M0,-3 C1.66,-3 3,-1.66 3,0 C3,1.66 1.66,3 0,3 C-1.66,3 -3,1.66 -3,0 C-3,-1.66 -1.66,-3 0,-3 Z"
          fill="white"
        />
        <circle cx="0" cy="0" r="2" fill="currentColor" />
      </g>
    </g>
  </svg>
)

export default function AllSuppliesWebsite() {
  const { t, language } = useLanguage()

  // Datos de productos para el carrusel
  const productsCarouselData = [
    {
      id: "valvulas",
      name: "Válvulas",
      description: "Sistemas de control industrial de alta presión y especificación. Disponibles globalmente.",
      image: "/products/valvulas.jpg",
      href: "/productos",
    },
    {
      id: "taladros",
      name: "Taladros de Perforación",
      description: "Equipos de perforación profesionales desde 750HP hasta 3000HP. Suministro desde USA.",
      image: "/products/taladros.jpg",
      href: "/productos",
    },
    {
      id: "tornilleria",
      name: "Tornillería Industrial",
      description: "Componentes de fijación certificados ASTM. Múltiples grados de aleación disponibles.",
      image: "/products/tornilleria-esparrago.jpg",
      images: ["/products/tornilleria-esparrago.jpg", "/products/tornilleria-pernos.jpg"],
      href: "/productos",
    },
    {
      id: "herramientas",
      name: "Herramientas Profesionales",
      description: "Equipos de marcas premium: DeWalt, Nikato, Stanley. Venta y renta disponible.",
      image: "/products/herramientas.jpg",
      href: "/productos",
    },
    {
      id: "revestidores",
      name: "Revestidores y Tuberías",
      description: "Tubería de acero de alta resistencia. Diámetros de 4 1/2\" a 13 3/8\" disponibles.",
      image: "/products/revestidores.jpg",
      href: "/productos",
    },
    {
      id: "wellcomm",
      name: "Sensor WellComm",
      description: "Sistema de monitoreo inteligente en tiempo real. Transmisión inalámbrica y alertas.",
      image: "/products/sensor-wellcomm.jpg",
      href: "/productos",
    },
    {
      id: "hmi",
      name: "HMI DataLogger",
      description: "Interface profesional con registro automático de datos y acceso remoto seguro.",
      image: "/products/hmi-datalogger.jpg",
      href: "/productos",
    },
    {
      id: "variador",
      name: "Variadores de Frecuencia",
      description: "Control de velocidad de alto rendimiento. Eficiencia energética optimizada.",
      image: "/products/variador.jpg",
      href: "/productos",
    },
  ]

  const servicesData = [
    {
      title: "Energía, tecnología y seguridad",
      description: "Suministro y soporte técnico especializado para el sector industrial",
      icon: <ZapIcon />,
      color: "bg-brand-green-dark",
      borderColor: "border-t-brand-green-dark",
      href: "/servicios/energia-tecnologia",
      buttonColor: "bg-brand-green-dark hover:bg-brand-green",
    },
    {
      title: "Servicios de Procura Internacional",
      description: "Gestión integral de procesos de procura técnica para proyectos industriales",
      icon: <ProcurementIcon />,
      color: "bg-brand-blue-dark",
      borderColor: "border-t-brand-blue-dark",
      href: "/servicios/procura-internacional",
      buttonColor: "bg-brand-blue-dark hover:bg-brand-blue",
    },
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.offsetTop
      const offsetPosition = elementPosition - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header con navegación suave */}
      <SmoothScrollNav />

      {/* Hero Section con imagen de fondo */}
      <section id="inicio" className="relative py-20 overflow-hidden min-h-[90vh] flex items-center">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue-dark via-blue-900 to-slate-900" />

        {/* Animated floating circles - Background decorative elements */}
        <div className="absolute top-20 left-20 w-40 h-40 bg-brand-green/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-56 h-56 bg-brand-blue-light/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-brand-green/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>

        {/* Imagen de fondo con overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: "url('/hero-background.jpg')",
          }}
        />

        {/* Main content */}
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-5xl mx-auto space-y-6">
            <AnimatedSection animation="fade-up" delay={100}>
              <h2 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-2xl leading-tight">
                {t.hero.title}
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-brand-green to-brand-blue mx-auto"></div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={200}>
              <p className="text-xl md:text-2xl text-white mb-10 leading-relaxed drop-shadow-lg font-light max-w-4xl mx-auto">
                {t.hero.subtitle} <span className="font-semibold">{t.hero.division1}</span> {language === "es" ? "y" : "and"} <span className="font-semibold">{t.hero.division2}</span>.
              </p>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={300}>
              <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                <button
                  onClick={() => scrollToSection("productos")}
                  className="px-8 py-4 bg-gradient-to-r from-brand-green to-brand-green-dark text-white font-bold rounded-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg"
                >
                  {t.hero.cta}
                </button>
                <button
                  onClick={() => scrollToSection("contacto")}
                  className="px-8 py-4 bg-white/20 backdrop-blur-md text-white font-bold rounded-lg border-2 border-white hover:bg-white/30 transform hover:scale-105 transition-all duration-300 text-lg"
                >
                  {t.hero.ctaContact}
                </button>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Products Carousel Section */}
      <section id="productos" className="py-20 bg-gradient-to-br from-slate-50 to-white overflow-hidden">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fade-up" delay={50}>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">{t.products.title}</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-brand-green to-brand-blue mx-auto"></div>
              <p className="text-lg text-text-secondary mt-4 max-w-2xl mx-auto">
                {t.products.subtitle}
              </p>
            </div>
          </AnimatedSection>

          <ProductCarousel
            products={productsCarouselData}
            itemsPerView={{
              mobile: 1,
              tablet: 2,
              desktop: 4,
            }}
          />
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-20 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fade-up" delay={50}>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">{t.services.title}</h2>
              <div className="w-24 h-1 bg-brand-green-dark mx-auto"></div>
              <p className="text-lg text-text-secondary mt-4 max-w-2xl mx-auto">
                {t.services.subtitle}
              </p>
            </div>
          </AnimatedSection>

          <div className="flex flex-col lg:flex-row gap-8 justify-center items-stretch">
            {servicesData.map((service, index) => (
              <AnimatedSection
                key={index}
                animation={index === 0 ? "slide-left" : "slide-right"}
                delay={100 + index * 100}
                disableOnMobile={false}
                triggerOnce={false}
                className="w-full lg:w-80 xl:w-96 shrink-0"
              >
                <div className="group h-full">
                  <TouchOptimizedCard borderColor={service.borderColor} className="h-full">
                    <CardHeader className="text-center pb-4">
                      <div
                        className={`mx-auto mb-4 p-4 ${service.color} rounded-full w-fit shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        {service.icon}
                      </div>
                      <CardTitle className="text-xl font-bold text-text-primary">{service.title}</CardTitle>
                      <CardDescription className="text-text-secondary">{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <ScrollToTopLink href={service.href}>
                        <Button
                          className={`w-full ${service.buttonColor} text-white hover:shadow-lg transform hover:scale-105 transition-all duration-300 border-0 font-semibold`}
                        >
                          {t.services.viewDetails}
                        </Button>
                      </ScrollToTopLink>
                    </CardContent>
                  </TouchOptimizedCard>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section id="nosotros">
        <MetricsSection />
      </section>

      {/* Strategic Allies Section */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fade-up" delay={50}>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">{t.allies.title}</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-brand-green to-brand-blue mx-auto"></div>
              <p className="text-lg text-text-secondary mt-4 max-w-2xl mx-auto">
                {t.allies.subtitle}
              </p>
            </div>
          </AnimatedSection>

          <AlliesCarousel />
        </div>
      </section>

      {/* Suppliers Section */}
      <section className="py-20 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fade-up" delay={50}>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">{t.suppliers.title}</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-brand-blue to-brand-blue-dark mx-auto"></div>
              <p className="text-lg text-text-secondary mt-4 max-w-2xl mx-auto">
                {t.suppliers.subtitle}
              </p>
            </div>
          </AnimatedSection>

          <SuppliersCarousel />
        </div>
      </section>

      {/* Contact Section con Formulario */}
      <section id="contacto" className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fade-up" delay={50}>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">{t.contact.title}</h2>
              <div className="w-24 h-1 bg-brand-green-dark mx-auto"></div>
              <p className="text-lg text-text-secondary mt-4 max-w-2xl mx-auto">
                {t.contact.subtitle}
              </p>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Formulario de Contacto */}
            <AnimatedSection animation="slide-left" delay={200} triggerOnce={false}>
              <ContactForm />
            </AnimatedSection>

            {/* Información de Contacto y Oficinas */}
            <div className="space-y-8">
              <AnimatedSection animation="slide-right" delay={300} triggerOnce={false}>
                <TouchOptimizedCard>
                  <CardHeader className="bg-brand-blue-dark text-white rounded-t-lg">
                    <CardTitle className="flex items-center space-x-2">
                      <MailIcon />
                      <span>{t.contact.infoTitle}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 bg-brand-blue-50">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-text-primary mb-2">{t.contact.emails}:</h4>
                        <div className="space-y-1">
                          <p className="text-text-secondary">info@allsuppliesinv.com</p>
                          <p className="text-text-secondary">allsuppliesinv@gmail.com</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </TouchOptimizedCard>
              </AnimatedSection>

              <AnimatedSection animation="slide-right" delay={400} triggerOnce={false}>
                <TouchOptimizedCard>
                  <CardHeader className="bg-brand-green-dark text-white rounded-t-lg">
                    <CardTitle className="flex items-center space-x-2">
                      <MapPinIcon />
                      <span>Nuestra Oficina</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 bg-brand-green-50">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-brand-blue-dark mb-3 flex items-center space-x-2">
                          <span className="text-2xl">🇵🇦</span>
                          <span>Panamá</span>
                        </h4>
                        <p className="text-text-secondary text-sm leading-relaxed">
                          Ave. Aquilino de la Guardia y Calle 47
                          <br />
                          PH Ocean Business Plaza - Torre Banesco
                          <br />
                          Piso 19, Ciudad de Panamá - Panamá
                        </p>
                        <a
                          href="https://maps.google.com/?q=Ave.+Aquilino+de+la+Guardia+y+Calle+47,+Ocean+Business+Plaza,+Panama+City"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-3 text-brand-green-dark hover:text-brand-green font-semibold text-sm flex items-center space-x-1 hover:underline"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                          </svg>
                          <span>Ver en Google Maps</span>
                        </a>
                      </div>
                      <div className="pt-4 border-t border-gray-200">
                        <h4 className="font-semibold text-text-primary mb-2 flex items-center space-x-2">
                          <PhoneIcon />
                          <span>Teléfonos</span>
                        </h4>
                        <div className="space-y-1">
                          <p className="text-text-secondary text-sm">+(507) 6227-0820</p>
                          <p className="text-text-secondary text-sm">+1 (813) 922-5422</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </TouchOptimizedCard>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-brand-blue-dark py-12 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center space-y-6">
            {/* Logo más grande en el footer */}
            <div className="flex justify-center">
              <img
                src="/logo-all-supplies-complete.png"
                alt="All Supplies & Investment Inc"
                className="h-20 w-auto object-contain md:h-24"
              />
            </div>

            {/* Información de la empresa */}
            <div className="text-center max-w-2xl">
              <p className="text-lg font-medium text-brand-blue-dark mb-2">
                {t.hero.title}
              </p>
              <p className="text-text-secondary">
                {t.footer.description}
              </p>
            </div>

            {/* Enlaces rápidos */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <button
                onClick={() => scrollToSection("servicios")}
                className="text-text-secondary hover:text-brand-green-dark transition-colors"
              >
                {t.nav.servicios}
              </button>
              <button
                onClick={() => scrollToSection("nosotros")}
                className="text-text-secondary hover:text-brand-green-dark transition-colors"
              >
                {t.nav.nosotros}
              </button>
              <button
                onClick={() => scrollToSection("contacto")}
                className="text-text-secondary hover:text-brand-green-dark transition-colors"
              >
                {t.nav.contacto}
              </button>
            </div>

            {/* Información de contacto */}
            <div className="text-center text-sm text-text-secondary">
              <p>info@allsuppliesinv.com | allsuppliesinv@gmail.com</p>
              <p className="mt-1">+(507) 6227-0820 | +1 (813) 922-5422</p>
              <p className="mt-1 flex items-center justify-center space-x-2">
                <span className="text-lg">🇵🇦</span>
                <span>PH Ocean Business Plaza - Torre Banesco, Piso 19, Ciudad de Panamá - Panamá</span>
              </p>
            </div>

            {/* Copyright */}
            <div className="border-t border-gray-200 pt-6 w-full text-center">
              <p className="text-sm text-text-muted">
                © 2025 All Supplies & Investment Inc. {t.footer.rights}
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Datos estructurados para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "All Supplies & Investment Inc",
            description:
              "Empresa multinacional especializada en soluciones estratégicas para Energía, tecnología y seguridad y Servicios de Procura",
            url: "https://allsuppliesinv.com",
            logo: "https://allsuppliesinv.com/logo-all-supplies-complete.png",
            contactPoint: [
              {
                "@type": "ContactPoint",
                telephone: "+507-6227-0820",
                contactType: "customer service",
                areaServed: ["PA", "US"],
                availableLanguage: "Spanish",
              },
            ],
            address: [
              {
                "@type": "PostalAddress",
                streetAddress:
                  "Ave. Aquilino de la Guardia y Calle 47, PH Ocean Business Plaza - Torre Banesco, Piso 19",
                addressLocality: "Ciudad de Panamá",
                addressCountry: "PA",
              },
            ],
            sameAs: ["https://linkedin.com/company/all-supplies", "https://twitter.com/allsupplies"],
            foundingDate: "2009",
            numberOfEmployees: "10-50",
            industry: "Technology and Energy Services",
          }),
        }}
      />
    </div>
  )
}
