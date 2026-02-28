import { useState, useEffect } from 'react'

/**
 * Reusable hook for image/carousel sliders.
 * Auto-advances to next slide every intervalMs. Returns current index and setter.
 * @param {number} totalSlides - Number of slides (use 0 or 1 to disable auto-advance)
 * @param {number} intervalMs - Time between slides in ms (e.g. 3000)
 * @returns {[number, (number | ((prev: number) => number)) => void]} [index, setIndex]
 */
export function useImageSlider(totalSlides, intervalMs = 3000) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (totalSlides < 2) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % totalSlides)
    }, intervalMs)
    return () => clearInterval(id)
  }, [totalSlides, intervalMs])

  return [index, setIndex]
}
