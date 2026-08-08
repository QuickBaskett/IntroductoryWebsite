/* ══════════════════════════════════════════════════════════════
   Content model — business-led messaging for QuickBasket.
   Focuses on outcomes and value, not implementation details.
   ══════════════════════════════════════════════════════════════ */

import { asset } from './asset'

export const NAV_LINKS = [
  { label: 'Opportunity', href: '#market' },
  { label: 'The Store', href: '#store' },
  { label: 'Partners', href: '#omc' },
  { label: 'Network', href: '#network' },
  { label: 'The Model', href: '#model' },
  { label: 'Watch', href: '#video' },
] as const

// Hero trust badges
export const HERO_CHIPS = [
  { b: 'Fast. Fresh.', t: 'to your doorstep' },
  { b: 'At the pump', t: 'built-in footfall' },
  { b: 'Offline-ready', t: 'checkout never stops' },
  { b: 'AI-powered', t: 'stock & loyalty' },
] as const

export type Stat = {
  target: number
  decimals?: number
  compact?: boolean
  prefix?: string
  suffix?: string
  label: string
  ref?: string
}

export const STATS: Stat[] = [
  { target: 150000, compact: true, suffix: '+', label: 'Fuel stations across India' },
  { target: 5000, compact: true, label: 'Daily vehicles per station' },
  { target: 14, prefix: '~', suffix: ' mo', label: 'To break even' },
  { target: 8, suffix: '%', label: 'Yearly market growth' },
  { target: 3, prefix: '<', suffix: 's', label: 'To ring up a basket' },
]

export type Module = {
  title: string
  body: string
  tags: string[]
  icon: string
}

export const MODULES: Module[] = [
  {
    title: 'Roles & Access',
    body: 'Give every manager, cashier and vendor exactly the access they need — and one secure login per partner unlocks every store you own.',
    tags: ['One login', 'Every store'],
    icon: 'user',
  },
  {
    title: 'Inventory',
    body: 'Live stock across every location, automatic low-stock alerts, and expiry tracking that cuts costly waste on fresh produce.',
    tags: ['Live stock', 'Less waste'],
    icon: 'box',
  },
  {
    title: 'Purchasing',
    body: 'From reorder to received — raise requisitions, approve purchase orders in a tap, and score every vendor on reliability.',
    tags: ['Faster POs', 'Better vendors'],
    icon: 'clipboard',
  },
  {
    title: 'Checkout & Billing',
    body: 'A till your cashiers love — a full basket rung up in under three seconds, always-accurate GST, and every payment type.',
    tags: ['Under 3s', 'Any payment'],
    icon: 'pos',
  },
  {
    title: 'Owner Dashboard',
    body: 'See every location at a glance, then drill into any single store — no juggling logins, no wrestling with spreadsheets.',
    tags: ['All stores', 'One view'],
    icon: 'grid',
  },
  {
    title: 'New Locations',
    body: 'Browse and apply for retail space at partner petrol pumps, with every application flowing straight into onboarding.',
    tags: ['Grow faster', 'Easy apply'],
    icon: 'building',
  },
]

// Who it's for — role-based business value
export type Audience = { role: string; gain: string; icon: string }

export const AUDIENCE: Audience[] = [
  {
    role: 'Shoppers on the go',
    gain: 'Grab fresh groceries and daily essentials in seconds — right where you already stop to fuel up every week.',
    icon: 'pos',
  },
  {
    role: 'Franchise partners',
    gain: 'A proven, capital-light store format with built-in footfall and a 10–14 month payback — not years.',
    icon: 'grid',
  },
  {
    role: 'Fuel-station owners',
    gain: 'Turn idle forecourt space into a fresh revenue stream on a simple revenue-share — zero hassle to run.',
    icon: 'building',
  },
  {
    role: 'Suppliers & vendors',
    gain: 'Reach a fast-growing network of high-traffic stores, with real-time demand data guiding every order.',
    icon: 'clipboard',
  },
]

/* The petrol-pump opportunity */
export const MARKET_POINTS = [
  { ic: '🚗', b: 'Built-in footfall', t: '3,000–5,000 vehicles roll through a single station every day. Your customers are already there.' },
  { ic: '🎯', b: 'Zero competition', t: 'No rival store shares the forecourt — a captive convenience zone with nowhere else to shop.' },
  { ic: '🔁', b: 'Guaranteed repeat visits', t: 'People refuel every week, and every visit is a fresh chance to fill a basket.' },
]

