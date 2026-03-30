'use client'
import { useState, useEffect, useRef } from 'react'
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

/* ---- Mobile plain links ---- */
function MobileSmartLink({ sectionId, text, isHome, onNav }) {
  const router = useRouter()

  const handleClick = (e) => {
    e.preventDefault()
    onNav()
    if (isHome) {
      setTimeout(() => {
        const el = document.getElementById(sectionId)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 400)
    } else {
      router.push(`/#${sectionId}`)
    }
  }

  return (
    <a href={`/#${sectionId}`} onClick={handleClick} className="mobile-nav-link">
      <span>{text}</span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </a>
  )
}

function MobileNavLink({ href, text, onNav }) {
  return (
    <Link href={href} onClick={onNav} className="mobile-nav-link">
      <span>{text}</span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </Link>
  )
}

function ThemeToggle({ dark, onToggle, mounted }) {
  return (
    <button
      className={`theme-track ${dark ? 'theme-track--dark' : 'theme-track--light'}`}
      onClick={onToggle}
      aria-label="Toggle dark mode"
      role="switch"
      aria-checked={dark}
    >
      <span className="theme-track-icons">
        <span className="theme-track-moon">🌙</span>
        <span className="theme-track-sun">☀️</span>
      </span>
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
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef(null)

  const isHome = pathname === '/'
  const isBlogPage = pathname.startsWith('/blog')
  const isPortfolioPage = pathname.startsWith('/portfolio')

  // Theme init
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

  // Theme sync
  useEffect(() => {
    if (!mounted) return
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
    localStorage.setItem('teravolt-theme', dark ? 'dark' : 'light')
  }, [dark, mounted])

  // Hash scroll
  useEffect(() => {
    if (isHome && window.location.hash) {
      const id = window.location.hash.replace('#', '')
      setTimeout(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }, [isHome, pathname])

  // Scroll state
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body when menu open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Close on ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  // Close on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const handleConnect = (e) => {
    e.preventDefault()
    setMenuOpen(false)
    if (isHome) {
      setTimeout(() => {
        const el = document.getElementById('contact')
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 400)
    } else {
      router.push('/#contact')
    }
  }

  const closeMenu = () => setMenuOpen(false)

  const navSections = [
    { id: 'services', text: 'Services' },
    { id: 'pricing', text: 'Packages' },
    { id: 'about', text: 'About' },
    { id: 'contact', text: 'Contact' },
  ]

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} ref={navRef}>

        {/* LEFT — Logo */}
        <Link href="/" className="nav-logo">
          Tera<span>volt</span>
        </Link>

        {/* CENTER — Pill (desktop) */}
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
          <ThemeToggle
            dark={dark}
            onToggle={() => setDark(!dark)}
            mounted={mounted}
          />

          {/* Connect (desktop) */}
          <a
            href="/#contact"
            onClick={handleConnect}
            className="connect-btn connect-btn--desktop"
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

          {/* Hamburger (mobile) */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className={`hamburger-line hamburger-line--1 ${menuOpen ? 'open' : ''}`} />
            <span className={`hamburger-line hamburger-line--2 ${menuOpen ? 'open' : ''}`} />
            <span className={`hamburger-line hamburger-line--3 ${menuOpen ? 'open' : ''}`} />
          </button>
        </div>
      </nav>

      {/* ======================== */}
      {/* BACKDROP                 */}
      {/* ======================== */}
      <div
        className={`nav-overlay-backdrop ${menuOpen ? 'nav-overlay-backdrop--visible' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* ======================== */}
      {/* DROPDOWN OVERLAY MENU    */}
      {/* ======================== */}
      <div className={`nav-overlay-menu ${menuOpen ? 'nav-overlay-menu--open' : ''}`}>

        {/* Links */}
        <div className="nav-overlay-links">
          <MobileNavLink href="/" text="Home" onNav={closeMenu} />
          {navSections.map((section) => (
            <MobileSmartLink
              key={section.id}
              sectionId={section.id}
              text={section.text}
              isHome={isHome}
              onNav={closeMenu}
            />
          ))}
          <MobileNavLink href="/portfolio" text="Work" onNav={closeMenu} />
          <MobileNavLink href="/blog" text="Blog" onNav={closeMenu} />
        </div>

        {/* Footer */}
        <div className="nav-overlay-footer">
          <div className="nav-overlay-theme">
            <span className="nav-overlay-theme-label">Theme</span>
            <ThemeToggle
              dark={dark}
              onToggle={() => setDark(!dark)}
              mounted={mounted}
            />
          </div>
          <a
            href="/#contact"
            onClick={handleConnect}
            className="nav-overlay-cta"
          >
            <span className="connect-dot" aria-hidden="true" />
            Talk to Us ↗
          </a>
        </div>
      </div>
    </>
  )
}