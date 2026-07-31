import type { ElementType, ReactNode } from 'react'
import { useInView } from '../hooks/useInView'
import { cn } from '../lib/cn'

type RevealProps = {
  children: ReactNode
  as?: ElementType
  delay?: number
  className?: string
}

/** Fades + lifts its children into view once, honoring reduced-motion via CSS. */
export function Reveal({ children, as = 'div', delay = 0, className }: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>()
  const Tag = as as ElementType
  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        'transition-[opacity,transform] duration-700 ease-[cubic-bezier(.22,1,.36,1)] will-change-[opacity,transform]',
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7',
        className,
      )}
    >
      {children}
    </Tag>
  )
}
