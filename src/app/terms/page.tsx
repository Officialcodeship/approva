import Link from "next/link"
import { SITE_CONFIG } from "@/lib/config"
import MarketingNav from "../MarketingNav"
import MarketingFooter from "../MarketingFooter"

const S = {
  page: { fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif", color: "#111827", minHeight: "100vh", display: "flex", flexDirection: "column" as const },
  wrapProse: { maxWidth: 760, margin: "0 auto", padding: "0 32px" },
}

const tocItems = [
  ["acceptance", "Acceptance of terms"],
  ["service", "Description of service"],
  ["accounts", "User accounts"],
  ["payment", "Subscription and payment"],
  ["use", "Acceptable use"],
  ["ip", "Intellectual property"],
  ["content", "User content"],
  ["privacy", "Privacy"],
  ["termination", "Termination"],
  ["disclaimers", "Disclaimers"],
  ["liability", "Limitation of liability"],
  ["changes", "Changes to terms"],
  ["contact", "Contact"],
]

const h2 = { fontSize: 22, fontWeight: 600, letterSpacing: "-0.015em", margin: "48px 0 16px", color: "#111827", scrollMarginTop: 80 }
const p = { fontSize: 16, lineHeight: 1.65, color: "#374151", margin: "0 0 16px" }
const ul = { paddingLeft: 20, margin: "0 0 16px", color: "#374151", fontSize: 16, lineHeight: 1.65 }
const li = { marginBottom: 8 }
const link = { color: "#4F46E5", textDecoration: "underline", textDecorationColor: "#EEF2FF" }

export default function TermsPage() {
  return (
    <div style={S.page}>
      <MarketingNav />

      {/* PAGE HERO */}
      <section style={{ background: "#F9FAFB", padding: "56px 0 48px", borderBottom: "1px solid #F3F4F6" }}>
        <div style={S.wrapProse}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "#4F46E5", marginBottom: 14 }}>Legal</div>
          <h1 style={{ fontSize: 44, lineHeight: 1.08, letterSpacing: "-0.025em", fontWeight: 700, margin: "0 0 12px", color: "#111827" }}>Terms of Service</h1>
          <div style={{ fontSize: 13, color: "#9CA3AF" }}>Last updated: April 23, 2026</div>
        </div>
      </section>

      {/* PROSE */}
      <section style={{ padding: "56px 0 80px" }}>
        <div style={S.wrapProse}>
          {/* TOC */}
          <div style={{ background: "#F9FAFB", border: "1px solid #F3F4F6", borderRadius: 12, padding: 24, marginBottom: 48 }}>
            <h4 style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "#6B7280", margin: "0 0 16px" }}>Contents</h4>
            <ol style={{ margin: 0, paddingLeft: 20, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "6px 32px" }}>
              {tocItems.map(([id, label]) => (
                <li key={id} style={{ fontSize: 14, color: "#374151" }}>
                  <a href={`#${id}`} style={link}>{label}</a>
                </li>
              ))}
            </ol>
          </div>

          <p style={p}>These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of Approva (&ldquo;the Service&rdquo;), operated by Approva (&ldquo;we,&rdquo; &ldquo;us,&rdquo; &ldquo;our&rdquo;). By creating an account or using the Service you agree to be bound by these Terms. Read them carefully.</p>

          <h2 id="acceptance" style={h2}>1. Acceptance of terms</h2>
          <p style={p}>By accessing or using Approva, you confirm that you are at least 18 years old, have the authority to enter into a binding agreement, and agree to these Terms. If you are using the Service on behalf of an organization, you represent that you have authority to bind that organization, and &ldquo;you&rdquo; refers to that organization.</p>
          <p style={p}>If you do not agree to these Terms, do not use the Service.</p>

          <h2 id="service" style={h2}>2. Description of service</h2>
          <p style={p}>Approva provides social media agencies with a branded client-approval workflow: a hosted portal where clients can review, approve, or request changes to content, with timestamped audit logs and automated reminders.</p>
          <p style={p}>Features, limits, and availability may change at any time. We may add, remove, or modify functionality at our discretion.</p>

          <h2 id="accounts" style={h2}>3. User accounts</h2>
          <p style={p}>To access most features you must create an account. You agree to:</p>
          <ul style={ul}>
            <li style={li}>Provide accurate, current, and complete information during registration.</li>
            <li style={li}>Maintain the security of your password and account credentials.</li>
            <li style={li}>Notify us promptly of any unauthorized access or security breach.</li>
            <li style={li}>Accept responsibility for all activity that occurs under your account.</li>
          </ul>
          <p style={p}>You may not share your account credentials, transfer your account, or create an account on behalf of another party without authorization.</p>

          <h2 id="payment" style={h2}>4. Subscription and payment</h2>
          <p style={p}>Approva offers a free tier and paid subscription plans. Paid plans are billed in advance on a monthly or annual basis via the payment processor we designate at time of purchase.</p>
          <h3 style={{ fontSize: 16, fontWeight: 600, margin: "20px 0 8px", color: "#111827" }}>Billing</h3>
          <p style={p}>You authorize us to charge the payment method on file for all fees. Fees are non-refundable except where required by law. If payment fails, we may suspend or downgrade your account after reasonable notice.</p>
          <h3 style={{ fontSize: 16, fontWeight: 600, margin: "20px 0 8px", color: "#111827" }}>Plan changes</h3>
          <p style={p}>You may upgrade or downgrade at any time. Upgrades take effect immediately and are prorated. Downgrades take effect at the next billing cycle.</p>
          <h3 style={{ fontSize: 16, fontWeight: 600, margin: "20px 0 8px", color: "#111827" }}>Price changes</h3>
          <p style={p}>We may change pricing with at least 30 days&apos; written notice. Continued use after the effective date constitutes acceptance of the new pricing.</p>

          <h2 id="use" style={h2}>5. Acceptable use</h2>
          <p style={p}>You agree not to:</p>
          <ul style={ul}>
            <li style={li}>Use the Service for any unlawful, fraudulent, or harmful purpose.</li>
            <li style={li}>Upload content that infringes intellectual property rights or violates the privacy or publicity rights of others.</li>
            <li style={li}>Transmit malware, viruses, or other malicious code.</li>
            <li style={li}>Attempt to gain unauthorized access to the Service, other accounts, or our infrastructure.</li>
            <li style={li}>Interfere with or disrupt the integrity or performance of the Service.</li>
            <li style={li}>Scrape, crawl, or harvest data from the Service without written permission.</li>
            <li style={li}>Resell, sublicense, or white-label the Service outside the provisions of your plan.</li>
          </ul>
          <p style={p}>We reserve the right to investigate and take appropriate action against any violation, including suspension or termination.</p>

          <h2 id="ip" style={h2}>6. Intellectual property</h2>
          <p style={p}>The Service, including its software, design, text, graphics, and trademarks (other than User Content), is owned by us or our licensors and protected by intellectual property laws. We grant you a limited, non-exclusive, non-transferable, revocable license to use the Service in accordance with these Terms.</p>
          <p style={p}>You may not copy, modify, distribute, sell, or lease any part of the Service without our written consent.</p>

          <h2 id="content" style={h2}>7. User content</h2>
          <p style={p}>&ldquo;User Content&rdquo; means any content you or your clients upload to the Service, including images, captions, comments, and approval decisions. You retain ownership of your User Content.</p>
          <p style={p}>By uploading User Content, you grant us a worldwide, non-exclusive, royalty-free license to host, store, display, and transmit the content solely for the purpose of operating and improving the Service.</p>
          <p style={p}>You are responsible for ensuring you have the rights to all User Content you submit and that it does not violate any third-party rights or laws.</p>

          <h2 id="privacy" style={h2}>8. Privacy</h2>
          <p style={p}>Our <a href="/privacy" style={link}>Privacy Policy</a> describes how we collect, use, and share information. By using the Service, you consent to our handling of personal information as described there.</p>

          <h2 id="termination" style={h2}>9. Termination</h2>
          <p style={p}>You may cancel your account at any time from your account settings. Upon cancellation, your access to paid features ends at the conclusion of the current billing period.</p>
          <p style={p}>We may suspend or terminate your account at any time if you breach these Terms, engage in fraudulent activity, or pose a security or legal risk to us or other users. Upon termination, provisions that by their nature should survive (including intellectual property, disclaimers, limitation of liability, and dispute resolution) will remain in effect.</p>

          <h2 id="disclaimers" style={h2}>10. Disclaimers</h2>
          <p style={p}>The Service is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any kind, whether express or implied, including warranties of merchantability, fitness for a particular purpose, non-infringement, and uninterrupted or error-free operation.</p>
          <p style={p}>We do not warrant that the Service will meet your requirements, be available at any particular time or location, or be free of viruses or other harmful components.</p>

          <h2 id="liability" style={h2}>11. Limitation of liability</h2>
          <p style={p}>To the maximum extent permitted by law, in no event shall Approva, its affiliates, directors, employees, or agents be liable for any indirect, incidental, special, consequential, or punitive damages (including lost profits, revenue, data, or goodwill) arising from or related to your use of the Service.</p>
          <p style={p}>Our total aggregate liability for any claim arising from these Terms or the Service shall not exceed the greater of (a) the fees you paid us in the twelve months preceding the event, or (b) one hundred U.S. dollars ($100).</p>

          <h2 id="changes" style={h2}>12. Changes to terms</h2>
          <p style={p}>We may revise these Terms from time to time. Material changes will be communicated via email or an in-product notice at least 14 days before they take effect. Continued use of the Service after the effective date constitutes acceptance of the revised Terms.</p>

          <h2 id="contact" style={h2}>13. Contact</h2>
          <p style={p}>Questions about these Terms can be directed to <a href="mailto:hello@approva.app" style={link}>hello@approva.app</a>.</p>
        </div>
      </section>

      <MarketingFooter />
    </div>
  )
}
