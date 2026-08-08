import type { ReactNode } from 'react'
import { openDemoDialog } from '../lib/demo'

type DemoTriggerProps = {
  className?: string
  children: ReactNode
  'data-testid'?: string
  /** Runs in addition to opening the form — e.g. closing the mobile drawer. */
  onClick?: () => void
}

/** Bare "Request a demo" trigger that carries its own classes. */
export function DemoTrigger({ className, children, onClick, 'data-testid': testId }: DemoTriggerProps) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        onClick?.()
        openDemoDialog()
      }}
      data-testid={testId ?? 'contact-dialog-trigger'}
    >
      {children}
    </button>
  )
}
