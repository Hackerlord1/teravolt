'use client'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import useLocalizedProjects from '@/hooks/useLocalizedProjects'
import ProjectSidebar from '@/components/portfolio/ProjectSidebar'
import ProjectFeatured from '@/components/portfolio/ProjectFeatured'
import ProjectCard from '@/components/portfolio/ProjectCard'

export default function PortfolioPage() {
  const { t } = useTranslation('portfolio')
  const projects = useLocalizedProjects()
  const [activeFilter, setActiveFilter] = useState('All')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const featuredProject = projects.find(
    (project) => project.featured
  )

  const projectCategories = [
    ...new Set(
      projects.map(
        (project) => project.category
      )
    ),
  ]

  const regularProjects = projects.filter((p) => !p.featured)
  const filteredProjects =
    activeFilter === 'All'
      ? regularProjects
      : regularProjects.filter((p) => p.category === activeFilter)

  return (
    <section className="portfolio-section">
      {/* Header */}
      <div className="portfolio-header">
        <p className="section-label">
          {t('listing.section_label', { defaultValue: '// Our Work' })}
        </p>
        <h1 className="portfolio-main-title">
          {t('listing.title', { defaultValue: 'Featured' })}{' '}
          <span>{t('listing.title_highlight', { defaultValue: 'Works' })}</span>
        </h1>
        <p className="portfolio-subtitle">
          {t('listing.subtitle', { defaultValue: "A curated selection of our best projects — let the work speak for itself." })}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="pf-filters" style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <button
          className={`pf-filter-tab ${activeFilter === 'All' ? 'pf-filter-tab--active' : ''}`}
          onClick={() => setActiveFilter('All')}
          style={{
            padding: '0.5rem 1.2rem',
            border: '1.5px solid var(--border)',
            borderRadius: '50px',
            background: activeFilter === 'All' ? 'var(--black)' : 'transparent',
            color: activeFilter === 'All' ? 'var(--bg)' : 'var(--black)',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: 600,
            transition: 'all 0.2s ease',
          }}
        >
          {t('listing.all', { defaultValue: 'All' })}
        </button>
        {projectCategories.map((cat) => (
          <button
            key={cat}
            className={`pf-filter-tab ${activeFilter === cat ? 'pf-filter-tab--active' : ''}`}
            onClick={() => setActiveFilter(cat)}
            style={{
              padding: '0.5rem 1.2rem',
              border: '1.5px solid var(--border)',
              borderRadius: '50px',
              background: activeFilter === cat ? 'var(--black)' : 'transparent',
              color: activeFilter === cat ? 'var(--bg)' : 'var(--black)',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: 600,
              transition: 'all 0.2s ease',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured project */}
      <ProjectFeatured project={featuredProject} />

      {/* Grid */}
      <div className="portfolio-grid-new">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Empty state */}
      {filteredProjects.length === 0 && (
        <div className="pf-empty" style={{ textAlign: 'center', padding: '3rem', color: 'var(--gray)' }}>
          <p>{t('listing.empty', { defaultValue: 'No projects in this category yet.' })}</p>
        </div>
      )}

      {/* Show More */}
      {filteredProjects.length > 6 && (
        <div className="portfolio-show-more">
          <button className="show-more-btn">
            {t('listing.show_more', { defaultValue: 'Show More' })}
          </button>
        </div>
      )}
    </section>
  )
}