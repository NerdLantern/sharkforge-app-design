"use client"

import { useState } from "react"
import { ArrowUpRight, Crown, Dumbbell, MoreHorizontal, Check } from "lucide-react"
import { Sheet } from "../sheet"
import { Eyebrow } from "../ui-kit"
import { MiniChart } from "../mini-chart"
import { type Exercise, currentPr, previousPr, prettyDate, shortMonth } from "../fit/data"

export function ExerciseDetailSheet({
  exercise,
  open,
  onClose,
  onUpdate,
}: {
  exercise: Exercise | null
  open: boolean
  onClose: () => void
  onUpdate?: (ex: Exercise) => void
}) {
  const [adding, setAdding] = useState(false)
  const [newWeight, setNewWeight] = useState("")

  if (!exercise) return null

  const pr = currentPr(exercise)
  const prev = previousPr(exercise)
  const gained = prev ? pr.weight - prev.weight : 0
  const series = exercise.history.map((h) => h.weight)
  const first = exercise.history[0]
  const last = exercise.history[exercise.history.length - 1]
  const reversed = exercise.history.slice().reverse()

  function submitUpdate() {
    const w = Number(newWeight)
    if (!(w > 0) || !exercise) return
    onUpdate?.({
      ...exercise,
      history: [...exercise.history, { date: "2026-06-30", weight: w }],
    })
    setNewWeight("")
    setAdding(false)
  }

  function handleClose() {
    setAdding(false)
    setNewWeight("")
    onClose()
  }

  return (
    <Sheet open={open} onClose={handleClose}>
      <div className="flex max-h-[90vh] flex-col px-5 pb-6 pt-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <Eyebrow>{exercise.bodyPart}</Eyebrow>
            <h2 className="mt-0.5 text-2xl font-semibold tracking-tight text-foreground">{exercise.name}</h2>
          </div>
          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-muted-foreground active:scale-95"
            aria-label="More options"
          >
            <MoreHorizontal className="size-[1.15rem]" />
          </button>
        </div>

        {/* Current PR + chart */}
        <div className="mt-5 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary">
              <Dumbbell className="size-6" />
            </div>
            <div>
              <Eyebrow>Current PR</Eyebrow>
              <div className="mt-1 flex items-end gap-1.5">
                <span className="sf-num text-[2.75rem] font-semibold leading-none text-foreground">{pr.weight}</span>
                <span className="mb-1 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  lbs
                </span>
              </div>
              <p className="mt-1.5 flex items-center gap-1 text-[0.8125rem] text-muted-foreground">
                <Crown className="size-3.5 text-primary" />
                {prettyDate(pr.date)}
              </p>
            </div>
          </div>
          {prev ? (
            <div className="text-right">
              <p className="flex items-center justify-end gap-0.5 text-[0.9375rem] font-semibold text-positive">
                <ArrowUpRight className="size-4" />
                {gained > 0 ? `+${gained}` : gained}
              </p>
              <p className="mt-0.5 text-[0.75rem] text-muted-foreground">prev {prev.weight}</p>
            </div>
          ) : null}
        </div>

        <MiniChart data={series} tone="primary" height={120} showDots className="mt-5" />
        <p className="mt-2 text-center text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          From {shortMonth(first.date)} to {shortMonth(last.date)}
        </p>

        {/* PR history */}
        <div className="mt-5 max-h-[26vh] space-y-1 overflow-y-auto">
          {reversed.map((h, i) => {
            const isCurrent = i === 0
            return (
              <div key={h.date} className="flex items-center gap-3 py-2">
                <span
                  className={`flex size-4 items-center justify-center rounded-full border ${
                    isCurrent ? "border-primary bg-primary/20" : "border-white/15"
                  }`}
                >
                  {isCurrent ? <span className="size-1.5 rounded-full bg-primary" /> : null}
                </span>
                <div className="flex flex-1 items-baseline gap-1.5">
                  <Crown className={`size-3.5 ${isCurrent ? "text-primary" : "text-muted-foreground/60"}`} />
                  <span className="sf-num text-[1.0625rem] font-semibold text-foreground">{h.weight}</span>
                  <span className="text-[0.75rem] text-muted-foreground">lbs</span>
                </div>
                <span className="text-[0.75rem] text-muted-foreground">{prettyDate(h.date)}</span>
                <span className="text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-primary/70">PR</span>
              </div>
            )
          })}
        </div>

        {/* Update PR */}
        {adding ? (
          <div className="sf-inset mt-3 flex items-center gap-3 rounded-2xl px-4 py-3 sf-animate-expand">
            <input
              autoFocus
              type="number"
              inputMode="decimal"
              value={newWeight}
              onChange={(e) => setNewWeight(e.target.value)}
              placeholder="New weight"
              className="sf-num w-full bg-transparent text-[1.25rem] font-semibold text-foreground placeholder:text-base placeholder:font-normal placeholder:text-muted-foreground focus:outline-none"
            />
            <span className="text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">lbs</span>
            <button
              type="button"
              onClick={submitUpdate}
              disabled={!(Number(newWeight) > 0)}
              className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground active:scale-90 disabled:opacity-40"
              aria-label="Save weight"
            >
              <Check className="size-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setAdding(true)}
            className="mt-4 w-full rounded-full bg-primary py-3.5 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-transform active:scale-95"
          >
            <span className="inline-flex items-center gap-1.5">
              <ArrowUpRight className="size-4" />
              Update PR
            </span>
          </button>
        )}
      </div>
    </Sheet>
  )
}
