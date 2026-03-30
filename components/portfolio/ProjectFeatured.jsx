'use client'
import Link from 'next/link'

export default function ProjectFeatured({ project }) {
  if (!project) return null

  return (
    <div className="pf-featured">
      <div className="pf-featured-img-wrap">

        {/* Image */}
        <img
          src={project.image}
          alt={project.title}
          className="pf-featured-img"
        />

        {/* Badge — always visible */}
        <span className="pf-featured-badge">★ Featured Project</span>

        {/* Bottom overlay with info */}
        <div className="pf-featured-overlay">
          <div className="pf-featured-info">
            <span className="pf-featured-category">
              {project.category} · {project.year}
            </span>
            <h2 className="pf-featured-title">{project.title}</h2>

            <div className="pf-card-actions">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pf-card-btn pf-card-btn--primary"
                  onClick={(e) => e.stopPropagation()}
                >
                  Visit Site ↗
                </a>
              ) : (
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="pf-card-btn pf-card-btn--primary"
                >
                  View Project →
                </Link>
              )}

              <Link
                href={`/portfolio/${project.slug}`}
                className="pf-card-btn pf-card-btn--secondary"
              >
                Details
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}