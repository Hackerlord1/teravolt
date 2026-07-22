'use client'

import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { projects } from '@/lib/projectsData'
import { localizeProjects } from '@/lib/localizeProjects'

export default function useLocalizedProjects() {
  const { i18n } =
    useTranslation('portfolio')

  return useMemo(() => {
    const language =
      i18n.resolvedLanguage ||
      i18n.language ||
      'en'

    const normalizedLanguage =
      language.split('-')[0]

    const namespace =
      i18n.getResourceBundle(
        normalizedLanguage,
        'portfolio'
      ) || {}

    const translations =
      namespace.projects || {}

    return localizeProjects(
      projects,
      translations
    )
  }, [
    i18n,
    i18n.resolvedLanguage,
    i18n.language,
  ])
}