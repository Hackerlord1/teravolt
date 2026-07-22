'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import AnimatedText from './AnimatedText'
import { THEME_KEY, NAV_SECTIONS } from '@/lib/constants'

const LANGUAGES = [
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'pt', label: 'PT' },
  { code: 'es', label: 'ES' },
  { code: 'de', label: 'DE' },
  { code: 'it', label: 'IT' },
  { code: 'nl', label: 'NL' },
  { code: 'sw', label: 'SW' },
  { code: 'zh', label: 'ZH' },
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

          <select
            onChange={(event) => changeLang(event.target.value)}
            value={lang}
            className="nav-lang-select"
            aria-label="Select language"
          >
            {LANGUAGES.map((language) => (
              <option key={language.code} value={language.code}>
                {language.label}
              </option>
            ))}
          </select>

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
            <select
              onChange={(event) => changeLang(event.target.value)}
              value={lang}
              className="nav-lang-select"
              aria-label="Select language"
            >
              {LANGUAGES.map((language) => (
                <option key={language.code} value={language.code}>
                  {language.label}
                </option>
              ))}
            </select>
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