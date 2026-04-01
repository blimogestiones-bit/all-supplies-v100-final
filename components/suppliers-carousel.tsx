"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const suppliers = [
  { name: "TCS", category: "Tecnologia y Servicios", logo: "/suppliers/tcs.png", larger: true },
  { name: "Tamma Group", category: "Grupo Empresarial", logo: "/suppliers/tamma-group.png" },
  { name: "TeleMedicina24", category: "Servicios de Salud", logo: "/suppliers/telemedicina24.png", larger: true },
  { name: "Globex Re", category: "Aseguradora", logo: "/allies/globex-re.png" },
  { name: "Inversiones Sumizara", category: "Tecnologia", logo: "/allies/inversiones-sumizara.jpg" },
  { name: "TradeXAuto", category: "Comercio Internacional", logo: "/allies/tradexauto.png" },
]

const CARD_WIDTH = 260
const GAP = 32
const TOTAL_WIDTH = suppliers.length * (CARD_WIDTH + GAP)

export function SuppliersCarousel() {
  const offsetRef = useRef(0)
  const [, forceRender] = useState(0)
  const animationRef = useRef<number>()
  const containerRef = useRef<HTMLDivElement>(null)

  const extendedSuppliers = [...suppliers, ...suppliers, ...suppliers, ...suppliers]

  useEffect(() => {
    const animate = () => {
      offsetRef.current += 0.5
      if (offsetRef.current >= TOTAL_WIDTH) {
        offsetRef.current -= TOTAL_WIDTH
      }
      forceRender((n) => n + 1)
      animationRef.current = requestAnimationFrame(animate)
    }
    animationRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [])

  const handlePrev = () => {
    offsetRef.current -= (CARD_WIDTH + GAP) * 2
    if (offsetRef.current < 0) offsetRef.current += TOTAL_WIDTH
  }

  const handleNext = () => {
    offsetRef.current += (CARD_WIDTH + GAP) * 2
    if (offsetRef.current >= TOTAL_WIDTH) offsetRef.current -= TOTAL_WIDTH
  }

  return (
    <div className="relative py-10" style={{ perspective: "1200px" }}>
      {/* Left Arrow */}
      <button
        onClick={handlePrev}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 md:p-3 transition-all duration-200 hover:scale-110"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-brand-blue-dark" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={handleNext}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 md:p-3 transition-all duration-200 hover:scale-110"
        aria-label="Siguiente"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-brand-blue-dark" />
      </button>

      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

      <div className="overflow-hidden">
        <div
          ref={containerRef}
          className="flex items-stretch"
          style={{
            transform: `translateX(-${offsetRef.current}px)`,
            gap: `${GAP}px`,
            willChange: "transform",
          }}
        >
          {extendedSuppliers.map((supplier, idx) => {
            const cardCenter = idx * (CARD_WIDTH + GAP) + CARD_WIDTH / 2
            const viewCenter = offsetRef.current + (typeof window !== "undefined" ? window.innerWidth / 2 : 600)
            const distance = Math.abs(viewCenter - cardCenter)
            const maxDistance = 600
            const scale = Math.max(0.88, 1 - (distance / maxDistance) * 0.12)
            const zTranslate = Math.max(0, 40 - (distance / maxDistance) * 40)

            return (
              <div
                key={`${supplier.name}-${idx}`}
                className="shrink-0"
                style={{
                  width: CARD_WIDTH,
                  transform: `scale(${scale}) translateZ(${zTranslate}px)`,
                  transition: "transform 0.1s ease",
                }}
              >
                <div className="bg-white border-2 border-slate-200 rounded-xl p-6 text-center hover:border-brand-blue hover:shadow-xl transition-all duration-300 flex flex-col" style={{ height: "220px" }}>
                  <div className={`${supplier.larger ? "h-32" : "h-28"} flex items-center justify-center mb-3 shrink-0`}>
                    <img
                      src={supplier.logo}
                      alt={supplier.name}
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = "none"
                        if (e.currentTarget.parentElement) {
                          e.currentTarget.parentElement.innerHTML = `<span class="text-2xl font-bold text-brand-blue-dark">${supplier.name}</span>`
                        }
                      }}
                    />
                  </div>
                  <div className="mt-auto">
                    <h3 className="font-bold text-base text-brand-blue-dark leading-tight mb-0.5">{supplier.name}</h3>
                    <p className="text-text-secondary text-sm">{supplier.category}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
