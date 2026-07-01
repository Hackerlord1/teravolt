'use client'

import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { getServiceBySlug } from '@/lib/servicesData'

export default function ServiceDetail({ slug }) {
  const { t } = useTranslation(['services'])
  const service = getServiceBySlug(slug)

  if (!service) {
    return <div className="error">Service not found</div>
  }

  return (
    <div className="service-detail">
      {/* Header */}
      <div className="service-header">
        <div className="service-header-top">
          <span className="service-number">{service.number}</span>
          <span className="service-icon">{service.icon}</span>
        </div>
        <h1 className="service-title">{t(service.titleKey)}</h1>
        <p className="service-subtitle">{t(service.subtitleKey)}</p>
      </div>

      {/* Description */}
      <div className="service-description">
        <p className="service-desc-main">{t(service.descriptionKey)}</p>
        <p className="service-desc-full">{t(service.fullDescriptionKey)}</p>
      </div>

      {/* Tools */}
      <div className="service-tools-section">
        <h2>Tools & Technologies</h2>
        <div className="tools-grid">
          {service.tools.map((tool, i) => (
            <div key={i} className="tool-tag">
              {tool}
            </div>
          ))}
        </div>
      </div>

      {/* Process */}
      <div className="service-process-section">
        <h2>Our Process</h2>
        <div className="process-grid">
          {service.process.map((step, i) => (
            <div key={i} className="process-card">
              <div className="process-step">{step.step}</div>
              <h3 className="process-title">{t(step.titleKey)}</h3>
              <p className="process-desc">{t(step.descKey)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Case Studies */}
      <div className="service-casestudies-section">
        <h2>Case Studies</h2>
        <div className="casestudies-grid">
          {service.caseStudies.map((cs, i) => (
            <div key={i} className="casestudy-card">
              <img src={cs.image} alt={t(cs.titleKey)} className="casestudy-image" />
              <div className="casestudy-content">
                <p className="casestudy-category">{t(cs.categoryKey)}</p>
                <h3 className="casestudy-title">{t(cs.titleKey)}</h3>
                <p className="casestudy-excerpt">{t(cs.excerptKey)}</p>
                <div className="casestudy-tags">
                  {cs.tags.map((tag, j) => (
                    <span key={j} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                {cs.liveUrl && (
                  <Link href={cs.liveUrl} className="casestudy-link">
                    View Live →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="service-cta">
        <h2>Ready to get started?</h2>
        <p>Let's discuss your project and how we can help.</p>
        <Link href="/#contact" className="cta-button">
          Start Your Project
        </Link>
      </div>
    </div>
  )
}
