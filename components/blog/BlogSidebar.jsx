'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function BlogSidebar({ posts }) {
  const pathname = usePathname()

  const categories = [...new Set(posts.map((p) => p.category))]

  const socials = [
    {
      id: 'twitter',
      label: '@teravolt',
      href: 'https://twitter.com/teravolt',
      icon: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      id: 'facebook',
      label: '/teravolt',
      href: 'https://facebook.com/teravolt',
      icon: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      id: 'github',
      label: 'teravolt',
      href: 'https://github.com/teravolt',
      icon: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      id: 'reddit',
      label: 'r/teravolt',
      href: 'https://reddit.com/r/teravolt',
      icon: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.238 15.348c.085.084.085.221 0 .306-.465.462-1.194.687-2.231.687l-.008-.002-.008.002c-1.036 0-1.766-.225-2.231-.688-.085-.084-.085-.221 0-.305.084-.084.222-.084.307 0 .379.377 1.008.561 1.924.561l.008.002.008-.002c.915 0 1.544-.184 1.924-.561.085-.084.223-.084.307 0zm-3.44-2.418c0-.507-.414-.919-.922-.919-.509 0-.922.412-.922.919 0 .508.413.92.922.92.508 0 .922-.412.922-.92zm4.04-.919c-.509 0-.922.412-.922.919 0 .508.413.92.922.92.508 0 .922-.412.922-.92 0-.507-.414-.919-.922-.919zM12 0C5.373 0 0 5.373 0 12c0 6.627 5.373 12 12 12 6.628 0 12-5.373 12-12 0-6.627-5.372-12-12-12zm5.949 13.949c.008.099.013.198.013.299 0 2.63-3.067 4.762-6.848 4.762-3.782 0-6.849-2.132-6.849-4.762 0-.101.004-.2.013-.299-.607-.346-1.018-.989-1.018-1.73 0-1.105.898-2.002 2.006-2.002.549 0 1.046.222 1.406.579 1.389-.953 3.3-1.567 5.423-1.641l1.021-4.818.009.002c.03-.128.137-.233.271-.256l3.39-.683c.186-.475.663-.812 1.218-.812.722 0 1.309.585 1.309 1.306 0 .722-.587 1.308-1.309 1.308-.717 0-1.3-.579-1.308-1.294l-3.054.615-.934 4.401c2.082.092 3.951.706 5.316 1.647.359-.357.856-.579 1.404-.579 1.108 0 2.006.897 2.006 2.002 0 .741-.41 1.384-1.018 1.73z" />
        </svg>
      ),
    },
  ]

  return (
    <aside className="blog-sidebar blog-sidebar--compact">
      <div className="blog-sidebar-inner">

        <div className="blog-sidebar-divider" />

        <p className="blog-sidebar-label">All Articles</p>

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

        <p className="blog-sidebar-label">Categories</p>
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
          ← Back to Site
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