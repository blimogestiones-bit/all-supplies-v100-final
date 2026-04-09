"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { AnimatedSection } from "@/components/animated-section"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

const productsDataES = [
  {
    id: "valvulas",
    name: "Válvulas",
    image: "/products/valvulas.jpg",
    description: "Sistemas de válvulas de control industrial de alta especificación para operaciones críticas. Disponibles en todo el mundo con suministro directo desde USA.",
    features: [
      "Control de presión hasta 3000 PSI",
      "Compatible con tuberías 1/2\" a 4\"",
      "Cuerpo en acero carbón certificado",
      "Disponible en stock permanente",
      "Distribución global desde USA",
      "Certificación API 6A y ISO 14313"
    ],
    video: null,
  },
  {
    id: "taladros",
    name: "Taladros de Perforación",
    image: "/products/taladros.jpg",
    description: "Equipos de perforación profesionales con capacidades desde 750HP hasta 3000HP. Suministrados directamente desde USA con especificaciones técnicas completas.",
    features: [
      "Capacidad: 750HP a 3000HP",
      "Tecnología de última generación",
      "Suministro desde USA",
      "Soporte técnico especializado"
    ],
    video: null,
  },
  {
    id: "tornilleria",
    name: "Tornillería Industrial",
    image: "/products/tornilleria-esparrago.jpg",
    images: ["/products/tornilleria-esparrago.jpg", "/products/tornilleria-pernos.jpg"],
    description: "Componentes de fijación certificados ASTM para la industria. Tornillería de precisión con múltiples grados de aleación.",
    features: [
      "Certificación ASTM A193, A320, A353",
      "Barras Roscadas",
      "Espárragos para altas temperaturas",
      "Múltiples grados de aleación disponibles",
      "Fabricación especial personalizada",
      "Stock permanente de ítems estándar"
    ],
    video: null,
  },
  {
    id: "herramientas",
    name: "Herramientas Profesionales",
    image: "/products/herramientas.jpg",
    description: "Herramientas de precisión de marcas reconocidas internacionalmente. Equipos eléctricos y manuales diseñados para ambientes exigentes.",
    features: [
      "Marcas: DeWalt, Nikato, Stanley",
      "Herramientas eléctricas profesionales",
      "Equipos manuales de precisión",
      "Diseño ergonómico y robusto",
      "Garantía del fabricante incluida",
      "Disponible para venta y renta"
    ],
    video: null,
  },
  {
    id: "revestidores",
    name: "Revestidores y Tuberías",
    image: "/products/revestidores.jpg",
    description: "Tuberías de revestimiento de acero de alta resistencia para construcción y operación de pozos profundos. Disponibles en múltiples dimensiones.",
    features: [
      "Diámetro externo: 4 1/2\" a 13 3/8\"",
      "Espesor de pared: 0.205\" a 0.514\"",
      "Tubería de producción disponible",
      "Cabillas en múltiples tamaños",
      "Certificación de resistencia verificada",
      "Disponible en acero carbón y aleaciones"
    ],
    video: null,
  },
  {
    id: "wellcomm",
    name: "Sensor WellComm",
    image: "/products/sensor-wellcomm.jpg",
    description: "Sistema avanzado de monitoreo inteligente en tiempo real para pozos. Transmisión de datos inalámbrica remota.",
    features: [
      "Monitoreo en tiempo real 24/7",
      "Transmisión inalámbrica confiable",
      "Sensores de presión y temperatura",
      "Almacenamiento de datos históricos",
      "Panel de control remoto",
      "Alertas y notificaciones automáticas"
    ],
    video: null,
  },
  {
    id: "hmi",
    name: "HMI DataLogger",
    image: "/products/hmi-datalogger.jpg",
    description: "Interface HMI profesional con registro automático de datos para sistemas industriales. Visualización en tiempo real.",
    features: [
      "Interface gráfica intuitiva",
      "Registro automático de datos",
      "Almacenamiento en tiempo real",
      "Acceso remoto seguro",
      "Control de equipos integrado",
      "Reportes automáticos y análisis"
    ],
    video: null,
  },
  {
    id: "variador",
    name: "Variadores de Frecuencia",
    image: "/products/variador.jpg",
    description: "Convertidores de frecuencia de alto rendimiento para control de velocidad en sistemas de bombeo y producción.",
    features: [
      "Control de velocidad variable",
      "Eficiencia energética optimizada",
      "Protección de equipos integrada",
      "Reducción de costos operacionales",
      "Diseño industrial robusto",
      "Compatible con múltiples motores"
    ],
    video: "/videos/variador.mp4",
  }
]

