"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getPortfolioItems } from "@/lib/portfolio-service"
import type { PortfolioItem } from "@/lib/types"

export function PortfolioGrid() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPortfolioItems() {
      try {
        const items = await getPortfolioItems()
        setPortfolioItems(items)
      } catch (error) {
        console.error("Failed to load portfolio items:", error)
      } finally {
        setLoading(false)
      }
    }

    loadPortfolioItems()
  }, [])

  if (loading) {
    return <div className="flex justify-center py-12">Loading portfolio items...</div>
  }

  if (portfolioItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-muted-foreground mb-4">No portfolio items found.</p>
        {/* Removed the admin dashboard link for security */}
      </div>
    )
  }

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {portfolioItems.map((item) => (
        <Card key={item.id} className="overflow-hidden h-full flex flex-col">
          <div className="aspect-video w-full overflow-hidden">
            <img
              src={item.imageUrl || "/placeholder.svg?height=400&width=600"}
              alt={item.title}
              className="object-cover w-full h-full transition-all hover:scale-105"
            />
          </div>
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.category}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="line-clamp-3">{item.description}</p>
          </CardContent>
          <CardFooter>
            <Link href={`/project/${item.id}`} className="text-primary hover:underline">
              View Project
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

