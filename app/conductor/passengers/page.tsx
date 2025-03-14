"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import ConductorNavbar from "@/components/conductor-navbar"
import { Search, User, Clock } from "lucide-react"

export default function PassengersPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock passenger data
  const passengers = [
    {
      id: "P001",
      name: "Rahul Sharma",
      ticketId: "BT-2023-42789",
      boardingPoint: "Sector 18",
      destination: "City Center",
      status: "Boarded",
      time: "4:40 PM",
    },
    {
      id: "P002",
      name: "Priya Singh",
      ticketId: "BT-2023-42790",
      boardingPoint: "Sector 18",
      destination: "Town Hall",
      status: "Booked",
      time: "4:45 PM",
    },
    {
      id: "P003",
      name: "Amit Kumar",
      ticketId: "BT-2023-42791",
      boardingPoint: "Market Complex",
      destination: "City Center",
      status: "Booked",
      time: "4:50 PM",
    },
    {
      id: "P004",
      name: "Neha Gupta",
      ticketId: "BT-2023-42792",
      boardingPoint: "City Hospital",
      destination: "City Center",
      status: "Booked",
      time: "5:00 PM",
    },
  ]

  const filteredPassengers = passengers.filter(
    (passenger) =>
      passenger.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      passenger.ticketId.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen pb-16">
      <div className="bg-primary text-primary-foreground p-4">
        <h1 className="text-xl font-bold">Passenger List</h1>
      </div>

      <div className="p-4 space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or ticket ID"
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Passengers ({filteredPassengers.length})</h2>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              All
            </Button>
            <Button variant="outline" size="sm">
              Boarded
            </Button>
            <Button variant="outline" size="sm">
              Booked
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredPassengers.map((passenger) => (
            <Card key={passenger.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-2 text-primary" />
                    <span className="font-medium">{passenger.name}</span>
                  </div>
                  <div
                    className={`text-sm px-2 py-1 rounded-full ${
                      passenger.status === "Boarded" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {passenger.status}
                  </div>
                </div>

                <div className="text-sm text-muted-foreground mb-3">Ticket ID: {passenger.ticketId}</div>

                <div className="flex items-start space-x-4">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <div className="w-0.5 h-10 bg-muted-foreground/30 my-1"></div>
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>

                  <div className="flex-1 space-y-2 text-sm">
                    <div>
                      <p className="font-medium">{passenger.boardingPoint}</p>
                      <p className="text-xs text-muted-foreground">Boarding Point</p>
                    </div>

                    <div>
                      <p className="font-medium">{passenger.destination}</p>
                      <p className="text-xs text-muted-foreground">Destination</p>
                    </div>
                  </div>

                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>{passenger.time}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <ConductorNavbar />
    </div>
  )
}

