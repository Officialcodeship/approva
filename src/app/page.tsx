import Link from "next/link"
import MobileNav from "./MobileNav"
import MarketingFooter from "./MarketingFooter"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif", color: "#111827" }}>

      {/* NAV */}
      <header style={{
        position: "sticky", top: 0, zIndex: 40,
        background: "rgba(255,255,255,.85)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderBottom: "1px solid #F3F4F6",
      }}>
        <div className="lp-nav-inner" style={{ maxWidth: 1120, margin: "0 auto", padding: "0 32px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ fontFamily: '"Stylus ITC Std", "Snell Roundhand", cursive', fontSize: 26, color: "#111827", lineHeight: 1, textDecoration: "none" }}>Approva</Link>
          <nav className="hidden md-nav:flex" style={{ gap: 4 }}>
            {[["#how", "How it works"], ["#pricing", "Pricing"], ["/about", "About"]].map(([href, label]) => (
              <a key={href} href={href} style={{ fontSize: 14, padding: "8px 12px", borderRadius: 6, color: "#6B7280", textDecoration: "none" }}>{label}</a>
            ))}
          </nav>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <Link href="/login" className="hidden md-nav:block" style={{ fontSize: 14, color: "#6B7280", textDecoration: "none" }}>Log in</Link>
            <Link href="/signup" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 500, padding: "10px 16px", borderRadius: 8, background: "#4F46E5", color: "#fff", textDecoration: "none" }}>Start free</Link>
            <div className="block md-nav:hidden">
              <MobileNav />
            </div>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="lp-section" style={{ padding: "64px 0 40px", overflow: "hidden" }}>
        <div className="lp-section-inner" style={{ maxWidth: 1120, margin: "0 auto", padding: "0 32px" }}>
          <div className="lp-hero-grid" style={{ display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: 56, alignItems: "center" }}>
            {/* Copy */}
            <div>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 500, color: "#6B7280", padding: "5px 10px", borderRadius: 999, background: "#F3F4F6", marginBottom: 24 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4F46E5", display: "inline-block" }} />
                For social media agencies
              </span>
              <h1 className="lp-hero-h1" style={{ fontSize: 56, lineHeight: 1.04, letterSpacing: "-0.025em", fontWeight: 700, margin: "0 0 20px", color: "#111827" }}>
                Stop chasing client approvals on WhatsApp
              </h1>
              <p style={{ fontSize: 18, lineHeight: 1.55, color: "#6B7280", margin: "0 0 32px", maxWidth: 520 }}>
                Approva gives social media agencies a branded portal where clients approve content in one click. Full audit trail, no login required.
              </p>
              <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                <Link href="/signup" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 15, fontWeight: 500, padding: "12px 20px", borderRadius: 8, background: "#4F46E5", color: "#fff", textDecoration: "none" }}>
                  Start free
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </Link>
                <a href="#how" style={{ display: "inline-flex", alignItems: "center", fontSize: 15, fontWeight: 500, padding: "12px 20px", borderRadius: 8, background: "#fff", color: "#111827", border: "1px solid #D1D5DB", textDecoration: "none" }}>
                  See how it works
                </a>
              </div>
              <div style={{ marginTop: 20, fontSize: 13, color: "#9CA3AF", display: "flex", alignItems: "center", gap: 8 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                Free plan · 2 client workspaces · no credit card
              </div>
            </div>

            {/* Visual */}
            <div className="lp-hero-visual" style={{ position: "relative", minHeight: 560 }}>
              {/* Agency dashboard card */}
              <div className="lp-hero-dashboard" style={{ position: "absolute", top: 40, left: 0, right: 120, background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, boxShadow: "0 24px 50px -20px rgba(17,24,39,.15), 0 8px 20px -8px rgba(17,24,39,.08)", overflow: "hidden" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderBottom: "1px solid #F3F4F6", background: "#F9FAFB" }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#D1D5DB", display: "inline-block" }} />
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#D1D5DB", display: "inline-block" }} />
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#D1D5DB", display: "inline-block" }} />
                  <div style={{ flex: 1, textAlign: "center", fontSize: 11, color: "#9CA3AF", fontFamily: "ui-monospace, monospace", padding: "4px 10px", background: "#fff", borderRadius: 5, border: "1px solid #F3F4F6" }}>novacoffee.approva-app.vercel.app/workspaces/march</div>
                </div>
                <div style={{ padding: "18px 20px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 600, margin: 0, color: "#111827", letterSpacing: "-0.01em" }}>March 2026</h3>
                    <div style={{ fontSize: 11, color: "#9CA3AF", display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#D97706", display: "inline-block" }} />
                      Nova Coffee
                    </div>
                  </div>
                  {[
                    { color: "linear-gradient(135deg,#FDE68A,#F59E0B)", platform: "Instagram", date: "Mar 4", cap: "Friday drop: cold brew, batch 02", badge: "Approved", bc: "#D1FAE5", tc: "#15803D" },
                    { color: "linear-gradient(135deg,#E0E7FF,#6366F1)", platform: "LinkedIn", date: "Mar 11", cap: "We're hiring: head of wholesale", badge: "Changes", bc: "#FEF3C7", tc: "#B45309" },
                    { color: "linear-gradient(135deg,#DCFCE7,#22C55E)", platform: "Instagram", date: "Mar 18", cap: "Weekend pairing: espresso + bun", badge: "Sent", bc: "#DBEAFE", tc: "#1D4ED8" },
                    { color: "linear-gradient(135deg,#FCE7F3,#EC4899)", platform: "TikTok", date: "Mar 25", cap: "60 seconds inside the roast", badge: "Pending", bc: "#F3F4F6", tc: "#4B5563" },
                  ].map((row, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderTop: i === 0 ? 0 : "1px solid #F3F4F6", paddingTop: i === 0 ? 2 : 10 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 6, flexShrink: 0, background: row.color }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 12, fontWeight: 500, color: "#111827" }}>{row.platform} <span style={{ color: "#D1D5DB" }}>·</span> <span style={{ color: "#9CA3AF", fontWeight: 400, fontSize: 11 }}>{row.date}</span></div>
                        <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 220 }}>{row.cap}</div>
                      </div>
                      <span style={{ display: "inline-flex", alignItems: "center", padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 500, background: row.bc, color: row.tc }}>{row.badge}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Phone mockup */}
              <div className="lp-hero-phone" style={{ position: "absolute", right: 0, bottom: 0, width: 260, transform: "rotate(2deg)" }}>
                <div style={{ width: "100%", aspectRatio: "260/534", background: "#111827", borderRadius: 34, padding: 7, boxShadow: "0 30px 60px -20px rgba(17,24,39,.35), 0 10px 20px -8px rgba(17,24,39,.18)" }}>
                  <div style={{ width: "100%", height: "100%", borderRadius: 27, background: "#F9FAFB", overflow: "hidden", position: "relative", display: "flex", flexDirection: "column" }}>
                    <div style={{ position: "absolute", top: 7, left: "50%", transform: "translateX(-50%)", width: 74, height: 18, background: "#000", borderRadius: 10, zIndex: 3 }} />
                    <div style={{ background: "rgba(255,255,255,.95)", borderTop: "3px solid #4F46E5", borderBottom: "1px solid #F3F4F6", padding: "20px 14px 8px", display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 22 }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: "#111827" }}>Harbor &amp; Co.</div>
                      <div style={{ fontSize: 9, color: "#9CA3AF" }}>Mar 2026</div>
                    </div>
                    <div style={{ flex: 1, padding: "10px 12px", overflow: "hidden" }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#111827", letterSpacing: "-0.01em" }}>March 2026</div>
                      <div style={{ fontSize: 10, color: "#6B7280", marginTop: 2 }}>2 of 3 posts approved</div>
                      <div style={{ height: 4, background: "#E5E7EB", borderRadius: 999, overflow: "hidden", margin: "8px 0 10px" }}>
                        <div style={{ height: "100%", background: "#4F46E5", width: "66%", borderRadius: 999 }} />
                      </div>
                      <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, overflow: "hidden" }}>
                        <div style={{ aspectRatio: "1/1", background: "linear-gradient(135deg,#E0E7FF,#6366F1 60%,#4338CA)", position: "relative" }}>
                          <div style={{ position: "absolute", top: 6, left: 6, background: "rgba(0,0,0,.55)", color: "#fff", padding: "2px 6px", borderRadius: 999, fontSize: 8, fontWeight: 500 }}>Instagram</div>
                          <div style={{ position: "absolute", bottom: 8, left: 8, right: 8, color: "#fff", fontSize: 12, fontWeight: 700, lineHeight: 1.15, textShadow: "0 1px 8px rgba(0,0,0,.35)" }}>Weekend ritual</div>
                        </div>
                        <div style={{ padding: "8px 10px 10px" }}>
                          <div style={{ fontSize: 8, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.04em", color: "#9CA3AF", marginBottom: 4 }}>Instagram · Mar 18</div>
                          <div style={{ display: "flex", gap: 4 }}>
                            <button style={{ flex: 1, fontSize: 9, fontWeight: 600, padding: 6, borderRadius: 6, border: 0, background: "#4F46E5", color: "#fff" }}>Approve</button>
                            <button style={{ flex: 1, fontSize: 9, fontWeight: 600, padding: 6, borderRadius: 6, border: "1px solid #D1D5DB", background: "#fff", color: "#111827" }}>Changes</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="lp-section" style={{ padding: "80px 0", borderTop: "1px solid #F3F4F6" }}>
        <div className="lp-section-inner" style={{ maxWidth: 1120, margin: "0 auto", padding: "0 32px" }}>
          <div style={{ textAlign: "center", margin: "0 auto 48px", maxWidth: 640 }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#4F46E5", marginBottom: 14 }}>The problem</div>
            <h2 className="lp-h2" style={{ fontSize: 40, lineHeight: 1.1, letterSpacing: "-0.02em", fontWeight: 700, margin: "0 0 12px", color: "#111827" }}>Your client approval workflow is broken</h2>
            <p style={{ fontSize: 17, color: "#6B7280", lineHeight: 1.55, margin: 0 }}>You&apos;re an agency, not a group chat moderator. But somehow every month ends the same way.</p>
          </div>
          <div className="lp-problem-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {[
              {
                icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
                title: "Approvals lost in WhatsApp threads",
                body: "Client feedback scattered across DMs, voice notes, and email replies. You're scrolling three apps to find a single 'ok go'.",
              },
              {
                icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M9 15h6"/><path d="M9 11h6"/></svg>,
                title: "No record of who approved what",
                body: "When a post sparks a complaint, you can't prove the client signed off. Screenshots aren't a paper trail.",
              },
              {
                icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
                title: "Clients forget to respond",
                body: "Silence for six days, then a furious reply ten minutes after the post goes live. You're stuck apologizing for their pace.",
              },
            ].map((card) => (
              <div key={card.title} style={{ padding: "28px 24px", borderRadius: 12, border: "1px solid #E5E7EB", background: "#F9FAFB" }}>
                <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: 8, background: "#fff", border: "1px solid #E5E7EB", color: "#6B7280", marginBottom: 20 }}>
                  {card.icon}
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 600, margin: "0 0 8px", color: "#111827", letterSpacing: "-0.01em" }}>{card.title}</h3>
                <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.5, margin: 0 }}>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="lp-section" style={{ padding: "80px 0", borderTop: "1px solid #F3F4F6" }}>
        <div className="lp-section-inner" style={{ maxWidth: 960, margin: "0 auto", padding: "0 32px" }}>
          <div style={{ textAlign: "center", margin: "0 auto 48px", maxWidth: 640 }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#4F46E5", marginBottom: 14 }}>The fix</div>
            <h2 className="lp-h2" style={{ fontSize: 40, lineHeight: 1.1, letterSpacing: "-0.02em", fontWeight: 700, margin: "0 0 12px", color: "#111827" }}>One link. One click. Full audit trail.</h2>
            <p style={{ fontSize: 17, color: "#6B7280", lineHeight: 1.55, margin: 0 }}>Approva gives you a single place to send content, and your client a single place to respond. Everything else is automatic.</p>
          </div>

          {/* Solution rows */}
          <div>
            {/* Row 1 */}
            <div className="lp-solution-row" style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 48, alignItems: "center", padding: "16px 0 40px", borderTop: 0 }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#4F46E5", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ height: 1, width: 24, background: "#4F46E5", opacity: 0.4, display: "inline-block" }} />
                  01 · Branded portal
                </div>
                <h3 style={{ fontSize: 26, fontWeight: 600, margin: "0 0 10px", letterSpacing: "-0.02em", color: "#111827", lineHeight: 1.2 }}>Your client sees your brand, not ours.</h3>
                <p style={{ fontSize: 16, color: "#6B7280", lineHeight: 1.55, margin: 0 }}>Every workspace is a single link with your client&apos;s logo, colors, and name. No app install. No Approva signup. Your client opens it on their phone and approves in under two minutes.</p>
              </div>
              <div style={{ background: "#F9FAFB", border: "1px solid #F3F4F6", borderRadius: 14, padding: 24, minHeight: 240, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: "100%", maxWidth: 340, background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, overflow: "hidden", boxShadow: "0 8px 24px -12px rgba(17,24,39,.08)" }}>
                  <div style={{ height: 3, background: "#D97706" }} />
                  <div style={{ padding: "12px 16px", borderBottom: "1px solid #F3F4F6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>Nova Coffee</div>
                    <div style={{ fontSize: 11, color: "#9CA3AF" }}>March 2026</div>
                  </div>
                  <div style={{ aspectRatio: "16/9", background: "linear-gradient(135deg,#FDE68A,#F59E0B 60%,#B45309)", position: "relative" }}>
                    <div style={{ position: "absolute", bottom: 12, left: 14, color: "#fff", fontSize: 16, fontWeight: 700, textShadow: "0 1px 10px rgba(0,0,0,.3)" }}>Friday drop: cold brew, batch 02</div>
                  </div>
                  <div style={{ display: "flex", gap: 8, padding: 12 }}>
                    <div style={{ flex: 1, padding: 10, borderRadius: 8, fontSize: 12, fontWeight: 600, textAlign: "center", background: "#D97706", color: "#fff" }}>Approve</div>
                    <div style={{ flex: 1, padding: 10, borderRadius: 8, fontSize: 12, fontWeight: 600, textAlign: "center", background: "#fff", color: "#111827", border: "1px solid #D1D5DB" }}>Request changes</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="lp-solution-row" style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 48, alignItems: "center", padding: "40px 0", borderTop: "1px solid #F3F4F6" }}>
              <div style={{ order: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#4F46E5", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ height: 1, width: 24, background: "#4F46E5", opacity: 0.4, display: "inline-block" }} />
                  02 · Audit trail
                </div>
                <h3 style={{ fontSize: 26, fontWeight: 600, margin: "0 0 10px", letterSpacing: "-0.02em", color: "#111827", lineHeight: 1.2 }}>Every action timestamped and saved.</h3>
                <p style={{ fontSize: 16, color: "#6B7280", lineHeight: 1.55, margin: 0 }}>Who approved what, when, and from where. Append-only, exportable, and legally defensible. When the client asks &quot;did I sign off on that?&quot; you already have the receipt.</p>
              </div>
              <div style={{ background: "#F9FAFB", border: "1px solid #F3F4F6", borderRadius: 14, padding: 24, minHeight: 240, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: "100%", maxWidth: 360, background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12 }}>
                  <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase", color: "#9CA3AF", padding: "12px 16px", borderBottom: "1px solid #F3F4F6" }}>Audit log · March 2026</div>
                  {[
                    { dot: "#22C55E", name: "Sarah Kim", action: "approved", post: "Instagram post (Mar 4)", ts: "Mar 19, 2026 · 2:41 PM" },
                    { dot: "#F59E0B", name: "Sarah Kim", action: "requested changes on", post: "LinkedIn post", ts: "Mar 19, 2026 · 2:39 PM" },
                    { dot: "#22C55E", name: "Sarah Kim", action: "approved", post: "Instagram post (Feb 26)", ts: "Mar 19, 2026 · 2:37 PM" },
                  ].map((entry, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, padding: "12px 16px", borderBottom: i < 2 ? "1px solid #F3F4F6" : 0, alignItems: "flex-start" }}>
                      <span style={{ width: 7, height: 7, borderRadius: "50%", marginTop: 6, flexShrink: 0, background: entry.dot, display: "inline-block" }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.4 }}><strong style={{ color: "#111827", fontWeight: 500 }}>{entry.name}</strong> {entry.action} <span style={{ color: "#6B7280" }}>{entry.post}</span></div>
                        <div style={{ fontSize: 10, color: "#9CA3AF", marginTop: 2, fontVariantNumeric: "tabular-nums" }}>{entry.ts}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Row 3 */}
            <div className="lp-solution-row" style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 48, alignItems: "center", padding: "40px 0", borderTop: "1px solid #F3F4F6" }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#4F46E5", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ height: 1, width: 24, background: "#4F46E5", opacity: 0.4, display: "inline-block" }} />
                  03 · Reminders
                </div>
                <h3 style={{ fontSize: 26, fontWeight: 600, margin: "0 0 10px", letterSpacing: "-0.02em", color: "#111827", lineHeight: 1.2 }}>We nudge the client so you don&apos;t have to.</h3>
                <p style={{ fontSize: 16, color: "#6B7280", lineHeight: 1.55, margin: 0 }}>Automatic email reminders kick in 48 hours before the scheduled post date. Warm, polite, and in your agency&apos;s voice. You&apos;re never the one sending a &quot;hey just following up&quot; at 11pm.</p>
              </div>
              <div style={{ background: "#F9FAFB", border: "1px solid #F3F4F6", borderRadius: 14, padding: 24, minHeight: 240, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: "100%", maxWidth: 340, background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: "#EEF2FF", color: "#4F46E5", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>Reminder schedule</div>
                      <div style={{ fontSize: 11, color: "#9CA3AF" }}>Nova Coffee · March 2026</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {[
                      { time: "Mar 18", label: <><strong style={{ color: "#111827", fontWeight: 500 }}>Link sent</strong> to sarah@novacoffee.co</>, statusLabel: "Done", statusBg: "#D1FAE5", statusColor: "#15803D" },
                      { time: "Mar 21", label: <><strong style={{ color: "#111827", fontWeight: 500 }}>First reminder</strong> — 2 posts pending</>, statusLabel: "Sent", statusBg: "#DBEAFE", statusColor: "#1D4ED8" },
                      { time: "Mar 26", label: <><strong style={{ color: "#111827", fontWeight: 500 }}>Final reminder</strong> — 48h before due</>, statusLabel: "Scheduled", statusBg: "#F3F4F6", statusColor: "#4B5563", dim: true },
                    ].map((event, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12, opacity: event.dim ? 0.45 : 1 }}>
                        <span style={{ width: 58, color: "#9CA3AF", fontVariantNumeric: "tabular-nums", fontSize: 11, flexShrink: 0 }}>{event.time}</span>
                        <span style={{ flex: 1, color: "#6B7280" }}>{event.label}</span>
                        <span style={{ fontSize: 10, fontWeight: 500, padding: "2px 7px", borderRadius: 4, background: event.statusBg, color: event.statusColor }}>{event.statusLabel}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="lp-section" style={{ padding: "80px 0", borderTop: "1px solid #F3F4F6" }}>
        <div className="lp-section-inner" style={{ maxWidth: 1120, margin: "0 auto", padding: "0 32px" }}>
          <div style={{ textAlign: "center", margin: "0 auto 48px", maxWidth: 640 }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#4F46E5", marginBottom: 14 }}>How it works</div>
            <h2 className="lp-h2" style={{ fontSize: 40, lineHeight: 1.1, letterSpacing: "-0.02em", fontWeight: 700, margin: 0, color: "#111827" }}>Three steps, start to signed off</h2>
          </div>
          <div className="lp-steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", border: "1px solid #E5E7EB", borderRadius: 14, overflow: "hidden", background: "#fff" }}>
            {[
              {
                n: "01",
                visual: (
                  <div style={{ display: "flex", gap: 6, height: 72, alignItems: "stretch" }}>
                    {[
                      { bg: "linear-gradient(135deg,#FDE68A,#F59E0B)" },
                      { bg: "linear-gradient(135deg,#DCFCE7,#22C55E)" },
                      { bg: "linear-gradient(135deg,#E0E7FF,#6366F1)" },
                      { bg: "linear-gradient(135deg,#FCE7F3,#EC4899)" },
                      { icon: true },
                    ].map((tile, i) => (
                      <div key={i} style={{ flex: 1, borderRadius: 6, background: tile.icon ? "#F9FAFB" : tile.bg, border: tile.icon ? "1px dashed #D1D5DB" : "none", display: "flex", alignItems: "center", justifyContent: "center", color: "#9CA3AF" }}>
                        {tile.icon && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>}
                      </div>
                    ))}
                  </div>
                ),
                title: "Upload this month's content",
                body: "Add your posts: image, caption, platform, scheduled date. Organize them into a monthly workspace per client.",
              },
              {
                n: "02",
                visual: (
                  <div style={{ height: 72, display: "flex", alignItems: "center", gap: 8, background: "#F9FAFB", border: "1px solid #F3F4F6", borderRadius: 10, padding: 12 }}>
                    <div style={{ flex: 1, fontFamily: "ui-monospace, monospace", fontSize: 11, color: "#6B7280", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      <span style={{ color: "#4F46E5", fontWeight: 600 }}>novacoffee.approva-app.vercel.app</span>/review/Vc3qR9zN2xK…
                    </div>
                    <button style={{ background: "#fff", border: "1px solid #D1D5DB", padding: "6px 10px", borderRadius: 6, fontSize: 11, fontWeight: 500, color: "#111827", display: "inline-flex", alignItems: "center", gap: 4, flexShrink: 0, cursor: "pointer" }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                      Copy
                    </button>
                  </div>
                ),
                title: "Send one branded link to your client",
                body: "No login, no account, no app. Just a link. Your client opens it on their phone and starts reviewing.",
              },
              {
                n: "03",
                visual: (
                  <div style={{ height: 72, display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ flex: 1, border: "1px solid #E5E7EB", borderRadius: 10, padding: "8px 10px", background: "#fff", display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 44, height: 44, borderRadius: 6, background: "linear-gradient(135deg,#DCFCE7,#22C55E)", flexShrink: 0 }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 11, color: "#9CA3AF", fontWeight: 500 }}>Instagram · Mar 18</div>
                        <div style={{ fontSize: 12, color: "#111827", fontWeight: 500, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Weekend pairing…</div>
                      </div>
                    </div>
                    <div style={{ background: "#4F46E5", color: "#fff", padding: "8px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                      Approve
                    </div>
                  </div>
                ),
                title: "They approve each post in one click",
                body: "Approve, or request changes with a comment. You get notified instantly. Every action is logged, timestamped, saved.",
              },
            ].map((step, i) => (
              <div key={i} className="lp-step" style={{ padding: "36px 32px 40px", borderRight: i < 2 ? "1px solid #F3F4F6" : "none", position: "relative" }}>
                <div style={{ fontFamily: "ui-monospace, monospace", fontSize: 12, color: "#9CA3AF", marginBottom: 56, letterSpacing: "0.04em" }}>{step.n}</div>
                <div style={{ marginBottom: 28 }}>{step.visual}</div>
                <h3 style={{ fontSize: 18, fontWeight: 600, margin: "0 0 8px", letterSpacing: "-0.01em", color: "#111827" }}>{step.title}</h3>
                <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.5, margin: 0 }}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="lp-section" style={{ padding: "80px 0", borderTop: "1px solid #F3F4F6" }}>
        <div className="lp-section-inner" style={{ maxWidth: 1120, margin: "0 auto", padding: "0 32px" }}>
          <div style={{ textAlign: "center", margin: "0 auto 48px", maxWidth: 640 }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#4F46E5", marginBottom: 14 }}>Pricing</div>
            <h2 className="lp-h2" style={{ fontSize: 40, lineHeight: 1.1, letterSpacing: "-0.02em", fontWeight: 700, margin: "0 0 12px", color: "#111827" }}>Start free. Upgrade when you&apos;re winning.</h2>
            <p style={{ fontSize: 17, color: "#6B7280", lineHeight: 1.55, margin: 0 }}>Every plan includes the full audit trail, reminders, and branded portal. You&apos;re only paying for scale.</p>
          </div>
          <div className="lp-pricing-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, alignItems: "stretch" }}>
            {[
              {
                name: "Free", price: "$0", per: "/mo", tag: "For agencies just getting started.", cta: "Start free", href: "/signup", featured: false,
                features: [
                  { text: "2 client workspaces" },
                  { text: "Full audit trail and reminders" },
                  { text: "Branded client portal" },
                  { text: '"Powered by Approva" watermark', muted: true },
                ],
              },
              {
                name: "Growth", price: "$99", per: "/mo", tag: "For agencies running 5–15 clients.", cta: "Start 14-day trial", href: "/signup?plan=growth", featured: true,
                features: [
                  { text: "15 client workspaces" },
                  { text: "Full white-label, no watermark" },
                  { text: "Custom subdomain per client" },
                  { text: "CSV audit log export" },
                ],
              },
              {
                name: "Agency", price: "$179", per: "/mo", tag: "For shops with teams and many clients.", cta: "Start 14-day trial", href: "/signup?plan=agency", featured: false,
                features: [
                  { text: "Unlimited client workspaces" },
                  { text: "Team seats & per-post assignees" },
                  { text: "Role-based permissions" },
                  { text: "Priority support" },
                ],
              },
            ].map((plan) => (
              <div key={plan.name} style={{ background: "#fff", border: plan.featured ? "2px solid #4F46E5" : "1px solid #E5E7EB", borderRadius: 14, padding: "28px 24px 24px", display: "flex", flexDirection: "column", position: "relative", boxShadow: plan.featured ? "0 24px 40px -20px rgba(79,70,229,.25)" : "none" }}>
                {plan.featured && (
                  <span style={{ position: "absolute", top: -10, left: 24, background: "#4F46E5", color: "#fff", fontSize: 10, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 4 }}>Recommended</span>
                )}
                <div style={{ fontSize: 14, fontWeight: 600, color: plan.featured ? "#4F46E5" : "#111827" }}>{plan.name}</div>
                <div style={{ marginTop: 12, marginBottom: 4, display: "flex", alignItems: "baseline", gap: 4 }}>
                  <span style={{ fontSize: 40, fontWeight: 700, letterSpacing: "-0.02em", color: "#111827", lineHeight: 1 }}>{plan.price}</span>
                  <span style={{ fontSize: 14, color: "#9CA3AF" }}>{plan.per}</span>
                </div>
                <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 22, minHeight: 20 }}>{plan.tag}</div>
                <div style={{ marginBottom: 22 }}>
                  <Link href={plan.href} style={{ display: "block", width: "100%", padding: "12px 20px", borderRadius: 8, fontSize: 15, fontWeight: 500, textAlign: "center", textDecoration: "none", background: plan.featured ? "#4F46E5" : "#fff", color: plan.featured ? "#fff" : "#111827", border: plan.featured ? "1px solid #4F46E5" : "1px solid #D1D5DB", boxSizing: "border-box" }}>
                    {plan.cta}
                  </Link>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {plan.features.map((f) => (
                    <li key={f.text} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: f.muted ? "#9CA3AF" : "#374151", lineHeight: 1.45 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={f.muted ? "#D1D5DB" : "#4F46E5"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}><path d="M20 6 9 17l-5-5"/></svg>
                      {f.text}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 32, textAlign: "center", fontSize: 14, color: "#9CA3AF" }}>Start free, upgrade when you hit your first limit. No credit card required.</p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ background: "#111827", color: "#fff", padding: "96px 0", textAlign: "center" }}>
        <div className="lp-section-inner" style={{ maxWidth: 1120, margin: "0 auto", padding: "0 32px" }}>
          <h2 className="lp-cta-h2" style={{ fontSize: 44, lineHeight: 1.1, letterSpacing: "-0.025em", fontWeight: 700, margin: "0 auto 32px", maxWidth: 720, color: "#fff" }}>
            Stop managing approvals in chat threads.
          </h2>
          <Link href="/signup" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 15, fontWeight: 500, padding: "12px 20px", borderRadius: 8, background: "#fff", color: "#111827", textDecoration: "none" }}>
            Start free
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </Link>
          <div style={{ marginTop: 20, fontSize: 13, color: "rgba(255,255,255,.5)" }}>Free plan includes 2 client workspaces. No credit card.</div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  )
}
