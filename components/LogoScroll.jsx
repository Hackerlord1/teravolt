'use client'

const companies = [
  {
    name: 'Cognix',
    color: '#6366F1',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="18" stroke="#6366F1" strokeWidth="2.5"/>
        <path d="M13 20c0-3.9 3.1-7 7-7s7 3.1 7 7-3.1 7-7 7" stroke="#6366F1" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="20" cy="20" r="3" fill="#6366F1"/>
      </svg>
    ),
  },
  {
    name: 'TechBase',
    color: '#0EA5E9',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="32" height="32" rx="8" stroke="#0EA5E9" strokeWidth="2.5"/>
        <path d="M12 20h16M20 12v16" stroke="#0EA5E9" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: 'NovaSoft',
    color: '#F59E0B',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="20,4 36,12 36,28 20,36 4,28 4,12" stroke="#F59E0B" strokeWidth="2.5" fill="none"/>
        <circle cx="20" cy="20" r="4" fill="#F59E0B"/>
      </svg>
    ),
  },
  {
    name: 'WFT Group',
    color: '#10B981',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 28L14 12l6 10 6-10 6 16" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    name: 'Naasa Sec.',
    color: '#EF4444',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="16" stroke="#EF4444" strokeWidth="2.5"/>
        <circle cx="20" cy="20" r="8" stroke="#EF4444" strokeWidth="2.5"/>
        <circle cx="20" cy="20" r="2.5" fill="#EF4444"/>
      </svg>
    ),
  },
  {
    name: 'GrowMore',
    color: '#8B5CF6',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 32L20 8l12 24" stroke="#8B5CF6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 24h16" stroke="#8B5CF6" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: 'NextHub',
    color: '#000000',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="32" height="32" rx="6" fill="#000"/>
        <path d="M12 28V14l16 14V14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    name: 'RoyalTech',
    color: '#F97316',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 30V16l12-8 12 8v14H8z" stroke="#F97316" strokeWidth="2.5" fill="none" strokeLinejoin="round"/>
        <rect x="15" y="22" width="10" height="8" stroke="#F97316" strokeWidth="2" fill="none"/>
      </svg>
    ),
  },
  {
    name: 'Blissful',
    color: '#EC4899',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 34C20 34 6 26 6 16a8 8 0 0114-5.3A8 8 0 0134 16c0 10-14 18-14 18z" stroke="#EC4899" strokeWidth="2.5" fill="none"/>
      </svg>
    ),
  },
  {
    name: 'DataFlow',
    color: '#06B6D4',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="20" r="4" stroke="#06B6D4" strokeWidth="2.5"/>
        <circle cx="30" cy="20" r="4" stroke="#06B6D4" strokeWidth="2.5"/>
        <path d="M14 20h12" stroke="#06B6D4" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M20 8v6M20 26v6" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: 'PixelCo',
    color: '#84CC16',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="6" width="12" height="12" rx="2" stroke="#84CC16" strokeWidth="2.5"/>
        <rect x="22" y="6" width="12" height="12" rx="2" stroke="#84CC16" strokeWidth="2.5"/>
        <rect x="6" y="22" width="12" height="12" rx="2" stroke="#84CC16" strokeWidth="2.5"/>
        <rect x="22" y="22" width="12" height="12" rx="2" fill="#84CC16"/>
      </svg>
    ),
  },
  {
    name: 'SkyLaunch',
    color: '#3B82F6',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 6l4 8h8l-6.5 5 2.5 8L20 22l-8 5 2.5-8L8 14h8l4-8z" stroke="#3B82F6" strokeWidth="2.5" fill="none" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

// ✅ Duplicate for seamless loop
const doubled = [...companies, ...companies]

export default function LogoScroll() {
  return (
    <div className="logo-scroll-section">

      {/* ✅ Tagline */}
      <p className="logo-scroll-tagline">
        <span className="dot-orange">●</span>{' '}
        Partnering as a{' '}
        <strong>Web Design & Hosting Agency</strong> with teams at:
      </p>

      {/* ✅ Row 1 — scrolls left */}
      <div className="logo-scroll-track-wrap">
        <div className="logo-fade-left" />
        <div className="logo-fade-right" />
        <div className="logo-scroll-track">
          {doubled.map((company, i) => (
            <div
              key={i}
              className="logo-item"
              style={{ '--logo-color': company.color }}
            >
              <span className="logo-svg">{company.icon}</span>
              <span className="logo-name">{company.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Row 2 — scrolls right (reversed) */}
      <div className="logo-scroll-track-wrap" style={{ marginTop: '1rem' }}>
        <div className="logo-fade-left" />
        <div className="logo-fade-right" />
        <div className="logo-scroll-track logo-scroll-track--reverse">
          {[...doubled].reverse().map((company, i) => (
            <div
              key={i}
              className="logo-item"
              style={{ '--logo-color': company.color }}
            >
              <span className="logo-svg">{company.icon}</span>
              <span className="logo-name">{company.name}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}