const productsDataEN = [
  {
    id: "valvulas",
    name: "Valves",
    image: "/products/valvulas.jpg",
    description: "High specification industrial control valve systems for critical operations. Available worldwide with direct supply from USA.",
    features: [
      "Pressure control up to 3000 PSI",
      "Compatible with 1/2\" to 4\" pipes",
      "Certified carbon steel body",
      "Available in permanent stock",
      "Global distribution from USA",
      "API 6A and ISO 14313 certification"
    ],
    video: null,
  },
  {
    id: "taladros",
    name: "Drilling Rigs",
    image: "/products/taladros.jpg",
    description: "Professional drilling equipment with capacities from 750HP to 3000HP. Supplied directly from USA with complete technical specifications.",
    features: [
      "Capacity: 750HP to 3000HP",
      "State-of-the-art technology",
      "Supply from USA",
      "Specialized technical support"
    ],
    video: null,
  },
  {
    id: "tornilleria",
    name: "Industrial Fasteners",
    image: "/products/tornilleria-esparrago.jpg",
    images: ["/products/tornilleria-esparrago.jpg", "/products/tornilleria-pernos.jpg"],
    description: "ASTM certified fastening components for industry. Precision hardware with multiple alloy grades.",
    features: [
      "ASTM A193, A320, A353 Certification",
      "Threaded Bars",
      "High temperature studs",
      "Multiple alloy grades available",
      "Custom special manufacturing",
      "Permanent stock of standard items"
    ],
    video: null,
  },
  {
    id: "herramientas",
    name: "Professional Tools",
    image: "/products/herramientas.jpg",
    description: "Precision tools from internationally recognized brands. Electric and manual equipment designed for demanding industrial environments.",
    features: [
      "Brands: DeWalt, Nikato, Stanley",
      "Professional electric tools",
      "Precision manual equipment",
      "Ergonomic and robust design",
      "Manufacturer warranty included",
      "Available for sale and rental"
    ],
    video: null,
  },
  {
    id: "revestidores",
    name: "Casing and Tubing",
    image: "/products/revestidores.jpg",
    description: "High strength steel casing pipes for deep well construction and operation. Available in multiple dimensions.",
    features: [
      "External diameter: 4 1/2\" to 13 3/8\"",
      "Wall thickness: 0.205\" to 0.514\"",
      "Production tubing available",
      "Rods in multiple sizes",
      "Verified resistance certification",
      "Available in carbon steel and alloys"
    ],
    video: null,
  },
  {
    id: "wellcomm",
    name: "WellComm Sensor",
    image: "/products/sensor-wellcomm.jpg",
    description: "Advanced intelligent real-time monitoring system for wells. Remote wireless data transmission.",
    features: [
      "24/7 real-time monitoring",
      "Reliable wireless transmission",
      "Pressure and temperature sensors",
      "Historical data storage",
      "Remote control panel",
      "Automatic alerts and notifications"
    ],
    video: null,
  },
  {
    id: "hmi",
    name: "HMI DataLogger",
    image: "/products/hmi-datalogger.jpg",
    description: "Professional HMI interface with automatic data logging for industrial systems. Real-time visualization.",
    features: [
      "Intuitive graphical interface",
      "Automatic data logging",
      "Real-time storage",
      "Secure remote access",
      "Integrated equipment control",
      "Automatic reports and analysis"
    ],
    video: null,
  },
  {
    id: "variador",
    name: "Variable Frequency Drives",
    image: "/products/variador.jpg",
    description: "High performance frequency converters for speed control in pumping and production systems.",
    features: [
      "Variable speed control",
      "Optimized energy efficiency",
      "Integrated equipment protection",
      "Operational cost reduction",
      "Robust industrial design",
      "Compatible with multiple motors"
    ],
    video: "/videos/variador.mp4",
  }
]

