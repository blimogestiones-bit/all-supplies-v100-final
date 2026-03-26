"use client"

import { motion } from "framer-motion"
import { useEffect } from "react"
import type { ReactNode } from "react"

interface PageTransitionProps {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  useEffect(() => {
    // Hacer scroll al inicio de la página inmediatamente
    window.scrollTo(0, 0)

    // También asegurar que el scroll esté en el top después de la animación
    const timer = setTimeout(() => {
      window.scrollTo(0, 0)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94], // Easing más suave
      }}
      style={{ minHeight: "100vh" }} // Asegurar altura mínima
    >
      {children}
    </motion.div>
  )
}
