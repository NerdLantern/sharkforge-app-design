"use client"

import { AlertTriangle } from "lucide-react"
import { Sheet } from "../sheet"

export function DestructiveSheet({
  open,
  onClose,
  onConfirm,
  title = "Delete this exercise?",
  description = "This will permanently remove the exercise and all of its logged sets and personal records. This action cannot be undone.",
  confirmLabel = "Delete exercise",
}: {
  open: boolean
  onClose: () => void
  onConfirm?: () => void
  title?: string
  description?: string
  confirmLabel?: string
}) {
  return (
    <Sheet open={open} onClose={onClose}>
      <div className="px-6 pb-8 pt-6">
        <div className="flex flex-col items-center text-center">
          <div className="flex size-14 items-center justify-center rounded-2xl border border-destructive/25 bg-destructive/12 text-destructive">
            <AlertTriangle className="size-7" />
          </div>
          <h2 className="mt-4 text-lg font-semibold tracking-tight text-foreground text-balance">{title}</h2>
          <p className="mt-2 max-w-[18rem] text-pretty text-[0.8125rem] leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
        <div className="mt-6 flex flex-col gap-2.5">
          <button
            type="button"
            onClick={() => {
              onConfirm?.()
              onClose()
            }}
            className="w-full rounded-2xl bg-destructive py-3.5 text-[0.9375rem] font-semibold text-destructive-foreground transition-transform active:scale-[0.98]"
          >
            {confirmLabel}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-2xl border border-white/10 bg-white/[0.04] py-3.5 text-[0.9375rem] font-semibold text-foreground transition-transform active:scale-[0.98]"
          >
            Cancel
          </button>
        </div>
      </div>
    </Sheet>
  )
}
