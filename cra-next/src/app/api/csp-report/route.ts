import { NextRequest, NextResponse } from "next/server";

// Collector for Content-Security-Policy-Report-Only violations. The CSP is
// shipped in Report-Only mode (see next.config.ts) so it never blocks anything
// yet — this endpoint just records what *would* be blocked so the policy can be
// tightened and eventually enforced. Violations show up in the Vercel function
// logs for this route.
//
// Browsers post here in one of two shapes:
//   - legacy `report-uri`: { "csp-report": { "violated-directive", "blocked-uri", ... } }
//     with Content-Type application/csp-report
//   - newer Reporting API:  [ { "type": "csp-violation", "body": { ... } } ]
//     with Content-Type application/reports+json
export async function POST(req: NextRequest) {
  try {
    const raw = await req.text();
    if (!raw) return new NextResponse(null, { status: 204 });

    const parsed = JSON.parse(raw);
    const reports = Array.isArray(parsed) ? parsed : [parsed];

    for (const r of reports) {
      const body = r?.["csp-report"] ?? r?.body ?? r;
      const directive =
        body?.["violated-directive"] ?? body?.violatedDirective ?? body?.effectiveDirective ?? "unknown";
      const blocked = body?.["blocked-uri"] ?? body?.blockedURL ?? "unknown";
      const docUri = body?.["document-uri"] ?? body?.documentURL ?? "unknown";
      // One concise line per violation so it's greppable in the function logs.
      console.warn(`[csp-report] directive="${directive}" blocked="${blocked}" doc="${docUri}"`);
    }
  } catch {
    // Never let a malformed report turn into a 500 — reporting is best-effort.
  }
  return new NextResponse(null, { status: 204 });
}

// Reports are unauthenticated browser beacons; no other methods are supported.
export const dynamic = "force-dynamic";
