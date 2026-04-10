import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { systemPrompt } from "@/lib/system-prompt";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// In-memory rate limiter: max 20 requests per IP per 10 minutes
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 10 * 60 * 1000;

function getIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT) return false;

  entry.count++;
  return true;
}

// Prune stale entries periodically to avoid memory growth
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap) {
    if (now > entry.resetAt) rateLimitMap.delete(ip);
  }
}, RATE_WINDOW_MS);

export async function POST(req: NextRequest) {
  const ip = getIp(req);

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a few minutes and try again." },
      { status: 429 }
    );
  }

  try {
    const { message, history } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    if (message.length > 2000) {
      return NextResponse.json({ error: "Message too long." }, { status: 400 });
    }

    // Build conversation history for multi-turn (cap at 10 turns to limit tokens)
    const messages: Anthropic.MessageParam[] = [];
    if (Array.isArray(history)) {
      const recent = history.slice(-10);
      for (const turn of recent) {
        if (
          (turn.role === "user" || turn.role === "assistant") &&
          typeof turn.content === "string" &&
          turn.content.length <= 4000
        ) {
          messages.push({ role: turn.role, content: turn.content });
        }
      }
    }
    messages.push({ role: "user", content: message });

    const response = await client.messages.create({
      model: process.env.ANTHROPIC_MODEL ?? "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: systemPrompt,
      messages,
    });

    const reply =
      response.content[0].type === "text" ? response.content[0].text : "";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      {
        error:
          "Something went wrong. Please try again or call us at (786) 223-7867.",
      },
      { status: 500 }
    );
  }
}
