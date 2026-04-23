"use server"

import { revalidatePath } from "next/cache"
import { createAdminClient } from "@/lib/supabase/admin"
import { determineWorkspaceStatus } from "./status"

export type ReviewActionState = { error?: string; success?: boolean } | null

export async function approvePostAction(
  postId: string,
  approvalLinkId: string,
  token: string,
  clientName: string
): Promise<ReviewActionState> {
  const supabase = createAdminClient()

  const { error } = await supabase.from("approval_actions").insert({
    post_id: postId,
    approval_link_id: approvalLinkId,
    action: "approved",
    client_name: clientName || null,
  })

  if (error) return { error: "Failed to record approval." }

  await supabase.from("posts").update({ status: "approved" }).eq("id", postId)
  await syncWorkspaceStatus(supabase, postId)

  revalidatePath(`/review/${token}`)
  return { success: true }
}

export async function requestChangesAction(
  postId: string,
  approvalLinkId: string,
  token: string,
  clientName: string,
  commentBody: string
): Promise<ReviewActionState> {
  if (!commentBody?.trim()) return { error: "Comment is required." }

  const supabase = createAdminClient()

  const { error: commentError } = await supabase.from("comments").insert({
    post_id: postId,
    approval_link_id: approvalLinkId,
    body: commentBody.trim(),
    author_type: "client",
  })

  if (commentError) return { error: "Failed to save comment." }

  const { error } = await supabase.from("approval_actions").insert({
    post_id: postId,
    approval_link_id: approvalLinkId,
    action: "changes_requested",
    client_name: clientName || null,
  })

  if (error) return { error: "Failed to record action." }

  await supabase.from("posts").update({ status: "changes_requested" }).eq("id", postId)
  await syncWorkspaceStatus(supabase, postId)

  revalidatePath(`/review/${token}`)
  return { success: true }
}

async function syncWorkspaceStatus(
  supabase: ReturnType<typeof createAdminClient>,
  postId: string
) {
  const { data: post } = await supabase
    .from("posts")
    .select("workspace_id")
    .eq("id", postId)
    .single()
  if (!post) return

  const { data: posts } = await supabase
    .from("posts")
    .select("status")
    .eq("workspace_id", post.workspace_id)
  if (!posts?.length) return

  const newStatus = determineWorkspaceStatus(posts.map((p) => p.status))

  if (newStatus) {
    await supabase
      .from("workspaces")
      .update({ status: newStatus })
      .eq("id", post.workspace_id)
  }
}
