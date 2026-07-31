import { useEffect, useState } from 'react'
import { NAV_LINKS } from '../lib/content'
import { BrandMark } from './icons'
import { DemoTrigger } from './DemoTrigger'
import { cn } from '../lib/cn'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // scroll-spy
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1))
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { threshold: 0.5 },
    )
    sections.forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-6 px-[clamp(1.1rem,4vw,2.6rem)] transition-all duration-300',
        scrolled
          ? 'border-b border-black/[0.06] bg-[rgba(252,251,246,0.82)] py-2.5 shadow-[0_8px_30px_-16px_rgba(11,61,30,0.2)] backdrop-blur-lg backdrop-saturate-150'
          : 'border-b border-transparent py-4',
      )}
    >
      <a href="#top" className="flex items-center gap-2.5" aria-label="QuickBasket home">
        <BrandMark size={34} />
        <span className="font-display text-[1.28rem] font-extrabold tracking-[-0.02em] text-gold">
          Quick<span className="text-acid">Basket</span>
        </span>
      </a>

      <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
        {NAV_LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className={cn(
              'group relative py-0.5 text-[0.9rem] font-medium transition-colors',
              active === l.href.slice(1) ? 'text-fg' : 'text-fg2 hover:text-fg',
            )}
          >
            {l.label}
            <span
              className={cn(
                'absolute -bottom-0.5 left-0 h-px bg-acid transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)]',
                active === l.href.slice(1) ? 'w-full' : 'w-0 group-hover:w-full',
              )}
            />
          </a>
        ))}
      </nav>

      <div className="hidden items-center gap-2.5 lg:flex">
        <DemoTrigger className="rounded-full bg-gold px-5 py-2.5 text-[0.9rem] font-bold text-white shadow-[0_10px_26px_-8px_rgba(245,138,26,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold2">
          Request Demo
        </DemoTrigger>
      </div>

      {/* burger */}
      <button
        className="flex flex-col gap-1.5 p-1.5 lg:hidden"
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span
          className={cn('h-0.5 w-6 bg-fg transition-transform duration-300', open && 'translate-y-2 rotate-45')}
        />
        <span className={cn('h-0.5 w-6 bg-fg transition-all duration-300', open && 'opacity-0')} />
        <span
          className={cn('h-0.5 w-6 bg-fg transition-transform duration-300', open && '-translate-y-2 -rotate-45')}
        />
      </button>

      {/* mobile drawer */}
      <div
        className={cn(
          'absolute inset-x-0 top-full origin-top border-b border-black/[0.06] bg-[rgba(252,251,246,0.98)] px-8 shadow-[0_16px_30px_-18px_rgba(11,61,30,0.25)] backdrop-blur-lg transition-all duration-300 lg:hidden',
          open ? 'visible py-6 opacity-100' : 'invisible py-0 opacity-0',
        )}
      >
        <nav className="flex flex-col gap-4">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-[1.05rem] font-medium text-fg2 hover:text-acid"
            >
              {l.label}
            </a>
          ))}
          <DemoTrigger
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-gold px-5 py-3 text-center font-bold text-white"
          >
            Request Demo
          </DemoTrigger>
        </nav>
      </div>
    </header>
  )
}
