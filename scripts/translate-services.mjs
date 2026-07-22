import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

const ROOT = process.cwd()

const SOURCE_FILE = path.join(
  ROOT,
  'locales',
  'en',
  'services.json'
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

const BATCH_SIZE = 25
const MAX_RETRIES = 3
const REQUEST_DELAY_MS = 500

/*
 * Available commands:
 *
 * node scripts/translate-home.mjs
 * Translates missing values for every target language.
 *
 * node scripts/translate-home.mjs --force
 * Retranslates and overwrites every target value.
 *
 * node scripts/translate-home.mjs --language=sw
 * Translates only Swahili.
 *
 * node scripts/translate-home.mjs --dry-run
 * Shows what would be translated without calling Langbly.
 */

const args = process.argv.slice(2)

const FORCE = args.includes('--force')
const DRY_RUN = args.includes('--dry-run')

const languageArgument = args.find((argument) =>
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
          (value.startsWith('"') &&
            value.endsWith('"')) ||
          (value.startsWith("'") &&
            value.endsWith("'"))
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

async function readJson(filePath, fallback = {}) {
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

async function writeJson(filePath, data) {
  await fs.mkdir(path.dirname(filePath), {
    recursive: true,
  })

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

function cloneJson(value) {
  return JSON.parse(JSON.stringify(value))
}

/*
 * Converts nested JSON strings into entries such as:
 *
 * {
 *   path: [
 *     'pricing',
 *     'plans',
 *     'basic',
 *     'features',
 *     0
 *   ],
 *   value: 'Responsive Design'
 * }
 */
function collectStringEntries(
  value,
  currentPath = [],
  entries = []
) {
  if (typeof value === 'string') {
    entries.push({
      path: currentPath,
      value,
    })

    return entries
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      collectStringEntries(
        item,
        [...currentPath, index],
        entries
      )
    })

    return entries
  }

  if (isPlainObject(value)) {
    for (
      const [key, childValue]
      of Object.entries(value)
    ) {
      collectStringEntries(
        childValue,
        [...currentPath, key],
        entries
      )
    }
  }

  return entries
}

function getValueAtPath(object, valuePath) {
  let currentValue = object

  for (const segment of valuePath) {
    if (
      currentValue === null ||
      currentValue === undefined
    ) {
      return undefined
    }

    currentValue = currentValue[segment]
  }

  return currentValue
}

function setValueAtPath(
  object,
  valuePath,
  value
) {
  let currentValue = object

  for (
    let index = 0;
    index < valuePath.length;
    index += 1
  ) {
    const segment = valuePath[index]

    const isLast =
      index === valuePath.length - 1

    if (isLast) {
      currentValue[segment] = value
      return
    }

    const nextSegment =
      valuePath[index + 1]

    const needsArray =
      typeof nextSegment === 'number'

    const existingChild =
      currentValue[segment]

    if (
      existingChild === undefined ||
      existingChild === null ||
      (
        needsArray &&
        !Array.isArray(existingChild)
      ) ||
      (
        !needsArray &&
        !isPlainObject(existingChild)
      )
    ) {
      currentValue[segment] =
        needsArray ? [] : {}
    }

    currentValue =
      currentValue[segment]
  }
}

function createEmptyStructure(value) {
  if (typeof value === 'string') {
    return ''
  }

  if (Array.isArray(value)) {
    return value.map((item) =>
      createEmptyStructure(item)
    )
  }

  if (isPlainObject(value)) {
    const result = {}

    for (
      const [key, childValue]
      of Object.entries(value)
    ) {
      result[key] =
        createEmptyStructure(childValue)
    }

    return result
  }

  return value
}

function mergeExistingStructure(
  sourceData,
  existingData
) {
  const result =
    createEmptyStructure(sourceData)

  const existingEntries =
    collectStringEntries(existingData)

  for (const entry of existingEntries) {
    setValueAtPath(
      result,
      entry.path,
      entry.value
    )
  }

  return result
}

function needsTranslation(
  sourceText,
  existingText
) {
  if (FORCE) {
    return true
  }

  if (typeof existingText !== 'string') {
    return true
  }

  return existingText.trim() === ''
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

async function requestTranslationBatch(
  entries,
  targetLanguage,
  attempt = 1
) {
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
      q: entries.map(
        (entry) => entry.value
      ),
      source: 'en',
      target: targetLanguage,
    }),
  })

  if (!response.ok) {
    const responseBody =
      await response.text()

    const error = new Error(
      `Langbly returned HTTP ` +
      `${response.status}: ${responseBody}`
    )

    error.status = response.status

    error.retryAfter =
      response.headers.get('retry-after')

    const retryable =
      response.status === 429 ||
      response.status >= 500

    if (
      retryable &&
      attempt < MAX_RETRIES
    ) {
      const retryAfterSeconds =
        Number(error.retryAfter)

      const waitTime =
        Number.isFinite(retryAfterSeconds) &&
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

      return requestTranslationBatch(
        entries,
        targetLanguage,
        attempt + 1
      )
    }

    throw error
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
    translations.length !==
    entries.length
  ) {
    throw new Error(
      `Expected ${entries.length} ` +
      `translations, but Langbly ` +
      `returned ${translations.length}.`
    )
  }

  return entries.map(
    (entry, index) => {
      const translatedText =
        translations[index]
          ?.translatedText

      if (
        typeof translatedText !== 'string'
      ) {
        throw new Error(
          `Translation ${index + 1} ` +
          `is missing translatedText.`
        )
      }

      return {
        ...entry,
        value: decodeHtmlEntities(
          translatedText
        ),
      }
    }
  )
}

