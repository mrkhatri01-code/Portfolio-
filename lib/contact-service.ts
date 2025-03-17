"use server"

// This is a simulated database for contact submissions
const contactSubmissions: ContactSubmission[] = []

export interface ContactSubmission {
  id: string
  name: string
  email: string
  message: string
  createdAt: Date
}

export async function saveContactSubmission(data: {
  name: string
  email: string
  message: string
}): Promise<ContactSubmission> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const submission: ContactSubmission = {
    id: Date.now().toString(),
    ...data,
    createdAt: new Date(),
  }

  contactSubmissions.push(submission)

  // Log the submission for Netlify functions to capture
  console.log("New contact submission:", JSON.stringify(submission, null, 2))

  return submission
}

export async function getContactSubmissions(): Promise<ContactSubmission[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Return a copy of the array to prevent direct mutation
  return [...contactSubmissions].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
}

