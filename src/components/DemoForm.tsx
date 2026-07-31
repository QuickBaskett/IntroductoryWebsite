import { useId, useState } from 'react'
import { cn } from '../lib/cn'
import { DEMO_FALLBACK_EMAIL } from '../lib/config'
import {
  FIELD,
  formatMobile,
  INDIA_STATES,
  isValidEmail,
  isValidMobile,
  stateLabel,
  submitToZoho,
} from '../lib/zohoForm'

type Values = Record<string, string>
type Errors = Record<string, string | undefined>

const EMPTY: Values = {
  [FIELD.firstName]: '',
  [FIELD.lastName]: '',
  [FIELD.mobile]: '',
  [FIELD.email]: '',
  [FIELD.city]: '',
  [FIELD.state]: '',
}

const MAXLEN: Record<string, number> = {
  [FIELD.firstName]: 40,
  [FIELD.lastName]: 80,
  [FIELD.mobile]: 30,
  [FIELD.email]: 100,
  [FIELD.city]: 255,
}

const inputCls =
  'w-full rounded-xl border border-black/[0.09] bg-white px-3.5 py-2.5 text-[0.95rem] text-fg ' +
  'placeholder:text-fg3 transition-colors duration-200 outline-none ' +
  'focus:border-acid focus:ring-2 focus:ring-acid/20'

