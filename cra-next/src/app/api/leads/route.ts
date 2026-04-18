import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServer';
import { sendMetaCapiLead } from '@/lib/metaCapi';
import { sendLeadSms } from '@/lib/twilioSms';

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function parseCookies(header: string | null): Record<string, string> {
  if (!header) return {};
  const out: Record<string, string> = {};
  for (const part of header.split(";")) {
    const idx = part.indexOf("=");
    if (idx === -1) continue;
    const name = part.slice(0, idx).trim();
    const value = part.slice(idx + 1).trim();
    if (name) out[name] = value;
  }
  return out;
}

function firstIp(header: string | null): string | null {
  if (!header) return null;
  const first = header.split(",")[0]?.trim();
  return first || null;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

const VALID_HELP_TYPES = new Set(['denied', 'underpaid', 'new_claim', 'protect', 'appraisal', 'other']);
const VALID_SERVICE_PAGES = new Set([
  // service pages
  'storm-hurricane', 'water-damage', 'fire-smoke', 'roof-claims', 'appraisal', 'contact', 'homepage',
  // city area pages
  'miami-lakes', 'hialeah', 'miami', 'doral', 'miami-gardens', 'homestead', 'kendall',
  'coral-gables', 'north-miami', 'miami-beach', 'fort-lauderdale', 'hollywood',
  'pembroke-pines', 'miramar', 'coral-springs', 'pompano-beach', 'boca-raton',
  'west-palm-beach', 'boynton-beach', 'delray-beach', 'jupiter', 'tampa',
  'st-petersburg', 'clearwater', 'sarasota', 'fort-myers', 'naples', 'orlando',
  'jacksonville', 'tallahassee', 'gainesville', 'daytona-beach', 'ocala', 'key-west',
]);

export async function POST(request: NextRequest) {
  try {
    // Payload size guard — reject anything over 32 KB
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength, 10) > 32_768) {
      return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
    }

    const body = await request.json();

    // Honeypot — bots fill hidden fields, humans don't
    if (body.website || body.company) {
      return NextResponse.json({ message: 'Lead submitted successfully' }, { status: 201 });
    }

    const { full_name, phone, email, help_type, service_page } = body;
    if (!full_name || !phone || !email || !help_type || !service_page) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Field length caps
    if (
      full_name.length > 120 ||
      phone.length > 30 ||
      email.length > 254 ||
      (body.claim_number && body.claim_number.length > 60) ||
      (body.message && body.message.length > 2000)
    ) {
      return NextResponse.json({ error: 'Field value too long' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Allowlist enum fields to prevent junk data
    if (!VALID_HELP_TYPES.has(help_type)) {
      return NextResponse.json({ error: 'Invalid help_type' }, { status: 400 });
    }
    if (!VALID_SERVICE_PAGES.has(service_page)) {
      return NextResponse.json({ error: 'Invalid service_page' }, { status: 400 });
    }

    const payload = {
      full_name: body.full_name,
      phone: body.phone,
      email: body.email,
      claim_number: body.claim_number || null,
      help_type: body.help_type,
      message: body.message || null,
      service_page: body.service_page,
      status: 'new',
    };

    const { error } = await supabaseServer.from('leads').insert([payload]);

    if (error) {
      console.error('Supabase insert error:', error.code, error.message);
      return NextResponse.json(
        { error: 'Failed to submit lead' },
        { status: 500 }
      );
    }

    // Side-effects (email + Meta CAPI) — non-blocking, must never fail the response
    const eventId =
      typeof body.event_id === 'string' && UUID_REGEX.test(body.event_id)
        ? body.event_id
        : null;

    const cookies = parseCookies(request.headers.get('cookie'));
    const clientIp =
      firstIp(request.headers.get('x-forwarded-for')) ??
      request.headers.get('x-real-ip');
    const userAgent = request.headers.get('user-agent');
    const referer = request.headers.get('referer');
    const origin = request.headers.get('origin');
    const eventSourceUrl =
      referer ||
      (origin ? `${origin}/${body.service_page || ''}`.replace(/\/$/, '') : '') ||
      `https://claimremedyadjusters.com/${body.service_page || ''}`.replace(/\/$/, '');

    await Promise.allSettled([
      sendEmailNotification(body).catch((emailError) => {
        console.error('Email notification failed:', emailError);
      }),
      eventId
        ? sendMetaCapiLead({
            eventId,
            eventSourceUrl,
            clientIp,
            userAgent,
            fbc: cookies._fbc ?? null,
            fbp: cookies._fbp ?? null,
            lead: {
              full_name: body.full_name,
              email: body.email,
              phone: body.phone,
              state: 'FL',
            },
          }).catch((capiError) => {
            console.error('[capi] unexpected error', capiError);
          })
        : Promise.resolve(),
      sendLeadSms({
        full_name: body.full_name,
        phone: body.phone,
        email: body.email,
        help_type: body.help_type,
        service_page: body.service_page,
        message: body.message || null,
      }).catch((smsError) => {
        console.error('[twilio] unexpected error', smsError);
      }),
    ]);

    return NextResponse.json(
      { message: 'Lead submitted successfully' },
      { status: 201 }
    );
  } catch (err) {
    console.error('API error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function sendEmailNotification(lead: Record<string, string>) {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey || resendApiKey === 're_PLACEHOLDER_GET_FROM_RESEND') {
    console.warn('[leads] RESEND_API_KEY not configured — email notification skipped');
    return;
  }

  const helpTypeLabels: Record<string, string> = {
    denied: 'My claim was denied',
    underpaid: 'My claim was underpaid',
    new_claim: 'I need someone to handle my claim from the start',
    protect: 'I want to protect myself for a better settlement',
    appraisal: 'I need appraisal services',
    other: 'Other',
  };

  const servicePageLabels: Record<string, string> = {
    'storm-hurricane': 'Storm & Hurricane',
    'water-damage': 'Water Damage',
    'fire-smoke': 'Fire & Smoke',
    'roof-claims': 'Roof Claims',
    appraisal: 'Appraisal Services',
    contact: 'Contact Page',
  };

  // Escape all user-supplied fields before HTML interpolation
  const name = escapeHtml(lead.full_name ?? '');
  const phone = escapeHtml(lead.phone ?? '');
  const email = escapeHtml(lead.email ?? '');
  const claimNumber = lead.claim_number ? escapeHtml(lead.claim_number) : null;
  const message = lead.message ? escapeHtml(lead.message) : null;
  const helpTypeLabel = helpTypeLabels[lead.help_type] ?? escapeHtml(lead.help_type ?? '');
  const servicePageLabel = servicePageLabels[lead.service_page] ?? escapeHtml(lead.service_page ?? '');

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: #0a0a0f; color: #f0f0f5; padding: 24px; border-radius: 12px;">
        <h2 style="color: #3b82f6; margin-top: 0;">New Lead — Claim Remedy Adjusters</h2>
        <hr style="border-color: #222233;">
        <table style="width: 100%; color: #f0f0f5; font-size: 14px;">
          <tr>
            <td style="padding: 8px 0; color: #9999aa; width: 140px;">Name</td>
            <td style="padding: 8px 0; font-weight: bold;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #9999aa;">Phone</td>
            <td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #3b82f6;">${phone}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #9999aa;">Email</td>
            <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #3b82f6;">${email}</a></td>
          </tr>
          ${claimNumber ? `
          <tr>
            <td style="padding: 8px 0; color: #9999aa;">Claim Number</td>
            <td style="padding: 8px 0;">${claimNumber}</td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding: 8px 0; color: #9999aa;">How Can We Help</td>
            <td style="padding: 8px 0;">${helpTypeLabel}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #9999aa;">Service Page</td>
            <td style="padding: 8px 0; color: #22c55e; font-weight: bold;">${servicePageLabel}</td>
          </tr>
          ${message ? `
          <tr>
            <td style="padding: 8px 0; color: #9999aa; vertical-align: top;">Message</td>
            <td style="padding: 8px 0;">${message}</td>
          </tr>
          ` : ''}
        </table>
        <hr style="border-color: #222233;">
        <p style="color: #666677; font-size: 12px; margin-bottom: 0;">
          This lead was submitted via claimremedyadjusters.com
        </p>
      </div>
    </div>
  `;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${resendApiKey}`,
    },
    body: JSON.stringify({
      from: 'Claim Remedy Leads <leads@claimremedyadjusters.com>',
      to: ['brandonginartebusiness@gmail.com', 'office@cradjusters.com'],
      subject: `New Lead: ${name} — ${servicePageLabel}`,
      html: emailHtml,
    }),
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`Resend API error: ${response.status} — ${errorData}`);
  }
}
