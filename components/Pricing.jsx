'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import PlanModal from './PlanModal'

const PAGE_OPTIONS = [
  1, 2, 3, 4, 5,
  6, 7, 8, 9, 10,
]

function calculatePrice(
  basePrice,
  extraPerPage,
  pages
) {
  return (
    basePrice +
    extraPerPage * (pages - 1)
  )
}

function getActivePlanId(pages) {
  if (pages <= 3) {
    return 'basic'
  }

  if (pages <= 6) {
    return 'standard'
  }

  return 'pro'
}

function getTranslationArray(
  t,
  key
) {
  const value = t(key, {
    returnObjects: true,
  })

  return Array.isArray(value)
    ? value
    : []
}

export default function Pricing() {
  const { t } = useTranslation('home')

  const [pageIndex, setPageIndex] =
    useState(0)

  const [
    selectedPlan,
    setSelectedPlan,
  ] = useState(null)

  const pages =
    PAGE_OPTIONS[pageIndex]

  const sliderPercent =
    (
      pageIndex /
      (PAGE_OPTIONS.length - 1)
    ) * 100

  const activePlanId =
    getActivePlanId(pages)

  const plans = [
    {
      id: 'basic',
      name: t(
        'pricing.plans.basic.name'
      ),
      basePrice: 8000,
      extraPerPage: 2500,
      desc: t(
        'pricing.plans.basic.description'
      ),
      features: getTranslationArray(
        t,
        'pricing.plans.basic.features'
      ),
      recommended: false,
      btnLabel: t(
        'pricing.plans.basic.button'
      ),
    },
    {
      id: 'standard',
      name: t(
        'pricing.plans.standard.name'
      ),
      basePrice: 20000,
      extraPerPage: 4000,
      desc: t(
        'pricing.plans.standard.description'
      ),
      features: getTranslationArray(
        t,
        'pricing.plans.standard.features'
      ),
      recommended: true,
      btnLabel: t(
        'pricing.plans.standard.button'
      ),
    },
    {
      id: 'pro',
      name: t(
        'pricing.plans.pro.name'
      ),
      basePrice: 35000,
      extraPerPage: 5500,
      desc: t(
        'pricing.plans.pro.description'
      ),
      features: getTranslationArray(
        t,
        'pricing.plans.pro.features'
      ),
      recommended: false,
      btnLabel: t(
        'pricing.plans.pro.button'
      ),
    },
  ]

  const activePlan =
    plans.find(
      (plan) =>
        plan.id === activePlanId
    ) ?? plans[0]

  const pageLabel =
    pages === 1
      ? t('pricing.page')
      : t('pricing.pages')

  return (
    <section
      id="pricing"
      className="pricing-section"
    >
      {selectedPlan && (
        <PlanModal
          plan={selectedPlan}
          pages={pages}
          onClose={() =>
            setSelectedPlan(null)
          }
        />
      )}

      <div className="pricing-header">
        <h2 className="pricing-main-title">
          {t('pricing.title')}
        </h2>

        <p className="pricing-subtitle">
          {t('pricing.subtitle')}
        </p>

        <p className="pricing-note">
          {t('pricing.market_note')}{' '}

          <span className="pricing-kes">
            (KES)
          </span>{' '}

          {t('pricing.best_value')}
        </p>
      </div>

      <div className="pricing-slider-wrap">
        <div className="slider-labels">
          <span className="slider-label-text">
            {t(
              'pricing.number_of_pages'
            )}{' '}
          </span>

          <span className="slider-label-value">
            {pages} {pageLabel}
          </span>
        </div>

        <div className="slider-track-container">
          <div className="slider-dots">
            {PAGE_OPTIONS.map(
              (pageOption, index) => (
                <button
                  key={pageOption}
                  type="button"
                  className={`slider-dot ${
                    index <= pageIndex
                      ? 'slider-dot--filled'
                      : ''
                  } ${
                    index === pageIndex
                      ? 'slider-dot--active'
                      : ''
                  }`}
                  onClick={() =>
                    setPageIndex(index)
                  }
                  aria-label={`${pageOption} ${
                    pageOption === 1
                      ? t('pricing.page')
                      : t('pricing.pages')
                  }`}
                />
              )
            )}
          </div>

          <div className="slider-track-bg">
            <div
              className="slider-track-fill"
              style={{
                width: `${sliderPercent}%`,
              }}
            />
          </div>

          <input
            type="range"
            min={0}
            max={
              PAGE_OPTIONS.length - 1
            }
            step={1}
            value={pageIndex}
            onChange={(event) =>
              setPageIndex(
                Number(
                  event.target.value
                )
              )
            }
            className="pricing-slider"
            style={{
              '--fill':
                `${sliderPercent}%`,
            }}
            aria-label={t(
              'pricing.number_of_pages'
            )}
          />
        </div>

        <div className="slider-step-labels">
          {PAGE_OPTIONS.map(
            (pageOption, index) => (
              <span
                key={pageOption}
                className={`slider-step-label ${
                  index === pageIndex
                    ? 'slider-step-label--active'
                    : ''
                }`}
              >
                {pageOption}
              </span>
            )
          )}
        </div>

        <div className="slider-plan-indicator">
          <span className="slider-plan-text">
            {t(
              'pricing.recommended_plan'
            )}
          </span>

          <span className="slider-plan-badge">
            {activePlan.name}
          </span>
        </div>

        <p className="slider-hint">
          {t('pricing.slider_hint')}
        </p>
      </div>

      <div className="pricing-cards">
        {plans.map((plan) => {
          const price =
            calculatePrice(
              plan.basePrice,
              plan.extraPerPage,
              pages
            )

          const isActive =
            plan.id === activePlanId

          return (
            <div
              key={plan.id}
              className={`price-card-new
                ${
                  plan.recommended
                    ? 'recommended-new'
                    : ''
                }
                ${
                  isActive
                    ? 'price-card--active'
                    : ''
                }
              `}
            >
              {plan.recommended && (
                <div className="plan-badges">
                  <span className="badge-standard">
                    {t(
                      'pricing.standard_badge'
                    )}
                  </span>

                  <span className="badge-popular">
                    {t(
                      'pricing.most_popular'
                    )}
                  </span>
                </div>
              )}

              {isActive &&
                !plan.recommended && (
                  <div className="plan-badges">
                    <span className="badge-active">
                      ✦{' '}
                      {t(
                        'pricing.suggested'
                      )}
                    </span>
                  </div>
                )}

              <p className="plan-name">
                {plan.name}
              </p>

              <h3 className="plan-price">
                Ksh{' '}
                {price.toLocaleString()}
              </h3>

              <p className="plan-desc">
                {plan.desc}
              </p>

              <p className="plan-extra">
                {pages} {pageLabel}
                {' • '}
                Ksh{' '}
                {plan.extraPerPage
                  .toLocaleString()}
                /
                {t(
                  'pricing.additional_page'
                )}
              </p>

              <div className="plan-divider" />

              <ul className="plan-features">
                {plan.features.map(
                  (feature) => (
                    <li key={feature}>
                      <span
                        className="feature-check"
                        aria-hidden="true"
                      >
                        ⊙
                      </span>

                      {feature}
                    </li>
                  )
                )}
              </ul>

              <button
                type="button"
                className="plan-btn"
                onClick={() =>
                  setSelectedPlan(plan)
                }
              >
                {plan.btnLabel}
              </button>
            </div>
          )
        })}
      </div>

      <p className="pricing-footer-note">
        {t('pricing.need_custom')}{' '}

        <a href="/#contact" className="pricing-contact-link">
          {t('pricing.lets_talk')}
        </a>

        {t('pricing.custom_suffix')}
      </p>
    </section>
  )
}