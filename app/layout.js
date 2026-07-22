'use client'

import Script from 'next/script'
import './globals.css'
import Navbar from '@/components/Navbar'
import BackToTop from '@/components/BackToTop'
import Footer from '@/components/Footer'
import I18nProvider from '@/providers/I18nProvider'
import { TAWK_SCRIPT_ID } from '@/lib/constants'



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <I18nProvider>
          {/* ✅ NAVBAR */}
          <Navbar />

          {/* ✅ MAIN CONTENT */}
          <main>{children}</main>

          {/* ✅ FOOTER */}
          <Footer />

          {/* ✅ BACK TO TOP */}
          <BackToTop />
        </I18nProvider>
      </body>
    </html>
  )
}
