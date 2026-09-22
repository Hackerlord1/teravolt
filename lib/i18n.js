import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

/*
 * Only English is bundled: it's the language the server renders, so it must
 * be available synchronously. Every other language is fetched on demand by
 * lazyLocaleBackend (below) the first time it's selected — bundling all nine
 * put ~750 KB of JSON into the root layout chunk, which every page had to
 * download and parse before it could hydrate.
 */
import enHome from '@/locales/en/home.json'
import enBlog from '@/locales/en/blog.json'
import enBlogPosts from '@/locales/en/blog-posts.json'
import enPortfolio from '@/locales/en/portfolio.json'
import enServices from '@/locales/en/services.json'
import enCommon from '@/locales/en/common.json'

export const SUPPORTED_LANGUAGES = [
  'en',
  'fr',
  'pt',
  'es',
  'de',
  'it',
  'nl',
  'sw',
  'zh',
]

export const DEFAULT_LANGUAGE = 'en'

const resources = {
  en: {
    home: enHome,
    blog: enBlog,
    blogPosts: enBlogPosts,
    portfolio: enPortfolio,
    services: enServices,
    common: enCommon,
  },
}

/*
 * Namespace -> file name in locales/<language>/
 */
const NAMESPACE_FILES = {
  home: 'home',
  blog: 'blog',
  blogPosts: 'blog-posts',
  portfolio: 'portfolio',
  services: 'services',
  common: 'common',
}

/*
 * Minimal i18next backend: webpack splits each locale file into its own
 * small chunk, downloaded only when changeLanguage() needs it.
 */
const lazyLocaleBackend = {
  type: 'backend',
  init() {},
  read(language, namespace, callback) {
    import(`../locales/${language}/${NAMESPACE_FILES[namespace]}.json`)
      .then((module) => callback(null, module.default))
      .catch((error) => callback(error, null))
  },
}

if (!i18n.isInitialized) {
  i18n.use(lazyLocaleBackend).use(initReactI18next).init({
    resources,

    // English above is bundled; load the rest through the backend
    partialBundledLanguages: true,

    lng: DEFAULT_LANGUAGE,
    fallbackLng: DEFAULT_LANGUAGE,

    supportedLngs: SUPPORTED_LANGUAGES,
    load: 'languageOnly',

    defaultNS: 'home',

    ns: [
      'home',
      'blog',
      'blogPosts',
      'portfolio',
      'services',
      'common',
    ],

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: false,
    },

    returnNull: false,
    returnEmptyString: false,
  })
}

export default i18n
