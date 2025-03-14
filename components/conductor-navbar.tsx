"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, QrCode, FileText } from "lucide-react"

export default function ConductorNavbar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background z-10">
      <div className="flex justify-around items-center h-16">
        <Link
          href="/conductor/dashboard"
          className={`flex flex-col items-center justify-center w-full h-full ${isActive("/conductor/dashboard") ? "text-primary" : "text-muted-foreground"}`}
        >
          <LayoutDashboard className="h-5 w-5" />
          <span className="text-xs mt-1">Dashboard</span>
        </Link>

        <Link
          href="/conductor/passengers"
          className={`flex flex-col items-center justify-center w-full h-full ${isActive("/conductor/passengers") ? "text-primary" : "text-muted-foreground"}`}
        >
          <Users className="h-5 w-5" />
          <span className="text-xs mt-1">Passengers</span>
        </Link>

        <Link
          href="/conductor/verify"
          className={`flex flex-col items-center justify-center w-full h-full ${isActive("/conductor/verify") ? "text-primary" : "text-muted-foreground"}`}
        >
          <QrCode className="h-5 w-5" />
          <span className="text-xs mt-1">Verify</span>
        </Link>

        <Link
          href="/conductor/reports"
          className={`flex flex-col items-center justify-center w-full h-full ${isActive("/conductor/reports") ? "text-primary" : "text-muted-foreground"}`}
        >
          <FileText className="h-5 w-5" />
          <span className="text-xs mt-1">Reports</span>
        </Link>
      </div>
    </div>
  )
}

