import { SITE_CONFIG } from "@/lib/config"

const GH_SVG = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.72 1.27 3.38.97.1-.75.4-1.27.74-1.56-2.56-.29-5.25-1.28-5.25-5.72 0-1.26.45-2.3 1.18-3.11-.12-.29-.51-1.47.11-3.06 0 0 .97-.31 3.18 1.19a11.04 11.04 0 0 1 5.78 0c2.2-1.5 3.17-1.19 3.17-1.19.62 1.59.23 2.77.11 3.06.74.81 1.18 1.85 1.18 3.11 0 4.45-2.7 5.43-5.26 5.71.41.36.78 1.06.78 2.15v3.18c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/></svg>
)

const wrap = { maxWidth: 1120, margin: "0 auto", padding: "0 32px" }

export default function MarketingFooter() {
  return (
    <footer className="lp-footer-outer" style={{ background: "#111827", paddingTop: 72, color: "rgba(255,255,255,.5)", fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif", marginTop: "auto" }}>
      <div className="lp-footer-inner" style={wrap}>
        <div className="lp-footer-grid" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 48, paddingBottom: 48 }}>
          <div>
            <div style={{ fontFamily: '"Stylus ITC Std", "Snell Roundhand", cursive', color: "#fff", fontSize: 24, lineHeight: 1, marginBottom: 14 }}>Approva</div>
            <div style={{ fontSize: 14, lineHeight: 1.6, color: "rgba(255,255,255,.5)", maxWidth: 300 }}>Client content approval for social media agencies. One branded link, one-click approvals, a full audit trail.</div>
          </div>
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "rgba(255,255,255,.4)", margin: "0 0 16px" }}>Product</h4>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column" as const, gap: 10 }}>
              {[["/#how", "Features"], ["/#pricing", "Pricing"], ["/signup", "Sign up"], ["/login", "Log in"]].map(([href, label]) => (
                <li key={label}><a href={href} style={{ fontSize: 14, color: "rgba(255,255,255,.5)", textDecoration: "none" }}>{label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "rgba(255,255,255,.4)", margin: "0 0 16px" }}>Company</h4>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column" as const, gap: 10 }}>
              {[["/about", "About"], ["/terms", "Terms"], ["/privacy", "Privacy"], [`mailto:${SITE_CONFIG.contactEmail}`, "Contact"]].map(([href, label]) => (
                <li key={label}><a href={href} style={{ fontSize: 14, color: "rgba(255,255,255,.5)", textDecoration: "none" }}>{label}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,.08)", padding: "24px 0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" as const }}>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,.4)" }}>© 2026 Approva. All rights reserved.</div>
          <a href={SITE_CONFIG.githubUrl} style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13, color: "rgba(255,255,255,.4)", textDecoration: "none" }}>
            {GH_SVG}
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
