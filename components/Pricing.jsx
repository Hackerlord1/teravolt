'use client'
import { useState } from 'react'
import PlanModal from './PlanModal' // ✅ import modal

const plans = [
  {
    name: 'Basic',
    basePrice: 18390,
    extraPerPage: 5256,
    desc: 'Perfect for small projects and simple websites.',
    features: [
      'Responsive Design',
      'Basic SEO Setup',
      'Fast Delivery (3 Days)',
      'Email Support',
      'Contact Form Integration',
    ],
    recommended: false,
    btnLabel: 'Choose Basic',
  },
  {
    name: 'Standard',
    basePrice: 48164,
    extraPerPage: 8760,
    desc: 'Best for growing businesses with more needs.',
    features: [
      'Advanced SEO & Analytics',
      'CMS Integration',
      'Mobile-First Design',
      '1-Month Free Support',
      'Priority Email Support',
    ],
    recommended: true,
    btnLabel: 'Choose Standard',
  },
  {
    name: 'Pro',
    basePrice: 57796,
    extraPerPage: 7008,
    desc: 'Ideal for larger businesses that need scalability.',
    features: [
      'E-commerce Integration',
      'Custom API Integration',
      'Priority Support',
      'Performance Optimization',
      'Advanced Analytics',
    ],
    recommended: false,
    btnLabel: 'Choose Pro',
  },
]

const PAGE_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function calcPrice(base, extra, pages) {
  return base + extra * (pages - 1)
}

function getActivePlan(pages) {
  if (pages <= 3) return 'Basic'
  if (pages <= 6) return 'Standard'
  return 'Pro'
}

export default function Pricing() {
  const [pageIndex, setPageIndex] = useState(4)
  const pages = PAGE_OPTIONS[pageIndex]
  const sliderPercent = (pageIndex / (PAGE_OPTIONS.length - 1)) * 100
  const activePlan = getActivePlan(pages)

  // ✅ Modal state
  const [selectedPlan, setSelectedPlan] = useState(null)

  return (
    <section id="pricing" className="pricing-section">

      {/* ✅ Modal */}
      {selectedPlan && (
        <PlanModal
          plan={selectedPlan}
          pages={pages}
          onClose={() => setSelectedPlan(null)}
        />
      )}

      {/* Header */}
      <div className="pricing-header">
        <h2 className="pricing-main-title">Packages</h2>
        <p className="pricing-subtitle">
          Customize your plan to fit your exact needs.
        </p>
        <p className="pricing-note">
          Prices adapted to your local market{' '}
          <span className="pricing-kes">(KES)</span>{' '}
          for the best value.
        </p>
      </div>

      {/* Slider */}
      <div className="pricing-slider-wrap">
        <div className="slider-labels">
          <span className="slider-label-text">Number of Pages: </span>
          <span className="slider-label-value">
            {pages} {pages === 1 ? 'page' : 'pages'}
          </span>
        </div>

        <div className="slider-track-container">
          <div className="slider-dots">
            {PAGE_OPTIONS.map((_, i) => (
              <button
                key={i}
                className={`slider-dot ${i <= pageIndex ? 'slider-dot--filled' : ''} ${i === pageIndex ? 'slider-dot--active' : ''}`}
                onClick={() => setPageIndex(i)}
                aria-label={`${PAGE_OPTIONS[i]} pages`}
              />
            ))}
          </div>
          <div className="slider-track-bg">
            <div
              className="slider-track-fill"
              style={{ width: `${sliderPercent}%` }}
            />
          </div>
          <input
            type="range"
            min={0}
            max={PAGE_OPTIONS.length - 1}
            step={1}
            value={pageIndex}
            onChange={(e) => setPageIndex(Number(e.target.value))}
            className="pricing-slider"
            style={{ '--fill': `${sliderPercent}%` }}
          />
        </div>

        <div className="slider-step-labels">
          {PAGE_OPTIONS.map((p, i) => (
            <span
              key={i}
              className={`slider-step-label ${i === pageIndex ? 'slider-step-label--active' : ''}`}
            >
              {p}
            </span>
          ))}
        </div>

        <div className="slider-plan-indicator">
          <span className="slider-plan-text">Recommended plan:</span>
          <span className="slider-plan-badge">{activePlan}</span>
        </div>

        <p className="slider-hint">
          Adjust the slider to see pricing for different page counts
        </p>
      </div>

      {/* Cards */}
      <div className="pricing-cards">
        {plans.map((plan) => {
          const price = calcPrice(plan.basePrice, plan.extraPerPage, pages)
          const isActive = plan.name === activePlan
          return (
            <div
              key={plan.name}
              className={`price-card-new
                ${plan.recommended ? 'recommended-new' : ''}
                ${isActive ? 'price-card--active' : ''}
              `}
            >
              {plan.recommended && (
                <div className="plan-badges">
                  <span className="badge-standard">Standard</span>
                  <span className="badge-popular">Most popular</span>
                </div>
              )}

              {isActive && !plan.recommended && (
                <div className="plan-badges">
                  <span className="badge-active">✦ Suggested</span>
                </div>
              )}

              <p className="plan-name">{plan.name}</p>
              <h3 className="plan-price">Ksh {price.toLocaleString()}</h3>
              <p className="plan-desc">{plan.desc}</p>
              <p className="plan-extra">
                {pages} pages • Ksh {plan.extraPerPage.toLocaleString()}/additional page
              </p>
              <div className="plan-divider" />
              <ul className="plan-features">
                {plan.features.map((f, i) => (
                  <li key={i}>
                    <span className="feature-check">⊙</span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* ✅ Button opens modal */}
              <button
                className="plan-btn"
                onClick={() => setSelectedPlan(plan)}
              >
                {plan.btnLabel}
              </button>
            </div>
          )
        })}
      </div>

      <p className="pricing-footer-note">
        Need something custom?{' '}
        <a href="#contact" className="pricing-talk-link">
          Let&apos;s talk
        </a>{' '}
        and we&apos;ll help brainstorm your product to success.
      </p>

    </section>
  )
}