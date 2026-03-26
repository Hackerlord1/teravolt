'use client'
import Link from 'next/link'

export default function BlogCard({ post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="blog-card">

      {/* ✅ Card header */}
      <div className="blog-card-header">
        <span className="blog-card-category-pill">
          {post.category}
        </span>
        <span className="blog-meta-date">
          <svg width="11" height="11" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          {post.date}
        </span>
      </div>

      {/* ✅ Title */}
      <h3 className="blog-card-title">{post.title}</h3>

      {/* ✅ Excerpt */}
      <p className="blog-card-excerpt">{post.excerpt}</p>

      {/* ✅ Footer */}
      <div className="blog-card-footer">
        <span className="blog-card-readtime">{post.readTime}</span>
        <span className="blog-card-read">
          Read more
          <svg width="13" height="13" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </span>
      </div>

    </Link>
  )
}