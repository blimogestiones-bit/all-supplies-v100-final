"use client"

import { useEffect, useState } from "react"

interface DeviceInfo {
  isTouchDevice: boolean
  prefersReducedMotion: boolean
  isMobile: boolean
}

export function useDeviceDetection(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isTouchDevice: false,
    prefersReducedMotion: false,
    isMobile: false,
  })

  useEffect(() => {
    // Detectar dispositivo táctil
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0

    // Detectar preferencia de movimiento reducido
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    // Detectar dispositivo móvil por ancho de pantalla
    const isMobile = window.innerWidth < 768

    setDeviceInfo({
      isTouchDevice,
      prefersReducedMotion,
      isMobile,
    })

    // Listener para cambios en el tamaño de pantalla
    const handleResize = () => {
      setDeviceInfo((prev) => ({
        ...prev,
        isMobile: window.innerWidth < 768,
      }))
    }

    // Listener para cambios en preferencias de movimiento
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setDeviceInfo((prev) => ({
        ...prev,
        prefersReducedMotion: e.matches,
      }))
    }

    window.addEventListener("resize", handleResize)
    mediaQuery.addEventListener("change", handleMotionChange)

    return () => {
      window.removeEventListener("resize", handleResize)
      mediaQuery.removeEventListener("change", handleMotionChange)
    }
  }, [])

  return deviceInfo
}
