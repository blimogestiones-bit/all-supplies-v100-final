"use client"

import { useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const allies = [
  { name: "Amvac Valves", category: "Valvulas Industriales", logo: "/allies/amvac-valves.jpg" },
  { name: "Dobicka Inc", category: "Equipos Industriales", logo: "/allies/dobicka-inc.jpg", larger: true },
  { name: "Drilling Operations & Engineering Consulting", category: "Servicios de Perforacion", logo: "/allies/drilling-consulting.jpg" },
  { name: "SEI Electric LLC", category: "Servicios Electricos", logo: "/allies/sei-electric.jpg" },
  { name: "MStar Technologie", category: "Tecnologia Industrial", logo: "/allies/mstar-technologie.png" },
  { name: "J&R Oleo Suministros Industriales", category: "Suministros Industriales", logo: "/allies/jr-oleo.png" },
  { name: "InverCapital Casa de Bolsa", category: "Casa de Bolsa", logo: "/allies/invercapital.png", larger: true },
  { name: "Optimum Capital", category: "Financiero", logo: "/allies/optimum-capital.jpg" },
  { name: "Inveraqua", category: "Inversiones", logo: "/allies/inveraqua.png", larger: true },
  { name: "Inprok C.A.", category: "Maquinaria Pesada", logo: "/allies/inprok.png" },
]

// Duplicate for seamless infinite loop
const alliesLoop = [...allies, ...allies, ...allies]

const CARD_WIDTH = 220
const CARD_GAP = 24
const STEP = CARD_WIDTH + CARD_GAP
const TOTAL_WIDTH = allies.length * STEP
const AUTO_SPEED = 0.6 // px per frame
const MANUAL_JUMP = STEP * 2 // Jump 2 cards when clicking arrows

export function AlliesCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef(0)
  const rafRef = useRef<number | null>(null)

  const updateTransform = () => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${offsetRef.current}px)`
    }
  }

  const handlePrev = () => {
    offsetRef.current -= MANUAL_JUMP
    if (offsetRef.current < TOTAL_WIDTH) {
      offsetRef.current += TOTAL_WIDTH
    }
    updateTransform()
  }

  const handleNext = () => {
    offsetRef.current += MANUAL_JUMP
    if (offsetRef.current >= TOTAL_WIDTH * 2) {
      offsetRef.current -= TOTAL_WIDTH
    }
    updateTransform()
  }

  useEffect(() => {
    // Start in the middle set so we can loop both directions
    offsetRef.current = TOTAL_WIDTH

    const animate = () => {
      offsetRef.current += AUTO_SPEED
      if (offsetRef.current >= TOTAL_WIDTH * 2) {
        offsetRef.current -= TOTAL_WIDTH
      }
      updateTransform()
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      className="relative overflow-hidden py-10"
      style={{ perspective: "1200px" }}
    >
      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white border border-slate-200 hover:border-brand-green rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 group"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-6 h-6 text-slate-600 group-hover:text-brand-green transition-colors" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white border border-slate-200 hover:border-brand-green rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 group"
        aria-label="Siguiente"
      >
        <ChevronRight className="w-6 h-6 text-slate-600 group-hover:text-brand-green transition-colors" />
      </button>

      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 z-10"
        style={{ background: "linear-gradient(to right, white, transparent)" }} />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 z-10"
        style={{ background: "linear-gradient(to left, white, transparent)" }} />

      <div
        ref={trackRef}
        className="flex"
        style={{
          gap: `${CARD_GAP}px`,
          width: `${alliesLoop.length * STEP}px`,
          willChange: "transform",
        }}
      >
        {alliesLoop.map((ally, i) => (
          <div
            key={i}
            style={{ width: `${CARD_WIDTH}px`, flexShrink: 0 }}
          >
            <div className="h-44 bg-white rounded-2xl border border-slate-200 shadow-md hover:border-2 hover:border-brand-green hover:shadow-xl flex flex-col items-center justify-center p-5 select-none transition-all duration-300 group">
              <div className="w-full flex items-center justify-center mb-3 h-24">
                <img
                  src={ally.logo}
                  alt={ally.name}
                  className="max-w-full max-h-full object-contain"
                  draggable={false}
                  onError={(e) => {
                    e.currentTarget.style.display = "none"
                    if (e.currentTarget.parentElement) {
                      e.currentTarget.parentElement.innerHTML = `<span class="text-lg font-bold text-brand-blue-dark text-center leading-tight">${ally.name}</span>`
                    }
                  }}
                />
              </div>
              <p className="text-xs font-medium text-text-secondary text-center leading-snug">{ally.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
