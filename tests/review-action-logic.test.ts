import { describe, it, expect } from 'vitest'
import { determineWorkspaceStatus } from '@/app/review/[token]/status'

describe('determineWorkspaceStatus', () => {
  it('returns "approved" when all posts are approved', () => {
    expect(determineWorkspaceStatus(['approved', 'approved', 'approved'])).toBe('approved')
  })

  it('returns "changes_requested" when any post has changes requested', () => {
    expect(determineWorkspaceStatus(['approved', 'changes_requested', 'approved'])).toBe('changes_requested')
  })

  it('returns "changes_requested" when all posts have changes requested', () => {
    expect(determineWorkspaceStatus(['changes_requested', 'changes_requested'])).toBe('changes_requested')
  })

  it('returns null for mixed pending and approved (no terminal state yet)', () => {
    expect(determineWorkspaceStatus(['approved', 'pending'])).toBeNull()
  })

  it('returns null for all pending', () => {
    expect(determineWorkspaceStatus(['pending', 'pending'])).toBeNull()
  })

  it('returns null for empty array', () => {
    expect(determineWorkspaceStatus([])).toBeNull()
  })
})
