import { notFound } from 'next/navigation'
import { servicesData } from '@/lib/servicesData'
import enServices from '@/locales/en/services.json'
import ServiceDetailClient from '@/components/services/ServiceDetailClient'

export function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({
  params,
}) {
  const { slug } = await params

  const service = servicesData.find(
    (item) => item.slug === slug
  )

  if (!service) {
    return {}
  }

  const title =
    enServices[service.titleKey] || service.slug
  const description =
    enServices[service.descriptionKey] || undefined

  return {
    title,
    description,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/services/${service.slug}`,
    },
  }
}

export default async function ServiceDetailPage({
  params,
}) {
  const { slug } = await params

  const exists = servicesData.some(
    (service) => service.slug === slug
  )

  if (!exists) {
    notFound()
  }

  return <ServiceDetailClient slug={slug} />
}
