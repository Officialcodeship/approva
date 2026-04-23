export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-[48px] leading-none text-gray-900" style={{ fontFamily: '"Stylus ITC Std", "Snell Roundhand", cursive' }}>
            Approva
          </h1>
          <p className="mt-2 text-sm text-gray-500">Content approval for agencies</p>
        </div>
        {children}
      </div>
    </div>
  )
}
