"use client"

import { useState, useActionState, useEffect } from "react"
import Image from "next/image"
import { updatePostAction, deletePostAction, type PostFormState } from "./actions"
import Button from "@/components/ui/Button"
import Badge from "@/components/ui/Badge"
import type { Post } from "@/lib/supabase/types"

const PLATFORMS = [
  { value: "instagram", label: "Instagram" },
  { value: "facebook", label: "Facebook" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "tiktok", label: "TikTok" },
  { value: "x", label: "X (Twitter)" },
]

const PLATFORM_LABELS: Record<string, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  linkedin: "LinkedIn",
  tiktok: "TikTok",
  x: "X (Twitter)",
}

interface PostCardProps {
  post: Post
  workspaceId: string
}

export default function PostCard({ post, workspaceId }: PostCardProps) {
  const [editing, setEditing] = useState(false)
  const updateBound = updatePostAction.bind(null, post.id, workspaceId)
  const [updateState, updateFormAction, isUpdating] = useActionState<PostFormState, FormData>(
    updateBound,
    null
  )
  const deleteBound = deletePostAction.bind(null, post.id, workspaceId)

  useEffect(() => {
    if (updateState?.success) {
      setEditing(false)
    }
  }, [updateState])

  const fieldClass =
    "block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500"

  if (editing) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <form action={updateFormAction} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor={`platform-${post.id}`} className="block text-sm font-medium text-gray-700">
              Platform
            </label>
            <select
              id={`platform-${post.id}`}
              name="platform"
              defaultValue={post.platform}
              required
              className={fieldClass}
            >
              {PLATFORMS.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label htmlFor={`caption-${post.id}`} className="block text-sm font-medium text-gray-700">
              Caption
            </label>
            <textarea
              id={`caption-${post.id}`}
              name="caption"
              rows={3}
              defaultValue={post.caption ?? ""}
              className={`${fieldClass} resize-y`}
            />
          </div>
          <div className="space-y-1">
            <label htmlFor={`date-${post.id}`} className="block text-sm font-medium text-gray-700">
              Scheduled date
            </label>
            <input
              id={`date-${post.id}`}
              name="scheduled_date"
              type="date"
              defaultValue={post.scheduled_date ?? ""}
              className={fieldClass}
            />
          </div>
          {updateState?.error && (
            <p className="text-sm text-red-600">{updateState.error}</p>
          )}
          <div className="flex gap-2">
            <Button type="submit" size="sm" disabled={isUpdating}>
              {isUpdating ? "Saving…" : "Save"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setEditing(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium text-gray-500">
              {PLATFORM_LABELS[post.platform] ?? post.platform}
            </span>
            <Badge
              status={post.status as "pending" | "approved" | "changes_requested"}
            />
            {post.scheduled_date && (
              <span className="text-xs text-gray-400">
                {new Date(post.scheduled_date).toLocaleDateString()}
              </span>
            )}
          </div>
          {post.caption && (
            <p className="text-sm text-gray-700 whitespace-pre-wrap line-clamp-4">
              {post.caption}
            </p>
          )}
        </div>
        {post.media_url && (
          <div className="flex-shrink-0 w-20 h-20 relative rounded-lg overflow-hidden border border-gray-200">
            <Image
              src={post.media_url}
              alt="Post media"
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>
      <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100">
        <Button variant="ghost" size="sm" onClick={() => setEditing(true)}>
          Edit
        </Button>
        <form action={deleteBound}>
          <Button
            type="submit"
            variant="ghost"
            size="sm"
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            Delete
          </Button>
        </form>
      </div>
    </div>
  )
}
