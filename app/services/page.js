import ServicesPageClient from '@/components/ServicesPageClient'

export const metadata = {
  title: 'Services',
  description:
    'Web development, branding, UI/UX design, and digital product services — Teravolt Digital builds fast, modern websites for businesses worldwide.',
  alternates: {
    canonical: '/services',
  },
}

export default function ServicesPage() {
  return <ServicesPageClient />
}
