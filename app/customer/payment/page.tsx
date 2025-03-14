"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, CreditCard, Wallet } from "lucide-react"

export default function PaymentPage() {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayment = () => {
    setIsProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      router.push("/customer/ticket")
    }, 2000)
  }

  return (
    <div className="min-h-screen pb-6">
      <div className="bg-primary text-primary-foreground p-4 flex items-center">
        <Link href="/customer/booking" className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-bold">Payment</h1>
      </div>

      <div className="p-4 space-y-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between mb-2">
              <span className="text-muted-foreground">Route</span>
              <span>Route 42</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-muted-foreground">Passengers</span>
              <span>1</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-muted-foreground">Fare</span>
              <span>₹10</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-muted-foreground">Platform Fee</span>
              <span>₹2</span>
            </div>
            <div className="flex justify-between font-bold pt-2 border-t">
              <span>Total Amount</span>
              <span>₹12</span>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Select Payment Method</h2>

          <Tabs defaultValue="upi" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="upi">UPI</TabsTrigger>
              <TabsTrigger value="wallet">Wallet</TabsTrigger>
              <TabsTrigger value="card">Card</TabsTrigger>
            </TabsList>

            <TabsContent value="upi" className="space-y-4 pt-4">
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" className="flex flex-col h-auto py-4">
                  <img src="/placeholder.svg?height=24&width=24" alt="Google Pay" className="h-6 w-6 mb-1" />
                  <span className="text-xs">Google Pay</span>
                </Button>

                <Button variant="outline" className="flex flex-col h-auto py-4">
                  <img src="/placeholder.svg?height=24&width=24" alt="PhonePe" className="h-6 w-6 mb-1" />
                  <span className="text-xs">PhonePe</span>
                </Button>

                <Button variant="outline" className="flex flex-col h-auto py-4">
                  <img src="/placeholder.svg?height=24&width=24" alt="Paytm" className="h-6 w-6 mb-1" />
                  <span className="text-xs">Paytm</span>
                </Button>
              </div>

              <Button className="w-full" onClick={handlePayment} disabled={isProcessing}>
                {isProcessing ? "Processing..." : "Pay ₹12"}
              </Button>
            </TabsContent>

            <TabsContent value="wallet" className="space-y-4 pt-4">
              <Card>
                <CardContent className="p-4 flex items-center">
                  <Wallet className="h-5 w-5 mr-3 text-primary" />
                  <div className="flex-1">
                    <p className="font-medium">BusTicket Wallet</p>
                    <p className="text-sm text-muted-foreground">Balance: ₹50</p>
                  </div>
                </CardContent>
              </Card>

              <Button className="w-full" onClick={handlePayment} disabled={isProcessing}>
                {isProcessing ? "Processing..." : "Pay ₹12 from Wallet"}
              </Button>
            </TabsContent>

            <TabsContent value="card" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Card>
                  <CardContent className="p-4 flex items-center">
                    <CreditCard className="h-5 w-5 mr-3 text-primary" />
                    <div className="flex-1">
                      <p className="font-medium">Add Debit/Credit Card</p>
                      <p className="text-sm text-muted-foreground">Securely save your card details</p>
                    </div>
                  </CardContent>
                </Card>

                <Button className="w-full" variant="outline">
                  Add New Card
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

