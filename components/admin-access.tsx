"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export function AdminAccess() {
  const router = useRouter()
  const [clicks, setClicks] = useState(0)
  const [lastClickTime, setLastClickTime] = useState(0)

  useEffect(() => {
    if (clicks >= 5) {
      router.push("/admin/login")
      setClicks(0)
    }

    // Reset clicks after 3 seconds of inactivity
    const now = Date.now()
    if (now - lastClickTime > 3000) {
      setClicks(0)
    }

    // Reset clicks counter after 3 seconds
    const timer = setTimeout(() => {
      setClicks(0)
    }, 3000)

    return () => clearTimeout(timer)
  }, [clicks, lastClickTime, router])

  const handleClick = () => {
    setClicks((prev) => prev + 1)
    setLastClickTime(Date.now())
  }

  return (
    <span onClick={handleClick} className="cursor-default select-none" aria-hidden="true">
      .
    </span>
  )
}

