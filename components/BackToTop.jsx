'use client'
import { useState, useEffect } from 'react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  // ✅ Show after scrolling 400px
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      className={`back-to-top ${visible ? 'back-to-top--visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      {/* ✅ Text layer 1 — slides up on hover */}
      <div className="back-to-top__text">
        <span>Back</span>
        <span>to</span>
        <span>top</span>
      </div>

      {/* ✅ Text layer 2 — slides in from below */}
      <div className="back-to-top__clone">
        <span>Back</span>
        <span>to</span>
        <span>top</span>
      </div>

      {/* ✅ Arrow icon — rotates on hover */}
      <svg
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M14 5l7 7m0 0l-7 7m7-7H3"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </button>
  )
}