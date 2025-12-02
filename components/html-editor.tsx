"use client"

import { useState } from "react"
import { Bold, Italic, Underline, List, Code, Heading2, Link, Zap } from "lucide-react"

interface HtmlEditorProps {
  value: string
  onChange: (value: string) => void
}

export function HtmlEditor({ value, onChange }: HtmlEditorProps) {
  const [activeTab, setActiveTab] = useState<"visual" | "html">("visual")

  const insertFormatting = (before: string, after = "") => {
    const textarea = document.getElementById("html-editor") as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end) || "text"
    const newValue = value.substring(0, start) + before + selectedText + after + value.substring(end)

    onChange(newValue)

    setTimeout(() => {
      textarea.selectionStart = start + before.length
      textarea.selectionEnd = start + before.length + selectedText.length
      textarea.focus()
    }, 0)
  }

  const toolbar = [
    {
      icon: Heading2,
      label: "Heading 2",
      onClick: () => insertFormatting("<h2>", "</h2>"),
    },
    {
      icon: Bold,
      label: "Bold",
      onClick: () => insertFormatting("<strong>", "</strong>"),
    },
    {
      icon: Italic,
      label: "Italic",
      onClick: () => insertFormatting("<em>", "</em>"),
    },
    {
      icon: Underline,
      label: "Underline",
      onClick: () => insertFormatting("<u>", "</u>"),
    },
    {
      icon: List,
      label: "List",
      onClick: () => insertFormatting("<ul><li>", "</li></ul>"),
    },
    {
      icon: Code,
      label: "Code",
      onClick: () => insertFormatting("<code>", "</code>"),
    },
    {
      icon: Link,
      label: "Link",
      onClick: () => insertFormatting('<a href="url">', "</a>"),
    },
    {
      icon: Zap,
      label: "Paragraph",
      onClick: () => insertFormatting("<p>", "</p>"),
    },
  ]

  return (
    <div className="border border-slate-300 dark:border-slate-600 rounded-lg overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700">
        <button
          onClick={() => setActiveTab("visual")}
          className={`flex-1 px-4 py-3 text-sm font-medium transition ${
            activeTab === "visual"
              ? "bg-blue-600 text-white"
              : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600"
          }`}
        >
          Editor Visual
        </button>
        <button
          onClick={() => setActiveTab("html")}
          className={`flex-1 px-4 py-3 text-sm font-medium transition ${
            activeTab === "html"
              ? "bg-blue-600 text-white"
              : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600"
          }`}
        >
          HTML Code
        </button>
      </div>

      {activeTab === "visual" && (
        <>
          {/* Toolbar */}
          <div className="flex flex-wrap gap-1 p-3 bg-white dark:bg-slate-800 border-b border-slate-300 dark:border-slate-600">
            {toolbar.map((tool) => (
              <button
                key={tool.label}
                onClick={tool.onClick}
                title={tool.label}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition text-slate-700 dark:text-slate-300"
              >
                <tool.icon className="w-5 h-5" />
              </button>
            ))}
          </div>

          {/* Editor Preview */}
          <div
            className="p-4 min-h-96 bg-white dark:bg-slate-800 text-slate-900 dark:text-white prose dark:prose-invert max-w-none overflow-auto"
            dangerouslySetInnerHTML={{ __html: value }}
          />
        </>
      )}

      {activeTab === "html" && (
        <textarea
          id="html-editor"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Masukkan HTML di sini... Contoh: <p>Konten artikel</p><h2>Subheading</h2>"
          className="w-full min-h-96 p-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-sm border-0 focus:outline-none focus:ring-0"
        />
      )}
    </div>
  )
}
