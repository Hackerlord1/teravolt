'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

function AnimatedLink({ href, text }) {
  return (
    <a href={href} className="nav-link animated-link">
      <span className="span-mother">
        {text.split('').map((char, i) => (
          <span key={i}>{char === ' ' ? '\u00A0' : char}</span>
        ))}
      </span>
      <span className="span-mother2">
        {text.split('').map((char, i) => (
          <span key={i}>{char === ' ' ? '\u00A0' : char}</span>
        ))}
      </span>
    </a>
  )
}

function AnimatedNavLink({ href, text, isActive, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`nav-link animated-link ${isActive ? 'nav-link--active' : ''}`}
    >
      <span className="span-mother">
        {text.split('').map((char, i) => (
          <span key={i}>{char === ' ' ? '\u00A0' : char}</span>
        ))}
      </span>
      <span className="span-mother2">
        {text.split('').map((char, i) => (
          <span key={i}>{char === ' ' ? '\u00A0' : char}</span>
        ))}
      </span>
    </Link>
  )
}

function SmartLink({ sectionId, text, isHome }) {
  const router = useRouter()

  const handleClick = (e) => {
    e.preventDefault()
    if (isHome) {
      const el = document.getElementById(sectionId)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    } else {
      router.push(`/#${sectionId}`)
    }
  }

  return (
    <a
      href={`/#${sectionId}`}
      onClick={handleClick}
      className="nav-link animated-link"
    >
      <span className="span-mother">
        {text.split('').map((char, i) => (
          <span key={i}>{char === ' ' ? '\u00A0' : char}</span>
        ))}
      </span>
      <span className="span-mother2">
        {text.split('').map((char, i) => (
          <span key={i}>{char === ' ' ? '\u00A0' : char}</span>
        ))}
      </span>
    </a>
  )
}

// ✅ Replace the old ThemeToggle component with this
function ThemeToggle({ dark, onToggle, mounted }) {
  return (
    <button
      className={`theme-track ${dark ? 'theme-track--dark' : 'theme-track--light'}`}
      onClick={onToggle}
      aria-label="Toggle dark mode"
      role="switch"
      aria-checked={dark}
    >
      {/* ✅ Track icons — always visible */}
      <span className="theme-track-icons">
        <span className="theme-track-moon">🌙</span>
        <span className="theme-track-sun">☀️</span>
      </span>

      {/* ✅ Sliding thumb */}
      <span className="theme-track-thumb">
        <span className="theme-track-thumb-icon">
          {mounted ? (dark ? '☀️' : '🌙') : '🌙'}
        </span>
      </span>
    </button>
  )
}

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [dark, setDark] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  const isHome = pathname === '/'
  const isBlogPage = pathname.startsWith('/blog')
  const isPortfolioPage = pathname.startsWith('/portfolio')

  useEffect(() => {
    const saved = localStorage.getItem('teravolt-theme')
    if (saved === 'dark') {
      setDark(true)
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      setDark(false)
      document.documentElement.setAttribute('data-theme', 'light')
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
    localStorage.setItem('teravolt-theme', dark ? 'dark' : 'light')
  }, [dark, mounted])

  useEffect(() => {
    if (isHome && window.location.hash) {
      const id = window.location.hash.replace('#', '')
      setTimeout(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }, [isHome, pathname])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleConnect = (e) => {
    e.preventDefault()
    if (isHome) {
      const el = document.getElementById('contact')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    } else {
      router.push('/#contact')
    }
  }

  const navSections = [
    { id: 'services', text: 'Services' },
    { id: 'pricing',  text: 'Packages' },
    { id: 'about',    text: 'About'    },
    { id: 'contact',  text: 'Contact'  },
  ]

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>

      {/* LEFT — Logo */}
      <Link href="/" className="nav-logo">
        Tera<span>volt</span>
        
      </Link>
      

      {/* CENTER — Pill */}
      <div className="nav-pill">
        <ul className="nav-links">
          <li>
            <AnimatedNavLink href="/" text="Home" isActive={isHome} />
          </li>

          {navSections.map((section) => (
            <li key={section.id}>
              <SmartLink
                sectionId={section.id}
                text={section.text}
                isHome={isHome}
              />
            </li>
          ))}

          <li>
            <AnimatedNavLink
              href="/portfolio"
              text="Work"
              isActive={isPortfolioPage}
            />
          </li>

          <li>
            <AnimatedNavLink
              href="/blog"
              text="Blog"
              isActive={isBlogPage}
            />
          </li>
        </ul>
      </div>

      {/* RIGHT */}
      <div className="nav-right">

        {/* ✅ Animated Theme Toggle */}
        <ThemeToggle
          dark={dark}
          onToggle={() => setDark(!dark)}
          mounted={mounted}
        />

        {/* Connect button */}
        <a
          href="/#contact"
          onClick={handleConnect}
          className="connect-btn"
        >
          <span className="connect-dot" aria-hidden="true" />
          <span className="connect-animated">
            <span className="span-mother" aria-hidden="true">
              {'Talk to Us ↗'.split('').map((char, i) => (
                <span key={i}>{char === ' ' ? '\u00A0' : char}</span>
              ))}
            </span>
            <span className="span-mother2">
              {'Talk to Us ↗'.split('').map((char, i) => (
                <span key={i}>{char === ' ' ? '\u00A0' : char}</span>
              ))}
            </span>
          </span>
        </a>

      </div>
    </nav>
  )
}