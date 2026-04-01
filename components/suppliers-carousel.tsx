"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const suppliers = [
  { name: "TCS", category: "Tecnologia y Servicios", logo: "/suppliers/tcs.png", larger: true },
  { name: "Tamma Group", category: "Grupo Empresarial", logo: "/suppliers/tamma-group.png" },
]

export function SuppliersCarousel() {
  const [offset, setOffset] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()
  const CARD_WIDTH = 260
  const GAP = 32

  // Duplicate items for infinite loop effect
  const extendedSuppliers = [...suppliers, ...suppliers, ...suppliers, ...suppliers]

  useEffect(() => {
    const totalWidth = suppliers.length * (CARD_WIDTH + GAP)
    let currentOffset = offset

    const animate = () => {
      currentOffset += 0.5
      if (currentOffset >= totalWidth) {
        currentOffset = 0
      }
      setOffset(currentOffset)
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  const handlePrev = () => {
    setOffset((prev) => {
      const totalWidth = suppliers.length * (CARD_WIDTH + GAP)
      const newOffset = prev - (CARD_WIDTH + GAP) * 2
      return newOffset < 0 ? totalWidth + newOffset : newOffset
    })
  }

  const handleNext = () => {
    setOffset((prev) => {
      const totalWidth = suppliers.length * (CARD_WIDTH + GAP)
      return (prev + (CARD_WIDTH + GAP) * 2) % totalWidth
    })
  }

  return (
    <div
      className="relative overflow-hidden py-10"
      style={{ perspective: "1200px" }}
    >
      {/* Left Arrow */}
      <button
        onClick={handlePrev}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 md:p-3 transition-all duration-200 hover:scale-110"
        aria-label="Previous"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-brand-blue-dark" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={handleNext}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 md:p-3 transition-all duration-200 hover:scale-110"
        aria-label="Next"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-brand-blue-dark" />
      </button>

      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

      <div
        ref={containerRef}
        className="flex items-center justify-center"
        style={{
          transform: `translateX(-${offset}px)`,
          gap: `${GAP}px`,
        }}
      >
        {extendedSuppliers.map((supplier, idx) => {
          const centerOffset = offset + (containerRef.current?.offsetWidth || 0) / 2
          const cardCenter = idx * (CARD_WIDTH + GAP) + CARD_WIDTH / 2
          const distance = Math.abs(centerOffset - cardCenter)
          const maxDistance = 400
          const scale = Math.max(0.85, 1 - distance / maxDistance * 0.15)
          const zTranslate = Math.max(0, 50 - distance / maxDistance * 50)
          const opacity = Math.max(0.6, 1 - distance / maxDistance * 0.4)

          return (
            <div
              key={`${supplier.name}-${idx}`}
              className="shrink-0 transition-all duration-200"
              style={{
                width: CARD_WIDTH,
                transform: `scale(${scale}) translateZ(${zTranslate}px)`,
                opacity,
              }}
            >
              <div className="bg-white border-2 border-slate-200 rounded-xl p-6 text-center hover:border-brand-blue hover:shadow-xl transition-all duration-300 h-full">
                <div className={`${supplier.larger ? 'h-28' : 'h-20'} flex items-center justify-center mb-4`}>
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
                <h3 className="font-bold text-lg text-brand-blue-dark mb-1">{supplier.name}</h3>
                <p className="text-text-secondary text-sm">{supplier.category}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
