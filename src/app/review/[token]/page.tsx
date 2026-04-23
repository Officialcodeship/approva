import Link from "next/link"
import { createAdminClient } from "@/lib/supabase/admin"
import type { Post, ApprovalAction, Comment } from "@/lib/supabase/types"
import ReviewClient from "./ReviewClient"

export const dynamic = "force-dynamic"

interface PageProps {
  params: Promise<{ token: string }>
}

interface ReviewPost extends Post {
  latestAction: ApprovalAction | null
  comments: Comment[]
}

export default async function ReviewPage({ params }: PageProps) {
  const { token } = await params
  const supabase = createAdminClient()

  const { data: approvalLink } = await supabase
    .from("approval_links")
    .select("id, is_active, expires_at, last_viewed_at, workspace_id")
    .eq("token", token)
    .single()

  if (
    !approvalLink ||
    !approvalLink.is_active ||
    (approvalLink.expires_at && new Date(approvalLink.expires_at) < new Date())
  ) {
    return <InvalidLink />
  }

  await supabase
    .from("approval_links")
    .update({ last_viewed_at: new Date().toISOString() })
    .eq("id", approvalLink.id)

  const workspaceId = approvalLink.workspace_id

  const { data: workspace } = await supabase
    .from("workspaces")
    .select("id, title, status, due_date, agency_id, client_id")
    .eq("id", workspaceId)
    .single()

  if (!workspace) return <InvalidLink />

  const [{ data: agency }, { data: client }, { data: posts }] = await Promise.all([
    supabase.from("agencies").select("name, logo_url, plan").eq("id", workspace.agency_id).single(),
    supabase.from("clients").select("brand_color").eq("id", workspace.client_id).single(),
    supabase.from("posts").select("*").eq("workspace_id", workspaceId).order("position", { ascending: true }),
  ])

  const postList = posts ?? []
  const postIds = postList.map((p) => p.id)

  const [{ data: allActions }, { data: allComments }] = await Promise.all([
    postIds.length
      ? supabase.from("approval_actions").select("*").in("post_id", postIds).order("created_at", { ascending: true })
      : { data: [] },
    postIds.length
      ? supabase.from("comments").select("*").in("post_id", postIds).order("created_at", { ascending: true })
      : { data: [] },
  ])

  const reviewPosts: ReviewPost[] = postList.map((post) => {
    const postActions = (allActions ?? []).filter((a) => a.post_id === post.id)
    const latestAction = postActions.length > 0 ? postActions[postActions.length - 1] : null
    const postComments = (allComments ?? []).filter((c) => c.post_id === post.id)
    return { ...post, latestAction, comments: postComments }
  })

  return (
    <ReviewClient
      approvalLinkId={approvalLink.id}
      token={token}
      agencyName={agency?.name ?? ""}
      agencyLogoUrl={agency?.logo_url ?? null}
      agencyPlan={agency?.plan ?? "free"}
      brandColor={client?.brand_color ?? null}
      workspaceTitle={workspace.title}
      dueDate={workspace.due_date ?? null}
      posts={reviewPosts}
    />
  )
}

function InvalidLink() {
  return (
    <div style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif", background: "#F9FAFB", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Review-page-style header: neutral gray stripe (no brand resolvable) */}
      <header style={{ background: "rgba(255,255,255,.95)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", borderTop: "3px solid #D1D5DB", borderBottom: "1px solid #E5E7EB", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 5 }}>
        <div style={{ fontFamily: '"Stylus ITC Std", "Snell Roundhand", cursive', fontSize: 22, color: "#111827", lineHeight: 1 }}>Approva</div>
        <div style={{ fontSize: 12, color: "#9CA3AF" }}>Approval link</div>
      </header>

      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px" }}>
        <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 16, padding: "40px 32px", maxWidth: 480, width: "100%", textAlign: "center", boxShadow: "0 1px 2px 0 rgba(17,24,39,.04)" }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#FFFBEB", color: "#D97706", display: "inline-flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.01em", margin: "0 0 10px", color: "#111827" }}>
            This approval link is no longer active
          </h1>
          <p style={{ fontSize: 15, color: "#6B7280", lineHeight: 1.6, margin: "0 0 10px" }}>
            The link may have expired, been revoked, or been replaced with a newer version.
          </p>
          <p style={{ fontSize: 15, color: "#6B7280", lineHeight: 1.6, margin: 0 }}>
            Please contact the agency that sent it to you for a new link.
          </p>

          <div style={{ marginTop: 28, paddingTop: 24, borderTop: "1px solid #F3F4F6", fontSize: 13, color: "#9CA3AF", textAlign: "left" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, padding: "6px 0" }}>
              <span style={{ color: "#9CA3AF" }}>Link opened</span>
              <span style={{ color: "#111827", fontWeight: 500 }}>{new Date().toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" })}</span>
            </div>
          </div>
        </div>
      </main>

      <div style={{ padding: 20, textAlign: "center", fontSize: 12, color: "#9CA3AF" }}>
        Powered by <Link href="/" style={{ color: "#9CA3AF", textDecoration: "none" }}>Approva</Link>
      </div>
    </div>
  )
}