/* Why we win vs. traditional high-street retail */
export const WHY_WE_WIN = [
  { metric: 'Rent', high: 'High & fixed', qb: 'Low / revenue-share' },
  { metric: 'Footfall', high: 'You hunt for it', qb: 'Built-in at the pump' },
  { metric: 'Licensing & setup', high: 'Months of paperwork', qb: 'Near-zero, plug-and-play' },
  { metric: 'Break-even', high: '24–36 months', qb: '10–14 months' },
]

/* Ways to partner — the four QuickBasket models */
export type BizModel = { tag: string; title: string; body: string; meta: string; icon: string }

export const BUSINESS_MODELS: BizModel[] = [
  { tag: 'Own store', title: 'Open your own', body: 'Launch an independent branded store at a prime, PSU-backed site — rent 25% below market.', meta: 'Break-even 12–18 mo', icon: 'building' },
  { tag: 'Multi-brand', title: 'Franchise 25+ brands', body: 'A multi-brand outlet with single-window approvals and rich cross-selling under one roof.', meta: 'Break-even 10–14 mo', icon: 'grid' },
  { tag: 'Branded', title: 'A QuickBasket store', body: 'Our full brand, design and supply chain — 35% below-market rent with PSU Maharatna backing.', meta: 'Break-even 8–12 mo', icon: 'user' },
  { tag: 'Advertising', title: 'Advertise with us', body: 'Reach high-footfall forecourts across 100+ sites at 50% below market advertising rates.', meta: 'From ₹5,000 / mo', icon: 'pos' },
]

/* The store format */
export const STORE_POINTS = [
  'From compact forecourt kiosks to full glass-front stores',
  'Fresh produce, daily essentials, packaged foods and medicines',
  'Digital checkout, live inventory and offline-first billing',
  'Right beside the fuel payment — shop while you pay',
]

/* OMC (Oil Marketing Company) tie-ups */
export const OMC_PARTNERS = [
  { abbr: 'IOCL', logo: asset('iocl-logo.svg'), name: 'IndianOil', note: 'India’s largest fuel retailer — an unmatched national forecourt network.', color: '#F26522' },
  { abbr: 'HPCL', logo: asset('hpcl-logo.svg'), name: 'Hindustan Petroleum', note: 'A Maharatna PSU with a dominant, under-monetised real-estate footprint.', color: '#0a5aa8' },
  { abbr: 'BPCL', logo: asset('bpcl-logo.svg'), name: 'Bharat Petroleum', note: 'A Maharatna PSU bringing prime highway and city forecourt sites.', color: '#0067b1' },
]

/* Brand & supply-side partners, shown in the #omc carousel. `logo` is
   optional — partners without artwork fall back to a wordmark plate. */
export type Partner = { name: string; kind: string; note: string; logo?: string }

export const STRATEGIC_PARTNERS: Partner[] = [
  {
    name: 'ITC',
    kind: 'FMCG brands',
    note: 'One of India’s largest FMCG houses — the everyday names shoppers look for.',
    logo: asset('itc-logo.svg'),
  },
  {
    name: 'Bikaner Bites',
    kind: 'Sweets & bakery',
    note: 'Sweets, bakes and savoury snacking made for the impulse aisle.',
    logo: asset('bikaner-bites-logo.png'),
  },
  {
    name: 'Vadilal',
    kind: 'Frozen & dairy',
    note: 'A household ice-cream and frozen-foods brand for the cold aisle.',
    logo: asset('vadilal-logo.png'),
  },
  {
    name: 'STPI',
    kind: 'Campus space',
    note: 'Cafeteria space inside Software Technology Parks of India buildings.',
    logo: asset('stpi-logo.svg'),
  },
  {
    name: 'Food on Wheels',
    kind: 'Food services',
    note: 'On-the-go food formats built for forecourt footfall.',
    logo: asset('food-on-wheels-logo.png'),
  },
]

/* Government programmes behind the business. */
export const GOVT_SUPPORT = [
  {
    name: 'Startup India',
    logo: asset('startup-india-logo.png'),
    note: 'The Government of India’s national startup programme.',
  },
  {
    name: 'DAY-NRLM · Aajeevika',
    logo: asset('nrlm-logo.png'),
    note: 'The Ministry of Rural Development’s rural livelihoods mission.',
  },
]

