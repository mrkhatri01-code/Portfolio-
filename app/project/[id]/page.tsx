import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getPortfolioItemById } from "@/lib/portfolio-service"
import { ImageGallery } from "@/components/image-gallery"
import { SocialIcons } from "@/components/social-icons"
import { ProfileAvatar } from "@/components/profile-avatar"
import { AdminAccess } from "@/components/admin-access"

interface ProjectPageProps {
  params: {
    id: string
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getPortfolioItemById(params.id)

  if (!project) {
    notFound()
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
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/contact">
            Contact
          </Link>
        </nav>
      </header>
      {/* Rest of the component remains the same */}
      <main className="flex-1 container py-6 md:py-12 px-4 md:px-6">
        <Link href="/project">
          <Button variant="ghost" className="mb-4 md:mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
        </Link>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <ImageGallery images={project.images} />
          </div>
          <div className="space-y-4">
            <h1 className="text-2xl md:text-3xl font-bold">{project.title}</h1>
            <div className="inline-block bg-muted px-3 py-1 rounded-full text-sm">
              {project.category.replace("-", " ")}
            </div>
            <p className="text-muted-foreground">{new Date(project.createdAt).toLocaleDateString()}</p>
            <div className="border-t pt-4 mt-4">
              <p className="whitespace-pre-line">{project.description}</p>
            </div>
          </div>
        </div>
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

