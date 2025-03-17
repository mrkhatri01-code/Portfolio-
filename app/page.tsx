import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { PortfolioGrid } from "@/components/portfolio-grid"
import { Button } from "@/components/ui/button"
import { ContactForm } from "@/components/contact-form"
import { SocialIcons } from "@/components/social-icons"
import { ProfileAvatar } from "@/components/profile-avatar"
import { AdminAccess } from "@/components/admin-access"

export default function Home() {
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
      <main className="flex-1">
        <section className="w-full py-8 md:py-12 lg:py-16 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl/none">
                    Prabhakar's Creative Portfolio
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground text-sm md:text-base lg:text-xl">
                    Showcasing my best work and creative projects. Explore my portfolio to see what I can do.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/project">
                    <Button className="w-full sm:w-auto inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 sm:px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                      View Projects
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 sm:px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    >
                      Contact Me
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center mt-6 lg:mt-0">
                <img
                  alt="Hero"
                  className="aspect-video overflow-hidden rounded-xl object-cover object-center"
                  height="310"
                  src="/placeholder.svg?height=620&width=1100"
                  width="550"
                />
              </div>
            </div>
          </div>
        </section>
        {/* Rest of the sections remain the same */}
        <section id="projects" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">My Projects</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  A collection of my best work and creative projects.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-1">
              <PortfolioGrid />
            </div>
          </div>
        </section>
        <section id="about" className="w-full py-8 md:py-12 lg:py-16 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tighter">About Me</h2>
                  <p className="max-w-[600px] text-muted-foreground text-sm md:text-base lg:text-xl">
                    I'm a passionate creative professional with expertise in design, development, and creative
                    problem-solving.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="max-w-[600px] text-sm md:text-base">
                    With over 5 years of experience in the creative industry, I've worked on a variety of projects
                    ranging from web design to brand identity. My approach combines technical expertise with creative
                    vision to deliver exceptional results.
                  </p>
                  <p className="max-w-[600px] text-sm md:text-base">
                    I believe in the power of design to solve problems and create meaningful experiences. Every project
                    is an opportunity to learn, grow, and push the boundaries of what's possible.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center mt-6 lg:mt-0">
                <img
                  alt="About Me"
                  className="aspect-square overflow-hidden rounded-xl object-cover object-center"
                  height="400"
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-03-17%20at%2012.45.50-OYeTe7X5lqaPXFzC5mE5AsRsjtXEqo.jpeg"
                  width="400"
                />
              </div>
            </div>
          </div>
        </section>
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Get in Touch</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Have a project in mind? Let's work together to bring your ideas to life.
                </p>
              </div>
              <ContactForm />
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

