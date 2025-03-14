import { io } from "socket.io-client"

// This would be your actual Socket.io server URL in production
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001"

// Create a singleton socket instance
let socket: any

export const initializeSocket = () => {
  if (!socket) {
    socket = io(SOCKET_URL)
    console.log("Socket initialized")
  }
  return socket
}

export const getSocket = () => {
  if (!socket) {
    return initializeSocket()
  }
  return socket
}

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}

