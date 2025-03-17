"use server"

import type { PortfolioItem, PortfolioItemInput } from "./types"

// This is a simulated database since we don't have a real database connection
// In a real application, you would connect to a database like MongoDB, PostgreSQL, etc.
let portfolioItems: PortfolioItem[] = [
  {
    id: "1",
    title: "E-commerce Website Redesign",
    description:
      "A complete redesign of an e-commerce platform focusing on user experience and conversion optimization.",
    category: "web-design",
    imageUrl: "/placeholder.svg?height=400&width=600&text=E-commerce+Redesign",
    images: [
      "/placeholder.svg?height=400&width=600&text=E-commerce+Redesign+1",
      "/placeholder.svg?height=400&width=600&text=E-commerce+Redesign+2",
    ],
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "Brand Identity for Tech Startup",
    description:
      "Created a comprehensive brand identity including logo, color palette, typography, and brand guidelines.",
    category: "branding",
    imageUrl: "/placeholder.svg?height=400&width=600&text=Brand+Identity",
    images: [
      "/placeholder.svg?height=400&width=600&text=Brand+Identity+1",
      "/placeholder.svg?height=400&width=600&text=Brand+Identity+2",
      "/placeholder.svg?height=400&width=600&text=Brand+Identity+3",
    ],
    createdAt: new Date(),
  },
  {
    id: "3",
    title: "Mobile App UI Design",
    description:
      "Designed the user interface for a fitness tracking mobile application with a focus on simplicity and usability.",
    category: "ui-ux",
    imageUrl: "/placeholder.svg?height=400&width=600&text=Mobile+App+UI",
    images: [
      "/placeholder.svg?height=400&width=600&text=Mobile+App+UI+1",
      "/placeholder.svg?height=400&width=600&text=Mobile+App+UI+2",
    ],
    createdAt: new Date(),
  },
]

export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Return a copy of the array to prevent direct mutation
  return [...portfolioItems].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
}

export async function getPortfolioItemById(id: string): Promise<PortfolioItem | undefined> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  return portfolioItems.find((item) => item.id === id)
}

export async function addPortfolioItem(input: PortfolioItemInput): Promise<PortfolioItem> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Ensure images array exists
  const images = input.images || []

  // If there's an imageUrl but no images, add the imageUrl to images
  if (input.imageUrl && images.length === 0) {
    images.push(input.imageUrl)
  }

  // If there are images but no imageUrl, use the first image as imageUrl
  const imageUrl = input.imageUrl || (images.length > 0 ? images[0] : undefined)

  const newItem: PortfolioItem = {
    id: Date.now().toString(),
    ...input,
    imageUrl,
    images,
    createdAt: new Date(),
  }

  portfolioItems.push(newItem)
  return newItem
}

export async function updatePortfolioItem(
  id: string,
  input: Partial<PortfolioItemInput>,
): Promise<PortfolioItem | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const index = portfolioItems.findIndex((item) => item.id === id)
  if (index === -1) return null

  // Handle images array
  let images = input.images !== undefined ? input.images : portfolioItems[index].images

  // If there's an imageUrl but no images, add the imageUrl to images
  if (input.imageUrl && (!images || images.length === 0)) {
    images = [input.imageUrl]
  }

  // If there are images but no imageUrl, use the first image as imageUrl
  const imageUrl =
    input.imageUrl !== undefined
      ? input.imageUrl
      : images && images.length > 0
        ? images[0]
        : portfolioItems[index].imageUrl

  portfolioItems[index] = {
    ...portfolioItems[index],
    ...input,
    imageUrl,
    images,
  }

  return portfolioItems[index]
}

export async function deletePortfolioItem(id: string): Promise<boolean> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 600))

  const initialLength = portfolioItems.length
  portfolioItems = portfolioItems.filter((item) => item.id !== id)

  return portfolioItems.length < initialLength
}

