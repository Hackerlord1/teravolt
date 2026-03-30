'use client'
import Link from 'next/link'

export default function ProjectCard({ project }) {
  return (
    <div className="pf-card">
      <div className="pf-card-img-wrap">

        {/* Image — the star */}
        <img
          src={project.image}
          alt={project.title}
          className="pf-card-img"
        />

        {/* Hover Overlay */}
        <div className="pf-card-overlay">
          <span className="pf-card-category">{project.category}</span>
          <h3 className="pf-card-title">{project.title}</h3>

          <div className="pf-card-actions">
            {/* Smart CTA */}
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

            {/* Always show Details link */}
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
  )
}