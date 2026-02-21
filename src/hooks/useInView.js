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
  const opts = { ...DEFAULT_OPTIONS, ...options }

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (opts.triggerOnce) observer.unobserve(entry.target)
        } else if (!opts.triggerOnce) {
          setInView(false)
        }
      },
      { threshold: opts.threshold, rootMargin: opts.rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [opts.threshold, opts.rootMargin, opts.triggerOnce])

  return [ref, inView]
}
