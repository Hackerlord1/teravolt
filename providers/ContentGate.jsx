'use client'

import { useI18nReady } from './I18nProvider'

/**
 * Hides translated page content until the saved language is applied,
 * so visitors never see a flash of the wrong language. The navbar is
 * deliberately rendered OUTSIDE this gate (see app/layout.js) — the
 * header must appear with the first paint, never fade in afterwards.
 */
export default function ContentGate({ children }) {
  const ready = useI18nReady()

  return (
    <div
      style={{
        visibility: ready
          ? 'visible'
          : 'hidden',
      }}
    >
      {children}
    </div>
  )
}
