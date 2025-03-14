"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, Smartphone } from "lucide-react"

export default function SignupPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otp, setOtp] = useState("")
  const [language, setLanguage] = useState("english")

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would send OTP to the phone number
    setStep(2)
  }

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would verify the OTP
    setStep(3)
  }

  const handleLanguageSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would save the language preference
    router.push("/customer/home")
  }

  return (
    <div className="container max-w-md mx-auto p-4 min-h-screen flex flex-col">
      <div className="mb-6">
        <Link href="/customer" className="inline-flex items-center text-sm">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Link>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="text-muted-foreground mt-2">Join BusTicket for a smarter commute</p>
        </div>

        {step === 1 && (
          <Tabs defaultValue="phone" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="phone">Phone Number</TabsTrigger>
              <TabsTrigger value="google">Google</TabsTrigger>
            </TabsList>

            <TabsContent value="phone">
              <form onSubmit={handlePhoneSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex">
                    <div className="flex items-center justify-center px-3 border border-r-0 rounded-l-md bg-muted">
                      +91
                    </div>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      className="rounded-l-none"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  Continue
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="google">
              <div className="flex flex-col items-center justify-center space-y-4">
                <Button variant="outline" className="w-full" onClick={() => setStep(3)}>
                  Continue with Google
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        )}

        {step === 2 && (
          <form onSubmit={handleOtpSubmit} className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="otp">Enter OTP</Label>
                <Button variant="link" className="p-0 h-auto" onClick={() => setStep(1)}>
                  Change Number
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <Smartphone className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Sent to +91 {phoneNumber}</span>
              </div>

              <Input
                id="otp"
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                className="text-center text-lg tracking-widest"
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Verify OTP
            </Button>

            <div className="text-center">
              <Button variant="link" className="p-0 h-auto">
                Resend OTP
              </Button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleLanguageSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label>Select Preferred Language</Label>

              <RadioGroup value={language} onValueChange={setLanguage} className="space-y-3">
                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="english" id="english" />
                  <Label htmlFor="english" className="flex-1 cursor-pointer">
                    English
                  </Label>
                </div>

                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="hindi" id="hindi" />
                  <Label htmlFor="hindi" className="flex-1 cursor-pointer">
                    हिंदी (Hindi)
                  </Label>
                </div>

                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="punjabi" id="punjabi" />
                  <Label htmlFor="punjabi" className="flex-1 cursor-pointer">
                    ਪੰਜਾਬੀ (Punjabi)
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button type="submit" className="w-full">
              Continue
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}

