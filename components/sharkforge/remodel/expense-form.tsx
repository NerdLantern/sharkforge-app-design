"use client"

import { useState } from "react"
import { Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { PROJECTS, fmtMoney } from "./data"

export type ExpenseDraft = {
  name: string
  projectId: string
  materials: number
  labor: number
  date: string
  notes: string
}

function Stepper({
  label,
  value,
  onChange,
}: {
  label: string
  value: number
  onChange: (v: number) => void
}) {
  return (
    <div>
      <p className="sf-eyebrow mb-2">{label}</p>
      <div className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-2 py-2">
        <button
          type="button"
          onClick={() => onChange(Math.max(0, Math.round((value - 1) * 100) / 100))}
          className="flex size-7 items-center justify-center rounded-lg bg-white/[0.06] text-muted-foreground active:scale-90"
          aria-label={`Decrease ${label}`}
        >
          <Minus className="size-3.5" />
        </button>
        <div className="flex flex-1 items-baseline justify-center gap-1">
          <span className="text-sm text-muted-foreground">$</span>
          <input
            inputMode="decimal"
            value={value === 0 ? "" : String(value)}
            placeholder="0.00"
            onChange={(e) => {
              const n = Number.parseFloat(e.target.value)
              onChange(Number.isFinite(n) ? n : 0)
            }}
            className="sf-num w-full min-w-0 bg-transparent text-center text-base font-semibold text-foreground outline-none placeholder:text-muted-foreground/50"
          />
        </div>
        <button
          type="button"
          onClick={() => onChange(Math.round((value + 1) * 100) / 100)}
          className="flex size-7 items-center justify-center rounded-lg bg-white/[0.06] text-muted-foreground active:scale-90"
          aria-label={`Increase ${label}`}
        >
          <Plus className="size-3.5" />
        </button>
      </div>
    </div>
  )
}

export function ExpenseForm({
  draft,
  onChange,
  isReturn,
}: {
  draft: ExpenseDraft
  onChange: (d: ExpenseDraft) => void
  isReturn?: boolean
}) {
  const total = draft.materials + draft.labor
  const set = (patch: Partial<ExpenseDraft>) => onChange({ ...draft, ...patch })

  return (
    <div className="space-y-5">
      <div>
        <p className="sf-eyebrow mb-2">Description</p>
        <textarea
          value={draft.name}
          onChange={(e) => set({ name: e.target.value })}
          rows={2}
          placeholder="What was purchased?"
          className="w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-3 text-[0.9375rem] text-foreground outline-none placeholder:text-muted-foreground/50 focus:border-primary/40"
        />
      </div>

      <div>
        <p className="sf-eyebrow mb-2">Related Project</p>
        <select
          value={draft.projectId}
          onChange={(e) => set({ projectId: e.target.value })}
          className="w-full appearance-none rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-3 text-[0.9375rem] text-foreground outline-none focus:border-primary/40"
        >
          {PROJECTS.map((p) => (
            <option key={p.id} value={p.id} className="bg-[oklch(0.16_0.03_255)]">
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Stepper label="Materials" value={draft.materials} onChange={(v) => set({ materials: v })} />
        <Stepper label="Labor" value={draft.labor} onChange={(v) => set({ labor: v })} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="sf-eyebrow mb-2">Date</p>
          <input
            type="date"
            value={draft.date}
            onChange={(e) => set({ date: e.target.value })}
            className="sf-num w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-3 text-[0.875rem] text-foreground outline-none focus:border-primary/40 [color-scheme:dark]"
          />
        </div>
        <div>
          <p className="sf-eyebrow mb-2">Total</p>
          <div className="flex h-[2.875rem] items-center justify-end rounded-xl border border-white/[0.08] bg-white/[0.02] px-3.5">
            <span className={cn("sf-num text-base font-semibold", isReturn ? "text-negative" : "text-primary")}>
              {isReturn ? "−" : ""}
              {fmtMoney(total)}
            </span>
          </div>
        </div>
      </div>

      <div>
        <p className="sf-eyebrow mb-2">Notes</p>
        <textarea
          value={draft.notes}
          onChange={(e) => set({ notes: e.target.value })}
          rows={3}
          placeholder="Item details, store, receipt info…"
          className="w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-3 text-[0.875rem] leading-relaxed text-foreground outline-none placeholder:text-muted-foreground/50 focus:border-primary/40"
        />
      </div>
    </div>
  )
}

export function useExpenseDraft(initial?: Partial<ExpenseDraft>) {
  return useState<ExpenseDraft>({
    name: "",
    projectId: PROJECTS[0].id,
    materials: 0,
    labor: 0,
    date: "2026-06-30",
    notes: "",
    ...initial,
  })
}
