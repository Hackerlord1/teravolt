'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import {
  servicesData,
  serviceCategoryCounts,
} from '@/lib/servicesData'

const socials = []

export default function ServiceSidebar({ isOpen, onClose }) {
  const pathname = usePathname()
  const { t } = useTranslation(['services', 'common'])
  const onCloseRef = useRef(onClose)

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  // Lock body scrolling while the mobile sidebar is open.
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Close the sidebar when the Escape key is pressed.
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose?.()
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  // Close the sidebar after navigation.
  useEffect(() => {
    onCloseRef.current?.()
  }, [pathname])

  const totalCaseStudies = servicesData.reduce(
    (total, service) => total + (service.caseStudies?.length ?? 0),
    0
  )

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={`sidebar-backdrop ${
          isOpen ? 'sidebar-backdrop--visible' : ''
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        className={`blog-sidebar blog-sidebar--compact ${
          isOpen ? 'blog-sidebar--open' : ''
        }`}
      >
        <div className="blog-sidebar-inner">
          {/* Mobile close button */}
          <button
            type="button"
            className="sidebar-close"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Services navigation */}
          <p className="blog-sidebar-label">
            {`${t('services_title', { ns: 'services' })} ${t('services_title_span', { ns: 'services' })}`}
          </p>

          <nav
            className="blog-sidebar-nav blog-sidebar-nav--compact"
            aria-label={t('services_title_span', { ns: 'services' })}
          >
            {servicesData.map((service) => {
              const serviceHref = `/services/${service.slug}`
              const isActive = pathname === serviceHref

              return (
                <Link
                  key={service.slug}
                  href={serviceHref}
                  className={`blog-sidebar-item blog-sidebar-item--compact ${
                    isActive ? 'blog-sidebar-item--active' : ''
                  }`}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      fontSize: '0.9rem',
                      flexShrink: 0,
                      marginTop: '0.1rem',
                    }}
                  >
                    {service.icon}
                  </span>

                  <span className="blog-sidebar-item-text">
                    {t(service.titleKey, { ns: 'services' })}
                  </span>

                  {isActive && (
                    <span
                      className="blog-sidebar-active-dot"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          <div className="blog-sidebar-divider" />

          {/* Service categories */}
          <p className="blog-sidebar-label">
            {t('categories_count', { ns: 'common' })}
          </p>

          <div className="blog-sidebar-categories blog-sidebar-categories--compact">
            {serviceCategoryCounts.map((category) => (
              <div
                key={category.nameKey}
                className="blog-sidebar-cat blog-sidebar-cat--compact"
              >
                <span>{t(category.nameKey, { ns: 'services' })}</span>

                <span className="blog-sidebar-cat-count blog-sidebar-cat-count--compact">
                  {category.count}
                </span>
              </div>
            ))}
          </div>

          <div className="blog-sidebar-divider" />
          <p className="blog-sidebar-label">
            {t('sidebar_overview', { ns: 'common' })}
          </p>

          <div className="blog-sidebar-categories blog-sidebar-categories--compact">
            <div className="blog-sidebar-cat blog-sidebar-cat--compact">
              <span>{t('sidebar_total_services', { ns: 'common' })}</span>

              <span className="blog-sidebar-cat-count blog-sidebar-cat-count--compact">
                {servicesData.length}
              </span>
            </div>

            <div className="blog-sidebar-cat blog-sidebar-cat--compact">
              <span>{t('sidebar_case_studies', { ns: 'common' })}</span>

              <span className="blog-sidebar-cat-count blog-sidebar-cat-count--compact">
                {totalCaseStudies}
              </span>
            </div>
          </div>

          <div className="blog-sidebar-divider" />

          {/* Back to home */}
          <Link href="/#services" className="blog-sidebar-home-link">
            ← {t('sidebar_back_to_home', { ns: 'common' })}
          </Link>

          {/* Social links */}
          {socials.length > 0 && (
            <div className="sidebar-socials">
              {socials.map((social) => (
                <a
                  key={social.id}
                  id={`sidebar-${social.id}`}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sidebar-social-btn"
                >
                  {social.icon}
                  <span>{social.label}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </aside>
    </>
  )
}