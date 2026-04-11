"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

interface LeadCaptureFormProps {
  servicePage: string;
  ctaText?: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  claimNumber: string;
  helpType: string;
  message: string;
}

interface FieldErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  helpType?: string;
}

const inputClass =
  "w-full bg-[#faf8f5] border rounded-lg px-4 py-3 text-sm text-[#1a1a2e] placeholder-[#8888a0] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/40 focus:border-[#2563eb]/50 transition-colors";

export default function LeadCaptureForm({
  servicePage,
  ctaText = "Get Your Free Claim Review",
}: LeadCaptureFormProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    email: "",
    claimNumber: "",
    helpType: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  const validate = (): boolean => {
    const newErrors: FieldErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "This field is required";
    if (!formData.phone.trim()) {
      newErrors.phone = "This field is required";
    } else if (formData.phone.replace(/\D/g, "").length < 10) {
      newErrors.phone = "Please enter a valid phone number";
    }
    if (!formData.email.trim()) {
      newErrors.email = "This field is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.helpType) newErrors.helpType = "This field is required";
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          claim_number: formData.claimNumber || undefined,
          help_type: formData.helpType,
          message: formData.message || undefined,
          service_page: servicePage,
        }),
      });

      if (!response.ok) throw new Error("Submission failed");

      setStatus("success");
      setTimeout(() => {
        setFormData({ fullName: "", phone: "", email: "", claimNumber: "", helpType: "", message: "" });
        setStatus("idle");
      }, 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
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
          Your claim review request has been submitted.
        </h3>
        <p className="text-sm text-[#5a5a72] mb-6">
          Our team will contact you within 24 hours.
        </p>
        <p className="text-xs text-[#8888a0] mb-3">You can also reach us directly:</p>
        <div className="flex items-center justify-center gap-4">
          <a
            href="https://wa.me/17862237867"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-[#25d366] hover:underline"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#25d366">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </a>
          <a
            href="tel:+17862237867"
            className="inline-flex items-center gap-2 text-sm text-[#2563eb] hover:underline"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
            (786) 223-7867
          </a>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={fadeInUp}
      className="bg-[#ffffff] border border-[#1a1a2e]/8 rounded-2xl p-8 flex flex-col gap-5"
    >
      {/* Honeypot — visually hidden, bots fill it, humans don't */}
      <input type="text" name="website" tabIndex={-1} aria-hidden="true" style={{ display: "none" }} />
      <input type="text" name="company" tabIndex={-1} aria-hidden="true" style={{ display: "none" }} />

      {status === "error" && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 text-sm text-red-600">
          Something went wrong. Please try again or call us directly at{" "}
          <a href="tel:+17862237867" className="underline font-semibold">(786) 223-7867</a>.
        </div>
      )}

      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-[#1a1a2e] mb-1.5">
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          disabled={status === "submitting"}
          className={`${inputClass} ${errors.fullName ? "border-red-500/50" : "border-[#1a1a2e]/12"}`}
          placeholder="Your full name"
        />
        {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
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
          className={`${inputClass} ${errors.phone ? "border-red-500/50" : "border-[#1a1a2e]/12"}`}
          placeholder="(555) 123-4567"
        />
        {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[#1a1a2e] mb-1.5">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={status === "submitting"}
          className={`${inputClass} ${errors.email ? "border-red-500/50" : "border-[#1a1a2e]/12"}`}
          placeholder="you@email.com"
        />
        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
      </div>

      {/* Claim Number */}
      <div>
        <label htmlFor="claimNumber" className="block text-sm font-medium text-[#1a1a2e] mb-1.5">
          Claim Number <span className="text-[#8888a0]">(optional)</span>
        </label>
        <input
          type="text"
          id="claimNumber"
          name="claimNumber"
          value={formData.claimNumber}
          onChange={handleChange}
          disabled={status === "submitting"}
          className={`${inputClass} border-[#1a1a2e]/12`}
          placeholder="If you have one"
        />
      </div>

      {/* How can we help? */}
      <div>
        <label htmlFor="helpType" className="block text-sm font-medium text-[#1a1a2e] mb-1.5">
          How can we help?
        </label>
        <select
          id="helpType"
          name="helpType"
          value={formData.helpType}
          onChange={handleChange}
          disabled={status === "submitting"}
          className={`${inputClass} appearance-none ${errors.helpType ? "border-red-500/50" : "border-[#1a1a2e]/12"}`}
        >
          <option value="">Select an option...</option>
          <option value="denied">My claim was denied</option>
          <option value="underpaid">My claim was underpaid</option>
          <option value="new_claim">I need someone to handle my claim from the start</option>
          <option value="protect">I want to protect myself for a better settlement</option>
          <option value="appraisal">I need appraisal services</option>
          <option value="other">Other</option>
        </select>
        {errors.helpType && <p className="text-xs text-red-500 mt-1">{errors.helpType}</p>}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[#1a1a2e] mb-1.5">
          Message <span className="text-[#8888a0]">(optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          disabled={status === "submitting"}
          className={`${inputClass} border-[#1a1a2e]/12 resize-none`}
          placeholder="Tell us about your situation..."
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-[#2563eb] text-white font-semibold py-3.5 rounded-lg hover:opacity-90 hover:shadow-[0_0_24px_rgba(37,99,235,0.25)] transition-[opacity,box-shadow] duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {status === "submitting" ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Submitting...
          </>
        ) : (
          ctaText
        )}
      </button>
    </motion.form>
  );
}
