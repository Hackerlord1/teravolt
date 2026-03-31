export default function SocialProfileLogo({ size = 420 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "32px",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(145deg, #0f172a 0%, #111827 45%, #1e293b 100%)",
        boxShadow: "0 24px 60px rgba(0,0,0,0.22)",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 500 500"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Teravolt Digital Solutions logo"
      >
        <defs>
          <linearGradient id="shapeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>

          <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>
        </defs>

        {/* subtle inner panel */}
        <rect
          x="65"
          y="65"
          width="370"
          height="370"
          rx="95"
          fill="rgba(255,255,255,0.03)"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="2"
        />

        {/* brand mark */}
        <g transform="translate(0, 8)">
          {/* top bar of T */}
          <rect
            x="140"
            y="145"
            width="220"
            height="34"
            rx="17"
            fill="url(#shapeGradient)"
          />

          {/* main stem */}
          <rect
            x="233"
            y="145"
            width="34"
            height="190"
            rx="17"
            fill="url(#shapeGradient)"
          />

          {/* right-side modern digital panel */}
          <path
            d="M275 190
               C320 190, 352 220, 352 255
               C352 292, 322 320, 275 320
               L245 320
               L245 286
               L274 286
               C298 286, 316 273, 316 255
               C316 237, 298 224, 274 224
               L245 224
               L245 190
               Z"
            fill="url(#accentGradient)"
            opacity="0.95"
          />
        </g>

        {/* small detail accent */}
        <circle cx="345" cy="145" r="6" fill="#94a3b8" />
      </svg>
    </div>
  );
}