export const OMC_PROOF = [
  { b: 'Up to 35%', t: 'below-market rent on prime sites' },
  { b: 'PSU Maharatna', t: 'backing you can trust' },
  { b: '22,000+', t: 'OMC charge points by 2030' },
]

export type IntelTab = 'customer' | 'restock' | 'market'

export const INTEL_TABS: { key: IntelTab; label: string }[] = [
  { key: 'customer', label: 'Customer Loyalty' },
  { key: 'restock', label: 'Smart Restocking' },
  { key: 'market', label: 'Market & Vendors' },
]

export const INTEL_CONTENT: Record<
  IntelTab,
  { title: string; lede: string; features: { ic: string; b: string; t: string }[] }
> = {
  customer: {
    title: 'Turn every basket into a loyal customer',
    lede: 'QuickBasket learns your shoppers’ habits and hands your team the moment that matters — a timely offer, a personal touch, a reason to come back.',
    features: [
      { ic: '↺', b: 'Win back at-risk customers', t: 'Spot shoppers who are drifting away and re-engage them before they’re gone for good.' },
      { ic: '✦', b: 'The perfect next offer', t: 'Suggest exactly the right product at checkout — bigger baskets, happier customers.' },
      { ic: '◈', b: 'Know your best regulars', t: 'See each customer’s long-term worth so your team can roll out the red carpet where it counts.' },
    ],
  },
  restock: {
    title: 'Never overstock. Never run dry.',
    lede: 'Reactive low-stock alarms become a proactive, money-saving engine — QuickBasket drafts the right order at the right moment, on its own.',
    features: [
      { ic: '∿', b: 'Predict what will sell', t: 'Know what each store will need — days and weeks ahead — right down to the individual product.' },
      { ic: '⛨', b: 'Just enough buffer', t: 'Hold the right amount of safety stock: never too much cash tied up, never an empty shelf.' },
      { ic: '⟳', b: 'Orders that draft themselves', t: 'The right purchase order at the right time — and stock moved between stores before you run out.' },
    ],
  },
  market: {
    title: 'Sharper pricing, stronger suppliers',
    lede: 'Strategic insight for owners and buyers — see how price moves demand, catch trends early, and back your best partners.',
    features: [
      { ic: '₹', b: 'Price with confidence', t: 'See exactly how price changes move your sales — and stay a step ahead of the competition.' },
      { ic: '◎', b: 'Catch trends early', t: 'Spot emerging products and flavours before they peak, so your shelves stock what shoppers want next.' },
      { ic: '★', b: 'Back your best vendors', t: 'Score every supplier on reliability and price, and steer more orders to the ones who deliver.' },
    ],
  },
}

export const VENDORS: [string, number][] = [
  ['Sunrise Foods', 94],
  ['GreenLeaf Agro', 88],
  ['Metro Distributors', 71],
  ['Nimbus Supply Co.', 63],
]

export type ArchLayer = {
  key: 'edge' | 'core' | 'intel'
  tag: string
  accent: string
  desc: string
  nodes: { b: string; s: string }[]
}

// "Why QuickBasket" — reliability & scale, told as business benefits
export const ARCH_LAYERS: ArchLayer[] = [
  {
    key: 'edge',
    tag: 'On the shop floor',
    accent: 'aqua',
    desc: 'Your checkout keeps running even if the internet drops — sales, stock and receipts never skip a beat.',
    nodes: [
      { b: 'Never-down checkout', s: 'sells even offline' },
      { b: 'Live local stock', s: 'always accurate' },
      { b: 'Catches up instantly', s: 'when back online' },
    ],
  },
  {
    key: 'core',
    tag: 'Across your whole chain',
    accent: 'acid',
    desc: 'One live source of truth for every store, product, order and vendor — no more reconciling spreadsheets at month-end.',
    nodes: [
      { b: 'One secure login', s: 'every location' },
      { b: 'Live master catalog', s: 'prices & GST' },
      { b: 'Central purchasing', s: 'approve anywhere' },
      { b: 'Chain-wide stock', s: 'at a glance' },
    ],
  },
  {
    key: 'intel',
    tag: 'Working behind the scenes',
    accent: 'gold',
    desc: 'Intelligence that never clocks out — forecasting demand, flagging at-risk customers, and drafting your next orders automatically.',
    nodes: [
      { b: 'Demand forecasts', s: 'store by store' },
      { b: 'Customer insights', s: 'loyalty & churn' },
      { b: 'Auto-restocking', s: 'drafts your orders' },
      { b: 'Instant reports', s: 'chain-wide' },
    ],
  },
]

