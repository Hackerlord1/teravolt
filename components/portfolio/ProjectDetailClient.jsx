'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import useLocalizedProjects from '@/hooks/useLocalizedProjects'
import ProjectSidebar from '@/components/portfolio/ProjectSidebar'

export default function ProjectDetailClient({
  slug,
}) {
  const { t } = useTranslation('portfolio')
  const projects = useLocalizedProjects()

  const project = projects.find(
    (item) => item.slug === slug
  )

  if (!project) {
    return null
  }

  const relatedProjects = projects
    .filter(
      (item) =>
        item.category === project.category &&
        item.slug !== project.slug
    )
    .slice(0, 3)

  return (
    <div className="blog-post-page">
      <ProjectSidebar
        projects={projects}
      />

      <main className="blog-post-main">
        <Link
          href="/portfolio"
          className="blog-back-link"
        >
          ←{' '}
          {t(
            'detail.back_to_portfolio',
            {
              defaultValue:
                'Back to Portfolio',
            }
          )}
        </Link>

        <article className="blog-post-article">
          <div className="blog-post-header">
            <div className="blog-post-meta-row">
              <div className="blog-post-category">
                <span aria-hidden="true">
                  ◆
                </span>

                <span>
                  {project.category}
                </span>
              </div>

              <span className="blog-meta-date">
                🗓 {project.date}
              </span>

              <span className="blog-meta-date">
                ⏱ {project.readTime}
              </span>
            </div>

            <h1 className="blog-post-title">
              {project.title}
            </h1>

            <p className="blog-post-excerpt">
              {project.excerpt}
            </p>

            <div className="blog-card-tags">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="blog-tag"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div
              style={{
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
              }}
            >
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t(
                    'detail.view_live_site',
                    {
                      defaultValue:
                        'View Live Site ↗',
                    }
                  )}
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('detail.github', {
                    defaultValue:
                      'GitHub →',
                  })}
                </a>
              )}
            </div>
          </div>

          <hr className="blog-post-divider" />

          <div
            style={{
              width: '100%',
              borderRadius: '16px',
              overflow: 'hidden',
              marginBottom: '2.5rem',
              border:
                '1px solid var(--border)',
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

          <div className="blog-post-body">
            <h2>
              {t('detail.overview', {
                defaultValue:
                  'Project Overview',
              })}
            </h2>

            <p>{project.description}</p>

            <h2>
              {t('detail.challenge', {
                defaultValue:
                  'The Challenge',
              })}
            </h2>

            <p>{project.challenge}</p>

            <h2>
              {t('detail.solution', {
                defaultValue:
                  'Our Solution',
              })}
            </h2>

            <p>{project.solution}</p>

            {Array.isArray(
              project.images
            ) &&
              project.images.length > 1 && (
                <>
                  <h2>
                    {t(
                      'detail.screenshots',
                      {
                        defaultValue:
                          'Screenshots',
                      }
                    )}
                  </h2>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns:
                        'repeat(2, minmax(0, 1fr))',
                      gap: '1rem',
                    }}
                  >
                    {project.images
                      .slice(1)
                      .map(
                        (
                          image,
                          index
                        ) => (
                          <div
                            key={`${project.slug}-screenshot-${index + 2}`}
                            style={{
                              borderRadius:
                                '12px',
                              overflow:
                                'hidden',
                              border:
                                '1px solid var(--border)',
                            }}
                          >
                            <img
                              src={image}
                              alt={`${project.title} screenshot ${index + 2}`}
                              style={{
                                objectFit:
                                  'cover',
                                width:
                                  '100%',
                                height:
                                  'auto',
                                display:
                                  'block',
                              }}
                            />
                          </div>
                        )
                      )}
                  </div>
                </>
              )}

            <h2>
              {t('detail.tech_stack', {
                defaultValue:
                  'Tech Stack',
              })}
            </h2>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
              }}
            >
              {project.techStack.map(
                (technology) => (
                  <span
                    key={technology}
                    style={{
                      fontFamily:
                        'var(--font-mono)',
                      fontSize:
                        '0.78rem',
                      fontWeight: '700',
                      padding:
                        '0.4rem 1rem',
                      borderRadius:
                        '50px',
                      border:
                        '1.5px solid var(--border)',
                      color:
                        'var(--black)',
                      background:
                        'transparent',
                      letterSpacing:
                        '0.3px',
                    }}
                  >
                    {technology}
                  </span>
                )
              )}
            </div>
          </div>
        </article>

        {relatedProjects.length > 0 && (
          <div className="blog-related">
            <h3 className="blog-related-title">
              {t(
                'detail.related_projects',
                {
                  defaultValue:
                    'Related Projects',
                }
              )}
            </h3>

            <div className="blog-related-grid">
              {relatedProjects.map(
                (relatedProject) => (
                  <Link
                    key={relatedProject.slug}
                    href={`/portfolio/${relatedProject.slug}`}
                    className="blog-related-card"
                  >
                    <span className="blog-related-category">
                      {
                        relatedProject.category
                      }
                    </span>

                    <span className="blog-related-card-title">
                      {
                        relatedProject.title
                      }
                    </span>

                    <span className="blog-related-date">
                      {
                        relatedProject.date
                      }
                    </span>
                  </Link>
                )
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}