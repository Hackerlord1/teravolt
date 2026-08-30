// Returns the visitor's country code so the client can pick a display currency.
// Uses Cloudflare's edge-provided `cf-ipcountry` header — no third-party API,
// no API token in the browser bundle.
export const dynamic = 'force-dynamic'

export async function GET(req) {
  const country =
    req.headers.get('cf-ipcountry') ||
    req.headers.get('x-vercel-ip-country') ||
    ''

  const normalized = /^[A-Z]{2}$/.test(country) ? country : null

  return Response.json(
    { country: normalized },
    {
      headers: {
        // Per-visitor value — let the CDN cache it briefly at the edge only.
        'Cache-Control': 'private, max-age=3600',
      },
    }
  )
}
