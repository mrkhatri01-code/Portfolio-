"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { addPortfolioItem } from "@/lib/portfolio-service"
import { AdminPortfolioList } from "@/components/admin-portfolio-list"
import { AdminContactList } from "@/components/admin-contact-list"
import { LogOut } from "lucide-react"
import { MultiImageUpload } from "@/components/multi-image-upload"
import { SocialIcons } from "@/components/social-icons"

export default function AdminPage() {
  // Rest of the component remains the same
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    imageUrl: "",
    images: [] as string[],
  })

  useEffect(() => {
    // Check if user is authenticated and if authentication has expired
    const authenticated = localStorage.getItem("adminAuthenticated") === "true"
    const expirationTime = localStorage.getItem("adminAuthExpires")
    const isExpired = expirationTime && Number.parseInt(expirationTime) < Date.now()

    if (!authenticated || isExpired) {
      // Clear expired authentication
      if (isExpired) {
        localStorage.removeItem("adminAuthenticated")
        localStorage.removeItem("adminAuthExpires")
      }
      router.push("/admin/login")
      setIsAuthenticated(false)
    } else {
      setIsAuthenticated(true)
    }

    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("adminAuthenticated")
    localStorage.removeItem("adminAuthExpires")

    // Clear the cookie
    document.cookie = "adminAuthenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Secure"

    // Redirect to login
    router.push("/admin/login")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }))
  }

  const handleImagesChange = (images: string[]) => {
    setFormData((prev) => ({
      ...prev,
      images,
      // Set the first image as the main image if available
      imageUrl: images.length > 0 ? images[0] : "",
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await addPortfolioItem(formData)
      setFormData({
        title: "",
        description: "",
        category: "",
        imageUrl: "",
        images: [],
      })
      router.refresh()
    } catch (error) {
      console.error("Failed to add portfolio item:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  // If not authenticated, the useEffect will redirect to login
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <div className="flex items-center gap-2">
          <div className="relative h-8 w-8 overflow-hidden rounded-full">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-03-17%20at%2012.45.51-lyJ3nd1qh8WZvzbsBp3f9xDgDlPxBL.jpeg"
              alt="Prabhakar Khatri"
              className="h-full w-full object-cover"
            />
          </div>
          <span className="font-bold">Prabhakar Portfolio Admin</span>
        </div>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/">
            Back to Site
          </Link>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="flex items-center gap-1">
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </nav>
      </header>
      {/* Rest of the component remains the same */}
      <main className="flex-1 container py-6 md:py-12 px-4 md:px-6">
        <Tabs defaultValue="portfolio" className="w-full">
          <TabsList className="mb-6 w-full overflow-x-auto flex-nowrap">
            <TabsTrigger value="portfolio">Portfolio Items</TabsTrigger>
            <TabsTrigger value="messages">Contact Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Portfolio Item</CardTitle>
                  <CardDescription>Fill out the form below to add a new project to your portfolio.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Project Title</Label>
                      <Input
                        id="title"
                        name="title"
                        placeholder="Enter project title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select value={formData.category} onValueChange={handleCategoryChange} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="web-design">Web Design</SelectItem>
                          <SelectItem value="graphic-design">Graphic Design</SelectItem>
                          <SelectItem value="ui-ux">UI/UX Design</SelectItem>
                          <SelectItem value="branding">Branding</SelectItem>
                          <SelectItem value="photography">Photography</SelectItem>
                          <SelectItem value="illustration">Illustration</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Enter project description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Project Images</Label>
                      <p className="text-xs text-muted-foreground mb-2">
                        Upload multiple images for your project. The first image will be used as the main thumbnail.
                      </p>
                      <MultiImageUpload value={formData.images} onChange={handleImagesChange} />
                    </div>
                    <Button type="submit" disabled={isSubmitting || formData.images.length === 0} className="w-full">
                      {isSubmitting ? "Adding..." : "Add Portfolio Item"}
                    </Button>
                    {formData.images.length === 0 && (
                      <p className="text-xs text-destructive text-center">Please add at least one image</p>
                    )}
                  </form>
                </CardContent>
              </Card>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Manage Portfolio Items</CardTitle>
                    <CardDescription>View, edit, or delete your existing portfolio items.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AdminPortfolioList />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Contact Messages</CardTitle>
                <CardDescription>View messages from visitors who have contacted you.</CardDescription>
              </CardHeader>
              <CardContent>
                <AdminContactList />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">© 2025 Prabhakar Portfolio Admin. All rights reserved.</p>
        <SocialIcons className="my-2 sm:my-0" />
      </footer>
    </div>
  )
}

