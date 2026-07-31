import { useEffect, useRef, useState } from 'react'
import { DEMO_FALLBACK_EMAIL, HAS_DEMO_FORM, ZOHO_DEMO_FORM_URL } from '../lib/config'
import { onDemoDialogOpen } from '../lib/demo'

/**
 * Modal that hosts the Zoho demo form. Mounted once in App; opened from
 * anywhere via openDemoDialog(). Falls back to email if no form URL is set.
 */
export function DemoDialog() {
  const [open, setOpen] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)
  const restoreRef = useRef<HTMLElement | null>(null)

  useEffect(
    () =>
      onDemoDialogOpen(() => {
        restoreRef.current = document.activeElement as HTMLElement | null
        setOpen(true)
      }),
    [],
  )

  // esc to close + lock the page behind the modal
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
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
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(23,37,26,0.5)] px-4 py-6 backdrop-blur-sm motion-safe:animate-panel-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false)
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="demo-dialog-title"
        className="flex max-h-[90vh] w-[min(620px,100%)] flex-col overflow-hidden rounded-3xl border border-black/[0.07] bg-panel shadow-[0_40px_90px_-30px_rgba(11,61,30,0.45)]"
      >
        <div className="flex items-start justify-between gap-4 border-b border-black/[0.06] px-6 py-5">
          <div>
            <p className="mb-1.5 inline-flex items-center gap-2 font-mono text-[0.68rem] tracking-[0.2em] text-fg2 uppercase">
              <span className="size-[7px] rounded-full bg-acid shadow-[0_0_10px_var(--color-acid)] motion-safe:animate-pulse-dot" />
              Ready when you are
            </p>
            <h3 id="demo-dialog-title" className="font-display text-[1.5rem] leading-tight font-semibold tracking-[-0.02em]">
              Request a demo
            </h3>
            <p className="mt-1 text-[0.9rem] text-fg2">
              Tell us about your stores — our team gets back within one working day.
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="-mt-1 -mr-1 grid size-9 shrink-0 place-items-center rounded-full border border-black/[0.07] bg-black/[0.02] text-fg2 transition-colors duration-300 hover:border-acid hover:text-acid"
          >
            ✕
          </button>
        </div>

        {HAS_DEMO_FORM ? (
          <>
            <iframe
              src={ZOHO_DEMO_FORM_URL}
              title="QuickBasket demo request form"
              className="min-h-[420px] w-full flex-1 border-0"
              loading="lazy"
            />
            <p className="border-t border-black/[0.06] px-6 py-3 text-center text-[0.78rem] text-fg3">
              Form not loading?{' '}
              <a
                href={ZOHO_DEMO_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-acid hover:underline"
              >
                Open it in a new tab →
              </a>
            </p>
          </>
        ) : (
          <div className="px-6 py-10 text-center">
            <p className="mx-auto max-w-[42ch] text-[0.95rem] text-fg2">
              Our demo request form is being set up. In the meantime, write to us and we&apos;ll
              take it from there.
            </p>
            <a
              href={`mailto:${DEMO_FALLBACK_EMAIL}?subject=QuickBasket%20demo%20request`}
              className="mt-6 inline-flex rounded-full bg-gold px-7 py-3.5 font-bold text-white shadow-[0_10px_28px_-6px_rgba(245,138,26,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold2"
            >
              {DEMO_FALLBACK_EMAIL}
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
