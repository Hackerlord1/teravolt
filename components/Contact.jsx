'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'

function AnimatedLabel({ text }) {
  return text.split('').map((char, index) => {
    if (char === ' ') {
      return <span key={`space-${index}`}> </span>
    }
    return <span key={`${char}-${index}`}>{char}</span>
  })
}

export default function Contact() {
  const { t } = useTranslation('home')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      project: formData.get('project'),
      message: formData.get('message'),
    }

    setLoading(true)

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
          `✅ ${t('contact.success')}`
        )

        form.reset()
      } else {
        alert(
          `❌ ${t(
            'contact.general_error'
          )}`
        )
      }
    } catch {
      alert(
        `❌ ${t(
          'contact.network_error'
        )}`
      )
    } finally {
      setLoading(false)
    }
  }

  const sendText = loading
    ? t('contact.sending')
    : t('contact.send')

  return (
    <section
      id="contact"
      className="section"
    >
      <p className="section-label">
        {t('contact.label')}
      </p>

      <div className="contact-grid">
        <div className="contact-info">
          <h2 className="section-title">
            {t('contact.title_start')}{' '}

            <span>
              {t(
                'contact.title_highlight'
              )}
            </span>{' '}

            {t('contact.title_end')}
          </h2>

          <h3>
            {t('contact.email')}
          </h3>

          <p>
            admin@teravoltdigital.website
          </p>

          <h3>
            {t('contact.phone')}
          </h3>

          <p>+254 79122 0335</p>

          <h3>
            {t('contact.location')}
          </h3>

          <p>
            {t(
              'contact.location_value'
            )}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            type="text"
            placeholder={t(
              'contact.name_placeholder'
            )}
            autoComplete="name"
            required
          />

          <input
            name="email"
            type="email"
            placeholder={t(
              'contact.email_placeholder'
            )}
            autoComplete="email"
            required
          />

          <input
            name="project"
            type="text"
            placeholder={t(
              'contact.project_placeholder'
            )}
          />

          <textarea
            name="message"
            rows={5}
            placeholder={t(
              'contact.message_placeholder'
            )}
            required
          />

          {/* Animated Submit Button */}
          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            <div className="submit-span-mother">
              <AnimatedLabel text={sendText} />
            </div>

            <div className="submit-span-mother2">
              <AnimatedLabel text={sendText} />
            </div>
          </button>
        </form>
      </div>
    </section>
  )
}