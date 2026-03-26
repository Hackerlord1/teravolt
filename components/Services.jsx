'use client'
import { useState } from 'react'
import Link from 'next/link'

const services = [
  {
    number: '01',
    icon: '🌐',
    title: 'Web Development',
    desc: 'Web development is the process of building, programming and maintaining websites and web applications that live on the internet.',
    details: 'From simple landing pages to complex web applications, we build fast, scalable and SEO-friendly websites tailored to your business needs.',
    tools: ['React', 'Next.js', 'Node.js', 'TypeScript'],
    slug: '/services/web-development',
  },
  {
    number: '02',
    icon: '🎨',
    title: 'Graphics Design',
    desc: 'Creative design solutions to enhance visual communication and brand identity.',
    details: 'We craft compelling visual identities — logos, brand guidelines, marketing materials and digital assets that make your brand stand out.',
    tools: ['Illustrator', 'Photoshop', 'Canva', 'After Effects'],
    slug: '/services/graphics-design',
  },
  {
    number: '03',
    icon: '🎯',
    title: 'UI/UX Design',
    desc: 'UI/UX design focuses on creating a smooth, intuitive user experience.',
    details: 'We design user interfaces that are beautiful, functional and conversion-focused. Every pixel is intentional, every interaction is smooth.',
    tools: ['Figma', 'Adobe XD', 'Framer', 'Maze'],
    slug: '/services/ui-ux-design',
  },
  {
    number: '04',
    icon: '📱',
    title: 'Mobile App',
    desc: 'Mobile app development involves creating software for mobile devices.',
    details: 'We build cross-platform mobile apps for iOS and Android using React Native — one codebase, native performance, seamless experience.',
    tools: ['React Native', 'Expo', 'Firebase', 'Swift'],
    slug: '/services/mobile-app',
  },
  {
    number: '05',
    icon: '☁️',
    title: 'Web Hosting',
    desc: 'Reliable, lightning-fast SSD hosting with 99.99% uptime guarantee.',
    details: 'We provide managed hosting solutions with daily backups, SSL certificates, CDN integration and 24/7 monitoring so you never go offline.',
    tools: ['AWS', 'Vercel', 'Cloudflare', 'Docker'],
    slug: '/services/web-hosting',
  },
  {
    number: '06',
    icon: '⚡',
    title: 'Performance Optimization',
    desc: 'Speed audits, Core Web Vitals fixes and CDN integration.',
    details: 'We audit your site, fix bottlenecks and optimize every layer — images, code, server response — to achieve perfect Lighthouse scores.',
    tools: ['Lighthouse', 'WebPageTest', 'Webpack', 'CDN'],
    slug: '/services/performance',
  },
]

export default function Services() {
  const [openIndex, setOpenIndex] = useState(null)

  const handleToggle = (i) => {
    setOpenIndex(openIndex === i ? null : i)
  }

  return (
    <section id="services" className="services-section">

      {/* Header */}
      <div className="services-header">
        <p className="section-label" style={{ textAlign: 'center' }}>
          WHAT WE OFFER
        </p>
        <h2 className="services-main-title">Expertise</h2>
      </div>

      {/* Accordion List */}
      <div className="services-accordion">
        {services.map((service, i) => (
          <div
            key={i}
            className={`accordion-item ${openIndex === i ? 'accordion-item--open' : ''}`}
          >
            {/* ✅ Clickable row */}
            <button
              className="accordion-trigger"
              onClick={() => handleToggle(i)}
              aria-expanded={openIndex === i}
            >
              {/* Left — number + icon + title */}
              <div className="accordion-left">
                <span className="accordion-number">{service.number}</span>
                <span className="accordion-icon">{service.icon}</span>
                <span className="accordion-title">{service.title}</span>
              </div>

              {/* Right — short desc + toggle */}
              <div className="accordion-right">
                <span className="accordion-desc">{service.desc}</span>
                <span className="accordion-toggle-icon">
                  {openIndex === i ? (
                    // Minus icon
                    <svg width="20" height="20" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor"
                      strokeWidth="2" strokeLinecap="round">
                      <path d="M5 12h14" />
                    </svg>
                  ) : (
                    // Plus icon
                    <svg width="20" height="20" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor"
                      strokeWidth="2" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  )}
                </span>
              </div>
            </button>

            {/* ✅ Expandable content */}
            <div className="accordion-body">
              <div className="accordion-body-inner">

                {/* Detail text */}
                <p className="accordion-detail">{service.details}</p>

                {/* Tools / tags */}
                <div className="accordion-tools">
                  {service.tools.map((tool, t) => (
                    <span key={t} className="accordion-tool-tag">
                      {tool}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <Link href={service.slug} className="accordion-cta">
                  View Case Studies
                  <svg width="16" height="16" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round">
                    <path d="M7 7h10v10" />
                    <path d="M7 17L17 7" />
                  </svg>
                </Link>

              </div>
            </div>

          </div>
        ))}
      </div>

    </section>
  )
}