"use client"

import { useEffect, useRef, useState } from "react"
import type { LocationData, BusLocation } from "@/lib/mock-location-service"

interface MockMapViewProps {
  userLocation?: LocationData
  buses?: BusLocation[]
  destination?: LocationData
  height?: string
  onMapLoad?: () => void
}

export default function MockMapView({
  userLocation,
  buses = [],
  destination,
  height = "300px",
  onMapLoad,
}: MockMapViewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Calculate map bounds
  const getBounds = () => {
    const locations = [userLocation, destination, ...buses].filter(Boolean) as LocationData[]

    if (locations.length === 0) {
      return {
        minLat: 28.56,
        maxLat: 28.63,
        minLng: 77.3,
        maxLng: 77.37,
      }
    }

    const lats = locations.map((loc) => loc.latitude)
    const lngs = locations.map((loc) => loc.longitude)

    return {
      minLat: Math.min(...lats) - 0.005,
      maxLat: Math.max(...lats) + 0.005,
      minLng: Math.min(...lngs) - 0.005,
      maxLng: Math.max(...lngs) + 0.005,
    }
  }

  // Convert geo coordinates to canvas coordinates
  const geoToCanvas = (lat: number, lng: number, bounds: ReturnType<typeof getBounds>) => {
    const { minLat, maxLat, minLng, maxLng } = bounds
    const x = ((lng - minLng) / (maxLng - minLng)) * dimensions.width
    const y = ((maxLat - lat) / (maxLat - minLat)) * dimensions.height
    return { x, y }
  }

  // Draw the map
  const drawMap = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Get map bounds
    const bounds = getBounds()

    // Draw background
    ctx.fillStyle = "#f3f4f6"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw grid lines
    ctx.strokeStyle = "#e5e7eb"
    ctx.lineWidth = 1

    // Vertical grid lines
    for (let i = 0; i <= 10; i++) {
      const x = (i / 10) * canvas.width
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }

    // Horizontal grid lines
    for (let i = 0; i <= 10; i++) {
      const y = (i / 10) * canvas.height
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }

    // Draw roads
    ctx.strokeStyle = "#d1d5db"
    ctx.lineWidth = 3

    // Horizontal roads
    for (let i = 2; i <= 8; i += 2) {
      const y = (i / 10) * canvas.height
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }

    // Vertical roads
    for (let i = 2; i <= 8; i += 2) {
      const x = (i / 10) * canvas.width
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }

    // Draw user location
    if (userLocation) {
      const { x, y } = geoToCanvas(userLocation.latitude, userLocation.longitude, bounds)

      // Draw circle
      ctx.fillStyle = "#3b82f6"
      ctx.beginPath()
      ctx.arc(x, y, 8, 0, Math.PI * 2)
      ctx.fill()

      // Draw border
      ctx.strokeStyle = "#ffffff"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(x, y, 8, 0, Math.PI * 2)
      ctx.stroke()
    }

    // Draw destination
    if (destination) {
      const { x, y } = geoToCanvas(destination.latitude, destination.longitude, bounds)

      // Draw circle
      ctx.fillStyle = "#ef4444"
      ctx.beginPath()
      ctx.arc(x, y, 8, 0, Math.PI * 2)
      ctx.fill()

      // Draw border
      ctx.strokeStyle = "#ffffff"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(x, y, 8, 0, Math.PI * 2)
      ctx.stroke()
    }

    // Draw buses
    buses.forEach((bus) => {
      const { x, y } = geoToCanvas(bus.latitude, bus.longitude, bounds)

      // Draw circle
      ctx.fillStyle = "#10b981"
      ctx.beginPath()
      ctx.arc(x, y, 8, 0, Math.PI * 2)
      ctx.fill()

      // Draw border
      ctx.strokeStyle = "#ffffff"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(x, y, 8, 0, Math.PI * 2)
      ctx.stroke()
    })
  }

  // Update canvas dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      const canvas = canvasRef.current
      if (!canvas) return

      const { width, height } = canvas.getBoundingClientRect()
      canvas.width = width
      canvas.height = height
      setDimensions({ width, height })
    }

    window.addEventListener("resize", updateDimensions)
    updateDimensions()

    return () => {
      window.removeEventListener("resize", updateDimensions)
    }
  }, [])

  // Draw map when data changes
  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      drawMap()
      if (onMapLoad) onMapLoad()
    }
  }, [dimensions, userLocation, destination, buses, onMapLoad])

  return (
    <div style={{ height, width: "100%", position: "relative" }}>
      <canvas ref={canvasRef} className="w-full h-full rounded-md" />

      {/* Legend */}
      <div className="absolute bottom-2 left-2 bg-white p-2 rounded-md shadow-sm text-xs">
        <div className="flex items-center mb-1">
          <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
          <span>You</span>
        </div>
        {destination && (
          <div className="flex items-center mb-1">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
            <span>Destination</span>
          </div>
        )}
        {buses.length > 0 && (
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
            <span>Bus</span>
          </div>
        )}
      </div>
    </div>
  )
}

