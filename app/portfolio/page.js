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

  const featuredProject = projects.find((project) => project.featured)

  const projectCategories = [
    ...new Set(projects.map((project) => project.category)),
  ]

  const regularProjects = projects.filter((p) => !p.featured)
  const filteredProjects =
    activeFilter === 'All'
      ? regularProjects
      : regularProjects.filter((p) => p.category === activeFilter)

  return (
    <main className="pw-page">
      <header className="pw-hero">
        <p className="section-label">
          {t('listing.section_label', { defaultValue: '// Our Work' })}
        </p>
        <h1 className="pw-title">
          {t('listing.title', { defaultValue: 'Selected' })}{' '}
          <span>{t('listing.title_highlight', { defaultValue: 'Works' })}</span>
        </h1>
        <p className="pw-lead">
          {t('listing.subtitle', {
            defaultValue:
              'A curated selection of our best projects — let the work speak for itself.',
          })}
        </p>
      </header>

      <div className="pw-toolbar">
        <span className="pw-result-count">
          {filteredProjects.length}{' '}
          {t('listing.projects_count', { defaultValue: 'projects' })}
        </span>

        <div className="pw-filters">
          <button
            type="button"
            className={`pw-chip ${activeFilter === 'All' ? 'pw-chip--active' : ''}`}
            onClick={() => setActiveFilter('All')}
          >
            {t('listing.all', { defaultValue: 'All' })}
          </button>
          {projectCategories.map((cat) => (
            <button
              type="button"
              key={cat}
              className={`pw-chip ${activeFilter === cat ? 'pw-chip--active' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {featuredProject && activeFilter === 'All' && (
        <ProjectFeatured project={featuredProject} />
      )}

      {filteredProjects.length > 0 ? (
        <div className="pw-grid">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="pw-empty">
          <p>
            {t('listing.empty', {
              defaultValue: 'No projects in this category yet.',
            })}
          </p>
        </div>
      )}
    </main>
  )
}
