'use client'
import { useEffect, useRef, useState, useReducer } from 'react'
import LogoScroll from './LogoScroll'

const CYCLING_WORDS = [
  { text: 'WEBSITES',    color: 'black'  },
  { text: 'EXPERIENCES', color: 'orange' },
  { text: 'SOLUTIONS',   color: 'black'  },
  { text: 'PLATFORMS',   color: 'orange' },
  { text: 'PRODUCTS',    color: 'black'  },
  { text: 'BRANDS',      color: 'orange' },
]

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
      return { ...state, charIndex: state.charIndex + 1 }
    case 'DELETE':
      return { ...state, charIndex: state.charIndex - 1 }
    case 'SWITCH_SNIPPET':
      return { ...state, snippetIndex: (state.snippetIndex + 1) % CODE_SNIPPETS.length, charIndex: 0, isDeleting: false }
    case 'START_DELETE':
      return { ...state, isDeleting: true }
    case 'START_TYPE':
      return { ...state, isDeleting: false }
    default:
      return state
  }
}

export default function Hero() {
  const codeRef = useRef(null)
  const [wordIndex, setWordIndex] = useState(0)
  const [animState, setAnimState] = useState('visible')
  const [codeState, dispatch] = useReducer(codeReducer, {
    snippetIndex: 0,
    charIndex: 0,
    isDeleting: false,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimState('exit')
      setTimeout(() => {
        setWordIndex(prev => (prev + 1) % CYCLING_WORDS.length)
        setAnimState('enter')
        setTimeout(() => setAnimState('visible'), 50)
      }, 380)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const el = codeRef.current
    if (!el) return

    const current = CODE_SNIPPETS[codeState.snippetIndex]
    el.textContent = current.slice(0, codeState.charIndex)

    let timeout
    if (!codeState.isDeleting) {
      if (codeState.charIndex === current.length) {
        timeout = setTimeout(() => dispatch({ type: 'START_DELETE' }), 2500)
      } else {
        timeout = setTimeout(() => dispatch({ type: 'TYPE' }), 18)
      }
    } else {
      if (codeState.charIndex === 0) {
        dispatch({ type: 'SWITCH_SNIPPET' })
        timeout = setTimeout(() => dispatch({ type: 'START_TYPE' }), 400)
      } else {
        timeout = setTimeout(() => dispatch({ type: 'DELETE' }), 8)
      }
    }

    return () => clearTimeout(timeout)
  }, [codeState])

  const currentWord = CYCLING_WORDS[wordIndex]

  return (
    <>
      <div className="hero-wrapper">

        <section id="home" className="hero">
          <div className="hero-left">

            <div className="hero-line-graphics">
              <span className="hero-graphics-text">GRAPHICS ,</span>
            </div>

            <div className="hero-line-main">
              <span className="hero-big-orange">WEB / DESIGN</span>
            </div>

            <div className="hero-line-black">
              <span className="hero-big-black">&amp; HOSTING</span>
            </div>

            <div className="hero-line-animated">
              <span
                className={`hero-word-swap ${animState} ${
                  currentWord.color === 'orange' ? 'word-orange' : 'word-black'
                }`}
              >
                {currentWord.text}
              </span>
              <span className="hero-word-dot">.</span>
            </div>

            <div className="hero-subtitle-row">
              <p className="hero-subtitle-new">
                <span>Full stack Web Design</span>
                {' '}&amp;{' '}
                <span>Hosting Agency.</span>
              </p>

              <div className="hero-badge hero-badge--inline">
                <span className="badge-number">50+</span>
                <span className="badge-star">⭐</span>
                <span className="badge-text">Projects Completed</span>
              </div>
            </div>

          </div>

          <div className="scroll-indicator">
            <div className="scroll-line" />
            <span>Scroll</span>
          </div>
        </section>

        <div className="code-editor-float">
          <div className="code-window">
            <div className="code-window-bar">
              <span className="dot red"    />
              <span className="dot yellow" />
              <span className="dot green"  />
              <span className="window-title">teravolt — app.js</span>
              <div className="code-tabs">
                <span className="code-tab active">app.js</span>
                <span className="code-tab">utils.js</span>
                <span className="code-tab">api.js</span>
              </div>
            </div>

            <div className="code-body">
              <div className="line-numbers">
                {Array.from({ length: 30 }, (_, i) => (
                  <span key={i}>{i + 1}</span>
                ))}
              </div>
              <pre className="code-content">
                <code ref={codeRef} className="code-text" />
                <span className="code-cursor">▌</span>
              </pre>
            </div>

            <div className="code-status-bar">
              <span>⬡ JavaScript</span>
              <span>UTF-8</span>
              <span>Spaces: 2</span>
              <span className="status-online">⬤ Live Server :3000</span>
            </div>
          </div>
        </div>

      </div>

      <LogoScroll />
    </>
  )
}