import { nanoid } from "nanoid"

export function generateApprovalToken(): string {
  return nanoid(32)
}
