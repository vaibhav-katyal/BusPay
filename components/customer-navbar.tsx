"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Ticket, User, MapPin } from "lucide-react"

export default function CustomerNavbar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background z-10">
      <div className="flex justify-around items-center h-16">
        <Link
          href="/customer/home"
          className={`flex flex-col items-center justify-center w-full h-full ${isActive("/customer/home") ? "text-primary" : "text-muted-foreground"}`}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">Home</span>
        </Link>

        <Link
          href="/customer/tickets"
          className={`flex flex-col items-center justify-center w-full h-full ${isActive("/customer/tickets") ? "text-primary" : "text-muted-foreground"}`}
        >
          <Ticket className="h-5 w-5" />
          <span className="text-xs mt-1">Tickets</span>
        </Link>

        <Link
          href="/customer/routes"
          className={`flex flex-col items-center justify-center w-full h-full ${isActive("/customer/routes") ? "text-primary" : "text-muted-foreground"}`}
        >
          <MapPin className="h-5 w-5" />
          <span className="text-xs mt-1">Routes</span>
        </Link>

        <Link
          href="/customer/profile"
          className={`flex flex-col items-center justify-center w-full h-full ${isActive("/customer/profile") ? "text-primary" : "text-muted-foreground"}`}
        >
          <User className="h-5 w-5" />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </div>
  )
}

