import { notFound, redirect } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { getAgencyId } from "@/lib/supabase/queries"
import Badge from "@/components/ui/Badge"
import AddPostDialog from "./AddPostDialog"
import PostCard from "./PostCard"
import SendApprovalDialog from "./SendApprovalDialog"
import CopyButton from "./CopyButton"
import ReminderButton from "./ReminderButton"
import { Image } from "lucide-react"

export default async function WorkspaceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const agencyId = await getAgencyId(supabase)
  if (!agencyId) redirect("/login")

  const admin = createAdminClient()

  const { data: workspace } = await admin
    .from("workspaces")
    .select("id, title, status, due_date, clients(id, name, email, brand_color)")
    .eq("id", id)
    .eq("agency_id", agencyId)
    .single()

  if (!workspace) notFound()

  const { data: posts } = await admin
    .from("posts")
    .select("*")
    .eq("workspace_id", id)
    .order("position", { ascending: true })

  const { data: approvalLink } = await admin
    .from("approval_links")
    .select("id, token, client_email, created_at, last_viewed_at, expires_at")
    .eq("workspace_id", id)
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle()

  const postIds = posts?.map((p) => p.id) ?? []
  const { data: auditActions } = postIds.length
    ? await admin
        .from("approval_actions")
        .select("id, action, client_name, created_at, post_id")
        .in("post_id", postIds)
        .order("created_at", { ascending: false })
    : { data: [] }

  const client = workspace.clients as {
    id: string
    name: string
    email: string
    brand_color: string | null
  } | null

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? ""
  const reviewUrl = approvalLink ? `${appUrl}/review/${approvalLink.token}` : null

  const canSend = workspace.status === "draft" && (posts?.length ?? 0) > 0

  const postMap = Object.fromEntries((posts ?? []).map((p) => [p.id, p]))

  return (
    <div>
      {/* Breadcrumb */}
      <div className="mb-5">
        <Link href="/dashboard/workspaces" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
          ← Workspaces
        </Link>
      </div>

      {/* Workspace header card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-900 tracking-tight">{workspace.title}</h1>
            <div className="flex items-center gap-3 mt-2">
              {client && (
                <div className="flex items-center gap-1.5">
                  {client.brand_color && (
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: client.brand_color }}
                    />
                  )}
                  <span className="text-sm text-gray-500">{client.name}</span>
                </div>
              )}
              <Badge
                status={workspace.status as "draft" | "sent" | "approved" | "changes_requested"}
              />
              {workspace.due_date && (
                <span className="text-sm text-gray-400">
                  Due {new Date(workspace.due_date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                </span>
              )}
            </div>
          </div>
          {workspace.status === "draft" && (
            <SendApprovalDialog
              workspaceId={id}
              clientEmail={client?.email ?? ""}
              disabled={!canSend}
            />
          )}
        </div>
      </div>

      {/* Approval link card */}
      {approvalLink && (
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-3">Approval link</h2>
          <div className="space-y-1.5 text-sm mb-3">
            <div className="flex items-center gap-2 text-gray-500">
              <span className="text-gray-400 w-24 flex-shrink-0">Sent</span>
              <span>{new Date(approvalLink.created_at).toLocaleString(undefined, { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" })}</span>
              <span className="text-gray-200">·</span>
              <span className="text-gray-400">to</span>
              <span>{approvalLink.client_email}</span>
            </div>
            {approvalLink.last_viewed_at && (
              <div className="flex items-center gap-2 text-gray-500">
                <span className="text-gray-400 w-24 flex-shrink-0">Last viewed</span>
                <span>{new Date(approvalLink.last_viewed_at).toLocaleString(undefined, { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" })}</span>
              </div>
            )}
          </div>
          {reviewUrl && (
            <div className="flex items-center gap-2">
              <input
                readOnly
                value={reviewUrl}
                className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-500 font-mono truncate"
              />
              <CopyButton text={reviewUrl} />
              <ReminderButton workspaceId={id} />
            </div>
          )}
        </div>
      )}

      {/* Posts section */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs font-medium tracking-widest uppercase text-gray-400">
          Posts{posts?.length ? ` · ${posts.length}` : ""}
        </h2>
        <AddPostDialog workspaceId={id} />
      </div>

      {!posts?.length ? (
        <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 py-14 px-8 text-center">
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-gray-100 mb-3">
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-sm font-medium text-gray-900 mb-1">No posts yet</p>
          <p className="text-sm text-gray-500 mb-5 max-w-xs mx-auto">
            Add your first post to start building the approval batch.
          </p>
          <AddPostDialog workspaceId={id} />
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} workspaceId={id} />
          ))}
        </div>
      )}

      {/* Audit log */}
      {auditActions && auditActions.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xs font-medium tracking-widest uppercase text-gray-400 mb-3">
            Audit log
          </h2>
          <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
            {auditActions.map((action) => {
              const post = postMap[action.post_id]
              return (
                <div key={action.id} className="flex items-start gap-3 px-5 py-3.5">
                  <span
                    className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${
                      action.action === "approved" ? "bg-green-500" : "bg-amber-500"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium text-gray-900">
                        {action.client_name ?? "Client"}
                      </span>{" "}
                      {action.action === "approved" ? "approved" : "requested changes on"}{" "}
                      {post ? (
                        <span className="text-gray-500">
                          {post.platform} post
                          {post.scheduled_date
                            ? ` (${new Date(post.scheduled_date).toLocaleDateString(undefined, { month: "short", day: "numeric" })})`
                            : ""}
                        </span>
                      ) : (
                        <span className="text-gray-400">a post</span>
                      )}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5 tabular-nums">
                      {new Date(action.created_at).toLocaleString(undefined, { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
