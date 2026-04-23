"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Button from "@/components/ui/Button"

const PLAN_NAMES: Record<string, string> = {
  free: "Free",
  growth: "Growth",
  agency: "Agency",
}

const PLAN_PRICES: Record<string, string> = {
  free: "$0 / month",
  growth: "$99 / month",
  agency: "$179 / month",
}

interface BillingClientProps {
  plan: "free" | "growth" | "agency"
  workspaceCount: number
  workspaceLimit: number | null
  hasStripeCustomer: boolean
  showSuccess: boolean
  growthPriceId: string
  agencyPriceId: string
}

export default function BillingClient({
  plan,
  workspaceCount,
  workspaceLimit,
  hasStripeCustomer,
  showSuccess,
  growthPriceId,
  agencyPriceId,
}: BillingClientProps) {
  const [loading, setLoading] = useState<string | null>(null)
  const router = useRouter()

  async function handleUpgrade(priceId: string, label: string) {
    setLoading(label)
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      })
      const data = await res.json() as { url?: string; error?: string }
      if (data.url) {
        window.location.href = data.url
      } else {
        alert(data.error ?? "Something went wrong.")
        setLoading(null)
      }
    } catch {
      alert("Something went wrong.")
      setLoading(null)
    }
  }

  async function handlePortal() {
    setLoading("portal")
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" })
      const data = await res.json() as { url?: string; error?: string }
      if (data.url) {
        window.location.href = data.url
      } else {
        alert(data.error ?? "Something went wrong.")
        setLoading(null)
      }
    } catch {
      alert("Something went wrong.")
      setLoading(null)
    }
  }

  const usageText =
    workspaceLimit === null
      ? `${workspaceCount} workspaces (unlimited)`
      : `${workspaceCount} / ${workspaceLimit} workspaces`

  const usagePct =
    workspaceLimit !== null ? Math.min((workspaceCount / workspaceLimit) * 100, 100) : 0

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Billing</h1>
        <p className="mt-1 text-sm text-gray-500">Manage your plan and subscription.</p>
      </div>

      {showSuccess && (
        <div className="rounded-xl bg-green-50 border border-green-200 px-4 py-3">
          <p className="text-sm font-medium text-green-800">
            Subscription activated! Your plan has been updated.
          </p>
          <button
            onClick={() => router.replace("/dashboard/billing")}
            className="mt-1 text-xs text-green-600 underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Current plan */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Current plan</p>
            <p className="mt-1 text-xl font-bold text-gray-900">{PLAN_NAMES[plan]}</p>
            <p className="text-sm text-gray-500">{PLAN_PRICES[plan]}</p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              plan === "free"
                ? "bg-gray-100 text-gray-600"
                : plan === "growth"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-purple-100 text-purple-700"
            }`}
          >
            {PLAN_NAMES[plan]}
          </span>
        </div>

        {/* Workspace usage */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-sm text-gray-600">{usageText}</p>
          </div>
          {workspaceLimit !== null && (
            <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  usagePct >= 100 ? "bg-red-500" : "bg-indigo-600"
                }`}
                style={{ width: `${usagePct}%` }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Plan options */}
      {plan === "free" && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-gray-700">Upgrade your plan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <PlanCard
              name="Growth"
              price="$99/mo"
              features={["Up to 15 client workspaces", "Remove Approva watermark", "Custom domain"]}
              cta="Upgrade to Growth"
              loading={loading === "growth"}
              onUpgrade={() => handleUpgrade(growthPriceId, "growth")}
              highlight={false}
            />
            <PlanCard
              name="Agency"
              price="$179/mo"
              features={[
                "Unlimited workspaces",
                "Everything in Growth",
                "Team seats",
                "Advanced features",
              ]}
              cta="Upgrade to Agency"
              loading={loading === "agency"}
              onUpgrade={() => handleUpgrade(agencyPriceId, "agency")}
              highlight={true}
            />
          </div>
        </div>
      )}

      {plan === "growth" && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-gray-700">Upgrade to Agency</h2>
          <PlanCard
            name="Agency"
            price="$179/mo"
            features={[
              "Unlimited workspaces",
              "Everything in Growth",
              "Team seats",
              "Advanced features",
            ]}
            cta="Upgrade to Agency"
            loading={loading === "agency"}
            onUpgrade={() => handleUpgrade(agencyPriceId, "agency")}
            highlight={true}
          />
        </div>
      )}

      {/* Manage subscription — paid plans only */}
      {(plan === "growth" || plan === "agency") && hasStripeCustomer && (
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-1">Manage subscription</h2>
          <p className="text-sm text-gray-500 mb-4">
            Update payment method, view invoices, or cancel your subscription.
          </p>
          <Button
            onClick={handlePortal}
            disabled={loading === "portal"}
            className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            {loading === "portal" ? "Redirecting…" : "Open billing portal"}
          </Button>
        </div>
      )}
    </div>
  )
}

interface PlanCardProps {
  name: string
  price: string
  features: string[]
  cta: string
  loading: boolean
  onUpgrade: () => void
  highlight: boolean
}

function PlanCard({ name, price, features, cta, loading, onUpgrade, highlight }: PlanCardProps) {
  return (
    <div
      className={`rounded-xl border p-5 space-y-4 ${
        highlight ? "border-indigo-600 bg-indigo-600 text-white" : "border-gray-200 bg-white"
      }`}
    >
      <div>
        <p className={`text-sm font-semibold ${highlight ? "text-gray-300" : "text-gray-500"}`}>
          {name}
        </p>
        <p className={`text-2xl font-bold mt-0.5 ${highlight ? "text-white" : "text-gray-900"}`}>
          {price}
        </p>
      </div>
      <ul className="space-y-1.5">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm">
            <svg
              className={`mt-0.5 w-4 h-4 flex-shrink-0 ${highlight ? "text-gray-400" : "text-gray-400"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className={highlight ? "text-gray-300" : "text-gray-600"}>{f}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={onUpgrade}
        disabled={loading}
        className={`w-full rounded-lg py-2.5 text-sm font-semibold transition-colors disabled:opacity-50 ${
          highlight
            ? "bg-white text-indigo-700 hover:bg-indigo-50"
            : "bg-indigo-600 text-white hover:bg-indigo-700"
        }`}
      >
        {loading ? "Redirecting…" : cta}
      </button>
    </div>
  )
}
