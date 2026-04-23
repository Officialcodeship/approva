import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { createAdminClient } from "@/lib/supabase/admin"
import type { Database } from "@/lib/supabase/types"

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

  const { data: agency, error } = await adminClient
    .from("agencies")
    .insert({ name: agencyName, slug })
    .select("id")
    .single()

  if (error || !agency) return

  await adminClient.from("agency_users").insert({
    agency_id: agency.id,
    auth_user_id: authUserId,
    role: "owner",
  })
}

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const next = searchParams.get("next") ?? "/dashboard"

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=missing_code`)
  }

  // Build the response first so we can write cookies onto it
  const response = NextResponse.redirect(`${origin}${next}`)

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
          Object.entries(headers).forEach(([key, value]) =>
            response.headers.set(key, value)
          )
        },
      },
    }
  )

  const { data, error } = await supabase.auth.exchangeCodeForSession(code)

  if (error || !data.user) {
    return NextResponse.redirect(`${origin}/login?error=auth_failed`)
  }

  // Create agency records if this is a new user
  const admin = createAdminClient()
  const { data: existingUser } = await admin
    .from("agency_users")
    .select("id")
    .eq("auth_user_id", data.user.id)
    .maybeSingle()

  if (!existingUser) {
    const agencyName = (data.user.user_metadata?.agency_name as string) ?? "My Agency"
    const baseSlug = (data.user.user_metadata?.agency_slug as string) ?? "my-agency"
    await createAgencyRecords(admin, data.user.id, agencyName, baseSlug)
  }

  return response
}
