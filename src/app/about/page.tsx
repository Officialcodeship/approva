import Link from "next/link"
import { SITE_CONFIG } from "@/lib/config"
import MarketingNav from "../MarketingNav"
import MarketingFooter from "../MarketingFooter"

const GH_SVG = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.72 1.27 3.38.97.1-.75.4-1.27.74-1.56-2.56-.29-5.25-1.28-5.25-5.72 0-1.26.45-2.3 1.18-3.11-.12-.29-.51-1.47.11-3.06 0 0 .97-.31 3.18 1.19a11.04 11.04 0 0 1 5.78 0c2.2-1.5 3.17-1.19 3.17-1.19.62 1.59.23 2.77.11 3.06.74.81 1.18 1.85 1.18 3.11 0 4.45-2.7 5.43-5.26 5.71.41.36.78 1.06.78 2.15v3.18c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/></svg>
)

const S = {
  page: { fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif", color: "#111827", minHeight: "100vh", display: "flex", flexDirection: "column" as const },
  wrap: { maxWidth: 1120, margin: "0 auto", padding: "0 32px" },
}

export default function AboutPage() {
  return (
    <div style={S.page}>
      <MarketingNav activePath="/about" />

      {/* HERO */}
      <section style={{ padding: "96px 0 64px", borderBottom: "1px solid #F3F4F6" }}>
        <div style={S.wrap}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#4F46E5", marginBottom: 18 }}>About</div>
          <h1 style={{ fontSize: 52, lineHeight: 1.05, letterSpacing: "-0.025em", fontWeight: 700, margin: "0 0 24px", color: "#111827", maxWidth: 780 }}>
            Approva is a build-in-public project.
          </h1>
          <p style={{ fontSize: 18, color: "#6B7280", lineHeight: 1.6, margin: "0 0 16px", maxWidth: 680 }}>
            Built to show what focused, fast product work looks like in 2026. Tight scope, frequent shipping, done in the open.
          </p>
          <p style={{ fontSize: 18, color: "#6B7280", lineHeight: 1.6, margin: 0, maxWidth: 680 }}>
            The codebase is public. The decisions are documented. Read the commits.
          </p>
        </div>
      </section>

      {/* HOW WE BUILT THIS */}
      <section style={{ padding: "72px 0", borderTop: "1px solid #F3F4F6" }}>
        <div style={S.wrap}>
          <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 16px", color: "#111827" }}>How we built this</h2>
          <p style={{ fontSize: 16, lineHeight: 1.65, color: "#374151", margin: "0 0 16px", maxWidth: 680 }}>
            Approva went from a one-paragraph brief to a live product in a matter of weeks. The codebase is public and the methodology is not a secret. If you want to see what small-team product work looks like in 2026, read through the commits.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20, marginTop: 32 }}>
            {[
              { n: "01", title: "Tight scoping", body: "One workflow: client content approvals for social media agencies. No chat, no scheduling, no AI captions. One surface, done well." },
              { n: "02", title: "AI-assisted build", body: "Claude and Cursor wrote most of the code. Humans designed the system, chose the constraints, and reviewed every merge. Fast, not hands-off." },
              { n: "03", title: "Weeks, not months", body: "From blank repo to three shipped surfaces (client review, agency dashboard, auth) in under four weeks. Including the marketing site you're reading now." },
              { n: "04", title: "Public by default", body: "The entire codebase, design system, and product spec are on GitHub. Fork it, study it, or tell us we got something wrong. The link is right there." },
            ].map(({ n, title, body }) => (
              <div key={n} style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: 24 }}>
                <div style={{ fontFamily: "ui-monospace, monospace", fontSize: 12, color: "#4F46E5", marginBottom: 14, letterSpacing: "0.04em" }}>{n}</div>
                <h3 style={{ fontSize: 17, fontWeight: 600, margin: "0 0 8px", letterSpacing: "-0.01em", color: "#111827" }}>{title}</h3>
                <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.55, margin: 0 }}>{body}</p>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" as const, marginTop: 28 }}>
            <a href={SITE_CONFIG.githubUrl} style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 15, fontWeight: 500, padding: "12px 20px", borderRadius: 8, background: "#111827", color: "#fff", textDecoration: "none" }}>
              {GH_SVG}
              View on GitHub
            </a>
            <Link href="/#how" style={{ display: "inline-flex", alignItems: "center", fontSize: 15, fontWeight: 500, padding: "12px 20px", borderRadius: 8, background: "#fff", color: "#111827", border: "1px solid #D1D5DB", textDecoration: "none" }}>
              See the product
            </Link>
          </div>
        </div>
      </section>

      {/* CTA — See the code */}
      <section style={{ background: "#111827", color: "#fff", padding: "80px 0", textAlign: "center" }}>
        <div style={S.wrap}>
          <h2 style={{ fontSize: 38, lineHeight: 1.1, letterSpacing: "-0.025em", fontWeight: 700, margin: "0 auto 28px", maxWidth: 640, color: "#fff" }}>
            The whole thing is open source.
          </h2>
          <a href={SITE_CONFIG.githubUrl} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 15, fontWeight: 500, padding: "12px 20px", borderRadius: 8, background: "#fff", color: "#111827", textDecoration: "none" }}>
            {GH_SVG}
            See the code on GitHub
          </a>
        </div>
      </section>

      <MarketingFooter />
    </div>
  )
}
