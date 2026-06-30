"use client"

import { useMemo, useState } from "react"
import { Search, Plus, Check } from "lucide-react"
import { Sheet } from "../sheet"
import { Eyebrow } from "../ui-kit"
import { EXERCISES, type BodyPart, type Exercise, currentPr } from "../fit/data"

const TODAY = "Jun 30, 2026"

export function NewPrSheet({
  open,
  onClose,
  defaultBodyPart,
  onSave,
}: {
  open: boolean
  onClose: () => void
  defaultBodyPart?: BodyPart
  onSave?: (payload: { name: string; bodyPart: BodyPart; weight: number }) => void
}) {
  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState<Exercise | null>(null)
  const [weight, setWeight] = useState("")

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = q ? EXERCISES.filter((e) => e.name.toLowerCase().includes(q)) : EXERCISES
    return list
      .slice()
      .sort((a, b) => currentPr(b).weight - currentPr(a).weight)
      .slice(0, 6)
  }, [query])

  const exactMatch = EXERCISES.some((e) => e.name.toLowerCase() === query.trim().toLowerCase())
  const canCreate = query.trim().length > 1 && !exactMatch
  const chosenName = selected?.name ?? (canCreate ? query.trim() : "")
  const canSave = chosenName.length > 0 && Number(weight) > 0

  function reset() {
    setQuery("")
    setSelected(null)
    setWeight("")
  }

  function handleSave() {
    if (!canSave) return
    onSave?.({
      name: chosenName,
      bodyPart: selected?.bodyPart ?? defaultBodyPart ?? "Chest",
      weight: Number(weight),
    })
    reset()
    onClose()
  }

  function handleClose() {
    reset()
    onClose()
  }

  return (
    <Sheet open={open} onClose={handleClose}>
      <div className="flex max-h-[88vh] flex-col px-5 pb-6 pt-4">
        <Eyebrow>New PR</Eyebrow>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">What did you lift?</h2>

        {/* Exercise search */}
        <div className="mt-5">
          <Eyebrow>Exercise</Eyebrow>
          <div className="sf-inset mt-2 flex items-center gap-3 rounded-2xl px-4 py-3.5">
            <Search className="size-[1.05rem] shrink-0 text-muted-foreground" />
            <input
              value={selected ? selected.name : query}
              onChange={(e) => {
                setSelected(null)
                setQuery(e.target.value)
              }}
              placeholder="Type to search or create..."
              className="w-full bg-transparent text-[0.9375rem] uppercase tracking-wide text-foreground placeholder:uppercase placeholder:tracking-wide placeholder:text-muted-foreground focus:outline-none"
            />
            {selected ? (
              <span className="flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Check className="size-3" />
              </span>
            ) : null}
          </div>
        </div>

        {/* Suggestions */}
        {!selected ? (
          <div className="sf-inset mt-3 max-h-[34vh] overflow-y-auto rounded-2xl">
            {canCreate ? (
              <button
                type="button"
                onClick={() => {
                  setSelected(null)
                  /* keep query as the new name */
                }}
                className="flex w-full items-center gap-3 border-b border-white/[0.06] px-4 py-3 text-left"
              >
                <span className="flex size-7 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Plus className="size-4" />
                </span>
                <span className="text-[0.9375rem] font-medium text-foreground">
                  Create <span className="text-primary">&ldquo;{query.trim()}&rdquo;</span>
                </span>
              </button>
            ) : null}
            {results.map((ex) => {
              const pr = currentPr(ex)
              return (
                <button
                  key={ex.id}
                  type="button"
                  onClick={() => {
                    setSelected(ex)
                    setQuery(ex.name)
                  }}
                  className="flex w-full items-center gap-3 border-b border-white/[0.05] px-4 py-3 text-left last:border-0 active:bg-white/[0.03]"
                >
                  <span className="min-w-0 flex-1 truncate text-[0.9375rem] font-medium text-foreground">
                    {ex.name}
                  </span>
                  <span className="shrink-0 text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    {ex.bodyPart}
                  </span>
                  <span className="sf-num shrink-0 text-[0.9375rem] font-semibold text-foreground tabular-nums">
                    {pr.weight}
                  </span>
                </button>
              )
            })}
            {results.length === 0 && !canCreate ? (
              <p className="px-4 py-6 text-center text-[0.8125rem] text-muted-foreground">No exercises found.</p>
            ) : null}
          </div>
        ) : null}

        {/* Weight */}
        <div className="mt-4">
          <div className="flex items-end justify-between px-1">
            <Eyebrow>Weight</Eyebrow>
            <span className="text-[0.75rem] text-muted-foreground">{TODAY}</span>
          </div>
          <div className="sf-inset mt-2 flex items-center gap-3 rounded-2xl px-4 py-3.5">
            <input
              type="number"
              inputMode="decimal"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="0"
              className="sf-num w-full bg-transparent text-[1.5rem] font-semibold text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <span className="shrink-0 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              lbs
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex items-center gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 rounded-full border border-white/10 bg-white/[0.04] py-3.5 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground transition-transform active:scale-95"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!canSave}
            onClick={handleSave}
            className="flex-[1.6] rounded-full bg-primary py-3.5 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-all active:scale-95 disabled:opacity-40"
          >
            Save Record
          </button>
        </div>
      </div>
    </Sheet>
  )
}
