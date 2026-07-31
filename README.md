# QuickBasket — Website (Vite + React + TS + Tailwind)

A modern, fully responsive, component-based marketing site for **QuickBasket** —
*"Fast. Fresh. To Your Doorstep."* — a fresh-grocery & essentials retail network that
puts convenience kiosks **at petrol pumps**. Shop while you fuel up.

## Brand & theme

- **Light, fresh theme** drawn straight from the logo: **green `#0A8A34`** (primary) +
  **orange `#F58A1A`** (energy / CTAs) on a warm cream background.
- Tokens live in `src/index.css` under Tailwind v4 `@theme` — `acid` (green), `gold`
  (orange), `aqua`, `ink/ink2/ink3` (surfaces), `fg/fg2/fg3` (text).
- The logo mark (green basket + orange carrot + bottle) is a hand-built SVG in
  `src/components/icons.tsx`; the wordmark is orange **Quick** / green **Basket**.

## Real media (in `public/`)

- `logo.jpg` — the provided QuickBasket logo
- `store-pump-iocl.jpg` — QuickBasket kiosk at an **IOCL** fuel station (hero image of **The Store**)
- `store-flagship.jpg`, `store-corner.jpg`, `store-neon.jpg` — the storefront gallery in **The Store**
- `quickbasket-story.mp4` (7.8 MB, web-compressed) + `story-poster.jpg` — the explainer
  video, embedded in the **Watch the story** section

## Content

Messaging is drawn from the business's own documents — the white paper, the explainer video,
the **HPCL Convenience Ecosystem** deck, the **EV Café Lounge** deck, and the **leasing/franchise
catalogs**:

- **The Opportunity** — 150,000+ fuel stations, 3,000–5,000 daily vehicles, zero competition
- **The Store** — the real forecourt store formats (kiosk → flagship glass-front)
- **Partners** — the OMC tie-ups: **IOCL** (IndianOil), **HPCL**, **BPCL** — PSU Maharatna
  backing, prime forecourt real estate at up to 35% below-market rent
- **Ways to Partner** — the four catalog models (Own store · Multi-brand · Branded · Advertising)
  with real break-even numbers (8–18 months)
- **Where we're headed** — the **EV Café Lounge** concept (charge · relax · refresh)

## Request a demo → Zoho form

Every "Request a demo" button (nav + mobile drawer + closing CTA) opens a modal
containing a **native React form** that POSTs straight to Zoho CRM's Web-to-Contact
endpoint. There's no iframe: a CRM webform has no hosted permalink (that's Zoho
*Forms*), only an HTML snippet, so the form is rebuilt in the site's own design
system and the record lands in the **Contacts** module.

- `src/lib/zohoForm.ts` — endpoint, the hidden fields Zoho requires (`xnQsjsdp`,
  `xmIwtLD`, `actionType`, `returnURL`, honeypot), the exact India State picklist
  values, and `submitToZoho()` which interprets Zoho's JSON reply.
- `src/components/DemoForm.tsx` — the styled form, inline validation, success state.
- `src/components/DemoDialog.tsx` — the modal shell (Esc / backdrop / × to close).

**Regenerating the form in Zoho changes `xmIwtLD`** — re-copy it into `zohoForm.ts`.
Those identifiers are public by design; the actual protection is the domain whitelist
in the Zoho form's settings, so **quickbasket.org must be registered there** or Zoho
rejects the cross-origin POST.

On success the modal shows Zoho's own splash/thank-you text (`actionvalue`). If the
request can't reach Zoho, an inline error offers `DEMO_FALLBACK_EMAIL` instead.

## Stack

- **Vite 8** — dev server + build
- **React 19** + **TypeScript** — componentized, typed
- **Tailwind CSS v4** — design tokens via `@theme`, mobile-first utilities (`@tailwindcss/vite` plugin)
- No other runtime dependencies — animations are hand-rolled (CSS + a canvas + IntersectionObserver hooks)

## Scripts

```bash
npm install      # once
npm run dev      # dev server (default http://localhost:5173)
npm run build    # type-check (tsc -b) + production build to dist/
npm run preview  # preview the production build
```

## Structure

```
src/
├── main.tsx              # entry
├── App.tsx               # composes all sections
├── index.css            # Tailwind import + @theme design tokens + atmosphere + keyframes
├── hooks/
│   ├── useInView.ts       # IntersectionObserver reveal (with above-the-fold fallback)
│   ├── useCountUp.ts       # eased number counter
│   └── useReducedMotion.ts # prefers-reduced-motion
├── lib/
│   ├── content.ts          # all copy/data, verbatim from the white paper
│   └── cn.ts               # classnames helper
└── components/
    ├── NetworkCanvas.tsx    # animated store-network background
    ├── Nav.tsx              # sticky nav, scroll-spy, mobile burger drawer
    ├── Hero.tsx + PosTerminal.tsx   # hero + live POS simulation
    ├── Stats.tsx            # animated counters
    ├── Platform.tsx         # module cards + cursor glow
    ├── UnifiedDashboard.tsx # JWT + live dashboard mock
    ├── Intelligence.tsx     # tabbed AI panels (gauge / forecast / vendors)
    ├── Architecture.tsx     # 3-tier diagram + event-stream buses
    ├── DataFlow.tsx  Roadmap.tsx  Security.tsx  Kpis.tsx  Future.tsx  Cta.tsx  Footer.tsx
    ├── Reveal.tsx  Button.tsx  SectionHeading.tsx  icons.tsx
```

## Design tokens (Tailwind `@theme`)

Colors: `ink / ink2 / ink3 / panel` (backgrounds), `acid / acid2 / acid3` (lime accent),
`gold`, `aqua`, `fg / fg2 / fg3` (text). Fonts: `font-display` (Bricolage Grotesque),
`font-body` (Manrope), `font-mono` (Space Mono). Use as normal utilities, e.g. `bg-ink text-acid font-display`.

## Responsiveness

Mobile-first with a single clean nav breakpoint at `lg` (1024px):

- **< 1024px** — burger menu + slide-down drawer; grids collapse to 1–2 columns; hero stacks (copy over terminal); buttons and chips wrap; fluid `clamp()` typography.
- **≥ 1024px** — full inline nav; multi-column grids; two-column hero and feature panels.

Every section grid uses `grid-cols-1 sm:grid-cols-2 lg:grid-cols-N`. Animations respect
`prefers-reduced-motion`.

> Verified at 390px (phone) and 768px (tablet) by rendering inside a sized iframe, since
> a fixed layout viewport in the test browser prevented window-resize testing.

## Relationship to `../site`

`../site` is the original self-contained static (HTML/CSS/JS) version. This `app/` is the
Vite + React + TypeScript + Tailwind rebuild with improved responsiveness and componentization.
