import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="notfound-page">
      <div className="notfound-content">

        {/* ✅ TV */}
        <div className="tv-container">
          <div className="tv-screen">
            <div className="tv-static" />
            <div className="tv-error-text">404</div>
            <div className="tv-scanline" />
          </div>
          <div className="tv-stand" />
          <div className="tv-stand-base" />
        </div>

        {/* ✅ Text */}
        <div className="notfound-text">
          <p className="notfound-label">
            <span className="notfound-dot" />
            SIGNAL LOST
          </p>
          <h1 className="notfound-title">
            Page not <span>found</span>.
          </h1>
          <p className="notfound-desc">
            The page you're looking for doesn't exist, was removed, 
            or the signal got lost somewhere in the static.
          </p>

          {/* ✅ Terminal pill */}
          <div className="notfound-terminal">
            <span className="notfound-terminal-prefix">$</span>
            <span className="notfound-terminal-text">
              teravolt --find-page → not_found
            </span>
            <span className="notfound-terminal-cursor">▌</span>
          </div>

          {/* ✅ CTAs */}
          <div className="notfound-ctas">
            <Link href="/" className="notfound-btn-primary">
              ← Back to Home
            </Link>
            <Link href="/#contact" className="notfound-btn-secondary">
              Contact Us
            </Link>
          </div>
        </div>

      </div>

      {/* ✅ Error code watermark */}
      <div className="notfound-watermark">404</div>
    </main>
  )
}