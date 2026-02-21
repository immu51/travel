import { useState, useEffect, useRef } from 'react'

const defaultOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px',
  triggerOnce: true,
}

export function useInView(options = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  const opts = { ...defaultOptions, ...options }

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
