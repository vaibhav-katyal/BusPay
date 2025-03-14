import type React from "react"
export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen bg-background">{children}</div>
}

