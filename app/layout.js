import Script from 'next/script'
import './globals.css'
import Navbar from '@/components/Navbar'
import BackToTop from '@/components/BackToTop'
import Footer from '@/components/Footer'
import { TAWK_SCRIPT_ID } from '@/lib/constants'

export const metadata = {
  title: 'Teravolt Digital — Web Design & Development Studio',
  description: 'Teravolt Digital Solutions helps businesses succeed online with web design, graphics, and smart digital services.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
        <BackToTop />

        <Script
          id="tawk-to"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              Tawk_API.onLoad = function(){
                Tawk_API.setAttributes({
                  'no-logging': true
                }, function(error){});
              };
              (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/${TAWK_SCRIPT_ID}';
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