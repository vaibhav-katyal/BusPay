import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function SplashScreen() {
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

        <h1 className="text-4xl font-bold tracking-tight">BusTicket</h1>
        <p className="text-muted-foreground">Smart Bus Ticketing Solution</p>

        <div className="flex flex-col w-full gap-4 mt-8">
          <Link href="/customer">
            <Button size="lg" className="w-full">
              Continue as Passenger
            </Button>
          </Link>

          <Link href="/conductor">
            <Button variant="outline" size="lg" className="w-full">
              Continue as Conductor
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

