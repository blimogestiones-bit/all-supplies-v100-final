"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CarouselProduct {
  id: string
  name: string
  description: string
  image: string
  images?: string[]
  href: string
}

interface ProductCarouselProps {
  products: CarouselProduct[]
}

function ProductImageSlideshow({ images, name }: { images: string[]; name: string }) {
  const [activeImg, setActiveImg] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return
    const t = setInterval(() => {
      setActiveImg((prev) => (prev + 1) % images.length)
    }, 4000)
    return () => clearInterval(t)
  }, [images.length])

  return (
    <div className="relative w-full h-48 md:h-56 bg-slate-100 overflow-hidden">
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`${name} ${i + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            i === activeImg ? "opacity-100" : "opacity-0"
          }`}
          onError={(e) => { e.currentTarget.style.display = "none" }}
        />
      ))}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {images.map((_, i) => (
            <span
              key={i}
              className={`block h-1.5 rounded-full transition-all duration-300 ${
                i === activeImg ? "bg-white w-3" : "bg-white/50 w-1.5"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function ProductCarousel({ products }: ProductCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [itemsToShow, setItemsToShow] = useState(4)
  const [cardWidth, setCardWidth] = useState(0)
  // Real index (can go negative or beyond length — handled on transitionEnd)
  const indexRef = useRef(0)
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Number of clones on each side
  const CLONES = 4

  // Full list: clones-at-start + real items + clones-at-end
  const clonesBefore = products.slice(-CLONES)
  const clonesAfter = products.slice(0, CLONES)
  const allItems = [...clonesBefore, ...products, ...clonesAfter]

  // Visual index of real[0] inside allItems
  const realStart = CLONES

  const getTranslateX = useCallback(
    (realIdx: number) => {
      const visualIdx = realStart + realIdx
      return -(visualIdx * cardWidth)
    },
    [cardWidth, realStart]
  )

  const applyPosition = useCallback(
    (realIdx: number, animated: boolean) => {
      if (!trackRef.current || cardWidth === 0) return
      trackRef.current.style.transition = animated ? "transform 500ms ease-in-out" : "none"
      trackRef.current.style.transform = `translateX(${getTranslateX(realIdx)}px)`
    },
    [getTranslateX, cardWidth]
  )

  // Recalculate card width on resize
  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return
      const w = containerRef.current.offsetWidth
      let items = 4
      if (window.innerWidth < 768) items = 1
      else if (window.innerWidth < 1024) items = 2
      setItemsToShow(items)
      setCardWidth(w / items)
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  // Re-apply position without animation when card size changes
  useEffect(() => {
    if (cardWidth > 0) applyPosition(indexRef.current, false)
  }, [cardWidth, applyPosition])

  const advance = useCallback(
    (dir: 1 | -1) => {
      indexRef.current += dir
      applyPosition(indexRef.current, true)
    },
    [applyPosition]
  )

  // After slide animation, jump to real counterpart if we hit a clone
  const handleTransitionEnd = useCallback(() => {
    const idx = indexRef.current
    if (idx < 0) {
      indexRef.current = products.length + idx
      applyPosition(indexRef.current, false)
    } else if (idx >= products.length) {
      indexRef.current = idx - products.length
      applyPosition(indexRef.current, false)
    }
  }, [applyPosition, products.length])

  // Autoplay
  useEffect(() => {
    autoRef.current = setInterval(() => advance(1), 5000)
    return () => { if (autoRef.current) clearInterval(autoRef.current) }
  }, [advance])

  const handlePrev = () => {
    if (autoRef.current) clearInterval(autoRef.current)
    autoRef.current = setInterval(() => advance(1), 5000)
    advance(-1)
  }

  const handleNext = () => {
    if (autoRef.current) clearInterval(autoRef.current)
    autoRef.current = setInterval(() => advance(1), 5000)
    advance(1)
  }

  return (
    <div className="w-full" ref={containerRef}>
      <div className="relative overflow-hidden">
        {/* Track */}
        <div
          ref={trackRef}
          className="flex will-change-transform"
          style={{ width: `${allItems.length * (cardWidth || 0)}px` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {allItems.map((product, idx) => {
            const images =
              product.images && product.images.length > 0
                ? product.images
                : [product.image]
            return (
              <div
                key={`${product.id}-${idx}`}
                style={{ width: `${cardWidth}px`, flexShrink: 0 }}
              >
                <div className="p-2 md:p-3">
                  <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
                    <ProductImageSlideshow images={images} name={product.name} />
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="font-bold text-lg text-slate-900 mb-2 leading-tight">{product.name}</h3>
                      <p className="text-sm text-slate-600 mb-4 flex-grow leading-relaxed">{product.description}</p>
                      <a
                        href={`/productos?producto=${product.id}`}
                        className="inline-block px-4 py-2 bg-brand-green text-white rounded font-semibold hover:bg-brand-green-dark transition-colors duration-300 text-center text-sm"
                      >
                        Ver Catalogo
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-brand-green hover:bg-brand-green-dark text-white p-2 rounded-r-lg transition-all duration-300 shadow-lg"
          aria-label="Anterior producto"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-brand-green hover:bg-brand-green-dark text-white p-2 rounded-l-lg transition-all duration-300 shadow-lg"
          aria-label="Siguiente producto"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {products.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (autoRef.current) clearInterval(autoRef.current)
              indexRef.current = i
              applyPosition(i, true)
              autoRef.current = setInterval(() => advance(1), 5000)
            }}
            className="w-2 h-2 rounded-full bg-slate-300 hover:bg-brand-green transition-colors duration-200"
            aria-label={`Ir al producto ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
