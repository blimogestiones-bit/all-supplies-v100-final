"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { AnimatedSection } from "@/components/animated-section"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

// Simple SVG icons to replace lucide-react
const Building2Icon = () => (
  <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
  </svg>
)

const UsersIcon = () => (
  <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.54.37-2.01.99L14 10l-1.99-1.01A2.5 2.5 0 0 0 10 8H8.46c-.8 0-1.54.37-2.01.99L3.91 16H6.5v6h13zM12.5 11.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5S11 13.83 11 13s.67-1.5 1.5-1.5z" />
  </svg>
)

const CalendarIcon = () => (
  <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
  </svg>
)

const GlobeIcon = () => (
  <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
  </svg>
)

interface MetricProps {
  icon: React.ReactNode
  value: number
  suffix: string
  label: string
  color: string
}

function AnimatedCounter({ value, suffix, isVisible }: { value: number; suffix: string; isVisible: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000 // 2 segundos
    const steps = 60
    const increment = value / steps
    const stepDuration = duration / steps

    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      const currentValue = Math.min(Math.round(increment * currentStep), value)
      setCount(currentValue)

      if (currentStep >= steps) {
        clearInterval(timer)
      }
    }, stepDuration)

    return () => clearTimeout(timer)
  }, [isVisible, value])

  return (
    <span className="text-4xl md:text-5xl font-bold">
      {count}
      {suffix}
    </span>
  )
}

function MetricCard({ icon, value, suffix, label, color }: MetricProps) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.5,
    triggerOnce: true,
  })

  return (
    <div ref={ref} className="text-center">
      <div className={`mx-auto mb-4 p-4 ${color} rounded-full w-fit shadow-lg`}>{icon}</div>
      <div className="text-white mb-2">
        <AnimatedCounter value={value} suffix={suffix} isVisible={isIntersecting} />
      </div>
      <p className="text-white font-medium">{label}</p>
    </div>
  )
}

export function MetricsSection() {
  const metrics = [
    {
      icon: <Building2Icon />,
      value: 15,
      suffix: "+",
      label: "Empresas Satisfechas",
      color: "bg-brand-green-dark",
    },
    {
      icon: <CalendarIcon />,
      value: 8,
      suffix: "+",
      label: "Años de Experiencia",
      color: "bg-brand-blue",
    },
    {
      icon: <GlobeIcon />,
      value: 20,
      suffix: "+",
      label: "Países de Operación",
      color: "bg-brand-green-dark",
    },
    {
      icon: <UsersIcon />,
      value: 10,
      suffix: "+",
      label: "Profesionales Especializados",
      color: "bg-brand-blue",
    },
  ]

  return (
    <section className="py-20 bg-brand-blue-dark text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <AnimatedSection animation="fade-up" delay={100}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestra Trayectoria en Números</h2>
            <p className="text-xl text-white max-w-2xl mx-auto">
              Más de una década construyendo relaciones sólidas y entregando resultados excepcionales a nivel
              internacional
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {metrics.map((metric, index) => (
            <AnimatedSection key={index} animation="scale-up" delay={200 + index * 100}>
              <MetricCard {...metric} />
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection animation="fade-up" delay={800}>
          <div className="text-center mt-16">
            <div className="bg-white/15 backdrop-blur-sm rounded-lg p-6 max-w-3xl mx-auto border border-white/30">
              <p className="text-lg text-white">
                "Nuestro compromiso con la excelencia nos ha permitido establecer alianzas estratégicas globales y
                mantener la confianza de nuestros clientes a lo largo de los años."
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
