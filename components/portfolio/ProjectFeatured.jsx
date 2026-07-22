'use client'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

export default function ProjectFeatured({ project }) {
  const { t } = useTranslation('portfolio')

  if (!project) return null

  return (
    <Link 
      href={`/portfolio/${project.slug}`} 
      className="portfolio-card portfolio-card--featured"
    >
      <div className="portfolio-card-img-wrap">
        <img 
          src={project.image} 
          alt={project.title} 
          className="portfolio-card-img" 
        />
        <div className="portfolio-card-overlay">
          <span className="portfolio-overlay-text">
            {t('card.view_project', { defaultValue: 'View Project →' })}
          </span>
        </div>
      </div>
      <div className="portfolio-card-top">
        <span className="portfolio-dash">★ {t('card.featured_project', { defaultValue: 'Featured' })}</span>
        <span className="portfolio-year">{project.year}</span>
      </div>
      <h2 className="portfolio-card-title">{project.title}</h2>
      <span className="portfolio-card-cat">{project.category}</span>
      <div className="portfolio-card-tags">
        {project.tags.map((tag) => (
          <span key={tag} className="portfolio-tag">{tag}</span>
        ))}
      </div>
    </Link>
  )
}