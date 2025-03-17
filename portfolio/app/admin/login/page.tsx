"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Add a small delay to prevent brute force attacks
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Check credentials against the hardcoded values
    if (email === "admin@khatriprabhakar.com.np" && password === "@_mrkhatri01") {
      // Store authentication in localStorage with an expiration time (24 hours)
      const expirationTime = Date.now() + 24 * 60 * 60 * 1000
      localStorage.setItem("adminAuthenticated", "true")
      localStorage.setItem("adminAuthExpires", expirationTime.toString())

      // Set a cookie for server-side authentication
      document.cookie = `adminAuthenticated=true; path=/; max-age=${60 * 60 * 24}; SameSite=Strict; Secure`

      // Redirect to admin dashboard
      router.push("/admin")
    } else {
      setError("Invalid email or password. Please try again.")
    }

    setIsLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Prabhakar Portfolio Admin</CardTitle>
          <CardDescription>Enter your credentials to access the admin panel</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <Link href="/" className="text-sm text-muted-foreground hover:underline w-full text-center">
            Return to website
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

