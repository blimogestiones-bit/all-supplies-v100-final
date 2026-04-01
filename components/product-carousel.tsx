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
  itemsPerView?: {
    mobile: number
    tablet: number
    desktop: number
  }
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

export function ProductCarousel({
  products,
  itemsPerView = { mobile: 1, tablet: 2, desktop: 4 },
}: ProductCarouselProps) {
  const [itemsToShow, setItemsToShow] = useState(4)
  const trackRef = useRef<HTMLDivElement>(null)
  // index into the real product list (0-based). We render clones around the list.
  const indexRef = useRef(0)
  // whether transition is enabled (disabled during the instant clone-jump)
  const [transition, setTransition] = useState(true)
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setItemsToShow(itemsPerView.mobile)
      else if (window.innerWidth < 1024) setItemsToShow(itemsPerView.tablet)
      else setItemsToShow(itemsPerView.desktop)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [itemsPerView.mobile, itemsPerView.tablet, itemsPerView.desktop])

  // We prepend `itemsToShow` clones at the start and append `itemsToShow` at the end
  // so there is always content to slide into from either direction.
  const cloneCount = itemsToShow
  const allItems = [
    ...products.slice(-cloneCount),
    ...products,
    ...products.slice(0, cloneCount),
  ]
  const totalSlots = allItems.length

  // The visual index in allItems that corresponds to real index 0 is `cloneCount`.
  const toVisual = (real: number) => real + cloneCount

  const applyTranslate = useCallback(
    (visualIdx: number, animated: boolean) => {
      if (!trackRef.current) return
      trackRef.current.style.transition = animated
        ? "transform 500ms ease-in-out"
        : "none"
      trackRef.current.style.transform = `translateX(-${(visualIdx * 100) / itemsToShow}%)`
    },
    [itemsToShow]
  )

  // Set initial position (no animation) whenever itemsToShow changes
  useEffect(() => {
    applyTranslate(toVisual(indexRef.current), false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsToShow])

  const advance = useCallback(
    (dir: 1 | -1) => {
      const next = indexRef.current + dir
      indexRef.current = next
      applyTranslate(toVisual(next), true)
    },
    [applyTranslate, toVisual]
  )

  // After each animated transition, if we've slid into a clone region,
  // instantly jump to the real counterpart.
  const handleTransitionEnd = useCallback(() => {
    const real = indexRef.current
    if (real < 0) {
      indexRef.current = products.length - 1
      applyTranslate(toVisual(products.length - 1), false)
    } else if (real >= products.length) {
      indexRef.current = 0
      applyTranslate(toVisual(0), false)
    }
  }, [applyTranslate, products.length, toVisual])

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

  const itemWidth = `${100 / itemsToShow}%`

  return (
    <div className="w-full">
      <div className="relative overflow-hidden">
        <div
          ref={trackRef}
          className="flex will-change-transform"
          style={{ width: `${(totalSlots / itemsToShow) * 100}%` }}
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
                style={{ width: itemWidth, flexShrink: 0 }}
              >
                <div className="p-2 md:p-4">
                  <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
                    <ProductImageSlideshow images={images} name={product.name} />
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="font-bold text-lg text-slate-900 mb-2">{product.name}</h3>
                      <p className="text-sm text-slate-600 mb-4 flex-grow">{product.description}</p>
                      <a
                        href={`/productos?producto=${product.id}`}
                        className="inline-block px-4 py-2 bg-brand-green text-white rounded font-semibold hover:bg-brand-green-dark transition-colors duration-300 text-center"
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
          aria-label="Previous products"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-brand-green hover:bg-brand-green-dark text-white p-2 rounded-l-lg transition-all duration-300 shadow-lg"
          aria-label="Next products"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}
