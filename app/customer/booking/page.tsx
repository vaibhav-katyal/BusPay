"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Bus, Clock, MapPin, Users } from "lucide-react"

export default function BookingPage() {
  const router = useRouter()
  const [passengers, setPassengers] = useState("1")
  const [fareType, setFareType] = useState("10")

  const handleBooking = () => {
    router.push("/customer/payment")
  }

  return (
    <div className="min-h-screen pb-6">
      <div className="bg-primary text-primary-foreground p-4 flex items-center">
        <Link href="/customer/home" className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-bold">Confirm Booking</h1>
      </div>

      <div className="p-4 space-y-6">
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Bus className="h-5 w-5 mr-2 text-primary" />
                <span className="font-medium">Route 42</span>
              </div>
              <div className="flex items-center text-sm">
                <Clock className="h-4 w-4 mr-1" />
                <span>Arriving in 5 min</span>
              </div>
            </div>

            <div className="flex items-start space-x-4 pt-2">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <div className="w-0.5 h-16 bg-muted-foreground/30 my-1"></div>
                <div className="w-3 h-3 rounded-full bg-primary"></div>
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <p className="font-medium">Sector 18</p>
                  <p className="text-sm text-muted-foreground">Boarding Point</p>
                </div>

                <div>
                  <p className="font-medium">City Center</p>
                  <p className="text-sm text-muted-foreground">Destination</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 text-sm">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                <span>Distance: 7.5 km</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                <span>Est. Time: 25 min</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Passenger Details</h2>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <Label>Number of Passengers</Label>
              </div>

              <RadioGroup value={passengers} onValueChange={setPassengers} className="flex space-x-2">
                {["1", "2", "3", "4"].map((num) => (
                  <div key={num} className="flex-1">
                    <Label
                      htmlFor={`passengers-${num}`}
                      className={`flex items-center justify-center h-12 border rounded-md cursor-pointer ${
                        passengers === num ? "bg-primary/10 border-primary" : ""
                      }`}
                    >
                      <RadioGroupItem value={num} id={`passengers-${num}`} className="sr-only" />
                      {num}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Select Fare Type</Label>

              <RadioGroup value={fareType} onValueChange={setFareType} className="space-y-2">
                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="10" id="fare-10" />
                  <Label htmlFor="fare-10" className="flex-1 cursor-pointer">
                    <div className="flex justify-between">
                      <span>Regular Fare</span>
                      <span>₹10</span>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="20" id="fare-20" />
                  <Label htmlFor="fare-20" className="flex-1 cursor-pointer">
                    <div className="flex justify-between">
                      <span>Extended Route</span>
                      <span>₹20</span>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="30" id="fare-30" />
                  <Label htmlFor="fare-30" className="flex-1 cursor-pointer">
                    <div className="flex justify-between">
                      <span>Long Distance</span>
                      <span>₹30</span>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="50" id="fare-50" />
                  <Label htmlFor="fare-50" className="flex-1 cursor-pointer">
                    <div className="flex justify-between">
                      <span>Day Pass</span>
                      <span>₹50</span>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between mb-2">
            <span>
              Fare (₹{fareType} × {passengers})
            </span>
            <span>₹{Number.parseInt(fareType) * Number.parseInt(passengers)}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span>Platform Fee</span>
            <span>₹2</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total Amount</span>
            <span>₹{Number.parseInt(fareType) * Number.parseInt(passengers) + 2}</span>
          </div>
        </div>

        <Button className="w-full" onClick={handleBooking}>
          Proceed to Payment
        </Button>
      </div>
    </div>
  )
}

