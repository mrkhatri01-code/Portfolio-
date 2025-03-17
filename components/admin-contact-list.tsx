"use client"

import { useEffect, useState } from "react"
import { getContactSubmissions, type ContactSubmission } from "@/lib/contact-service"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function AdminContactList() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadSubmissions() {
      try {
        const data = await getContactSubmissions()
        setSubmissions(data)
      } catch (error) {
        console.error("Failed to load contact submissions:", error)
      } finally {
        setLoading(false)
      }
    }

    loadSubmissions()
  }, [])

  if (loading) {
    return <div className="py-4">Loading contact submissions...</div>
  }

  if (submissions.length === 0) {
    return <div className="py-4 text-muted-foreground">No contact submissions found.</div>
  }

  return (
    <div className="space-y-4">
      {submissions.map((submission) => (
        <Card key={submission.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-base">{submission.name}</CardTitle>
                <CardDescription>
                  <a href={`mailto:${submission.email}`} className="hover:underline">
                    {submission.email}
                  </a>
                </CardDescription>
              </div>
              <span className="text-xs text-muted-foreground">{new Date(submission.createdAt).toLocaleString()}</span>
            </div>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-line text-sm">{submission.message}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

