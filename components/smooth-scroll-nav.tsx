"use client"

export function SmoothScrollNav() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 80 // Altura del header fijo
      const elementPosition = element.offsetTop
      const offsetPosition = elementPosition - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <header className="bg-white text-brand-blue-dark py-4 sticky top-0 z-50 shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo más grande */}
        <div className="flex items-center">
          <img
            src="/logo-all-supplies-complete.png"
            alt="All Supplies & Investment Inc"
            className="h-16 w-auto object-contain md:h-20"
          />
        </div>

        <nav className="hidden md:flex space-x-8">
          <button
            onClick={() => scrollToSection("inicio")}
            className="hover:text-brand-green-dark transition-colors cursor-pointer font-medium focus:outline-none focus:ring-2 focus:ring-brand-green-light focus:ring-offset-2 rounded px-3 py-2 hover:bg-brand-green-50"
          >
            Inicio
          </button>
          <button
            onClick={() => scrollToSection("servicios")}
            className="hover:text-brand-green-dark transition-colors cursor-pointer font-medium focus:outline-none focus:ring-2 focus:ring-brand-green-light focus:ring-offset-2 rounded px-3 py-2 hover:bg-brand-green-50"
          >
            Servicios
          </button>
          <button
            onClick={() => scrollToSection("nosotros")}
            className="hover:text-brand-green-dark transition-colors cursor-pointer font-medium focus:outline-none focus:ring-2 focus:ring-brand-green-light focus:ring-offset-2 rounded px-3 py-2 hover:bg-brand-green-50"
          >
            Nosotros
          </button>
          <button
            onClick={() => scrollToSection("contacto")}
            className="hover:text-brand-green-dark transition-colors cursor-pointer font-medium focus:outline-none focus:ring-2 focus:ring-brand-green-light focus:ring-offset-2 rounded px-3 py-2 hover:bg-brand-green-50"
          >
            Contacto
          </button>
        </nav>

        {/* Menú móvil hamburger */}
        <div className="md:hidden">
          <button className="text-brand-blue-dark hover:text-brand-green-dark focus:outline-none focus:ring-2 focus:ring-brand-green-light rounded p-2">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
