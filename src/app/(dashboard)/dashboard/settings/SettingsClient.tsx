"use client"

import { useState, useRef } from "react"
import { createBrowserClient } from "@supabase/ssr"
import Button from "@/components/ui/Button"
import { saveSettingsAction } from "./actions"

interface SettingsClientProps {
  agencyId: string
  agencyName: string
  slug: string
  logoUrl: string | null
  customDomain: string | null
  plan: string
}

export default function SettingsClient({
  agencyId,
  agencyName,
  slug,
  logoUrl: initialLogoUrl,
  customDomain: initialCustomDomain,
  plan,
}: SettingsClientProps) {
  const [logoUrl, setLogoUrl] = useState(initialLogoUrl)
  const [customDomain, setCustomDomain] = useState(initialCustomDomain ?? "")
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const isPaidPlan = plan === "growth" || plan === "agency"

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 2 * 1024 * 1024) {
      setMessage({ type: "error", text: "Logo must be under 2 MB." })
      return
    }

    setUploading(true)
    setMessage(null)

    const ext = file.name.split(".").pop()
    const path = `${agencyId}/logo.${ext}`

    const { error } = await supabase.storage.from("logos").upload(path, file, { upsert: true })

    if (error) {
      setMessage({ type: "error", text: "Failed to upload logo." })
      setUploading(false)
      return
    }

    const { data: { publicUrl } } = supabase.storage.from("logos").getPublicUrl(path)
    setLogoUrl(publicUrl)
    setUploading(false)

    // Save logo_url immediately
    const fd = new FormData()
    fd.append("logo_url", publicUrl)
    fd.append("custom_domain", customDomain)
    const result = await saveSettingsAction(null, fd)
    if (result?.error) {
      setMessage({ type: "error", text: result.error })
    } else {
      setMessage({ type: "success", text: "Logo updated." })
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setMessage(null)

    const fd = new FormData()
    fd.append("logo_url", logoUrl ?? "")
    fd.append("custom_domain", customDomain)
    const result = await saveSettingsAction(null, fd)
    setSaving(false)
    if (result?.error) {
      setMessage({ type: "error", text: result.error })
    } else {
      setMessage({ type: "success", text: "Settings saved." })
    }
  }

  const fieldClass =
    "block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500"

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">Manage your agency profile and branding.</p>
      </div>

      {message && (
        <div
          className={`rounded-xl px-4 py-3 text-sm font-medium ${
            message.type === "success"
              ? "bg-green-50 border border-green-200 text-green-800"
              : "bg-red-50 border border-red-200 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSave} className="rounded-xl border border-gray-200 bg-white p-6 space-y-6">
        {/* Agency name (read-only) */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Agency name</label>
          <input value={agencyName} disabled className={`${fieldClass} bg-gray-50 text-gray-500`} />
          <p className="text-xs text-gray-400">Contact support to change your agency name.</p>
        </div>

        {/* Slug (read-only) */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Review link domain</label>
          <input
            value={`${slug}.approva.app`}
            disabled
            className={`${fieldClass} bg-gray-50 text-gray-500`}
          />
        </div>

        {/* Logo upload */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Agency logo</label>
          {logoUrl && (
            <div className="h-12 w-auto mb-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logoUrl}
                alt="Agency logo"
                className="h-12 w-auto object-contain rounded border border-gray-200 p-1"
              />
            </div>
          )}
          <div className="flex items-center gap-3">
            <Button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm"
            >
              {uploading ? "Uploading…" : logoUrl ? "Change logo" : "Upload logo"}
            </Button>
            <span className="text-xs text-gray-400">PNG or JPG, max 2 MB</span>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml"
            className="hidden"
            onChange={handleLogoUpload}
          />
        </div>

        {/* Custom domain — growth+ only */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Custom domain
            {!isPaidPlan && (
              <span className="ml-2 text-xs font-normal text-gray-400">Growth+ plan required</span>
            )}
          </label>
          {isPaidPlan ? (
            <>
              <input
                type="text"
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                placeholder="approvals.youragency.com"
                className={fieldClass}
              />
              <p className="text-xs text-gray-400">
                Subdomain routing is not yet active — enter your domain for future activation.
              </p>
            </>
          ) : (
            <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 flex items-center justify-between">
              <span className="text-sm text-gray-400">Upgrade to enable custom domain</span>
              <a
                href="/dashboard/billing"
                className="text-xs font-medium text-gray-700 underline hover:text-gray-900"
              >
                Upgrade
              </a>
            </div>
          )}
        </div>

        <Button type="submit" disabled={saving || uploading} className="w-full justify-center">
          {saving ? "Saving…" : "Save settings"}
        </Button>
      </form>
    </div>
  )
}
