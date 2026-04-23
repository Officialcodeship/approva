interface EmptyStateProps {
  title: string
  description: string
  action?: React.ReactNode
}

export default function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 px-8 py-16 text-center">
      <p className="text-sm font-medium text-gray-900 mb-1">{title}</p>
      <p className="text-sm text-gray-500 mb-6 max-w-xs mx-auto">{description}</p>
      {action}
    </div>
  )
}
