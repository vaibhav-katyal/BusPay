"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Star } from "lucide-react"

export default function FeedbackPage() {
  const router = useRouter()
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState("")

  const handleSubmit = () => {
    // In a real app, you would submit the feedback to the server
    router.push("/customer/home")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-primary text-primary-foreground p-4">
        <h1 className="text-xl font-bold">Trip Feedback</h1>
      </div>

      <div className="flex-1 p-4 space-y-6">
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="text-center">
              <h2 className="text-lg font-semibold">How was your trip?</h2>
              <p className="text-sm text-muted-foreground">Your feedback helps us improve our service</p>
            </div>

            <div className="flex justify-center space-x-2 py-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} type="button" onClick={() => setRating(star)} className="focus:outline-none">
                  <Star
                    className={`h-8 w-8 ${
                      rating >= star ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <label htmlFor="feedback" className="text-sm font-medium">
                Additional Comments (Optional)
              </label>
              <Textarea
                id="feedback"
                placeholder="Tell us about your experience..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Did you face any issues?</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm">
                  Bus was late
                </Button>
                <Button variant="outline" size="sm">
                  Cleanliness issues
                </Button>
                <Button variant="outline" size="sm">
                  Rude staff
                </Button>
                <Button variant="outline" size="sm">
                  Payment problems
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Button className="w-full" onClick={handleSubmit}>
            Submit Feedback
          </Button>

          <Button variant="outline" className="w-full" onClick={() => router.push("/customer/home")}>
            Skip
          </Button>
        </div>
      </div>
    </div>
  )
}

