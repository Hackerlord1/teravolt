'use client'

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thanks! We\'ll get back to you soon. 🚀')
  }

  return (
    <section id="contact" className="section">
      <p className="section-label">// Get In Touch</p>
      <div className="contact-grid">
        <div className="contact-info">
          <h2 className="section-title">Let&apos;s <span>Work</span> Together</h2>
          <h3>Email</h3>
          <p>hello@teravolt.com</p>
          <h3>Phone</h3>
          <p>+254 79122 0335</p>
          <h3>Location</h3>
          <p>Remote — Worldwide</p>
        </div>

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <input type="text" placeholder="Project Type (e.g. Website + Hosting)" />
          <textarea rows="5" placeholder="Tell us about your project..." required></textarea>

          {/* ✅ Animated Send Message button */}
          <button type="submit" className="submit-btn">

            {/* Layer 1 — default visible */}
            <span className="submit-span-mother">
              {'Send Message ↗'.split('').map((char, i) => (
                <span key={i} style={{ animationDelay: `${i * 0.02}s` }}>
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </span>

            {/* Layer 2 — slides in on hover */}
            <span className="submit-span-mother2">
              {'Send Message ↗'.split('').map((char, i) => (
                <span key={i} style={{ animationDelay: `${i * 0.02}s` }}>
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </span>

          </button>
        </form>
      </div>
    </section>
  )
}