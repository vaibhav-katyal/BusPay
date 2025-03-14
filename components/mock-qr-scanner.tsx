"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X, QrCode } from "lucide-react"

interface MockQRScannerProps {
  onScan: (data: string) => void
  onClose: () => void
}

export default function MockQRScanner({ onScan, onClose }: MockQRScannerProps) {
  const [scanning, setScanning] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (scanning) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 2
          if (newProgress >= 100) {
            clearInterval(interval)
            setTimeout(() => {
              onScan("BT-2023-42789") // Simulated QR code data
            }, 500)
            return 100
          }
          return newProgress
        })
      }, 50)

      return () => clearInterval(interval)
    }
  }, [scanning, onScan])

  const handleStartScan = () => {
    setScanning(true)
  }

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex flex-col">
      <div className="relative flex-1 flex items-center justify-center">
        <div className="w-64 h-64 border-2 border-white relative">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary"></div>

          {scanning && (
            <>
              <div
                className="absolute top-1/2 left-0 right-0 h-0.5 bg-primary/70"
                style={{
                  transform: `translateY(${(progress - 50) * 1.28}px)`,
                  transition: "transform 0.05s linear",
                }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <QrCode className="h-32 w-32 text-white/20" />
              </div>
            </>
          )}
        </div>
      </div>

      <div className="p-4 bg-background">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Scan QR Code</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          {scanning ? `Scanning... ${progress}%` : "Position the QR code within the frame to scan"}
        </p>

        <div className="flex space-x-2">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button className="flex-1" onClick={handleStartScan} disabled={scanning}>
            {scanning ? "Scanning..." : "Start Scan"}
          </Button>
        </div>
      </div>
    </div>
  )
}

