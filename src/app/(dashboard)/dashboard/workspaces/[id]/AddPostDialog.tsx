"use client"

import { useState, useActionState, useEffect } from "react"
import { createPostAction, type PostFormState } from "./actions"
import Dialog from "@/components/ui/Dialog"
import Button from "@/components/ui/Button"

const PLATFORMS = [
  { value: "instagram", label: "Instagram" },
  { value: "facebook", label: "Facebook" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "tiktok", label: "TikTok" },
  { value: "x", label: "X (Twitter)" },
]

interface AddPostDialogProps {
  workspaceId: string
}

export default function AddPostDialog({ workspaceId }: AddPostDialogProps) {
  const [open, setOpen] = useState(false)
  const boundAction = createPostAction.bind(null, workspaceId)
  const [state, formAction, isPending] = useActionState<PostFormState, FormData>(
    boundAction,
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
      <Button onClick={() => setOpen(true)}>Add post</Button>
      <Dialog open={open} onClose={() => setOpen(false)} title="Add post">
        <form action={formAction} encType="multipart/form-data" className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="platform" className="block text-sm font-medium text-gray-700">
              Platform
            </label>
            <select id="platform" name="platform" required className={fieldClass}>
              <option value="">Select platform…</option>
              {PLATFORMS.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label htmlFor="caption" className="block text-sm font-medium text-gray-700">
              Caption
              <span className="ml-1 text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea
              id="caption"
              name="caption"
              rows={4}
              className={`${fieldClass} resize-y`}
              placeholder="Write your caption…"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="scheduled_date" className="block text-sm font-medium text-gray-700">
              Scheduled date
              <span className="ml-1 text-gray-400 font-normal">(optional)</span>
            </label>
            <input id="scheduled_date" name="scheduled_date" type="date" className={fieldClass} />
          </div>
          <div className="space-y-1">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Image
              <span className="ml-1 text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className="block w-full text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            />
          </div>
          {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
          <Button type="submit" disabled={isPending} className="w-full justify-center">
            {isPending ? "Adding…" : "Add post"}
          </Button>
        </form>
      </Dialog>
    </>
  )
}
