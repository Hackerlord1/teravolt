import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req) {
  try {
    const body = await req.json()

    const {
      name,
      email,
      contact,
      message,
      project,
      plan,
      pages,
      details
    } = body

    // ✅ Use contact OR email (whichever exists)
    const senderContact = contact || email || 'Not provided'

    // ✅ Basic validation
    if (!name) {
      return Response.json(
        { success: false, error: 'Name is required' },
        { status: 400 }
      )
    }

    // ✅ Build email content dynamically
    const html = `
      <h2>📩 New Submission</h2>

      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Contact:</strong> ${senderContact}</p>

      ${project ? `<p><strong>Project:</strong> ${project}</p>` : ''}
      ${message ? `<p><strong>Message:</strong><br/>${message}</p>` : ''}

      ${plan ? `<p><strong>Selected Plan:</strong> ${plan}</p>` : ''}
      ${pages ? `<p><strong>Pages:</strong> ${pages}</p>` : ''}
      ${details ? `<p><strong>Details:</strong><br/>${details}</p>` : ''}
    `

    // ✅ Dynamic subject
    const subject = plan
      ? `📦 New Plan Request (${plan})`
      : `📩 New Contact Message`

    // ✅ Send email
    const data = await resend.emails.send({
      from: 'Teravolt Digital <admin@teravoltdigital.website>',
      to: ['hemankipkoechchirchir@gmail.com'],
      reply_to: senderContact,
      subject,
      html
    })

    return Response.json({ success: true, data })

  } catch (error) {
    console.error('EMAIL ERROR:', error)

    return Response.json(
      { success: false, error: 'Failed to send email' },
      { status: 500 }
    )
  }
}
