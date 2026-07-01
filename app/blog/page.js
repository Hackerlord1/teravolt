'use client'
import { useTranslation } from 'react-i18next'
import { blogPosts, featuredPost } from '@/lib/blogData'
import BlogSidebar from '@/components/blog/BlogSidebar'
import BlogFeatured from '@/components/blog/BlogFeatured'
import BlogCard from '@/components/blog/BlogCard'

export default function BlogPage() {
  const { t } = useTranslation()
  const regularPosts = blogPosts.filter((p) => !p.featured)

  return (
    <div className="blog-page">

      {/* Sidebar */}
      <BlogSidebar posts={blogPosts} />

      {/* Main */}
      <main className="blog-content">

        {/* ✅ Hero header */}
        <div className="blog-page-header">
          <p className="section-label">{t('section_label')}</p>
          <h1 className="blog-page-title">
            {t('title')} <span>{t('title_span')}</span>
          </h1>
          <p className="blog-page-subtitle">
            {t('subtitle')}
          </p>


        </div>

        {/* ✅ Featured article */}
        <BlogFeatured post={featuredPost} />

        {/* ✅ Section label */}
        <div className="blog-grid-header">
          <p className="blog-grid-label">{t('all_articles')}</p>
          <span className="blog-grid-count">
            {regularPosts.length} {t('posts')}
          </span>
        </div>

        {/* ✅ Grid */}
        <div className="blog-grid">
          {regularPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

      </main>
    </div>
  )
}