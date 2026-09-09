import './globals.css'
import { Space_Grotesk, Space_Mono } from 'next/font/google'
import Navbar from '@/components/Navbar'
import BackToTop from '@/components/BackToTop'
import Footer from '@/components/Footer'
import I18nProvider from '@/providers/I18nProvider'
import ContentGate from '@/providers/ContentGate'

// Self-hosted at build time instead of the old Google Fonts @import:
// preloaded, served same-origin, and with metric-adjusted fallbacks so the
// font swap causes no layout shift (the phone "header stretch" bug).
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-grotesk',
  display: 'swap',
})

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-spacemono',
  display: 'swap',
})

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
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${spaceMono.variable}`}
    >
      <head>
        {/* Apply the saved/system theme before first paint so dark-mode
            visitors never see the page (header included) morph from the
            light palette after hydration. Must stay inlined and tiny. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('teravolt-theme');if(t!=='dark'&&t!=='light'){t=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.setAttribute('data-theme',t)}catch(e){}})();",
          }}
        />
      </head>
      <body>
        <I18nProvider>
          {/* ✅ NAVBAR — outside the content gate: rendered with the first
             paint and never participates in the load-in effect */}
          <Navbar />

          {/* ✅ MAIN CONTENT — each route provides its own <main> landmark */}
          <ContentGate>
            {children}

            {/* ✅ FOOTER */}
            <Footer />

            {/* ✅ BACK TO TOP */}
            <BackToTop />
          </ContentGate>
        </I18nProvider>
      </body>
    </html>
  )
}
