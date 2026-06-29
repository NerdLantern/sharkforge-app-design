"use client"

import { type ReactNode, useEffect } from "react"
import { cn } from "@/lib/utils"

export function Sheet({
  open,
  onClose,
  children,
  className,
}: {
  open: boolean
  onClose: () => void
  children: ReactNode
  className?: string
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end">
      {/* scrim */}
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="sf-animate-fade absolute inset-0 bg-black/55 backdrop-blur-[2px]"
      />
      {/* sheet */}
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "sf-animate-sheet sf-chrome relative max-h-[92%] overflow-hidden rounded-t-[2rem] pb-[env(safe-area-inset-bottom)]",
          className,
        )}
      >
        <div className="flex justify-center pt-3">
          <div className="h-1 w-9 rounded-full bg-white/20" />
        </div>
        {children}
      </div>
    </div>
  )
}
