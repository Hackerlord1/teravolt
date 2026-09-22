'use client'

import { useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n, {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
} from '@/lib/i18n'

export default function I18nProvider({
  children,
}) {
  useEffect(() => {
    let active = true

    const initializeLanguage = async () => {
      const savedLanguage =
        localStorage.getItem('lang')

      const normalizedLanguage =
        savedLanguage
          ?.split('-')[0]
          ?.toLowerCase()

      const initialLanguage =
        SUPPORTED_LANGUAGES.includes(
          normalizedLanguage
        )
          ? normalizedLanguage
          : DEFAULT_LANGUAGE

      if (
        i18n.resolvedLanguage !==
        initialLanguage
      ) {
        await i18n.changeLanguage(
          initialLanguage
        )
      }

      document.documentElement.lang =
        initialLanguage

      // Reveal the content hidden by the inline script in app/layout.js
      // (see providers/ContentGate.jsx)
      if (active) {
        document.documentElement.removeAttribute(
          'data-i18n-pending'
        )
      }
    }

    initializeLanguage()

    return () => {
      active = false
    }
  }, [])

  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  )
}
