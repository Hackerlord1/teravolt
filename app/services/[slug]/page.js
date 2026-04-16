'use client'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getServiceBySlug, servicesData } from '@/lib/servicesData'
import ServiceSidebar from '@/components/services/ServiceSidebar'

export default function ServiceDetailPage() {
  const { slug } = useParams()
  const service = getServiceBySlug(slug)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (!service) return notFound()

  const currentIndex = servicesData.findIndex((s) => s.slug === slug)
  const prevService = currentIndex > 0 ? servicesData[currentIndex - 1] : null
  const nextService = currentIndex < servicesData.length - 1 ? servicesData[currentIndex + 1] : null

  return (
    <div className="blog-page">

      {/* Mobile Sidebar Toggle */}
      <button
        className="sidebar-toggle"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open service navigation"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="15" y2="12" />
          <line x1="3" y1="18" x2="18" y2="18" />
        </svg>
        <span>Services</span>
      </button>

      {/* Sidebar */}
      <ServiceSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <main className="blog-content">

        {/* Back Link */}
        <Link href="/services" className="blog-back-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
          All Services
        </Link>

        {/* ======================== */}
        {/* SERVICE HERO             */}
        {/* ======================== */}
        <div className="service-hero">
          <span className="service-hero-number">SERVICE {service.number}</span>
          <span className="service-hero-icon">{service.icon}</span>
          <h1 className="service-hero-title">{service.title}</h1>
          <p className="service-hero-subtitle">{service.subtitle}</p>
          <p className="service-hero-desc">{service.fullDescription}</p>

          {/* Tools */}
          <div className="service-hero-tools">
            {service.tools.map((tool, i) => (
              <span key={i} className="accordion-tool-tag">{tool}</span>
            ))}
          </div>
        </div>

        <hr className="blog-post-divider" />

        {/* ======================== */}
        {/* PROCESS                  */}
        {/* ======================== */}
        <section className="service-process">
          <p className="section-label">// How We Work</p>
          <h2 className="service-section-title">Our Process</h2>
          <div className="service-process-grid">
            {service.process.map((step, i) => (
              <div key={i} className="service-process-card">
                <span className="service-process-step">{step.step}</span>
                <h3 className="service-process-name">{step.title}</h3>
                <p className="service-process-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="blog-post-divider" />

        {/* ======================== */}
        {/* CASE STUDIES             */}
        {/* ======================== */}
        <section className="service-case-studies">
          <div className="service-cs-header">
            <div>
              <p className="section-label">// Our Work</p>
              <h2 className="service-section-title">Case Studies</h2>
            </div>
            <span className="pf-count">
              {service.caseStudies.length} project{service.caseStudies.length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="service-cs-grid">
            {service.caseStudies.map((cs) => (
              <div key={cs.id} className="pf-card">
                <div className="pf-card-img-wrap">
                  <img
                    src={cs.image}
                    alt={cs.title}
                    className="pf-card-img"
                  />
                  <div className="pf-card-overlay">
                    <span className="pf-card-category">{cs.category} · {cs.year}</span>
                    <h3 className="pf-card-title">{cs.title}</h3>
                    <div className="pf-card-actions">
                      {cs.liveUrl ? (
                        <a
                          href={cs.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pf-card-btn pf-card-btn--primary"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Visit Site ↗
                        </a>
                      ) : (
                        <span className="pf-card-btn pf-card-btn--primary" style={{ opacity: 0.5, cursor: 'default' }}>
                          Coming Soon
                        </span>
                      )}
                      <Link
                        href={`/portfolio/${cs.slug}`}
                        className="pf-card-btn pf-card-btn--secondary"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Card Info Below Image */}
                <div className="service-cs-card-info">
                  <h3 className="service-cs-card-title">{cs.title}</h3>
                  <p className="service-cs-card-excerpt">{cs.excerpt}</p>
                  <div className="service-cs-card-tags">
                    {cs.tags.map((tag, t) => (
                      <span key={t} className="accordion-tool-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="blog-post-divider" />

        

        {/* ======================== */}
        {/* PREV / NEXT NAV          */}
        {/* ======================== */}
        <div className="service-nav-row">
          {prevService ? (
            <Link href={`/services/${prevService.slug}`} className="service-nav-link service-nav-link--prev">
              <span className="service-nav-dir">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M19 12H5" />
                  <path d="M12 19l-7-7 7-7" />
                </svg>
                Previous
              </span>
              <span className="service-nav-name">{prevService.icon} {prevService.title}</span>
            </Link>
          ) : <div />}

          {nextService ? (
            <Link href={`/services/${nextService.slug}`} className="service-nav-link service-nav-link--next">
              <span className="service-nav-dir">
                Next
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </span>
              <span className="service-nav-name">{nextService.icon} {nextService.title}</span>
            </Link>
          ) : <div />}
        </div>

      </main>
    </div>
  )
}