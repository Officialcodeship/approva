"use client"

import { useState, useActionState, useEffect } from "react"
import { sendForApprovalAction, type SendApprovalState } from "./actions"
import Dialog from "@/components/ui/Dialog"
import Button from "@/components/ui/Button"

interface SendApprovalDialogProps {
  workspaceId: string
  clientEmail: string
  disabled: boolean
}

export default function SendApprovalDialog({
  workspaceId,
  clientEmail,
  disabled,
}: SendApprovalDialogProps) {
  const [open, setOpen] = useState(false)

  const boundAction = sendForApprovalAction.bind(null, workspaceId)
  const [state, formAction, isPending] = useActionState<SendApprovalState, FormData>(
    boundAction,
    null
  )

  useEffect(() => {
    if (state && "success" in state && state.success) {
      setOpen(false)
    }
  }, [state])

  const fieldClass =
    "block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500"

  return (
    <>
      <Button onClick={() => setOpen(true)} disabled={disabled} variant="primary">
        Send for approval
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} title="Send for approval">
        <form action={formAction} className="space-y-4">
          <p className="text-sm text-gray-500">
            A review link will be emailed to the client. They can approve or request changes
            on each post without creating an account.
          </p>
          <div className="space-y-1">
            <label htmlFor="client_email" className="block text-sm font-medium text-gray-700">
              Client email
            </label>
            <input
              id="client_email"
              name="client_email"
              type="email"
              required
              defaultValue={clientEmail}
              className={fieldClass}
            />
          </div>
          {state && "error" in state && (
            <p className="text-sm text-red-600">{state.error}</p>
          )}
          <Button type="submit" disabled={isPending} className="w-full justify-center">
            {isPending ? "Sending…" : "Send review link"}
          </Button>
        </form>
      </Dialog>
    </>
  )
}
