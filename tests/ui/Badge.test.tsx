import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Badge from '@/components/ui/Badge'

const cases = [
  { status: 'draft' as const,             label: 'Draft',             colorClass: 'bg-gray-100'  },
  { status: 'pending' as const,           label: 'Pending',           colorClass: 'bg-gray-100'  },
  { status: 'sent' as const,              label: 'Sent',              colorClass: 'bg-blue-100'  },
  { status: 'approved' as const,          label: 'Approved',          colorClass: 'bg-green-100' },
  { status: 'changes_requested' as const, label: 'Changes requested', colorClass: 'bg-amber-100' },
]

describe('Badge', () => {
  cases.forEach(({ status, label, colorClass }) => {
    it(`renders correct label for status "${status}"`, () => {
      render(<Badge status={status} />)
      expect(screen.getByText(label)).toBeInTheDocument()
    })

    it(`applies correct color class for status "${status}"`, () => {
      const { container } = render(<Badge status={status} />)
      expect(container.firstChild).toHaveClass(colorClass)
    })
  })
})
