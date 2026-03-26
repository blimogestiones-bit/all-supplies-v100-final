"use client"

import { useRouter } from "next/navigation"
import type { ReactNode } from "react"

interface ContactLinkProps {
  children: ReactNode
  className?: string
}

export function ContactLink({ children, className }: ContactLinkProps) {
  const router = useRouter()

  const handleClick = () => {
    // Si ya estamos en la página principal, hacer scroll directo
    if (window.location.pathname === "/") {
      const contactSection = document.getElementById("contacto")
      if (contactSection) {
        const headerOffset = 80
        const elementPosition = contactSection.offsetTop
        const offsetPosition = elementPosition - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
    } else {
      // Si estamos en otra página, navegar a la principal y luego hacer scroll
      router.push("/")

      // Esperar a que la página se cargue y luego hacer scroll
      setTimeout(() => {
        const contactSection = document.getElementById("contacto")
        if (contactSection) {
          const headerOffset = 80
          const elementPosition = contactSection.offsetTop
          const offsetPosition = elementPosition - headerOffset

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          })
        }
      }, 500) // Dar tiempo suficiente para que la página se cargue
    }
  }

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  )
}
