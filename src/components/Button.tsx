import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../lib/cn'

type BaseProps = {
  variant?: 'solid' | 'ghost'
  size?: 'md' | 'lg'
  children: ReactNode
}

type ButtonProps =
  | (BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })
  | (BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined })

/** Pill button matching the brand system — an anchor with `href`, otherwise a real button. */
export function Button({ variant = 'solid', size = 'md', className, children, ...rest }: ButtonProps) {
  const classes = cn(
    'group inline-flex items-center gap-2 rounded-full font-bold whitespace-nowrap',
    'transition-[transform,background-color,box-shadow,color,border-color] duration-300 ease-[cubic-bezier(.22,1,.36,1)]',
    size === 'lg' ? 'px-7 py-3.5 text-[0.98rem]' : 'px-6 py-2.5 text-[0.92rem]',
    variant === 'solid'
      ? 'bg-gold text-white shadow-[0_10px_28px_-6px_rgba(245,138,26,0.55)] hover:bg-gold2 hover:-translate-y-0.5 hover:shadow-[0_16px_38px_-8px_rgba(245,138,26,0.65)]'
      : 'border border-acid/30 bg-acid/[0.05] text-acid hover:border-acid hover:bg-acid/10 hover:-translate-y-0.5',
    className,
  )

  if ('href' in rest && rest.href) {
    return (
      <a {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)} className={classes}>
      {children}
    </button>
  )
}

/** Small right-arrow that nudges on parent hover. */
export function Arrow() {
  return (
    <span className="transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-1">
      →
    </span>
  )
}
