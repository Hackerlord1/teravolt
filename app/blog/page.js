import { blogPosts, featuredPost } from '@/lib/blogData'
import BlogSidebar from '@/components/blog/BlogSidebar'
import BlogFeatured from '@/components/blog/BlogFeatured'
import BlogCard from '@/components/blog/BlogCard'

export default function BlogPage() {
  const regularPosts = blogPosts.filter((p) => !p.featured)

  return (
    <div className="blog-page">

      {/* Sidebar */}
      <BlogSidebar posts={blogPosts} />

      {/* Main */}
      <main className="blog-content">

        {/* ✅ Hero header */}
        <div className="blog-page-header">
          <p className="section-label">// Our Thoughts</p>
          <h1 className="blog-page-title">
            Blog <span>Articles</span>
          </h1>
          <p className="blog-page-subtitle">
            Insights on web development, design, and technology —
            straight from the Teravolt studio.
          </p>

          
        </div>

        {/* ✅ Featured article */}
        <BlogFeatured post={featuredPost} />

        {/* ✅ Section label */}
        <div className="blog-grid-header">
          <p className="blog-grid-label">All Articles</p>
          <span className="blog-grid-count">
            {regularPosts.length} posts
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