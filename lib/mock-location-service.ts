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

// Default locations for demo purposes
const DEFAULT_LOCATIONS = {
  "Sector 18": { latitude: 28.5691, longitude: 77.3209 },
  "Market Complex": { latitude: 28.5746, longitude: 77.3345 },
  "City Hospital": { latitude: 28.5681, longitude: 77.3491 },
  "Town Hall": { latitude: 28.5982, longitude: 77.3138 },
  "City Center": { latitude: 28.5746, longitude: 77.354 },
  "Railway Station": { latitude: 28.5832, longitude: 77.3056 },
  Airport: { latitude: 28.5612, longitude: 77.3398 },
  "Sector 62": { latitude: 28.6266, longitude: 77.365 },
}

// Mock bus data
const MOCK_BUSES: BusLocation[] = [
  {
    busId: "bus-1",
    routeId: "route-42",
    vehicleId: "DL-1234",
    latitude: 28.5701,
    longitude: 77.3219,
    nextStop: "Market Complex",
    eta: 5,
  },
  {
    busId: "bus-2",
    routeId: "route-15",
    vehicleId: "DL-5678",
    latitude: 28.5756,
    longitude: 77.3355,
    nextStop: "City Hospital",
    eta: 12,
  },
  {
    busId: "bus-3",
    routeId: "route-27",
    vehicleId: "DL-9012",
    latitude: 28.5691,
    longitude: 77.3501,
    nextStop: "Airport",
    eta: 18,
  },
]

// Function to get current location (mocked)
export const getCurrentLocation = (): Promise<LocationData> => {
  return new Promise((resolve) => {
    // Simulate a delay
    setTimeout(() => {
      // Return a location near Sector 18
      resolve({
        latitude: 28.5691 + (Math.random() * 0.002 - 0.001),
        longitude: 77.3209 + (Math.random() * 0.002 - 0.001),
        accuracy: 10,
        timestamp: Date.now(),
      })
    }, 500)
  })
}

// Function to get location by place name
export const getLocationByPlaceName = (placeName: string): LocationData | null => {
  const location = DEFAULT_LOCATIONS[placeName as keyof typeof DEFAULT_LOCATIONS]
  if (!location) return null

  // Add a small random offset to simulate real-world variation
  return {
    latitude: location.latitude + (Math.random() * 0.0004 - 0.0002),
    longitude: location.longitude + (Math.random() * 0.0004 - 0.0002),
    timestamp: Date.now(),
  }
}

// Mock event listeners
const eventListeners: Record<string, Array<(data: any) => void>> = {}

// Function to emit events
export const emitEvent = (eventName: string, data: any) => {
  if (eventListeners[eventName]) {
    eventListeners[eventName].forEach((listener) => listener(data))
  }
}

// Function to listen for events
export const addEventListener = (eventName: string, callback: (data: any) => void) => {
  if (!eventListeners[eventName]) {
    eventListeners[eventName] = []
  }
  eventListeners[eventName].push(callback)

  // Return a function to remove the listener
  return () => {
    if (eventListeners[eventName]) {
      eventListeners[eventName] = eventListeners[eventName].filter((cb) => cb !== callback)
    }
  }
}

// Function to start sharing conductor location
export const startSharingConductorLocation = (busId: string, routeId: string, vehicleId: string) => {
  // Create a mock bus location
  const mockBus: BusLocation = {
    busId,
    routeId,
    vehicleId,
    latitude: 28.5691,
    longitude: 77.3209,
    nextStop: "Market Complex",
    eta: 5,
  }

  // Set up interval to simulate movement
  const intervalId = setInterval(() => {
    // Update location slightly to simulate movement
    mockBus.latitude += Math.random() * 0.0006 - 0.0003
    mockBus.longitude += Math.random() * 0.0006 - 0.0003

    // Randomly update ETA and next stop occasionally
    if (Math.random() > 0.8) {
      mockBus.eta = Math.max(1, mockBus.eta - 1)

      if (mockBus.eta < 2) {
        if (mockBus.nextStop === "Market Complex") {
          mockBus.nextStop = "City Hospital"
          mockBus.eta = 4
        } else if (mockBus.nextStop === "City Hospital") {
          mockBus.nextStop = "Town Hall"
          mockBus.eta = 5
        } else if (mockBus.nextStop === "Town Hall") {
          mockBus.nextStop = "City Center"
          mockBus.eta = 3
        }
      }
    }

    // Emit the updated location
    emitEvent("conductor:location", mockBus)
    emitEvent("bus:location_update", mockBus)
  }, 3000)

  // Return a function to stop sharing
  return () => clearInterval(intervalId)
}

// Function to listen for nearby buses
export const listenForNearbyBuses = (callback: (buses: BusLocation[]) => void) => {
  // Initially send mock buses
  setTimeout(() => {
    callback([...MOCK_BUSES])
  }, 1000)

  // Set up interval to update buses
  const intervalId = setInterval(() => {
    // Update bus locations slightly
    const updatedBuses = MOCK_BUSES.map((bus) => ({
      ...bus,
      latitude: bus.latitude + (Math.random() * 0.0006 - 0.0003),
      longitude: bus.longitude + (Math.random() * 0.0006 - 0.0003),
      eta: Math.max(1, bus.eta + (Math.random() > 0.7 ? -1 : 0)),
    }))

    callback(updatedBuses)
  }, 5000)

  // Return a function to stop listening
  return () => clearInterval(intervalId)
}

// Function to request nearby buses based on customer location
export const requestNearbyBuses = async (startPoint: string, destination: string) => {
  // Get the start location
  const startLocation = getLocationByPlaceName(startPoint)

  if (startLocation) {
    // Create mock buses near the start location
    const mockBuses = [
      {
        busId: "bus-1",
        routeId: "route-42",
        vehicleId: "DL-1234",
        latitude: startLocation.latitude + 0.003,
        longitude: startLocation.longitude - 0.002,
        nextStop: startPoint,
        eta: 5,
      },
      {
        busId: "bus-2",
        routeId: "route-15",
        vehicleId: "DL-5678",
        latitude: startLocation.latitude - 0.002,
        longitude: startLocation.longitude + 0.004,
        nextStop: startPoint,
        eta: 12,
      },
    ]

    // Emit the mock buses
    setTimeout(() => {
      emitEvent("customer:nearby_buses", mockBuses)
    }, 1000)
  }
}

