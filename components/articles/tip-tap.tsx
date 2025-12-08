"use client";
import React, { useCallback, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Italic } from "lucide-react";

type Editor = {
  chain: () => any;
  focus: () => any;
  toggleHeading: (opts: { level: number }) => any;
  setParagraph: () => any;
  toggleBold: () => any;
  toggleItalic: () => any;
  toggleStrike: () => any;
  toggleHighlight: () => any;
  setTextAlign: (align: string) => any;
  run: () => void;
  isActive: (
    nameOrAttrs: string | Record<string, any>,
    attrs?: Record<string, any>
  ) => boolean;
};

interface MenuBarProps {
  editor: Editor | null;
}

export const MenuBar = ({ editor }: { editor: any }) => {


  if (!editor) {
    return null;
  }
const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false); // State untuk loading indikator

  return (
    <div className="control-group border rounded-md bg-white shadow-sm">
      <div className="flex flex-col gap-1 p-2">
        {/* Toolbar satu baris */}
        <div className="flex flex-wrap items-end gap-4">
          {/* Heading */}
          <div className="flex flex-col  items-center">
            <div className="flex gap-2">
              {[1, 2, 3].map((level) => (
                <Button
                  key={level}
                  variant="ghost"
                  onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
                  className={`w-8 h-8 flex items-center justify-center rounded-md border transition-colors ${editor.isActive("heading", { level }) ? "bg-blue-100 border-blue-400 text-blue-800 font-bold" : "border-slate-200"}`}
                  title={`Heading ${level}`}
                  style={{ padding: 0 }}
                >
                  <span style={{ fontWeight: "bold", fontSize: 13 + (3 - level) * 2, letterSpacing: 1 }}>{`H${level}`}</span>
                </Button>
              ))}
            </div>
            <span className="text-[10px] text-slate-500 mt-0.5">Header</span>
          </div>
          {/* Paragraph */}
          <div className="flex flex-col items-center">
            <Button
              variant="ghost"
              onClick={() => editor.chain().focus().setParagraph().run()}
              className={`w-8 h-8 flex items-center justify-center rounded-md border transition-colors ${editor.isActive("paragraph") ? "bg-blue-100 border-blue-400 text-blue-800" : "border-slate-200"}`}
              title="Paragraph"
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 20 20">
                <rect x="3" y="6" width="14" height="3" rx="1.5" fill="currentColor" />
                <rect x="3" y="11" width="10" height="3" rx="1.5" fill="currentColor" />
              </svg>
            </Button>
            <span className="text-[10px] text-slate-500 mt-0.5">Paragraf</span>
          </div>
          {/* Bold */}
          <div className="flex flex-col items-center">
            <Button
              variant="ghost"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`w-8 h-8 flex items-center justify-center rounded-md border transition-colors ${editor.isActive("bold") ? "bg-blue-100 border-blue-400 text-blue-800" : "border-slate-200"}`}
              title="Tebal"
            >
              <span style={{ fontWeight: "bold", fontSize: 16 }}>B</span>
            </Button>
            <span className="text-[10px] text-slate-500 mt-0.5">Tebal</span>
          </div>
          {/* Italic */}
          <div className="flex flex-col items-center">
            <Button
              variant="ghost"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`w-8 h-8 flex items-center justify-center rounded-md border transition-colors ${editor.isActive("italic") ? "bg-blue-100 border-blue-400 text-blue-800" : "border-slate-200"}`}
              title="Miring"
            >
              <Italic className="h-4 w-4" />
            </Button>
            <span className="text-[10px] text-slate-500 mt-0.5">Miring</span>
          </div>
          {/* Strikethrough */}
          <div className="flex flex-col items-center">
            <Button
              variant="ghost"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={`w-8 h-8 flex items-center justify-center rounded-md border transition-colors ${editor.isActive("strike") ? "bg-blue-100 border-blue-400 text-blue-800" : "border-slate-200"}`}
              title="Coret"
            >
              <span style={{ textDecoration: "line-through", fontSize: 16 }}>S</span>
            </Button>
            <span className="text-[10px] text-slate-500 mt-0.5">Coret</span>
          </div>
          {/* Highlight */}
          <div className="flex flex-col items-center">
            <Button
              variant="ghost"
              onClick={() => editor.chain().focus().toggleHighlight().run()}
              className={`w-8 h-8 flex items-center justify-center rounded-md border transition-colors ${editor.isActive("highlight") ? "bg-yellow-100 border-yellow-400 text-yellow-800" : "border-slate-200"}`}
              title="Sorot"
            >
              <span style={{ background: "yellow", fontWeight: "bold", fontSize: 14, borderRadius: 2, padding: "0 2px" }}>HL</span>
            </Button>
            <span className="text-[10px] text-slate-500 mt-0.5">Sorot</span>
          </div>
          {/* List Items */}
          {/* Bullet List */}
          <div className="flex flex-col items-center">
            <Button
              variant="ghost"
              onClick={() => {
                if (editor) {
                  editor.chain().focus().toggleBulletList().run();
                }
              }}
              className={`w-8 h-8 flex items-center justify-center rounded-md border transition-colors ${editor && editor.isActive("bulletList") ? "bg-blue-100 border-blue-400 text-blue-800" : "border-slate-200"}`}
              title="Bullet List"
              aria-label="Bullet List"
              type="button"
              disabled={!editor || !editor.can().chain().focus().toggleBulletList().run()}
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 20 20">
                <circle cx="6" cy="7" r="1.5" fill="currentColor" />
                <rect x="10" y="6" width="6" height="2" rx="1" fill="currentColor" />
                <circle cx="6" cy="13" r="1.5" fill="currentColor" />
                <rect x="10" y="12" width="6" height="2" rx="1" fill="currentColor" />
              </svg>
            </Button>
            <span className="text-[10px] text-slate-500 mt-0.5">List</span>
          </div>
          {/* Ordered List */}
          <div className="flex flex-col items-center">
            <Button
              variant="ghost"
              onClick={() => {
                if (editor) {
                  editor.chain().focus().toggleOrderedList().run();
                }
              }}
              className={`w-8 h-8 flex items-center justify-center rounded-md border transition-colors ${editor && editor.isActive("orderedList") ? "bg-blue-100 border-blue-400 text-blue-800" : "border-slate-200"}`}
              title="Numbered List"
              aria-label="Numbered List"
              type="button"
              disabled={!editor || !editor.can().chain().focus().toggleOrderedList().run()}
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 20 20">
                <text x="4" y="9" fontSize="4" fill="currentColor">1.</text>
                <rect x="10" y="6" width="6" height="2" rx="1" fill="currentColor" />
                <text x="4" y="15" fontSize="4" fill="currentColor">2.</text>
                <rect x="10" y="12" width="6" height="2" rx="1" fill="currentColor" />
              </svg>
            </Button>
            <span className="text-[10px] text-slate-500 mt-0.5">Numbered</span>
          </div>
          {/* Alignment */}
          {[
            {
              align: "left",
              icon: (
                <svg width="18" height="18" fill="none" viewBox="0 0 20 20">
                  <rect x="3" y="5" width="14" height="3" rx="1.5" fill="currentColor" />
                  <rect x="3" y="10" width="8" height="3" rx="1.5" fill="currentColor" />
                  <rect x="3" y="15" width="10" height="3" rx="1.5" fill="currentColor" />
                </svg>
              ),
              title: "Rata Kiri",
              label: "Kiri",
            },
            {
              align: "center",
              icon: (
                <svg width="18" height="18" fill="none" viewBox="0 0 20 20">
                  <rect x="5" y="5" width="10" height="3" rx="1.5" fill="currentColor" />
                  <rect x="3" y="10" width="14" height="3" rx="1.5" fill="currentColor" />
                  <rect x="5" y="15" width="10" height="3" rx="1.5" fill="currentColor" />
                </svg>
              ),
              title: "Rata Tengah",
              label: "Tengah",
            },
            {
              align: "right",
              icon: (
                <svg width="18" height="18" fill="none" viewBox="0 0 20 20">
                  <rect x="7" y="5" width="10" height="3" rx="1.5" fill="currentColor" />
                  <rect x="11" y="10" width="6" height="3" rx="1.5" fill="currentColor" />
                  <rect x="9" y="15" width="8" height="3" rx="1.5" fill="currentColor" />
                </svg>
              ),
              title: "Rata Kanan",
              label: "Kanan",
            },
            {
              align: "justify",
              icon: (
                <svg width="18" height="18" fill="none" viewBox="0 0 20 20">
                  <rect x="3" y="5" width="14" height="3" rx="1.5" fill="currentColor" />
                  <rect x="3" y="10" width="14" height="3" rx="1.5" fill="currentColor" />
                  <rect x="3" y="15" width="14" height="3" rx="1.5" fill="currentColor" />
                </svg>
              ),
              title: "Rata Kanan-Kiri",
              label: "Justify",
            },
          ].map(({ align, icon, title, label }) => (
            <div key={align} className="flex flex-col items-center">
              <Button
                variant="ghost"
                onClick={() => editor.chain().focus().setTextAlign(align).run()}
                className={`w-8 h-8 flex items-center justify-center rounded-md border transition-colors ${editor.isActive({ textAlign: align }) ? "bg-blue-100 border-blue-400 text-blue-800" : "border-slate-200"}`}
                title={title}
              >
                {icon}
              </Button>
              <span className="text-[10px] text-slate-500 mt-0.5">{label}</span>
            </div>
          ))}
        </div>
        {/* Keterangan */}
        <div className="mt-1 text-xs text-slate-400">
          <span>
            <b>Tips:</b> Gunakan toolbar di atas untuk memformat teks, mengatur judul, paragraf, gaya, dan perataan. Arahkan kursor ke ikon untuk melihat fungsinya.
          </span>
        </div>
      </div>
    </div>
  );
};
