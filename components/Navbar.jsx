'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import AnimatedText from './AnimatedText'
import { THEME_KEY, NAV_SECTIONS } from '@/lib/constants'

// Simple SVG flag component
function FlagIcon({ countryCode }) {
  const flags = {
    gb: (
      <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="18" height="14" rx="2" fill="#012169"/>
        <path d="M0 0l18 14M18 0L0 14" stroke="#fff" strokeWidth="2.5"/>
        <path d="M9 0v14M0 7h18" stroke="#fff" strokeWidth="4"/>
        <path d="M9 0v14M0 7h18" stroke="#C8102E" strokeWidth="2"/>
        <path d="M0 0l18 14M18 0L0 14" stroke="#C8102E" strokeWidth="1.2"/>
      </svg>
    ),
    fr: (
      <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="6" height="14" rx="0" fill="#002395"/>
        <rect x="6" width="6" height="14" fill="#fff"/>
        <rect x="12" width="6" height="14" fill="#ED2939"/>
        <rect width="18" height="14" rx="2" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5"/>
      </svg>
    ),
    br: (
      <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="18" height="14" rx="2" fill="#009B3A"/>
        <path d="M9 2l6 5-6 5-6-5 6-5z" fill="#FEDF00"/>
        <circle cx="9" cy="7" r="2.5" fill="#002776"/>
        <rect width="18" height="14" rx="2" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5"/>
      </svg>
    ),
    es: (
      <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="18" height="5" rx="0" fill="#C60B1E"/>
        <rect y="5" width="18" height="4" fill="#FFC400"/>
        <rect y="9" width="18" height="5" fill="#C60B1E"/>
        <rect width="18" height="14" rx="2" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5"/>
      </svg>
    ),
    de: (
      <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="18" height="4.67" fill="#000"/>
        <rect y="4.67" width="18" height="4.66" fill="#DD0000"/>
        <rect y="9.33" width="18" height="4.67" fill="#FFCE00"/>
        <rect width="18" height="14" rx="2" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5"/>
      </svg>
    ),
    it: (
      <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="6" height="14" rx="0" fill="#009246"/>
        <rect x="6" width="6" height="14" fill="#fff"/>
        <rect x="12" width="6" height="14" fill="#CE2B37"/>
        <rect width="18" height="14" rx="2" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5"/>
      </svg>
    ),
    nl: (
      <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="18" height="4.67" fill="#AE1C28"/>
        <rect y="4.67" width="18" height="4.66" fill="#fff"/>
        <rect y="9.33" width="18" height="4.67" fill="#21468B"/>
        <rect width="18" height="14" rx="2" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5"/>
      </svg>
    ),
    ke: (
      <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="18" height="4.67" fill="#000"/>
        <rect y="4.67" width="18" height="0.5" fill="#fff"/>
        <rect y="5.17" width="18" height="3.66" fill="#BB0000"/>
        <rect y="8.83" width="18" height="0.5" fill="#fff"/>
        <rect y="9.33" width="18" height="4.67" fill="#006600"/>
        <rect width="18" height="14" rx="2" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5"/>
      </svg>
    ),
    cn: (
      <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="18" height="14" rx="2" fill="#DE2910"/>
        <text x="9" y="6" textAnchor="middle" fontSize="4" fill="#FFDE00" fontWeight="900">★</text>
        <rect width="18" height="14" rx="2" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5"/>
      </svg>
    ),
  }

  return flags[countryCode] || null
}

const LANGUAGES = [
  { code: 'en', label: 'EN', flagCode: 'gb' },
  { code: 'fr', label: 'FR', flagCode: 'fr' },
  { code: 'pt', label: 'PT', flagCode: 'br' },
  { code: 'es', label: 'ES', flagCode: 'es' },
  { code: 'de', label: 'DE', flagCode: 'de' },
  { code: 'it', label: 'IT', flagCode: 'it' },
  { code: 'nl', label: 'NL', flagCode: 'nl' },
  { code: 'sw', label: 'SW', flagCode: 'ke' },
  { code: 'zh', label: 'ZH', flagCode: 'cn' },
]

function AnimatedNavLink({
  href,
  text,
  isActive,
  onClick,
}) {
  return (
    <Link 
      href={href} 
      className={`nav-link animated-link ${isActive ? 'active' : ''}`} 
      onClick={onClick}
    >
      <span className="span-mother">
        <AnimatedText text={text} />
      </span>
      <span className="span-mother2">
        <AnimatedText text={text} />
      </span>
    </Link>
  )
}

