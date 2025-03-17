import { ImageResponse } from "next/og"

// Route segment config
export const runtime = "edge"

// Image metadata
export const size = {
  width: 180,
  height: 180,
}
export const contentType = "image/png"

// Image generation
export default function Icon() {
  return new ImageResponse(
    // ImageResponse JSX element
    <div
      style={{
        fontSize: 24,
        background: "transparent",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        borderRadius: "50%",
        overflow: "hidden",
      }}
    >
      <img
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-03-17%20at%2012.45.51-lyJ3nd1qh8WZvzbsBp3f9xDgDlPxBL.jpeg"
        alt="PK"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>,
    // ImageResponse options
    {
      ...size,
    },
  )
}

