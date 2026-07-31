import { FLOW_STEPS } from '../lib/content'
import { SectionHeading } from './SectionHeading'
import { Reveal } from './Reveal'

export function DataFlow() {
  return (
    <section id="flow" className="mx-auto max-w-[1200px] px-[clamp(1.1rem,4vw,2.6rem)] py-[clamp(5rem,11vw,9rem)]">
      <SectionHeading
        num="06"
        kicker="How it works"
        title={
          <>
            Every sale makes your
            <br />
            whole business smarter.
          </>
        }
        lede="One scan at the counter quietly becomes a nationwide insight — no extra work for your team, no data entry, no waiting for the month-end report."
      />
      <ol className="mt-13 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        {FLOW_STEPS.map((s, i) => (
          <Reveal as="li" key={s.n} delay={(i % 4) * 60} className="relative pt-11">
            <span className="absolute -top-0 left-[calc(2.1rem-1px)] hidden h-px w-[calc(100%-1rem)] bg-gradient-to-r from-acid/15 to-transparent sm:block" />
            <span className="absolute top-0 left-0 grid size-[2.1rem] place-items-center rounded-lg border border-acid/15 bg-ink font-mono text-[0.8rem] text-acid">
              {s.n}
            </span>
            <b className="mb-1.5 block font-display text-[1.2rem] font-semibold">{s.b}</b>
            <p className="text-[0.9rem] text-fg2">{s.t}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}
