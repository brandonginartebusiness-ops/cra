export interface LeadSmsInput {
  full_name: string;
  phone: string;
  email: string;
  help_type: string;
  service_page: string;
  message?: string | null;
}

const HELP_TYPE_LABELS: Record<string, string> = {
  denied: "Claim denied",
  underpaid: "Claim underpaid",
  new_claim: "New claim",
  protect: "Wants protection",
  appraisal: "Appraisal services",
  other: "Other",
};

function normalizePhoneE164(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return `+${digits}`;
}

function firstName(full: string): string {
  const trimmed = full.trim();
  if (!trimmed) return "there";
  const idx = trimmed.indexOf(" ");
  return idx === -1 ? trimmed : trimmed.slice(0, idx);
}

async function twilioSend(
  accountSid: string,
  authToken: string,
  from: string,
  to: string,
  body: string,
  tag: string
): Promise<void> {
  const params = new URLSearchParams();
  params.append("To", to);
  params.append("From", from);
  params.append("Body", body);

  const basic = Buffer.from(`${accountSid}:${authToken}`).toString("base64");
  const res = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    }
  );

  if (!res.ok) {
    console.error(`[twilio:${tag}] send failed`, res.status);
    return;
  }
  console.info(`[twilio:${tag}] sent`, { status: res.status });
}

export async function sendLeadSms(lead: LeadSmsInput): Promise<void> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_FROM_NUMBER;
  const notificationNumber = process.env.TWILIO_NOTIFICATION_NUMBER;

  if (!accountSid || !authToken || !fromNumber) {
    console.warn("[twilio] skipped — credentials not configured");
    return;
  }

  const leadPhoneE164 = normalizePhoneE164(lead.phone);
  const leadFirst = firstName(lead.full_name);
  const helpLabel = HELP_TYPE_LABELS[lead.help_type] ?? lead.help_type;

  const tasks: Array<Promise<void>> = [];

  if (leadPhoneE164) {
    const leadMessage = `Hi ${leadFirst}, this is Claim Remedy Adjusters. We got your claim info and Brandon will call you within the hour. Reply STOP to opt out. Msg & data rates may apply.`;
    tasks.push(
      twilioSend(accountSid, authToken, fromNumber, leadPhoneE164, leadMessage, "lead").catch(
        (err) => {
          console.error("[twilio:lead] unexpected error", err instanceof Error ? err.message : "unknown");
        }
      )
    );
  }

  if (notificationNumber) {
    const notifyBody = [
      `New lead — ${lead.full_name}`,
      `Phone: ${lead.phone}`,
      `Email: ${lead.email}`,
      `Type: ${helpLabel}`,
      `Page: ${lead.service_page}`,
      lead.message ? `Message: ${lead.message}` : null,
    ]
      .filter(Boolean)
      .join("\n");
    tasks.push(
      twilioSend(
        accountSid,
        authToken,
        fromNumber,
        notificationNumber,
        notifyBody,
        "notify"
      ).catch((err) => {
        console.error("[twilio:notify] unexpected error", err instanceof Error ? err.message : "unknown");
      })
    );
  }

  await Promise.allSettled(tasks);
}
