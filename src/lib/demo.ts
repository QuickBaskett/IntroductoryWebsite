/**
 * Tiny event bus so any button on the page can open the single <DemoDialog />
 * mounted in App — no provider, no prop drilling.
 */
const OPEN_EVENT = 'quickbasket:request-demo'

/** Opens the Request-a-demo dialog. */
export function openDemoDialog() {
  window.dispatchEvent(new Event(OPEN_EVENT))
}

/** Subscribes to open requests; returns an unsubscribe function. */
export function onDemoDialogOpen(handler: () => void) {
  window.addEventListener(OPEN_EVENT, handler)
  return () => window.removeEventListener(OPEN_EVENT, handler)
}

/** Props for any "Request a demo" trigger. */
export function demoTriggerProps() {
  return { onClick: openDemoDialog }
}
