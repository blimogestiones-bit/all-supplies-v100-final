"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { AnimatedSection } from "@/components/animated-section"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const productsData = [
  {
    id: "valvulas",
    name: "Valvulas",
    image: "/products/valvulas.jpg",
    description: "Sistemas de valvulas de control industrial de alta especificacion para operaciones criticas. Disponibles en todo el mundo con suministro directo desde USA. Rango completo de capacidades para diferentes aplicaciones industriales.",
    features: [
      "Control de presion hasta 3000 PSI",
      "Compatible con tuberias 1/2\" a 4\"",
      "Cuerpo en acero carbon certificado",
      "Disponible en stock permanente",
      "Distribucion global desde USA",
      "Certificacion API 6A y ISO 14313"
    ],
    video: null,
  },
  {
    id: "taladros",
    name: "Taladros de Perforacion",
    image: "/products/taladros.jpg",
    description: "Equipos de perforacion profesionales con capacidades desde 750HP hasta 3000HP. Suministrados directamente desde USA con especificaciones tecnicas completas. Disenados para operaciones de pozos profundos y aplicaciones demandantes en la industria.",
    features: [
      "Capacidad: 750HP a 3000HP",
      "Tecnologia de ultima generacion",
      "Suministro desde USA",
      "Soporte tecnico especializado"
    ],
    video: null,
  },
  {
    id: "tornilleria",
    name: "Tornilleria Industrial",
    image: "/products/tornilleria-esparrago.jpg",
    images: ["/products/tornilleria-esparrago.jpg", "/products/tornilleria-pernos.jpg"],
    description: "Componentes de fijacion certificados ASTM para la industria. Tornilleria de precision con multiples grados de aleacion. Especialmente disenada para ambientes corrosivos y altas temperaturas en aplicaciones industriales criticas.",
    features: [
      "Certificacion ASTM A193, A320, A353",
      "Barras Roscadas",
      "Esparragos para altas temperaturas",
      "Multiples grados de aleacion disponibles",
      "Fabricacion especial personalizada",
      "Stock permanente de items estandar",
      "Calibracion verificada y certificada"
    ],
    video: null,
  },
  {
    id: "herramientas",
    name: "Herramientas Profesionales",
    image: "/products/herramientas.jpg",
    description: "Herramientas de precision de marcas reconocidas internacionalmente. Equipos electricos y manuales disenados para ambientes exigentes de la industria. Durabilidad y rendimiento garantizados bajo las condiciones mas dificiles.",
    features: [
      "Marcas: DeWalt, Nikato, Stanley",
      "Herramientas electricas profesionales",
      "Equipos manuales de precision",
      "Diseno ergonomico y robusto",
      "Garantia del fabricante incluida",
      "Disponible para venta y renta"
    ],
    video: null,
  },
  {
    id: "revestidores",
    name: "Revestidores y Tuberias",
    image: "/products/revestidores.jpg",
    description: "Tuberias de revestimiento de acero de alta resistencia para construccion y operacion de pozos profundos. Disponibles en multiples dimensiones. Especificaciones tecnicas completas para cualquier aplicacion industrial.",
    features: [
      "Diametro externo: 4 1/2\" a 13 3/8\"",
      "Espesor de pared: 0.205\" a 0.514\"",
      "Tuberia de produccion disponible",
      "Cabillas en multiples tamanos",
      "Certificacion de resistencia verificada",
      "Disponible en acero carbon y aleaciones"
    ],
    video: null,
  },
  {
    id: "wellcomm",
    name: "Sensor WellComm",
    image: "/products/sensor-wellcomm.jpg",
    description: "Sistema avanzado de monitoreo inteligente en tiempo real para pozos. Transmision de datos inalambrica remota. Analisis avanzado de parametros operacionales criticos para la industria.",
    features: [
      "Monitoreo en tiempo real 24/7",
      "Transmision inalambrica confiable",
      "Sensores de presion y temperatura",
      "Almacenamiento de datos historicos",
      "Panel de control remoto",
      "Alertas y notificaciones automaticas"
    ],
    video: null,
  },
  {
    id: "hmi",
    name: "HMI DataLogger",
    image: "/products/hmi-datalogger.jpg",
    description: "Interface HMI profesional con registro automatico de datos para sistemas industriales. Visualizacion en tiempo real de parametros operacionales. Almacenamiento seguro de datos historicos con acceso remoto.",
    features: [
      "Interface grafica intuitiva",
      "Registro automatico de datos",
      "Almacenamiento en tiempo real",
      "Acceso remoto seguro",
      "Control de equipos integrado",
      "Reportes automaticos y analisis"
    ],
    video: null,
  },
  {
    id: "variador",
    name: "Variadores de Frecuencia",
    image: "/products/variador.jpg",
    description: "Convertidores de frecuencia de alto rendimiento para control de velocidad en sistemas de bombeo y produccion. Optimizacion de eficiencia energetica. Especializados para aplicaciones criticas en la industria.",
    features: [
      "Control de velocidad variable",
      "Eficiencia energetica optimizada",
      "Proteccion de equipos integrada",
      "Reduccion de costos operacionales",
      "Diseno industrial robusto",
      "Compatible con multiples motores"
    ],
    video: "/videos/variador.mp4",
  }
]

// ESTA FUNCIÓN CONTIENE TODO TU DISEÑO ORIGINAL
function ProductosContent() {
  const searchParams = useSearchParams()
  const [selectedProduct, setSelectedProduct] = useState(productsData[0])

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
              Inicio
            </Link>
            <Link href="/#servicios" className="hover:text-brand-green-dark transition-colors font-medium px-3 py-2 rounded hover:bg-brand-green-50">
              Servicios
            </Link>
            <Link href="/#nosotros" className="hover:text-brand-green-dark transition-colors font-medium px-3 py-2 rounded hover:bg-brand-green-50">
              Nosotros
            </Link>
            <Link href="/#contacto" className="hover:text-brand-green-dark transition-colors font-medium px-3 py-2 rounded hover:bg-brand-green-50">
              Contacto
            </Link>
            <span className="font-bold text-brand-green border-b-2 border-brand-green px-3 py-2">
              Productos
            </span>
          </nav>

          <div className="md:hidden">
            <Link href="/" className="text-brand-blue-dark hover:text-brand-green-dark font-medium text-sm px-3 py-2 border border-brand-blue-dark rounded">
              Volver al Inicio
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
              Catalogo de Productos
            </h1>
            <p className="text-lg text-white/90 drop-shadow-lg">
              Soluciones especializadas para la industria
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
                  <h2 className="font-bold text-lg tracking-wide">Productos</h2>
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
                        Descripcion
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
                      Caracteristicas Tecnicas
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
                        Video Demostrativo
                      </h3>
                      <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg max-w-2xl">
                        <video
                          controls
                          className="w-full aspect-video"
                          poster={selectedProduct.image}
                        >
                          <source src={selectedProduct.video} type="video/mp4" />
                          Tu navegador no soporta la reproduccion de videos.
                        </video>
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t border-slate-200">
                    <Link href="/#contacto">
                      <Button className="px-6 py-3 bg-brand-green text-white hover:bg-brand-green-dark hover:shadow-lg transform hover:scale-105 transition-all duration-300 border-0 font-semibold">
                        Solicitar Cotizacion
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
