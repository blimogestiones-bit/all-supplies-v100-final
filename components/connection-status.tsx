"use client"

import { useEffect, useState } from "react"
import { usePWA } from "@/hooks/use-pwa"

// Custom SVG icons to replace lucide-react
const WifiOffIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24.24 2.76l-1.41-1.41L2.76 21.42l1.41 1.41L6.83 20.17c1.39.8 3.02 1.26 4.76 1.26 5.5 0 10-4.5 10-10 0-1.74-.46-3.37-1.26-4.76l2.91-2.91zM12 4c-4.41 0-8 3.59-8 8 0 1.48.41 2.86 1.12 4.06l1.46-1.46C6.22 13.69 6 12.87 6 12c0-3.31 2.69-6 6-6 .87 0 1.69.22 2.4.58l1.46-1.46C14.86 4.41 13.48 4 12 4z" />
  </svg>
)

const WifiIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.07 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
  </svg>
)

export function ConnectionStatus() {
  const { isOnline } = usePWA()
  const [showOfflineMessage, setShowOfflineMessage] = useState(false)
  const [wasOffline, setWasOffline] = useState(false)

  useEffect(() => {
    if (!isOnline) {
      setShowOfflineMessage(true)
      setWasOffline(true)
    } else if (wasOffline && isOnline) {
      // Mostrar mensaje de reconexión brevemente
      setShowOfflineMessage(true)
      const timer = setTimeout(() => {
        setShowOfflineMessage(false)
      }, 3000)
      return () => clearTimeout(timer)
    } else {
      setShowOfflineMessage(false)
    }
  }, [isOnline, wasOffline])

  if (!showOfflineMessage) {
    return null
  }

  return (
    <div
      className={`fixed top-16 left-0 right-0 z-40 py-2 px-4 transition-all duration-300 ${
        isOnline ? "bg-green-500" : "bg-amber-500"
      } text-white`}
    >
      <div className="container mx-auto flex items-center justify-center space-x-2 text-sm">
        {isOnline ? (
          <>
            <WifiIcon />
            <span>Conexión restaurada</span>
          </>
        ) : (
          <>
            <WifiOffIcon />
            <span>Sin conexión a internet. Algunas funciones pueden no estar disponibles.</span>
          </>
        )}
      </div>
    </div>
  )
}
