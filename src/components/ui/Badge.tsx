type BadgeVariant =
  | "draft"
  | "sent"
  | "approved"
  | "changes_requested"
  | "pending"

const styles: Record<BadgeVariant, string> = {
  draft:              "bg-gray-100 text-gray-600",
  pending:            "bg-gray-100 text-gray-600",
  sent:               "bg-blue-100 text-blue-700",
  approved:           "bg-green-100 text-green-700",
  changes_requested:  "bg-amber-100 text-amber-700",
}

const dots: Record<BadgeVariant, string> = {
  draft:              "bg-gray-400",
  pending:            "bg-gray-400",
  sent:               "bg-blue-500",
  approved:           "bg-green-500",
  changes_requested:  "bg-amber-500",
}

const labels: Record<BadgeVariant, string> = {
  draft:             "Draft",
  pending:           "Pending",
  sent:              "Sent",
  approved:          "Approved",
  changes_requested: "Changes requested",
}

interface BadgeProps {
  status: BadgeVariant
}

export default function Badge({ status }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium ${styles[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dots[status]}`} />
      {labels[status]}
    </span>
  )
}
