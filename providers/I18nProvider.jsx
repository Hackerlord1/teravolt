'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n, {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
} from '@/lib/i18n'

const I18nReadyContext = createContext(true)

export function useI18nReady() {
  return useContext(I18nReadyContext)
}

export default function I18nProvider({
  children,
}) {
  const [ready, setReady] = useState(false)

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

      if (active) {
        setReady(true)
      }
    }

    initializeLanguage()

    return () => {
      active = false
    }
  }, [])

  return (
    <I18nextProvider i18n={i18n}>
      <I18nReadyContext.Provider value={ready}>
        {children}
      </I18nReadyContext.Provider>
    </I18nextProvider>
  )
}
