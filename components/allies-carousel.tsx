"use client"

import { useEffect, useRef, useState } from "react"

const allies = [
  { name: "Amvac Valves", category: "Valvulas Industriales", logo: "/allies/amvac-valves.jpg" },
  { name: "Dobicka Inc", category: "Equipos Industriales", logo: "/allies/dobicka-inc.jpg" },
  { name: "Drilling Operations & Engineering Consulting", category: "Servicios de Perforacion", logo: "/allies/drilling-consulting.jpg" },
  { name: "Invercapital Casa de Bolsa", category: "Casa de Bolsa", logo: "/allies/iec.png" },
  { name: "SEI Electric LLC", category: "Servicios Electricos", logo: "/allies/sei-electric.jpg" },
  { name: "Banesco", category: "Servicios Financieros", logo: "/allies/banesco.png" },
  { name: "MStar Technologie", category: "Tecnologia Industrial", logo: "/allies/mstar-technologie.png" },
  { name: "TradeXAuto", category: "Comercio Internacional", logo: "/allies/tradexauto.png" },
  { name: "J&R Oleo Suministros Industriales", category: "Suministros Industriales", logo: "/allies/jr-oleo.png" },
  { name: "Globex Re", category: "Reaseguradoras", logo: "/allies/globex-re.png" },
  { name: "Optimum Capital", category: "Inversiones", logo: "/allies/optimum-capital.jpg" },
  { name: "Inversiones Sumizara", category: "Inversiones", logo: "/allies/inversiones-sumizara.jpg" },
]

// Duplicate for seamless infinite loop
const alliesLoop = [...allies, ...allies, ...allies]

const CARD_WIDTH = 220
const CARD_GAP = 24
const STEP = CARD_WIDTH + CARD_GAP
const TOTAL_WIDTH = allies.length * STEP
const AUTO_SPEED = 0.6 // px per frame

export function AlliesCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const pausedRef = useRef(false)
  const [activeIdx, setActiveIdx] = useState(Math.floor(allies.length / 2))

  useEffect(() => {
    // Start in the middle set so we can loop both directions
    offsetRef.current = TOTAL_WIDTH

    const animate = () => {
      if (!pausedRef.current) {
        offsetRef.current += AUTO_SPEED
        if (offsetRef.current >= TOTAL_WIDTH * 2) {
          offsetRef.current -= TOTAL_WIDTH
        }
        if (trackRef.current) {
          trackRef.current.style.transform = `translateX(-${offsetRef.current}px)`
        }

        // Determine center card
        const center = offsetRef.current + (typeof window !== "undefined" ? window.innerWidth / 2 : 700)
        const idx = Math.round(center / STEP) % allies.length
        setActiveIdx((idx + allies.length) % allies.length)
      }
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
        {alliesLoop.map((ally, i) => {
          const loopIdx = i % allies.length
          const isActive = loopIdx === activeIdx && Math.floor(i / allies.length) === 1

          return (
            <div
              key={i}
              style={{
                width: `${CARD_WIDTH}px`,
                flexShrink: 0,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                transform: isActive
                  ? "translateZ(40px) scale(1.08)"
                  : "translateZ(0px) scale(1)",
                transformStyle: "preserve-3d",
              }}
            >
              <div
                className={`
                  h-44 bg-white rounded-2xl flex flex-col items-center justify-center p-5 select-none
                  ${isActive
                    ? "border-2 border-brand-green shadow-2xl"
                    : "border border-slate-200 shadow-md"}
                `}
                style={{
                  boxShadow: isActive
                    ? "0 20px 60px -10px rgba(0,0,0,0.22), 0 0 0 2px var(--color-brand-green)"
                    : "0 4px 18px -4px rgba(0,0,0,0.10)",
                }}
              >
                <div className="h-20 w-full flex items-center justify-center mb-3">
                  <img
                    src={ally.logo}
                    alt={ally.name}
                    className="max-h-full max-w-full object-contain"
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
          )
        })}
      </div>
    </div>
  )
}
