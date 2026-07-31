import { DEMO_FALLBACK_EMAIL, HAS_DEMO_FORM } from './config'

/**
 * Tiny event bus so any button on the page can open the single <DemoDialog />
 * mounted in App — no provider, no prop drilling.
 */
const OPEN_EVENT = 'quickbasket:request-demo'

/** Opens the Zoho demo form dialog. */
export function openDemoDialog() {
  window.dispatchEvent(new Event(OPEN_EVENT))
}

/** Subscribes to open requests; returns an unsubscribe function. */
export function onDemoDialogOpen(handler: () => void) {
  window.addEventListener(OPEN_EVENT, handler)
  return () => window.removeEventListener(OPEN_EVENT, handler)
}

/**
 * Props for any "Request a demo" trigger: opens the Zoho form dialog once a
 * form URL is configured, otherwise degrades to a plain mailto link.
 */
export function demoTriggerProps() {
  return HAS_DEMO_FORM
    ? { onClick: openDemoDialog }
    : { href: `mailto:${DEMO_FALLBACK_EMAIL}?subject=QuickBasket%20demo%20request` }
}
