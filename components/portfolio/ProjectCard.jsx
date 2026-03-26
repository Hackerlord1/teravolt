import Link from 'next/link'

export default function ProjectCard({ project }) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="blog-card"
    >
      {/* Header */}
      <div className="blog-card-header">
        <span className="blog-card-category-pill">
          {project.category}
        </span>
        <span style={{ fontSize: '0.72rem', color: 'var(--gray)' }}>
          {project.year}
        </span>
      </div>

      {/* Image */}
      <div
        style={{
          width: '100%',
          borderRadius: '10px',
          overflow: 'hidden',
          aspectRatio: '16/9',
        }}
      >
        <img                             
          src={project.image}
          alt={project.title}
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
            display: 'block',
          }}
        />
      </div>

      {/* Title */}
      <h3 className="blog-card-title">{project.title}</h3>

      {/* Excerpt */}
      <p className="blog-card-excerpt">{project.excerpt}</p>

      {/* Tags */}
      <div className="blog-card-tags">
        {project.tags.map((tag, i) => (
          <span key={i} className="blog-tag">{tag}</span>
        ))}
      </div>

      {/* Footer */}
      <div className="blog-card-footer">
        <span className="blog-card-readtime">{project.readTime}</span>
        <span className="blog-card-read">View Project →</span>
      </div>
    </Link>
  )
}