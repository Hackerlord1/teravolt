import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Pricing from '@/components/Pricing'
import Portfolio from '@/components/Portfolio'
import About from '@/components/About'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Pricing />
      <Portfolio />
      <About />
      <Contact />
    </main>
  )
}