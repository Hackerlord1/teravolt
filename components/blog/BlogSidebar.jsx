'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'

export default function BlogSidebar({ posts }) {
  const { t } = useTranslation('blog')
  const pathname = usePathname()

  const categories = [...new Set(posts.map((p) => p.category))]

  const socials = [];

  return (
    <aside className="blog-sidebar blog-sidebar--compact">
      <div className="blog-sidebar-inner">

        <div className="blog-sidebar-divider" />

        <p className="blog-sidebar-label">{t('sidebar.all_articles')}</p>

        <nav className="blog-sidebar-nav blog-sidebar-nav--compact">
          {posts.map((post) => {
            const isActive = pathname === `/blog/${post.slug}`
            return (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className={`blog-sidebar-item blog-sidebar-item--compact
                  ${isActive ? 'blog-sidebar-item--active' : ''}
                  ${post.featured ? 'blog-sidebar-item--featured' : ''}
                `}
              >
                {post.featured && (
                  <span className="blog-sidebar-star">★</span>
                )}
                <span className="blog-sidebar-item-text">
                  {post.title}
                </span>
                {isActive && (
                  <span className="blog-sidebar-active-dot" />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="blog-sidebar-divider" />

        <p className="blog-sidebar-label">{t('sidebar.categories')}</p>
        <div className="blog-sidebar-categories blog-sidebar-categories--compact">
          {categories.map((cat) => (
            <span key={cat} className="blog-sidebar-cat blog-sidebar-cat--compact">
              {cat}
              <span className="blog-sidebar-cat-count blog-sidebar-cat-count--compact">
                {posts.filter((p) => p.category === cat).length}
              </span>
            </span>
          ))}
        </div>

        <div className="blog-sidebar-divider" />

        <Link href="/" className="blog-sidebar-home-link">
          ← {t('sidebar.back_to_site')}
        </Link>

        <div className="sidebar-socials">
          {socials.map((social) => (
            <a
              key={social.id}
              id={`sidebar-${social.id}`}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="sidebar-social-btn"
            >
              {social.icon}
              <span>{social.label}</span>
            </a>
          ))}
        </div>

      </div>
    </aside>
  )
}