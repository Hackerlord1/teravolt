'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'

export default function Services() {
  const { t } = useTranslation('home')
  const [openIndex, setOpenIndex] = useState(null)

  const services = [
    {
      number: '01',
      icon: '🌐',
      title: t('services.web_development'),
      desc: t('services.web_dev_desc'),
      details: t('services.web_dev_detail'),
      tools: [
        'React',
        'Next.js',
        'Node.js',
        'TypeScript',
      ],
      slug: '/services/web-development',
    },
    {
      number: '02',
      icon: '🎨',
      title: t('services.graphics_design'),
      desc: t('services.graphics_desc'),
      details: t('services.graphics_detail'),
      tools: [
        'Illustrator',
        'Photoshop',
        'Canva',
        'After Effects',
      ],
      slug: '/services/graphics-design',
    },
    {
      number: '03',
      icon: '🎯',
      title: t('services.ui_ux'),
      desc: t('services.ui_ux_desc'),
      details: t('services.ui_ux_detail'),
      tools: [
        'Figma',
        'Adobe XD',
        'Framer',
        'Maze',
      ],
      slug: '/services/ui-ux-design',
    },
    {
      number: '04',
      icon: '📱',
      title: t('services.mobile_app'),
      desc: t('services.mobile_desc'),
      details: t('services.mobile_detail'),
      tools: [
        'React Native',
        'Expo',
        'Firebase',
        'Swift',
      ],
      slug: '/services/mobile-app',
    },
    {
      number: '05',
      icon: '☁️',
      title: t('services.web_hosting'),
      desc: t('services.hosting_desc'),
      details: t('services.hosting_detail'),
      tools: [
        'AWS',
        'Vercel',
        'Cloudflare',
        'Docker',
      ],
      slug: '/services/web-hosting',
    },
    {
      number: '06',
      icon: '⚡',
      title: t('services.performance'),
      desc: t('services.perf_desc'),
      details: t('services.perf_detail'),
      tools: [
        'Lighthouse',
        'WebPageTest',
        'Webpack',
        'CDN',
      ],
      slug: '/services/performance',
    },
  ]

  const handleToggle = (index) => {
    setOpenIndex((currentIndex) =>
      currentIndex === index ? null : index
    )
  }

  return (
    <section
      id="services"
      className="services-section"
    >
      <div className="services-header">
        <p
          className="section-label"
          style={{ textAlign: 'center' }}
        >
          {t('services.what_we_offer')}
        </p>

        <h2 className="services-main-title">
          {t('services.expertise')}
        </h2>
      </div>

      <div className="services-accordion">
        {services.map((service, index) => {
          const isOpen =
            openIndex === index

          return (
            <div
              key={service.slug}
              className={`accordion-item ${
                isOpen
                  ? 'accordion-item--open'
                  : ''
              }`}
            >
              <button
                type="button"
                className="accordion-trigger"
                onClick={() =>
                  handleToggle(index)
                }
                aria-expanded={isOpen}
              >
                <div className="accordion-left">
                  <span className="accordion-number">
                    {service.number}
                  </span>

                  <span
                    className="accordion-icon"
                    aria-hidden="true"
                  >
                    {service.icon}
                  </span>

                  <span className="accordion-title">
                    {service.title}
                  </span>
                </div>

                <div className="accordion-right">
                  <span className="accordion-desc">
                    {service.desc}
                  </span>

                  <span
                    className="accordion-toggle-icon"
                    aria-hidden="true"
                  >
                    {isOpen ? (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <path d="M5 12h14" />
                      </svg>
                    ) : (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    )}
                  </span>
                </div>
              </button>

              <div className="accordion-body">
                <div className="accordion-body-inner">
                  <p className="accordion-detail">
                    {service.details}
                  </p>

                  <div className="accordion-tools">
                    {service.tools.map(
                      (tool) => (
                        <span
                          key={tool}
                          className="accordion-tool-tag"
                        >
                          {tool}
                        </span>
                      )
                    )}
                  </div>

                  <Link 
                    href={service.slug}
                    className="accordion-case-link"
                  >
                    {t(
                      'services.view_case_studies'
                    )}

                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      aria-hidden="true"
                    >
                      <path d="M7 7h10v10" />
                      <path d="M7 17L17 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}