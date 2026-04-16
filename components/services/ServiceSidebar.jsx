'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { servicesData, serviceCategoryCounts } from '@/lib/servicesData'

export default function ServiceSidebar({ isOpen, onClose }) {
  const pathname = usePathname()

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Close on ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  // Close on navigation
  useEffect(() => {
    onClose?.()
  }, [pathname])

  return (
    <>
      {/* Backdrop — mobile only */}
      <div
        className={`sidebar-backdrop ${isOpen ? 'sidebar-backdrop--visible' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside className={`blog-sidebar blog-sidebar--compact ${isOpen ? 'blog-sidebar--open' : ''}`}>
        <div className="blog-sidebar-inner">

          {/* Close — mobile only */}
          <button className="sidebar-close" onClick={onClose} aria-label="Close sidebar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          

          {/* Services Nav */}
          <p className="blog-sidebar-label">Our Services</p>
          <nav className="blog-sidebar-nav blog-sidebar-nav--compact">
            {servicesData.map((service) => {
              const isActive = pathname === `/services/${service.slug}`
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className={`blog-sidebar-item blog-sidebar-item--compact ${
                    isActive ? 'blog-sidebar-item--active' : ''
                  }`}
                >
                  <span style={{ fontSize: '0.9rem', flexShrink: 0, marginTop: '0.1rem' }}>
                    {service.icon}
                  </span>
                  <span className="blog-sidebar-item-text">
                    {service.title}
                  </span>
                  {isActive && <span className="blog-sidebar-active-dot" />}
                </Link>
              )
            })}
          </nav>

          <div className="blog-sidebar-divider" />

          {/* Categories */}
          <p className="blog-sidebar-label">Categories</p>
          <div className="blog-sidebar-categories blog-sidebar-categories--compact">
            {serviceCategoryCounts.map((cat) => (
              <div key={cat.name} className="blog-sidebar-cat blog-sidebar-cat--compact">
                <span>{cat.name}</span>
                <span className="blog-sidebar-cat-count blog-sidebar-cat-count--compact">
                  {cat.count}
                </span>
              </div>
            ))}
          </div>

          <div className="blog-sidebar-divider" />

          {/* Quick Stats */}
          <p className="blog-sidebar-label">Overview</p>
          <div className="blog-sidebar-categories blog-sidebar-categories--compact">
            <div className="blog-sidebar-cat blog-sidebar-cat--compact">
              <span>Total Services</span>
              <span className="blog-sidebar-cat-count blog-sidebar-cat-count--compact">
                {servicesData.length}
              </span>
            </div>
            <div className="blog-sidebar-cat blog-sidebar-cat--compact">
              <span>Case Studies</span>
              <span className="blog-sidebar-cat-count blog-sidebar-cat-count--compact">
                {servicesData.reduce((sum, s) => sum + s.caseStudies.length, 0)}
              </span>
            </div>
          </div>

          <div className="blog-sidebar-divider" />

          {/* Back Home */}
          <Link href="/#services" className="blog-sidebar-home-link">
            ← Back to Home
          </Link>

        </div>
      </aside>
    </>
  )
}