// ESTA FUNCIÓN CONTIENE TODO TU DISEÑO ORIGINAL
function ProductosContent() {
  const { t, language, setLanguage } = useLanguage()
  const searchParams = useSearchParams()
  const productsData = language === "es" ? productsDataES : productsDataEN
  const [selectedProduct, setSelectedProduct] = useState(productsData[0])
  
  // Update selected product when language changes
  useEffect(() => {
    const currentId = selectedProduct.id
    const newProduct = productsData.find(p => p.id === currentId)
    if (newProduct) {
      setSelectedProduct(newProduct)
    }
  }, [language, productsData, selectedProduct.id])

  useEffect(() => {
    const productoParam = searchParams.get("producto")
    if (productoParam) {
      const found = productsData.find((p) => p.id === productoParam)
      if (found) {
        setSelectedProduct(found)
      }
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white text-brand-blue-dark py-4 sticky top-0 z-50 shadow-lg border-b border-gray-200">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <img
                src="/logo-all-supplies-complete.png"
                alt="All Supplies & Investment Inc"
                className="h-16 w-auto object-contain md:h-20"
              />
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/#inicio" className="hover:text-brand-green-dark transition-colors font-medium px-3 py-2 rounded hover:bg-brand-green-50">
              {t.nav.inicio}
            </Link>
            <Link href="/#servicios" className="hover:text-brand-green-dark transition-colors font-medium px-3 py-2 rounded hover:bg-brand-green-50">
              {t.nav.servicios}
            </Link>
            <Link href="/#nosotros" className="hover:text-brand-green-dark transition-colors font-medium px-3 py-2 rounded hover:bg-brand-green-50">
              {t.nav.nosotros}
            </Link>
            <Link href="/#contacto" className="hover:text-brand-green-dark transition-colors font-medium px-3 py-2 rounded hover:bg-brand-green-50">
              {t.nav.contacto}
            </Link>
            <span className="font-bold text-brand-green border-b-2 border-brand-green px-3 py-2">
              {language === "es" ? "Productos" : "Products"}
            </span>
            
            {/* Language Toggle */}
            <div className="flex items-center border border-slate-300 rounded-full overflow-hidden">
              <button
                onClick={() => setLanguage("es")}
                className={`px-3 py-1 text-sm font-medium transition-colors ${
                  language === "es" ? "bg-brand-blue-dark text-white" : "bg-white text-slate-600 hover:bg-slate-100"
                }`}
              >
                ES
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`px-3 py-1 text-sm font-medium transition-colors ${
                  language === "en" ? "bg-brand-blue-dark text-white" : "bg-white text-slate-600 hover:bg-slate-100"
                }`}
              >
                EN
              </button>
            </div>
          </nav>

          <div className="md:hidden">
            <Link href="/" className="text-brand-blue-dark hover:text-brand-green-dark font-medium text-sm px-3 py-2 border border-brand-blue-dark rounded">
              {language === "es" ? "Volver al Inicio" : "Back to Home"}
            </Link>
          </div>
        </div>
      </header>

      <section className="relative py-12 overflow-hidden flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue-dark via-blue-900 to-slate-900" />
        <div className="absolute top-10 left-20 w-32 h-32 bg-brand-green/15 rounded-full blur-3xl animate-pulse"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <AnimatedSection animation="fade-up" delay={100}>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-2xl">
              {t.catalog.title}
            </h1>
            <p className="text-lg text-white/90 drop-shadow-lg">
              {t.catalog.subtitle}
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-1/4">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-28">
                <div className="bg-brand-blue-dark text-white p-4">
                  <h2 className="font-bold text-lg tracking-wide">{language === "es" ? "Productos" : "Products"}</h2>
                </div>
                <nav className="divide-y divide-slate-100">
                  {productsData.map((product) => (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => setSelectedProduct(product)}
                      className={`w-full text-left px-5 py-4 transition-all duration-200 font-medium text-sm ${selectedProduct.id === product.id
                        ? "bg-brand-green text-white"
                        : "bg-white text-text-primary hover:bg-slate-50 hover:text-brand-green"
                        }`}
                    >
                      {product.name}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            <div className="lg:w-3/4">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-2/5 p-6">
                    {selectedProduct.images && selectedProduct.images.length > 1 ? (
                      <div className="flex flex-col gap-3">
                        {selectedProduct.images.map((src, i) => (
                          <div key={i} className="relative w-full bg-slate-100 rounded-lg overflow-hidden" style={{ aspectRatio: "4/3" }}>
                            <img
                              src={src}
                              alt={`${selectedProduct.name} ${i + 1}`}
                              className="w-full h-full object-cover"
                              onError={(e) => { e.currentTarget.style.display = "none" }}
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="relative aspect-square bg-slate-100 rounded-lg overflow-hidden">
                        <img
                          key={selectedProduct.id}
                          src={selectedProduct.image}
                          alt={selectedProduct.name}
                          className="w-full h-full object-contain p-4"
                          onError={(e) => { e.currentTarget.style.display = "none" }}
                        />
                      </div>
                    )}
                  </div>

                  <div className="md:w-3/5 p-6 flex flex-col justify-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-brand-blue-dark mb-4">
                      {selectedProduct.name}
                    </h2>
                    <div>
                      <h3 className="text-xs font-bold text-brand-green uppercase tracking-widest mb-2">
                        {t.catalog.description}
                      </h3>
                      <p className="text-text-secondary leading-relaxed text-sm">
                        {selectedProduct.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100">
                  <div className="mb-6">
                    <h3 className="text-xs font-bold text-brand-green uppercase tracking-widest mb-4 pt-6">
                      {t.catalog.features}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-2">
                      {selectedProduct.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg"
                        >
                          <div className="w-1.5 h-1.5 bg-brand-green rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-text-secondary text-sm leading-relaxed">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedProduct.video && (
                    <div className="mb-6">
                      <h3 className="text-xs font-bold text-brand-green uppercase tracking-widest mb-4">
                        {language === "es" ? "Video Demostrativo" : "Demo Video"}
                      </h3>
                      <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg max-w-2xl">
                        <video
                          controls
                          className="w-full aspect-video"
                          poster={selectedProduct.image}
                        >
                          <source src={selectedProduct.video} type="video/mp4" />
                          {t.catalog.videoNotSupported}
                        </video>
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t border-slate-200">
                    <Link href="/#contacto">
                      <Button className="px-6 py-3 bg-brand-green text-white hover:bg-brand-green-dark hover:shadow-lg transform hover:scale-105 transition-all duration-300 border-0 font-semibold">
                        {t.catalog.requestQuote}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// ESTO ES LO QUE ARREGLA EL ERROR DE VERCEL
export default function ProductosPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando catálogo...</div>}>
      <ProductosContent />
    </Suspense>
  )
}
