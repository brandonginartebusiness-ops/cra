/**
 * Sanity check that Vercel is running Node functions and env is wired (no secret values).
 */
export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "method_not_allowed" });
  }

  return res.status(200).json({
    ok: true,
    node: process.version,
    env: {
      anthropicKey: Boolean(process.env.ANTHROPIC_API_KEY),
      googlePlacesKey: Boolean(process.env.GOOGLE_PLACES_API_KEY),
      googlePlaceId: Boolean((process.env.GOOGLE_PLACE_ID || "").trim()),
    },
  });
}
