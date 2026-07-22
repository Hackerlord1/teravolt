'use client'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

export default function ProjectCard({ project }) {
  const { t } = useTranslation('portfolio')

  return (
    <Link href={`/portfolio/${project.slug}`} className="portfolio-card">
      <div className="portfolio-card-img-wrap">
        <img src={project.image} alt={project.title} className="portfolio-card-img" />
        <div className="portfolio-card-overlay">
          <span className="portfolio-overlay-text">
            {t('card.view_project', { defaultValue: 'View Project →' })}
          </span>
        </div>
      </div>
      <div className="portfolio-card-top">
        <span className="portfolio-dash">—</span>
        <span className="portfolio-year">{project.year}</span>
      </div>
      <h3 className="portfolio-card-title">{project.title}</h3>
      <span className="portfolio-card-cat">{project.category}</span>
      <div className="portfolio-card-tags">
        {project.tags.map((tag) => (
          <span key={tag} className="portfolio-tag">{tag}</span>
        ))}
      </div>
    </Link>
  )
}