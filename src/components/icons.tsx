import type { ReactElement, SVGProps } from 'react'

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  viewBox: '0 0 24 24',
}

export const MODULE_ICONS: Record<string, (p: SVGProps<SVGSVGElement>) => ReactElement> = {
  user: (p) => (
    <svg {...base} {...p}>
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </svg>
  ),
  box: (p) => (
    <svg {...base} {...p}>
      <path d="M3 8l9-5 9 5v8l-9 5-9-5z" />
      <path d="M3 8l9 5 9-5M12 13v8" />
    </svg>
  ),
  clipboard: (p) => (
    <svg {...base} {...p}>
      <path d="M4 5h16v4H4z" />
      <path d="M6 9v10h12V9M9 13h6" />
    </svg>
  ),
  pos: (p) => (
    <svg {...base} {...p}>
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M3 9h18M7 21h10" />
    </svg>
  ),
  grid: (p) => (
    <svg {...base} {...p}>
      <rect x="3" y="3" width="8" height="8" rx="1.5" />
      <rect x="13" y="3" width="8" height="5" rx="1.5" />
      <rect x="13" y="10" width="8" height="11" rx="1.5" />
      <rect x="3" y="13" width="8" height="8" rx="1.5" />
    </svg>
  ),
  building: (p) => (
    <svg {...base} {...p}>
      <path d="M4 21V9l8-6 8 6v12" />
      <path d="M9 21v-6h6v6" />
    </svg>
  ),
}

/** QuickBasket logo mark — green basket with a fresh carrot & bottle. */
export function BrandMark({ size = 32, className }: { size?: number; className?: string }) {
  const green = '#0A8A34'
  const orange = '#F58A1A'
  return (
    <svg viewBox="0 0 122 104" width={(size * 122) / 104} height={size} className={className} aria-hidden>
      {/* speed lines */}
      <g stroke={green} strokeWidth="7" strokeLinecap="round">
        <line x1="4" y1="54" x2="24" y2="54" />
        <line x1="9" y1="70" x2="27" y2="70" />
      </g>
      {/* carrot (leaves + body poking out of the basket) */}
      <path d="M50 22c3-6 10-8 15-5-2 1-3 3-4 6 3-1 5-1 8 1-4 1-6 3-7 6-2-3-6-5-12-8z" fill={green} />
      <path d="M46 30c8 2 14 7 16 14l-6 20a3 3 0 0 1-6 0l-6-20c-1-6 3-11 2-14z" fill={orange} transform="rotate(4 53 45)" />
      {/* bottle with medical cross */}
      <rect x="70" y="26" width="21" height="30" rx="5.5" fill={green} />
      <rect x="76.5" y="19" width="8" height="8" rx="2" fill={green} />
      <g fill="#fff">
        <rect x="78.5" y="35" width="4" height="13" rx="1.4" />
        <rect x="74" y="39.5" width="13" height="4" rx="1.4" />
      </g>
      {/* basket rim handles */}
      <path d="M48 52a25 22 0 0 1 50 0" fill="none" stroke={green} strokeWidth="6.5" strokeLinecap="round" />
      {/* basket body */}
      <path d="M36 51h74l-9 42a9 9 0 0 1-9 7H54a9 9 0 0 1-9-7z" fill={green} />
      {/* white slats */}
      <g stroke="#fff" strokeWidth="4.4" strokeLinecap="round">
        <line x1="59" y1="64" x2="61" y2="88" />
        <line x1="73" y1="64" x2="73" y2="88" />
        <line x1="87" y1="64" x2="85" y2="88" />
      </g>
    </svg>
  )
}
