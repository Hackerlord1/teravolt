'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import {
  servicesData,
  serviceCategories,
} from '@/lib/servicesData'
import ServiceSidebar from '@/components/services/ServiceSidebar'

export default function ServicesPage() {
  const { t } = useTranslation([
    'common',
    'services',
  ])

  const [
    sidebarOpen,
    setSidebarOpen,
  ] = useState(false)

  const totalCaseStudies =
    servicesData.reduce(
      (total, service) =>
        total +
        (
          service.caseStudies
            ?.length ?? 0
        ),
      0
    )

  return (
    <div className="blog-page">
      {/* Mobile sidebar toggle */}
      <button
        type="button"
        className="sidebar-toggle"
        onClick={() =>
          setSidebarOpen(true)
        }
        aria-label={t(
          'open_service_navigation',
          {
            ns: 'common',
            defaultValue:
              'Open service navigation',
          }
        )}
        aria-expanded={sidebarOpen}
        aria-controls="service-sidebar"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <line
            x1="3"
            y1="6"
            x2="21"
            y2="6"
          />

          <line
            x1="3"
            y1="12"
            x2="15"
            y2="12"
          />

          <line
            x1="3"
            y1="18"
            x2="18"
            y2="18"
          />
        </svg>

        <span>
          {t('services', {
            ns: 'common',
            defaultValue:
              'Services',
          })}
        </span>
      </button>

      {/* Sidebar */}
      <ServiceSidebar
        isOpen={sidebarOpen}
        onClose={() =>
          setSidebarOpen(false)
        }
      />

      {/* Main content */}
      <main className="blog-content">
        {/* Header */}
        <div className="blog-page-header">
          <p className="section-label">
            {t('services_label', {
              ns: 'common',
              defaultValue:
                '// Our Services',
            })}
          </p>

          <h1 className="blog-page-title">
            {t('services_title', {
              ns: 'common',
              defaultValue:
                'What We',
            })}{' '}

            <span>
              {t(
                'services_title_span',
                {
                  ns: 'common',
                  defaultValue:
                    'Do',
                }
              )}
            </span>
          </h1>

          <p className="blog-page-subtitle">
            {t('services_subtitle', {
              ns: 'common',
              defaultValue:
                'Explore our full range of digital services.',
            })}

            <strong>
              {' '}
              {t('services_cta', {
                ns: 'common',
                defaultValue:
                  'Choose a service to learn more.',
              })}
            </strong>
          </p>

          {/* Statistics */}
          <div className="blog-stats-row">
            <div className="blog-stat">
              <span className="blog-stat-number">
                {servicesData.length}
              </span>

              <span className="blog-stat-label">
                {t(
                  'services_count',
                  {
                    ns: 'common',
                    defaultValue:
                      'Services',
                  }
                )}
              </span>
            </div>

            <div className="blog-stat-divider" />

            <div className="blog-stat">
              <span className="blog-stat-number">
                {totalCaseStudies}
              </span>

              <span className="blog-stat-label">
                {t(
                  'case_studies_count',
                  {
                    ns: 'common',
                    defaultValue:
                      'Case Studies',
                  }
                )}
              </span>
            </div>

            <div className="blog-stat-divider" />

            <div className="blog-stat">
              <span className="blog-stat-number">
                {serviceCategories.length}
              </span>

              <span className="blog-stat-label">
                {t(
                  'categories_count',
                  {
                    ns: 'common',
                    defaultValue:
                      'Categories',
                  }
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Services grid */}
        <div className="service-listing-grid">
          {servicesData.map(
            (service) => {
              const caseStudyCount =
                service.caseStudies
                  ?.length ?? 0

              const caseStudyLabel =
                caseStudyCount === 1
                  ? t(
                    'case_study',
                    {
                      ns: 'common',
                      defaultValue:
                        'case study',
                    }
                  )
                  : t(
                    'case_studies',
                    {
                      ns: 'common',
                      defaultValue:
                        'case studies',
                    }
                  )

              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                >
                  {/* Top */}
                  <div className="service-listing-top">
                    <span className="service-listing-number">
                      {service.number}
                    </span>

                    <span
                      className="service-listing-icon"
                      aria-hidden="true"
                    >
                      {service.icon}
                    </span>
                  </div>

                  {/* Body */}
                  <h2 className="service-listing-title">
                    {t(
                      service.titleKey,
                      {
                        ns: 'services',
                        defaultValue:
                          service.titleKey,
                      }
                    )}
                  </h2>

                  <p className="service-listing-desc">
                    {t(
                      service.descriptionKey,
                      {
                        ns: 'services',
                        defaultValue:
                          service.descriptionKey,
                      }
                    )}
                  </p>

                  {/* Tools preview */}
                  <div className="service-listing-tools">
                    {service.tools
                      .slice(0, 4)
                      .map((tool) => (
                        <span
                          key={`${service.slug}-${tool}`}
                          className="accordion-tool-tag"
                        >
                          {tool}
                        </span>
                      ))}

                    {service.tools.length >
                      4 && (
                      <span
                        className="accordion-tool-tag"
                        style={{
                          opacity: 0.5,
                        }}
                      >
                        +
                        {service.tools
                          .length - 4}
                      </span>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="service-listing-footer">
                    <span className="service-listing-count">
                      {caseStudyCount}{' '}
                      {caseStudyLabel}
                    </span>

                    <span className="service-listing-arrow">
                      {t(
                        'view_details',
                        {
                          ns: 'common',
                          defaultValue:
                            'View Details',
                        }
                      )}

                      <svg
                        width="14"
                        height="14"
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
                    </span>
                  </div>
                </Link>
              )
            }
          )}
        </div>

        {/* CTA */}
        <div className="service-page-cta">
          <p>
            {t('cant_find', {
              ns: 'common',
              defaultValue:
                "Can't find what you're looking for?",
            })}
          </p>

          <Link href="/#contact">
            {t(
              'lets_talk_project',
              {
                ns: 'common',
                defaultValue:
                  "Let's talk about your project",
              }
            )}
          </Link>
        </div>
      </main>
    </div>
  )
}