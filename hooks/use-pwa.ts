"use client"

import { useEffect, useState } from "react"

interface PWAState {
  isInstallable: boolean
  isInstalled: boolean
  isOnline: boolean
  showInstallPrompt: boolean
  installPrompt: any
  serviceWorkerSupported: boolean
}

export function usePWA() {
  const [pwaState, setPWAState] = useState<PWAState>({
    isInstallable: false,
    isInstalled: false,
    isOnline: true,
    showInstallPrompt: false,
    installPrompt: null,
    serviceWorkerSupported: false,
  })

  useEffect(() => {
    // Verificar si estamos en un entorno que soporta Service Workers
    const isServiceWorkerSupported = "serviceWorker" in navigator
    const isProduction = process.env.NODE_ENV === "production"
    const isDevelopment = process.env.NODE_ENV === "development"

    // Verificar si ya está instalado
    const isInstalled =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true ||
      window.location.search.includes("utm_source=pwa")

    // Verificar estado de conexión
    const isOnline = navigator.onLine

    setPWAState((prev) => ({
      ...prev,
      isInstalled,
      isOnline,
      serviceWorkerSupported: isServiceWorkerSupported,
    }))

    // Listener para el evento beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setPWAState((prev) => ({
        ...prev,
        isInstallable: true,
        installPrompt: e,
        showInstallPrompt: !isInstalled && isServiceWorkerSupported,
      }))
    }

    // Listener para cambios de conexión
    const handleOnline = () => {
      setPWAState((prev) => ({ ...prev, isOnline: true }))
    }

    const handleOffline = () => {
      setPWAState((prev) => ({ ...prev, isOnline: false }))
    }

    // Solo registrar Service Worker en producción o si está explícitamente habilitado
    if (isServiceWorkerSupported && (isProduction || localStorage.getItem("enableSW") === "true")) {
      // Verificar si el archivo sw.js existe antes de registrarlo
      fetch("/sw.js", { method: "HEAD" })
        .then((response) => {
          if (response.ok && response.headers.get("content-type")?.includes("javascript")) {
            return navigator.serviceWorker.register("/sw.js")
          } else {
            console.log("Service Worker no disponible en este entorno")
            return null
          }
        })
        .then((registration) => {
          if (registration) {
            console.log("Service Worker registrado:", registration)

            // Verificar actualizaciones
            registration.addEventListener("updatefound", () => {
              const newWorker = registration.installing
              if (newWorker) {
                newWorker.addEventListener("statechange", () => {
                  if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                    // Nueva versión disponible
                    if (confirm("Nueva versión disponible. ¿Actualizar ahora?")) {
                      newWorker.postMessage({ type: "SKIP_WAITING" })
                      window.location.reload()
                    }
                  }
                })
              }
            })
          }
        })
        .catch((error) => {
          console.log("Service Worker no se pudo registrar (normal en desarrollo):", error.message)
          // No mostrar error en desarrollo, es esperado
        })
    } else {
      console.log("Service Worker deshabilitado en desarrollo")
    }

    // Event listeners
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const installApp = async () => {
    if (pwaState.installPrompt) {
      try {
        const result = await pwaState.installPrompt.prompt()
        console.log("Resultado de instalación:", result)

        setPWAState((prev) => ({
          ...prev,
          showInstallPrompt: false,
          installPrompt: null,
        }))
      } catch (error) {
        console.error("Error durante la instalación:", error)
      }
    }
  }

  const dismissInstallPrompt = () => {
    setPWAState((prev) => ({
      ...prev,
      showInstallPrompt: false,
    }))
  }

  // Función para habilitar Service Worker en desarrollo (para testing)
  const enableServiceWorkerInDev = () => {
    localStorage.setItem("enableSW", "true")
    window.location.reload()
  }

  return {
    ...pwaState,
    installApp,
    dismissInstallPrompt,
    enableServiceWorkerInDev,
  }
}
