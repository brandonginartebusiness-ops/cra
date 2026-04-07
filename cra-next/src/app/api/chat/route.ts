import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { systemPrompt } from "@/lib/system-prompt";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Build conversation history for multi-turn
    const messages: Anthropic.MessageParam[] = [];
    if (Array.isArray(history)) {
      for (const turn of history) {
        if (turn.role === "user" || turn.role === "assistant") {
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

    const reply = response.content[0].type === "text" ? response.content[0].text : "";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again or call us at (786) 223-7867." },
      { status: 500 }
    );
  }
}
