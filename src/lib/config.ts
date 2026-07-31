/* ══════════════════════════════════════════════════════════════
   Site configuration — the one place to paste external URLs.
   ══════════════════════════════════════════════════════════════ */

/**
 * Zoho form behind every "Request a demo" button.
 *
 * Where to get the URL:
 *   • Zoho CRM  → Setup → Developer Space → Webforms → open your form →
 *                 Share/Embed. Copy the `src="…"` value out of the <iframe>
 *                 snippet (it looks like
 *                 https://crm.zoho.in/crm/WebFormServeServlet?rid=…).
 *   • Zoho Forms → open your form → Share → Permalink (it looks like
 *                 https://forms.zohopublic.in/<org>/form/<Name>/formperma/<hash>).
 *
 * Paste it between the quotes below and rebuild — every demo button on the
 * site picks it up. In the Zoho form's own settings, remember to whitelist
 * this site's domain and set the post-submit Return URL back to it.
 *
 * While this is left empty the demo buttons fall back to emailing
 * DEMO_FALLBACK_EMAIL, so nothing is ever a dead link.
 */
export const ZOHO_DEMO_FORM_URL = ''

/** Used when ZOHO_DEMO_FORM_URL is not set yet, and as the in-dialog fallback. */
export const DEMO_FALLBACK_EMAIL = 'partners@quickbasket.example'

/** True once a Zoho form URL has been pasted above. */
export const HAS_DEMO_FORM = ZOHO_DEMO_FORM_URL.trim().length > 0
