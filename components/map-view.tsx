"use client"

import { useEffect, useRef, useState } from "react"
import { Map, Marker, NavigationControl } from "react-map-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { Bus, MapPin } from "lucide-react"
import type { LocationData, BusLocation } from "@/lib/location-service"

// Get your Mapbox token from environment variables
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "pk.placeholder_token"

interface MapViewProps {
  userLocation?: LocationData
  buses?: BusLocation[]
  destination?: LocationData
  height?: string
  onMapLoad?: () => void
}

export default function MapView({ userLocation, buses = [], destination, height = "300px", onMapLoad }: MapViewProps) {
  const mapRef = useRef<any>(null)
  const [viewState, setViewState] = useState({
    longitude: userLocation?.longitude || 77.209,
    latitude: userLocation?.latitude || 28.6139,
    zoom: 13,
  })

  useEffect(() => {
    if (userLocation) {
      setViewState((prev) => ({
        ...prev,
        longitude: userLocation.longitude,
        latitude: userLocation.latitude,
      }))
    }
  }, [userLocation])

  return (
    <div style={{ height, width: "100%" }}>
      <Map
        ref={mapRef}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
        onLoad={onMapLoad}
      >
        <NavigationControl position="top-right" />

        {/* User location marker */}
        {userLocation && (
          <Marker longitude={userLocation.longitude} latitude={userLocation.latitude} anchor="bottom">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full border-2 border-white">
              <MapPin className="h-5 w-5 text-white" />
            </div>
          </Marker>
        )}

        {/* Destination marker */}
        {destination && (
          <Marker longitude={destination.longitude} latitude={destination.latitude} anchor="bottom">
            <div className="flex items-center justify-center w-8 h-8 bg-red-500 rounded-full border-2 border-white">
              <MapPin className="h-5 w-5 text-white" />
            </div>
          </Marker>
        )}

        {/* Bus markers */}
        {buses.map((bus) => (
          <Marker key={bus.busId} longitude={bus.longitude} latitude={bus.latitude} anchor="bottom">
            <div className="flex items-center justify-center w-8 h-8 bg-green-500 rounded-full border-2 border-white">
              <Bus className="h-5 w-5 text-white" />
            </div>
          </Marker>
        ))}
      </Map>
    </div>
  )
}

