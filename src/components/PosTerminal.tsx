import { useEffect, useState } from 'react'
import { NBO_POOL, POS_ITEMS } from '../lib/content'
import { useReducedMotion } from '../hooks/useReducedMotion'

const money = (n: number) => '₹' + n.toLocaleString('en-IN')

type Sale = {
  id: number
  lines: [string, number][]
  gst: number
  total: number
  count: number
  nbo: string
  latency: string
}

function makeSale(id: number, reduced: boolean): Sale {
  if (reduced) {
    const lines = POS_ITEMS.slice(0, 4)
    const subtotal = lines.reduce((s, [, p]) => s + p, 0)
    const gst = Math.round(subtotal * 0.05)
    return { id, lines, gst, total: subtotal + gst, count: lines.length, nbo: NBO_POOL[0], latency: '2.41' }
  }
  const count = Math.floor(Math.random() * 3) + 4
  const lines = [...POS_ITEMS].sort(() => Math.random() - 0.5).slice(0, count)
  const subtotal = lines.reduce((s, [, p]) => s + p, 0)
  const gst = Math.round(subtotal * 0.05)
  return {
    id,
    lines,
    gst,
    total: subtotal + gst,
    count,
    nbo: NBO_POOL[id % NBO_POOL.length],
    latency: (2 + Math.random() * 0.85).toFixed(2),
  }
}

export function PosTerminal() {
  const reduced = useReducedMotion()
  const [sale, setSale] = useState<Sale>(() => makeSale(0, false))

  useEffect(() => {
    setSale(makeSale(0, reduced))
    if (reduced) return
    let id = 1
    const t = setInterval(() => setSale(makeSale(id++, false)), 5200)
    return () => clearInterval(t)
  }, [reduced])

  return (
    <div className="overflow-hidden rounded-2xl border border-acid/15 bg-gradient-to-b from-panel/90 to-ink2/90 font-mono shadow-[0_30px_80px_-30px_rgba(11,61,30,0.16)] backdrop-blur-sm">
      {/* head */}
      <div className="flex items-center gap-3 border-b border-black/[0.06] bg-black/[0.02] px-4 py-3">
        <span className="flex gap-1.5">
          <i className="size-2.5 rounded-full bg-gold/70" />
          <i className="size-2.5 rounded-full bg-acid/60" />
          <i className="size-2.5 rounded-full bg-black/15" />
        </span>
        <span className="flex-1 text-[0.72rem] text-fg2">QuickBasket · Pump Store · Pune</span>
        <span className="rounded border border-acid/15 bg-acid/[0.06] px-1.5 py-0.5 text-[0.6rem] tracking-[0.15em] text-acid">
          ONLINE
        </span>
      </div>

      {/* body */}
      <div key={sale.id} className="min-h-[210px] px-4 py-4 text-[0.78rem] leading-[1.9]">
        {sale.lines.map(([name, price], i) => (
          <div
            key={i}
            className="term-line flex justify-between"
            style={{ animationDelay: reduced ? '0ms' : `${i * 340}ms` }}
          >
            <span className="text-fg">{name}</span>
            <span className="text-fg2">{money(price)}</span>
          </div>
        ))}
        <div
          className="term-line flex justify-between text-[0.72rem] text-fg3"
          style={{ animationDelay: reduced ? '0ms' : `${sale.count * 340}ms` }}
        >
          <span>GST @ 5% · CGST+SGST</span>
          <span>{money(sale.gst)}</span>
        </div>
        <div
          className="term-line mt-2 flex justify-between border-t border-dashed border-black/[0.07] pt-2 font-bold text-acid"
          style={{ animationDelay: reduced ? '0ms' : `${sale.count * 340 + 120}ms` }}
        >
          <span>TOTAL · {sale.count} items</span>
          <span>{money(sale.total)}</span>
        </div>
      </div>

      {/* foot */}
      <div className="flex items-center justify-between gap-4 border-t border-black/[0.06] bg-black/[0.02] px-4 py-3">
        <div className="flex flex-col gap-0.5">
          <span className="text-[0.58rem] tracking-[0.14em] text-gold">AI · Next Best Offer</span>
          <span className="text-[0.74rem] text-fg">{sale.nbo}</span>
        </div>
        <div className="text-right text-[0.66rem] text-fg3">
          <span className="text-acid">{sale.latency}</span>s · basket rung up
        </div>
      </div>
    </div>
  )
}
