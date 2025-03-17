import Link from "next/link"
import Image from "next/image"

export function ProfileAvatar() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="relative h-8 w-8 overflow-hidden rounded-full">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-03-17%20at%2012.45.51-lyJ3nd1qh8WZvzbsBp3f9xDgDlPxBL.jpeg"
          alt="Prabhakar Khatri"
          fill
          className="object-cover"
          priority
        />
      </div>
      <span className="font-bold">Prabhakar Portfolio</span>
    </Link>
  )
}

