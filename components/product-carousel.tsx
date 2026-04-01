"use client"

import { useState, useEffect, useRef } from "react"
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

// Sub-component: image slideshow within a single product card
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
              className={`block w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === activeImg ? "bg-white w-3" : "bg-white/50"
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
  itemsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 4,
  },
}: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [screenSize, setScreenSize] = useState("desktop")

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setScreenSize("mobile")
      } else if (window.innerWidth < 1024) {
        setScreenSize("tablet")
      } else {
        setScreenSize("desktop")
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const itemsToShow =
    screenSize === "mobile"
      ? itemsPerView.mobile
      : screenSize === "tablet"
        ? itemsPerView.tablet
        : itemsPerView.desktop

  const maxIndex = Math.max(0, products.length - itemsToShow)

  useEffect(() => {
    if (!isAutoPlay) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlay, maxIndex])

  const handlePrev = () => {
    setIsAutoPlay(false)
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1))
  }

  const handleNext = () => {
    setIsAutoPlay(false)
    setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1))
  }

  return (
    <div className="w-full">
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}
        >
          {products.map((product) => {
            const images = product.images && product.images.length > 0
              ? product.images
              : [product.image]
            return (
              <div
                key={product.id}
                className="flex-shrink-0"
                style={{ width: `${100 / itemsToShow}%` }}
              >
                <div className="p-2 md:p-4">
                  <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full flex flex-col">
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

      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsAutoPlay(false)
              setCurrentIndex(index)
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-brand-green w-8" : "bg-slate-300 hover:bg-slate-400"
            }`}
            aria-label={`Go to product group ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
