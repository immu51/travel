/**
 * useInView: returns [ref, inView]. Attach ref to an element; inView becomes true when it enters the viewport.
 * Used by AnimateIn for scroll-triggered animations.
 */
import { useState, useEffect, useRef } from 'react'

const DEFAULT_OPTIONS = {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px',
  triggerOnce: true,
}

export function useInView(options = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  const threshold = options.threshold ?? DEFAULT_OPTIONS.threshold
  const rootMargin = options.rootMargin ?? DEFAULT_OPTIONS.rootMargin
  const triggerOnce = options.triggerOnce ?? DEFAULT_OPTIONS.triggerOnce

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return
        if (entry.isIntersecting) {
          setInView(true)
          if (triggerOnce) observer.unobserve(entry.target)
        } else if (!triggerOnce) {
          setInView(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, triggerOnce])

  return [ref, inView]
}
