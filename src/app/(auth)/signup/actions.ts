"use server"

import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"

export type SignupState = {
  error?: string
  success?: string  // only used for email-confirmation message
} | null

function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 40) || "agency"
}

async function createAgencyRecords(
  adminClient: ReturnType<typeof createAdminClient>,
  authUserId: string,
  agencyName: string,
  baseSlug: string
) {
  let slug = baseSlug
  for (let i = 0; i < 5; i++) {
    const { data: existing } = await adminClient
      .from("agencies")
      .select("id")
      .eq("slug", slug)
      .maybeSingle()
    if (!existing) break
    slug = `${baseSlug}-${Math.random().toString(36).slice(2, 6)}`
  }

  const { data: agency, error: agencyError } = await adminClient
    .from("agencies")
    .insert({ name: agencyName, slug })
    .select("id")
    .single()

  if (agencyError || !agency) return

  await adminClient.from("agency_users").insert({
    agency_id: agency.id,
    auth_user_id: authUserId,
    role: "owner",
  })
}

export async function signupAction(
  _prev: SignupState,
  formData: FormData
): Promise<SignupState> {
  const agencyName = (formData.get("agency_name") as string)?.trim()
  const email = (formData.get("email") as string)?.trim()
  const password = formData.get("password") as string

  if (!agencyName || !email || !password) {
    return { error: "All fields are required." }
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." }
  }

  const supabase = await createClient()
  const slug = slugify(agencyName)

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { agency_name: agencyName, agency_slug: slug },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  })

  if (error) {
    return { error: error.message }
  }

  if (!data.user) {
    return { error: "Signup failed. Please try again." }
  }

  if (data.session) {
    // Email confirmation disabled — create agency records immediately
    const adminClient = createAdminClient()
    await createAgencyRecords(adminClient, data.user.id, agencyName, slug)
    redirect("/dashboard")
  }

  return { success: "Check your email to confirm your account, then log in." }
}
