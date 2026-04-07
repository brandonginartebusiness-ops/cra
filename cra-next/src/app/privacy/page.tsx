import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Claim Remedy Adjusters LLC.",
  alternates: { canonical: "https://claimremedyadjusters.com/privacy" },
};

export default function PrivacyPage() {
  const updated = "April 6, 2026";

  return (
    <main className="bg-[#0a0a0f] min-h-screen pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="font-bebas text-5xl md:text-6xl text-[#f0f0f5] mb-4">
          Privacy Policy
        </h1>
        <p className="text-sm text-[#666677] mb-12">Last updated: {updated}</p>

        <div className="flex flex-col gap-10 text-[#9999aa] leading-relaxed text-sm">

          <section>
            <h2 className="font-bebas text-2xl text-[#f0f0f5] mb-3">1. Who We Are</h2>
            <p>
              Claim Remedy Adjusters LLC ("CRA", "we", "us", or "our") is a licensed Florida
              public adjusting firm located at 7900 Oak Ln, Suite 400, Miami Lakes, FL 33016.
              We operate the website <strong className="text-[#f0f0f5]">claimremedyadjusters.com</strong> and
              related services. FL License W549958.
            </p>
            <p className="mt-3">
              For questions about this policy, contact us at{" "}
              <a href="mailto:office@cradjusters.com" className="text-[#60a5fa] hover:underline">
                office@cradjusters.com
              </a>{" "}
              or (786) 223-7867.
            </p>
          </section>

          <section>
            <h2 className="font-bebas text-2xl text-[#f0f0f5] mb-3">2. Information We Collect</h2>
            <p>We collect information you provide directly to us, including:</p>
            <ul className="list-disc list-inside mt-3 flex flex-col gap-1.5">
              <li>Name, email address, and phone number (via contact and lead forms)</li>
              <li>Property address and description of damage (claim intake forms)</li>
              <li>Messages you send through our AI chat assistant</li>
              <li>Communications via WhatsApp, phone, or email</li>
            </ul>
            <p className="mt-3">We also collect limited technical data automatically:</p>
            <ul className="list-disc list-inside mt-3 flex flex-col gap-1.5">
              <li>IP address and browser type</li>
              <li>Pages visited and time spent on the site</li>
              <li>Referring URL</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bebas text-2xl text-[#f0f0f5] mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc list-inside flex flex-col gap-1.5">
              <li>To respond to your claim inquiry and provide our public adjusting services</li>
              <li>To contact you about your insurance claim</li>
              <li>To send follow-up communications you have requested</li>
              <li>To improve our website and services</li>
              <li>To comply with legal obligations</li>
            </ul>
            <p className="mt-3">
              We do <strong className="text-[#f0f0f5]">not</strong> sell your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="font-bebas text-2xl text-[#f0f0f5] mb-3">4. AI Chat Assistant</h2>
            <p>
              Our website includes an AI-powered chat assistant for general insurance claim guidance.
              Conversations are processed via the Anthropic API. Messages you submit may be used to
              generate responses but are not stored by CRA beyond your browser session. Do not submit
              sensitive personal or financial information through the chat.
            </p>
          </section>

          <section>
            <h2 className="font-bebas text-2xl text-[#f0f0f5] mb-3">5. Instagram and Social Media</h2>
            <p>
              Our website may display content from our Instagram account via the Instagram Graph API.
              We access only publicly available post data (images, captions, permalinks). We do not
              collect or store data about Instagram users who view our website.
            </p>
          </section>

          <section>
            <h2 className="font-bebas text-2xl text-[#f0f0f5] mb-3">6. Cookies</h2>
            <p>
              We use session storage (not cookies) to manage the site loading experience. We may use
              third-party analytics tools (such as Google Analytics) that place cookies to help us
              understand site traffic. You can disable cookies in your browser settings.
            </p>
          </section>

          <section>
            <h2 className="font-bebas text-2xl text-[#f0f0f5] mb-3">7. Data Sharing</h2>
            <p>We share your information only with:</p>
            <ul className="list-disc list-inside mt-3 flex flex-col gap-1.5">
              <li>Service providers who assist in operating our website (e.g., Supabase for data storage, Vercel for hosting)</li>
              <li>Law enforcement or regulators when required by law</li>
              <li>No one else — we do not sell or rent your data</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bebas text-2xl text-[#f0f0f5] mb-3">8. Data Security</h2>
            <p>
              We implement reasonable technical and organizational measures to protect your information.
              No method of transmission over the internet is 100% secure, and we cannot guarantee
              absolute security.
            </p>
          </section>

          <section>
            <h2 className="font-bebas text-2xl text-[#f0f0f5] mb-3">9. Your Rights</h2>
            <p>You may contact us to:</p>
            <ul className="list-disc list-inside mt-3 flex flex-col gap-1.5">
              <li>Request access to personal information we hold about you</li>
              <li>Request correction or deletion of your information</li>
              <li>Opt out of marketing communications</li>
            </ul>
            <p className="mt-3">
              Contact:{" "}
              <a href="mailto:office@cradjusters.com" className="text-[#60a5fa] hover:underline">
                office@cradjusters.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="font-bebas text-2xl text-[#f0f0f5] mb-3">10. Children&apos;s Privacy</h2>
            <p>
              Our services are not directed to children under 13. We do not knowingly collect
              personal information from children.
            </p>
          </section>

          <section>
            <h2 className="font-bebas text-2xl text-[#f0f0f5] mb-3">11. Changes to This Policy</h2>
            <p>
              We may update this policy from time to time. The "Last updated" date at the top of
              this page reflects the most recent revision. Continued use of the site after changes
              constitutes acceptance of the updated policy.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
