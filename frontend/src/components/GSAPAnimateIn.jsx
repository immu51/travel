/**
 * Premium scroll-triggered reveal with GSAP. Opacity + transform only for performance.
 * Variants: fadeUp (smooth rise), fadeUpScale (rise + subtle zoom), fadeUpStrong (dramatic rise).
 */
import { useRef, useEffect } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'

const VARIANTS = {
  fadeUp: { y: 36, duration: 0.8, ease: 'power3.out', scale: 1 },
  fadeUpScale: { y: 28, duration: 0.85, ease: 'power3.out', scale: 0.96 },
  fadeUpStrong: { y: 52, duration: 0.9, ease: 'power4.out', scale: 1 },
}

const DEFAULTS = {
  start: 'top 90%',
  once: true,
}

export default function GSAPAnimateIn({
  children,
  className = '',
  as: Tag = 'div',
  variant = 'fadeUp',
  y,
  duration,
  ease,
  delay = 0,
  stagger = 0,
  staggerChildren = null,
}) {
  const ref = useRef(null)
  const v = VARIANTS[variant] || VARIANTS.fadeUp
  const fromY = y ?? v.y
  const toDuration = duration ?? v.duration
  const toEase = ease ?? v.ease
  const fromScale = v.scale

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      const targets = staggerChildren ? el.querySelectorAll(staggerChildren) : el
      const from = { opacity: 0, y: fromY }
      if (fromScale !== 1) from.scale = fromScale
      const to = { opacity: 1, y: 0, duration: toDuration, delay, ease: toEase, stagger: staggerChildren ? stagger : 0 }
      if (fromScale !== 1) to.scale = 1
      gsap.fromTo(targets, from, {
        ...to,
        scrollTrigger: { trigger: el, start: DEFAULTS.start, once: DEFAULTS.once },
        overwrite: true,
      })
    }, el)
    return () => ctx.revert()
  }, [fromY, toDuration, toEase, delay, stagger, staggerChildren, fromScale])

  return <Tag ref={ref} className={className}>{children}</Tag>
}
