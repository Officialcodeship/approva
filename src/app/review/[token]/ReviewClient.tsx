"use client"

import { useState, useTransition } from "react"
import Image from "next/image"
import { Check, MessageSquare, RotateCcw, ChevronDown, ChevronUp } from "lucide-react"
import { approvePostAction, requestChangesAction } from "./actions"
import type { Post, ApprovalAction, Comment } from "@/lib/supabase/types"

function Spinner() {
  return (
    <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}

const PLATFORM_LABELS: Record<string, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  linkedin: "LinkedIn",
  tiktok: "TikTok",
  x: "X",
}

interface ReviewPost extends Post {
  latestAction: ApprovalAction | null
  comments: Comment[]
}

interface ReviewClientProps {
  approvalLinkId: string
  token: string
  agencyName: string
  agencyLogoUrl: string | null
  agencyPlan: string
  brandColor: string | null
  workspaceTitle: string
  dueDate: string | null
  posts: ReviewPost[]
}

function StatusPill({ status }: { status: "approved" | "changes_requested" | "pending" }) {
  if (status === "approved") {
    return (
      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-medium bg-green-50 text-green-700 border border-green-100">
        <span className="w-1 h-1 rounded-full bg-green-500 inline-block" />
        Approved
      </span>
    )
  }
  if (status === "changes_requested") {
    return (
      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-100">
        <span className="w-1 h-1 rounded-full bg-amber-500 inline-block" />
        Changes
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-medium bg-gray-50 text-gray-500 border border-gray-200">
      <span className="w-1 h-1 rounded-full bg-gray-400 inline-block" />
      Pending
    </span>
  )
}

export default function ReviewClient({
  approvalLinkId,
  token,
  agencyName,
  agencyLogoUrl,
  agencyPlan,
  brandColor,
  workspaceTitle,
  dueDate,
  posts: initialPosts,
}: ReviewClientProps) {
  const [clientName, setClientName] = useState<string>(() =>
    typeof window !== "undefined" ? (localStorage.getItem("approva_client_name") ?? "") : ""
  )
  const [namePromptFor, setNamePromptFor] = useState<{
    postId: string
    action: "approve" | "changes"
  } | null>(null)
  const [nameInput, setNameInput] = useState("")
  const [commentOpenFor, setCommentOpenFor] = useState<string | null>(null)
  const [commentBody, setCommentBody] = useState("")
  const [expandedMedia, setExpandedMedia] = useState<string | null>(null)
  const [pendingAction, setPendingAction] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isPending, startTransition] = useTransition()
  const [posts, setPosts] = useState(initialPosts)

  function rememberName(name: string) {
    setClientName(name)
    localStorage.setItem("approva_client_name", name)
  }

  function handleApproveClick(postId: string) {
    if (!clientName) {
      setNamePromptFor({ postId, action: "approve" })
      return
    }
    doApprove(postId, clientName)
  }

  function handleChangesClick(postId: string) {
    if (!clientName) {
      setNamePromptFor({ postId, action: "changes" })
      return
    }
    setCommentOpenFor(postId)
    setCommentBody("")
  }

  function handleNameSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!nameInput.trim() || !namePromptFor) return
    rememberName(nameInput.trim())
    const { postId, action } = namePromptFor
    setNamePromptFor(null)
    setNameInput("")
    if (action === "approve") {
      doApprove(postId, nameInput.trim())
    } else {
      setCommentOpenFor(postId)
      setCommentBody("")
    }
  }

  function doApprove(postId: string, name: string) {
    setPendingAction(postId)
    setErrors((e) => ({ ...e, [postId]: "" }))
    startTransition(async () => {
      const result = await approvePostAction(postId, approvalLinkId, token, name)
      setPendingAction(null)
      if (result?.error) {
        setErrors((e) => ({ ...e, [postId]: result.error! }))
      } else {
        setPosts((prev) =>
          prev.map((p) =>
            p.id === postId
              ? {
                  ...p,
                  status: "approved" as const,
                  latestAction: {
                    id: "optimistic",
                    post_id: postId,
                    approval_link_id: approvalLinkId,
                    action: "approved" as const,
                    client_name: name,
                    created_at: new Date().toISOString(),
                  },
                }
              : p
          )
        )
      }
    })
  }

  function handleCommentSubmit(postId: string) {
    if (!commentBody.trim()) {
      setErrors((e) => ({ ...e, [postId]: "Please describe the changes needed." }))
      return
    }
    setPendingAction(postId)
    setErrors((e) => ({ ...e, [postId]: "" }))
    startTransition(async () => {
      const result = await requestChangesAction(
        postId,
        approvalLinkId,
        token,
        clientName,
        commentBody
      )
      setPendingAction(null)
      if (result?.error) {
        setErrors((e) => ({ ...e, [postId]: result.error! }))
      } else {
        setPosts((prev) =>
          prev.map((p) =>
            p.id === postId
              ? {
                  ...p,
                  status: "changes_requested" as const,
                  latestAction: {
                    id: "optimistic",
                    post_id: postId,
                    approval_link_id: approvalLinkId,
                    action: "changes_requested" as const,
                    client_name: clientName,
                    created_at: new Date().toISOString(),
                  },
                  comments: [
                    ...p.comments,
                    {
                      id: "optimistic",
                      post_id: postId,
                      approval_link_id: approvalLinkId,
                      body: commentBody,
                      author_type: "client" as const,
                      created_at: new Date().toISOString(),
                      updated_at: new Date().toISOString(),
                    },
                  ],
                }
              : p
          )
        )
        setCommentOpenFor(null)
        setCommentBody("")
      }
    })
  }

  const accent = brandColor ?? "#4F46E5"
  const totalPosts = posts.length
  const approvedCount = posts.filter((p) => p.latestAction?.action === "approved").length
  const changesCount = posts.filter((p) => p.latestAction?.action === "changes_requested").length
  const allApproved = approvedCount === totalPosts && totalPosts > 0

  return (
    <div className="min-h-screen bg-white">
      {/* Name prompt modal */}
      {namePromptFor && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30" onClick={() => setNamePromptFor(null)} />
          <div className="relative bg-white rounded-lg border border-gray-200 shadow-lg w-full max-w-xs p-5 z-10">
            <h2 className="text-sm font-semibold text-gray-900 mb-0.5">What&apos;s your name?</h2>
            <p className="text-xs text-gray-500 mb-4">
              Attached to your response for the record.
            </p>
            <form onSubmit={handleNameSubmit} className="space-y-2.5">
              <input
                autoFocus
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Your name"
                className="block w-full rounded border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-offset-0"
                style={{ "--tw-ring-color": accent } as React.CSSProperties}
                required
              />
              <button
                type="submit"
                className="w-full rounded py-2 text-sm font-medium text-white transition-colors"
                style={{ backgroundColor: accent }}
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-100">
        <div className="h-[3px] w-full" style={{ backgroundColor: accent }} />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between gap-4">
          {agencyLogoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={agencyLogoUrl} alt={agencyName} className="h-6 w-auto object-contain" />
          ) : (
            <span className="text-sm font-medium text-gray-900">{agencyName}</span>
          )}
          <div className="flex items-center gap-3">
            {dueDate && (
              <span className="text-xs text-gray-400">
                Due {new Date(dueDate).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
              </span>
            )}
            <span className="text-xs text-gray-500 tabular-nums">
              {approvedCount}/{totalPosts} approved
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Page title + progress */}
        <div className="pt-8 pb-6 border-b border-gray-100">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h1 className="text-lg font-semibold text-gray-900 leading-tight">{workspaceTitle}</h1>
              <p className="text-sm text-gray-500 mt-0.5">
                {totalPosts} {totalPosts === 1 ? "post" : "posts"} to review
                {changesCount > 0 && <> · {changesCount} need changes</>}
              </p>
            </div>
            {allApproved && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100 shrink-0">
                <Check className="w-3 h-3" />
                All done
              </span>
            )}
          </div>
          {/* Thin progress track */}
          <div className="h-1 w-full rounded-full bg-gray-100 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: totalPosts > 0 ? `${(approvedCount / totalPosts) * 100}%` : "0%",
                backgroundColor: accent,
              }}
            />
          </div>
        </div>

        {/* Post list */}
        <div className="divide-y divide-gray-100">
          {posts.map((post, idx) => {
            const isApproved = post.latestAction?.action === "approved"
            const isChanges = post.latestAction?.action === "changes_requested"
            const isActedOn = isApproved || isChanges
            const isThisPending = pendingAction === post.id
            const isMediaExpanded = expandedMedia === post.id
            const status = isApproved ? "approved" : isChanges ? "changes_requested" : "pending"

            return (
              <div key={post.id} className={`py-5 ${isApproved ? "opacity-60" : ""}`}>
                {/* Row header */}
                <div className="flex items-start gap-3 mb-3">
                  {/* Index */}
                  <span className="text-xs text-gray-300 tabular-nums mt-0.5 w-5 shrink-0 text-right">
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  <div className="flex-1 min-w-0">
                    {/* Title row */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-medium text-gray-500">
                        {PLATFORM_LABELS[post.platform] ?? post.platform}
                      </span>
                      {post.scheduled_date && (
                        <>
                          <span className="text-gray-200 text-xs">·</span>
                          <span className="text-xs text-gray-400">
                            {new Date(post.scheduled_date).toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </>
                      )}
                      <span className="ml-auto">
                        <StatusPill status={status} />
                      </span>
                    </div>

                    {/* Caption */}
                    {post.caption && (
                      <p className="mt-2 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {post.caption}
                      </p>
                    )}

                    {/* Media toggle */}
                    {post.media_url && (
                      <button
                        onClick={() => setExpandedMedia(isMediaExpanded ? null : post.id)}
                        className="mt-2 inline-flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {isMediaExpanded ? (
                          <><ChevronUp className="w-3 h-3" />Hide media</>
                        ) : (
                          <><ChevronDown className="w-3 h-3" />Show media</>
                        )}
                      </button>
                    )}

                    {/* Expanded media */}
                    {post.media_url && isMediaExpanded && (
                      <div className="mt-3 relative w-full aspect-video rounded-md overflow-hidden bg-gray-50 border border-gray-100">
                        <Image
                          src={post.media_url}
                          alt="Post media"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    {/* Comments thread */}
                    {post.comments.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {post.comments.map((c) => (
                          <div key={c.id} className="flex gap-2">
                            <div className="w-px bg-amber-200 rounded-full shrink-0 ml-0.5" />
                            <div>
                              <p className="text-[11px] font-medium text-amber-600 mb-0.5">
                                {c.author_type === "client" ? "You" : "Agency"}
                              </p>
                              <p className="text-sm text-gray-700">{c.body}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Error */}
                    {errors[post.id] && (
                      <p className="mt-2 text-xs text-red-500">{errors[post.id]}</p>
                    )}

                    {/* Actions */}
                    <div className="mt-3">
                      {isApproved ? (
                        <div className="flex items-center gap-1.5 text-xs text-green-600">
                          <Check className="w-3.5 h-3.5" />
                          <span>Approved by {post.latestAction?.client_name}</span>
                        </div>
                      ) : isChanges && commentOpenFor !== post.id ? (
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1.5 text-xs text-amber-600">
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>Changes requested</span>
                          </div>
                          <button
                            onClick={() => handleApproveClick(post.id)}
                            disabled={isThisPending || isPending}
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 disabled:opacity-40 transition-colors"
                          >
                            {isThisPending ? <Spinner /> : <RotateCcw className="w-3.5 h-3.5" />}
                            Approve instead
                          </button>
                        </div>
                      ) : !isActedOn ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleApproveClick(post.id)}
                            disabled={isThisPending || isPending}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium text-white disabled:opacity-40 transition-colors"
                            style={{ backgroundColor: accent }}
                          >
                            {isThisPending ? (
                              <><Spinner />Saving…</>
                            ) : (
                              <><Check className="w-3.5 h-3.5" />Approve</>
                            )}
                          </button>
                          <button
                            onClick={() => handleChangesClick(post.id)}
                            disabled={isThisPending || isPending}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium text-gray-600 border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 transition-colors"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            Request changes
                          </button>
                        </div>
                      ) : null}

                      {/* Comment form */}
                      {commentOpenFor === post.id && (
                        <div className="mt-3 space-y-2">
                          <textarea
                            autoFocus
                            rows={3}
                            value={commentBody}
                            onChange={(e) => setCommentBody(e.target.value)}
                            placeholder="Describe what needs to change…"
                            className="block w-full rounded border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 resize-none"
                            style={{ "--tw-ring-color": accent } as React.CSSProperties}
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleCommentSubmit(post.id)}
                              disabled={isThisPending || isPending}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium text-white bg-amber-500 hover:bg-amber-600 disabled:opacity-40 transition-colors"
                            >
                              {isThisPending ? <><Spinner />Sending…</> : "Send feedback"}
                            </button>
                            <button
                              onClick={() => { setCommentOpenFor(null); setCommentBody("") }}
                              className="px-3 py-1.5 rounded text-xs font-medium text-gray-500 border border-gray-200 hover:bg-gray-50 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* All approved */}
        {allApproved && (
          <div className="py-10 text-center border-t border-gray-100">
            <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-50 border border-green-100 mb-3">
              <Check className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-sm font-medium text-gray-900">All posts approved</p>
            <p className="text-xs text-gray-400 mt-1">{agencyName} has been notified.</p>
          </div>
        )}

        {/* Watermark */}
        {agencyPlan === "free" && (
          <div className="py-8 text-center border-t border-gray-100">
            <p className="text-[11px] text-gray-300 tracking-wide uppercase">Powered by Approva</p>
          </div>
        )}
      </div>
    </div>
  )
}
