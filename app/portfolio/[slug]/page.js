import { projects } from '@/lib/projectsData'
import ProjectSidebar from '@/components/portfolio/ProjectSidebar'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params  // ✅ await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return {}
  return {
    title: `${project.title} — Teravolt`,
    description: project.excerpt,
  }
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params  // ✅ await params

  const project = projects.find((p) => p.slug === slug)
  if (!project) notFound()

  const related = projects
    .filter((p) => p.category === project.category && p.slug !== project.slug)
    .slice(0, 3)

  return (
    <div className="blog-post-page">

      {/* Sidebar */}
      <ProjectSidebar projects={projects} />

      {/* Main */}
      <main className="blog-post-main">

        {/* Back link */}
        <Link href="/portfolio" className="blog-back-link">
          ← Back to Portfolio
        </Link>

        <article className="blog-post-article">

          {/* Header */}
          <div className="blog-post-header">

            {/* Meta row */}
            <div className="blog-post-meta-row">
              <div className="blog-post-category">
                <span>◆</span>
                <span>{project.category}</span>
              </div>
              <span className="blog-meta-date">🗓 {project.date}</span>
              <span className="blog-meta-date">⏱ {project.readTime}</span>
            </div>

            {/* Title */}
            <h1 className="blog-post-title">{project.title}</h1>

            {/* Excerpt */}
            <p className="blog-post-excerpt">{project.excerpt}</p>

            {/* Tags */}
            <div className="blog-card-tags">
              {project.tags.map((tag, i) => (
                <span key={i} className="blog-tag">{tag}</span>
              ))}
            </div>

            {/* CTA Links */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-btn-primary"
                  style={{ fontSize: '0.88rem', padding: '0.7rem 1.6rem' }}
                >
                  View Live Site ↗
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-btn-secondary"
                  style={{ fontSize: '0.88rem', padding: '0.7rem 1.6rem' }}
                >
                  GitHub →
                </a>
              )}
            </div>

          </div>

          <hr className="blog-post-divider" />

          {/* Hero Image */}
          <div
            style={{
              width: '100%',
              borderRadius: '16px',
              overflow: 'hidden',
              marginBottom: '2.5rem',
              border: '1px solid var(--border)',
            }}
          >
            <img                          
              src={project.image}
              alt={project.title}
              style={{
                objectFit: 'cover',
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />
          </div>

          {/* Post Body */}
          <div className="blog-post-body">

            <h2>Project Overview</h2>
            <p>{project.description}</p>

            <h2>The Challenge</h2>
            <p>{project.challenge}</p>

            <h2>Our Solution</h2>
            <p>{project.solution}</p>

            {/* Screenshots */}
            {project.images && project.images.length > 1 && (
              <>
                <h2>Screenshots</h2>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '1rem',
                  }}
                >
                  {project.images.slice(1).map((img, i) => (
                    <div
                      key={i}
                      style={{
                        borderRadius: '12px',
                        overflow: 'hidden',
                        border: '1px solid var(--border)',
                      }}
                    >
                      <img               
                        src={img}
                        alt={`${project.title} screenshot ${i + 2}`}
                        style={{
                          objectFit: 'cover',
                          width: '100%',
                          height: 'auto',
                          display: 'block',
                        }}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Tech Stack */}
            <h2>Tech Stack</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {project.techStack.map((tech, i) => (
                <span
                  key={i}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    fontWeight: '700',
                    padding: '0.4rem 1rem',
                    borderRadius: '50px',
                    border: '1.5px solid var(--border)',
                    color: 'var(--black)',
                    background: 'transparent',
                    letterSpacing: '0.3px',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

          </div>
        </article>

        {/* Related Projects */}
        {related.length > 0 && (
          <div className="blog-related">
            <h3 className="blog-related-title">Related Projects</h3>
            <div className="blog-related-grid">
              {related.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/portfolio/${rel.slug}`}
                  className="blog-related-card"
                >
                  <span className="blog-related-category">
                    {rel.category}
                  </span>
                  <span className="blog-related-card-title">
                    {rel.title}
                  </span>
                  <span className="blog-related-date">{rel.date}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  )
}