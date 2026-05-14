'use client'
import { useState } from 'react'

export default function Contact() {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.target)

    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      project: formData.get('project'),
      message: formData.get('message'),
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
        alert('✅ Message sent successfully!')
        e.target.reset()
      } else {
        alert('❌ Something went wrong.')
      }
    } catch (err) {
      alert('❌ Network error.')
    }

    setLoading(false)
  }

  return (
    <section id="contact" className="section">
      <p className="section-label">// Get In Touch</p>

      <div className="contact-grid">
        <div className="contact-info">
          <h2 className="section-title">
            Let&apos;s <span>Work</span> Together
          </h2>

          <h3>Email</h3>
          <p>admin@teravoltdigital.website</p>

          <h3>Phone</h3>
          <p>+254 79122 0335</p>

          <h3>Location</h3>
          <p>Remote — Worldwide</p>
        </div>

        <form onSubmit={handleSubmit}>
          <input name="name" type="text" placeholder="Your Name" required />
          <input name="email" type="email" placeholder="Your Email" required />
          <input name="project" type="text" placeholder="Project Type (e.g. Website + Hosting)" />
          <textarea name="message" rows="5" placeholder="Tell us about your project..." required></textarea>

          <button type="submit" className="submit-btn" disabled={loading}>
            <span>
              {loading ? 'Sending...' : 'Send Message ↗'}
            </span>
          </button>
        </form>
      </div>
    </section>
  )
}