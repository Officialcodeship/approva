"use client"

import Link from "next/link"
import { useActionState } from "react"
import { signupAction } from "./actions"
import SubmitButton from "@/components/ui/SubmitButton"

export default function SignupPage() {
  const [state, action] = useActionState(signupAction, null)

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
      <h2 className="text-[17px] font-semibold text-gray-900 mb-1">Create your account</h2>
      <p className="text-sm text-gray-500 mb-6">Set up your agency on Approva</p>

      <form action={action} className="space-y-4">
        <div>
          <label htmlFor="agency_name" className="block text-sm font-medium text-gray-900 mb-1.5">
            Agency name
          </label>
          <input
            id="agency_name"
            name="agency_name"
            type="text"
            required
            autoComplete="organization"
            placeholder="Acme Social"
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-1.5">
            Work email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@agency.com"
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-1.5">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="new-password"
            placeholder="At least 8 characters"
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {state?.error && (
          <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2.5">
            <p className="text-sm text-red-700">{state.error}</p>
          </div>
        )}

        {state?.success && (
          <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2.5">
            <p className="text-sm text-green-700">{state.success}</p>
          </div>
        )}

        <SubmitButton label="Create account" loadingLabel="Creating account…" />
      </form>

      <p className="mt-5 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-gray-900 hover:underline">
          Log in
        </Link>
      </p>
    </div>
  )
}
