/**
 * AnimateIn: reveals children when they scroll into view. Use for section headings, cards, etc.
 */
import { useInView } from '../hooks/useInView'

const VARIANTS = {
  fadeUp: 'animate-fade-up',
  fadeIn: 'animate-fade-in-scroll',
  fadeUpScale: 'animate-fade-up-scale',
  slideLeft: 'animate-slide-left',
  slideRight: 'animate-slide-right',
}

export default function AnimateIn({ children, variant = 'fadeUp', delay = 0, className = '', as: Tag = 'div' }) {
  const [ref, inView] = useInView()
  const base = 'opacity-0 transition-all duration-700 ease-out'
  const inViewClass = 'animate-in-view'
  const style = delay > 0 ? { transitionDelay: `${delay}ms` } : undefined

  return (
    <Tag
      ref={ref}
      style={style}
      className={`${base} ${VARIANTS[variant] || VARIANTS.fadeUp} ${inView ? inViewClass : ''} ${className}`.trim()}
    >
      {children}
    </Tag>
  )
}
