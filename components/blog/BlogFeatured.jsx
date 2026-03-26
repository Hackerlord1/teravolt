'use client'
import Link from 'next/link'

export default function BlogFeatured({ post }) {
  if (!post) return null

  return (
    <Link href={`/blog/${post.slug}`} className="blog-featured-card">

      {/* ✅ Top row */}
      <div className="blog-featured-top">
        <span className="blog-featured-badge">
          ★ Featured
        </span>
        <div className="blog-featured-meta">
          <span className="blog-meta-date">
            <svg width="13" height="13" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            {post.date}
          </span>
          <span className="blog-meta-dot">·</span>
          <span className="blog-meta-date">{post.readTime}</span>
        </div>
      </div>

      {/* ✅ Content row — split layout */}
      <div className="blog-featured-body">

        {/* Left */}
        <div className="blog-featured-left">
          <span className="blog-featured-category">
            {post.category}
          </span>
          <h2 className="blog-featured-title">{post.title}</h2>
          <p className="blog-featured-excerpt">{post.excerpt}</p>

          {/* Tags */}
          <div className="blog-card-tags">
            {post.tags.map((tag) => (
              <span key={tag} className="blog-tag">{tag}</span>
            ))}
          </div>
        </div>

        {/* Right — decorative */}
        <div className="blog-featured-right">
          <div className="blog-featured-deco">
            <div className="blog-deco-circle" />
            <div className="blog-deco-lines">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="blog-deco-line" />
              ))}
            </div>
            <span className="blog-deco-label">
              {post.category}
            </span>
          </div>
        </div>

      </div>

      {/* ✅ Bottom CTA */}
      <div className="blog-featured-footer">
        <span className="blog-read-link">
          Read Article
          <svg width="16" height="16" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </span>
        <span className="blog-featured-readtime">
          {post.readTime}
        </span>
      </div>

    </Link>
  )
}