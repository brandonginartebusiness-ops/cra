"use client";

import { useState, useRef, type FormEvent, type ChangeEvent } from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { trackLead } from "@/lib/tracking";

interface LeadCaptureFormProps {
  servicePage: string;
  ctaText?: string;
}

type FormStatus = "idle" | "submitting" | "step2" | "success" | "error";

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  helpType: string;
  message: string;
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
  "w-full bg-[#faf8f5] border rounded-lg px-4 py-3 text-sm text-[#1a1a2e] placeholder-[#8888a0] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/40 focus:border-[#2563eb]/50 transition-colors";

export default function LeadCaptureForm({
  servicePage,
  ctaText = "Get my free review",
}: LeadCaptureFormProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    email: "",
    helpType: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateStep1 = (): boolean => {
    const newErrors: FieldErrors = {};
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required so we can call you back";
    } else if (formData.phone.replace(/\D/g, "").length < 10) {
      newErrors.phone = "Please enter a valid phone number";
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
      setUploadError(`You can attach up to ${MAX_FILES} files. ${remainingSlots} slot${remainingSlots === 1 ? "" : "s"} remaining.`);
      e.target.value = "";
      return;
    }
    for (const f of picked) {
      if (f.size > MAX_FILE_SIZE) {
        setUploadError(`${f.name} is over 10 MB. Try compressing or splitting it.`);
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
        setUploadError(err.error || "Upload failed");
      } else {
        const { attachments: uploaded } = (await res.json()) as { attachments: Attachment[] };
        setAttachments((prev) => [...prev, ...uploaded]);
      }
    } catch {
      setUploadError("Upload failed. Please try again.");
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
          service_page: servicePage,
          event_id: eventId,
          step: final ? "complete" : "initial",
          attachments: final ? attachments : undefined,
        }),
      });

      if (!response.ok) throw new Error("Submission failed");

      const trimmedName = formData.fullName.trim();
      const spaceIdx = trimmedName.indexOf(" ");
      const firstName = spaceIdx === -1 ? trimmedName : trimmedName.slice(0, spaceIdx);
      const lastName = spaceIdx === -1 ? "" : trimmedName.slice(spaceIdx + 1).trim();

      void trackLead({
        eventId,
        email: formData.email,
        phone: formData.phone,
        firstName,
        lastName,
        state: "FL",
      });
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
      setFormData({ fullName: "", phone: "", email: "", helpType: "", message: "" });
      setAttachments([]);
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
      setFormData({ fullName: "", phone: "", email: "", helpType: "", message: "" });
      setAttachments([]);
      setStatus("idle");
    }, 5000);
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#ffffff] border border-[#1a1a2e]/8 rounded-2xl p-8 text-center"
      >
        <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#22c55e]/10 flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h3 className="font-bebas text-2xl text-[#1a1a2e] mb-2">
          Got it — we&apos;ll call within the hour.
        </h3>
        <p className="text-sm text-[#5a5a72] mb-6">
          Your claim review request is in. Eddy or a team member will ring{" "}
          {formData.phone || "you"} shortly.
        </p>
        <p className="text-xs text-[#8888a0] mb-3">Need us sooner? Reach out directly:</p>
        <div className="flex items-center justify-center gap-4">
          <a
            href="https://wa.me/17862237867"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-[#25d366] hover:underline"
          >
            WhatsApp
          </a>
          <a
            href="tel:+17862237867"
            className="inline-flex items-center gap-2 text-sm text-[#2563eb] hover:underline"
          >
            (786) 223-7867
          </a>
        </div>
      </motion.div>
    );
  }

  // ── Step 2 — optional enrichment after lead already captured ──
  if (status === "step2") {
    return (
      <motion.form
        onSubmit={handleStep2}
        method="post"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#ffffff] border border-[#1a1a2e]/8 rounded-2xl p-8 flex flex-col gap-5"
      >
        <div className="flex items-center gap-2 text-[0.6rem] font-bold uppercase tracking-[0.22em] text-[#22c55e]">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 6L9 17l-5-5" />
          </svg>
          Got it — we&apos;ll call within the hour
        </div>
        <h3 className="font-bebas text-2xl text-[#1a1a2e] leading-tight">
          A few{" "}
          <em className="font-serif italic font-medium text-[#2563eb]">
            optional details
          </em>{" "}
          to speed things up
        </h3>
        <p className="text-sm text-[#5a5a72] -mt-2">
          Skip anything you&apos;d rather tell us on the phone.
        </p>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[#1a1a2e] mb-1.5">
            Email <span className="text-[#8888a0] font-normal">(optional)</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`${inputClass} border-[#1a1a2e]/12`}
            placeholder="you@email.com"
          />
        </div>

        <div>
          <label htmlFor="helpType" className="block text-sm font-medium text-[#1a1a2e] mb-1.5">
            What kind of help? <span className="text-[#8888a0] font-normal">(optional)</span>
          </label>
          <select
            id="helpType"
            name="helpType"
            value={formData.helpType}
            onChange={handleChange}
            className={`${inputClass} border-[#1a1a2e]/12 appearance-none`}
          >
            <option value="">Select an option…</option>
            <option value="denied">My claim was denied</option>
            <option value="underpaid">My claim was underpaid</option>
            <option value="new_claim">I need someone to handle my claim from the start</option>
            <option value="protect">I want to protect myself for a better settlement</option>
            <option value="appraisal">I need appraisal services</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* File uploads — denial letters, claim photos, policy documents */}
        <div>
          <label className="block text-sm font-medium text-[#1a1a2e] mb-1.5">
            Attach documents <span className="text-[#8888a0] font-normal">(optional)</span>
          </label>
          <p className="text-xs text-[#5a5a72] mb-2">
            Denial letters, claim photos, your insurance policy — anything that helps us prep for the call.
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
                    className="text-[#5a5a72] hover:text-red-500 transition-colors p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/60 rounded"
                    aria-label={`Remove ${a.name}`}
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
                    Uploading…
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    {attachments.length === 0 ? "Choose files" : "Add more"}
                  </>
                )}
              </label>
              <p className="text-xs text-[#8888a0] mt-1.5">
                PDF, JPG, PNG, DOC up to 10 MB each · {MAX_FILES - attachments.length} slot{MAX_FILES - attachments.length === 1 ? "" : "s"} remaining
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
          {attachments.length > 0 ? `Send details + ${attachments.length} file${attachments.length === 1 ? "" : "s"}` : "Send these details"}
        </button>
        <button
          type="button"
          onClick={skipStep2}
          className="text-xs text-[#8888a0] underline hover:text-[#5a5a72] self-center"
        >
          Skip — we&apos;ll cover it on the call
        </button>
      </motion.form>
    );
  }

  // ── Step 1 — phone + quick message, full-commitment CTA ──
  return (
    <motion.form
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
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 text-sm text-red-600">
          Something went wrong. Please try again or call us directly at{" "}
          <a href="tel:+17862237867" className="underline font-semibold">(786) 223-7867</a>.
        </div>
      )}

      {/* Name (optional, helps personalize the callback) */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-[#1a1a2e] mb-1.5">
          Your Name <span className="text-[#8888a0] font-normal">(optional)</span>
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
          placeholder="First name is fine"
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-[#1a1a2e] mb-1.5">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          disabled={status === "submitting"}
          autoComplete="tel"
          className={`${inputClass} ${errors.phone ? "border-red-500/50" : "border-[#1a1a2e]/12"}`}
          placeholder="(555) 123-4567"
        />
        {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
      </div>

      {/* Quick message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[#1a1a2e] mb-1.5">
          What happened? <span className="text-[#8888a0] font-normal">(optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          value={formData.message}
          onChange={handleChange}
          disabled={status === "submitting"}
          className={`${inputClass} border-[#1a1a2e]/12 resize-none`}
          placeholder="A roof leak after the last storm, a denied claim, water damage in the kitchen…"
        />
      </div>

      {/* Trust line */}
      <p className="text-center text-sm font-semibold text-[#1a1a2e] -mb-1">
        No recovery, no fee. Licensed Florida public adjusters.
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
            Submitting...
          </span>
        ) : (
          <>
            <span className="font-semibold text-sm uppercase tracking-[0.08em]">
              {ctaText}
            </span>
            <span className="text-xs font-normal text-white/80">
              Called back within the hour.
            </span>
          </>
        )}
      </button>

      {/* TCPA opt-in */}
      <p className="text-xs text-[#8888a0] leading-relaxed text-center">
        By submitting, you agree to receive calls and SMS from Claim Remedy Adjusters about your claim. Reply STOP to opt out. Msg &amp; data rates may apply. Your info is never shared.
      </p>
    </motion.form>
  );
}
