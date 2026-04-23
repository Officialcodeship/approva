"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { getAgencyId } from "@/lib/supabase/queries"
import { generateApprovalToken } from "@/lib/tokens"
import { resend } from "@/lib/email/resend"
import { approvalRequestHtml } from "@/lib/email/templates/approval-request"
import { reminderHtml } from "@/lib/email/templates/reminder"

export type PostFormState = { error?: string; success?: boolean } | null

export type SendApprovalState =
  | { error: string }
  | { success: true; token: string }
  | null

export async function sendForApprovalAction(
  workspaceId: string,
  _prev: SendApprovalState,
  formData: FormData
): Promise<SendApprovalState> {
  const clientEmail = (formData.get("client_email") as string)?.trim()
  if (!clientEmail) return { error: "Client email is required." }

  const supabase = await createClient()
  const agencyId = await getAgencyId(supabase)
  if (!agencyId) return { error: "Not authenticated." }

  const admin = createAdminClient()

  const { data: workspace } = await admin
    .from("workspaces")
    .select("id, title, status")
    .eq("id", workspaceId)
    .eq("agency_id", agencyId)
    .single()
  if (!workspace) return { error: "Workspace not found." }
  if (workspace.status !== "draft") return { error: "Workspace is not in draft status." }

  const { count } = await admin
    .from("posts")
    .select("id", { count: "exact", head: true })
    .eq("workspace_id", workspaceId)
  if (!count || count === 0) return { error: "Add at least one post before sending." }

  const { data: agency } = await admin
    .from("agencies")
    .select("name")
    .eq("id", agencyId)
    .single()

  const token = generateApprovalToken()
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()

  await admin
    .from("approval_links")
    .update({ is_active: false })
    .eq("workspace_id", workspaceId)
    .eq("is_active", true)

  const { error: linkError } = await admin.from("approval_links").insert({
    workspace_id: workspaceId,
    token,
    client_email: clientEmail,
    expires_at: expiresAt,
    is_active: true,
  })
  if (linkError) return { error: "Failed to create approval link." }

  await admin
    .from("workspaces")
    .update({ status: "sent" })
    .eq("id", workspaceId)

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? ""
  const reviewUrl = `${appUrl}/review/${token}`
  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "noreply@approva.app",
      to: clientEmail,
      subject: `${agency?.name ?? "Your agency"}: content ready for review — ${workspace.title}`,
      html: approvalRequestHtml({
        agencyName: agency?.name ?? "Your agency",
        workspaceTitle: workspace.title,
        reviewUrl,
      }),
    })
  } catch {
    // Email failure is non-fatal — link is created, agency can copy URL manually
  }

  revalidatePath(`/dashboard/workspaces/${workspaceId}`)
  return { success: true, token }
}

export async function createPostAction(
  workspaceId: string,
  _prev: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  const platform = (formData.get("platform") as string)?.trim()
  const caption = (formData.get("caption") as string)?.trim() || null
  const scheduled_date = (formData.get("scheduled_date") as string) || null
  const image = formData.get("image") as File | null

  if (!platform) return { error: "Platform is required." }

  const supabase = await createClient()
  const agencyId = await getAgencyId(supabase)
  if (!agencyId) return { error: "Not authenticated." }

  const admin = createAdminClient()

  const { data: workspace } = await admin
    .from("workspaces")
    .select("id")
    .eq("id", workspaceId)
    .eq("agency_id", agencyId)
    .single()
  if (!workspace) return { error: "Workspace not found." }

  const { data: lastPost } = await admin
    .from("posts")
    .select("position")
    .eq("workspace_id", workspaceId)
    .order("position", { ascending: false })
    .limit(1)
    .maybeSingle()
  const position = (lastPost?.position ?? -1) + 1

  let media_url: string | null = null
  if (image && image.size > 0) {
    const ext = image.name.split(".").pop() ?? "bin"
    const path = `${workspaceId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const bytes = await image.arrayBuffer()
    const { data: upload, error: uploadError } = await admin.storage
      .from("post-media")
      .upload(path, bytes, { contentType: image.type })
    if (!uploadError && upload) {
      const { data: { publicUrl } } = admin.storage.from("post-media").getPublicUrl(upload.path)
      media_url = publicUrl
    }
  }

  const typedPlatform = platform as "instagram" | "facebook" | "linkedin" | "tiktok" | "x"

  const { error } = await admin.from("posts").insert({
    workspace_id: workspaceId,
    platform: typedPlatform,
    caption,
    media_url,
    scheduled_date,
    position,
  })

  if (error) return { error: "Failed to create post." }

  revalidatePath(`/dashboard/workspaces/${workspaceId}`)
  return { success: true }
}

export async function updatePostAction(
  postId: string,
  workspaceId: string,
  _prev: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  const platform = (formData.get("platform") as string)?.trim()
  const caption = (formData.get("caption") as string)?.trim() || null
  const scheduled_date = (formData.get("scheduled_date") as string) || null

  if (!platform) return { error: "Platform is required." }

  const supabase = await createClient()
  const agencyId = await getAgencyId(supabase)
  if (!agencyId) return { error: "Not authenticated." }

  const typedPlatform = platform as "instagram" | "facebook" | "linkedin" | "tiktok" | "x"

  const admin = createAdminClient()
  const { error } = await admin
    .from("posts")
    .update({ platform: typedPlatform, caption, scheduled_date })
    .eq("id", postId)

  if (error) return { error: "Failed to update post." }

  revalidatePath(`/dashboard/workspaces/${workspaceId}`)
  return { success: true }
}

export async function deletePostAction(
  postId: string,
  workspaceId: string
): Promise<void> {
  const supabase = await createClient()
  const agencyId = await getAgencyId(supabase)
  if (!agencyId) return

  const admin = createAdminClient()
  await admin.from("posts").delete().eq("id", postId)
  revalidatePath(`/dashboard/workspaces/${workspaceId}`)
}

export type ReminderState = { error?: string; success?: boolean } | null

export async function sendReminderAction(
  workspaceId: string,
  _prev: ReminderState,
): Promise<ReminderState> {
  const supabase = await createClient()
  const agencyId = await getAgencyId(supabase)
  if (!agencyId) return { error: "Not authenticated." }

  const admin = createAdminClient()

  const { data: workspace } = await admin
    .from("workspaces")
    .select("id, title, status")
    .eq("id", workspaceId)
    .eq("agency_id", agencyId)
    .single()
  if (!workspace) return { error: "Workspace not found." }

  const { data: approvalLink } = await admin
    .from("approval_links")
    .select("token, client_email")
    .eq("workspace_id", workspaceId)
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle()
  if (!approvalLink) return { error: "No active approval link. Send the workspace for approval first." }

  const { data: agency } = await admin
    .from("agencies")
    .select("name")
    .eq("id", agencyId)
    .single()

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? ""
  const reviewUrl = `${appUrl}/review/${approvalLink.token}`

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "noreply@approva.app",
      to: approvalLink.client_email,
      subject: `Reminder: ${workspace.title} is waiting for your approval`,
      html: reminderHtml({
        agencyName: agency?.name ?? "Your agency",
        workspaceTitle: workspace.title,
        reviewUrl,
      }),
    })
  } catch {
    return { error: "Failed to send reminder email." }
  }

  return { success: true }
}