/** QuickBasket-styled front end for the Zoho CRM Web-to-Contact form. */
export function DemoForm() {
  const uid = useId()
  const [values, setValues] = useState<Values>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [consent, setConsent] = useState(false)
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState<string | null>(null)
  const [failure, setFailure] = useState<string | null>(null)

  const set = (name: string, value: string) => {
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }))
  }

  const validate = () => {
    const next: Errors = {}
    if (!values[FIELD.firstName].trim()) next[FIELD.firstName] = 'First name is required'
    if (!values[FIELD.lastName].trim()) next[FIELD.lastName] = 'Last name is required'
    const mobile = values[FIELD.mobile].trim()
    if (!mobile) next[FIELD.mobile] = 'Mobile number is required'
    else if (!isValidMobile(mobile))
      next[FIELD.mobile] = 'Enter a valid 10-digit Indian mobile number'
    if (!values[FIELD.city].trim()) next[FIELD.city] = 'City is required'
    if (!values[FIELD.state]) next[FIELD.state] = 'Please pick a state'
    const email = values[FIELD.email].trim()
    if (email && !isValidEmail(email)) next[FIELD.email] = 'Please enter a valid email address'
    if (!consent) next.consent = 'Please tick this to continue'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFailure(null)
    if (!validate()) return
    setBusy(true)
    const result = await submitToZoho({
      ...values,
      [FIELD.mobile]: formatMobile(values[FIELD.mobile]),
    })
    setBusy(false)
    if (result.ok) setDone(result.message)
    else setFailure(result.message)
  }

  if (done) {
    return (
      <div className="px-6 py-12 text-center">
        <div className="mx-auto grid size-14 place-items-center rounded-full bg-acid/10 text-[1.6rem] text-acid">
          ✓
        </div>
        <h4 className="mt-5 font-display text-[1.4rem] font-semibold tracking-[-0.02em]">
          You&apos;re on the list
        </h4>
        <p className="mx-auto mt-2 max-w-[42ch] text-[0.95rem] text-fg2">{done}</p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4 px-6 py-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field
          id={`${uid}-first`}
          label="First name"
          required
          error={errors[FIELD.firstName]}
          value={values[FIELD.firstName]}
          maxLength={MAXLEN[FIELD.firstName]}
          autoComplete="given-name"
          placeholder="Kshitij"
          onChange={(v) => set(FIELD.firstName, v)}
        />
        <Field
          id={`${uid}-last`}
          label="Last name"
          required
          error={errors[FIELD.lastName]}
          value={values[FIELD.lastName]}
          maxLength={MAXLEN[FIELD.lastName]}
          autoComplete="family-name"
          placeholder="Agarwal"
          onChange={(v) => set(FIELD.lastName, v)}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field
          id={`${uid}-mobile`}
          label="Mobile"
          required
          error={errors[FIELD.mobile]}
          value={values[FIELD.mobile]}
          maxLength={MAXLEN[FIELD.mobile]}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+91 98765 43210"
          onChange={(v) => set(FIELD.mobile, v)}
        />
        <Field
          id={`${uid}-email`}
          label="Email"
          error={errors[FIELD.email]}
          value={values[FIELD.email]}
          maxLength={MAXLEN[FIELD.email]}
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          onChange={(v) => set(FIELD.email, v)}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field
          id={`${uid}-city`}
          label="City"
          required
          error={errors[FIELD.city]}
          value={values[FIELD.city]}
          maxLength={MAXLEN[FIELD.city]}
          autoComplete="address-level2"
          placeholder="Dehradun"
          onChange={(v) => set(FIELD.city, v)}
        />
        <div>
          <Label htmlFor={`${uid}-state`} required>
            State
          </Label>
          <select
            id={`${uid}-state`}
            value={values[FIELD.state]}
            onChange={(e) => set(FIELD.state, e.target.value)}
            aria-invalid={Boolean(errors[FIELD.state])}
            className={cn(
              inputCls,
              'appearance-none bg-[length:0.65rem] bg-[right_1rem_center] bg-no-repeat pr-9',
              !values[FIELD.state] && 'text-fg3',
              errors[FIELD.state] && 'border-red-400 focus:border-red-400 focus:ring-red-200',
            )}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' fill='none' stroke='%23566a54' stroke-width='1.6'/%3E%3C/svg%3E\")",
            }}
          >
            <option value="">Select a state</option>
            {INDIA_STATES.map((s) => (
              <option key={s} value={s}>
                {stateLabel(s)}
              </option>
            ))}
          </select>
          <ErrorText>{errors[FIELD.state]}</ErrorText>
        </div>
      </div>

      <label className="mt-1 flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => {
            setConsent(e.target.checked)
            if (e.target.checked) setErrors((v) => ({ ...v, consent: undefined }))
          }}
          className="mt-0.5 size-4 shrink-0 accent-[var(--color-acid)]"
        />
        <span className="text-[0.85rem] leading-relaxed text-fg2">
          I allow QuickBasket to use my personal information to contact me.
        </span>
      </label>
      <ErrorText>{errors.consent}</ErrorText>

      {failure && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[0.85rem] text-red-700">
          {failure}{' '}
          <a href={`mailto:${DEMO_FALLBACK_EMAIL}`} className="font-bold underline">
            {DEMO_FALLBACK_EMAIL}
          </a>
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        className={cn(
          'mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 font-bold text-white',
          'shadow-[0_10px_28px_-6px_rgba(245,138,26,0.55)] transition-all duration-300',
          busy ? 'cursor-not-allowed opacity-70' : 'hover:-translate-y-0.5 hover:bg-gold2',
        )}
      >
        {busy ? 'Sending…' : 'Request a demo'}
      </button>

      <p className="text-center text-[0.72rem] text-fg3">
        We&apos;ll only use these details to get in touch about QuickBasket.
      </p>
    </form>
  )
}

function Label({
  htmlFor,
  required,
  children,
}: {
  htmlFor: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block font-mono text-[0.68rem] tracking-[0.14em] text-fg2 uppercase"
    >
      {children}
      {required && <span className="ml-1 text-gold">*</span>}
    </label>
  )
}

function ErrorText({ children }: { children?: string }) {
  if (!children) return null
  return <p className="mt-1.5 text-[0.78rem] text-red-600">{children}</p>
}

type FieldProps = {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  error?: string
  required?: boolean
  type?: string
  inputMode?: 'tel' | 'email' | 'text'
  autoComplete?: string
  placeholder?: string
  maxLength?: number
}

function Field({ id, label, value, onChange, error, required, ...rest }: FieldProps) {
  return (
    <div>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <input
        {...rest}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        className={cn(inputCls, error && 'border-red-400 focus:border-red-400 focus:ring-red-200')}
      />
      <ErrorText>{error}</ErrorText>
    </div>
  )
}
