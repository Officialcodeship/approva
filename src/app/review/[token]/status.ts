export function determineWorkspaceStatus(postStatuses: string[]): "approved" | "changes_requested" | null {
  if (!postStatuses.length) return null
  if (postStatuses.every((s) => s === "approved")) return "approved"
  if (postStatuses.some((s) => s === "changes_requested")) return "changes_requested"
  return null
}
