import Link from "next/link"
import MarketingNav from "./MarketingNav"
import MarketingFooter from "./MarketingFooter"

export default function NotFound() {
  return (
    <div style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <MarketingNav />

      {/* 404 */}
      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "64px 32px", background: "#F9FAFB", borderTop: "1px solid #F3F4F6" }}>
        <div style={{ maxWidth: 520, textAlign: "center" }}>
          <div style={{ fontSize: 128, lineHeight: 1, letterSpacing: "-0.04em", fontWeight: 700, color: "#111827", margin: "0 0 24px", display: "inline-flex", alignItems: "baseline" }}>
            4
            <span style={{ color: "#4F46E5", position: "relative", display: "inline-block" }}>
              0
              <span style={{
                position: "absolute",
                inset: "12% 12%",
                border: "8px solid #4F46E5",
                borderRadius: "50%",
                pointerEvents: "none",
              }} />
            </span>
            4
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 12px", color: "#111827" }}>
            This page doesn&apos;t exist
          </h1>
          <p style={{ fontSize: 16, color: "#6B7280", lineHeight: 1.55, margin: "0 0 28px" }}>
            The link may be broken, or the page may have moved. Either way, you&apos;re not in the right place.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 15, fontWeight: 500, padding: "12px 20px", borderRadius: 8, background: "#4F46E5", color: "#fff", textDecoration: "none" }}>
              Back to home
            </Link>
            <a href="mailto:hello@approva.app" style={{ display: "inline-flex", alignItems: "center", fontSize: 15, fontWeight: 500, padding: "12px 20px", borderRadius: 8, background: "#fff", color: "#111827", border: "1px solid #D1D5DB", textDecoration: "none" }}>
              Contact us
            </a>
          </div>
        </div>
      </main>

      <MarketingFooter />
    </div>
  )
}
