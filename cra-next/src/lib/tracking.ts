export interface LeadUserData {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  state?: string;
  zip?: string;
}

export interface TrackLeadArgs extends LeadUserData {
  eventId: string;
}

function bytesToHex(buf: ArrayBuffer): string {
  const view = new Uint8Array(buf);
  let out = "";
  for (let i = 0; i < view.length; i++) {
    out += view[i].toString(16).padStart(2, "0");
  }
  return out;
}

export async function hashSha256(value: string): Promise<string> {
  if (typeof window === "undefined" || !window.crypto?.subtle) return "";
  const normalized = value.trim().toLowerCase();
  if (!normalized) return "";
  const encoded = new TextEncoder().encode(normalized);
  const digest = await window.crypto.subtle.digest("SHA-256", encoded);
  return bytesToHex(digest);
}

export function normalizePhoneE164(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return `+${digits}`;
}

export async function trackLead(args: TrackLeadArgs): Promise<string> {
  const { eventId, email, phone, firstName, lastName, city, state, zip } = args;

  try {
    if (typeof window === "undefined") return eventId;

    const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID;
    const googleAdsLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL;

    if (window.fbq) {
      window.fbq(
        "track",
        "Lead",
        { currency: "USD", value: 0 },
        { eventID: eventId }
      );
    }

    if (window.gtag && googleAdsId && googleAdsLabel) {
      window.gtag("event", "conversion", {
        send_to: `${googleAdsId}/${googleAdsLabel}`,
        transaction_id: eventId,
      });
    }

    if (window.ttq) {
      window.ttq.track("SubmitForm", { event_id: eventId });
    }

    // Fire hashed user_data to TikTok identify (optional — Meta covers via CAPI).
    if (window.ttq && (email || phone)) {
      const [hashedEmail, hashedPhone] = await Promise.all([
        email ? hashSha256(email) : Promise.resolve(""),
        phone ? hashSha256(normalizePhoneE164(phone)) : Promise.resolve(""),
      ]);
      const identifyPayload: Record<string, string> = {};
      if (hashedEmail) identifyPayload.email = hashedEmail;
      if (hashedPhone) identifyPayload.phone_number = hashedPhone;
      if (Object.keys(identifyPayload).length > 0) {
        window.ttq.identify(identifyPayload);
      }
    }

    // Reference unused vars to satisfy strict TS without leaking PII.
    void firstName;
    void lastName;
    void city;
    void state;
    void zip;
  } catch {
    // Never throw from tracking.
  }

  return eventId;
}

export function trackPageView(url?: string): void {
  try {
    if (typeof window === "undefined") return;
    if (window.fbq) window.fbq("track", "PageView");
    if (window.gtag) {
      window.gtag("event", "page_view", url ? { page_path: url } : {});
    }
    if (window.ttq) window.ttq.page();
  } catch {
    // swallow
  }
}

export function trackEvent(
  name: string,
  params?: Record<string, unknown>
): void {
  try {
    if (typeof window === "undefined") return;
    if (window.gtag) window.gtag("event", name, params ?? {});
  } catch {
    // swallow
  }
}
