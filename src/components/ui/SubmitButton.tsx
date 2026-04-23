"use client"

import { useFormStatus } from "react-dom"

interface SubmitButtonProps {
  label: string
  loadingLabel: string
}

export default function SubmitButton({ label, loadingLabel }: SubmitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full flex justify-center py-2.5 px-4 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {pending ? loadingLabel : label}
    </button>
  )
}
