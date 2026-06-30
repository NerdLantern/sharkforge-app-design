"use client"

import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { BODY_PARTS, type BodyPart, type Exercise, currentPr, previousPr, prettyDate } from "./data"

/* Body part selector grid ------------------------------------------------ */

export function BodyPartSelector({
  active,
  counts,
  onSelect,
}: {
  active: BodyPart
  counts: Record<string, number>
  onSelect: (p: BodyPart) => void
}) {
  return (
    <div className="grid grid-cols-3 gap-x-2 gap-y-1">
      {BODY_PARTS.map((part) => {
        const isActive = part === active
        const count = counts[part] ?? 0
        return (
          <button
            key={part}
            type="button"
            onClick={() => onSelect(part)}
            className={cn(
              "group relative flex flex-col items-center gap-1 rounded-2xl py-2.5 transition-all duration-200 active:scale-95",
              isActive ? "text-foreground" : count > 0 ? "text-muted-foreground" : "text-muted-foreground/40",
            )}
          >
            <span className="text-[0.8125rem] font-semibold uppercase tracking-[0.14em]">{part}</span>
            <span
              className={cn(
                "h-0.5 rounded-full transition-all duration-300",
                isActive ? "w-6 bg-primary shadow-[0_0_10px_var(--primary)]" : "w-0 bg-transparent",
              )}
            />
          </button>
        )
      })}
    </div>
  )
}

/* Exercise list row ------------------------------------------------------ */

export function ExerciseRow({ ex, onClick }: { ex: Exercise; onClick: () => void }) {
  const pr = currentPr(ex)
  const prev = previousPr(ex)
  const gained = prev ? pr.weight - prev.weight : 0

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors active:bg-white/[0.03]"
    >
      <div className="min-w-0 flex-1">
        <p className="truncate text-[0.9375rem] font-semibold text-foreground">{ex.name}</p>
        <p className="mt-0.5 text-[0.75rem] text-muted-foreground">{prettyDate(pr.date)}</p>
      </div>
      {gained > 0 ? (
        <span className="flex items-center gap-0.5 rounded-full bg-positive/12 px-2 py-0.5 text-[0.6875rem] font-semibold text-positive">
          <ArrowUpRight className="size-3" />
          {gained}
        </span>
      ) : null}
      <span className="sf-num text-[1.75rem] font-semibold leading-none text-foreground tabular-nums">
        {pr.weight}
      </span>
    </button>
  )
}
