'use client'

import { useTranslation } from 'react-i18next'
import useLocalizedBlogPosts from '@/hooks/useLocalizedBlogPosts'
import BlogSidebar from '@/components/blog/BlogSidebar'
import BlogFeatured from '@/components/blog/BlogFeatured'
import BlogCard from '@/components/blog/BlogCard'

export default function BlogPage() {
  const { t } = useTranslation('blog')
  const blogPosts = useLocalizedBlogPosts()

  const featuredPost = blogPosts.find(
    (post) => post.featured
  )

  const regularPosts = blogPosts.filter(
    (post) => !post.featured
  )

  return (
    <div className="blog-page">
      <BlogSidebar posts={blogPosts} />

      <main className="blog-content">
        <div className="blog-page-header">
          <p className="section-label">
            {t('listing.section_label')}
          </p>

          <h1 className="blog-page-title">
            {t('listing.title')}{' '}

            <span>
              {t(
                'listing.title_highlight'
              )}
            </span>
          </h1>

          <p className="blog-page-subtitle">
            {t('listing.subtitle')}
          </p>
        </div>

        <BlogFeatured post={featuredPost} />

        <div className="blog-grid-header">
          <p className="blog-grid-label">
            {t('listing.all_articles')}
          </p>

          <span className="blog-grid-count">
            {t('listing.post_count', {
              count: regularPosts.length,
            })}
          </span>
        </div>

        <div className="blog-grid">
          {regularPosts.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
            />
          ))}
        </div>
      </main>
    </div>
  )
}