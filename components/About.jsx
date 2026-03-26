'use client'
import { useState } from 'react'

const tools = [
  {
    label: 'Firebase',
    color: '#FF6D00',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.8 24.6L8.4 6.4l7.4 7.4-10 10.8z" fill="#FFA000"/>
        <path d="M19.6 9.2l-3.8 4.6-7.4-7.4 11.2 2.8z" fill="#F57F17"/>
        <path d="M5.8 24.6l14.4-8.4-3.4-7.2-11 15.6z" fill="#FFCA28"/>
        <path d="M16 28l10-3.4-10-20-10 20L16 28z" fill="#FFA000"/>
        <path d="M16 8l10 16.6L16 28V8z" fill="#F57F17"/>
      </svg>
    ),
  },
  {
    label: 'MongoDB',
    color: '#00ED64',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 2C9.4 2 4 7.4 4 14c0 5.2 3.2 9.6 7.8 11.4L16 30l4.2-4.6C24.8 23.6 28 19.2 28 14 28 7.4 22.6 2 16 2z" fill="#00ED64"/>
        <path d="M16 4v22l3.4-3.8C23.4 20.6 26 17.6 26 14c0-5.5-4.5-10-10-10z" fill="#00684A"/>
        <rect x="15" y="6" width="2" height="20" rx="1" fill="#00684A"/>
      </svg>
    ),
  },
  {
    label: 'Python',
    color: '#3776AB',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 2c-3.8 0-7 .8-7 3.5V9h7v1H6.5C3.5 10 2 12 2 16s1.5 6 4.5 6H8v-3.5C8 15.5 10.5 13 14 13h6c2.5 0 4-1.5 4-4V5.5C24 2.8 20.8 2 16 2zm-1.5 2.5c.8 0 1.5.7 1.5 1.5S15.3 7.5 14.5 7.5 13 6.8 13 6s.7-1.5 1.5-1.5z" fill="#3776AB"/>
        <path d="M16 30c3.8 0 7-.8 7-3.5V23h-7v-1h9.5c3 0 4.5-2 4.5-6s-1.5-6-4.5-6H24v3.5C24 16.5 21.5 19 18 19h-6c-2.5 0-4 1.5-4 4v3.5C8 29.2 11.2 30 16 30zm1.5-2.5c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5S19 25.2 19 26s-.7 1.5-1.5 1.5z" fill="#FFD43B"/>
      </svg>
    ),
  },
  {
    label: 'Git',
    color: '#F05032',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M29.5 14.5L17.5 2.5a1.7 1.7 0 00-2.4 0l-2.4 2.4 3 3a2 2 0 012.6 2.6l2.9 2.9a2 2 0 11-1.2 1.2l-2.7-2.7v7.1a2 2 0 11-1.6 0V11.6a2 2 0 01-1.1-2.6L12 6.2 2.5 15.7a1.7 1.7 0 000 2.4l12 12a1.7 1.7 0 002.4 0l12.6-12.6a1.7 1.7 0 000-3z" fill="#F05032"/>
      </svg>
    ),
  },
  {
    label: 'Next.js',
    color: '#000000',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="14" fill="#000"/>
        <path d="M10 21V11h8.5c2 0 3.5 1.5 3.5 3.5S20.5 18 18.5 18H13v3h-3z" fill="white"/>
        <path d="M13 15.5h5c.8 0 1.5-.7 1.5-1.5s-.7-1.5-1.5-1.5h-5v3z" fill="#000"/>
        <path d="M20 21l-4-5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'TypeScript',
    color: '#3178C6',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="4" fill="#3178C6"/>
        <path d="M18 17.5V22c.6.3 1.3.5 2 .5 2.8 0 4.5-1.4 4.5-3.5 0-1.7-1-2.7-3-3.4-1.3-.5-1.8-.8-1.8-1.5 0-.6.5-1 1.3-1 .7 0 1.4.3 2.1.8l1-1.8c-.8-.6-1.9-1-3.1-1-2.5 0-4.1 1.4-4.1 3.4 0 1.7 1 2.7 3.1 3.4 1.2.4 1.7.8 1.7 1.5 0 .7-.6 1.1-1.5 1.1-.9 0-1.8-.4-2.2-.9zM8 13H5v2.5h3V22h2.5v-6.5H13V13H8z" fill="white"/>
      </svg>
    ),
  },
  {
    label: 'Canva',
    color: '#00C4CC',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="14" fill="#00C4CC"/>
        <path d="M16 8c-4.4 0-8 3.6-8 8s3.6 8 8 8c1.8 0 3-.8 3-2s-1-1.8-1-3c0-2.2 1.8-4 4-4 .6 0 1-.4 1-1 0-3.3-3.1-6-7-6z" fill="white"/>
        <circle cx="22" cy="16" r="2" fill="white"/>
      </svg>
    ),
  },
  {
    label: 'Photoshop',
    color: '#31A8FF',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="4" fill="#001E36"/>
        <path d="M7 22V10h4.5c2.8 0 4.5 1.5 4.5 4s-1.7 4-4.5 4H9.5v4H7zm2.5-6.5h1.8c1.3 0 2.2-.7 2.2-1.5S12.6 12.5 11.3 12.5H9.5v3z" fill="#31A8FF"/>
        <path d="M17.5 19.5c.8.5 1.8.8 2.8.8 1 0 1.5-.4 1.5-1s-.5-.9-1.7-1.3c-1.8-.6-2.8-1.5-2.8-3 0-1.8 1.5-3 3.7-3 1 0 1.9.2 2.5.5l-.5 2c-.5-.3-1.2-.5-2-.5-.9 0-1.4.4-1.4.9 0 .6.6.9 1.9 1.3 1.9.7 2.7 1.6 2.7 3.1 0 1.8-1.4 3.1-3.9 3.1-1.1 0-2.2-.3-2.9-.7l.1-2.2z" fill="#31A8FF"/>
      </svg>
    ),
  },
  {
    label: 'Illustrator',
    color: '#FF9A00',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="4" fill="#330000"/>
        <path d="M13.5 18h-4l-.8 2.5H6.5l4-11h3l4 11h-2.2L13.5 18zm-.6-2l-1.4-4.5L10.1 16h2.8z" fill="#FF9A00"/>
        <path d="M20 10h2.5v10.5H20V10z" fill="#FF9A00"/>
        <circle cx="21.2" cy="7.8" r="1.3" fill="#FF9A00"/>
      </svg>
    ),
  },
  {
    label: 'MySQL',
    color: '#4479A1',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 4C9.4 4 4 6.7 4 10v12c0 3.3 5.4 6 12 6s12-2.7 12-6V10c0-3.3-5.4-6-12-6z" fill="#4479A1"/>
        <ellipse cx="16" cy="10" rx="12" ry="4" fill="#00758F"/>
        <path d="M4 14c0 2.2 5.4 4 12 4s12-1.8 12-4" stroke="white" strokeWidth="0.5" fill="none"/>
        <path d="M4 18c0 2.2 5.4 4 12 4s12-1.8 12-4" stroke="white" strokeWidth="0.5" fill="none"/>
      </svg>
    ),
  },
  {
    label: 'PostgreSQL',
    color: '#4169E1',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 3C9 3 4 7.5 4 13c0 3.5 2 6.5 5 8.5V26l4-2.5c1 .3 2 .5 3 .5 7 0 12-4.5 12-10S23 3 16 3z" fill="#4169E1"/>
        <path d="M16 5c-5.5 0-10 3.6-10 8s4.5 8 10 8c1 0 2-.1 2.9-.4L22 23v-3.8c2.5-1.7 4-4.2 4-6.2 0-4.4-4.5-8-10-8z" fill="#336791"/>
        <path d="M13 13c0 1.1-.4 2-1 2s-1-.9-1-2 .4-2 1-2 1 .9 1 2zM21 13c0 1.1-.4 2-1 2s-1-.9-1-2 .4-2 1-2 1 .9 1 2z" fill="white"/>
        <path d="M13 17.5s1 1.5 3 1.5 3-1.5 3-1.5" stroke="white" strokeWidth="1" strokeLinecap="round" fill="none"/>
      </svg>
    ),
  },
  {
    label: 'React',
    color: '#61DAFB',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="2.5" fill="#61DAFB"/>
        <ellipse cx="16" cy="16" rx="12" ry="4.5" stroke="#61DAFB" strokeWidth="1.5" fill="none"/>
        <ellipse cx="16" cy="16" rx="12" ry="4.5" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(60 16 16)"/>
        <ellipse cx="16" cy="16" rx="12" ry="4.5" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(120 16 16)"/>
      </svg>
    ),
  },
  {
    label: 'Figma',
    color: '#F24E1E',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 6h5v8h-5a4 4 0 010-8z" fill="#F24E1E"/>
        <path d="M16 6h5a4 4 0 010 8h-5V6z" fill="#FF7262"/>
        <path d="M11 14h5v8h-5a4 4 0 010-8z" fill="#A259FF"/>
        <path d="M16 18a4 4 0 118 0 4 4 0 01-8 0z" fill="#1ABCFE"/>
        <path d="M11 22h5v4a4 4 0 01-5-4z" fill="#0ACF83"/>
      </svg>
    ),
  },
  {
    label: 'Tailwind',
    color: '#06B6D4',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 13c1-4 3.5-6 7.5-6 6 0 6.8 4.5 9.8 5.3-2 4-4.5 5.7-8.5 5.7-6 0-7.3-4-8.8-5zM2 21c1-4 3.5-6 7.5-6 6 0 6.8 4.5 9.8 5.3-2 4-4.5 5.7-8.5 5.7-6 0-7.3-4-8.8-5z" fill="#06B6D4"/>
      </svg>
    ),
  },
  {
    label: 'Docker',
    color: '#2496ED',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.5 13h3v3h-3zM13 13h3v3h-3zM8.5 13h3v3h-3zM13 8.5h3v3h-3zM17.5 8.5h3v3h-3z" fill="#2496ED"/>
        <path d="M29 15.5c-.5-.4-1.8-.5-2.8-.3-.1-1-.7-1.9-1.8-2.5l-.6-.3-.4.5c-.5.8-.7 2-.6 3-.4-.2-.9-.5-1.3-.5H4.5c-.3 0-.5.2-.5.5 0 2 .5 4 1.8 5.5 1.4 1.6 3.5 2.4 6.3 2.4 6 0 10.4-2.7 12.5-7.6.8 0 2.6 0 3.5-1.7z" fill="#2496ED"/>
      </svg>
    ),
  },
]

