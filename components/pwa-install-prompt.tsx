"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { usePWA } from "@/hooks/use-pwa"

// Custom SVG icons to replace lucide-react
const DownloadIcon = () => (
  <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
  </svg>
)

const XIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
)

const SmartphoneIcon = () => (
  <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" />
  </svg>
)

const WifiIcon = () => (
  <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
    <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.07 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
  </svg>
)

export function PWAInstallPrompt() {
  const { showInstallPrompt, installApp, dismissInstallPrompt, serviceWorkerSupported, isInstalled } = usePWA()
  const [isVisible, setIsVisible] = useState(false)
  const [isDevelopment, setIsDevelopment] = useState(false)

  useEffect(() => {
    setIsDevelopment(process.env.NODE_ENV === "development")

    // Solo mostrar el prompt si no está instalado y es soportado
    if (showInstallPrompt && !isInstalled && serviceWorkerSupported) {
      // Delay para mostrar el prompt después de que el usuario haya interactuado
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 3000) // 3 segundos después de cargar

      return () => clearTimeout(timer)
    }
  }, [showInstallPrompt, isInstalled, serviceWorkerSupported])

  const handleInstall = () => {
    installApp()
    setIsVisible(false)
  }

  const handleDismiss = () => {
    dismissInstallPrompt()
    setIsVisible(false)
  }

  // No mostrar nada si ya está instalado o no es soportado
  if (isInstalled || !serviceWorkerSupported) {
    return null
  }

  // En desarrollo, mostrar un mensaje informativo diferente
  if (isDevelopment && !showInstallPrompt) {
    return (
      <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm">
        <Card className="border-blue-200 bg-blue-50 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="p-2 bg-blue-100 rounded-full">
                  <WifiIcon />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-blue-900 mb-1">Modo Desarrollo</h3>
                <p className="text-xs text-blue-700 mb-2">
                  La funcionalidad PWA está limitada en desarrollo. En producción podrás instalar la app.
                </p>
              </div>
              <button
                onClick={() => setIsVisible(false)}
                className="flex-shrink-0 p-1 text-blue-400 hover:text-blue-600"
              >
                <XIcon />
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!isVisible || !showInstallPrompt) {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm">
      <Card className="border-blue-200 bg-blue-50 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="p-2 bg-blue-100 rounded-full">
                <SmartphoneIcon />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-blue-900 mb-1">Instalar All Supplies</h3>
              <p className="text-xs text-blue-700 mb-3">
                Accede rápidamente desde tu pantalla de inicio y úsala sin conexión.
              </p>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  onClick={handleInstall}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1"
                >
                  <DownloadIcon />
                  Instalar
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleDismiss}
                  className="text-blue-600 hover:text-blue-700 text-xs px-2 py-1"
                >
                  Ahora no
                </Button>
              </div>
            </div>
            <button onClick={handleDismiss} className="flex-shrink-0 p-1 text-blue-400 hover:text-blue-600">
              <XIcon />
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
