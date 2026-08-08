import { FOOTER_COLS } from '../lib/content'

export function Footer() {
  return (
    <footer className="mx-auto max-w-[1200px] px-[clamp(1.1rem,4vw,2.6rem)] pt-16 pb-8">
      <div className="grid grid-cols-1 gap-12 border-b border-black/[0.07] pb-12 lg:grid-cols-[1.4fr_2fr]">
        <div>
          <span className="font-display text-[1.4rem] font-bold tracking-[-0.02em]">
            Quick<span className="text-acid">Basket</span>
          </span>
          <p className="mt-4 max-w-[40ch] text-[0.9rem] text-fg2">
            The all-in-one platform for modern retail — one place to run every store, delight every
            customer, and grow with confidence.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
          {FOOTER_COLS.map((col) => (
            <div key={col.h}>
              <h5 className="mb-4 font-mono text-[0.68rem] tracking-[0.15em] text-fg3 uppercase">{col.h}</h5>
              {col.links.map(([label, href]) => (
                <a key={label} href={href} className="block py-1.5 text-[0.9rem] text-fg2 transition-colors hover:text-acid">
                  {label}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-start gap-4 pt-6 font-mono text-[0.68rem] text-fg3 sm:flex-row sm:items-center sm:justify-between">
        <span>© 2025 QuickBasket. All rights reserved.</span>
        <span className="rounded-md border border-acid/15 px-2.5 py-1 tracking-[0.1em] text-acid3">
          One platform for modern retail
        </span>
        <span>Made in India, for Indian retail.</span>
      </div>
    </footer>
  )
}
