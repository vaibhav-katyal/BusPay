"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ConductorNavbar from "@/components/conductor-navbar"
import { Bus, Users, MapPin, Clock } from "lucide-react"
import MockMapView from "@/components/mock-map-view"
import { getCurrentLocation, startSharingConductorLocation, type LocationData } from "@/lib/mock-location-service"

export default function ConductorDashboard() {
  const [tripStarted, setTripStarted] = useState(false)
  const [busRoute, setBusRoute] = useState("")
  const [vehicleId, setVehicleId] = useState("")
  const [conductorLocation, setConductorLocation] = useState<LocationData | null>(null)
  const [isLocationSharing, setIsLocationSharing] = useState(false)

  // Initialize location tracking
  useEffect(() => {
    // Get conductor's current location
    const fetchLocation = async () => {
      try {
        const location = await getCurrentLocation()
        setConductorLocation(location)
      } catch (error) {
        console.error("Error getting location:", error)
      }
    }

    fetchLocation()

    // Set up interval to update location
    const intervalId = setInterval(fetchLocation, 10000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  // Start sharing location when trip starts
  useEffect(() => {
    let stopSharing: (() => void) | null = null

    if (tripStarted && busRoute && vehicleId) {
      const routeId = busRoute
      const busId = `${vehicleId}-${Date.now()}`

      stopSharing = startSharingConductorLocation(busId, routeId, vehicleId)
      setIsLocationSharing(true)
    }

    return () => {
      if (stopSharing) {
        stopSharing()
        setIsLocationSharing(false)
      }
    }
  }, [tripStarted, busRoute, vehicleId])

  const handleStartTrip = () => {
    setTripStarted(true)
  }

  const handleEndTrip = () => {
    setTripStarted(false)
    setBusRoute("")
    setVehicleId("")
  }

  return (
    <div className="min-h-screen pb-16">
      <div className="bg-primary text-primary-foreground p-4">
        <h1 className="text-xl font-bold">Conductor Dashboard</h1>
      </div>

      <div className="p-4 space-y-6">
        {!tripStarted ? (
          <Card>
            <CardContent className="p-4 space-y-4">
              <h2 className="text-lg font-semibold">Start New Trip</h2>

              {conductorLocation && (
                <div className="w-full h-32 mb-2">
                  <MockMapView userLocation={conductorLocation} height="100%" />
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bus-route">Bus Route</Label>
                  <Select value={busRoute} onValueChange={setBusRoute}>
                    <SelectTrigger id="bus-route">
                      <SelectValue placeholder="Select bus route" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="route-42">Route 42 - Sector 18 to City Center</SelectItem>
                      <SelectItem value="route-15">Route 15 - Sector 18 to Railway Station</SelectItem>
                      <SelectItem value="route-27">Route 27 - City Center to Airport</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vehicle-id">Vehicle ID</Label>
                  <Input
                    id="vehicle-id"
                    placeholder="Enter vehicle ID"
                    value={vehicleId}
                    onChange={(e) => setVehicleId(e.target.value)}
                  />
                </div>

                <Button className="w-full" onClick={handleStartTrip} disabled={!busRoute || !vehicleId}>
                  Start Trip
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">Trip Active</h2>
                    <p className="text-sm text-muted-foreground">Trip ID: TR-2023-8754</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleEndTrip}>
                    End Trip
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Route</p>
                    <p className="font-medium">
                      {busRoute === "route-42"
                        ? "Route 42"
                        : busRoute === "route-15"
                          ? "Route 15"
                          : busRoute === "route-27"
                            ? "Route 27"
                            : busRoute}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Vehicle</p>
                    <p className="font-medium">{vehicleId}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center">
                  <div
                    className={`h-2 w-2 rounded-full mr-2 ${isLocationSharing ? "bg-green-600" : "bg-yellow-600"}`}
                  ></div>
                  <p className="text-sm">
                    {isLocationSharing ? "Location sharing active" : "Location sharing inactive"}
                  </p>
                </div>
              </CardContent>
            </Card>

            {conductorLocation && (
              <Card>
                <CardContent className="p-0">
                  <MockMapView userLocation={conductorLocation} height="200px" />
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h3 className="text-2xl font-bold">24</h3>
                  <p className="text-sm text-muted-foreground">Total Passengers</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <Bus className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h3 className="text-2xl font-bold">65%</h3>
                  <p className="text-sm text-muted-foreground">Occupancy Rate</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-4 space-y-4">
                <h2 className="text-lg font-semibold">Current Route</h2>

                <div className="flex items-start space-x-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    <div className="w-0.5 h-16 bg-muted-foreground/30 my-1"></div>
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div>
                      <p className="font-medium">Sector 18</p>
                      <p className="text-sm text-muted-foreground">Current Stop</p>
                    </div>

                    <div>
                      <p className="font-medium">City Center</p>
                      <p className="text-sm text-muted-foreground">Final Destination</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 text-sm">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>Next Stop: Market Complex</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>ETA: 3 min</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <ConductorNavbar />
    </div>
  )
}

