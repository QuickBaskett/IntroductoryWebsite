import { useEffect, useRef } from 'react'
import type { Partner } from '../lib/content'

/**
 * Lightbox for a partner's promo reel (portrait video). Mirrors DemoDialog's
 * modal behavior: Escape/backdrop close, page scroll lock, focus restore.
 */
export function ReelDialog({ partner, onClose }: { partner: Partner | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const restoreRef = useRef<HTMLElement | null>(null)
  const open = Boolean(partner?.reel)

  useEffect(() => {
    if (!open) return
    restoreRef.current = document.activeElement as HTMLElement | null
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      restoreRef.current?.focus?.()
    }
  }, [open, onClose])

  if (!partner?.reel) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(23,37,26,0.6)] px-4 py-6 backdrop-blur-sm motion-safe:animate-panel-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${partner.name} promo reel`}
        className="relative w-[min(400px,100%)] overflow-hidden rounded-3xl bg-black shadow-[0_40px_90px_-30px_rgba(0,0,0,0.7)]"
      >
        <video
          className="block max-h-[82vh] w-full"
          controls
          autoPlay
          playsInline
          poster={partner.reelPoster}
          data-testid="partner-reel-video"
        >
          <source src={partner.reel} type="video/mp4" />
          Your browser doesn’t support embedded video.
        </video>
        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-black/70 to-transparent p-4 pb-8">
          <span className="font-mono text-[0.68rem] tracking-[0.18em] text-white/90 uppercase">
            {partner.name}
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close reel"
            className="pointer-events-auto grid size-9 place-items-center rounded-full bg-black/50 text-white backdrop-blur transition-colors duration-300 hover:bg-black/80"
            data-testid="partner-reel-close"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  )
}
