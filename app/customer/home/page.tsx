"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import CustomerNavbar from "@/components/customer-navbar"
import { Bus, Clock, ArrowRight } from "lucide-react"
import LocationSearch from "@/components/location-search"
import MockMapView from "@/components/mock-map-view"
import {
  getCurrentLocation,
  listenForNearbyBuses,
  requestNearbyBuses,
  addEventListener,
  type BusLocation,
  type LocationData,
} from "@/lib/mock-location-service"

export default function CustomerHome() {
  const [startPoint, setStartPoint] = useState("")
  const [destination, setDestination] = useState("")
  const [userLocation, setUserLocation] = useState<LocationData | null>(null)
  const [destinationLocation, setDestinationLocation] = useState<LocationData | null>(null)
  const [nearbyBuses, setNearbyBuses] = useState<BusLocation[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showMap, setShowMap] = useState(false)

  // Initialize location tracking
  useEffect(() => {
    // Get user's current location
    const fetchLocation = async () => {
      try {
        const location = await getCurrentLocation()
        setUserLocation(location)
      } catch (error) {
        console.error("Error getting location:", error)
      }
    }

    fetchLocation()

    // Set up listener for nearby buses
    const unsubscribe = addEventListener("customer:nearby_buses", (buses: BusLocation[]) => {
      setNearbyBuses(buses)
    })

    // Set up mock bus updates
    const stopListening = listenForNearbyBuses((buses) => {
      setNearbyBuses(buses)
    })

    // Clean up on unmount
    return () => {
      unsubscribe()
      stopListening()
    }
  }, [])

  const handleFindBuses = async () => {
    setIsLoading(true)
    try {
      await requestNearbyBuses(startPoint, destination)
      setShowMap(true)
    } catch (error) {
      console.error("Error finding buses:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleStartPointSelect = (location: { name: string; lat: number; lng: number }) => {
    setStartPoint(location.name)
    setUserLocation({
      latitude: location.lat,
      longitude: location.lng,
    })
  }

  const handleDestinationSelect = (location: { name: string; lat: number; lng: number }) => {
    setDestination(location.name)
    setDestinationLocation({
      latitude: location.lat,
      longitude: location.lng,
    })
  }

  return (
    <div className="min-h-screen pb-16">
      <div className="bg-primary text-primary-foreground p-4">
        <h1 className="text-xl font-bold">Book Ticket</h1>
      </div>

      <div className="p-4 space-y-6">
        <Tabs defaultValue="one-way" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="one-way">One-way</TabsTrigger>
            <TabsTrigger value="round-trip">Round-trip</TabsTrigger>
          </TabsList>

          <TabsContent value="one-way" className="space-y-4">
            <LocationSearch
              label="Starting Point"
              placeholder="Enter starting point"
              value={startPoint}
              onChange={setStartPoint}
              onLocationSelect={handleStartPointSelect}
              showCurrentLocation
            />

            <LocationSearch
              label="Destination"
              placeholder="Enter destination"
              value={destination}
              onChange={setDestination}
              onLocationSelect={handleDestinationSelect}
            />

            <Button className="w-full" disabled={!startPoint || !destination || isLoading} onClick={handleFindBuses}>
              {isLoading ? "Finding Buses..." : "Find Buses"}
            </Button>
          </TabsContent>

          <TabsContent value="round-trip" className="space-y-4">
            <p className="text-center text-muted-foreground">Round-trip booking coming soon</p>
          </TabsContent>
        </Tabs>

        {showMap && userLocation && (
          <Card>
            <CardContent className="p-0">
              <MockMapView
                userLocation={userLocation}
                destination={destinationLocation || undefined}
                buses={nearbyBuses}
                height="200px"
              />
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Nearby Buses</h2>

          {nearbyBuses.map((bus) => (
            <Link href="/customer/booking" key={bus.busId}>
              <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <Bus className="h-5 w-5 mr-2 text-primary" />
                      <span className="font-medium">Route {bus.routeId.split("-")[1]}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Arriving in {bus.eta} min</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{bus.nextStop}</p>
                      <p className="text-xs text-muted-foreground">Next Stop</p>
                    </div>

                    <ArrowRight className="h-4 w-4 text-muted-foreground mx-2" />

                    <div>
                      <p className="text-sm font-medium">City Center</p>
                      <p className="text-xs text-muted-foreground">Final Destination</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}

          {nearbyBuses.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No buses found nearby</p>
              <p className="text-sm">Try changing your location or check back later</p>
            </div>
          )}
        </div>
      </div>

      <CustomerNavbar />
    </div>
  )
}