// Business trust points (was: database technologies)
export const DATABASES = [
  { b: 'Always on', s: '99.5% uptime — and it sells even offline' },
  { b: 'Scales with you', s: 'from your first store to fifty thousand' },
  { b: 'Bank-grade security', s: 'your data encrypted end to end' },
  { b: 'One source of truth', s: 'live and accurate across every store' },
]

export const FLOW_STEPS = [
  { n: '01', b: 'Every sale', t: 'A cashier rings up a basket — stock updates on the spot, even with no internet in the store.' },
  { n: '02', b: 'One place', t: 'The moment it happens, that sale flows into a single, live view of your entire business.' },
  { n: '03', b: 'Real insight', t: 'QuickBasket studies the patterns — what’s selling, who’s loyal, and what’s about to run low.' },
  { n: '04', b: 'Ready to act', t: 'It hands back what matters: an order to approve, a customer to win back, a trend to jump on.' },
]

export const PHASES = [
  {
    tag: 'Step 1',
    time: '~6 months',
    title: 'Get up and running',
    body: 'Get your stores on one modern platform — checkout, inventory, purchasing and GST billing, online and off.',
    list: ['Point-of-sale & GST billing', 'Live inventory & purchasing', 'Works across every store, even offline'],
    bar: 100,
  },
  {
    tag: 'Step 2',
    time: 'Intelligence',
    title: 'Switch on the smarts',
    body: 'Turn on the intelligence layer — smarter restocking, customer loyalty insights, and supplier scorecards.',
    list: ['Automatic demand forecasting', 'Customer loyalty & win-back', 'Supplier performance scoring'],
    bar: 64,
  },
  {
    tag: 'Step 3',
    time: 'Growth',
    title: 'Grow beyond retail',
    body: 'Adapt the platform to any industry and open it up as a marketplace — new markets, new revenue streams.',
    list: ['Adapt to any industry', 'Open marketplace platform', 'New partner revenue'],
    bar: 32,
  },
]

// Trust & compliance — told in plain business terms
export const SECURITY = [
  { ic: '⛨', h: 'Secure sign-in', p: 'Everyone signs in securely and sees only what their role allows — nothing more, nothing less.', ref: '' },
  { ic: '▫', h: 'The right access for each role', p: 'Cashiers, managers, owners and vendors each get exactly the access their job needs.', ref: '' },
  { ic: '\u{1f512}', h: 'Your data, encrypted', p: 'Sales, customer and financial data is protected at every step — while it moves and while it’s stored.', ref: '' },
  { ic: '₹', h: 'GST-ready, always', p: 'Accurate CGST, SGST and IGST, statutory invoices, and registers that make filing returns painless.', ref: '' },
  { ic: '◍', h: 'A complete audit trail', p: 'Every sale, refund and stock change is recorded — a full, tamper-proof history you can trust.', ref: '' },
  { ic: '◉', h: 'Data that stays in India', p: 'Hosted in compliant data centres with strict privacy controls over your customers’ information.', ref: '' },
]

export const KPIS = [
  { d: '↓', s: 'Inventory holding cost', p: 'Leaner stock frees up your cash.' },
  { d: '↓', s: 'Stock-outs', p: 'Fewer empty shelves, fewer lost sales.' },
  { d: '↑', s: 'Forecast accuracy', p: 'Order the right amount, every time.' },
  { d: '↑', s: 'Customer lifetime value', p: 'Loyalty that pays off for years.' },
  { d: '↑', s: 'Average basket size', p: 'The right offer at the right moment.' },
  { d: '↓', s: 'Customer churn', p: 'Win people back before they leave.' },
  { d: '↑', s: 'Vendor reliability', p: 'Order from partners who deliver.' },
  { d: '↓', s: 'Time to reporting', p: 'Chain-wide answers in seconds.' },
]

