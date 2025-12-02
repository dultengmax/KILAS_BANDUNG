"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, Trash2, Play, Pause } from "lucide-react"

interface AudioFile {
  id: string
  name: string
  url: string
  duration: number
}

interface AudioUploaderProps {
  onAudioAdd: (audio: AudioFile) => void
  onAudioRemove: (id: string) => void
  audios: AudioFile[]
}

export function AudioUploader({ onAudioAdd, onAudioRemove, audios }: AudioUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [playingId, setPlayingId] = useState<string | null>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files
    if (!files) return

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (!file.type.startsWith("audio/")) {
        alert("Hanya file audio yang didukung")
        continue
      }

      setIsUploading(true)

      const reader = new FileReader()
      reader.onload = (event) => {
        const url = event.target?.result as string

        const audio = new Audio(url)
        audio.onloadedmetadata = () => {
          const newAudio: AudioFile = {
            id: `audio-${Date.now()}-${Math.random()}`,
            name: file.name,
            url,
            duration: Math.round(audio.duration),
          }
          onAudioAdd(newAudio)
          setIsUploading(false)
        }
      }
      reader.readAsDataURL(file)
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-8 text-center hover:border-blue-600 dark:hover:border-blue-400 transition cursor-pointer"
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="audio/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        <Upload className="w-12 h-12 text-slate-400 dark:text-slate-500 mx-auto mb-3" />
        <p className="text-slate-600 dark:text-slate-400 font-medium">
          {isUploading ? "Mengupload..." : "Drag and drop audio di sini"}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
          atau klik untuk memilih file (MP3, WAV, OGG, M4A)
        </p>
      </div>

      {/* Audio List */}
      {audios.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Audio yang Diupload:</h4>
          {audios.map((audio) => (
            <div
              key={audio.id}
              className="flex items-center justify-between bg-slate-50 dark:bg-slate-700 p-4 rounded-lg border border-slate-200 dark:border-slate-600"
            >
              <div className="flex items-center gap-3 flex-1">
                <button
                  onClick={() => setPlayingId(playingId === audio.id ? null : audio.id)}
                  className="p-2 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-full transition text-blue-600 dark:text-blue-400"
                >
                  {playingId === audio.id ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{audio.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{formatDuration(audio.duration)}</p>
                </div>
              </div>
              <button
                onClick={() => onAudioRemove(audio.id)}
                className="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded transition text-red-600 dark:text-red-400"
              >
                <Trash2 className="w-5 h-5" />
              </button>

              {playingId === audio.id && (
                <audio src={audio.url} autoPlay onEnded={() => setPlayingId(null)} className="hidden" />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Audio Embed Info */}
      <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p className="text-sm text-blue-900 dark:text-blue-100">
          💡 <strong>Tip:</strong> Audio akan ditampilkan sebagai player di artikel. Gunakan format: &lt;audio controls
          src=&quot;[url audio]&quot;&gt;&lt;/audio&gt;
        </p>
      </div>
    </div>
  )
}