const INITIAL_COUNT = 9

export default function About() {
  const [showAll, setShowAll] = useState(false)

  const visibleTools = showAll ? tools : tools.slice(0, INITIAL_COUNT)

  return (
    <section id="about" className="section about-section">

      {/* Label — unchanged */}
      <div className="about-label-wrap">
        <p className="section-label" style={{ textAlign: 'center' }}>WHO WE ARE</p>
        <h2 className="about-main-title">About</h2>
      </div>

      {/* Big Paragraph — unchanged */}
      <div className="about-big-text">
        <p>
          Hi,{' '}
          <span className="about-orange">we are</span>{' '}
          <span className="about-avatar">🚀</span>{' '}
          <strong>Teravolt Digitals </strong>{' '}
          <span className="about-emoji">✌️</span>
          , building Web Design and Hosting solutions, {' '}
          
          focused on crafting{' '}
          <span className="about-emoji">🎨</span>{' '}
          and delivering digital products{' '}
          <span className="about-emoji">🌐</span>
          , brands{' '}
          <span className="about-emoji">✦</span>{' '}
          and experiences{' '}
          <span className="about-emoji">✨</span>.
        </p>
      </div>

      {/* Sub Description — unchanged */}
      <p className="about-sub-desc">
        A web design & hosting agency serving clients locally and globally,
        delivering excellence in every pixel and every millisecond of uptime.
      </p>

      {/* Tools — updated icons + expand */}
      {/* Tools — updated icons + expand */}
<div className="about-tools-section">
  <p className="about-tools-label">Expertise in Tools</p>
  <div className={`about-tools-grid ${showAll ? 'about-tools-grid--expanded' : ''}`}>

    {visibleTools.map((tool, i) => (
      <div
        key={i}
        className="tool-circle"
        title={tool.label}
        style={{ '--tool-color': tool.color }}
      >
        {/* ✅ SVG icon only — label removed */}
        <span className="tool-svg">{tool.icon}</span>
      </div>
    ))}

    {/* ✅ More / Less button — label removed */}
    <button
      className="tool-more-btn"
      onClick={() => setShowAll(!showAll)}
      title={showAll ? 'Show Less' : 'Show More'}
    >
      <span className="tool-more-icon">{showAll ? '−' : '+'}</span>
    </button>

  </div>
</div>

    </section>
  )
}