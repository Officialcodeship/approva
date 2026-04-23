"use client"

import { useState, useActionState, useEffect } from "react"
import Link from "next/link"
import { createWorkspaceAction, type WorkspaceFormState } from "./actions"
import Dialog from "@/components/ui/Dialog"
import Button from "@/components/ui/Button"
import type { Client } from "@/lib/supabase/types"

interface NewWorkspaceDialogProps {
  clients: Pick<Client, "id" | "name">[]
}

export default function NewWorkspaceDialog({ clients }: NewWorkspaceDialogProps) {
  const [open, setOpen] = useState(false)
  const [state, formAction, isPending] = useActionState<WorkspaceFormState, FormData>(
    createWorkspaceAction,
    null
  )
  useEffect(() => {
    if (state?.success) {
      setOpen(false)
    }
  }, [state])

  const fieldClass =
    "block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500"

  return (
    <>
      <Button onClick={() => setOpen(true)}>New workspace</Button>
      <Dialog open={open} onClose={() => setOpen(false)} title="New workspace">
        <form action={formAction} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="client_id" className="block text-sm font-medium text-gray-700">
              Client
            </label>
            {clients.length === 0 ? (
              <p className="text-sm text-gray-500">
                No clients yet.{" "}
                <Link href="/dashboard/clients" className="underline">
                  Add a client first
                </Link>
                .
              </p>
            ) : (
              <select id="client_id" name="client_id" required className={fieldClass}>
                <option value="">Select a client…</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className="space-y-1">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              placeholder="e.g. May 2026 Content"
              className={fieldClass}
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="due_date" className="block text-sm font-medium text-gray-700">
              Due date
              <span className="ml-1 text-gray-400 font-normal">(optional)</span>
            </label>
            <input id="due_date" name="due_date" type="date" className={fieldClass} />
          </div>
          {state?.error && (
            <div className={`rounded-lg p-3 text-sm ${state.limitReached ? "bg-amber-50 border border-amber-200 text-amber-800" : "text-red-600"}`}>
              <p>{state.error}</p>
              {state.limitReached && (
                <a
                  href="/dashboard/billing"
                  className="mt-1 inline-block font-semibold underline hover:text-amber-900"
                >
                  Upgrade your plan →
                </a>
              )}
            </div>
          )}
          <Button
            type="submit"
            disabled={isPending || clients.length === 0}
            className="w-full justify-center"
          >
            {isPending ? "Creating…" : "Create workspace"}
          </Button>
        </form>
      </Dialog>
    </>
  )
}
