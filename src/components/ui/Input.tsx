import { InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export default function Input({ label, error, id, className = "", ...props }: InputProps) {
  const inputClass = `block w-full rounded-md border px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors ${
    error ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"
  } ${className}`

  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input id={id} className={inputClass} {...props} />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}
