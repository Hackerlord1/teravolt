'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import {
  getServiceBySlug,
} from '@/lib/servicesData'
import ServiceSidebar from '@/components/services/ServiceSidebar'

export default function ServiceDetailPage() {
  const { t } = useTranslation([
    'services',
    'common',
  ])

  const params = useParams()

  const slug = Array.isArray(params?.slug)
    ? params.slug[0]
    : params?.slug

  const service =
    getServiceBySlug(slug)

  const [
    sidebarOpen,
    setSidebarOpen,
  ] = useState(false)

  /*
   * This is a client component because the selected
   * language is managed in the browser.
   *
   * Render a translated fallback instead of calling
   * notFound() from the client component.
   */
  if (!service) {
    return (
      <div className="blog-notfound">
        <h1>
          {t(
            'service_not_found',
            {
              ns: 'common',
              defaultValue:
                'Service not found',
            }
          )}
        </h1>

        <p>
          {t(
            'service_not_found_description',
            {
              ns: 'common',
              defaultValue:
                'The service you are looking for does not exist.',
            }
          )}
        </p>

        <Link href="/services">
          ←{' '}
          {t(
            'all_services',
            {
              ns: 'common',
              defaultValue:
                'All Services',
            }
          )}
        </Link>
      </div>
    )
  }

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
          {t(
            'services',
            {
              ns: 'common',
              defaultValue:
                'Services',
            }
          )}
        </span>
      </button>

      <ServiceSidebar
        isOpen={sidebarOpen}
        onClose={() =>
          setSidebarOpen(false)
        }
      />

      <main className="blog-content">
        {/* Back link */}
        <Link href="/services">
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
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>

          {t(
            'all_services',
            {
              ns: 'common',
              defaultValue:
                'All Services',
            }
          )}
        </Link>

        {/* Service hero */}
        <div className="service-hero">
          <span className="service-hero-number">
            {t(
              'service_number',
              {
                ns: 'common',
                number: service.number,
                defaultValue:
                  'SERVICE {{number}}',
              }
            )}
          </span>

          <span
            className="service-hero-icon"
            aria-hidden="true"
          >
            {service.icon}
          </span>

          <h1 className="service-hero-title">
            {t(
              service.titleKey,
              {
                ns: 'services',
              }
            )}
          </h1>

          <p className="service-hero-subtitle">
            {t(
              service.subtitleKey,
              {
                ns: 'services',
              }
            )}
          </p>

          <p className="service-hero-desc">
            {t(
              service.fullDescriptionKey,
              {
                ns: 'services',
              }
            )}
          </p>

          <div className="service-hero-tools">
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
        </div>

        <hr className="blog-post-divider" />

        {/* Process */}
        <section className="service-process">
          <p className="section-label">
            {t(
              'how_we_work',
              {
                ns: 'common',
                defaultValue:
                  '// How We Work',
              }
            )}
          </p>

          <h2 className="service-section-title">
            {t(
              'our_process',
              {
                ns: 'common',
                defaultValue:
                  'Our Process',
              }
            )}
          </h2>

          <div className="service-process-grid">
            {service.process.map(
              (step) => (
                <div
                  key={`${service.slug}-${step.step}`}
                  className="service-process-card"
                >
                  <span className="service-process-step">
                    {step.step}
                  </span>

                  <h3 className="service-process-name">
                    {t(
                      step.titleKey,
                      {
                        ns: 'services',
                      }
                    )}
                  </h3>

                  <p className="service-process-desc">
                    {t(
                      step.descKey,
                      {
                        ns: 'services',
                      }
                    )}
                  </p>
                </div>
              )
            )}
          </div>
        </section>

        <hr className="blog-post-divider" />
      </main>
    </div>
  )
}