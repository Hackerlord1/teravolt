'use client'

import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { blogPosts } from '@/lib/blogData'
import { localizeBlogPosts } from '@/lib/localizeBlogPosts'

export default function useLocalizedBlogPosts() {
  const { i18n } = useTranslation([
    'blog',
    'blogPosts',
  ])

  return useMemo(() => {
    const language =
      i18n.resolvedLanguage ||
      i18n.language ||
      'en'

    const normalizedLanguage =
      language.split('-')[0]

    const translations =
      i18n.getResourceBundle(
        normalizedLanguage,
        'blogPosts'
      ) || {}

    return localizeBlogPosts(
      blogPosts,
      translations
    )
  }, [
    i18n,
    i18n.resolvedLanguage,
    i18n.language,
  ])
}