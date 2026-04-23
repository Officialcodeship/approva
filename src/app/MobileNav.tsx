"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function MobileNav() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 860) setOpen(false)
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  return (
    <>
      {/* Hamburger button — shown on mobile only via inline style; CSS media query handled in page.tsx */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          width: 44, height: 44, background: "none", border: "none",
          cursor: "pointer", color: "#111827", borderRadius: 8, flexShrink: 0,
        }}
        className="mobile-hamburger"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="6" x2="21" y2="6"/>
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{ position: "fixed", inset: 0, zIndex: 45, background: "rgba(0,0,0,.4)" }}
        />
      )}

      {/* Drawer */}
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0,
        width: "min(320px, 85vw)",
        background: "#fff", borderLeft: "1px solid #F3F4F6",
        zIndex: 50, display: "flex", flexDirection: "column",
        padding: "24px 24px 40px",
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition: "transform 250ms cubic-bezier(.4,0,.2,1)",
        boxShadow: "-8px 0 32px rgba(0,0,0,.08)",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
          <div style={{ fontFamily: '"Stylus ITC Std", "Snell Roundhand", cursive', fontSize: 24, color: "#111827" }}>Approva</div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            style={{ width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", cursor: "pointer", color: "#6B7280", borderRadius: 8 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
            </svg>
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
          {[["#how", "How it works"], ["#pricing", "Pricing"], ["/about", "About"]].map(([href, label]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              style={{ fontSize: 16, padding: "12px 8px", borderRadius: 8, color: "#111827", display: "flex", alignItems: "center", minHeight: 44, textDecoration: "none" }}
            >
              {label}
            </a>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 24, paddingTop: 24, borderTop: "1px solid #F3F4F6" }}>
          <Link
            href="/login"
            onClick={() => setOpen(false)}
            style={{ display: "block", textAlign: "center", fontSize: 15, fontWeight: 500, padding: "12px 20px", borderRadius: 8, background: "#fff", color: "#111827", border: "1px solid #D1D5DB", textDecoration: "none" }}
          >
            Log in
          </Link>
          <Link
            href="/signup"
            onClick={() => setOpen(false)}
            style={{ display: "block", textAlign: "center", fontSize: 15, fontWeight: 500, padding: "12px 20px", borderRadius: 8, background: "#4F46E5", color: "#fff", textDecoration: "none" }}
          >
            Start free
          </Link>
        </div>
      </div>
    </>
  )
}