export const FUTURE = [
  { h: 'EV Café Lounge', p: 'Turn EV charging downtime into a destination — café, Wi-Fi and shopping while you charge. India needs 100,000+ charge points by 2030; the OMCs alone are adding 22,000+.' },
  { h: 'An open marketplace', p: 'Open our vendor, inventory and order tools to other businesses — a marketplace platform with its own revenue.' },
  { h: 'Beyond groceries', p: 'The same forecourt model, extended to pharmacy, F&B and services — new categories, the same captive footfall.' },
]

export const FOOTER_COLS = [
  { h: 'Platform', links: [['What it does', '#platform'], ['Who it’s for', '#audience'], ['Intelligence', '#intelligence']] },
  { h: 'Why QuickBasket', links: [['Built for scale', '#architecture'], ['How it works', '#flow'], ['Trust & security', '#security']] },
  { h: 'Company', links: [['Your rollout', '#roadmap'], ['Where we’re headed', '#future'], ['Talk to us', '#contact']] },
] as const

/* Checkout demo data */
export const POS_ITEMS: [string, number][] = [
  ['Amul Gold Milk · 1L', 66],
  ['Aashirvaad Atta · 5kg', 285],
  ['Tata Salt · 1kg', 28],
  ['Maggi Noodles · 12pk', 168],
  ['Banana · 1 dozen', 59],
  ['Amul Butter · 500g', 275],
  ['Britannia Bread', 45],
  ['Colgate MaxFresh', 99],
]

export const NBO_POOL = [
  'Organic Almond Milk · 1L',
  'Dark Chocolate · 90g',
  'Cold Brew Concentrate',
  'Greek Yogurt · 400g',
  'Trail Mix · 250g',
]

/* ── Store network map (#network) ─────────────────────────────
   The six states QuickBasket currently trades in, ordered by outlet
   count (they sum to NETWORK_TOTAL). `id` must match a state id in
   indiaMap.ts so the map can shade the live states. lat/lng place the
   marker — a representative point in each state, not a centroid.
   Uttarakhand's 43 come from the outlet tracker ("Quickbasket
   Rebranding.xlsx" — Dehradun 17 / Haridwar 13 / Tehri Block 13). */

export type NetworkState = {
  name: string
  id: string
  outlets: number
  lat: number
  lng: number
  sub: string
}

export const NETWORK_LIVE: NetworkState[] = [
  {
    name: 'Uttarakhand',
    id: 'uttarakhand',
    outlets: 43,
    lat: 30.2,
    lng: 78.3,
    sub: 'Home state — Dehradun, Haridwar, Roorkee & Tehri Garhwal',
  },
  {
    name: 'Himachal Pradesh',
    id: 'himachal-pradesh',
    outlets: 30,
    lat: 31.1,
    lng: 77.17,
    sub: 'Hill-highway forecourts on the Shimla and Manali routes',
  },
  {
    name: 'Haryana',
    id: 'haryana',
    outlets: 24,
    lat: 29.2,
    lng: 76.3,
    sub: 'National-highway corridors and satellite-town forecourts',
  },
  {
    name: 'Uttar Pradesh',
    id: 'uttar-pradesh',
    outlets: 20,
    lat: 26.85,
    lng: 80.95,
    sub: 'Expressway and city sites across the state',
  },
  {
    name: 'Delhi / NCR',
    id: 'nct-of-delhi',
    outlets: 18,
    lat: 28.61,
    lng: 77.21,
    sub: 'Dense urban forecourts across the capital region',
  },
  {
    name: 'Telangana',
    id: 'telangana',
    outlets: 15,
    lat: 17.38,
    lng: 78.49,
    sub: 'Our southern beachhead, anchored on Hyderabad',
  },
]

export const NETWORK_TOTAL = NETWORK_LIVE.reduce((n, c) => n + c.outlets, 0)

/** Live states — drives both the map shading and the proof strip. */
export const NETWORK_STATE_COUNT = NETWORK_LIVE.length

/** Stores active nationwide. */
export const NETWORK_ACTIVE_STORES = '150+'

export const NETWORK_PROOF = [
  { b: NETWORK_ACTIVE_STORES, t: 'Stores already active across India' },
  { b: `${NETWORK_STATE_COUNT}`, t: 'Active states, and counting' },
  { b: '150k+', t: 'Forecourts across India to grow into' },
] as const
