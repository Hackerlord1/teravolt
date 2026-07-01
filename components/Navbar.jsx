'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import AnimatedText from './AnimatedText'
import { THEME_KEY, NAV_SECTIONS } from '@/lib/constants'
import i18n from "@/lib/i18n"; // ✅ ADDED

function AnimatedNavLink({ href, text, isActive, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`nav-link animated-link ${isActive ? 'nav-link--active' : ''}`}
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
    <a href={`/#${sectionId}`} onClick={handleClick} className="nav-link animated-link">
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
      className={`theme-track ${dark ? 'theme-track--dark' : 'theme-track--light'}`}
      onClick={onToggle}
    >
      <span className="theme-track-thumb">
        {mounted ? (dark ? '☀️' : '🌙') : '🌙'}
      </span>
    </button>
  )
}

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { t, i18n: i18nInstance } = useTranslation()

  const [dark, setDark] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // ✅ LANGUAGE STATE
  const [lang, setLang] = useState(i18n.language)

  const languages = [
    { code: "en", label: "EN" },
    { code: "fr", label: "FR" },
    { code: "pt", label: "PT" },
    { code: "es", label: "ES" },
    { code: "de", label: "DE" },
    { code: "it", label: "IT" },
    { code: "nl", label: "NL" },
    { code: "sw", label: "SW" },
    { code: "zh", label: "ZH" }
  ]

  const changeLang = (lng) => {
    i18n.changeLanguage(lng)
    localStorage.setItem("lang", lng)
    setLang(lng)
  }

  const isHome = pathname === '/'
  const isBlogPage = pathname.startsWith('/blog')
  const isPortfolioPage = pathname.startsWith('/portfolio')

  useEffect(() => {
    const saved = localStorage.getItem(THEME_KEY)
    setDark(saved === 'dark')
    document.documentElement.setAttribute('data-theme', saved === 'dark' ? 'dark' : 'light')
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
    localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light')
  }, [dark, mounted])

  const handleConnect = (e) => {
    e.preventDefault()
    if (isHome) {
      const el = document.getElementById('contact')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    } else {
      router.push('/#contact')
    }
  }

  return (
    <>
      <nav className="navbar">

        {/* LOGO */}
        <Link href="/" className="nav-logo">
          Tera<span>volt</span>
        </Link>

        {/* LINKS */}
        <div className="nav-pill">
          <ul className="nav-links">
            <li><AnimatedNavLink href="/" text={t('navbar:home')} isActive={isHome} /></li>

            {NAV_SECTIONS.map((section) => (
              <li key={section.id}>
                <SmartLink sectionId={section.id} text={t(`navbar:${section.id}`)} isHome={isHome} />
              </li>
            ))}

            <li>
              <AnimatedNavLink href="/portfolio" text={t('navbar:work')} isActive={isPortfolioPage} />
            </li>

            <li>
              <AnimatedNavLink href="/blog" text={t('navbar:blog')} isActive={isBlogPage} />
            </li>
          </ul>
        </div>

        {/* RIGHT SIDE */}
        <div className="nav-right">

          <ThemeToggle
            dark={dark}
            onToggle={() => setDark(!dark)}
            mounted={mounted}
          />

          {/* ✅ TALK TO US now translated */}
          <a
            href="/#contact"
            onClick={handleConnect}
            className="connect-btn connect-btn--desktop"
          >
            <span className="connect-dot" />
            <span className="connect-animated">
              <span className="span-mother">
                <AnimatedText text={t('navbar:talk')} />
              </span>
              <span className="span-mother2">
                <AnimatedText text={t('navbar:talk')} />
              </span>
            </span>
          </a>

          {/* ✅ LANGUAGE SWITCH (DESKTOP) */}
          <select
            onChange={(e) => changeLang(e.target.value)}
            value={lang}
            className="nav-lang-select"
          >
            {languages.map((l) => (
              <option key={l.code} value={l.code}>
                {l.label}
              </option>
            ))}
          </select>

          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="nav-overlay-menu">

          <div className="nav-overlay-links">
            <Link href="/" onClick={() => setMenuOpen(false)}>{t('navbar:home')}</Link>
            <Link href="/portfolio" onClick={() => setMenuOpen(false)}>{t('navbar:work')}</Link>
            <Link href="/blog" onClick={() => setMenuOpen(false)}>{t('navbar:blog')}</Link>
          </div>

          <div className="nav-overlay-footer">

            {/* ✅ YOUR EXACT REQUIREMENT POSITION */}
            <div className="nav-overlay-theme">

              <span>Teravolt</span>

              {/* ✅ LANGUAGE BETWEEN LOGO & TOGGLE */}
              <select
                onChange={(e) => changeLang(e.target.value)}
                value={lang}
                className="nav-lang-select"
              >
                {languages.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.label}
                  </option>
                ))}
              </select>

              <ThemeToggle
                dark={dark}
                onToggle={() => setDark(!dark)}
                mounted={mounted}
              />
            </div>

            <a href="/#contact" onClick={handleConnect}>
              {t('navbar:talk')}
            </a>

          </div>
        </div>
      )}
    </>
  )
}