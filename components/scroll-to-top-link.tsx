"use client"

import type React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"
import type { ReactNode } from "react"

interface ScrollToTopLinkProps {
  href: string
  children: ReactNode
  className?: string
}

export function ScrollToTopLink({ href, children, className }: ScrollToTopLinkProps) {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()

    // Navegar a la nueva página
    router.push(href)

    // Hacer scroll al top después de un pequeño delay para asegurar que la página se haya cargado
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }, 100)
  }

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  )
}
