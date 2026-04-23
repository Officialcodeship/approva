"use client"

import { useActionState, useEffect } from "react"
import { sendReminderAction, type ReminderState } from "./actions"

export default function ReminderButton({ workspaceId }: { workspaceId: string }) {
  const boundAction = sendReminderAction.bind(null, workspaceId)
  const [state, formAction, isPending] = useActionState<ReminderState, FormData>(boundAction, null)

  useEffect(() => {
    if (state?.success) {
      const t = setTimeout(() => {}, 0)
      return () => clearTimeout(t)
    }
  }, [state])

  return (
    <form action={formAction}>
      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
      >
        {isPending ? (
          <>
            <svg className="w-3.5 h-3.5 animate-spin text-gray-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending…
          </>
        ) : state?.success ? (
          <>
            <svg className="w-3.5 h-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Reminder sent
          </>
        ) : (
          "Send reminder"
        )}
      </button>
      {state?.error && (
        <p className="mt-1 text-xs text-red-600">{state.error}</p>
      )}
    </form>
  )
}
