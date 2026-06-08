import { NextRequest } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { verifyLeadToken, sendReviewRequest } from "@/lib/reviewRequest";

/**
 * GET /api/review-request?lead=<id>&t=<hmac>
 *
 * Clicked by Brandon from the lead-notification email when a claim closes.
 * Validates the signed token, then texts + emails THAT client a Google-review
 * ask. Idempotent: a lead already marked `review_requested` won't re-send.
 * Returns a small human-readable HTML page (it's opened in a browser).
 */

function page(title: string, body: string, color = "#2563eb"): Response {
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${title}</title></head>
<body style="font-family:Arial,sans-serif;background:#faf8f5;margin:0;padding:48px 20px;">
<div style="max-width:480px;margin:0 auto;background:#fff;border-radius:14px;padding:32px;
            box-shadow:0 4px 24px rgba(0,0,0,.08);text-align:center;">
  <h1 style="color:${color};font-size:22px;margin:0 0 12px;">${title}</h1>
  <div style="color:#33334a;font-size:15px;line-height:1.6;">${body}</div>
</div></body></html>`;
  return new Response(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const leadIdRaw = searchParams.get("lead");
  const token = searchParams.get("t") ?? "";

  if (!leadIdRaw || !/^\d+$/.test(leadIdRaw) || !verifyLeadToken(leadIdRaw, token)) {
    return page(
      "Invalid or expired link",
      "This review-request link isn't valid. Open the original lead email and click the button again.",
      "#b91c1c"
    );
  }

  const leadId = Number(leadIdRaw);

  const { data: lead, error } = await supabaseServer
    .from("leads")
    .select("id, full_name, phone, email, status")
    .eq("id", leadId)
    .single();

  if (error || !lead) {
    return page(
      "Lead not found",
      "We couldn't find that lead in the database. It may have been deleted.",
      "#b91c1c"
    );
  }

  if (lead.status === "review_requested") {
    return page(
      "Already sent ✓",
      `A review request was already sent to <strong>${lead.full_name || "this client"}</strong>. No second message was sent.`,
      "#0d9488"
    );
  }

  if (!lead.phone && !lead.email) {
    return page(
      "No contact info",
      "This lead has no phone or email on file, so there's no way to send a review request.",
      "#b91c1c"
    );
  }

  const result = await sendReviewRequest({
    full_name: lead.full_name ?? "",
    phone: lead.phone ?? "",
    email: lead.email ?? "",
  });

  if (!result.sms && !result.email) {
    return page(
      "Couldn't send",
      "Neither the text nor the email went through. Check that Twilio/Resend are configured, then try again.",
      "#b91c1c"
    );
  }

  // Mark the lead so a second click won't double-message the client.
  await supabaseServer
    .from("leads")
    .update({ status: "review_requested" })
    .eq("id", leadId)
    .then(({ error: updateError }) => {
      if (updateError) {
        console.error("[review-request] status update failed:", updateError.message);
      }
    });

  const channels = [result.sms ? "text" : null, result.email ? "email" : null]
    .filter(Boolean)
    .join(" + ");

  return page(
    "Review request sent ✓",
    `We sent <strong>${lead.full_name || "the client"}</strong> a Google-review request via <strong>${channels}</strong>.
     They'll get a friendly message with your review link. Thanks for keeping the review engine running!`,
    "#0d9488"
  );
}
