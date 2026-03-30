/**
 * Duplicate of /api/google-reviews.js at repo root — use when Vercel "Root Directory" is `cra`.
 * Keep both files in sync, or delete one and adjust Vercel root.
 *
 * Env: GOOGLE_PLACES_API_KEY, GOOGLE_PLACE_ID
 */

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Accept');
    return res.status(204).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  const key = process.env.GOOGLE_PLACES_API_KEY;
  let placeId = (process.env.GOOGLE_PLACE_ID || '').trim();
  if (placeId.indexOf('places/') === 0) {
    placeId = placeId.slice('places/'.length).trim();
  }

  if (!key || !placeId) {
    return res.status(503).json({
      error: 'not_configured',
      message:
        'Set GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID in the deployment environment.',
    });
  }

  const url =
    'https://places.googleapis.com/v1/places/' +
    encodeURIComponent(placeId) +
    '?languageCode=en';

  try {
    const r = await fetch(url, {
      headers: {
        'X-Goog-Api-Key': key,
        'X-Goog-FieldMask': 'reviews,attributions,googleMapsUri',
      },
    });

    const text = await r.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return res.status(502).json({
        error: 'invalid_response',
        detail: text.slice(0, 200),
      });
    }

    if (!r.ok) {
      return res.status(r.status).json({
        error: 'places_api',
        detail: data.error || text.slice(0, 400),
      });
    }

    const raw = data.reviews || [];
    const reviews = raw
      .map(function (rev) {
        const t =
          (rev.text && rev.text.text) ||
          (rev.originalText && rev.originalText.text) ||
          '';
        return {
          rating: rev.rating,
          quote: t,
          author:
            (rev.authorAttribution && rev.authorAttribution.displayName) ||
            'Google reviewer',
          claimType: '',
          googleMapsUri: rev.googleMapsUri || '',
        };
      })
      .filter(function (x) {
        return String(x.quote || '').trim().length > 0;
      });

    const attributions = (data.attributions || []).map(function (a) {
      return {
        provider: a.provider || '',
        providerUri: a.providerUri || '',
      };
    });

    res.setHeader(
      'Cache-Control',
      'public, s-maxage=3600, stale-while-revalidate=86400'
    );
    return res.status(200).json({
      source: 'google',
      reviews,
      attributions,
      googleMapsUri: data.googleMapsUri || '',
      updated: new Date().toISOString(),
    });
  } catch (e) {
    return res.status(500).json({
      error: 'server',
      message: e && e.message ? String(e.message) : 'unknown',
    });
  }
}
