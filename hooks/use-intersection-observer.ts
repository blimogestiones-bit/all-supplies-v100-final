"use client"

import { useEffect, useRef, useState } from "react"

interface UseIntersectionObserverProps {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
  disabled?: boolean
}

export function useIntersectionObserver({
  threshold = 0.1,
  rootMargin = "0px",
  triggerOnce = true,
  disabled = false,
}: UseIntersectionObserverProps = {}) {
  const [isIntersecting, setIsIntersecting] = useState(disabled)
  const [hasTriggered, setHasTriggered] = useState(disabled)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (disabled) {
      setIsIntersecting(true)
      setHasTriggered(true)
      return
    }

    const element = ref.current
    if (!element) return

    // Usar threshold más alto en móviles para mejor rendimiento
    const isMobile = window.innerWidth < 768
    const adjustedThreshold = isMobile ? Math.max(threshold, 0.2) : threshold
    const adjustedRootMargin = isMobile ? "0px 0px -20px 0px" : rootMargin

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting

        if (isElementIntersecting && (!hasTriggered || !triggerOnce)) {
          setIsIntersecting(true)
          if (triggerOnce) {
            setHasTriggered(true)
          }
        } else if (!triggerOnce) {
          setIsIntersecting(isElementIntersecting)
        }
      },
      {
        threshold: adjustedThreshold,
        rootMargin: adjustedRootMargin,
        // Optimización para móviles
        ...(isMobile && { rootMargin: "0px 0px -20px 0px" }),
      },
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, rootMargin, triggerOnce, hasTriggered, disabled])

  return { ref, isIntersecting: triggerOnce ? isIntersecting || hasTriggered : isIntersecting }
}
