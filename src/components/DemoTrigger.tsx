import type { ReactNode } from 'react'
import { demoTriggerProps } from '../lib/demo'

type DemoTriggerProps = {
  className?: string
  children: ReactNode
  /** Runs in addition to opening the form — e.g. closing the mobile drawer. */
  onClick?: () => void
}

/**
 * Bare "Request a demo" trigger that carries its own classes. Opens the Zoho
 * form dialog, or falls back to a mailto link until a form URL is configured.
 */
export function DemoTrigger({ className, children, onClick }: DemoTriggerProps) {
  const props = demoTriggerProps()

  if ('href' in props) {
    return (
      <a href={props.href} onClick={onClick} className={className}>
        {children}
      </a>
    )
  }

  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        onClick?.()
        props.onClick()
      }}
    >
      {children}
    </button>
  )
}
