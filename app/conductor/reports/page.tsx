"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ConductorNavbar from "@/components/conductor-navbar"
import { BarChart, Calendar, Download, Users } from "lucide-react"

export default function ReportsPage() {
  const [timeRange, setTimeRange] = useState("today")

  return (
    <div className="min-h-screen pb-16">
      <div className="bg-primary text-primary-foreground p-4">
        <h1 className="text-xl font-bold">Trip Reports</h1>
      </div>

      <div className="p-4 space-y-6">
        <div className="flex justify-between items-center">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="text-2xl font-bold">247</h3>
              <p className="text-sm text-muted-foreground">Total Passengers</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <BarChart className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="text-2xl font-bold">₹3,240</h3>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="trips" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="trips">Trips</TabsTrigger>
            <TabsTrigger value="issues">Issues</TabsTrigger>
          </TabsList>

          <TabsContent value="trips" className="space-y-4 pt-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="font-medium">Trip ID: TR-2023-8754</h3>
                    <p className="text-sm text-muted-foreground">Route 42</p>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>Today, 4:30 PM</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Passengers</p>
                    <p className="font-medium">24</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Revenue</p>
                    <p className="font-medium">₹480</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Occupancy</p>
                    <p className="font-medium">65%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="font-medium">Trip ID: TR-2023-8753</h3>
                    <p className="text-sm text-muted-foreground">Route 15</p>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>Today, 2:15 PM</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Passengers</p>
                    <p className="font-medium">32</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Revenue</p>
                    <p className="font-medium">₹640</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Occupancy</p>
                    <p className="font-medium">80%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="font-medium">Trip ID: TR-2023-8752</h3>
                    <p className="text-sm text-muted-foreground">Route 42</p>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>Today, 12:00 PM</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Passengers</p>
                    <p className="font-medium">18</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Revenue</p>
                    <p className="font-medium">₹360</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Occupancy</p>
                    <p className="font-medium">45%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="issues" className="space-y-4 pt-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Bus Delay</h3>
                  <div className="text-sm px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">Resolved</div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Trip ID: TR-2023-8753</p>
                <p className="text-sm">Bus was delayed by 15 minutes due to traffic congestion.</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Payment Issue</h3>
                  <div className="text-sm px-2 py-1 rounded-full bg-red-100 text-red-800">Pending</div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Trip ID: TR-2023-8752</p>
                <p className="text-sm">Passenger reported payment was deducted but ticket was not generated.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <ConductorNavbar />
    </div>
  )
}

