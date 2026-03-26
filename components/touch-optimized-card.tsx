"use client"

import { useDeviceDetection } from "@/hooks/use-device-detection"
import { Card } from "@/components/ui/card"
import type { ReactNode } from "react"

interface TouchOptimizedCardProps {
  children: ReactNode
  className?: string
  borderColor?: string
}

export function TouchOptimizedCard({
  children,
  className = "",
  borderColor = "border-t-blue-500",
}: TouchOptimizedCardProps) {
  const { isTouchDevice, isMobile } = useDeviceDetection()

  // Clases de hover más sutiles para dispositivos táctiles
  const hoverClasses = isTouchDevice
    ? "hover:shadow-lg active:scale-[0.98] active:shadow-md"
    : "hover:shadow-xl hover:scale-105"

  // Transiciones más rápidas en móviles
  const transitionClasses = isMobile ? "transition-all duration-200 ease-out" : "transition-all duration-300 ease-out"

  return (
    <Card
      className={`h-full border-t-4 ${borderColor} ${hoverClasses} ${transitionClasses} ${className}`}
      style={{
        // Optimización para dispositivos táctiles
        touchAction: isTouchDevice ? "manipulation" : "auto",
      }}
    >
      {children}
    </Card>
  )
}
