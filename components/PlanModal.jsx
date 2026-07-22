'use client'

import {
  useEffect,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'

export default function PlanModal({
  plan,
  pages,
  onClose,
}) {
  const { t } =
    useTranslation('home')

  const [loading, setLoading] =
    useState(false)

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener(
      'keydown',
      handleKey
    )

    document.body.style.overflow =
      'hidden'

    return () => {
      document.removeEventListener(
        'keydown',
        handleKey
      )

      document.body.style.overflow =
        ''
    }
  }, [onClose])

  if (!plan) {
    return null
  }

  const price =
    plan.basePrice +
    plan.extraPerPage *
      (pages - 1)

  const pageText = t(
    pages === 1
      ? 'pricing.modal.for_pages'
      : 'pricing.modal.for_pages_plural',
    {
      count: pages,
    }
  )

  const whatsappMessage =
    encodeURIComponent(
      t(
        'pricing.modal.whatsapp_message',
        {
          plan: plan.name,
          count: pages,
        }
      )
    )

  const whatsappLink =
    `https://wa.me/254791220335?text=${whatsappMessage}`

  const planSummary = [
    t(
      'pricing.modal.plan_details'
    ),
    `- ${t(
      'pricing.modal.plan'
    )}: ${plan.name}`,
    `- ${t(
      'pricing.modal.price'
    )}: Ksh ${price.toLocaleString()} ${pageText}`,
    `- ${plan.desc}`,
    `- ${t(
      'pricing.modal.included_features'
    )}: ${plan.features.join(', ')}`,
  ].join('\n')

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault()

    const form =
      event.currentTarget

    const formData =
      new FormData(form)

    setLoading(true)

    const data = {
      name: formData.get('name'),
      contact:
        formData.get('contact'),
      plan: plan.name,
      pages,
      details: planSummary,
    }

    try {
      const response = await fetch(
        '/api/send-email',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify(data),
        }
      )

      if (response.ok) {
        alert(
          `✅ ${t(
            'pricing.modal.success'
          )}`
        )

        form.reset()
        onClose()
      } else {
        alert(
          `❌ ${t(
            'pricing.modal.failure'
          )}`
        )
      }
    } catch {
      alert(
        `❌ ${t(
          'pricing.modal.network_error'
        )}`
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div
        className="modal-backdrop"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className="modal-wrap"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label={t(
            'pricing.modal.close'
          )}
        >
          ✕
        </button>

        <div className="modal-header">
          <h2
            className="modal-title"
            id="modal-title"
          >
            {t(
              'pricing.modal.title'
            )}
          </h2>

          <p className="modal-subtitle">
            {t(
              'pricing.modal.subtitle'
            )}
          </p>
        </div>

        <form
          className="modal-form"
          onSubmit={handleSubmit}
        >
          <div className="modal-row">
            <input
              name="name"
              type="text"
              placeholder={t(
                'pricing.modal.name_placeholder'
              )}
              className="modal-input"
              autoComplete="name"
              required
            />

            <input
              name="contact"
              type="text"
              placeholder={t(
                'pricing.modal.contact_placeholder'
              )}
              className="modal-input"
              autoComplete="email"
              required
            />
          </div>

          <textarea
            className="modal-textarea"
            readOnly
            rows={5}
            value={planSummary}
          />

          <p className="modal-whatsapp-note">
            {t(
              'pricing.modal.whatsapp_prefix'
            )}{' '}

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-whatsapp-link"
            >
              WhatsApp
            </a>
          </p>

          <div className="modal-submit-wrap">
            <button
              type="submit"
              className="modal-submit-btn"
              disabled={loading}
            >
              <span>
                {loading
                  ? t(
                    'pricing.modal.sending'
                  )
                  : t(
                    'pricing.modal.submit'
                  )}

                {!loading && (
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fill="#ffffff"
                      d="M20.33 3.66996L4.23 8.19996L10.07 13.85L13.07 19.94L20.67 5.13996Z"
                    />
                  </svg>
                )}
              </span>

              <span>
                {t(
                  'pricing.modal.confirm'
                )}
              </span>

              <span>
                {t(
                  'pricing.modal.done'
                )}

                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    stroke="#fff"
                    strokeWidth="2"
                    fill="none"
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