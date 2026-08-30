import { Resend } from 'resend'

// ✅ Prevents this route from being statically generated during build
export const dynamic = 'force-dynamic'

const RECIPIENT = 'hemankipkoechchirchir@gmail.com'
const FROM = 'Teravolt Digital <admin@teravoltdigital.website>'

const MAX_LEN = 5000
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Best-effort in-memory rate limit (per worker isolate). Not a hard guarantee,
// but blocks trivial floods without needing a KV/Durable Object binding.
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 5
const hits = new Map()

function rateLimited(key) {
  const now = Date.now()
  const timestamps = (hits.get(key) || []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  )
  timestamps.push(now)
  hits.set(key, timestamps)
  // Opportunistic cleanup so the map can't grow unbounded.
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) hits.delete(k)
    }
  }
  return timestamps.length > RATE_LIMIT_MAX
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function clean(value) {
  if (value == null) return ''
  return String(value).trim().slice(0, MAX_LEN)
}

export async function POST(req) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured')
      return Response.json(
        { success: false, error: 'Email service is not configured. Please contact support.' },
        { status: 500 }
      )
    }

    const ip =
      req.headers.get('cf-connecting-ip') ||
      req.headers.get('x-forwarded-for') ||
      'unknown'

    if (rateLimited(ip)) {
      return Response.json(
        { success: false, error: 'Too many requests. Please try again in a minute.' },
        { status: 429 }
      )
    }

    let body
    try {
      body = await req.json()
    } catch {
      return Response.json(
        { success: false, error: 'Invalid request body' },
        { status: 400 }
      )
    }

    // ✅ Honeypot — real users never fill this hidden field
    if (clean(body.company)) {
      return Response.json({ success: true, message: 'Email sent successfully!' })
    }

    const name = clean(body.name)
    const email = clean(body.email)
    const contact = clean(body.contact)
    const message = clean(body.message)
    const project = clean(body.project)
    const plan = clean(body.plan)
    const pages = clean(body.pages)
    const details = clean(body.details)

    if (!name) {
      return Response.json(
        { success: false, error: 'Name is required' },
        { status: 400 }
      )
    }

    const senderContact = contact || email
    const replyToEmail = EMAIL_RE.test(email)
      ? email
      : EMAIL_RE.test(contact)
        ? contact
        : null

    // ✅ Build email content dynamically (all values HTML-escaped)
    const row = (label, value) =>
      value ? `<p><strong>${label}:</strong> ${escapeHtml(value)}</p>` : ''
    const block = (label, value) =>
      value
        ? `<p><strong>${label}:</strong><br/>${escapeHtml(value).replace(/\n/g, '<br/>')}</p>`
        : ''

    const html = `
      <h2>New Submission</h2>
      ${row('Name', name)}
      ${row('Contact', senderContact || 'Not provided')}
      ${row('Project', project)}
      ${block('Message', message)}
      ${row('Selected Plan', plan)}
      ${row('Pages', pages)}
      ${block('Details', details)}
    `

    const subject = plan
      ? `New Plan Request (${plan})`
      : 'New Contact Message'

    const resend = new Resend(process.env.RESEND_API_KEY)
    const data = await resend.emails.send({
      from: FROM,
      to: [RECIPIENT],
      replyTo: replyToEmail || undefined,
      subject,
      html,
    })

    return Response.json({
      success: true,
      id: data?.data?.id ?? null,
      message: 'Email sent successfully!',
    })
  } catch (error) {
    console.error('EMAIL ERROR:', error)
    return Response.json(
      { success: false, error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    )
  }
}
