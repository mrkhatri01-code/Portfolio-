"use client"

import type React from "react"

import { useState, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, AlertCircle } from "lucide-react"
import { saveContactSubmission } from "@/lib/contact-service"
import { SocialIcons } from "@/components/social-icons"
import { ProfileAvatar } from "@/components/profile-avatar"
import { AdminAccess } from "@/components/admin-access"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    success?: boolean
    message?: string
  }>({})
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const formRef = useRef<HTMLFormElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus({})

    try {
      // Save the submission to our database
      await saveContactSubmission(formData)

      // Simulate email sending success
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setFormStatus({
        success: true,
        message: "Thank you for your message! I'll get back to you soon.",
      })

      // Reset form
      setFormData({ name: "", email: "", message: "" })
    } catch (error) {
      console.error("Error submitting form:", error)
      setFormStatus({
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <ProfileAvatar />
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/">
            Home
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/project">
            Projects
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/about">
            About
          </Link>
          <Link
            className="text-sm font-medium underline underline-offset-4 font-semibold"
            href="/contact"
            aria-current="page"
          >
            Contact
          </Link>
        </nav>
      </header>
      {/* Rest of the component remains the same */}
      <main className="flex-1">
        <section className="w-full py-8 md:py-12 lg:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-[85vw] md:max-w-[900px]">
                <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-tighter">Get in Touch</h2>
                <p className="text-muted-foreground text-sm md:text-base lg:text-xl">
                  Have a project in mind? Let's work together to bring your ideas to life.
                </p>
              </div>
              <div className="w-full max-w-md space-y-4 mt-4">
                {formStatus.success && (
                  <Alert className="bg-green-50 border-green-200">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-600">
                      {formStatus.message || "Thank you for your message! I'll get back to you soon."}
                    </AlertDescription>
                  </Alert>
                )}

                {formStatus.success === false && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      {formStatus.message || "Failed to send your message. Please try again."}
                    </AlertDescription>
                  </Alert>
                )}

                {/* Regular form with JavaScript handling */}
                <form ref={formRef} onSubmit={handleSubmit} className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Enter your message"
                      required
                      className="min-h-[150px]"
                    />
                  </div>
                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>

                {/* Hidden Netlify form for fallback */}
                <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" hidden>
                  <input type="hidden" name="form-name" value="contact" />
                  <div hidden>
                    <input name="bot-field" />
                  </div>
                  <input type="text" name="name" />
                  <input type="email" name="email" />
                  <textarea name="message"></textarea>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-4 sm:py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          © 2025 Prabhakar Portfolio
          <AdminAccess />
          All rights reserved.
        </p>
        <SocialIcons className="my-2 sm:my-0" />
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

