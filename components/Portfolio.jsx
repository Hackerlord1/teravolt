'use client'
import { useRouter } from 'next/navigation'

const projects = [
  {
    id: 1,
    slug: 'e-commerce-platform',
    title: 'E-Commerce Platform',
    category: 'CASE STUDY',
    year: '2024',
    tags: ['WEB DEV', 'UI/UX'],
    bg: '#e8e0d5',
    accent: '#111',
    image: '/images/mockup2.png',
    featured: false,
  },
  {
    id: 2,
    slug: 'branding-identity',
    title: 'BRANDING',
    category: 'CASE STUDY',
    year: '2024',
    tags: ['BRANDING', 'ILLUSTRATION'],
    bg: '#f06b6b',
    accent: '#fff',
    image: '/images/mockup1.png',
    featured: true,
  },
  {
    id: 3,
    slug: 'logo-design-collection',
    title: 'LOGOS',
    category: 'CASE STUDY',
    year: '2025',
    tags: ['BRANDING', 'ILLUSTRATION'],
    bg: '#4ec9c9',
    accent: '#fff',
    image: '/images/mockup1.png',
    featured: false,
  },
  {
    id: 4,
    slug: 'mobile-app-design',
    title: 'Mobile App Design',
    category: 'CASE STUDY',
    year: '2024',
    tags: ['UI/UX', 'MOBILE'],
    bg: '#c8e6c9',
    accent: '#111',
    image: '/images/mockup2.png',
    featured: false,
  },
  {
    id: 5,
    slug: 'saas-dashboard',
    title: 'SaaS Dashboard',
    category: 'CASE STUDY',
    year: '2023',
    tags: ['WEB DEV', 'UI/UX'],
    bg: '#e8d5f0',
    accent: '#111',
    image: '/images/mockup1.png',
    featured: false,
  },
  {
    id: 6,
    slug: 'brand-identity-system',
    title: 'Brand Identity',
    category: 'CASE STUDY',
    year: '2023',
    tags: ['BRANDING'],
    bg: '#ffd180',
    accent: '#111',
    image: '/images/mockup2.png',
    featured: false,
  },
]

const VISIBLE_COUNT = 3

export default function Portfolio() {
  const router = useRouter()
  const visible = projects.slice(0, VISIBLE_COUNT)

  return (
    <section id="portfolio" className="portfolio-section">

      {/* Header */}
      <div className="portfolio-header">
        <p className="section-label" style={{ textAlign: 'center' }}>
          Our portfolio
        </p>
        <h2 className="portfolio-main-title">Featured Works</h2>
        <p className="portfolio-subtitle">
          Welcome to a portfolio of{' '}
          <strong>Web Development</strong>,{' '}
          <strong>User-Centered UI/UX Design</strong>,{' '}
          <strong>Graphic Design</strong>, and{' '}
          <strong>Mobile App Development</strong> projects.
        </p>
      </div>

      {/* Grid */}
      <div className="portfolio-grid-new">
        {visible.map((project) => (
          <div
            key={project.id}
            className={`portfolio-card ${
              project.featured ? 'portfolio-card--featured' : ''
            }`}
            style={{
              '--card-bg': project.bg,
              '--card-accent': project.accent,
              cursor: 'pointer',
            }}
            onClick={() => router.push(`/portfolio/${project.slug}`)}
          >
            {/* Top bar */}
            <div className="portfolio-card-top">
              <span className="portfolio-dash">—</span>
              <span className="portfolio-year">{project.year}</span>
            </div>

            {/* Title */}
            <h3
              className="portfolio-card-title"
              style={{ color: project.accent }}
            >
              {project.title}
            </h3>
            <p
              className="portfolio-card-cat"
              style={{ color: project.accent, opacity: 0.7 }}
            >
              {project.category}
            </p>

            {/* Image */}
            <div className="portfolio-card-img-wrap">
              <img
                src={project.image}
                alt={project.title}
                className="portfolio-card-img"
              />
            </div>

            {/* Tags */}
            <div className="portfolio-card-tags">
              {project.tags.map((tag, j) => (
                <span key={j} className="portfolio-tag">
                  {tag}
                </span>
              ))}
            </div>

            {/* Hover overlay */}
            <div className="portfolio-card-overlay">
              <span className="portfolio-overlay-text">View Project ↗</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pins — decorative */}
      <div className="portfolio-pins" aria-hidden="true">
        <span className="portfolio-pin" style={{ left: '18%' }} />
        <span className="portfolio-pin" style={{ left: '50%' }} />
        <span className="portfolio-pin" style={{ left: '82%' }} />
      </div>

      {/* ✅ View All Work — same animation as connect button */}
      <div className="portfolio-show-more">
        <a href="/portfolio" className="connect-btn">
          <span className="connect-dot" aria-hidden="true" />
          <span className="connect-animated">
            <span className="span-mother" aria-hidden="true">
              {'View All Work ↗'.split('').map((char, i) => (
                <span key={i}>{char === ' ' ? '\u00A0' : char}</span>
              ))}
            </span>
            <span className="span-mother2">
              {'View All Work ↗'.split('').map((char, i) => (
                <span key={i}>{char === ' ' ? '\u00A0' : char}</span>
              ))}
            </span>
          </span>
        </a>
      </div>

    </section>
  )
}