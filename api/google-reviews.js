/**
 * Google Places API (New) — Place Details reviews.
 * Vercel: place this file in the project root that Vercel uses (often repo root).
 * If your Vercel "Root Directory" is `cra`, copy to `cra/api/google-reviews.js` instead.
 *
 * Env (Vercel → Settings → Environment Variables):
 *   GOOGLE_PLACES_API_KEY — Maps Platform key with Places API (New) enabled
 *   GOOGLE_PLACE_ID — e.g. ChIJ... (from Google Maps place details / Business Profile)
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
      message: !key
        ? 'Set GOOGLE_PLACES_API_KEY in Vercel → Environment Variables (Production).'
        : 'Set GOOGLE_PLACE_ID in Vercel → Environment Variables (Production). Use the Place ID (e.g. ChIJ...) from Google Maps / Business Profile.',
      missing: {
        GOOGLE_PLACES_API_KEY: !key,
        GOOGLE_PLACE_ID: !placeId,
      },
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
        // Include place-level rating/count so the homepage can show header stats.
        'X-Goog-FieldMask':
          'rating,userRatingCount,reviews,attributions,googleMapsUri',
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
    const placeRating =
      typeof data.rating === 'number' ? data.rating : null;
    const totalReviews =
      typeof data.userRatingCount === 'number' ? data.userRatingCount : raw.length;

    const reviews = raw
      .map(function (rev) {
        const t =
          (rev.text && rev.text.text) ||
          (rev.originalText && rev.originalText.text) ||
          '';
        const author =
          (rev.authorAttribution && rev.authorAttribution.displayName) ||
          'Google reviewer';
        const photoUri =
          rev.authorAttribution && rev.authorAttribution.photoUri
            ? String(rev.authorAttribution.photoUri)
            : '';
        const timeLabel =
          typeof rev.relativePublishTimeDescription === 'string'
            ? rev.relativePublishTimeDescription
            : '';
        return {
          rating: rev.rating,
          // Frontend expects `text` (see index.html createReviewCard).
          text: t,
          quote: t,
          author,
          photo: photoUri,
          time: timeLabel,
          claimType: '',
          googleMapsUri: rev.googleMapsUri || '',
        };
      })
      .filter(function (x) {
        return String(x.text || '').trim().length > 0;
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
    const ratingForHeader =
      placeRating != null
        ? placeRating
        : reviews.length
          ? reviews.reduce((s, rv) => s + (Number(rv.rating) || 0), 0) /
            reviews.length
          : 0;

    return res.status(200).json({
      source: 'google',
      rating: Math.round(ratingForHeader * 10) / 10,
      total: totalReviews,
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
