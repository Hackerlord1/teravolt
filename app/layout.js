import './globals.css'
import Navbar from '@/components/Navbar'

import BackToTop from '@/components/BackToTop'


export const metadata = {
  title: 'Teravolt',
  description: 'Web Design & Development Studio',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* ✅ Global Navbar */}
        <Navbar />
        

        {children}
        
        {/* ✅ Global Back to Top — every page */}
        <BackToTop />
      </body>
    </html>
  )
}