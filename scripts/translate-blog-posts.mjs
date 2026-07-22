import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

const ROOT = process.cwd()

const SOURCE_FILE = path.join(
  ROOT,
  'locales',
  'en',
  'blog-posts.json'
)

const ENV_FILES = [
  path.join(ROOT, '.env.local'),
  path.join(ROOT, '.dev.vars'),
]

const API_URL =
  'https://api.langbly.com/language/translate/v2'

const TARGET_LANGUAGES = {
  fr: 'French',
  pt: 'Portuguese',
  es: 'Spanish',
  de: 'German',
  it: 'Italian',
  nl: 'Dutch',
  sw: 'Swahili',
  zh: 'Chinese',
}

const MAX_RETRIES = 3
const REQUEST_DELAY_MS = 500
const MAX_TEXT_LENGTH = 3500

const args = process.argv.slice(2)

const FORCE = args.includes('--force')
const DRY_RUN = args.includes('--dry-run')

const languageArgument = args.find(
  (argument) =>
    argument.startsWith('--language=')
)

const SELECTED_LANGUAGE = languageArgument
  ? languageArgument
      .slice('--language='.length)
      .trim()
      .toLowerCase()
  : null

function sleep(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds)
  })
}

async function loadEnvironmentVariables() {
  for (const envFile of ENV_FILES) {
    try {
      const contents = await fs.readFile(
        envFile,
        'utf8'
      )

      const cleanContents = contents.replace(
        /^\uFEFF/,
        ''
      )

      const lines = cleanContents.split(/\r?\n/)

      for (const line of lines) {
        const trimmedLine = line.trim()

        if (
          !trimmedLine ||
          trimmedLine.startsWith('#') ||
          !trimmedLine.includes('=')
        ) {
          continue
        }

        const separatorIndex =
          trimmedLine.indexOf('=')

        const key = trimmedLine
          .slice(0, separatorIndex)
          .trim()

        let value = trimmedLine
          .slice(separatorIndex + 1)
          .trim()

        if (
          (
            value.startsWith('"') &&
            value.endsWith('"')
          ) ||
          (
            value.startsWith("'") &&
            value.endsWith("'")
          )
        ) {
          value = value.slice(1, -1)
        }

        if (key && !process.env[key]) {
          process.env[key] = value
        }
      }
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error
      }
    }
  }
}

async function readJson(
  filePath,
  fallback = {}
) {
  try {
    const contents = await fs.readFile(
      filePath,
      'utf8'
    )

    const cleanContents = contents.replace(
      /^\uFEFF/,
      ''
    )

    return JSON.parse(cleanContents)
  } catch (error) {
    if (error.code === 'ENOENT') {
      return fallback
    }

    throw new Error(
      `Could not read valid JSON from ` +
      `${path.relative(ROOT, filePath)}: ` +
      `${error.message}`
    )
  }
}

async function writeJson(
  filePath,
  data
) {
  await fs.mkdir(
    path.dirname(filePath),
    {
      recursive: true,
    }
  )

  await fs.writeFile(
    filePath,
    `${JSON.stringify(data, null, 2)}\n`,
    'utf8'
  )
}

function isPlainObject(value) {
  return (
    value !== null &&
    typeof value === 'object' &&
    !Array.isArray(value)
  )
}

function decodeHtmlEntities(text) {
  return text
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&apos;', "'")
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
}

function hasText(value) {
  return (
    typeof value === 'string' &&
    value.trim() !== ''
  )
}

function needsTranslation(value) {
  if (FORCE) {
    return true
  }

  return !hasText(value)
}

/*
 * Protect content that must remain unchanged:
 *
 * - Inline code
 * - Markdown images
 * - Markdown links
 * - URLs
 * - i18next placeholders
 * - HTML elements
 *
 * A single combined expression avoids nested
 * protected tokens.
 */
