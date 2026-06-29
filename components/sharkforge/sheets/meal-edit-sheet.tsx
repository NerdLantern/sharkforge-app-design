"use client"

import { useState } from "react"
import { Minus, Plus, Check } from "lucide-react"
import { Sheet } from "../sheet"
import { Eyebrow } from "../ui-kit"

const MACROS = [
  { key: "Protein", color: "oklch(0.82 0.115 212)", grams: 42, pct: 38 },
  { key: "Carbs", color: "oklch(0.82 0.13 175)", grams: 58, pct: 44 },
  { key: "Fat", color: "oklch(0.7 0.17 330)", grams: 16, pct: 18 },
]

export function MealEditSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [servings, setServings] = useState(1.5)
  const kcal = Math.round(560 * servings)

  return (
    <Sheet open={open} onClose={onClose}>
      <div className="sf-scroll max-h-[82vh] overflow-y-auto px-5 pb-8 pt-4">
        {/* Title */}
        <div className="flex items-start justify-between">
          <div>
            <Eyebrow>Edit Meal · Lunch</Eyebrow>
            <h2 className="mt-1 text-xl font-semibold tracking-tight text-foreground">Grilled Salmon Bowl</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-primary px-4 py-2 text-[0.8125rem] font-semibold text-primary-foreground active:scale-95"
          >
            Save
          </button>
        </div>

        {/* Calorie hero */}
        <div className="sf-inset mt-5 flex items-center justify-between rounded-2xl px-5 py-4">
          <div>
            <Eyebrow>Total Calories</Eyebrow>
            <p className="sf-num mt-1 text-3xl font-semibold text-foreground">
              {kcal} <span className="text-base font-medium text-muted-foreground">kcal</span>
            </p>
          </div>
          {/* Servings stepper */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setServings((s) => Math.max(0.5, +(s - 0.5).toFixed(1)))}
              className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-foreground active:scale-90"
            >
              <Minus className="size-4" />
            </button>
            <div className="w-12 text-center">
              <p className="sf-num text-lg font-semibold text-foreground">{servings}</p>
              <p className="text-[0.625rem] uppercase tracking-wide text-muted-foreground">serv</p>
            </div>
            <button
              type="button"
              onClick={() => setServings((s) => +(s + 0.5).toFixed(1))}
              className="flex size-10 items-center justify-center rounded-full border border-primary/30 bg-primary/15 text-primary active:scale-90"
            >
              <Plus className="size-4" />
            </button>
          </div>
        </div>

        {/* Macro split */}
        <div className="mt-5">
          <div className="flex h-3 w-full overflow-hidden rounded-full">
            {MACROS.map((m) => (
              <div key={m.key} style={{ width: `${m.pct}%`, background: m.color }} />
            ))}
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {MACROS.map((m) => (
              <div key={m.key} className="sf-inset rounded-2xl px-3 py-3">
                <div className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full" style={{ background: m.color }} />
                  <span className="text-[0.6875rem] text-muted-foreground">{m.key}</span>
                </div>
                <p className="sf-num mt-1.5 text-base font-semibold text-foreground">
                  {Math.round(m.grams * servings)}g
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Ingredients */}
        <div className="mt-6">
          <Eyebrow>Ingredients</Eyebrow>
          <div className="mt-2 flex flex-col gap-2">
            {[
              { n: "Atlantic salmon", g: "180g", on: true },
              { n: "Brown rice", g: "150g", on: true },
              { n: "Avocado", g: "60g", on: true },
              { n: "Edamame", g: "40g", on: false },
            ].map((ing) => (
              <button
                key={ing.n}
                type="button"
                className="sf-inset flex items-center justify-between rounded-2xl px-4 py-3 text-left active:scale-[0.99]"
              >
                <div>
                  <p className="text-[0.9375rem] font-medium text-foreground">{ing.n}</p>
                  <p className="text-xs text-muted-foreground">{ing.g}</p>
                </div>
                <span
                  className={`flex size-6 items-center justify-center rounded-full border ${
                    ing.on ? "border-primary bg-primary text-primary-foreground" : "border-white/15 text-transparent"
                  }`}
                >
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Sheet>
  )
}
