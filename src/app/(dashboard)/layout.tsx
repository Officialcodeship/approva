import { redirect } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import DashboardMobileNav from "./DashboardMobileNav"

const NAV_LINKS = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/clients", label: "Clients" },
  { href: "/dashboard/workspaces", label: "Workspaces" },
  { href: "/dashboard/billing", label: "Billing" },
  { href: "/dashboard/settings", label: "Settings" },
]

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 flex items-center justify-between h-14">
          <div className="flex items-center gap-7 min-w-0">
            <span
              className="text-[22px] leading-none text-gray-900 select-none flex-shrink-0"
              style={{ fontFamily: '"Stylus ITC Std", "Snell Roundhand", cursive' }}
            >
              Approva
            </span>
            <nav className="hidden sm:flex items-center gap-0.5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <form action="/auth/logout" method="POST">
              <button
                type="submit"
                className="hidden sm:block text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                Log out
              </button>
            </form>
            <DashboardMobileNav />
          </div>
        </div>
      </header>
      <main className="max-w-[1280px] mx-auto px-4 sm:px-8 py-6 sm:py-8">
        {children}
      </main>
    </div>
  )
}
