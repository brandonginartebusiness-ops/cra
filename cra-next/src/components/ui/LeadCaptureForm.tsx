"use client";

import { useState, useRef, useEffect, type FormEvent, type ChangeEvent } from "react";
import { m } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { trackLead } from "@/lib/tracking";
import { getDict, type Locale } from "@/i18n/dictionaries";
import { totalGoogleReviewCount } from "@/data/reviews";

interface LeadCaptureFormProps {
  servicePage: string;
  ctaText?: string;
  locale?: Locale;
}

type FormStatus = "idle" | "submitting" | "step2" | "success" | "error";

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  helpType: string;
  message: string;
  zip: string;
  filedClaim: string;
}

interface FieldErrors {
  phone?: string;
  email?: string;
}

interface Attachment {
  name: string;
  path: string;
  size: number;
  type: string;
}

const MAX_FILES = 5;
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPT =
  ".pdf,.jpg,.jpeg,.png,.webp,.heic,.heif,.doc,.docx,.txt,application/pdf,image/jpeg,image/png,image/webp,image/heic,image/heif,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain";

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const inputClass =
  "w-full bg-[#faf8f5] border rounded-lg px-4 py-3 text-base text-[#1a1a2e] placeholder-[#8888a0] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/40 focus:border-[#2563eb]/50 transition-colors";

