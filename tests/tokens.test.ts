import { describe, it, expect } from 'vitest'
import { generateApprovalToken } from '@/lib/tokens'

describe('generateApprovalToken', () => {
  it('returns a string', () => {
    expect(typeof generateApprovalToken()).toBe('string')
  })

  it('returns a string of length 32', () => {
    expect(generateApprovalToken()).toHaveLength(32)
  })

  it('returns different values on successive calls', () => {
    expect(generateApprovalToken()).not.toBe(generateApprovalToken())
  })
})
