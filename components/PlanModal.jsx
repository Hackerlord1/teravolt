'use client'
import { useEffect } from 'react'

export default function PlanModal({ plan, pages, onClose }) {
  // ✅ Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    // ✅ Prevent body scroll when modal open
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!plan) return null

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
        {/* Close button */}
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close modal"
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

        {/* Form */}
        <form
          className="modal-form"
          onSubmit={(e) => {
            e.preventDefault()
            alert('Inquiry submitted! We will get back to you soon.')
            onClose()
          }}
        >
          {/* Name + Contact row */}
          <div className="modal-row">
            <input
              type="text"
              placeholder="Enter your name"
              className="modal-input"
              required
            />
            <input
              type="text"
              placeholder="Enter your email or phone"
              className="modal-input"
              required
            />
          </div>

          {/* ✅ Plan details — auto filled */}
          <textarea
            className="modal-textarea"
            readOnly
            rows={5}
            value={
              `Plan Details:\n` +
              `- ${plan.name} Plan — Ksh ${(plan.basePrice + plan.extraPerPage * (pages - 1)).toLocaleString()} for ${pages} page${pages > 1 ? 's' : ''}\n` +
              `- ${plan.desc}\n` +
              `- Included Features: ${plan.features.join(', ')}`
            }
          />

          {/* WhatsApp link */}
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

          {/* ✅ Centered animated submit button */}
          <div className="modal-submit-wrap">
            <button type="submit" className="modal-submit-btn">

              {/* State 1 — Default: Submit Inquiry */}
              <span>
                Submit Inquiry
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <g id="SVGRepo_iconCarrier">
                    <path
                      fill="#ffffff"
                      d="M20.33 3.66996C20.1408 3.48213 19.9035 3.35008 
                      19.6442 3.28833C19.3849 3.22659 19.1135 3.23753 
                      18.86 3.31996L4.23 8.19996C3.95867 8.28593 3.71891 
                      8.45039 3.54099 8.67255C3.36307 8.89471 3.25498 
                      9.16462 3.23037 9.44818C3.20576 9.73174 3.26573 
                      10.0162 3.40271 10.2657C3.5397 10.5152 3.74754 
                      10.7185 4 10.85L10.07 13.85L13.07 19.94C13.1906 
                      20.1783 13.3751 20.3785 13.6029 20.518C13.8307 
                      20.6575 14.0929 20.7309 14.36 20.73H14.46C14.7461 
                      20.7089 15.0192 20.6023 15.2439 20.4239C15.4686 
                      20.2456 15.6345 20.0038 15.72 19.73L20.67 
                      5.13996C20.7584 4.88789 20.7734 4.6159 20.7132 
                      4.35565C20.653 4.09541 20.5201 3.85762 20.33 
                      3.66996ZM4.85 9.57996L17.62 5.31996L10.53 
                      12.41L4.85 9.57996ZM14.43 19.15L11.59 
                      13.47L18.68 6.37996L14.43 19.15Z"
                    />
                  </g>
                </svg>
              </span>

              {/* State 2 — Hover: Sure? */}
              <span>Sure ?</span>

              {/* State 3 — Focus/Click: Done! */}
              <span>
                Done !
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <g id="SVGRepo_iconCarrier">
                    <path
                      strokeLinecap="round"
                      strokeWidth="2"
                      stroke="#ffffff"
                      d="M8.00011 13L12.2278 16.3821C12.6557 16.7245 
                      13.2794 16.6586 13.6264 16.2345L22.0001 6"
                    />
                    <path
                      fill="#ffffff"
                      d="M11.1892 12.2368L15.774 6.63327C16.1237 6.20582 
                      16.0607 5.5758 15.6332 5.22607C15.2058 4.87635 
                      14.5758 4.93935 14.226 5.36679L9.65273 
                      10.9564L11.1892 12.2368ZM8.02292 16.1068L6.48641 
                      14.8263L5.83309 15.6248L2.6 13.2C2.15817 12.8687 
                      1.53137 12.9582 1.2 13.4C0.868627 13.8419 0.95817 
                      14.4687 1.4 14.8L4.63309 17.2248C5.49047 17.8679 
                      6.70234 17.7208 7.381 16.8913L8.02292 16.1068Z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                    />
                  </g>
                </svg>
              </span>

            </button>
          </div>

        </form>
      </div>
    </>
  )
}