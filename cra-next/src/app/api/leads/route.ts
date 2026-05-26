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

    const { phone, service_page } = body;
    if (!phone || !service_page) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Field length caps — only check fields that were provided
    if (
      (body.full_name && body.full_name.length > 120) ||
      phone.length > 30 ||
      (body.email && body.email.length > 254) ||
      (body.claim_number && body.claim_number.length > 60) ||
      (body.message && body.message.length > 2000)
    ) {
      return NextResponse.json({ error: 'Field value too long' }, { status: 400 });
    }

    // Email format only validated if provided (Step 1 of 2-step form has no email yet)
    if (body.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(body.email)) {
        return NextResponse.json(
          { error: 'Invalid email address' },
          { status: 400 }
        );
      }
    }

    // Allowlist enum fields only if provided
    if (body.help_type && !VALID_HELP_TYPES.has(body.help_type)) {
      return NextResponse.json({ error: 'Invalid help_type' }, { status: 400 });
    }
    if (!VALID_SERVICE_PAGES.has(service_page)) {
      return NextResponse.json({ error: 'Invalid service_page' }, { status: 400 });
    }

    // Validate attachments shape if provided
    let attachments: Array<{ name: string; path: string; size: number; type: string }> = [];
    if (Array.isArray(body.attachments) && body.attachments.length > 0) {
      if (body.attachments.length > 5) {
        return NextResponse.json({ error: 'Too many attachments' }, { status: 400 });
      }
      attachments = body.attachments
        .filter(
          (a: unknown): a is { name: string; path: string; size: number; type: string } =>
            typeof a === 'object' &&
            a !== null &&
            typeof (a as { name: unknown }).name === 'string' &&
            typeof (a as { path: unknown }).path === 'string' &&
            typeof (a as { size: unknown }).size === 'number' &&
            typeof (a as { type: unknown }).type === 'string'
        )
        .slice(0, 5);
    }

    // Step 2 ("complete") with a lead_id from Step 1 → UPDATE the existing row,
    // skip side effects (already fired on Step 1). Result: 1 row per lead, not 2.
    const leadIdRaw = body.lead_id;
    const leadId =
      typeof leadIdRaw === 'number' || (typeof leadIdRaw === 'string' && /^\d+$/.test(leadIdRaw))
        ? Number(leadIdRaw)
        : null;
    const isEnrichmentUpdate = body.step === 'complete' && leadId !== null;

    if (isEnrichmentUpdate) {
      const updatePayload: Record<string, unknown> = {};
      if (body.full_name) updatePayload.full_name = body.full_name;
      if (body.email) updatePayload.email = body.email;
      if (body.claim_number) updatePayload.claim_number = body.claim_number;
      if (body.help_type) updatePayload.help_type = body.help_type;
      if (body.message) updatePayload.message = body.message;
      if (attachments.length > 0) updatePayload.attachments = attachments;

      if (Object.keys(updatePayload).length === 0) {
        return NextResponse.json({ message: 'Nothing to update', leadId }, { status: 200 });
      }

      const { error: updateError } = await supabaseServer
        .from('leads')
        .update(updatePayload)
        .eq('id', leadId);

      if (updateError) {
        console.error('Supabase update error:', updateError.code, updateError.message);
        return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 });
      }

      return NextResponse.json({ message: 'Lead enriched', leadId }, { status: 200 });
    }

    // Otherwise: INSERT a new row (Step 1 or single-step submit).
    // Supabase `leads` table has NOT NULL on full_name/email/help_type and likely
    // a CHECK constraint on help_type. Use safe defaults for partial Step-1 submits.
    const payload = {
      full_name: body.full_name || 'Pending',
      phone: body.phone,
      email: body.email || '',
      claim_number: body.claim_number || null,
      help_type: body.help_type || 'other',
      message: body.message || null,
      service_page: body.service_page,
      status: 'new',
      attachments,
    };

    const { data: inserted, error } = await supabaseServer
      .from('leads')
      .insert([payload])
      .select('id')
      .single();

    if (error) {
      console.error('Supabase insert error:', error.code, error.message);
      return NextResponse.json(
        { error: 'Failed to submit lead' },
        { status: 500 }
      );
    }

    const newLeadId = inserted?.id ?? null;

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
      sendEmailNotification(body, attachments).catch((emailError) => {
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
              full_name: body.full_name || '',
              email: body.email || '',
              phone: body.phone,
              state: 'FL',
            },
          }).catch((capiError) => {
            console.error('[capi] unexpected error', capiError);
          })
        : Promise.resolve(),
      sendLeadSms({
        full_name: body.full_name || '',
        phone: body.phone,
        email: body.email || '',
        help_type: body.help_type || '',
        service_page: body.service_page,
        message: body.message || null,
      }).catch((smsError) => {
        console.error('[twilio] unexpected error', smsError);
      }),
    ]);

    return NextResponse.json(
      { message: 'Lead submitted successfully', leadId: newLeadId },
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

async function generateAttachmentLinks(
  attachments: Array<{ name: string; path: string; size: number; type: string }>
): Promise<Array<{ name: string; size: number; signedUrl: string }>> {
  if (attachments.length === 0) return [];
  // 30-day signed URLs so Brandon can click straight from email
  const expiresIn = 60 * 60 * 24 * 30;
  const results: Array<{ name: string; size: number; signedUrl: string }> = [];
  for (const att of attachments) {
    const { data, error } = await supabaseServer.storage
      .from('lead-attachments')
      .createSignedUrl(att.path, expiresIn);
    if (!error && data?.signedUrl) {
      results.push({ name: att.name, size: att.size, signedUrl: data.signedUrl });
    }
  }
  return results;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

async function sendEmailNotification(
  lead: Record<string, string>,
  attachments: Array<{ name: string; path: string; size: number; type: string }> = []
) {
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

  const signedAttachments = await generateAttachmentLinks(attachments);
  const attachmentsHtml = signedAttachments.length
    ? `
        <tr>
          <td style="padding: 8px 0; color: #9999aa; vertical-align: top;">Attachments</td>
          <td style="padding: 8px 0;">
            ${signedAttachments
              .map(
                (a) => `
              <div style="margin-bottom: 6px;">
                <a href="${a.signedUrl}" style="color: #3b82f6; text-decoration: underline;">${escapeHtml(a.name)}</a>
                <span style="color: #666677; font-size: 12px;"> · ${formatBytes(a.size)}</span>
              </div>
            `
              )
              .join('')}
            <div style="color: #666677; font-size: 11px; margin-top: 4px;">Links expire in 30 days.</div>
          </td>
        </tr>
      `
    : '';

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
          ${attachmentsHtml}
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
