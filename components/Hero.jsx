'use client'

import {
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'
import LogoScroll from './LogoScroll'

const CODE_SNIPPETS = [
  `// Smooth scroll navigation
document.querySelectorAll('a[href^="#"]')
  .forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault()
      const target = document.querySelector(
        anchor.getAttribute('href')
      )
      target?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    })
  })`,

  `// Responsive navbar toggle
const menuBtn = document.getElementById('menu')
const navLinks = document.getElementById('nav')

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('open')
  menuBtn.setAttribute(
    'aria-expanded',
    navLinks.classList.contains('open')
  )
})

window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    navLinks.classList.remove('open')
  }
})`,

  `// Intersection Observer - Fade In
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        observer.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.15 }
)

document.querySelectorAll('.fade-in')
  .forEach(el => observer.observe(el))`,

  `// Dark mode toggle
const toggle = document.getElementById('theme')
const root = document.documentElement

const saved = localStorage.getItem('theme')
if (saved) root.setAttribute('data-theme', saved)

toggle.addEventListener('click', () => {
  const isDark =
    root.getAttribute('data-theme') === 'dark'
  const next = isDark ? 'light' : 'dark'
  root.setAttribute('data-theme', next)
  localStorage.setItem('theme', next)
})`,

  `// Contact form handler
const form = document.getElementById('contact')

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const data = Object.fromEntries(
    new FormData(form)
  )
  const res = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (res.ok) showToast('Sent! 🚀')
})`,

  `// Lazy load images
const images = document.querySelectorAll(
  'img[data-src]'
)

const imgObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(({ isIntersecting, target }) => {
      if (isIntersecting) {
        target.src = target.dataset.src
        target.classList.add('loaded')
        imgObserver.unobserve(target)
      }
    })
  }
)

images.forEach(img => imgObserver.observe(img))`,
]

function codeReducer(state, action) {
  switch (action.type) {
    case 'TYPE':
      return {
        ...state,
        charIndex: state.charIndex + 1,
      }

    case 'DELETE':
      return {
        ...state,
        charIndex: state.charIndex - 1,
      }

    case 'SWITCH_SNIPPET':
      return {
        ...state,
        snippetIndex:
          (state.snippetIndex + 1) %
          CODE_SNIPPETS.length,
        charIndex: 0,
        isDeleting: false,
      }

    case 'START_DELETE':
      return {
        ...state,
        isDeleting: true,
      }

    case 'START_TYPE':
      return {
        ...state,
        isDeleting: false,
      }

    default:
      return state
  }
}

export default function Hero() {
  const { t, i18n } =
    useTranslation('home')

  const codeRef = useRef(null)

  const [wordIndex, setWordIndex] =
    useState(0)

  const [animState, setAnimState] =
    useState('visible')

  const [codeState, dispatch] =
    useReducer(codeReducer, {
      snippetIndex: 0,
      charIndex: 0,
      isDeleting: false,
    })

  const cyclingWords = [
    {
      text: t('hero.websites'),
      color: 'black',
    },
    {
      text: t('hero.experiences'),
      color: 'orange',
    },
    {
      text: t('hero.solutions'),
      color: 'black',
    },
    {
      text: t('hero.platforms'),
      color: 'orange',
    },
    {
      text: t('hero.products'),
      color: 'black',
    },
    {
      text: t('hero.brands'),
      color: 'orange',
    },
  ]

  /*
   * Reset the rotating word after changing language.
   * This makes the new language appear immediately
   * and avoids retaining an outdated word index.
   */
  useEffect(() => {
    setWordIndex(0)
    setAnimState('visible')
  }, [i18n.resolvedLanguage])

  useEffect(() => {
    let exitTimeout
    let visibleTimeout

    const interval = setInterval(() => {
      setAnimState('exit')

      exitTimeout = setTimeout(() => {
        setWordIndex(
          (previousIndex) =>
            (previousIndex + 1) %
            cyclingWords.length
        )

        setAnimState('enter')

        visibleTimeout = setTimeout(() => {
          setAnimState('visible')
        }, 50)
      }, 380)
    }, 2800)

    return () => {
      clearInterval(interval)
      clearTimeout(exitTimeout)
      clearTimeout(visibleTimeout)
    }
  }, [cyclingWords.length])

  useEffect(() => {
    const element = codeRef.current

    if (!element) {
      return undefined
    }

    const currentSnippet =
      CODE_SNIPPETS[
        codeState.snippetIndex
      ]

    element.textContent =
      currentSnippet.slice(
        0,
        codeState.charIndex
      )

    let timeout

    if (!codeState.isDeleting) {
      if (
        codeState.charIndex ===
        currentSnippet.length
      ) {
        timeout = setTimeout(() => {
          dispatch({
            type: 'START_DELETE',
          })
        }, 2500)
      } else {
        timeout = setTimeout(() => {
          dispatch({
            type: 'TYPE',
          })
        }, 18)
      }
    } else if (
      codeState.charIndex === 0
    ) {
      dispatch({
        type: 'SWITCH_SNIPPET',
      })

      timeout = setTimeout(() => {
        dispatch({
          type: 'START_TYPE',
        })
      }, 400)
    } else {
      timeout = setTimeout(() => {
        dispatch({
          type: 'DELETE',
        })
      }, 8)
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [codeState])

  const currentWord =
    cyclingWords[wordIndex] ??
    cyclingWords[0]

  return (
    <>
      <div className="hero-wrapper">
        <section
          id="home"
          className="hero"
        >
          <div className="hero-left">
            <div className="hero-line-graphics">
              <span className="hero-graphics-text">
                {t('hero.graphics')},
              </span>
            </div>

            <div className="hero-line-main">
              <span className="hero-big-orange">
                {t('hero.web_design')}
              </span>
            </div>

            <div className="hero-line-black">
              <span className="hero-big-black">
                &amp;{' '}
                {t('hero.and_hosting')}
              </span>
            </div>

            <div className="hero-line-animated">
              <span
                className={`hero-word-swap ${animState} ${
                  currentWord.color ===
                  'orange'
                    ? 'word-orange'
                    : 'word-black'
                }`}
              >
                {currentWord.text}
              </span>

              <span className="hero-word-dot">
                .
              </span>
            </div>

            <div className="hero-subtitle-row">
              <p className="hero-subtitle-new">
                <span>
                  {t(
                    'hero.tagline_part1'
                  )}
                </span>

                {' '}&amp;{' '}

                <span>
                  {t(
                    'hero.tagline_part2'
                  )}
                  .
                </span>
              </p>

              <div className="hero-badge hero-badge--inline">
                <span className="badge-number">
                  50+
                </span>

                <span
                  className="badge-star"
                  aria-hidden="true"
                >
                  ⭐
                </span>

                <span className="badge-text">
                  {t(
                    'hero.projects_badge'
                  )}
                </span>
              </div>
            </div>
          </div>

          <div className="scroll-indicator">
            <div className="scroll-line" />

            <span>
              {t('hero.scroll_text')}
            </span>
          </div>
        </section>

        <div className="code-editor-float">
          <div className="code-window">
            <div className="code-window-bar">
              <span
                className="dot red"
                aria-hidden="true"
              />

              <span
                className="dot yellow"
                aria-hidden="true"
              />

              <span
                className="dot green"
                aria-hidden="true"
              />

              <span className="window-title">
                teravolt — app.js
              </span>

              <div className="code-tabs">
                <span className="code-tab active">
                  app.js
                </span>

                <span className="code-tab">
                  utils.js
                </span>

                <span className="code-tab">
                  api.js
                </span>
              </div>
            </div>

            <div className="code-body">
              <div
                className="line-numbers"
                aria-hidden="true"
              >
                {Array.from(
                  { length: 30 },
                  (_, index) => (
                    <span key={index}>
                      {index + 1}
                    </span>
                  )
                )}
              </div>

              <pre className="code-content">
                <code
                  ref={codeRef}
                  className="code-text"
                />

                <span
                  className="code-cursor"
                  aria-hidden="true"
                >
                  ▌
                </span>
              </pre>
            </div>

            <div className="code-status-bar">
              <span>
                ⬡ JavaScript
              </span>

              <span>UTF-8</span>

              <span>Spaces: 2</span>

              <span className="status-online">
                ⬤ Live Server :3000
              </span>
            </div>
          </div>
        </div>
      </div>

      <LogoScroll />
    </>
  )
}