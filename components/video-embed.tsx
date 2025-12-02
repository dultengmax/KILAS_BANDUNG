"use client"

import { useState } from "react"
import Image from "next/image"
import { Play } from "lucide-react"

interface VideoEmbedProps {
  url: string
  title: string
  thumbnail?: string
  provider?: "youtube" | "vimeo"
}

export function VideoEmbed({ url, title, thumbnail, provider = "youtube" }: VideoEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  let embedUrl = ""
  let videoId = ""

  if (provider === "youtube") {
    videoId = new URL(url).searchParams.get("v") || url.split("/").pop() || ""
    embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}`
  } else if (provider === "vimeo") {
    videoId = url.split("/").pop() || ""
    embedUrl = `https://player.vimeo.com/video/${videoId}`
  }

  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden group">
      {!isPlaying ? (
        <>
          {thumbnail && (
            <Image src={thumbnail || "/placeholder.svg"} alt={title} fill className="object-cover absolute inset-0" />
          )}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all" />
          <button
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 flex items-center justify-center"
            aria-label={`Play video: ${title}`}
          >
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play className="w-8 h-8 text-amber-600 fill-amber-600 ml-1" />
            </div>
          </button>
        </>
      ) : (
        <iframe
          src={embedUrl}
          title={title}
          width="100%"
          height="100%"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0"
          loading="lazy"
        />
      )}
    </div>
  )
}
