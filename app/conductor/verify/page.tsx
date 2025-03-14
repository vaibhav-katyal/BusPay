"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ConductorNavbar from "@/components/conductor-navbar"
import { QrCode, Check, X, User } from "lucide-react"
import MockQRScanner from "@/components/mock-qr-scanner"

export default function VerifyPage() {
  const [scanActive, setScanActive] = useState(false)
  const [verificationResult, setVerificationResult] = useState<null | {
    valid: boolean
    passenger?: {
      name: string
      ticketId: string
      boardingPoint: string
      destination: string
    }
  }>(null)

  const handleStartScan = () => {
    setScanActive(true)
  }

  const handleScanResult = (data: string) => {
    setScanActive(false)

    // In a real app, you would validate the QR code data with your backend
    // For this demo, we'll assume it's a valid ticket ID
    setVerificationResult({
      valid: true,
      passenger: {
        name: "Rahul Sharma",
        ticketId: data,
        boardingPoint: "Sector 18",
        destination: "City Center",
      },
    })
  }

  const handleManualEntry = () => {
    // Simulate a successful verification
    setVerificationResult({
      valid: true,
      passenger: {
        name: "Rahul Sharma",
        ticketId: "BT-2023-42789",
        boardingPoint: "Sector 18",
        destination: "City Center",
      },
    })
  }

  const handleReset = () => {
    setVerificationResult(null)
    setScanActive(false)
  }

  return (
    <div className="min-h-screen pb-16">
      <div className="bg-primary text-primary-foreground p-4">
        <h1 className="text-xl font-bold">Verify Tickets</h1>
      </div>

      <div className="p-4 space-y-6">
        {!verificationResult ? (
          <>
            <Card>
              <CardContent className="p-4 flex flex-col items-center justify-center">
                {!scanActive && (
                  <>
                    <div className="w-full aspect-square max-w-xs mx-auto mb-4 bg-muted rounded-lg flex items-center justify-center">
                      <QrCode className="h-16 w-16 text-muted-foreground" />
                    </div>

                    <div className="text-center mb-4">
                      <h2 className="text-lg font-semibold">Scan Passenger Ticket</h2>
                      <p className="text-sm text-muted-foreground">Position the QR code within the frame to scan</p>
                    </div>

                    <Button className="w-full" onClick={handleStartScan}>
                      Start Scan
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>

            <div className="text-center">
              <Button variant="link" onClick={handleManualEntry}>
                Enter Ticket ID Manually
              </Button>
            </div>
          </>
        ) : (
          <Card className={verificationResult.valid ? "border-green-500" : "border-red-500"}>
            <CardContent className="p-4">
              <div className="flex justify-center mb-4">
                {verificationResult.valid ? (
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                    <X className="h-8 w-8 text-red-600" />
                  </div>
                )}
              </div>

              <div className="text-center mb-4">
                <h2 className="text-lg font-semibold">
                  {verificationResult.valid ? "Valid Ticket" : "Invalid Ticket"}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {verificationResult.valid
                    ? "Passenger can board the bus"
                    : "This ticket is invalid or has already been used"}
                </p>
              </div>

              {verificationResult.valid && verificationResult.passenger && (
                <div className="space-y-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{verificationResult.passenger.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Ticket ID: {verificationResult.passenger.ticketId}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <div className="w-0.5 h-10 bg-muted-foreground/30 my-1"></div>
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>

                    <div className="flex-1 space-y-2 text-sm">
                      <div>
                        <p className="font-medium">{verificationResult.passenger.boardingPoint}</p>
                        <p className="text-xs text-muted-foreground">Boarding Point</p>
                      </div>

                      <div>
                        <p className="font-medium">{verificationResult.passenger.destination}</p>
                        <p className="text-xs text-muted-foreground">Destination</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex space-x-2">
                <Button className="flex-1" onClick={handleReset}>
                  Scan Another
                </Button>

                {verificationResult.valid && (
                  <Button variant="outline" className="flex-1">
                    Assign Seat
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {scanActive && <MockQRScanner onScan={handleScanResult} onClose={() => setScanActive(false)} />}

      <ConductorNavbar />
    </div>
  )
}

