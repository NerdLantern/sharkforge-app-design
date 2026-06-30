"use client"

import { useMemo, useState } from "react"
import { Search, Camera, ScanLine, Mic, Plus, X } from "lucide-react"
import { Sheet } from "../sheet"
import { Eyebrow } from "../ui-kit"

type Food = {
  name: string
  detail: string
  kcal: number
  f: number
  c: number
  p: number
  group: "Today" | "This week" | "Frequent"
}

const FOODS: Food[] = [
  { name: "711 — Waffle Breakfast Sandwich", detail: "1 item · 590 kcal", kcal: 590, f: 39, c: 46, p: 16, group: "Today" },
  { name: "Legendary Chips — Ranch", detail: "1 serving · 168 kcal", kcal: 168, f: 8, c: 4, p: 20, group: "Today" },
  { name: "Quest Chips — Nacho Cheese", detail: "2 servings · 292 kcal", kcal: 292, f: 12, c: 10, p: 36, group: "Today" },
  { name: "Quest Chips — BBQ", detail: "1 serving · 140 kcal", kcal: 140, f: 5, c: 5, p: 19, group: "Today" },
  { name: "Quest Chips — Taco", detail: "1 bag · 141 kcal", kcal: 141, f: 5, c: 5, p: 19, group: "This week" },
  { name: "McDonald's — Breakfast Burrito", detail: "1 serving · 305 kcal", kcal: 305, f: 17, c: 25, p: 13, group: "This week" },
  { name: "Greek Yogurt — Plain 2%", detail: "170g · 120 kcal", kcal: 120, f: 3, c: 9, p: 17, group: "Frequent" },
  { name: "Grilled Chicken Breast", detail: "150g · 248 kcal", kcal: 248, f: 5, c: 0, p: 47, group: "Frequent" },
  { name: "Quest Chips — Pizza", detail: "1 bag · 144 kcal", kcal: 144, f: 5, c: 5, p: 19, group: "Frequent" },
]

const ACTIONS = [
  { key: "identify", label: "Identify", icon: Camera },
  { key: "scan", label: "Scan label", icon: ScanLine },
  { key: "voice", label: "Voice log", icon: Mic },
] as const

function MacroLine({ f, c, p }: { f: number; c: number; p: number }) {
  return (
    <span className="sf-num text-xs text-muted-foreground">
      <span className="text-foreground/70">{f}F</span>{" "}
      <span style={{ color: "oklch(0.82 0.13 175)" }}>{c}C</span>{" "}
      <span style={{ color: "oklch(0.82 0.115 212)" }}>{p}P</span>
    </span>
  )
}

export function MealLogSheet({
  open,
  onClose,
  meal = "Breakfast",
}: {
  open: boolean
  onClose: () => void
  meal?: string
}) {
  const [query, setQuery] = useState("")

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return FOODS
    return FOODS.filter((f) => f.name.toLowerCase().includes(q))
  }, [query])

  const groups = useMemo(() => {
    const order: Food["group"][] = ["Today", "This week", "Frequent"]
    return order
      .map((g) => ({ group: g, items: results.filter((f) => f.group === g) }))
      .filter((g) => g.items.length > 0)
  }, [results])

  const showCreate = query.trim().length > 0

  return (
    <Sheet open={open} onClose={onClose}>
      <div className="flex max-h-[88vh] flex-col px-5 pb-8 pt-4">
        {/* Title */}
        <div className="flex items-start justify-between">
          <div>
            <Eyebrow>Log Meal</Eyebrow>
            <h2 className="mt-1 text-xl font-semibold tracking-tight text-foreground">{meal}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-muted-foreground active:scale-90"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Search */}
        <div className="mt-4 flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search foods, brands, or barcode"
            className="min-w-0 flex-1 bg-transparent text-[0.9375rem] text-foreground placeholder:text-muted-foreground/70 outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="text-muted-foreground active:scale-90"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        {/* Capture actions */}
        <div className="mt-3 grid grid-cols-3 gap-2.5">
          {ACTIONS.map((a) => (
            <button
              key={a.key}
              type="button"
              className="sf-inset flex flex-col items-center justify-center gap-1.5 rounded-2xl py-3.5 active:scale-[0.97]"
            >
              <a.icon className="size-5 text-primary" />
              <span className="text-xs font-medium text-foreground">{a.label}</span>
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="sf-scroll mt-4 flex-1 overflow-y-auto">
          {showCreate && (
            <button
              type="button"
              onClick={onClose}
              className="mb-3 flex w-full items-center gap-3 rounded-2xl border border-primary/25 bg-primary/10 px-4 py-3 text-left active:scale-[0.99]"
            >
              <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Plus className="size-4" strokeWidth={2.5} />
              </span>
              <div className="min-w-0">
                <p className="truncate text-[0.9375rem] font-medium text-foreground">Create &ldquo;{query.trim()}&rdquo;</p>
                <p className="text-xs text-muted-foreground">Add a new food to your library</p>
              </div>
            </button>
          )}

          {groups.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted-foreground">
              No matches. Create a new food above.
            </p>
          ) : (
            groups.map((g) => (
              <section key={g.group} className="mb-5">
                <p className="mb-2 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {g.group}
                </p>
                <div className="flex flex-col gap-1.5">
                  {g.items.map((f) => (
                    <div
                      key={f.name}
                      className="sf-inset flex items-center gap-3 rounded-2xl px-3.5 py-3"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[0.9375rem] font-medium text-foreground">{f.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {f.detail} · <MacroLine f={f.f} c={f.c} p={f.p} />
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={onClose}
                        aria-label={`Add ${f.name}`}
                        className="flex size-9 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/15 text-primary active:scale-90"
                      >
                        <Plus className="size-4" strokeWidth={2.5} />
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            ))
          )}
        </div>
      </div>
    </Sheet>
  )
}
