export interface PortfolioItem {
  id: string
  title: string
  description: string
  category: string
  imageUrl?: string
  images: string[]
  createdAt: Date
}

export interface PortfolioItemInput {
  title: string
  description: string
  category: string
  imageUrl?: string
  images: string[]
}

