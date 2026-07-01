'use client'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'

export default function Services() {
  const { t } = useTranslation(['services'])
  const [openIndex, setOpenIndex] = useState(null)

  const services = [
    {
      number: '01',
      icon: '🌐',
      title: t('web_development'),
      desc: t('web_dev_desc'),
      details: t('web_dev_detail'),
      tools: ['React', 'Next.js', 'Node.js', 'TypeScript'],
      slug: '/services/web-development',
    },
    {
      number: '02',
      icon: '🎨',
      title: t('graphics_design'),
      desc: t('graphics_desc'),
      details: t('graphics_detail'),
      tools: ['Illustrator', 'Photoshop', 'Canva', 'After Effects'],
      slug: '/services/graphics-design',
    },
    {
      number: '03',
      icon: '🎯',
      title: t('ui_ux'),
      desc: t('ui_ux_desc'),
      details: t('ui_ux_detail'),
      tools: ['Figma', 'Adobe XD', 'Framer', 'Maze'],
      slug: '/services/ui-ux-design',
    },
    {
      number: '04',
      icon: '📱',
      title: t('mobile_app'),
      desc: t('mobile_desc'),
      details: t('mobile_detail'),
      tools: ['React Native', 'Expo', 'Firebase', 'Swift'],
      slug: '/services/mobile-app',
    },
    {
      number: '05',
      icon: '☁️',
      title: t('web_hosting'),
      desc: t('hosting_desc'),
      details: t('hosting_detail'),
      tools: ['AWS', 'Vercel', 'Cloudflare', 'Docker'],
      slug: '/services/web-hosting',
    },
    {
      number: '06',
      icon: '⚡',
      title: t('performance'),
      desc: t('perf_desc'),
      details: t('perf_detail'),
      tools: ['Lighthouse', 'WebPageTest', 'Webpack', 'CDN'],
      slug: '/services/performance',
    },
  ]

  const handleToggle = (i) => {
    setOpenIndex(openIndex === i ? null : i)
  }

  return (
    <section id="services" className="services-section">

      {/* Header */}
      <div className="services-header">
        <p className="section-label" style={{ textAlign: 'center' }}>
          {t('what_we_offer')}
        </p>
        <h2 className="services-main-title">{t('expertise')}</h2>
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
                  {t('view_case_studies')}
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