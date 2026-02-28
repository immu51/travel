/**
 * TraverraX logo: globe with plane orbit + brand name (Traverra in silver/gray, X in gold).
 * Use className to control main color (e.g. text-white on hero, text-primary on navbar).
 * layout: "inline" = emblem + text side by side (navbar), "stacked" = emblem above text (hero).
 */
export default function Logo({ className = 'text-primary', size = 'md', showText = true, layout = 'inline' }) {
  const isSmall = size === 'sm'
  const emblemSize = isSmall ? 32 : size === 'lg' ? 56 : 40
  const textSize = isSmall ? 'text-lg' : size === 'lg' ? 'text-3xl' : 'text-xl'
  const isStacked = layout === 'stacked'

  return (
    <div className={`inline-flex items-center justify-center gap-2 min-w-0 ${isStacked ? 'flex-col gap-1' : 'flex-row'} ${className}`}>
      {/* Emblem: globe + plane orbit */}
      <svg
        viewBox="0 0 80 80"
        width={emblemSize}
        height={emblemSize}
        className="flex-shrink-0"
        aria-hidden
      >
        {/* Globe circle */}
        <circle
          cx="40"
          cy="40"
          r="36"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="opacity-80"
        />
        {/* Latitude lines */}
        <ellipse cx="40" cy="40" rx="36" ry="12" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-70" />
        <ellipse cx="40" cy="40" rx="24" ry="36" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-70" />
        <ellipse cx="40" cy="40" rx="36" ry="8" fill="none" stroke="currentColor" strokeWidth="1" className="opacity-50" transform="rotate(60 40 40)" />
        <ellipse cx="40" cy="40" rx="36" ry="8" fill="none" stroke="currentColor" strokeWidth="1" className="opacity-50" transform="rotate(-60 40 40)" />
        {/* Golden plane orbit arc */}
        <path
          d="M 12 45 Q 40 8 68 45"
          fill="none"
          stroke="#D4AF37"
          strokeWidth="3"
          strokeLinecap="round"
          className="drop-shadow-sm"
        />
        {/* Plane shape on the arc */}
        <g transform="translate(40 20) rotate(-30)">
          <path
            d="M 0 -6 L 14 4 L 8 4 L 10 8 L 4 6 L 4 4 Z"
            fill="#D4AF37"
            stroke="#B8962E"
            strokeWidth="0.8"
          />
        </g>
      </svg>
      {/* Brand name */}
      {showText && (
        <span className={`font-heading font-bold tracking-tight ${textSize} flex items-baseline gap-0.5 min-w-0 truncate`}>
          <span className="truncate">Traverra<span className="text-[#D4AF37]">X</span></span>
        </span>
      )}
    </div>
  )
}
