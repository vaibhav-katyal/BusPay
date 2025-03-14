"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation } from "lucide-react"
import { getCurrentLocation, getLocationByPlaceName } from "@/lib/mock-location-service"

interface LocationSearchProps {
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  onLocationSelect?: (location: { name: string; lat: number; lng: number }) => void
  showCurrentLocation?: boolean
}

// Mock location suggestions
const LOCATION_SUGGESTIONS = [
  "Sector 18",
  "Market Complex",
  "City Hospital",
  "Town Hall",
  "City Center",
  "Railway Station",
  "Airport",
  "Sector 62",
]

export default function LocationSearch({
  label,
  placeholder,
  value,
  onChange,
  onLocationSelect,
  showCurrentLocation = false,
}: LocationSearchProps) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Filter suggestions based on input value
    if (value.trim() === "") {
      setSuggestions([])
      return
    }

    const filtered = LOCATION_SUGGESTIONS.filter((location) => location.toLowerCase().includes(value.toLowerCase()))
    setSuggestions(filtered)
  }, [value])

  const handleSelectSuggestion = (suggestion: string) => {
    onChange(suggestion)
    setShowSuggestions(false)

    if (onLocationSelect) {
      const location = getLocationByPlaceName(suggestion)
      if (location) {
        onLocationSelect({
          name: suggestion,
          lat: location.latitude,
          lng: location.longitude,
        })
      }
    }
  }

  const handleUseCurrentLocation = async () => {
    setIsLoading(true)
    try {
      const location = await getCurrentLocation()

      // For this demo, we'll use a mock address
      const mockAddress = "Current Location (Sector 18)"
      onChange(mockAddress)

      if (onLocationSelect) {
        onLocationSelect({
          name: mockAddress,
          lat: location.latitude,
          lng: location.longitude,
        })
      }
    } catch (error) {
      console.error("Error getting current location:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative">
      <div className="flex items-center space-x-2">
        <MapPin className="h-5 w-5 text-muted-foreground" />
        <label htmlFor={label} className="text-sm font-medium">
          {label}
        </label>
      </div>

      <div className="flex space-x-2 mt-1">
        <div className="relative flex-1">
          <Input
            id={label}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => {
              // Delay hiding suggestions to allow for clicks
              setTimeout(() => setShowSuggestions(false), 200)
            }}
          />

          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-background border rounded-md shadow-lg max-h-60 overflow-auto">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="px-3 py-2 hover:bg-accent cursor-pointer"
                  onMouseDown={() => handleSelectSuggestion(suggestion)}
                >
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{suggestion}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {showCurrentLocation && (
          <Button variant="outline" size="icon" onClick={handleUseCurrentLocation} disabled={isLoading}>
            <Navigation className="h-4 w-4" />
          </Button>
        )}
      </div>

      {showCurrentLocation && (
        <p className="text-xs text-muted-foreground mt-1">
          <Button variant="link" className="p-0 h-auto text-xs" onClick={handleUseCurrentLocation}>
            Use current location
          </Button>
        </p>
      )}
    </div>
  )
}

