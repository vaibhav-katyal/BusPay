"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Camera, X } from "lucide-react"

interface QRScannerProps {
  onScan: (data: string) => void
  onClose: () => void
}

export default function QRScanner({ onScan, onClose }: QRScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let stream: MediaStream | null = null
    let animationFrameId: number

    const startScanner = async () => {
      try {
        // Request camera access
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        })

        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.play()

          // Wait for video to be ready
          videoRef.current.onloadedmetadata = () => {
            setIsScanning(true)
            scanQRCode()
          }
        }
      } catch (err) {
        console.error("Error accessing camera:", err)
        setError("Could not access camera. Please check permissions.")
      }
    }

    const scanQRCode = () => {
      if (!videoRef.current || !canvasRef.current) return

      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      if (!context) return

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      // Draw current video frame to canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height)

      // In a real implementation, you would use a QR code library here
      // For example, with jsQR:
      // const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
      // const code = jsQR(imageData.data, imageData.width, imageData.height)
      // if (code) {
      //   onScan(code.data)
      //   stopScanner()
      //   return
      // }

      // For this demo, we'll simulate a successful scan after 3 seconds
      setTimeout(() => {
        if (isScanning) {
          onScan("BT-2023-42789") // Simulated QR code data
          stopScanner()
        }
      }, 3000)

      // Continue scanning
      if (isScanning) {
        animationFrameId = requestAnimationFrame(scanQRCode)
      }
    }

    const stopScanner = () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
      setIsScanning(false)
    }

    startScanner()

    return () => {
      stopScanner()
    }
  }, [onScan])

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <div className="relative flex-1">
        <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" playsInline muted />

        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full hidden" />

        {/* Scanning overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-64 h-64 border-2 border-white relative">
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary"></div>

            {isScanning && <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-primary/70 animate-pulse"></div>}
          </div>
        </div>

        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80">
            <div className="bg-background p-4 rounded-md max-w-xs text-center">
              <p className="text-destructive mb-4">{error}</p>
              <Button onClick={onClose}>Close</Button>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-background">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Scan QR Code</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <p className="text-sm text-muted-foreground mb-4">Position the QR code within the frame to scan</p>

        <div className="flex space-x-2">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button className="flex-1" onClick={() => onScan("BT-2023-42789")}>
            <Camera className="h-4 w-4 mr-2" />
            Simulate Scan
          </Button>
        </div>
      </div>
    </div>
  )
}