function SmartLink({
  sectionId,
  text,
  isHome,
}) {
  const router = useRouter()

  const handleClick = (event) => {
    event.preventDefault()
    if (isHome) {
      const section = document.getElementById(sectionId)
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      return
    }
    router.push(`/#${sectionId}`)
  }

  return (
    <a 
      href={`/#${sectionId}`} 
      onClick={handleClick} 
      className="nav-link animated-link"
    >
      <span className="span-mother">
        <AnimatedText text={text} />
      </span>
      <span className="span-mother2">
        <AnimatedText text={text} />
      </span>
    </a>
  )
}

function ThemeToggle({ dark, onToggle, mounted }) {
  return (
    <button
      type="button"
      className={`theme-track ${dark ? 'theme-track--dark' : 'theme-track--light'}`}
      onClick={onToggle}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={dark}
    >
      <span className="theme-track-icons" aria-hidden="true">
        <span className="theme-track-moon">🌙</span>
        <span className="theme-track-sun">☀️</span>
      </span>
      <span className="theme-track-thumb" aria-hidden="true">
        <span className="theme-track-thumb-icon">
          {mounted ? (dark ? '🌙' : '☀️') : '🌙'}
        </span>
      </span>
    </button>
  )
}

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { t, i18n } = useTranslation('home')

  const [dark, setDark] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [lang, setLang] = useState(i18n.resolvedLanguage || 'en')

  const isHome = pathname === '/'
  const isBlogPage = pathname.startsWith('/blog')
  const isPortfolioPage = pathname.startsWith('/portfolio')

  const closeMenu = () => setMenuOpen(false)

  const changeLang = async (language) => {
    await i18n.changeLanguage(language)
    localStorage.setItem('lang', language)
    document.documentElement.lang = language
    setLang(language)
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY)
    const darkTheme = savedTheme === 'dark'
    setDark(darkTheme)
    document.documentElement.setAttribute('data-theme', darkTheme ? 'dark' : 'light')

    const activeLanguage = (i18n.resolvedLanguage || i18n.language || 'en').split('-')[0]
    setLang(activeLanguage)
    document.documentElement.lang = activeLanguage
    setMounted(true)
  }, [i18n])

  useEffect(() => {
    const handleLanguageChanged = (language) => {
      const normalizedLanguage = language.split('-')[0]
      setLang(normalizedLanguage)
      document.documentElement.lang = normalizedLanguage
    }
    i18n.on('languageChanged', handleLanguageChanged)
    return () => { i18n.off('languageChanged', handleLanguageChanged) }
  }, [i18n])

  useEffect(() => {
    if (!mounted) return
    const theme = dark ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(THEME_KEY, theme)
  }, [dark, mounted])

  useEffect(() => { closeMenu() }, [pathname])

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = ''
      return
    }
    document.body.style.overflow = 'hidden'
    const handleEscape = (event) => {
      if (event.key === 'Escape') closeMenu()
    }
    window.addEventListener('keydown', handleEscape)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEscape)
    }
  }, [menuOpen])

  const handleConnect = (event) => {
    event.preventDefault()
    closeMenu()
    if (isHome) {
      const contact = document.getElementById('contact')
      if (contact) {
        contact.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      return
    }
    router.push('/#contact')
  }

  const handleMobileSectionClick = (event, sectionId) => {
    event.preventDefault()
    closeMenu()
    if (isHome) {
      const section = document.getElementById(sectionId)
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      return
    }
    router.push(`/#${sectionId}`)
  }

  return (
    <>
      <nav className="navbar">
        {/* Logo - using nav-logo class */}
        <Link href="/" className="nav-logo">
          Tera<span>volt</span>
        </Link>

        {/* Desktop links */}
        <div className="nav-pill">
          <ul className="nav-links">
            <li>
              <AnimatedNavLink href="/" text={t('navbar.home')} isActive={isHome} />
            </li>
            {NAV_SECTIONS.map((section) => (
              <li key={section.id}>
                <SmartLink sectionId={section.id} text={t(`navbar.${section.id}`)} isHome={isHome} />
              </li>
            ))}
            <li>
              <AnimatedNavLink href="/portfolio" text={t('navbar.work')} isActive={isPortfolioPage} />
            </li>
            <li>
              <AnimatedNavLink href="/blog" text={t('navbar.blog')} isActive={isBlogPage} />
            </li>
          </ul>
        </div>

        {/* Right side */}
        <div className="nav-right">
          <ThemeToggle dark={dark} onToggle={() => setDark((current) => !current)} mounted={mounted} />

          {/* Desktop Connect Button - using connect-btn class */}
          <a href="/#contact" onClick={handleConnect} className="connect-btn connect-btn--desktop">
            <span className="connect-dot" aria-hidden="true" />
            <span className="connect-animated">
              <span className="span-mother">
                <AnimatedText text={t('navbar.talk')} />
              </span>
              <span className="span-mother2">
                <AnimatedText text={t('navbar.talk')} />
              </span>
            </span>
          </a>

          {/* Language Switcher with SVG flags */}
          <div className="nav-lang-wrapper" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <span style={{ 
              position: 'absolute', 
              left: '0.5rem', 
              pointerEvents: 'none',
              zIndex: 1,
              display: 'flex',
              alignItems: 'center'
            }}>
              <FlagIcon countryCode={LANGUAGES.find(l => l.code === lang)?.flagCode || 'gb'} />
            </span>
            <select
              onChange={(event) => changeLang(event.target.value)}
              value={lang}
              className="nav-lang-select"
              aria-label="Select language"
              style={{ paddingLeft: '2.2rem' }}
            >
              {LANGUAGES.map((language) => (
                <option key={language.code} value={language.code}>
                  {language.label}
                </option>
              ))}
            </select>
          </div>

          {/* Hamburger Button - using nav-hamburger and hamburger-line classes */}
          <button
            type="button"
            className="nav-hamburger"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <span className={`hamburger-line hamburger-line--1 ${menuOpen ? 'open' : ''}`} />
            <span className={`hamburger-line hamburger-line--2 ${menuOpen ? 'open' : ''}`} />
            <span className={`hamburger-line hamburger-line--3 ${menuOpen ? 'open' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile backdrop - using nav-overlay-backdrop class */}
      <div
        className={`nav-overlay-backdrop ${menuOpen ? 'nav-overlay-backdrop--visible' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Mobile menu - using nav-overlay-menu class */}
      <div
        id="mobile-navigation"
        className={`nav-overlay-menu ${menuOpen ? 'nav-overlay-menu--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <div className="nav-overlay-links">
          <Link href="/" onClick={closeMenu} className="mobile-nav-link">
            <span>{t('navbar.home')}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </Link>

          {NAV_SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`/#${section.id}`}
              onClick={(event) => handleMobileSectionClick(event, section.id)}
              className="mobile-nav-link"
            >
              <span>{t(`navbar.${section.id}`)}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          ))}

          <Link href="/portfolio" onClick={closeMenu} className="mobile-nav-link">
            <span>{t('navbar.work')}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </Link>

          <Link href="/blog" onClick={closeMenu} className="mobile-nav-link">
            <span>{t('navbar.blog')}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </Link>
        </div>

        <div className="nav-overlay-footer">
          <div className="nav-overlay-theme">
            <span className="nav-overlay-theme-label">Teravolt</span>
            {/* Language Switcher with SVG flags (mobile) */}
            <div className="nav-lang-wrapper" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <span style={{ 
                position: 'absolute', 
                left: '0.5rem', 
                pointerEvents: 'none',
                zIndex: 1,
                display: 'flex',
                alignItems: 'center'
              }}>
                <FlagIcon countryCode={LANGUAGES.find(l => l.code === lang)?.flagCode || 'gb'} />
              </span>
              <select
                onChange={(event) => changeLang(event.target.value)}
                value={lang}
                className="nav-lang-select"
                aria-label="Select language"
                style={{ paddingLeft: '2.2rem' }}
              >
                {LANGUAGES.map((language) => (
                  <option key={language.code} value={language.code}>
                    {language.label}
                  </option>
                ))}
              </select>
            </div>
            <ThemeToggle dark={dark} onToggle={() => setDark((current) => !current)} mounted={mounted} />
          </div>

          {/* Mobile CTA - using nav-overlay-cta class */}
          <a href="/#contact" onClick={handleConnect} className="nav-overlay-cta">
            <span className="connect-dot" aria-hidden="true" />
            <span>{t('navbar.talk')}</span>
          </a>
        </div>
      </div>
    </>
  )
}