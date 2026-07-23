TERAVOLT WEBSITE TRANSLATION GUIDE
===================================

This guide explains how multilingual content is managed, translated, tested, and deployed on the Teravolt website.

SUPPORTED LANGUAGES
-------------------

en - English
fr - French
pt - Portuguese
es - Spanish
de - German
it - Italian
nl - Dutch
sw - Swahili
zh - Chinese

English is the source language. Add or update English content first, then run the relevant translation script.


HOW LANGBLY IS USED
--------------------

Langbly is used only at the development/content-generation level.

Workflow:

English source content
    -> Local translation script
    -> Langbly API
    -> Translated locale JSON files
    -> Commit JSON files to Git
    -> Deploy the website
    -> Production reads the committed JSON files

The production website does not call Langbly when visitors open pages or switch languages. It loads translations already saved under the locales directory.

The production deployment does NOT need LANGBLY_API_KEY as long as:

1. Translation scripts are run locally.
2. Generated locale JSON files are committed to Git.
3. The deployment build does not run translation scripts.
4. No application component or API route calls Langbly at runtime.

Production would need the key only if translation scripts were run during deployment, or if a future production API route translated content on demand.

Never use NEXT_PUBLIC_LANGBLY_API_KEY. Variables beginning with NEXT_PUBLIC_ can be exposed to browser code.


ENVIRONMENT CONFIGURATION
-------------------------

The translation scripts read the Langbly API key from either:

.env.local
.dev.vars

Add:

LANGBLY_API_KEY=your_real_api_key_here

Ensure these files are ignored by Git:

.env.local
.dev.vars

Never commit the real API key.


TRANSLATION DIRECTORY STRUCTURE
-------------------------------

locales/
|-- en/
|   |-- home.json
|   |-- common.json
|   |-- services.json
|   |-- blog.json
|   |-- blog-posts.json
|   `-- portfolio.json
|-- fr/
|-- pt/
|-- es/
|-- de/
|-- it/
|-- nl/
|-- sw/
`-- zh/

Every target language directory follows the same structure as the English directory.


TRANSLATION NAMESPACES
----------------------

Namespaces are registered in lib/i18n.js.

home       - Homepage content
common     - Shared labels and reusable interface text
services   - Services, process steps, categories, and case studies
blog       - Blog interface labels
blogPosts  - Full Blog article content
portfolio  - Portfolio interface and project content


AVAILABLE SCRIPTS
-----------------

