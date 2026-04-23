import Link from "next/link"
import MobileNav from "./MobileNav"

export default function MarketingNav({ activePath }: { activePath?: string }) {
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 40,
      background: "rgba(255,255,255,.85)",
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      borderBottom: "1px solid #F3F4F6",
    }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 32px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ fontFamily: '"Stylus ITC Std", "Snell Roundhand", cursive', fontSize: 26, color: "#111827", lineHeight: 1, textDecoration: "none" }}>Approva</Link>
        {/* Desktop nav — hidden below 860px via Tailwind */}
        <nav className="hidden md-nav:flex" style={{ gap: 4 }}>
          {([["/#how", "How it works"], ["/#pricing", "Pricing"], ["/about", "About"]] as [string, string][]).map(([href, label]) => (
            <a key={href} href={href} style={{ fontSize: 14, padding: "8px 12px", borderRadius: 6, color: href === activePath ? "#4F46E5" : "#6B7280", fontWeight: href === activePath ? 500 : 400, textDecoration: "none" }}>{label}</a>
          ))}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {/* Login — hidden below 860px */}
          <Link href="/login" className="hidden md-nav:block" style={{ fontSize: 14, color: "#6B7280", textDecoration: "none" }}>Log in</Link>
          <Link href="/signup" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 500, padding: "10px 16px", borderRadius: 8, background: "#4F46E5", color: "#fff", textDecoration: "none" }}>Start free</Link>
          {/* Hamburger — hidden above 860px */}
          <div className="block md-nav:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  )
}
