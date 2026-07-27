'use client'

import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'

const projects = [
  {
    id: 1,
    slug: 'e-commerce-platform',
    titleKey: 'portfolio.projects.ecommerce',
    year: '2024',
    tags: ['WEB DEV', 'UI/UX'],
    bg: '#e8e0d5',
    accent: '#111',
    image: '/images/mockup2.png',
  },
  {
    id: 2,
    slug: 'branding-identity',
    titleKey: 'portfolio.projects.branding',
    year: '2024',
    tags: ['BRANDING', 'ILLUSTRATION'],
    bg: '#f06b6b',
    accent: '#fff',
    image: '/images/mockup1.png',
  },
  {
    id: 3,
    slug: 'logo-design-collection',
    titleKey: 'portfolio.projects.logos',
    year: '2025',
    tags: ['BRANDING', 'ILLUSTRATION'],
    bg: '#4ec9c9',
    accent: '#fff',
    image: '/images/mockup1.png',
  },
  {
    id: 4,
    slug: 'mobile-app-design',
    titleKey: 'portfolio.projects.mobile',
    year: '2024',
    tags: ['UI/UX', 'MOBILE'],
    bg: '#c8e6c9',
    accent: '#111',
    image: '/images/mockup2.png',
  },
  {
    id: 5,
    slug: 'saas-dashboard',
    titleKey: 'portfolio.projects.saas',
    year: '2023',
    tags: ['WEB DEV', 'UI/UX'],
    bg: '#e8d5f0',
    accent: '#111',
    image: '/images/mockup1.png',
  },
  {
    id: 6,
    slug: 'brand-identity-system',
    titleKey: 'portfolio.projects.identity',
    year: '2023',
    tags: ['BRANDING'],
    bg: '#ffd180',
    accent: '#111',
    image: '/images/mockup2.png',
  },
]

const VISIBLE_COUNT = 3

function AnimatedLabel({ text }) {
  return text.split('').map((char, index) => {
    if (char === ' ') {
      return <span key={`space-${index}`}> </span>
    }
    return <span key={`${char}-${index}`}>{char}</span>
  })
}

export default function Portfolio() {
  const router = useRouter()
  const { t } = useTranslation('home')

  const visibleProjects = projects.slice(0, VISIBLE_COUNT)

  const viewAllText = t('portfolio.view_all')

  return (
    <section
      id="portfolio"
      className="portfolio-section"
    >
      <div className="portfolio-header">
        <p
          className="section-label"
          style={{ textAlign: 'center' }}
        >
          {t('portfolio.label')}
        </p>

        <h2 className="portfolio-main-title">
          {t('portfolio.title')}
        </h2>

        <p className="portfolio-subtitle">
          {t('portfolio.intro_start')}{' '}

          <strong>
            {t('portfolio.web_development')}
          </strong>
          {', '}

          <strong>
            {t('portfolio.ui_ux_design')}
          </strong>
          {', '}

          <strong>
            {t('portfolio.graphic_design')}
          </strong>
          {', '}

          <strong>
            {t('portfolio.mobile_development')}
          </strong>{' '}

          {t('portfolio.projects_suffix')}
        </p>
      </div>

      <div className="portfolio-grid-new">
        {visibleProjects.map((project) => {
          const projectTitle = t(project.titleKey)

          return (
            <div
              key={project.id}
              className="portfolio-card"
              style={{
                '--card-bg': project.bg,
                '--card-accent': project.accent,
                cursor: 'pointer',
              }}
              onClick={() =>
                router.push(`/portfolio/${project.slug}`)
              }
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  router.push(`/portfolio/${project.slug}`)
                }
              }}
              role="link"
              tabIndex={0}
            >
              <div className="portfolio-card-top">
                <span className="portfolio-dash">
                  —
                </span>

                <span className="portfolio-year">
                  {project.year}
                </span>
              </div>

              <h3
                className="portfolio-card-title"
                style={{
                  color: project.accent,
                }}
              >
                {projectTitle}
              </h3>

              <p
                className="portfolio-card-cat"
                style={{
                  color: project.accent,
                  opacity: 0.7,
                }}
              >
                {t('portfolio.case_study')}
              </p>

              <div className="portfolio-card-img-wrap">
                <img 
                  src={project.image} 
                  alt={projectTitle}
                  className="portfolio-card-img"
                />
              </div>

              <div className="portfolio-card-tags">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="portfolio-tag"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="portfolio-card-overlay">
                <span className="portfolio-overlay-text">
                  {t('portfolio.view_project')}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      <div
        className="portfolio-pins"
        aria-hidden="true"
      >
        <span
          className="portfolio-pin"
          style={{ left: '18%' }}
        />

        <span
          className="portfolio-pin"
          style={{ left: '50%' }}
        />

        <span
          className="portfolio-pin"
          style={{ left: '82%' }}
        />
      </div>

      <div className="portfolio-show-more">
        <Link href="/portfolio" className="connect-btn">
          <span
            className="connect-dot"
            aria-hidden="true"
          />

          <span className="connect-animated">
            <span
              className="span-mother"
              aria-hidden="true"
            >
              <AnimatedLabel text={viewAllText} />
            </span>

            <span className="span-mother2">
              <AnimatedLabel text={viewAllText} />
            </span>
          </span>
        </Link>
      </div>
    </section>
  )
}