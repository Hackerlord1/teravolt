import BlogPageClient from '@/components/blog/BlogPageClient'

export const metadata = {
  title: 'Blog',
  description:
    'Insights on branding, web design, development, and growing a digital business — from the Teravolt Digital team.',
  alternates: {
    canonical: '/blog',
  },
}

export default function BlogPage() {
  return <BlogPageClient />
}
