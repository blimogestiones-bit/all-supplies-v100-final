"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"

export function SmoothScrollNav() {
  const { language, setLanguage, t } = useLanguage()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.offsetTop
      const offsetPosition = elementPosition - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es")
  }

  return (
    <header className="bg-white text-brand-blue-dark py-4 sticky top-0 z-50 shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4 flex items-center justify-between gap-8">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0">
          <img
            src="/logo-all-supplies-complete.png"
            alt="All Supplies & Investment Inc"
            className="h-16 w-auto object-contain md:h-20"
          />
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => scrollToSection("inicio")}
            className="hover:text-brand-green-dark transition-colors cursor-pointer font-medium focus:outline-none focus:ring-2 focus:ring-brand-green-light focus:ring-offset-2 rounded px-3 py-2 hover:bg-brand-green-50"
          >
            {t.nav.inicio}
          </button>
          <button
            onClick={() => scrollToSection("servicios")}
            className="hover:text-brand-green-dark transition-colors cursor-pointer font-medium focus:outline-none focus:ring-2 focus:ring-brand-green-light focus:ring-offset-2 rounded px-3 py-2 hover:bg-brand-green-50"
          >
            {t.nav.servicios}
          </button>
          <button
            onClick={() => scrollToSection("nosotros")}
            className="hover:text-brand-green-dark transition-colors cursor-pointer font-medium focus:outline-none focus:ring-2 focus:ring-brand-green-light focus:ring-offset-2 rounded px-3 py-2 hover:bg-brand-green-50"
          >
            {t.nav.nosotros}
          </button>
          <button
            onClick={() => scrollToSection("contacto")}
            className="hover:text-brand-green-dark transition-colors cursor-pointer font-medium focus:outline-none focus:ring-2 focus:ring-brand-green-light focus:ring-offset-2 rounded px-3 py-2 hover:bg-brand-green-50"
          >
            {t.nav.contacto}
          </button>

          {/* Language Toggle Button */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-2 rounded-full border-2 border-brand-blue hover:border-brand-green hover:bg-brand-green-50 transition-all duration-300 font-semibold text-sm"
            aria-label={language === "es" ? "Switch to English" : "Cambiar a Español"}
          >
            <span className={`${language === "es" ? "text-brand-blue" : "text-gray-400"}`}>ES</span>
            <span className="text-gray-300">|</span>
            <span className={`${language === "en" ? "text-brand-blue" : "text-gray-400"}`}>EN</span>
          </button>
        </nav>

        {/* Mobile menu */}
        <div className="md:hidden flex items-center gap-6">
          {/* Language Toggle Mobile */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-2 py-1 rounded-full border-2 border-brand-blue hover:border-brand-green transition-all duration-300 font-semibold text-xs"
            aria-label={language === "es" ? "Switch to English" : "Cambiar a Español"}
          >
            <span className={`${language === "es" ? "text-brand-blue" : "text-gray-400"}`}>ES</span>
            <span className="text-gray-300">|</span>
            <span className={`${language === "en" ? "text-brand-blue" : "text-gray-400"}`}>EN</span>
          </button>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-brand-blue-dark hover:text-brand-green-dark focus:outline-none focus:ring-2 focus:ring-brand-green-light rounded p-2"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <nav className="flex flex-col py-2">
            <button
              onClick={() => {
                scrollToSection("inicio")
                setMobileMenuOpen(false)
              }}
              className="w-full text-left px-6 py-3 hover:bg-brand-green-50 hover:text-brand-green-dark transition-colors font-medium"
            >
              {t.nav.inicio}
            </button>
            <button
              onClick={() => {
                scrollToSection("servicios")
                setMobileMenuOpen(false)
              }}
              className="w-full text-left px-6 py-3 hover:bg-brand-green-50 hover:text-brand-green-dark transition-colors font-medium"
            >
              {t.nav.servicios}
            </button>
            <button
              onClick={() => {
                scrollToSection("nosotros")
                setMobileMenuOpen(false)
              }}
              className="w-full text-left px-6 py-3 hover:bg-brand-green-50 hover:text-brand-green-dark transition-colors font-medium"
            >
              {t.nav.nosotros}
            </button>
            <button
              onClick={() => {
                scrollToSection("contacto")
                setMobileMenuOpen(false)
              }}
              className="w-full text-left px-6 py-3 hover:bg-brand-green-50 hover:text-brand-green-dark transition-colors font-medium"
            >
              {t.nav.contacto}
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
