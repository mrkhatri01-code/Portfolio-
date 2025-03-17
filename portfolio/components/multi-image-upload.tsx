"use client"

import type React from "react"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { X, Plus, ArrowUp, ArrowDown } from "lucide-react"

interface MultiImageUploadProps {
  value: string[]
  onChange: (value: string[]) => void
  className?: string
}

export function MultiImageUpload({ value = [], onChange, className }: MultiImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File is too large. Maximum size is 5MB.")
      return
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed.")
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result as string
      onChange([...value, result])
    }
    reader.readAsDataURL(file)

    // Clear the input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleRemoveImage = (index: number) => {
    const newImages = [...value]
    newImages.splice(index, 1)
    onChange(newImages)
  }

  const handleMoveImage = (index: number, direction: "up" | "down") => {
    if ((direction === "up" && index === 0) || (direction === "down" && index === value.length - 1)) {
      return
    }

    const newImages = [...value]
    const newIndex = direction === "up" ? index - 1 : index + 1

    // Swap the images
    const temp = newImages[index]
    newImages[index] = newImages[newIndex]
    newImages[newIndex] = temp

    onChange(newImages)
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className={className}>
      <input type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef} className="hidden" />

      <div className="grid grid-cols-1 gap-4">
        {value.map((image, index) => (
          <div key={index} className="relative border rounded-md overflow-hidden">
            <img
              src={image || "/placeholder.svg"}
              alt={`Project image ${index + 1}`}
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-2 right-2 flex gap-1">
              {index > 0 && (
                <Button type="button" variant="secondary" size="icon" onClick={() => handleMoveImage(index, "up")}>
                  <ArrowUp className="h-4 w-4" />
                </Button>
              )}
              {index < value.length - 1 && (
                <Button type="button" variant="secondary" size="icon" onClick={() => handleMoveImage(index, "down")}>
                  <ArrowDown className="h-4 w-4" />
                </Button>
              )}
              <Button type="button" variant="destructive" size="icon" onClick={() => handleRemoveImage(index)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          className="h-48 flex flex-col items-center justify-center gap-2 border-dashed"
          onClick={handleButtonClick}
        >
          <Plus className="h-6 w-6" />
          <span>Add Image</span>
        </Button>
      </div>
    </div>
  )
}