export default function LeadCaptureForm({
  servicePage,
  ctaText,
  locale = "en",
}: LeadCaptureFormProps) {
  const t = getDict(locale).leadForm;
  const ctaLabel = ctaText ?? t.ctaDefault;

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    email: "",
    helpType: "",
    message: "",
    zip: "",
    filedClaim: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [leadId, setLeadId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const step2HeadingRef = useRef<HTMLHeadingElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  // Move focus to the new step's heading so keyboard/screen-reader users
  // aren't silently dropped when one <form> unmounts and the next mounts.
  useEffect(() => {
    if (status === "step2") step2HeadingRef.current?.focus();
    if (status === "success") successHeadingRef.current?.focus();
  }, [status]);

  const validateStep1 = (): boolean => {
    const newErrors: FieldErrors = {};
    if (!formData.phone.trim()) {
      newErrors.phone = t.errPhoneRequired;
    } else if (formData.phone.replace(/\D/g, "").length < 10) {
      newErrors.phone = t.errPhoneInvalid;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FieldErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    const picked = Array.from(e.target.files ?? []);
    if (picked.length === 0) return;

    const remainingSlots = MAX_FILES - attachments.length;
    if (picked.length > remainingSlots) {
      setUploadError(t.errSlots(MAX_FILES, remainingSlots));
      e.target.value = "";
      return;
    }
    for (const f of picked) {
      if (f.size > MAX_FILE_SIZE) {
        setUploadError(t.errTooBig(f.name));
        e.target.value = "";
        return;
      }
    }

    setUploadingFiles(true);
    try {
      const fd = new FormData();
      picked.forEach((f) => fd.append("files", f));
      const res = await fetch("/api/leads/upload", { method: "POST", body: fd });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setUploadError(err.error || t.errUploadFailed);
      } else {
        const { attachments: uploaded } = (await res.json()) as { attachments: Attachment[] };
        setAttachments((prev) => [...prev, ...uploaded]);
      }
    } catch {
      setUploadError(t.errUploadRetry);
    } finally {
      setUploadingFiles(false);
      e.target.value = "";
    }
  };

  const removeAttachment = (path: string) => {
    setAttachments((prev) => prev.filter((a) => a.path !== path));
  };

  const submitLead = async (final: boolean) => {
    const eventId =
      typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: formData.fullName || undefined,
          phone: formData.phone,
          email: formData.email || undefined,
          help_type: formData.helpType || undefined,
          message: formData.message || undefined,
          zip: formData.zip || undefined,
          filed_claim: formData.filedClaim || undefined,
          service_page: servicePage,
          locale,
          event_id: eventId,
          step: final ? "complete" : "initial",
          attachments: attachments.length > 0 ? attachments : undefined,
          lead_id: final ? leadId : undefined,
        }),
      });

      if (!response.ok) throw new Error("Submission failed");

      // Capture the row id from Step 1 so Step 2 updates it instead of inserting again.
      const data = (await response.json().catch(() => ({}))) as { leadId?: number | null };
      if (typeof data.leadId === "number" && leadId === null) {
        setLeadId(data.leadId);
      }

      const trimmedName = formData.fullName.trim();
      const spaceIdx = trimmedName.indexOf(" ");
      const firstName = spaceIdx === -1 ? trimmedName : trimmedName.slice(0, spaceIdx);
      const lastName = spaceIdx === -1 ? "" : trimmedName.slice(spaceIdx + 1).trim();

      // Only fire client-side Meta pixel Lead event on the FIRST submit. Step 2 is
      // server-side enrichment and shouldn't dedupe a second Lead event.
      if (!final || leadId === null) {
        void trackLead({
          eventId,
          email: formData.email,
          phone: formData.phone,
          firstName,
          lastName,
          state: "FL",
        });
      }
      return true;
    } catch {
      return false;
    }
  };

  const handleStep1 = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateStep1()) return;
    setStatus("submitting");
    const ok = await submitLead(false);
    if (ok) {
      setStatus("step2");
    } else {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const handleStep2 = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    await submitLead(true);
    setStatus("success");
    setTimeout(() => {
      setFormData({ fullName: "", phone: "", email: "", helpType: "", message: "", zip: "", filedClaim: "" });
      setAttachments([]);
      setLeadId(null);
      setStatus("idle");
    }, 5000);
  };

  const skipStep2 = async () => {
    if (attachments.length > 0) {
      setStatus("submitting");
      await submitLead(true);
    }
    setStatus("success");
    setTimeout(() => {
      setFormData({ fullName: "", phone: "", email: "", helpType: "", message: "", zip: "", filedClaim: "" });
      setAttachments([]);
      setLeadId(null);
      setStatus("idle");
    }, 5000);
  };

  if (status === "success") {
    return (
      <m.div
        role="status"
        aria-live="polite"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#ffffff] border border-[#1a1a2e]/8 rounded-2xl p-8 text-center"
      >
        <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#22c55e]/10 flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h3
          ref={successHeadingRef}
          tabIndex={-1}
          className="font-bebas text-2xl text-[#1a1a2e] mb-2"
        >
          {t.successHeading}
        </h3>
        <p className="text-sm text-[#5a5a72] mb-6">
          {t.successBodyPre}{" "}
          {formData.phone || t.youWord}{" "}
          {t.successBodyPost}
        </p>
        <p className="text-xs text-[#8888a0] mb-3">{t.successNeedSooner}</p>
        <div className="flex items-center justify-center gap-4">
          <a
            href="https://wa.me/13057331670"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-[#25d366] hover:underline"
          >
            WhatsApp
          </a>
          <a
            href="tel:+13057331670"
            className="inline-flex items-center gap-2 text-sm text-[#2563eb] hover:underline"
          >
            (305) 733-1670
          </a>
        </div>
      </m.div>
    );
  }

  // ── Step 2 — optional enrichment after lead already captured ──
  if (status === "step2") {
    return (
      <m.form
        onSubmit={handleStep2}
        method="post"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#ffffff] border border-[#1a1a2e]/8 rounded-2xl p-6 sm:p-7 flex flex-col gap-4"
      >
        <div className="flex items-center gap-2 text-[0.6rem] font-bold uppercase tracking-[0.22em] text-[#22c55e]">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 6L9 17l-5-5" />
          </svg>
          {t.step2Badge}
        </div>
        <h3
          ref={step2HeadingRef}
          tabIndex={-1}
          className="font-bebas text-2xl text-[#1a1a2e] leading-tight"
        >
          {t.step2HeadingPre}{" "}
          <em className="font-serif italic font-medium text-[#2563eb]">
            {t.step2HeadingEm}
          </em>{" "}
          {t.step2HeadingPost}
        </h3>
        <p className="text-sm text-[#5a5a72] -mt-2">
          {t.step2Sub}
        </p>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[#1a1a2e] mb-1.5">
            {t.emailLabel}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            className={`${inputClass} border-[#1a1a2e]/12`}
            placeholder={t.emailPlaceholder}
          />
        </div>

        <div>
          <label htmlFor="helpType" className="block text-sm font-medium text-[#1a1a2e] mb-1.5">
            {t.helpTypeLabel}
          </label>
          <select
            id="helpType"
            name="helpType"
            value={formData.helpType}
            onChange={handleChange}
            className={`${inputClass} border-[#1a1a2e]/12 appearance-none`}
          >
            <option value="">{t.helpSelect}</option>
            <option value="denied">{t.helpDenied}</option>
            <option value="underpaid">{t.helpUnderpaid}</option>
            <option value="new_claim">{t.helpNewClaim}</option>
            <option value="protect">{t.helpProtect}</option>
            <option value="appraisal">{t.helpAppraisal}</option>
            <option value="other">{t.helpOther}</option>
          </select>
        </div>

        {/* ZIP + filed-yet — qualifiers, deferred from step 1 to keep first touch light */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="zip-2" className="block text-sm font-medium text-[#1a1a2e] mb-1.5">
              {t.zipLabel}
            </label>
            <input
              type="text"
              id="zip-2"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={10}
              className={`${inputClass} border-[#1a1a2e]/12`}
              placeholder={t.zipPlaceholder}
            />
          </div>
          <div>
            <span className="block text-sm font-medium text-[#1a1a2e] mb-1.5">
              {t.filedLabel}
            </span>
            <div role="radiogroup" aria-label={t.filedAria} className="flex gap-2">
              {[
                { value: "yes", label: t.yes },
                { value: "no", label: t.no },
              ].map((opt) => {
                const active = formData.filedClaim === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        filedClaim: prev.filedClaim === opt.value ? "" : opt.value,
                      }))
                    }
                    className={`flex-1 rounded-lg border px-4 py-3 text-sm font-medium transition-[background-color,border-color,color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/40 ${
                      active
                        ? "bg-[#2563eb] border-[#2563eb] text-white"
                        : "bg-[#faf8f5] border-[#1a1a2e]/12 text-[#1a1a2e] hover:border-[#2563eb]/40"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* File uploads — denial letters, claim photos, policy documents */}
        <div>
          <label className="block text-sm font-medium text-[#1a1a2e]">
            {t.attachLabel}
          </label>
          <p className="text-xs text-[#8888a0] mb-2">
            {t.attachHint}
          </p>

          {attachments.length > 0 && (
            <ul className="mb-3 flex flex-col gap-2">
              {attachments.map((a) => (
                <li
                  key={a.path}
                  className="flex items-center gap-2 bg-[#faf8f5] border border-[#1a1a2e]/8 rounded-lg px-3 py-2 text-sm"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  <span className="flex-1 truncate text-[#1a1a2e]">{a.name}</span>
                  <span className="text-xs text-[#5a5a72]">{formatBytes(a.size)}</span>
                  <button
                    type="button"
                    onClick={() => removeAttachment(a.path)}
                    className="text-[#5a5a72] hover:text-red-500 transition-colors p-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/60 rounded"
                    aria-label={t.removeAria(a.name)}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {attachments.length < MAX_FILES && (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept={ACCEPT}
                multiple
                onChange={handleFileChange}
                disabled={uploadingFiles}
                className="sr-only"
                id="lead-attachments"
              />
              <label
                htmlFor="lead-attachments"
                className={`inline-flex items-center gap-2 cursor-pointer bg-[#faf8f5] border border-dashed border-[#1a1a2e]/20 text-sm text-[#1a1a2e] px-4 py-2.5 rounded-lg hover:border-[#2563eb]/40 hover:bg-[#f0ede8] transition-colors ${uploadingFiles ? "opacity-60 cursor-wait" : ""}`}
              >
                {uploadingFiles ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    {t.uploading}
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    {attachments.length === 0 ? t.chooseFiles : t.addMore}
                  </>
                )}
              </label>
              <p className="text-xs text-[#8888a0] mt-1.5">
                {t.fileMeta(MAX_FILES - attachments.length)}
              </p>
            </>
          )}

          {uploadError && (
            <p className="text-xs text-red-500 mt-2">{uploadError}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={uploadingFiles}
          className="w-full bg-[#2563eb] text-white font-semibold py-3.5 rounded-lg hover:opacity-90 hover:shadow-[0_0_24px_rgba(37,99,235,0.25)] transition-[opacity,box-shadow] duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {t.sendButton(attachments.length)}
        </button>
        <button
          type="button"
          onClick={skipStep2}
          className="text-xs text-[#8888a0] underline hover:text-[#5a5a72] self-center"
        >
          {t.skip}
        </button>
      </m.form>
    );
  }

  // ── Step 1 — phone + quick message, full-commitment CTA ──
  return (
    <m.form
      onSubmit={handleStep1}
      method="post"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={fadeInUp}
      className="bg-[#ffffff] border border-[#1a1a2e]/8 rounded-2xl p-8 flex flex-col gap-5"
    >
      {/* Honeypot */}
      <input type="text" name="website" tabIndex={-1} aria-hidden="true" style={{ display: "none" }} />
      <input type="text" name="company" tabIndex={-1} aria-hidden="true" style={{ display: "none" }} />

      {status === "error" && (
        <div role="alert" aria-atomic="true" className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 text-sm text-red-600">
          {t.errBannerPre}
          <a href="tel:+13057331670" className="underline font-semibold">(305) 733-1670</a>
          {t.errBannerPost}
        </div>
      )}

      {/* Name (optional, helps personalize the callback) */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-[#1a1a2e] mb-1.5">
          {t.nameLabel} <span className="text-[#8888a0] font-normal">{t.optional}</span>
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          disabled={status === "submitting"}
          autoComplete="name"
          className={`${inputClass} border-[#1a1a2e]/12`}
          placeholder={t.namePlaceholder}
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-[#1a1a2e] mb-1.5">
          {t.phoneLabel}
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          disabled={status === "submitting"}
          autoComplete="tel"
          inputMode="tel"
          aria-invalid={errors.phone ? true : undefined}
          aria-describedby={errors.phone ? "phone-error" : undefined}
          className={`${inputClass} ${errors.phone ? "border-red-500/50" : "border-[#1a1a2e]/12"}`}
          placeholder={t.phonePlaceholder}
        />
        {errors.phone && <p id="phone-error" className="text-xs text-red-500 mt-1">{errors.phone}</p>}
      </div>

      {/* Quick message — one optional line of context, nothing more on step 1 */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[#1a1a2e] mb-1.5">
          {t.messageLabel} <span className="text-[#8888a0] font-normal">{t.optional}</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={2}
          value={formData.message}
          onChange={handleChange}
          disabled={status === "submitting"}
          className={`${inputClass} border-[#1a1a2e]/12 resize-none`}
          placeholder={t.messagePlaceholder}
        />
      </div>

      {/* Trust line */}
      <p className="text-center text-sm font-semibold text-[#1a1a2e] -mb-1">
        {t.trustLine}
      </p>

      {/* Submit — two-line promise button */}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-[#2563eb] text-white rounded-lg px-6 py-4 hover:opacity-90 hover:shadow-[0_0_24px_rgba(37,99,235,0.25)] transition-[opacity,box-shadow] duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex flex-col items-center gap-0.5"
      >
        {status === "submitting" ? (
          <span className="inline-flex items-center gap-2 py-1">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            {t.submitting}
          </span>
        ) : (
          <>
            <span className="font-semibold text-sm uppercase tracking-[0.08em]">
              {ctaLabel}
            </span>
            <span className="text-xs font-normal text-white/95">
              {t.ctaSub}
            </span>
          </>
        )}
      </button>

      {/* Micro-social-proof — proximate to CTA, drives 59% lift (VWO data) */}
      <p className="flex items-center justify-center gap-2 text-xs text-cra-muted font-medium">
        <span aria-hidden="true">⭐</span>
        5.0 Google rating · {totalGoogleReviewCount}+ FL homeowners helped
      </p>

      {/* TCPA opt-in */}
      <p className="text-xs text-[#8888a0] leading-relaxed text-center">
        {t.tcpa}
      </p>
    </m.form>
  );
}
