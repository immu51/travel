/**
 * Reusable slider dot indicators. Use with any image/carousel slider.
 * @param {number} count - Number of dots
 * @param {number} activeIndex - Currently active slide index
 * @param {(index: number) => void} onSelect - Called when a dot is clicked
 * @param {string} className - Optional wrapper class (e.g. for position)
 * @param {string} activeClass - Class for active dot (default: accent + scale)
 * @param {string} inactiveClass - Class for inactive dots
 */
export default function SliderDots({
  count,
  activeIndex,
  onSelect,
  className = '',
  activeClass = 'bg-accent scale-125',
  inactiveClass = 'bg-white/60 hover:bg-white/80',
}) {
  return (
    <div
      className={`flex gap-2 z-10 ${className}`.trim()}
      role="tablist"
      aria-label="Slide indicators"
    >
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onSelect(i)}
          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accent ${
            i === activeIndex ? activeClass : inactiveClass
          }`}
          aria-label={`Slide ${i + 1}`}
          aria-selected={i === activeIndex}
        />
      ))}
    </div>
  )
}
