"use client"

import { useState, useActionState, useEffect } from "react"
import { createClientAction, type ClientFormState } from "./actions"
import Dialog from "@/components/ui/Dialog"
import Button from "@/components/ui/Button"

export default function AddClientDialog() {
  const [open, setOpen] = useState(false)
  const [state, formAction, isPending] = useActionState<ClientFormState, FormData>(
    createClientAction,
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
      <Button onClick={() => setOpen(true)}>Add client</Button>
      <Dialog open={open} onClose={() => setOpen(false)} title="Add client">
        <form action={formAction} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input id="name" name="name" type="text" required className={fieldClass} />
          </div>
          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input id="email" name="email" type="email" required className={fieldClass} />
          </div>
          <div className="space-y-1">
            <label htmlFor="brand_color" className="block text-sm font-medium text-gray-700">
              Brand color
            </label>
            <div className="flex items-center gap-3">
              <input
                id="brand_color"
                name="brand_color"
                type="color"
                defaultValue="#000000"
                className="h-9 w-16 cursor-pointer rounded border border-gray-300 p-0.5"
              />
              <span className="text-xs text-gray-500">Optional</span>
            </div>
          </div>
          {state?.error && (
            <p className="text-sm text-red-600">{state.error}</p>
          )}
          <Button type="submit" disabled={isPending} className="w-full justify-center">
            {isPending ? "Creating…" : "Create client"}
          </Button>
        </form>
      </Dialog>
    </>
  )
}
