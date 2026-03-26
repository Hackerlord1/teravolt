import Link from 'next/link'

export default function ProjectFeatured({ project }) {
  if (!project) return null

  return (
    <Link href={`/portfolio/${project.slug}`} className="blog-featured-card">

      {/* Top row */}
      <div className="blog-featured-top">
        <span className="blog-featured-badge">★ Featured Project</span>
        <div className="blog-featured-meta">
          <span className="blog-meta-date">🗓 {project.date}</span>
          <span className="blog-meta-dot">·</span>
          <span className="blog-meta-date">{project.readTime}</span>
        </div>
      </div>

      {/* Body */}
      <div className="blog-featured-body">

        {/* Left */}
        <div className="blog-featured-left">
          <p className="blog-featured-category">{project.category}</p>
          <h2 className="blog-featured-title">{project.title}</h2>
          <p className="blog-featured-excerpt">{project.excerpt}</p>
          <div className="blog-card-tags">
            {project.tags.map((tag, i) => (
              <span key={i} className="blog-tag">{tag}</span>
            ))}
          </div>
        </div>

        {/* Right — image preview */}
        <div className="blog-featured-right">
          <div
            style={{
              width: '155px',
              height: '155px',
              borderRadius: '14px',
              overflow: 'hidden',
              border: '2px solid var(--border)',
              flexShrink: 0,
            }}
          >
            <img                         
              src={project.image}
              alt={project.title}
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%',
              }}
            />
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="blog-featured-footer">
        <span className="blog-read-link">View Project ↗</span>
        <span className="blog-featured-readtime">
          {project.year} · {project.category}
        </span>
      </div>

    </Link>
  )
}