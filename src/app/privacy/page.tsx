import Link from "next/link"
import { SITE_CONFIG } from "@/lib/config"
import MarketingNav from "../MarketingNav"
import MarketingFooter from "../MarketingFooter"

const S = {
  page: { fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif", color: "#111827", minHeight: "100vh", display: "flex", flexDirection: "column" as const },
  wrapProse: { maxWidth: 760, margin: "0 auto", padding: "0 32px" },
}

const tocItems = [
  ["collect", "Information we collect"],
  ["use", "How we use information"],
  ["sharing", "Data sharing"],
  ["retention", "Data retention"],
  ["cookies", "Cookies"],
  ["rights", "User rights"],
  ["security", "Data security"],
  ["children", "Children's privacy"],
  ["international", "International transfers"],
  ["changes", "Changes to policy"],
  ["contact", "Contact"],
]

const h2 = { fontSize: 22, fontWeight: 600, letterSpacing: "-0.015em", margin: "48px 0 16px", color: "#111827", scrollMarginTop: 80 }
const h3 = { fontSize: 16, fontWeight: 600, margin: "20px 0 8px", color: "#111827" }
const p = { fontSize: 16, lineHeight: 1.65, color: "#374151", margin: "0 0 16px" }
const ul = { paddingLeft: 20, margin: "0 0 16px", color: "#374151", fontSize: 16, lineHeight: 1.65 }
const li = { marginBottom: 8 }
const link = { color: "#4F46E5", textDecoration: "underline", textDecorationColor: "#EEF2FF" }

export default function PrivacyPage() {
  return (
    <div style={S.page}>
      <MarketingNav />

      {/* PAGE HERO */}
      <section style={{ background: "#F9FAFB", padding: "56px 0 48px", borderBottom: "1px solid #F3F4F6" }}>
        <div style={S.wrapProse}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "#4F46E5", marginBottom: 14 }}>Legal</div>
          <h1 style={{ fontSize: 44, lineHeight: 1.08, letterSpacing: "-0.025em", fontWeight: 700, margin: "0 0 12px", color: "#111827" }}>Privacy Policy</h1>
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

          <p style={p}>This Privacy Policy describes how Approva (&ldquo;we,&rdquo; &ldquo;us,&rdquo; &ldquo;our&rdquo;) collects, uses, and shares information when you use our Service. We aim to be clear about what we do with your data and to collect only what we need.</p>

          <h2 id="collect" style={h2}>1. Information we collect</h2>
          <h3 style={h3}>Information you provide</h3>
          <ul style={ul}>
            <li style={li}><strong>Account information</strong>:name, email, password hash, agency name, billing details.</li>
            <li style={li}><strong>Client workspace content</strong>:images, captions, platform metadata, scheduled dates, and comments you upload.</li>
            <li style={li}><strong>End-client information</strong>:the name your client enters when approving a post. Collected once and cached locally on their device.</li>
            <li style={li}><strong>Communications</strong>:messages you send us via support or email.</li>
          </ul>
          <h3 style={h3}>Information collected automatically</h3>
          <ul style={ul}>
            <li style={li}><strong>Usage data</strong>:pages viewed, actions taken, timestamps, session duration.</li>
            <li style={li}><strong>Device and log data</strong>:IP address, browser type, operating system, referring URL.</li>
            <li style={li}><strong>Audit metadata</strong>:timestamps and IP addresses associated with approval actions, stored to provide the audit trail feature.</li>
          </ul>

          <h2 id="use" style={h2}>2. How we use information</h2>
          <p style={p}>We use the information we collect to:</p>
          <ul style={ul}>
            <li style={li}>Operate, maintain, and improve the Service.</li>
            <li style={li}>Process payments and manage subscriptions.</li>
            <li style={li}>Send transactional emails (approval link notifications, reminders, billing receipts).</li>
            <li style={li}>Provide the audit trail feature.</li>
            <li style={li}>Respond to support requests.</li>
            <li style={li}>Detect and prevent fraud, abuse, and security incidents.</li>
            <li style={li}>Comply with legal obligations.</li>
          </ul>
          <p style={p}>We do not sell your personal information. We do not use your uploaded content to train machine learning models.</p>

          <h2 id="sharing" style={h2}>3. Data sharing</h2>
          <p style={p}>We share information only with service providers who help us operate the Service, and only to the extent necessary. These include:</p>
          <ul style={ul}>
            <li style={li}><strong>Hosting and database</strong> (Supabase):stores account data and uploaded content.</li>
            <li style={li}><strong>Payment processing</strong> (Stripe):handles subscription billing.</li>
            <li style={li}><strong>Email delivery</strong> (Resend):sends approval links, reminders, and receipts.</li>
            <li style={li}><strong>Analytics</strong>:aggregated, anonymized usage metrics only.</li>
          </ul>
          <p style={p}>We may also disclose information if required by law, to protect our rights or the safety of others, or in connection with a merger, acquisition, or sale of assets. In that case we will notify you in advance.</p>

          <h2 id="retention" style={h2}>4. Data retention</h2>
          <p style={p}>We retain account data and content for as long as your account is active. Upon account deletion, we remove personal data within 30 days, except where we are required by law to retain it longer or where the data is necessary for legitimate business purposes such as fraud prevention.</p>
          <p style={p}>Audit log entries are append-only and retained for the life of the workspace. You may export and then delete workspaces at any time.</p>

          <h2 id="cookies" style={h2}>5. Cookies</h2>
          <p style={p}>We use a small number of cookies and similar technologies:</p>
          <ul style={ul}>
            <li style={li}><strong>Essential cookies</strong>:for authentication and session management. These cannot be disabled.</li>
            <li style={li}><strong>Functional cookies</strong>:to remember preferences such as the client name entered on the review page.</li>
            <li style={li}><strong>Analytics</strong>:first-party, aggregated. No third-party advertising cookies.</li>
          </ul>

          <h2 id="rights" style={h2}>6. User rights</h2>
          <p style={p}>Depending on your location, you may have the right to:</p>
          <ul style={ul}>
            <li style={li}>Access the personal information we hold about you.</li>
            <li style={li}>Correct inaccurate or incomplete information.</li>
            <li style={li}>Request deletion of your personal information.</li>
            <li style={li}>Export your data in a portable format.</li>
            <li style={li}>Object to or restrict certain processing.</li>
            <li style={li}>Withdraw consent where processing is based on consent.</li>
          </ul>
          <p style={p}>To exercise these rights, contact <a href="mailto:privacy@approva.app" style={link}>privacy@approva.app</a>. We will respond within 30 days.</p>

          <h2 id="security" style={h2}>7. Data security</h2>
          <p style={p}>We use industry-standard safeguards: encryption in transit (TLS), encryption at rest, least-privilege access controls, and regular backups. No system is perfectly secure, but we take data protection seriously and will notify affected users of any material breach as required by law.</p>

          <h2 id="children" style={h2}>8. Children&apos;s privacy</h2>
          <p style={p}>The Service is not directed to children under 16, and we do not knowingly collect personal information from children. If you believe a child has provided us with personal information, contact us and we will delete it.</p>

          <h2 id="international" style={h2}>9. International transfers</h2>
          <p style={p}>We are based in the United States and our service providers may store or process data in the US and other jurisdictions. Where required, we rely on appropriate safeguards such as Standard Contractual Clauses to protect international transfers of personal data.</p>

          <h2 id="changes" style={h2}>10. Changes to this policy</h2>
          <p style={p}>We may update this Privacy Policy from time to time. Material changes will be communicated via email or in-product notice before they take effect. The &ldquo;last updated&rdquo; date at the top reflects the most recent revision.</p>

          <h2 id="contact" style={h2}>11. Contact</h2>
          <p style={p}>Questions about this policy or our data practices can be directed to <a href="mailto:privacy@approva.app" style={link}>privacy@approva.app</a>.</p>
        </div>
      </section>

      <MarketingFooter />
    </div>
  )
}
