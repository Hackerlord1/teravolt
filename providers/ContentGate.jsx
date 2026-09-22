/**
 * Wraps the translated page content. Both of its jobs live in globals.css:
 *
 * 1. Visitors who saved a non-English language get `data-i18n-pending` on
 *    <html> from the inline script in app/layout.js, before first paint.
 *    The content stays hidden until I18nProvider has applied that language
 *    and removes the attribute, so they never see a flash of English.
 *    Everyone else sees the server-rendered page straight away instead of
 *    waiting for all the JavaScript to hydrate. The navbar is deliberately
 *    rendered OUTSIDE this gate — it must appear with the first paint.
 *
 * 2. It clips horizontal overflow so decorations that poke past the screen
 *    edge can't widen the page — on phones that widened the fixed header
 *    too, and it visibly shrank back ("slid") once the hero console panel
 *    animated into place.
 */
export default function ContentGate({ children }) {
  return <div className="content-gate">{children}</div>
}
