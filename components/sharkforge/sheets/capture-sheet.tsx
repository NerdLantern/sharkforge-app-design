"use client"

import { useState } from "react"
import { X, Camera, ImageIcon, PenLine } from "lucide-react"
import { cn } from "@/lib/utils"
import { Sheet } from "../sheet"
import { ReceiptScanner, type OcrResult } from "../remodel/receipt-scanner"
import { ExpenseForm, useExpenseDraft } from "../remodel/expense-form"

type Mode = "expense" | "return"
type Tab = "Scan" | "Library" | "Manual"
type Phase = "pick" | "scanning" | "review"

const TABS: { key: Tab; icon: typeof Camera }[] = [
  { key: "Scan", icon: Camera },
  { key: "Library", icon: ImageIcon },
  { key: "Manual", icon: PenLine },
]

export function CaptureSheet({
  open,
  onClose,
  mode = "expense",
}: {
  open: boolean
  onClose: () => void
  mode?: Mode
}) {
  const [tab, setTab] = useState<Tab>("Scan")
  const [phase, setPhase] = useState<Phase>("pick")
  const [draft, setDraft] = useExpenseDraft()

  const isReturn = mode === "return"
  const eyebrow = isReturn ? "Refund" : "Capture"
  const title = isReturn ? "New return" : "New expense"

  const reset = () => {
    setTab("Scan")
    setPhase("pick")
    setDraft({ name: "", projectId: draft.projectId, materials: 0, labor: 0, date: "2026-06-30", notes: "" })
  }

  const close = () => {
    onClose()
    setTimeout(reset, 300)
  }

  const onScanComplete = (r: OcrResult) => {
    setDraft({
      name: r.name,
      projectId: draft.projectId,
      materials: r.amount,
      labor: 0,
      date: r.date,
      notes: r.notes,
    })
    setPhase("review")
  }

  const selectTab = (t: Tab) => {
    setTab(t)
    if (t === "Manual") setPhase("review")
    else setPhase("pick")
  }

  return (
    <Sheet open={open} onClose={close} className="px-5 pb-6 pt-2">
      <div className="flex items-start justify-between pt-2">
        <div>
          <p className="sf-eyebrow">{eyebrow}</p>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h2>
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

      {/* Source tabs */}
      <div className="sf-inset mt-5 flex rounded-2xl p-1">
        {TABS.map(({ key, icon: Icon }) => {
          const active = key === tab
          return (
            <button
              key={key}
              type="button"
              onClick={() => selectTab(key)}
              className={cn(
                "relative flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2.5 text-[0.8125rem] font-medium transition-colors",
                active ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {active ? (
                <span
                  className="absolute inset-0 rounded-xl border border-white/10 bg-white/[0.07]"
                  style={{ boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.12)" }}
                />
              ) : null}
              <Icon className="relative size-4" />
              <span className="relative">{key}</span>
            </button>
          )
        })}
      </div>

      <div className="mt-4 max-h-[60vh] overflow-y-auto sf-scroll">
        {/* Pick / dropzone */}
        {phase === "pick" ? (
          <button
            type="button"
            onClick={() => setPhase("scanning")}
            className="sf-animate-fade flex w-full flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-6 py-12 text-center transition-colors active:bg-white/[0.04]"
          >
            <span className="flex size-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-muted-foreground">
              <Camera className="size-5" />
            </span>
            <p className="mt-4 text-[0.9375rem] font-semibold text-foreground">
              {tab === "Library" ? "Tap to choose photo" : "Tap to scan receipt"}
            </p>
            <p className="sf-eyebrow mt-2">PNG · JPG · HEIC · 8 MB MAX</p>
          </button>
        ) : null}

        {/* Scanning OCR animation */}
        {phase === "scanning" ? (
          <div className="sf-animate-fade rounded-2xl border border-white/[0.06] bg-white/[0.015]">
            <ReceiptScanner onComplete={onScanComplete} />
          </div>
        ) : null}

        {/* Review form */}
        {phase === "review" ? (
          <div className="sf-animate-rise">
            <ExpenseForm draft={draft} onChange={setDraft} isReturn={isReturn} />
          </div>
        ) : null}
      </div>

      {/* Footer actions */}
      {phase === "review" ? (
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
            disabled={!draft.name.trim()}
            className="flex-[1.4] rounded-full bg-primary py-3 text-[0.8125rem] font-semibold uppercase tracking-wider text-primary-foreground transition-transform active:scale-95 disabled:opacity-40"
          >
            {isReturn ? "Log Return" : "Save Expense"}
          </button>
        </div>
      ) : null}
    </Sheet>
  )
}
