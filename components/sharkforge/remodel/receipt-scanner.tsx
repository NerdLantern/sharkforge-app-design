"use client"

import { useEffect, useRef, useState } from "react"
import { ScanLine, Check } from "lucide-react"
import { cn } from "@/lib/utils"

export type OcrResult = {
  name: string
  amount: number
  date: string // ISO
  notes: string
}

const STAGES = ["Reading image", "Detecting text", "Extracting line items", "Matching totals"] as const

/* A believable mock OCR payload (deterministic) */
const MOCK_RESULT: OcrResult = {
  name: "Artificial Grass Wall Panels",
  amount: 132.08,
  date: "2026-06-23",
  notes: "12-Pack 20×20 in. Artificial Grass Wall Panels\nHOME DEPOT #6281\nSUBTOTAL 122.30 · TAX 9.78",
}

/* skeleton receipt lines that "fill in" as OCR runs */
const RECEIPT_LINES = [78, 54, 90, 42, 66, 84, 36, 60]

export function ReceiptScanner({ onComplete }: { onComplete: (r: OcrResult) => void }) {
  const [stage, setStage] = useState(0)
  const [filled, setFilled] = useState(0)
  const [done, setDone] = useState(false)
  const calledRef = useRef(false)

  useEffect(() => {
    const stageTimers = STAGES.map((_, i) => setTimeout(() => setStage(i), i * 700))
    const lineTimers = RECEIPT_LINES.map((_, i) => setTimeout(() => setFilled(i + 1), 300 + i * 280))
    const finishTimer = setTimeout(() => setDone(true), 2900)
    const handoff = setTimeout(() => {
      if (!calledRef.current) {
        calledRef.current = true
        onComplete(MOCK_RESULT)
      }
    }, 3550)
    return () => {
      stageTimers.forEach(clearTimeout)
      lineTimers.forEach(clearTimeout)
      clearTimeout(finishTimer)
      clearTimeout(handoff)
    }
  }, [onComplete])

  return (
    <div className="flex flex-col items-center px-5 py-6">
      {/* Scan stage — the receipt with sweeping scanline */}
      <div className="relative aspect-[3/4] w-44 overflow-hidden rounded-2xl border border-primary/25 bg-[oklch(0.16_0.03_255)] shadow-[0_0_40px_-8px_oklch(0.82_0.115_212_/_30%)]">
        {/* drifting scan grid */}
        <div className="sf-scan-grid absolute inset-0 opacity-60" />

        {/* skeleton receipt content */}
        <div className="relative flex h-full flex-col gap-2 p-4 pt-5">
          <div className="mb-1 h-2.5 w-2/3 self-center rounded-full bg-white/15" />
          {RECEIPT_LINES.map((w, i) => (
            <div key={i} className="flex items-center justify-between gap-2">
              <div
                className={cn(
                  "h-2 rounded-full transition-all duration-500",
                  i < filled ? "sf-line-fill bg-primary/70" : "bg-white/[0.08]",
                )}
                style={{ width: `${w}%` }}
              />
            </div>
          ))}
          <div className="mt-auto h-2.5 w-1/2 self-end rounded-full bg-primary/60" />
        </div>

        {/* sweeping scanline */}
        {!done ? (
          <>
            <div className="sf-scanline absolute inset-x-0 h-px bg-[linear-gradient(90deg,transparent,oklch(0.86_0.13_200),transparent)] shadow-[0_0_12px_2px_oklch(0.82_0.115_212_/_60%)]" />
            <div className="sf-shimmer absolute inset-0" />
          </>
        ) : null}

        {/* success flash */}
        {done ? (
          <div className="sf-animate-fade absolute inset-0 flex items-center justify-center bg-positive/10 backdrop-blur-[1px]">
            <span className="sf-animate-pop flex size-12 items-center justify-center rounded-full bg-positive/20 text-positive">
              <Check className="size-6" strokeWidth={3} />
            </span>
          </div>
        ) : null}
      </div>

      {/* status row */}
      <div className="mt-6 flex items-center gap-2.5">
        {!done ? (
          <ScanLine className="sf-scan-pulse size-4 text-primary" />
        ) : (
          <Check className="size-4 text-positive" strokeWidth={3} />
        )}
        <p className="text-[0.9375rem] font-semibold text-foreground">
          {done ? "Receipt captured" : STAGES[stage]}
          {!done ? <span className="sf-num">…</span> : null}
        </p>
      </div>

      {/* stage progress dots */}
      <div className="mt-3 flex items-center gap-1.5">
        {STAGES.map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-1 rounded-full transition-all duration-300",
              done || i <= stage ? "w-6 bg-primary" : "w-3 bg-white/12",
            )}
          />
        ))}
      </div>

      <p className="mt-4 text-center text-[0.75rem] text-muted-foreground">
        {done ? "Tap to review the extracted details" : "Analyzing with on-device OCR"}
      </p>
    </div>
  )
}
