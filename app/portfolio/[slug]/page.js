import { projects } from '@/lib/projectsData'
import { notFound } from 'next/navigation'
import ProjectDetailClient from '@/components/portfolio/ProjectDetailClient'

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({
  params,
}) {
  const { slug } = await params

  const project = projects.find(
    (item) => item.slug === slug
  )

  if (!project) {
    return {}
  }

  return {
    title: `${project.title} — Teravolt`,
    description: project.excerpt,
  }
}

export default async function ProjectDetailPage({
  params,
}) {
  const { slug } = await params

  const exists = projects.some(
    (project) => project.slug === slug
  )

  if (!exists) {
    notFound()
  }

  return (
    <ProjectDetailClient slug={slug} />
  )
}
