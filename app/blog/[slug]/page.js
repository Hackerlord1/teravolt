import { notFound } from 'next/navigation'
import { blogPosts } from '@/lib/blogData'
import BlogPostClient from '@/components/blog/BlogPostClient'

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}) {
  const { slug } = await params

  const post = blogPosts.find(
    (item) => item.slug === slug
  )

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `/blog/${post.slug}`,
    },
  }
}

export default async function BlogPostPage({
  params,
}) {
  const { slug } = await params

  const exists = blogPosts.some(
    (post) => post.slug === slug
  )

  if (!exists) {
    notFound()
  }

  return <BlogPostClient slug={slug} />
}