scripts/
|-- export-blog-posts.mjs
|-- export-portfolio.mjs
|-- translate-blog-posts.mjs
|-- translate-blog.mjs
|-- translate-common.mjs
|-- translate-home.mjs
|-- translate-portfolio.mjs
`-- translate-services.mjs


COMMON SCRIPT OPTIONS
---------------------

Translate missing content only:

node scripts/translate-home.mjs

Dry run without API calls or file changes:

node scripts/translate-home.mjs --dry-run

Translate one language:

node scripts/translate-home.mjs --language=sw

Force overwrite every target value:

node scripts/translate-home.mjs --force

WARNING: Avoid --force during normal work because it overwrites existing and manually reviewed translations.

Recommended pattern:

1. Run --dry-run.
2. Test one language.
3. Translate all languages.
4. Run --dry-run again.


HOMEPAGE WORKFLOW
-----------------

English source:

locales/en/home.json

Steps:

1. Add or update English content in locales/en/home.json.
2. Run:

node scripts/translate-home.mjs --dry-run
node scripts/translate-home.mjs
node scripts/translate-home.mjs --dry-run

3. Review and commit the generated files.


COMMON LABELS WORKFLOW
----------------------

English source:

locales/en/common.json

Use common.json for shared labels such as:

Back to Home
Categories
Open navigation
Close navigation
View Details
Case Studies
Our Process

Steps:

node scripts/translate-common.mjs --dry-run
node scripts/translate-common.mjs
node scripts/translate-common.mjs --dry-run

Component usage:

const { t } = useTranslation('common')

For components using multiple namespaces:

const { t } = useTranslation([
  'common',
  'services',
])

Specify the namespace where necessary:

{t('categories_count', {
  ns: 'common',
})}


SERVICES WORKFLOW
-----------------

Service structure:

lib/servicesData.js

English service text:

locales/en/services.json

servicesData.js stores translation keys such as:

titleKey: 'web_dev_title'
descriptionKey: 'web_dev_desc'

The matching English values must exist in services.json:

{
  "web_dev_title": "Web Development",
  "web_dev_desc": "We build fast and scalable websites."
}

When adding a service:

1. Add the structural service object to lib/servicesData.js.
2. Add every new English key to locales/en/services.json.
3. Run:

node scripts/translate-services.mjs --dry-run
node scripts/translate-services.mjs --language=sw
node scripts/translate-services.mjs
node scripts/translate-services.mjs --dry-run


BLOG INTERFACE WORKFLOW
-----------------------

English source:

locales/en/blog.json

This file contains labels around articles, for example:

Read More
Featured
Read Article
All Articles
Back to Blog
Related Articles

Steps:

1. Add or update the English key in locales/en/blog.json.
2. Run:

node scripts/translate-blog.mjs --dry-run
node scripts/translate-blog.mjs
node scripts/translate-blog.mjs --dry-run

Component usage:

const { t } = useTranslation('blog')

<span>{t('card.read_more')}</span>


BLOG ARTICLE WORKFLOW
---------------------

Blog source content:

lib/blogData.js

Generated English locale content:

locales/en/blog-posts.json

When adding a new Blog article:

1. Add the complete English article to lib/blogData.js.
2. Give it a unique and permanent slug.
3. Export the source content:

node scripts/export-blog-posts.mjs

4. Check missing translations:

node scripts/translate-blog-posts.mjs --dry-run

5. Test one language:

node scripts/translate-blog-posts.mjs --language=sw

6. Translate all remaining languages:

node scripts/translate-blog-posts.mjs

7. Verify completion:

node scripts/translate-blog-posts.mjs --dry-run

The Blog translator protects fenced code blocks, inline code, URLs, Markdown links, Markdown images, HTML elements, and placeholders. It saves after each completed article, so completed work remains available if a later article fails.

UPDATING AN EXISTING BLOG ARTICLE

The translator uses missing-only mode. A non-empty existing translation is preserved even when the English source changes.

To retranslate one changed article:

1. Update the article in lib/blogData.js.
2. Run node scripts/export-blog-posts.mjs.
3. Delete the matching article object from the target blog-posts.json files, or clear only the fields that changed.
4. Run node scripts/translate-blog-posts.mjs.

Example: if only the excerpt changed, set the target excerpt to an empty string. The translator will refill only that missing field.

Avoid --force unless every Blog translation should be regenerated.


PORTFOLIO WORKFLOW
------------------

Portfolio source content:

lib/projectsData.js

Generated English locale content:

locales/en/portfolio.json

When adding a new Portfolio project:

1. Add the complete project to lib/projectsData.js.
2. Give it a unique and permanent slug.
3. Export the source content:

node scripts/export-portfolio.mjs

4. Check missing translations:

node scripts/translate-portfolio.mjs --dry-run

5. Test one language:

node scripts/translate-portfolio.mjs --language=sw

6. Translate all remaining languages:

node scripts/translate-portfolio.mjs

7. Verify completion:

node scripts/translate-portfolio.mjs --dry-run

UPDATING AN EXISTING PORTFOLIO PROJECT

1. Update the project in lib/projectsData.js.
2. Run node scripts/export-portfolio.mjs.
3. Clear the changed target field or remove the affected project object from each target portfolio.json.
4. Run node scripts/translate-portfolio.mjs.

Existing non-empty target values are preserved.


EXPORT SCRIPT WARNING
---------------------

The export scripts regenerate English locale content from JavaScript source data:

export-blog-posts.mjs
export-portfolio.mjs

Before exporting, commit or back up current changes:

git add .
git commit -m "Back up translations before content export"

After exporting, inspect changes:

git diff -- "locales/en/blog-posts.json"
git diff -- "locales/en/portfolio.json"

Confirm that only intended English source content changed.


PLACEHOLDERS
------------

Some translations contain placeholders:

{{count}}
{{number}}
{{title}}

Do not translate or rename the text inside double braces.

Correct:

{{count}}

Incorrect:

{{hesabu}}

Only the surrounding sentence should be translated.


USING TRANSLATIONS IN COMPONENTS
--------------------------------

Homepage:

const { t } = useTranslation('home')

Common:

const { t } = useTranslation('common')

Services:

const { t } = useTranslation([
  'services',
  'common',
])

{t(service.titleKey, {
  ns: 'services',
})}

Blog:

const { t } = useTranslation('blog')
const blogPosts = useLocalizedBlogPosts()

Portfolio:

const { t } = useTranslation('portfolio')
const projects = useLocalizedProjects()


REACT HOOK RULE
---------------

Hooks must be called inside React components or other hooks.

Incorrect:

import useLocalizedProjects from '@/hooks/useLocalizedProjects'

const projects = useLocalizedProjects()

export default function PortfolioPage() {
  return null
}

Correct:

import useLocalizedProjects from '@/hooks/useLocalizedProjects'

export default function PortfolioPage() {
  const projects = useLocalizedProjects()
  return null
}

This rule applies to:

useTranslation
useLocalizedBlogPosts
useLocalizedProjects
useState
useEffect


QUICK COMMAND REFERENCE
-----------------------

Homepage:

node scripts/translate-home.mjs --dry-run
node scripts/translate-home.mjs
node scripts/translate-home.mjs --dry-run

Common labels:

node scripts/translate-common.mjs --dry-run
node scripts/translate-common.mjs
node scripts/translate-common.mjs --dry-run

Services:

node scripts/translate-services.mjs --dry-run
node scripts/translate-services.mjs
node scripts/translate-services.mjs --dry-run

Blog interface:

node scripts/translate-blog.mjs --dry-run
node scripts/translate-blog.mjs
node scripts/translate-blog.mjs --dry-run

Blog articles:

node scripts/export-blog-posts.mjs
node scripts/translate-blog-posts.mjs --dry-run
node scripts/translate-blog-posts.mjs
node scripts/translate-blog-posts.mjs --dry-run

Portfolio:

node scripts/export-portfolio.mjs
node scripts/translate-portfolio.mjs --dry-run
node scripts/translate-portfolio.mjs
node scripts/translate-portfolio.mjs --dry-run


VALIDATION
----------

Check script syntax:

Get-ChildItem -Path "scripts" -Filter "*.mjs" |
  ForEach-Object {
    node --check $_.FullName
  }

No output means syntax validation passed.

Validate locale JSON:

Get-ChildItem -Path "locales" -Filter "*.json" -Recurse |
  ForEach-Object {
    try {
      $null = Get-Content `
        -LiteralPath $_.FullName `
        -Raw `
        -Encoding UTF8 |
        ConvertFrom-Json

      Write-Host "VALID: $($_.FullName)" -ForegroundColor Green
    }
    catch {
      Write-Host "INVALID: $($_.FullName)" -ForegroundColor Red
      Write-Host $_.Exception.Message
    }
  }

