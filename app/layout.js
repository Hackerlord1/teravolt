import './globals.css'
import Navbar from '@/components/Navbar'
import BackToTop from '@/components/BackToTop'
import Footer from '@/components/Footer'
import I18nProvider from '@/providers/I18nProvider'

const SITE_URL = 'https://teravoltdigital.website'
const SITE_NAME = 'Teravolt Digital'
const SITE_DESCRIPTION =
  'Teravolt Digital designs and builds fast, modern websites and digital products for businesses worldwide.'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Websites & Digital Products`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    'web design',
    'web development',
    'digital agency',
    'Next.js',
    'branding',
    'UI design',
    'Teravolt Digital',
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Websites & Digital Products`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — Websites & Digital Products`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5f0e8' },
    { media: '(prefers-color-scheme: dark)', color: '#111111' },
  ],
  colorScheme: 'light dark',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <I18nProvider>
          {/* ✅ NAVBAR */}
          <Navbar />

          {/* ✅ MAIN CONTENT — each route provides its own <main> landmark */}
          {children}

          {/* ✅ FOOTER */}
          <Footer />

          {/* ✅ BACK TO TOP */}
          <BackToTop />
        </I18nProvider>
      </body>
    </html>
  )
}
