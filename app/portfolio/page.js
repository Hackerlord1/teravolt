'use client'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import useLocalizedProjects from '@/hooks/useLocalizedProjects'
import ProjectFeatured from '@/components/portfolio/ProjectFeatured'
import ProjectCard from '@/components/portfolio/ProjectCard'

export default function PortfolioPage() {
  const { t } = useTranslation('portfolio')
  const projects = useLocalizedProjects()
  const [activeFilter, setActiveFilter] = useState('All')

  const featuredProject = projects.find(
    (project) => project.featured
  )

  const projectCategories = [
    ...new Set(
      projects.map((project) => project.category)
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
      <div className="pf-section-header">
        <span className="pf-count">
          {filteredProjects.length}{' '}
          {t('listing.projects_count', { defaultValue: 'projects' })}
        </span>

        <div className="pf-filters">
          <button
            className={`pf-filter-tab ${activeFilter === 'All' ? 'pf-filter-tab--active' : ''}`}
            onClick={() => setActiveFilter('All')}
          >
            {t('listing.all', { defaultValue: 'All' })}
          </button>
          {projectCategories.map((cat) => (
            <button
              key={cat}
              className={`pf-filter-tab ${activeFilter === cat ? 'pf-filter-tab--active' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured project */}
      {featuredProject && (
        <div className="pf-featured">
          <ProjectFeatured project={featuredProject} />
        </div>
      )}

      {/* Grid */}
      <div className="pf-grid">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Empty state */}
      {filteredProjects.length === 0 && (
        <div className="pf-empty">
          <p>{t('listing.empty', { defaultValue: 'No projects in this category yet.' })}</p>
        </div>
      )}
    </section>
  )
}