import type { ReactNode } from 'react'
import { Reveal } from './Reveal'
import { cn } from '../lib/cn'

type Props = {
  num?: string
  kicker: string
  title: ReactNode
  lede?: ReactNode
  center?: boolean
}

export function SectionHeading({ kicker, title, lede, center }: Props) {
  return (
    <div className={cn('max-w-[64ch]', center && 'mx-auto text-center')}>
      <Reveal
        as="p"
        className={cn(
          'mb-5 flex items-center gap-2.5 font-mono text-[0.72rem] tracking-[0.28em] text-acid3 uppercase',
          center && 'justify-center',
        )}
      >
        <span className="inline-block size-2 rounded-[3px] bg-gold" /> {kicker}
      </Reveal>
      <Reveal delay={60}>
        <h2 className="font-display text-[clamp(1.9rem,4.6vw,3.4rem)] leading-[1.06] font-semibold tracking-[-0.01em]">
          {title}
        </h2>
      </Reveal>
      {lede && (
        <Reveal
          as="p"
          delay={120}
          className={cn('mt-5 max-w-[56ch] text-[1.06rem] text-fg2', center && 'mx-auto')}
        >
          {lede}
        </Reveal>
      )}
    </div>
  )
}
