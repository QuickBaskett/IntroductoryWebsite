import { STORE_POINTS } from '../lib/content'
import { Reveal } from './Reveal'
import { asset } from '../lib/asset'

const GALLERY = [
  { src: asset('store-flagship.jpg'), cap: 'Flagship glass-front store' },
  { src: asset('store-corner.jpg'), cap: 'Full corner format' },
  { src: asset('store-neon.jpg'), cap: 'Signature neon frontage' },
]

export function StoreFormat() {
  return (
    <section id="store" className="mx-auto max-w-[1200px] px-[clamp(1.1rem,4vw,2.6rem)] py-[clamp(5rem,11vw,9rem)]">
      <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <Reveal className="order-2 lg:order-1">
          <p className="mb-5 flex items-center gap-2.5 font-mono text-[0.72rem] tracking-[0.28em] text-acid3 uppercase">
            <span className="inline-block size-2 rounded-[3px] bg-gold" /> The Store
          </p>
          <h2 className="font-display text-[clamp(1.9rem,4.6vw,3.5rem)] leading-[1.03] font-semibold tracking-[-0.02em]">
            A bright store,
            <br />
            right on the forecourt.
          </h2>
          <p className="mt-5 max-w-[52ch] text-[1.06rem] text-fg2">
            Unmistakably QuickBasket — from a compact forecourt kiosk to a full glass-front store, we
            drop straight onto a fuel station and open for business in days, not months.
          </p>
          <ul className="mt-7 flex flex-col gap-3">
            {STORE_POINTS.map((s) => (
              <li key={s} className="flex items-start gap-3 text-[0.98rem] text-fg2">
                <span className="mt-0.5 grid size-6 flex-none place-items-center rounded-full bg-acid/12 text-[0.8rem] font-bold text-acid">
                  ✓
                </span>
                {s}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120} className="order-1 lg:order-2">
          <figure className="relative overflow-hidden rounded-3xl border border-black/[0.06] shadow-[0_34px_70px_-34px_rgba(11,61,30,0.4)]">
            <img data-testid="store-hero-image"
              src={asset('store-pump-iocl.jpg')}
              alt="A glowing QuickBasket kiosk beside the fuel pumps at an IOCL petrol station at night"
              className="aspect-[16/11] w-full object-cover"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            <figcaption className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3.5 py-1.5 font-mono text-[0.68rem] text-fg2 shadow-sm backdrop-blur">
              Live at an IOCL fuel station
            </figcaption>
            <span className="absolute top-4 right-4 rounded-full bg-gold px-3 py-1.5 text-[0.68rem] font-bold text-white shadow-[0_8px_20px_-6px_rgba(245,138,26,0.6)]">
              At the pump
            </span>
          </figure>
        </Reveal>
      </div>

      {/* storefront gallery */}
      <Reveal delay={80} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {GALLERY.map((g) => (
          <figure
            key={g.src}
            className="group relative overflow-hidden rounded-2xl border border-black/[0.06] shadow-[0_20px_44px_-30px_rgba(11,61,30,0.35)]"
          >
            <img data-testid={`store-gallery-image-${g.cap.toLowerCase().replaceAll(' ', '-')}`}
              src={g.src}
              alt={`QuickBasket store — ${g.cap}`}
              className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <figcaption className="absolute bottom-3 left-3 font-mono text-[0.66rem] text-white/90">{g.cap}</figcaption>
          </figure>
        ))}
      </Reveal>
    </section>
  )
}
