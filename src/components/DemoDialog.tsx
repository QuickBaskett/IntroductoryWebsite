import { useEffect, useRef, useState } from 'react'
import { onDemoDialogOpen } from '../lib/demo'
import { DemoForm } from './DemoForm'

/**
 * Modal that hosts the Request-a-demo form. Mounted once in App; opened from
 * anywhere via openDemoDialog().
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
      data-testid="contact-dialog"
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-[rgba(23,37,26,0.5)] px-4 py-[max(1.5rem,4vh)] backdrop-blur-sm motion-safe:animate-panel-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false)
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="demo-dialog-title"
        className="my-auto w-[min(620px,100%)] overflow-hidden rounded-3xl border border-black/[0.07] bg-panel shadow-[0_40px_90px_-30px_rgba(11,61,30,0.45)]"
      >
        <div className="flex items-start justify-between gap-4 border-b border-black/[0.06] px-6 py-5">
          <div>
            <p className="mb-1.5 inline-flex items-center gap-2 font-mono text-[0.68rem] tracking-[0.2em] text-fg2 uppercase">
              <span className="size-[7px] rounded-full bg-acid shadow-[0_0_10px_var(--color-acid)] motion-safe:animate-pulse-dot" />
              Ready when you are
            </p>
            <h3
              id="demo-dialog-title"
              className="font-display text-[1.5rem] leading-tight font-semibold tracking-[-0.02em]"
            >
              Contact Us
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
            data-testid="contact-dialog-close-button"
          >
            ✕
          </button>
        </div>

        <DemoForm />
      </div>
    </div>
  )
}
