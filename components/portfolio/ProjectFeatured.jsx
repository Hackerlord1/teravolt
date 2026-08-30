'use client'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

export default function ProjectFeatured({ project }) {
  const { t } = useTranslation('portfolio')

  if (!project) return null

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="pw-feature"
    >
      <div className="pw-feature-media">
        <img
          src={project.image}
          alt={project.title}
          className="pw-feature-img"
        />
        <span className="pw-feature-badge">
          ★ {t('card.featured_project', { defaultValue: 'Featured' })}
        </span>
      </div>

      <div className="pw-feature-body">
        <div className="pw-card-meta">
          <span className="pw-card-cat">{project.category}</span>
          <span className="pw-card-year">{project.year}</span>
        </div>

        <h2 className="pw-feature-title">{project.title}</h2>

        {project.excerpt && (
          <p className="pw-feature-excerpt">{project.excerpt}</p>
        )}

        <div className="pw-card-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="pw-tag">{tag}</span>
          ))}
        </div>

        <span className="pw-feature-cta">
          {t('card.view_case_study', { defaultValue: 'View case study' })}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </Link>
  )
}
