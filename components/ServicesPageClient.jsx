'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { servicesData } from '@/lib/servicesData'

export default function ServicesPageClient() {
  const { t } = useTranslation(['common', 'services'])

  const totalCaseStudies = servicesData.reduce(
    (total, service) => total + (service.caseStudies?.length ?? 0),
    0
  )

  return (
    <main className="pw-page">
      <header className="pw-hero">
        <p className="section-label">
          {t('services_label', { ns: 'common', defaultValue: '// Our Services' })}
        </p>
        <h1 className="pw-title">
          {t('services_title', { ns: 'common', defaultValue: 'What We' })}{' '}
          <span>{t('services_title_span', { ns: 'common', defaultValue: 'Do' })}</span>
        </h1>
        <p className="pw-lead">
          {t('services_subtitle', {
            ns: 'common',
            defaultValue:
              'Explore our full range of digital services — pick one to see how we work and the results we deliver.',
          })}
        </p>
      </header>

      <div className="pw-toolbar">
        <span className="pw-result-count">
          {servicesData.length}{' '}
          {t('services_count', { ns: 'common', defaultValue: 'services' })}
          {'  ·  '}
          {totalCaseStudies}{' '}
          {t('case_studies_count', { ns: 'common', defaultValue: 'case studies' })}
        </span>
      </div>

      <div className="sv-grid">
        {servicesData.map((service) => {
          const caseCount = service.caseStudies?.length ?? 0
          const caseLabel =
            caseCount === 1
              ? t('case_study', { ns: 'common', defaultValue: 'case study' })
              : t('case_studies', { ns: 'common', defaultValue: 'case studies' })

          return (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="sv-card"
            >
              <div className="sv-card-head">
                <span className="sv-card-num">{service.number}</span>
                <span className="sv-card-icon" aria-hidden="true">
                  {service.icon}
                </span>
              </div>

              <h2 className="sv-card-title">
                {t(service.titleKey, { ns: 'services', defaultValue: service.titleKey })}
              </h2>

              <p className="sv-card-desc">
                {t(service.descriptionKey, {
                  ns: 'services',
                  defaultValue: service.descriptionKey,
                })}
              </p>

              <div className="sv-card-tools">
                {service.tools.slice(0, 4).map((tool) => (
                  <span key={`${service.slug}-${tool}`} className="pw-tag">
                    {tool}
                  </span>
                ))}
                {service.tools.length > 4 && (
                  <span className="pw-tag pw-tag--muted">
                    +{service.tools.length - 4}
                  </span>
                )}
              </div>

              <div className="sv-card-foot">
                <span className="sv-card-count">
                  {caseCount} {caseLabel}
                </span>
                <span className="sv-card-link">
                  {t('view_details', { ns: 'common', defaultValue: 'View details' })}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </span>
              </div>
            </Link>
          )
        })}
      </div>

      <div className="sv-cta">
        <p>
          {t('cant_find', {
            ns: 'common',
            defaultValue: "Can't find what you're looking for?",
          })}
        </p>
        <Link href="/#contact" className="sv-cta-link">
          {t('lets_talk_project', {
            ns: 'common',
            defaultValue: "Let's talk about your project",
          })}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </main>
  )
}
