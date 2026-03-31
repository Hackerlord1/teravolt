import Script from 'next/script'
import './globals.css'
import Navbar from '@/components/Navbar'
import BackToTop from '@/components/BackToTop'

export const metadata = {
  title: 'Teravolt Digital — Web Design & Development Studio',
  description: 'Teravolt Digital Solutions helps businesses succeed online with web design, graphics, and smart digital services.',
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

        {/* ✅ Tawk.to Live Chat */}
        <Script
          id="tawk-to"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/69c7b47b906ff91c35453e80/1jkq1i1i0';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        />
      </body>
    </html>
  )
}