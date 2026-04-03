// api/chat.js — Vercel Serverless Function
// Deploy this file at the root of your Vercel project under /api/chat.js

const Anthropic = require("@anthropic-ai/sdk");

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

module.exports = async function handler(req, res) {
  // CORS headers — update the origin to your actual domain
  res.setHeader("Access-Control-Allow-Origin", "https://claimremedyadjusters.com");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { systemPrompt } = await import("../system-prompt.js");
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required" });
    }

    // Stateless: no server-side conversation history stored.
    const response = await client.messages.create({
      model: process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6",
      max_tokens: 1024,
      system: systemPrompt,
      messages: [{ role: "user", content: message }],
    });

    const reply = response.content[0].text;

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return res.status(500).json({
      error: "Something went wrong. Please try again or call us at (786) 223-7867.",
    });
  }
};
