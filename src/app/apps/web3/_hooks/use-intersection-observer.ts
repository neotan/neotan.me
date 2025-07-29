'use client'

import { useEffect, useRef, useState } from 'react'

interface UseIntersectionObserverOptions {
  threshold?: number
  rootMargin?: string
  root?: Element | null
}

export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return

        const isIntersecting = entry.isIntersecting
        setIsIntersecting(isIntersecting)

        if (isIntersecting && !hasIntersected) {
          setHasIntersected(true)
        }
      },
      {
        threshold: options.threshold ?? 0.1,
        rootMargin: options.rootMargin ?? '0px',
        root: options.root ?? null,
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [options.threshold, options.rootMargin, options.root, hasIntersected])

  return { elementRef, isIntersecting, hasIntersected }
}

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    let ticking = false

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY

      if (ticking) return

      ticking = true
      requestAnimationFrame(() => {
        setScrollDirection(currentScrollY > scrollY ? 'down' : 'up')
        setScrollY(currentScrollY)
        ticking = false
      })
    }

    window.addEventListener('scroll', updateScrollDirection)

    return () => window.removeEventListener('scroll', updateScrollDirection)
  }, [scrollY])

  return scrollDirection
} 