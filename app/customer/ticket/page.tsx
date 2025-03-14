"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import CustomerNavbar from "@/components/customer-navbar"
import { ArrowLeft, Bus, Clock, MapPin, QrCode, Share2 } from "lucide-react"
import MockMapView from "@/components/mock-map-view"
import { getCurrentLocation, addEventListener, type LocationData, type BusLocation } from "@/lib/mock-location-service"

export default function TicketPage() {
  const router = useRouter()
  const [tripStarted, setTripStarted] = useState(false)
  const [currentStop, setCurrentStop] = useState("Sector 18")
  const [nextStop, setNextStop] = useState("Market Complex")
  const [eta, setEta] = useState(3)
  const [userLocation, setUserLocation] = useState<LocationData | null>(null)
  const [busLocation, setBusLocation] = useState<BusLocation | null>(null)

  // Get user's location and set up listeners
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const location = await getCurrentLocation()
        setUserLocation(location)

        // Create mock bus location based on user location
        const mockBusLocation: BusLocation = {
          busId: "bus-1",
          routeId: "route-42",
          vehicleId: "DL-1234",
          latitude: location.latitude + 0.002,
          longitude: location.longitude - 0.001,
          nextStop: "Market Complex",
          eta: 3,
        }

        setBusLocation(mockBusLocation)
      } catch (error) {
        console.error("Error getting location:", error)
      }
    }

    fetchLocation()

    // Listen for bus location updates
    const unsubscribe = addEventListener("bus:location_update", (data: BusLocation) => {
      if (data.busId === "bus-1") {
        setBusLocation(data)
        setNextStop(data.nextStop)
        setEta(data.eta)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  // Simulate trip progress
  useEffect(() => {
    if (tripStarted) {
      const timer = setTimeout(() => {
        if (currentStop === "Sector 18") {
          setCurrentStop("Market Complex")
          setNextStop("City Hospital")
          setEta(4)

          // Update mock bus location
          if (userLocation && busLocation) {
            setBusLocation({
              ...busLocation,
              latitude: userLocation.latitude + 0.001,
              longitude: userLocation.longitude + 0.001,
              nextStop: "City Hospital",
              eta: 4,
            })
          }
        } else if (currentStop === "Market Complex") {
          setCurrentStop("City Hospital")
          setNextStop("Town Hall")
          setEta(5)

          // Update mock bus location
          if (userLocation && busLocation) {
            setBusLocation({
              ...busLocation,
              latitude: userLocation.latitude - 0.001,
              longitude: userLocation.longitude + 0.002,
              nextStop: "Town Hall",
              eta: 5,
            })
          }
        } else if (currentStop === "City Hospital") {
          setCurrentStop("Town Hall")
          setNextStop("City Center")
          setEta(3)

          // Update mock bus location
          if (userLocation && busLocation) {
            setBusLocation({
              ...busLocation,
              latitude: userLocation.latitude - 0.002,
              longitude: userLocation.longitude - 0.001,
              nextStop: "City Center",
              eta: 3,
            })
          }
        } else if (currentStop === "Town Hall") {
          router.push("/customer/feedback")
        }
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [currentStop, tripStarted, router, userLocation, busLocation])

  return (
    <div className="min-h-screen pb-16">
      <div className="bg-primary text-primary-foreground p-4 flex items-center">
        <Link href="/customer/home" className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-bold">Your Ticket</h1>
        <div className="ml-auto">
          <Button variant="ghost" size="icon" className="text-primary-foreground">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        <Card className="border-2 border-primary">
          <CardContent className="p-4 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold">Route 42</h2>
                <p className="text-sm text-muted-foreground">Ticket ID: BT-2023-42789</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">March 9, 2025</p>
                <p className="text-sm text-muted-foreground">4:40 PM</p>
              </div>
            </div>

            <div className="flex justify-center py-4">
              <div className="bg-white p-2 rounded-lg">
                <QrCode className="h-40 w-40" />
              </div>
            </div>

            <div className="flex items-start space-x-4">
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

            <div className="grid grid-cols-3 gap-2 text-center border-t pt-4">
              <div>
                <p className="text-sm text-muted-foreground">Passengers</p>
                <p className="font-medium">1</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Fare</p>
                <p className="font-medium">₹10</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="font-medium text-green-600">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {!tripStarted ? (
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center">
                <Bus className="h-5 w-5 mr-2 text-primary" />
                <h3 className="font-medium">Bus Details</h3>
              </div>

              {userLocation && busLocation && (
                <div className="w-full h-32 mb-2">
                  <MockMapView userLocation={userLocation} buses={[busLocation]} height="100%" />
                </div>
              )}

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Bus Number</span>
                  <span className="text-sm">DL-1234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Driver</span>
                  <span className="text-sm">Rajesh Kumar</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Expected Arrival</span>
                  <span className="text-sm">2 minutes</span>
                </div>
              </div>

              <Button className="w-full" onClick={() => setTripStarted(true)}>
                Start Trip
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Bus className="h-5 w-5 mr-2 text-primary" />
                  <h3 className="font-medium">Live Trip Updates</h3>
                </div>
                <div className="text-sm text-green-600 font-medium">In Transit</div>
              </div>

              {userLocation && busLocation && (
                <div className="w-full h-32 mb-2">
                  <MockMapView userLocation={userLocation} buses={[busLocation]} height="100%" />
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Current Stop</p>
                    <p className="text-xs text-muted-foreground">{currentStop}</p>
                  </div>
                  <div className="h-2 w-2 rounded-full bg-green-600"></div>
                </div>

                <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-full"
                    style={{
                      width:
                        currentStop === "Sector 18"
                          ? "20%"
                          : currentStop === "Market Complex"
                            ? "40%"
                            : currentStop === "City Hospital"
                              ? "60%"
                              : currentStop === "Town Hall"
                                ? "80%"
                                : "100%",
                    }}
                  ></div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span className="text-sm">Next Stop: {nextStop}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span className="text-sm">ETA: {eta} min</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <CustomerNavbar />
    </div>
  )
}

