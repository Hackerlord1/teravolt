'use client'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

export default function ProjectCard({ project }) {
  const { t } = useTranslation('portfolio')

  return (
    <Link href={`/portfolio/${project.slug}`} className="pw-card">
      <div className="pw-card-media">
        <img
          src={project.image}
          alt={project.title}
          className="pw-card-img"
          loading="lazy"
        />
        <span className="pw-card-cta">
          {t('card.view_project', { defaultValue: 'View project' })}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7 17 17 7M8 7h9v9" />
          </svg>
        </span>
      </div>

      <div className="pw-card-body">
        <div className="pw-card-meta">
          <span className="pw-card-cat">{project.category}</span>
          <span className="pw-card-year">{project.year}</span>
        </div>

        <h3 className="pw-card-title">{project.title}</h3>

        {project.excerpt && (
          <p className="pw-card-excerpt">{project.excerpt}</p>
        )}

        <div className="pw-card-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="pw-tag">{tag}</span>
          ))}
        </div>
      </div>
    </Link>
  )
}
