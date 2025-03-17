import Link from "next/link"
import { Instagram, DribbbleIcon as Behance } from "lucide-react"

interface SocialIconsProps {
  className?: string
}

export function SocialIcons({ className }: SocialIconsProps) {
  return (
    <div className={`flex items-center gap-4 ${className || ""}`}>
      <Link
        href="https://www.instagram.com/_mrkhatri01/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Instagram"
      >
        <Instagram className="h-5 w-5" />
      </Link>
      <Link
        href="https://www.behance.net/prabhakarkhatri"
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Behance"
      >
        <Behance className="h-5 w-5" />
      </Link>
    </div>
  )
}

