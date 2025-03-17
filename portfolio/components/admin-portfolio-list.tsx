"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Trash2, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getPortfolioItems, deletePortfolioItem, updatePortfolioItem } from "@/lib/portfolio-service"
import type { PortfolioItem, PortfolioItemInput } from "@/lib/types"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MultiImageUpload } from "@/components/multi-image-upload"

export function AdminPortfolioList() {
  const router = useRouter()
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [editing, setEditing] = useState<string | null>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [editFormData, setEditFormData] = useState<PortfolioItemInput>({
    title: "",
    description: "",
    category: "",
    imageUrl: "",
    images: [],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    loadPortfolioItems()
  }, [])

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

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this item?")) {
      setDeleting(id)
      try {
        await deletePortfolioItem(id)
        setPortfolioItems((prev) => prev.filter((item) => item.id !== id))
        router.refresh()
      } catch (error) {
        console.error("Failed to delete portfolio item:", error)
      } finally {
        setDeleting(null)
      }
    }
  }

  function handleEdit(item: PortfolioItem) {
    setEditing(item.id)
    setEditFormData({
      title: item.title,
      description: item.description,
      category: item.category,
      imageUrl: item.imageUrl || "",
      images: item.images || [],
    })
    setEditDialogOpen(true)
  }

  async function handleEditSubmit() {
    if (!editing) return

    if (editFormData.images.length === 0) {
      alert("Please add at least one image")
      return
    }

    setIsSubmitting(true)
    try {
      const updatedItem = await updatePortfolioItem(editing, editFormData)
      if (updatedItem) {
        setPortfolioItems((prev) => prev.map((item) => (item.id === editing ? updatedItem : item)))
      }
      setEditDialogOpen(false)
      router.refresh()
    } catch (error) {
      console.error("Failed to update portfolio item:", error)
    } finally {
      setIsSubmitting(false)
      setEditing(null)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCategoryChange = (value: string) => {
    setEditFormData((prev) => ({ ...prev, category: value }))
  }

  const handleImagesChange = (images: string[]) => {
    setEditFormData((prev) => ({
      ...prev,
      images,
      // Set the first image as the main image if available
      imageUrl: images.length > 0 ? images[0] : "",
    }))
  }

  if (loading) {
    return <div className="py-4">Loading portfolio items...</div>
  }

  if (portfolioItems.length === 0) {
    return <div className="py-4 text-muted-foreground">No portfolio items found.</div>
  }

  return (
    <>
      <div className="space-y-4">
        {portfolioItems.map((item) => (
          <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 gap-3">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 overflow-hidden rounded">
                <img
                  src={item.imageUrl || "/placeholder.svg?height=100&width=100"}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.category}</p>
                <p className="text-xs text-muted-foreground">{item.images.length} images</p>
              </div>
            </div>
            <div className="flex gap-2 mt-2 sm:mt-0">
              <Button variant="outline" size="icon" onClick={() => handleEdit(item)} disabled={editing === item.id}>
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleDelete(item.id)}
                disabled={deleting === item.id}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Portfolio Item</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Project Title</Label>
              <Input id="edit-title" name="title" value={editFormData.title} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-category">Category</Label>
              <Select value={editFormData.category} onValueChange={handleCategoryChange} required>
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
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                name="description"
                value={editFormData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Project Images</Label>
              <p className="text-xs text-muted-foreground mb-2">
                Upload multiple images for your project. The first image will be used as the main thumbnail.
              </p>
              <MultiImageUpload value={editFormData.images} onChange={handleImagesChange} />
              {editFormData.images.length === 0 && (
                <p className="text-xs text-destructive">Please add at least one image</p>
              )}
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setEditDialogOpen(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button onClick={handleEditSubmit} disabled={isSubmitting || editFormData.images.length === 0}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

