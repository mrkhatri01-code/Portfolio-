import Link from "next/link"
import { SocialIcons } from "@/components/social-icons"
import { Instagram, DribbbleIcon as Behance } from "lucide-react"
import { ProfileAvatar } from "@/components/profile-avatar"
import { AdminAccess } from "@/components/admin-access"

export default function AboutPage() {
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
          <Link
            className="text-sm font-medium underline underline-offset-4 font-semibold"
            href="/about"
            aria-current="page"
          >
            About
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/contact">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">About Me</h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    I'm a passionate creative professional with expertise in design, development, and creative
                    problem-solving.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="max-w-[600px]">
                    With over 5 years of experience in the creative industry, I've worked on a variety of projects
                    ranging from web design to brand identity. My approach combines technical expertise with creative
                    vision to deliver exceptional results.
                  </p>
                  <p className="max-w-[600px]">
                    I believe in the power of design to solve problems and create meaningful experiences. Every project
                    is an opportunity to learn, grow, and push the boundaries of what's possible.
                  </p>
                  <p className="max-w-[600px]">My skills include:</p>
                  <ul className="list-disc pl-5 space-y-1 max-w-[600px]">
                    <li>Web Design & Development</li>
                    <li>UI/UX Design</li>
                    <li>Graphic Design</li>
                    <li>Brand Identity</li>
                    <li>Photography</li>
                    <li>Illustration</li>
                  </ul>

                  <div className="mt-4">
                    <p className="font-medium mb-2">Connect with me:</p>
                    <div className="flex items-center gap-4">
                      <Link
                        href="https://www.instagram.com/_mrkhatri01/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Instagram className="h-5 w-5" />
                        <span>Instagram</span>
                      </Link>
                      <Link
                        href="https://www.behance.net/prabhakarkhatri"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Behance className="h-5 w-5" />
                        <span>Behance</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  alt="Prabhakar Khatri"
                  className="aspect-[3/4] overflow-hidden rounded-xl object-cover object-center shadow-lg"
                  height="600"
                  width="450"
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-03-17%20at%2012.45.50-OYeTe7X5lqaPXFzC5mE5AsRsjtXEqo.jpeg"
                />
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

