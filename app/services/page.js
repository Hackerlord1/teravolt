'use client'
import { useState } from 'react'
import Link from 'next/link'
import { servicesData, serviceCategories } from '@/lib/servicesData'
import ServiceSidebar from '@/components/services/ServiceSidebar'

export default function ServicesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="blog-page">

      {/* Mobile Toggle */}
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

        {/* Header */}
        <div className="blog-page-header">
          <p className="section-label">// What We Offer</p>
          <h1 className="blog-page-title">
            Our <span>Services</span>
          </h1>
          <p className="blog-page-subtitle">
            Explore our full range of digital services — from web development to performance optimization.
            <strong> Click any service to view case studies.</strong>
          </p>

          {/* Stats */}
          <div className="blog-stats-row">
            <div className="blog-stat">
              <span className="blog-stat-number">{servicesData.length}</span>
              <span className="blog-stat-label">Services</span>
            </div>
            <div className="blog-stat-divider" />
            <div className="blog-stat">
              <span className="blog-stat-number">
                {servicesData.reduce((sum, s) => sum + s.caseStudies.length, 0)}
              </span>
              <span className="blog-stat-label">Case Studies</span>
            </div>
            <div className="blog-stat-divider" />
            <div className="blog-stat">
              <span className="blog-stat-number">{serviceCategories.length}</span>
              <span className="blog-stat-label">Categories</span>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="service-listing-grid">
          {servicesData.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="service-listing-card"
            >
              {/* Top */}
              <div className="service-listing-top">
                <span className="service-listing-number">{service.number}</span>
                <span className="service-listing-icon">{service.icon}</span>
              </div>

              {/* Body */}
              <h2 className="service-listing-title">{service.title}</h2>
              <p className="service-listing-desc">{service.description}</p>

              {/* Tools Preview */}
              <div className="service-listing-tools">
                {service.tools.slice(0, 4).map((tool, i) => (
                  <span key={i} className="accordion-tool-tag">{tool}</span>
                ))}
                {service.tools.length > 4 && (
                  <span className="accordion-tool-tag" style={{ opacity: 0.5 }}>
                    +{service.tools.length - 4}
                  </span>
                )}
              </div>

              {/* Footer */}
              <div className="service-listing-footer">
                <span className="service-listing-count">
                  {service.caseStudies.length} case stud{service.caseStudies.length !== 1 ? 'ies' : 'y'}
                </span>
                <span className="service-listing-arrow">
                  View Details
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M7 7h10v10" />
                    <path d="M7 17L17 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="service-page-cta">
          <p>Can't find what you're looking for?</p>
          <Link href="/#contact" className="pricing-talk-link">
            Let's talk about your project →
          </Link>
        </div>

      </main>
    </div>
  )
}