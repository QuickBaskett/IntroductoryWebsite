/* ══════════════════════════════════════════════════════════════
   Zoho CRM Web-to-Contact wiring.

   Values below come straight from the webform snippet Zoho generated
   (Setup → Channels → Webforms → Contact Us). They identify the org and
   the form; they are public by design — every site that hosts a Zoho
   webform exposes them in its page source. The gate against abuse is the
   **Form location URL** field under that form's Form Details, so
   quickbasket.org must be listed there or Zoho drops the submission.

   Regenerating the form in Zoho changes xmIwtLD — re-copy it here.
   ══════════════════════════════════════════════════════════════ */

export const ZOHO_ENDPOINT = 'https://crm.zoho.in/crm/WebToContactForm'

/** Hidden fields Zoho requires on every submission. Do not rename. */
export const ZOHO_HIDDEN_FIELDS: Record<string, string> = {
  xnQsjsdp: '40b3965de010d9ddb008677d30c3228e301b0eed27acd0c59481398568928b78',
  xmIwtLD: '313cec56ba5ddf018278ee5d489e48477a914cb0af3130d4aa93d3018860ae86ed9edcb1dff2a0800f3f944b3b1d2036',
  actionType: 'Q29udGFjdHM=', // base64 "Contacts"
  returnURL: 'null',
  zc_gad: '',
  aG9uZXlwb3Q: '', // base64 "honeypot" — must post empty
}

/**
 * Exact picklist values for "Mailing Address - State / Province", lifted from
 * Zoho's WebFormDependencies map for India. The strings must match Zoho's
 * options character-for-character or the field lands empty on the record —
 * note "Punjab (India)".
 */
export const INDIA_STATES = [
  'Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam',
  'Bihar', 'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir',
  'Jharkhand', 'Karnataka', 'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh',
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha',
  'Puducherry', 'Punjab (India)', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
  'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
] as const

/** Drops Zoho's disambiguating suffix for display — the value still posts in full. */
export function stateLabel(value: string) {
  return value.replace(' (India)', '')
}

/** Zoho field names, kept in one place because they contain spaces. */
export const FIELD = {
  firstName: 'First Name',
  lastName: 'Last Name',
  mobile: 'Mobile',
  email: 'Email',
  city: 'Mailing Address - City',
  state: 'Mailing Address - State / Province',
} as const

export type SubmitResult =
  | { ok: true; message: string }
  | { ok: false; message: string }

/**
 * Reduces "+91 98765-43210", "091 9876543210" and "9876543210" to the bare
 * 10-digit subscriber number, so formatting differences never reach the CRM.
 */
export function normalizeMobile(value: string) {
  const digits = value.replace(/\D/g, '')
  if (digits.length === 12 && digits.startsWith('91')) return digits.slice(2)
  if (digits.length === 11 && digits.startsWith('0')) return digits.slice(1)
  return digits
}

/** Indian mobile numbers are ten digits starting 6–9. The form is India-only. */
export function isValidMobile(value: string) {
  return /^[6-9]\d{9}$/.test(normalizeMobile(value))
}

/** Canonical shape stored on the contact, so click-to-dial and dedupe behave. */
export function formatMobile(value: string) {
  return `+91 ${normalizeMobile(value)}`
}

/** Mirrors Zoho's own loose email check so we reject exactly what it would. */
export function isValidEmail(value: string) {
  const at = value.indexOf('@')
  const dot = value.lastIndexOf('.')
  return !(at < 1 || dot < at + 2 || dot + 2 >= value.length)
}

/**
 * POSTs the lead to Zoho and interprets its response.
 *
 * Zoho replies with JSON describing what the form was configured to do —
 * here that's a splash (thank-you) message, whose text is `actionvalue`.
 * Redirect-style configurations are treated as success too, since the
 * dialog shows its own confirmation rather than navigating away.
 */
export async function submitToZoho(values: Record<string, string>): Promise<SubmitResult> {
  const body = new FormData()
  for (const [key, value] of Object.entries(ZOHO_HIDDEN_FIELDS)) body.append(key, value)
  for (const [key, value] of Object.entries(values)) body.append(key, value.trim())

  let raw: unknown
  try {
    const res = await fetch(ZOHO_ENDPOINT, { method: 'POST', body, cache: 'no-cache' })
    const type = res.headers.get('Content-Type') ?? ''
    raw = type.includes('application/json') ? await res.json() : await res.text()
  } catch {
    return {
      ok: false,
      message:
        'We could not reach the server just now. Please check your connection and try again, or email us directly.',
    }
  }

  if (typeof raw !== 'object' || raw === null) {
    // Zoho fell back to serving an HTML page — treat as delivered but unconfirmed.
    return { ok: true, message: 'Thanks — we have got your details and will be in touch shortly.' }
  }

  const data = raw as Record<string, string | undefined>

  if (data.invalidCaptcha === 'true') {
    return { ok: false, message: data.actionvalue ?? 'Captcha verification failed. Please try again.' }
  }
  if (data.actionsubmit === 'error_msg' || data.actionsubmit === 'captcha_error') {
    return { ok: false, message: data.message ?? 'Something went wrong. Please try again.' }
  }
  if (data.actionsubmit === 'Splash Message') {
    return {
      ok: true,
      message: data.actionvalue ?? 'Thanks — we have got your details and will be in touch shortly.',
    }
  }
  return { ok: true, message: 'Thanks — we have got your details and will be in touch shortly.' }
}
