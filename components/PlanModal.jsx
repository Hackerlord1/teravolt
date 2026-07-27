'use client'

import { useEffect, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import Lottie from 'lottie-react'
import { successTickAnimation } from '@/lib/animations/success-tick'

export default function PlanModal({
  plan,
  pages,
  currencyInfo,
  onClose,
}) {
  const { t } = useTranslation('home')
  const lottieRef = useRef()

  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [feedbackType, setFeedbackType] = useState('')

  // Reset animation when showing success
  useEffect(() => {
    if (feedbackType === 'success' && lottieRef.current) {
      lottieRef.current.goToAndPlay(0)
    }
  }, [feedbackType])

  const showFeedback = (message, type) => {
    setFeedback(message)
    setFeedbackType(type)

    setTimeout(() => {
      setFeedback('')
      setFeedbackType('')
    }, 5000)
  }

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!plan) {
    return null
  }

  const price = plan.basePrice + plan.extraPerPage * (pages - 1)

  const formatModalPrice = (value) => {
    if (!currencyInfo) {
      return `KSh ${value.toLocaleString()}`
    }
    return `${currencyInfo.symbol}${value.toLocaleString()}`
  }

  const formatExtraPrice = (value) => {
    if (!currencyInfo) {
      return `KSh ${value.toLocaleString()}`
    }
    return `${currencyInfo.symbol}${value.toLocaleString()}`
  }

  const pageText = t(
    pages === 1
      ? 'pricing.modal.for_pages'
      : 'pricing.modal.for_pages_plural',
    {
      count: pages,
    }
  )

  const whatsappMessage = encodeURIComponent(
    t('pricing.modal.whatsapp_message', {
      plan: plan.name,
      count: pages,
    })
  )

  const whatsappLink = `https://wa.me/254791220335?text=${whatsappMessage}`

  const planSummary = [
    t('pricing.modal.plan_details'),
    `- ${t('pricing.modal.plan')}: ${plan.name}`,
    `- ${t('pricing.modal.price')}: ${formatModalPrice(price)} ${pageText}`,
    `- ${t('pricing.modal.per_page')}: ${formatExtraPrice(plan.extraPerPage)}`,
    `- ${plan.desc}`,
    `- ${t('pricing.modal.included_features')}: ${plan.features.join(', ')}`,
    `- ${t('pricing.modal.currency_note', {
      defaultValue: `Prices in ${currencyInfo?.currency || 'KES'}`,
    })}`,
  ].join('\n')

  const handleSubmit = async (event) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    setLoading(true)

    const data = {
      name: formData.get('name'),
      contact: formData.get('contact'),
      plan: plan.name,
      pages,
      price: formatModalPrice(price),
      currency: currencyInfo?.currency || 'KES',
      details: planSummary,
    }

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        showFeedback(t('pricing.modal.success'), 'success')
        form.reset()

        setTimeout(() => {
          onClose()
        }, 10000)
      } else {
        showFeedback(t('pricing.modal.failure'), 'error')
      }
    } catch {
      showFeedback(t('pricing.modal.network_error'), 'error')
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
          aria-label={t('pricing.modal.close')}
        >
          ✕
        </button>

        <div className="modal-header">
          <h2 className="modal-title" id="modal-title">
            {t('pricing.modal.title')}
          </h2>

          <p className="modal-subtitle">
            {t('pricing.modal.subtitle')}
          </p>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="modal-row">
            <input
              name="name"
              type="text"
              placeholder={t('pricing.modal.name_placeholder')}
              className="modal-input"
              autoComplete="name"
              required
            />

            <input
              name="contact"
              type="text"
              placeholder={t('pricing.modal.contact_placeholder')}
              className="modal-input"
              autoComplete="email"
              required
            />
          </div>

          <textarea
            className="modal-textarea"
            readOnly
            rows={6}
            value={planSummary}
          />

          <p className="modal-whatsapp-note">
            {t('pricing.modal.whatsapp_prefix')}{' '}
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
                  ? t('pricing.modal.sending')
                  : t('pricing.modal.submit')}

                {!loading && (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill="#ffffff"
                      d="M20.33 3.66996L4.23 8.19996L10.07 13.85L13.07 19.94L20.67 5.13996Z"
                    />
                  </svg>
                )}
              </span>

              <span>{t('pricing.modal.confirm')}</span>

              <span>
                {t('pricing.modal.done')}

                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    stroke="#fff"
                    strokeWidth="2"
                    fill="none"
                    d="M8 13L12 16L22 6"
                  />
                </svg>
              </span>
            </button>

            {feedback && (
              <div className={`modal-feedback ${feedbackType}`}>
                {feedbackType === 'success' ? (
                  <div className="feedback-icon-wrapper">
                    <Lottie
                      lottieRef={lottieRef}
                      animationData={successTickAnimation}
                      loop={false}
                      autoplay={true}
                      style={{ width: 24, height: 24 }}
                    />
                  </div>
                ) : (
                  <span className="feedback-icon">❌</span>
                )}
                <span className="feedback-message">{feedback}</span>
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  )
}