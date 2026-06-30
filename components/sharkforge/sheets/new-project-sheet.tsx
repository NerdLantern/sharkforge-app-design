"use client"

import { useState } from "react"
import { X, Sparkles, Plus, Link2, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Sheet } from "../sheet"

const ENHANCED =
  "Refresh and modernize the space: demo the dated finishes, install new cabinetry and quartz surfaces, update lighting and fixtures, repaint in a warm neutral palette, and stage with curated decor for a clean, high-end finish."

export function NewProjectSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState("")
  const [date, setDate] = useState("2026-06-30")
  const [desc, setDesc] = useState("")
  const [enhancing, setEnhancing] = useState(false)
  const [links, setLinks] = useState<string[]>([])
  const [linkInput, setLinkInput] = useState("")

  const reset = () => {
    setName("")
    setDate("2026-06-30")
    setDesc("")
    setEnhancing(false)
    setLinks([])
    setLinkInput("")
  }
  const close = () => {
    onClose()
    setTimeout(reset, 300)
  }

  const enhance = () => {
    setEnhancing(true)
    setTimeout(() => {
      setDesc((d) => (d.trim() ? `${d.trim()} ${ENHANCED}` : ENHANCED))
      setEnhancing(false)
    }, 1400)
  }

  const addLink = () => {
    const v = linkInput.trim()
    if (!v) return
    setLinks((l) => [...l, v])
    setLinkInput("")
  }

  return (
    <Sheet open={open} onClose={close} className="px-5 pb-6 pt-2">
      <div className="flex items-start justify-between pt-2">
        <div>
          <p className="sf-eyebrow">Start</p>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">New Project</h2>
        </div>
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="flex size-8 items-center justify-center rounded-full bg-white/[0.06] text-muted-foreground active:scale-90"
        >
          <X className="size-4" />
        </button>
      </div>

      <div className="mt-5 max-h-[60vh] space-y-5 overflow-y-auto sf-scroll">
        <div>
          <p className="sf-eyebrow mb-2">Project Name</p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Kitchen Overhaul"
            className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-3 text-[0.9375rem] text-foreground outline-none placeholder:text-muted-foreground/50 focus:border-primary/40"
          />
        </div>

        <div>
          <p className="sf-eyebrow mb-2">Start Date</p>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="sf-num w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-3 text-[0.9375rem] text-foreground outline-none focus:border-primary/40 [color-scheme:dark]"
          />
        </div>

        <div>
          <p className="sf-eyebrow mb-2">Description</p>
          <div className="relative">
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={4}
              placeholder="Describe the scope of work…"
              className={cn(
                "w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-3 pb-11 text-[0.9375rem] leading-relaxed text-foreground outline-none placeholder:text-muted-foreground/50 focus:border-primary/40",
                enhancing && "sf-shimmer",
              )}
            />
            <button
              type="button"
              onClick={enhance}
              disabled={enhancing}
              className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/12 px-3 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-wider text-primary transition-transform active:scale-95 disabled:opacity-70"
            >
              {enhancing ? <Loader2 className="size-3 animate-spin" /> : <Sparkles className="size-3" />}
              {enhancing ? "Enhancing" : "Enhance"}
            </button>
          </div>
        </div>

        <div>
          <p className="sf-eyebrow mb-2">Inspiration Links</p>
          {links.length > 0 ? (
            <div className="mb-2 space-y-1.5">
              {links.map((l, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2 text-[0.8125rem] text-muted-foreground"
                >
                  <Link2 className="size-3.5 shrink-0 text-primary/70" />
                  <span className="truncate">{l}</span>
                </div>
              ))}
            </div>
          ) : null}
          <div className="flex items-center gap-2">
            <input
              value={linkInput}
              onChange={(e) => setLinkInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.nativeEvent.isComposing) {
                  e.preventDefault()
                  addLink()
                }
              }}
              placeholder="https://pinterest.com/…"
              className="min-w-0 flex-1 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-3 text-[0.875rem] text-foreground outline-none placeholder:text-muted-foreground/50 focus:border-primary/40"
            />
            <button
              type="button"
              onClick={addLink}
              aria-label="Add link"
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-muted-foreground active:scale-90"
            >
              <Plus className="size-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-3 border-t border-white/[0.06] pt-4">
        <button
          type="button"
          onClick={close}
          className="flex-1 rounded-full py-3 text-[0.8125rem] font-semibold uppercase tracking-wider text-muted-foreground active:opacity-60"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={close}
          disabled={!name.trim()}
          className="flex-[1.4] rounded-full bg-primary py-3 text-[0.8125rem] font-semibold uppercase tracking-wider text-primary-foreground transition-transform active:scale-95 disabled:opacity-40"
        >
          Start Project
        </button>
      </div>
    </Sheet>
  )
}
