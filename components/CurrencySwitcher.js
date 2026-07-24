'use client'

import { useState, useRef, useEffect } from 'react'
import { CURRENCY_OPTIONS } from '@/hooks/useCurrency'

export default function CurrencySwitcher({ currentCurrency, onChange }) {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null)

  const currentOption = CURRENCY_OPTIONS.find(opt => opt.code === currentCurrency) || CURRENCY_OPTIONS[0]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    if (open) {
      document.addEventListener('keydown', handleEscape)
    }
    return () => document.removeEventListener('keydown', handleEscape)
  }, [open])

  if (!currentCurrency) return null

  return (
    <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="Select currency"
        aria-expanded={open}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          padding: '0.45rem 0.8rem',
          background: 'var(--card-bg)',
          border: '1.5px solid var(--border)',
          borderRadius: '50px',
          cursor: 'pointer',
          fontSize: '0.82rem',
          fontWeight: 600,
          fontFamily: 'var(--font-main)',
          color: 'var(--black)',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--orange)'
        }}
        onMouseLeave={(e) => {
          if (!open) e.currentTarget.style.borderColor = 'var(--border)'
        }}
      >
        <span style={{ fontSize: '0.9rem' }}>{currentOption.symbol}</span>
        <span>{currentOption.code}</span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 12 12"
          fill="none"
          style={{
            transition: 'transform 0.2s ease',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          <path d="M6 8L1 3h10z" fill="currentColor" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Select currency"
          style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: '0.4rem',
            background: 'var(--card-bg)',
            border: '1px solid var(--border)',
            borderRadius: '0.75rem',
            listStyle: 'none',
            padding: '0.4rem',
            minWidth: '220px',
            zIndex: 1002,
            boxShadow: '0 8px 24px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
          }}
        >
          {CURRENCY_OPTIONS.map((option) => (
            <li key={option.code}>
              <button
                type="button"
                role="option"
                aria-selected={currentCurrency === option.code}
                onClick={() => {
                  onChange(option.code)
                  setOpen(false)
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  width: '100%',
                  padding: '0.5rem 0.75rem',
                  border: 'none',
                  borderRadius: '0.5rem',
                  background: currentCurrency === option.code ? 'rgba(255,69,0,0.08)' : 'transparent',
                  color: currentCurrency === option.code ? 'var(--orange)' : 'var(--black)',
                  cursor: 'pointer',
                  fontSize: '0.82rem',
                  fontWeight: currentCurrency === option.code ? 700 : 500,
                  fontFamily: 'var(--font-main)',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  if (currentCurrency !== option.code) {
                    e.currentTarget.style.background = 'rgba(0,0,0,0.04)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentCurrency !== option.code) {
                    e.currentTarget.style.background = 'transparent'
                  }
                }}
              >
                <span style={{ fontSize: '1rem', width: '24px', textAlign: 'center' }}>
                  {option.symbol}
                </span>
                <span style={{ flex: 1 }}>{option.label}</span>
                {currentCurrency === option.code && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}