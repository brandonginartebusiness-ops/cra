import { createHash } from "crypto";

export interface CapiLeadInput {
  full_name: string;
  email: string;
  phone: string;
  city?: string;
  state?: string;
  zip?: string;
}

export interface SendMetaCapiArgs {
  eventId: string;
  eventSourceUrl: string;
  clientIp: string | null;
  userAgent: string | null;
  fbc: string | null;
  fbp: string | null;
  lead: CapiLeadInput;
}

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function hashLower(value: string | undefined | null): string | null {
  if (!value) return null;
  const normalized = value.trim().toLowerCase();
  if (!normalized) return null;
  return sha256(normalized);
}

function hashCity(value: string | undefined | null): string | null {
  if (!value) return null;
  const normalized = value.trim().toLowerCase().replace(/\s/g, "");
  if (!normalized) return null;
  return sha256(normalized);
}

function hashZip(value: string | undefined | null): string | null {
  if (!value) return null;
  const normalized = value.trim();
  if (!normalized) return null;
  return sha256(normalized);
}

function normalizePhoneE164(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return `+${digits}`;
}

function splitName(full: string): { first: string; last: string } {
  const trimmed = full.trim();
  if (!trimmed) return { first: "", last: "" };
  const idx = trimmed.indexOf(" ");
  if (idx === -1) return { first: trimmed, last: "" };
  return {
    first: trimmed.slice(0, idx),
    last: trimmed.slice(idx + 1).trim(),
  };
}

type UserDataPayload = Record<string, string | string[]>;

function buildUserData(args: SendMetaCapiArgs): UserDataPayload {
  const { lead } = args;
  const { first, last } = splitName(lead.full_name);
  const phoneE164 = normalizePhoneE164(lead.phone);

  const userData: UserDataPayload = {};
  const em = hashLower(lead.email);
  if (em) userData.em = [em];
  const ph = phoneE164 ? sha256(phoneE164) : null;
  if (ph) userData.ph = [ph];
  const fn = hashLower(first);
  if (fn) userData.fn = [fn];
  const ln = hashLower(last);
  if (ln) userData.ln = [ln];
  const ct = hashCity(lead.city);
  if (ct) userData.ct = [ct];
  const st = hashLower(lead.state);
  if (st) userData.st = [st];
  const zp = hashZip(lead.zip);
  if (zp) userData.zp = [zp];
  userData.country = [sha256("us")];

  if (args.clientIp) userData.client_ip_address = args.clientIp;
  if (args.userAgent) userData.client_user_agent = args.userAgent;
  if (args.fbc) userData.fbc = args.fbc;
  if (args.fbp) userData.fbp = args.fbp;

  return userData;
}

export async function sendMetaCapiLead(args: SendMetaCapiArgs): Promise<void> {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;

  if (!pixelId || !accessToken) {
    console.warn("[capi] skipped — Meta pixel id or access token not configured");
    return;
  }

  const payload = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: args.eventId,
        action_source: "website",
        event_source_url: args.eventSourceUrl,
        user_data: buildUserData(args),
        custom_data: { currency: "USD", value: 0 },
      },
    ],
  };

  try {
    const res = await fetch(
      `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${accessToken}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      console.error("[capi] send failed", res.status);
      return;
    }

    console.info("[capi] lead sent", { ok: true, status: res.status });
  } catch (err) {
    console.error("[capi] send error", err instanceof Error ? err.message : "unknown");
  }
}