function protectText(text) {
  const protectedValues = []

  const protectedPattern =
    /`[^`\n]+`|!\[[^\]]*\]\([^)]+\)|\[[^\]]+\]\([^)]+\)|https?:\/\/[^\s)\]}>]+|\{\{[^{}]+\}\}|<[^>\n]+>/g

  const protectedText = text.replace(
    protectedPattern,
    (match) => {
      const index =
        protectedValues.length

      const token =
        `ZXQTVP${index}QXZ`

      protectedValues.push({
        index,
        token,
        value: match,
      })

      return token
    }
  )

  return {
    text: protectedText,
    protectedValues,
  }
}

function restoreText(
  translatedText,
  protectedValues
) {
  let restoredText = translatedText

  /*
   * Restore in reverse order as an additional
   * safeguard against any previously nested tokens.
   */
  const valuesToRestore = [
    ...protectedValues,
  ].reverse()

  for (const item of valuesToRestore) {
    const flexibleTokenPattern =
      new RegExp(
        `ZXQ\\s*TVP\\s*${item.index}\\s*QXZ`,
        'gi'
      )

    if (
      !flexibleTokenPattern.test(
        restoredText
      )
    ) {
      throw new Error(
        `Translation did not preserve ` +
        `protected token ${item.token}.`
      )
    }

    restoredText = restoredText.replace(
      new RegExp(
        `ZXQ\\s*TVP\\s*${item.index}\\s*QXZ`,
        'gi'
      ),
      item.value
    )
  }

  return restoredText
}
function splitLongText(text) {
  if (text.length <= MAX_TEXT_LENGTH) {
    return [text]
  }

  const lines = text.split(/(?<=\n)/)
  const chunks = []

  let currentChunk = ''

  for (const line of lines) {
    const combinedLength =
      currentChunk.length + line.length

    if (
      currentChunk &&
      combinedLength > MAX_TEXT_LENGTH
    ) {
      chunks.push(currentChunk)
      currentChunk = ''
    }

    if (line.length > MAX_TEXT_LENGTH) {
      if (currentChunk) {
        chunks.push(currentChunk)
        currentChunk = ''
      }

      for (
        let index = 0;
        index < line.length;
        index += MAX_TEXT_LENGTH
      ) {
        chunks.push(
          line.slice(
            index,
            index + MAX_TEXT_LENGTH
          )
        )
      }

      continue
    }

    currentChunk += line
  }

  if (currentChunk) {
    chunks.push(currentChunk)
  }

  return chunks
}

/*
 * Keep fenced code blocks unchanged.
 */
function splitMarkdown(markdown) {
  const segments = []

  const fencedCodePattern =
    /```[\s\S]*?```/g

  let lastIndex = 0
  let match

  while (
    (match = fencedCodePattern.exec(markdown)) !== null
  ) {
    if (match.index > lastIndex) {
      const precedingText = markdown.slice(
        lastIndex,
        match.index
      )

      for (
        const chunk of splitLongText(
          precedingText
        )
      ) {
        segments.push({
          type: 'text',
          value: chunk,
        })
      }
    }

    segments.push({
      type: 'protected',
      value: match[0],
    })

    lastIndex =
      match.index + match[0].length
  }

  if (lastIndex < markdown.length) {
    const remainingText = markdown.slice(
      lastIndex
    )

    for (
      const chunk of splitLongText(
        remainingText
      )
    ) {
      segments.push({
        type: 'text',
        value: chunk,
      })
    }
  }

  return segments
}

async function requestTranslations(
  values,
  targetLanguage,
  attempt = 1
) {
  if (values.length === 0) {
    return []
  }

  const apiKey =
    process.env.LANGBLY_API_KEY

  if (!apiKey) {
    throw new Error(
      'LANGBLY_API_KEY is missing from ' +
      '.env.local or .dev.vars.'
    )
  }

  const response = await fetch(API_URL, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': apiKey,
    },

    body: JSON.stringify({
      q: values,
      source: 'en',
      target: targetLanguage,
    }),
  })

  if (!response.ok) {
    const responseBody =
      await response.text()

    const retryable =
      response.status === 429 ||
      response.status >= 500

    if (
      retryable &&
      attempt < MAX_RETRIES
    ) {
      const retryAfterSeconds = Number(
        response.headers.get('retry-after')
      )

      const waitTime =
        Number.isFinite(
          retryAfterSeconds
        ) &&
        retryAfterSeconds > 0
          ? retryAfterSeconds * 1000
          : 1000 * 2 ** (attempt - 1)

      console.warn(
        `  Temporary HTTP ` +
        `${response.status} error. ` +
        `Retrying in ${waitTime}ms ` +
        `(${attempt + 1}/${MAX_RETRIES})...`
      )

      await sleep(waitTime)

      return requestTranslations(
        values,
        targetLanguage,
        attempt + 1
      )
    }

    throw new Error(
      `Langbly returned HTTP ` +
      `${response.status}: ` +
      `${responseBody}`
    )
  }

  const data = await response.json()

  const translations =
    data?.data?.translations

  if (!Array.isArray(translations)) {
    throw new Error(
      'Langbly response did not contain ' +
      'data.translations.'
    )
  }

  if (
    translations.length !== values.length
  ) {
    throw new Error(
      `Expected ${values.length} ` +
      `translations, but Langbly ` +
      `returned ${translations.length}.`
    )
  }

  return translations.map(
    (translation, index) => {
      const translatedText =
        translation?.translatedText

      if (
        typeof translatedText !== 'string'
      ) {
        throw new Error(
          `Translation ${index + 1} ` +
          `is missing translatedText.`
        )
      }

      return decodeHtmlEntities(
        translatedText
      )
    }
  )
}

async function translateProtectedText(
  text,
  targetLanguage
) {
  if (!text.trim()) {
    return text
  }

  const {
    text: protectedText,
    protectedValues,
  } = protectText(text)

  const [translatedText] =
    await requestTranslations(
      [protectedText],
      targetLanguage
    )

  return restoreText(
    translatedText,
    protectedValues
  )
}

async function translateMarkdown(
  markdown,
  targetLanguage,
  onProgress
) {
  const segments =
    splitMarkdown(markdown)

  const translatedSegments = []

  const translatableCount =
    segments.filter(
      (segment) =>
        segment.type === 'text' &&
        segment.value.trim()
    ).length

  let completedCount = 0

  for (const segment of segments) {
    if (
      segment.type === 'protected' ||
      !segment.value.trim()
    ) {
      translatedSegments.push(
        segment.value
      )

      continue
    }

    const translatedSegment =
      await translateProtectedText(
        segment.value,
        targetLanguage
      )

    translatedSegments.push(
      translatedSegment
    )

    completedCount += 1

    onProgress?.(
      completedCount,
      translatableCount
    )

    await sleep(REQUEST_DELAY_MS)
  }

  return translatedSegments.join('')
}

async function translateSimpleFields(
  sourcePost,
  targetPost,
  targetLanguage
) {
  const simpleFields = [
    'title',
    'excerpt',
    'category',
    'readTime',
  ]

  const pendingFields =
    simpleFields.filter(
      (field) =>
        needsTranslation(
          targetPost[field]
        )
    )

  if (pendingFields.length > 0) {
    const protectedEntries =
      pendingFields.map((field) => {
        const protectedItem =
          protectText(
            sourcePost[field] ?? ''
          )

        return {
          field,
          ...protectedItem,
        }
      })

    const translatedValues =
      await requestTranslations(
        protectedEntries.map(
          (entry) => entry.text
        ),
        targetLanguage
      )

    protectedEntries.forEach(
      (entry, index) => {
        targetPost[entry.field] =
          restoreText(
            translatedValues[index],
            entry.protectedValues
          )
      }
    )
  }

  const sourceTags =
    Array.isArray(sourcePost.tags)
      ? sourcePost.tags
      : []

  const existingTags =
    Array.isArray(targetPost.tags)
      ? targetPost.tags
      : []

  const tagsNeedTranslation =
    FORCE ||
    existingTags.length !==
      sourceTags.length ||
    existingTags.some(
      (tag) => !hasText(tag)
    )

  if (
    tagsNeedTranslation &&
    sourceTags.length > 0
  ) {
    targetPost.tags =
      await requestTranslations(
        sourceTags,
        targetLanguage
      )
  } else if (
    sourceTags.length === 0
  ) {
    targetPost.tags = []
  }
}

function getMissingFields(
  sourcePost,
  targetPost
) {
  const missingFields = []

  for (
    const field of [
      'title',
      'excerpt',
      'category',
      'readTime',
      'content',
    ]
  ) {
    if (
      FORCE ||
      !hasText(targetPost?.[field])
    ) {
      missingFields.push(field)
    }
  }

  const sourceTags =
    Array.isArray(sourcePost.tags)
      ? sourcePost.tags
      : []

  const targetTags =
    Array.isArray(targetPost?.tags)
      ? targetPost.tags
      : []

  if (
    FORCE ||
    targetTags.length !==
      sourceTags.length ||
    targetTags.some(
      (tag) => !hasText(tag)
    )
  ) {
    missingFields.push('tags')
  }

  return missingFields
}

async function processLanguage({
  langCode,
  langName,
  sourceData,
}) {
  const targetFile = path.join(
    ROOT,
    'locales',
    langCode,
    'blog-posts.json'
  )

  console.log('')
  console.log(
    `🌍 Processing ${langName} ` +
    `(${langCode})...`
  )

  const existingData =
    await readJson(targetFile, {})

  const outputData = {
    ...existingData,
  }

  const sourcePosts =
    Object.entries(sourceData)

  let missingPostCount = 0
  let missingFieldCount = 0

  for (
    const [slug, sourcePost]
    of sourcePosts
  ) {
    const targetPost =
      isPlainObject(outputData[slug])
        ? outputData[slug]
        : {}

    const missingFields =
      getMissingFields(
        sourcePost,
        targetPost
      )

    if (missingFields.length > 0) {
      missingPostCount += 1
      missingFieldCount +=
        missingFields.length
    }
  }

  console.log(
    `  Existing complete posts: ` +
    `${
      sourcePosts.length -
      missingPostCount
    }`
  )

  console.log(
    `  Posts requiring work: ` +
    `${missingPostCount}`
  )

  console.log(
    `  Missing fields: ` +
    `${missingFieldCount}`
  )

  if (missingPostCount === 0) {
    console.log(
      '  ✅ All Blog posts are already translated.'
    )

    return
  }

  if (DRY_RUN) {
    console.log(
      '  📋 Dry run — would translate:'
    )

    for (
      const [slug, sourcePost]
      of sourcePosts
    ) {
      const targetPost =
        isPlainObject(outputData[slug])
          ? outputData[slug]
          : {}

      const missingFields =
        getMissingFields(
          sourcePost,
          targetPost
        )

      if (missingFields.length > 0) {
        console.log(
          `    - ${slug}: ` +
          `${missingFields.join(', ')}`
        )
      }
    }

    return
  }

  let completedPosts = 0

  for (
    const [slug, sourcePost]
    of sourcePosts
  ) {
    const targetPost =
      isPlainObject(outputData[slug])
        ? {
            ...outputData[slug],
          }
        : {}

    const missingFields =
      getMissingFields(
        sourcePost,
        targetPost
      )

    if (missingFields.length === 0) {
      continue
    }

    console.log('')
    console.log(
      `  📝 Translating: ${slug}`
    )

    await translateSimpleFields(
      sourcePost,
      targetPost,
      langCode
    )

    if (
      FORCE ||
      !hasText(targetPost.content)
    ) {
      targetPost.content =
        await translateMarkdown(
          sourcePost.content ?? '',
          langCode,
          (completed, total) => {
            console.log(
              `    Article blocks: ` +
              `${completed}/${total}`
            )
          }
        )
    }

    outputData[slug] = targetPost

    await writeJson(
      targetFile,
      outputData
    )

    completedPosts += 1

    console.log(
      `  ✅ Saved article ` +
      `${completedPosts}/` +
      `${missingPostCount}`
    )

    await sleep(REQUEST_DELAY_MS)
  }

  console.log(
    `  ✅ Successfully saved: ` +
    `${path.relative(
      ROOT,
      targetFile
    )}`
  )
}

async function main() {
  console.log(
    'Teravolt Blog article translation'
  )

  console.log(
    '================================='
  )

  if (
    SELECTED_LANGUAGE &&
    !TARGET_LANGUAGES[
      SELECTED_LANGUAGE
    ]
  ) {
    throw new Error(
      `Unsupported language ` +
      `"${SELECTED_LANGUAGE}". ` +
      `Supported languages: ` +
      `${Object.keys(
        TARGET_LANGUAGES
      ).join(', ')}`
    )
  }

  await loadEnvironmentVariables()

  if (
    !DRY_RUN &&
    !process.env.LANGBLY_API_KEY
  ) {
    throw new Error(
      'LANGBLY_API_KEY is missing from ' +
      '.env.local or .dev.vars.'
    )
  }

  console.log(
    '📖 Reading source file:',
    SOURCE_FILE
  )

  const sourceData =
    await readJson(SOURCE_FILE)

  if (
    !isPlainObject(sourceData) ||
    Object.keys(sourceData).length === 0
  ) {
    throw new Error(
      'locales/en/blog-posts.json ' +
      'is empty or does not contain ' +
      'a JSON object.'
    )
  }

  const sourcePosts =
    Object.entries(sourceData)

  console.log(
    `📝 Found ${sourcePosts.length} ` +
    `Blog articles`
  )

  console.log(
    `⚙️ Mode: ${
      DRY_RUN
        ? 'dry run'
        : FORCE
          ? 'force overwrite'
          : 'missing only'
    }`
  )

  const languagesToProcess =
    SELECTED_LANGUAGE
      ? [
          [
            SELECTED_LANGUAGE,
            TARGET_LANGUAGES[
              SELECTED_LANGUAGE
            ],
          ],
        ]
      : Object.entries(
          TARGET_LANGUAGES
        )

  for (
    const [langCode, langName]
    of languagesToProcess
  ) {
    await processLanguage({
      langCode,
      langName,
      sourceData,
    })
  }

  console.log('')

  if (DRY_RUN) {
    console.log(
      '✅ Dry run completed. ' +
      'No API requests were made and ' +
      'no locale files were changed.'
    )
  } else {
    console.log(
      '✨ Blog article translation ' +
      'completed successfully!'
    )
  }
}

main().catch((error) => {
  console.error('')
  console.error(
    '❌ Translation failed:'
  )
  console.error(error.message)
  process.exitCode = 1
})