import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function CustomerSplash() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-primary/10 to-background p-4">
      <div className="w-full max-w-md flex flex-col items-center justify-center space-y-8 text-center">
        <div className="relative w-32 h-32 mb-4">
          <Image
            src="/placeholder.svg?height=128&width=128"
            alt="BusTicket Logo"
            fill
            className="animate-pulse"
            priority
          />
        </div>

        <h1 className="text-4xl font-bold tracking-tight">Welcome</h1>
        <p className="text-muted-foreground">Book tickets, track buses, and travel smart</p>

        <div className="flex flex-col w-full gap-4 mt-8">
          <Link href="/customer/login">
            <Button size="lg" className="w-full">
              Login
            </Button>
          </Link>

          <Link href="/customer/signup">
            <Button variant="outline" size="lg" className="w-full">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

