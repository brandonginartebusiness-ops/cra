import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServer';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

const VALID_HELP_TYPES = new Set(['denied', 'underpaid', 'new_claim', 'protect', 'appraisal', 'other']);
const VALID_SERVICE_PAGES = new Set(['storm-hurricane', 'water-damage', 'fire-smoke', 'roof-claims', 'appraisal', 'contact', 'homepage']);

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

    // Send email notification (non-blocking)
    try {
      await sendEmailNotification(body);
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
    }

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