async function translateEntries({
  entries,
  targetLanguage,
  outputData,
  targetFile,
}) {
  const totalBatches = Math.ceil(
    entries.length / BATCH_SIZE
  )

  let translatedCount = 0

  for (
    let index = 0;
    index < entries.length;
    index += BATCH_SIZE
  ) {
    const batchNumber =
      Math.floor(index / BATCH_SIZE) + 1

    const batch = entries.slice(
      index,
      index + BATCH_SIZE
    )

    console.log(
      `  Translating batch ` +
      `${batchNumber}/${totalBatches} ` +
      `(${batch.length} strings)...`
    )

    const translatedBatch =
      await requestTranslationBatch(
        batch,
        targetLanguage
      )

    for (
      const translatedEntry
      of translatedBatch
    ) {
      setValueAtPath(
        outputData,
        translatedEntry.path,
        translatedEntry.value
      )
    }

    /*
     * Save after each successful batch.
     * If a later request fails, completed work
     * remains available in the locale file.
     */
    await writeJson(
      targetFile,
      outputData
    )

    translatedCount +=
      translatedBatch.length

    console.log(
      `  Saved ${translatedCount}/` +
      `${entries.length} translated strings.`
    )

    if (batchNumber < totalBatches) {
      await sleep(
        REQUEST_DELAY_MS
      )
    }
  }
}

async function processLanguage({
  langCode,
  langName,
  sourceData,
  sourceEntries,
}) {
  const targetFile = path.join(
    ROOT,
    'locales',
    langCode,
    'services.json'
  )

  console.log('')
  console.log(
    `🌍 Processing ${langName} ` +
    `(${langCode})...`
  )

  const existingData = await readJson(
    targetFile,
    {}
  )

  const outputData =
    mergeExistingStructure(
      sourceData,
      existingData
    )

  const entriesToTranslate =
    sourceEntries.filter((entry) => {
      const existingValue =
        getValueAtPath(
          existingData,
          entry.path
        )

      return needsTranslation(
        entry.value,
        existingValue
      )
    })

  const existingCount =
    sourceEntries.length -
    entriesToTranslate.length

  console.log(
    `  Existing translations: ` +
    `${existingCount}`
  )

  console.log(
    `  Missing translations: ` +
    `${entriesToTranslate.length}`
  )

  if (
    entriesToTranslate.length === 0
  ) {
    /*
     * Write the normalized structure in case
     * the source structure has changed.
     */
    await writeJson(
      targetFile,
      outputData
    )

    console.log(
      '  ✅ All strings are already translated.'
    )

    return
  }

  if (DRY_RUN) {
    console.log(
      '  📋 Dry run — would translate:'
    )

    for (
      const entry
      of entriesToTranslate
    ) {
      console.log(
        `    - ${entry.path.join('.')}: ` +
        `${entry.value}`
      )
    }

    return
  }

  console.log(
    `  🔄 Translating ` +
    `${entriesToTranslate.length} strings...`
  )

  await translateEntries({
    entries: entriesToTranslate,
    targetLanguage: langCode,
    outputData,
    targetFile,
  })

  console.log(
    `  ✅ Successfully saved: ` +
    `${path.relative(ROOT, targetFile)}`
  )
}

async function main() {
  console.log(
    'Teravolt services translation'
  )

  console.log(
    '============================='
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
      'locales/en/services.json is empty ' +
      'or does not contain a JSON object.'
    )
  }

  const sourceEntries =
    collectStringEntries(sourceData)

  if (sourceEntries.length === 0) {
    throw new Error(
      'No translatable strings were found ' +
      'in locales/en/services.json.'
    )
  }

  console.log(
    `📝 Found ${sourceEntries.length} ` +
    `translatable strings`
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
      sourceEntries,
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
      '✨ Translation process ' +
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