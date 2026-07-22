import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

/*
 * Homepage
 */
import enHome from '@/locales/en/home.json'
import frHome from '@/locales/fr/home.json'
import ptHome from '@/locales/pt/home.json'
import esHome from '@/locales/es/home.json'
import deHome from '@/locales/de/home.json'
import itHome from '@/locales/it/home.json'
import nlHome from '@/locales/nl/home.json'
import swHome from '@/locales/sw/home.json'
import zhHome from '@/locales/zh/home.json'

/*
 * Blog interface
 */
import enBlog from '@/locales/en/blog.json'
import frBlog from '@/locales/fr/blog.json'
import ptBlog from '@/locales/pt/blog.json'
import esBlog from '@/locales/es/blog.json'
import deBlog from '@/locales/de/blog.json'
import itBlog from '@/locales/it/blog.json'
import nlBlog from '@/locales/nl/blog.json'
import swBlog from '@/locales/sw/blog.json'
import zhBlog from '@/locales/zh/blog.json'

/*
 * Blog article content
 */
import enBlogPosts from '@/locales/en/blog-posts.json'
import frBlogPosts from '@/locales/fr/blog-posts.json'
import ptBlogPosts from '@/locales/pt/blog-posts.json'
import esBlogPosts from '@/locales/es/blog-posts.json'
import deBlogPosts from '@/locales/de/blog-posts.json'
import itBlogPosts from '@/locales/it/blog-posts.json'
import nlBlogPosts from '@/locales/nl/blog-posts.json'
import swBlogPosts from '@/locales/sw/blog-posts.json'
import zhBlogPosts from '@/locales/zh/blog-posts.json'

/*
 * Portfolio interface and project content
 */
import enPortfolio from '@/locales/en/portfolio.json'
import frPortfolio from '@/locales/fr/portfolio.json'
import ptPortfolio from '@/locales/pt/portfolio.json'
import esPortfolio from '@/locales/es/portfolio.json'
import dePortfolio from '@/locales/de/portfolio.json'
import itPortfolio from '@/locales/it/portfolio.json'
import nlPortfolio from '@/locales/nl/portfolio.json'
import swPortfolio from '@/locales/sw/portfolio.json'
import zhPortfolio from '@/locales/zh/portfolio.json'

/*
 * Service content
 */
import enServices from '@/locales/en/services.json'
import frServices from '@/locales/fr/services.json'
import ptServices from '@/locales/pt/services.json'
import esServices from '@/locales/es/services.json'
import deServices from '@/locales/de/services.json'
import itServices from '@/locales/it/services.json'
import nlServices from '@/locales/nl/services.json'
import swServices from '@/locales/sw/services.json'
import zhServices from '@/locales/zh/services.json'

/*
 * Shared route and sidebar labels
 */
import enCommon from '@/locales/en/common.json'
import frCommon from '@/locales/fr/common.json'
import ptCommon from '@/locales/pt/common.json'
import esCommon from '@/locales/es/common.json'
import deCommon from '@/locales/de/common.json'
import itCommon from '@/locales/it/common.json'
import nlCommon from '@/locales/nl/common.json'
import swCommon from '@/locales/sw/common.json'
import zhCommon from '@/locales/zh/common.json'

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

  fr: {
    home: frHome,
    blog: frBlog,
    blogPosts: frBlogPosts,
    portfolio: frPortfolio,
    services: frServices,
    common: frCommon,
  },

  pt: {
    home: ptHome,
    blog: ptBlog,
    blogPosts: ptBlogPosts,
    portfolio: ptPortfolio,
    services: ptServices,
    common: ptCommon,
  },

  es: {
    home: esHome,
    blog: esBlog,
    blogPosts: esBlogPosts,
    portfolio: esPortfolio,
    services: esServices,
    common: esCommon,
  },

  de: {
    home: deHome,
    blog: deBlog,
    blogPosts: deBlogPosts,
    portfolio: dePortfolio,
    services: deServices,
    common: deCommon,
  },

  it: {
    home: itHome,
    blog: itBlog,
    blogPosts: itBlogPosts,
    portfolio: itPortfolio,
    services: itServices,
    common: itCommon,
  },

  nl: {
    home: nlHome,
    blog: nlBlog,
    blogPosts: nlBlogPosts,
    portfolio: nlPortfolio,
    services: nlServices,
    common: nlCommon,
  },

  sw: {
    home: swHome,
    blog: swBlog,
    blogPosts: swBlogPosts,
    portfolio: swPortfolio,
    services: swServices,
    common: swCommon,
  },

  zh: {
    home: zhHome,
    blog: zhBlog,
    blogPosts: zhBlogPosts,
    portfolio: zhPortfolio,
    services: zhServices,
    common: zhCommon,
  },
}

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,

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