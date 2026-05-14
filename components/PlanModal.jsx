'use client'
import { useEffect, useState } from 'react'

export default function PlanModal({ plan, pages, onClose }) {
  const [loading, setLoading] = useState(false)

  // ✅ Close on Escape key + disable scroll
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!plan) return null

  const price =
    plan.basePrice + plan.extraPerPage * (pages - 1)

  const whatsappMessage = encodeURIComponent(
    `Hi Teravolt! I'm interested in the *${plan.name}* plan for ${pages} pages.`
  )

  const whatsappLink = `https://wa.me/254791220335?text=${whatsappMessage}`

  return (
    <>
      {/* ✅ Backdrop */}
      <div
        className="modal-backdrop"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* ✅ Modal */}
      <div
        className="modal-wrap"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Close */}
        <button
          className="modal-close"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Header */}
        <div className="modal-header">
          <h2 className="modal-title" id="modal-title">
            Let's Talk Tech
          </h2>
          <p className="modal-subtitle">
            Ready to build something amazing? Fill out the form below.
          </p>
        </div>

        {/* ✅ FORM (UPDATED WITH RESEND) */}
        <form
          className="modal-form"
          onSubmit={async (e) => {
            e.preventDefault()
            setLoading(true)

            const formData = new FormData(e.target)

            const data = {
              name: formData.get('name'),
              contact: formData.get('contact'),
              plan: plan.name,
              pages: pages,
              details: `
Plan: ${plan.name}
Pages: ${pages}
Price: Ksh ${price.toLocaleString()}
Features: ${plan.features.join(', ')}
              `
            }

            try {
              const res = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
              })

              if (res.ok) {
                alert('✅ Inquiry sent successfully!')
                e.target.reset()
                onClose()
              } else {
                alert('❌ Failed to send inquiry')
              }
            } catch (err) {
              alert('❌ Network error')
            }

            setLoading(false)
          }}
        >

          {/* Name + Contact */}
          <div className="modal-row">
            <input
              name="name"
              type="text"
              placeholder="Enter your name"
              className="modal-input"
              required
            />

            <input
              name="contact"
              type="text"
              placeholder="Enter your email or phone"
              className="modal-input"
              required
            />
          </div>

          {/* ✅ Plan summary (readonly) */}
          <textarea
            className="modal-textarea"
            readOnly
            rows={5}
            value={
              `Plan Details:\n` +
              `- ${plan.name} Plan — Ksh ${price.toLocaleString()} for ${pages} page${pages > 1 ? 's' : ''}\n` +
              `- ${plan.desc}\n` +
              `- Included Features: ${plan.features.join(', ')}`
            }
          />

          {/* WhatsApp */}
          <p className="modal-whatsapp-note">
            You can also contact me via{' '}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-whatsapp-link"
            >
              WhatsApp
            </a>
          </p>

          {/* ✅ Button */}
          <div className="modal-submit-wrap">
            <button
              type="submit"
              className="modal-submit-btn"
              disabled={loading}
            >

              {/* Default */}
              <span>
                {loading ? 'Sending...' : 'Submit Inquiry'}
                {!loading && (
                  <svg viewBox="0 0 24 24">
                    <path
                      fill="#ffffff"
                      d="M20.33 3.66996L4.23 8.19996L10.07 13.85L13.07 19.94L20.67 5.13996Z"
                    />
                  </svg>
                )}
              </span>

              {/* Hover */}
              <span>Sure ?</span>

              {/* Done */}
              <span>
                Done !
                <svg viewBox="0 0 24 24">
                  <path
                    stroke="#fff"
                    strokeWidth="2"
                    d="M8 13L12 16L22 6"
                  />
                </svg>
              </span>

            </button>
          </div>

        </form>
      </div>
    </>
  )
}
