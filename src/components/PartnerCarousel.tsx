import { useCallback, useEffect, useRef, useState } from 'react'
import type { Partner } from '../lib/content'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { ReelDialog } from './ReelDialog'
import { cn } from '../lib/cn'

const AUTOPLAY_MS = 3800

/**
 * Scroll-snap carousel of partner cards. Built on native overflow scrolling so
 * touch swipe, trackpads and keyboard all work without extra handling; the
 * arrows and dots just drive scrollLeft. Autoplay pauses on hover/focus and is
 * skipped entirely under prefers-reduced-motion.
 */
export function PartnerCarousel({ items }: { items: Partner[] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const [pages, setPages] = useState(1)
  const [paused, setPaused] = useState(false)
  const [reelOf, setReelOf] = useState<Partner | null>(null)
  const reduce = useReducedMotion()

  /** Width of one card plus the flex gap. */
  const step = useCallback(() => {
    const track = trackRef.current
    const first = track?.firstElementChild as HTMLElement | null
    if (!track || !first) return 0
    const gap = parseFloat(getComputedStyle(track).columnGap || '0') || 0
    return first.offsetWidth + gap
  }, [])

  /** How many discrete scroll positions exist at the current breakpoint. */
  const measure = useCallback(() => {
    const track = trackRef.current
    const s = step()
    if (!track || !s) return
    setPages(Math.max(1, Math.round((track.scrollWidth - track.clientWidth) / s) + 1))
  }, [step])

  useEffect(() => {
    measure()
    const track = trackRef.current
    if (!track) return
    const ro = new ResizeObserver(measure)
    ro.observe(track)
    return () => ro.disconnect()
  }, [measure])

  // keep the dots in sync with swipes and trackpad scrolling
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const s = step()
        if (s) setIndex(Math.round(track.scrollLeft / s))
      })
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      track.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [step])

  const goTo = useCallback(
    (next: number) => {
      const track = trackRef.current
      const s = step()
      if (!track || !s) return
      const wrapped = next < 0 ? pages - 1 : next > pages - 1 ? 0 : next
      track.scrollTo({ left: wrapped * s, behavior: reduce ? 'auto' : 'smooth' })
    },
    [pages, reduce, step],
  )

  useEffect(() => {
    if (reduce || paused || pages < 2) return
    const id = setInterval(() => goTo(index + 1), AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [goTo, index, pages, paused, reduce])

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        ref={trackRef}
        role="group"
        aria-roledescription="carousel"
        aria-label="Strategic partners"
        className={cn(
          'flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pb-1',
          '[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
        )}
      >
        {items.map((p) => (
          <article
            key={p.name}
            className={cn(
              'flex shrink-0 snap-start flex-col rounded-2xl border border-black/[0.07] bg-panel p-6',
              'basis-[85%] sm:basis-[46%] lg:basis-[calc((100%-3*1.25rem)/4)]',
              'shadow-[0_18px_44px_-30px_rgba(11,61,30,0.28)] transition-[border-color] duration-300 hover:border-gold/35',
            )}
          >
            <div className="mb-5 flex h-24 items-center justify-center rounded-xl border border-black/[0.05] bg-white px-3.5">
              {p.logo ? (
                <img
                  src={p.logo}
                  alt={`${p.name} logo`}
                  loading="lazy"
                  className="max-h-14 w-auto max-w-full object-contain"
                />
              ) : (
                <span className="text-center font-display text-[1.12rem] leading-tight font-bold tracking-[-0.02em] text-fg">
                  {p.name}
                </span>
              )}
            </div>
            <span className="mb-2 inline-block font-mono text-[0.64rem] font-bold tracking-[0.14em] text-gold uppercase">
              {p.kind}
            </span>
            <p className="text-[0.88rem] text-fg2">{p.note}</p>
            {p.reel && (
              <button
                type="button"
                onClick={() => setReelOf(p)}
                className="mt-auto inline-flex items-center gap-1.5 self-start pt-3 text-[0.84rem] font-bold text-gold transition-colors duration-300 hover:text-gold2"
                data-testid={`partner-reel-open-${p.name.toLowerCase().replaceAll(' ', '-')}`}
              >
                <span aria-hidden>▸</span> Watch their reel
              </button>
            )}
          </article>
        ))}
      </div>

      {/* controls */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <Arrow label="Previous partners" onClick={() => goTo(index - 1)}>
          ←
        </Arrow>

        <div className="flex items-center gap-2">
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                i === index ? 'w-6 bg-gold' : 'w-2 bg-black/15 hover:bg-black/30',
              )}
            />
          ))}
        </div>

        <Arrow label="Next partners" onClick={() => goTo(index + 1)}>
          →
        </Arrow>
      </div>

      <ReelDialog partner={reelOf} onClose={() => setReelOf(null)} />
    </div>
  )
}

function Arrow({
  label,
  onClick,
  children,
}: {
  label: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid size-9 place-items-center rounded-full border border-black/[0.09] bg-panel text-fg2 transition-colors duration-300 hover:border-gold hover:text-gold"
    >
      {children}
    </button>
  )
}
