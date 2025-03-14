import { getSocket } from "./socket"

// Types for our location data
export interface LocationData {
  latitude: number
  longitude: number
  accuracy?: number
  timestamp?: number
}

export interface BusLocation extends LocationData {
  busId: string
  routeId: string
  vehicleId: string
  nextStop: string
  eta: number // in minutes
}

// Function to get current location
export const getCurrentLocation = (): Promise<LocationData> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp,
        })
      },
      (error) => {
        reject(error)
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    )
  })
}

// Function to start sharing conductor location
export const startSharingConductorLocation = (busId: string, routeId: string, vehicleId: string) => {
  const socket = getSocket()

  // Set up interval to continuously update location
  const intervalId = setInterval(async () => {
    try {
      const location = await getCurrentLocation()

      // Mock next stop and ETA data (in a real app, this would come from your backend)
      const busLocationData: BusLocation = {
        ...location,
        busId,
        routeId,
        vehicleId,
        nextStop: "Market Complex",
        eta: 5,
      }

      // Emit the location to the server
      socket.emit("conductor:location", busLocationData)
    } catch (error) {
      console.error("Error getting location:", error)
    }
  }, 10000) // Update every 10 seconds

  return () => clearInterval(intervalId)
}

// Function to listen for nearby buses
export const listenForNearbyBuses = (callback: (buses: BusLocation[]) => void) => {
  const socket = getSocket()

  socket.on("customer:nearby_buses", (buses: BusLocation[]) => {
    callback(buses)
  })

  return () => {
    socket.off("customer:nearby_buses")
  }
}

// Function to request nearby buses based on customer location
export const requestNearbyBuses = async (startPoint: string, destination: string) => {
  try {
    const socket = getSocket()
    const location = await getCurrentLocation()

    socket.emit("customer:request_buses", {
      location,
      startPoint,
      destination,
    })
  } catch (error) {
    console.error("Error requesting nearby buses:", error)
  }
}