Run lint:

npm run lint

Run a production build:

npm run build

Restart development mode after locale changes:

Remove-Item -Recurse -Force ".next" -ErrorAction SilentlyContinue
npm run dev


PRODUCTION DEPLOYMENT
---------------------

Commit generated locale files:

git add locales scripts
git commit -m "Update multilingual content"
git push

The deployment platform builds the website from the committed JSON files.

The recommended production build command is:

npm run build

The production deployment does not need LANGBLY_API_KEY unless the deployment pipeline runs translation scripts.

Do not configure the production build to run commands such as:

node scripts/translate-home.mjs
node scripts/translate-blog-posts.mjs
node scripts/translate-portfolio.mjs

Translations should be generated locally, reviewed, committed, and deployed.


PRODUCTION SECURITY CHECKLIST
-----------------------------

- LANGBLY_API_KEY is not prefixed with NEXT_PUBLIC_.
- .env.local is ignored by Git.
- .dev.vars is ignored by Git.
- No React component imports a translation script.
- No production API route calls Langbly.
- Generated locale files are committed.
- The production build does not run translation scripts.
- npm run build succeeds without a Langbly key.
- Language switching works after deployment.


FINAL BROWSER TEST
------------------

Test at least:

English
Swahili
French
Chinese

Test these routes:

/
/services
/services/[slug]
/blog
/blog/[slug]
/portfolio
/portfolio/[slug]

Confirm:

- No raw translation keys are visible.
- Language changes happen immediately.
- URLs and slugs remain unchanged.
- Images load correctly.
- Blog Markdown renders correctly.
- Code blocks remain unchanged.
- Portfolio filters work.
- Related articles and projects translate.
- Navigation labels translate.
- Placeholders remain intact.


TROUBLESHOOTING
---------------

RAW TRANSLATION KEY APPEARS

Examples:

graphics_title
listing.title
card.read_more

Possible causes:

1. The key is missing from the English locale.
2. The target locale has not been translated.
3. The component is using the wrong namespace.
4. The namespace is not registered in lib/i18n.js.
5. Next.js needs to be restarted.

Run the relevant dry check and verify the component namespace.

NEW ENGLISH CONTENT IS NOT RETRANSLATED

The scripts preserve non-empty target values. Clear the changed target value or remove the affected object, then rerun the translator.

BLOG TRANSLATION STOPS

Do not delete completed articles and do not use --force. Correct the protection issue and run the same language command again. The script resumes because completed articles are already saved.


FINAL WORKFLOW SUMMARY
----------------------

1. Add or update English content.
2. Export if the content comes from a JavaScript data file.
3. Run the relevant translator with --dry-run.
4. Test one language.
5. Translate all languages.
6. Run --dry-run again.
7. Review generated JSON.
8. Run lint and build.
9. Commit locale JSON files.
10. Deploy.

Export is required for:

Blog articles:
lib/blogData.js
-> export-blog-posts.mjs
-> locales/en/blog-posts.json
-> translate-blog-posts.mjs

Portfolio:
lib/projectsData.js
-> export-portfolio.mjs
-> locales/en/portfolio.json
-> translate-portfolio.mjs

Export is not required for:

home.json
common.json
services.json
blog.json

For those files, edit the English JSON source directly and run the matching translator.
