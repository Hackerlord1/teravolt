'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { projectCategories } from '@/lib/projectsData'

export default function ProjectSidebar({ projects, isOpen, onClose }) {
  const pathname = usePathname()

  const categoryCounts = projectCategories.map((cat) => ({
    name: cat,
    count: projects.filter((p) => p.category === cat).length,
  }))

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  // Close when navigating
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

          {/* Close button — mobile only */}
          <button
            className="sidebar-close"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Label */}
          <p className="blog-sidebar-label">Projects</p>

          {/* Nav — all projects */}
          <nav className="blog-sidebar-nav blog-sidebar-nav--compact">
            {projects.map((project) => {
              const isActive = pathname === `/portfolio/${project.slug}`
              return (
                <Link
                  key={project.id}
                  href={`/portfolio/${project.slug}`}
                  className={`blog-sidebar-item blog-sidebar-item--compact ${
                    isActive ? 'blog-sidebar-item--active' : ''
                  } ${project.featured ? 'blog-sidebar-item--featured' : ''}`}
                >
                  {project.featured && (
                    <span className="blog-sidebar-star">★</span>
                  )}
                  <span className="blog-sidebar-item-text">
                    {project.title}
                  </span>
                  {isActive && (
                    <span className="blog-sidebar-active-dot" />
                  )}
                </Link>
              )
            })}
          </nav>

          <div className="blog-sidebar-divider" />

          {/* Categories */}
          <p className="blog-sidebar-label">Categories</p>
          <div className="blog-sidebar-categories blog-sidebar-categories--compact">
            {categoryCounts.map((cat) => (
              <div key={cat.name} className="blog-sidebar-cat blog-sidebar-cat--compact">
                <span>{cat.name}</span>
                <span className="blog-sidebar-cat-count blog-sidebar-cat-count--compact">
                  {cat.count}
                </span>
              </div>
            ))}
          </div>

          <div className="blog-sidebar-divider" />

          {/* Back to site */}
          <Link href="/#portfolio" className="blog-sidebar-home-link">
            ← Back to Home
          </Link>

          {/* Social links */}
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

        </div>
      </aside>
    </>
  )
}