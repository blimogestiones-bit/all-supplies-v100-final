"use client"

import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { useDeviceDetection } from "@/hooks/use-device-detection"
import type { ReactNode } from "react"

interface AnimatedSectionProps {
  children: ReactNode
  animation?: "fade-up" | "fade-in" | "slide-left" | "slide-right" | "scale-up"
  delay?: number
  className?: string
  disableOnMobile?: boolean
}

export function AnimatedSection({
  children,
  animation = "fade-up",
  delay = 0,
  className = "",
  disableOnMobile = false,
}: AnimatedSectionProps) {
  const { isTouchDevice, prefersReducedMotion, isMobile } = useDeviceDetection()

  // Deshabilitar animaciones si el usuario prefiere movimiento reducido
  // o si está en móvil y disableOnMobile es true
  const shouldDisableAnimation = prefersReducedMotion || (disableOnMobile && isMobile)

  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: isMobile ? 0.15 : 0.1,
    rootMargin: isMobile ? "0px 0px -30px 0px" : "0px 0px -50px 0px",
    disabled: shouldDisableAnimation,
  })

  const getAnimationClasses = () => {
    // Si las animaciones están deshabilitadas, mostrar inmediatamente
    if (shouldDisableAnimation) {
      return "opacity-100"
    }

    // Duraciones más cortas para dispositivos táctiles
    const duration = isTouchDevice ? "duration-500" : "duration-700"
    const baseClasses = `transition-all ${duration} ease-out`

    // Animaciones más sutiles en móviles
    const mobileModifier = isMobile ? 0.5 : 1

    if (!isIntersecting) {
      switch (animation) {
        case "fade-up":
          return `${baseClasses} opacity-0 translate-y-${Math.round(8 * mobileModifier)}`
        case "fade-in":
          return `${baseClasses} opacity-0`
        case "slide-left":
          return `${baseClasses} opacity-0 -translate-x-${Math.round(8 * mobileModifier)}`
        case "slide-right":
          return `${baseClasses} opacity-0 translate-x-${Math.round(8 * mobileModifier)}`
        case "scale-up":
          const scaleValue = isMobile ? "scale-98" : "scale-95"
          return `${baseClasses} opacity-0 ${scaleValue}`
        default:
          return `${baseClasses} opacity-0 translate-y-${Math.round(8 * mobileModifier)}`
      }
    }

    return `${baseClasses} opacity-100 translate-y-0 translate-x-0 scale-100`
  }

  // Reducir delays en dispositivos móviles
  const adjustedDelay = isTouchDevice ? Math.round(delay * 0.7) : delay

  return (
    <div
      ref={ref}
      className={`${getAnimationClasses()} ${className}`}
      style={{
        transitionDelay: shouldDisableAnimation ? "0ms" : `${adjustedDelay}ms`,
        // Usar will-change solo cuando sea necesario para mejor rendimiento
        willChange: !isIntersecting && !shouldDisableAnimation ? "transform, opacity" : "auto",
      }}
    >
      {children}
    </div>
  )
}
