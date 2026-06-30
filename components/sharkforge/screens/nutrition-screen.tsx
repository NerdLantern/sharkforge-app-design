"use client"

import { useState } from "react"
import { Plus, Coffee, Sun, Moon, Sparkles } from "lucide-react"
import { Eyebrow, GlassCard, ListRow, IconTile, SectionHeader, ProgressRing, EmptyState } from "../ui-kit"
import { MealEditSheet } from "../sheets/meal-edit-sheet"
import { MealLogSheet } from "../sheets/meal-log-sheet"

const MACROS = [
  { key: "Protein", color: "oklch(0.82 0.115 212)", now: 142, goal: 180 },
  { key: "Carbs", color: "oklch(0.82 0.13 175)", now: 198, goal: 290 },
  { key: "Fat", color: "oklch(0.7 0.17 330)", now: 52, goal: 70 },
]

export function NutritionScreen() {
  const [editOpen, setEditOpen] = useState(false)
  const [logOpen, setLogOpen] = useState(false)
  const [logMeal, setLogMeal] = useState("Breakfast")

  const openLog = (meal: string) => {
    setLogMeal(meal)
    setLogOpen(true)
  }

  return (
    <>
      <div className="flex flex-col gap-6 px-4 pb-32 pt-2">
        <header className="flex items-center justify-between px-1 pt-1">
          <div>
            <Eyebrow>Fuel · Today</Eyebrow>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">Nutrition</h1>
          </div>
          <button
            type="button"
            onClick={() => openLog("Breakfast")}
            aria-label="Log meal"
            className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground active:scale-95"
          >
            <Plus className="size-5" strokeWidth={2.5} />
          </button>
        </header>

        {/* HERO — calories + macros */}
        <GlassCard hero className="p-5">
          <div className="flex items-center gap-5">
            <ProgressRing value={71} size={116} label="1,840" sublabel="of 2,600" />
            <div className="flex-1">
              <Eyebrow>Remaining</Eyebrow>
              <p className="sf-num mt-1 text-3xl font-semibold text-foreground">760</p>
              <p className="text-[0.8125rem] text-muted-foreground">kcal · on track</p>
            </div>
          </div>
          <div className="mt-5 flex flex-col gap-3">
            {MACROS.map((m) => (
              <div key={m.key}>
                <div className="mb-1.5 flex items-center justify-between text-[0.8125rem]">
                  <span className="text-muted-foreground">{m.key}</span>
                  <span className="sf-num text-foreground">
                    {m.now}<span className="text-muted-foreground"> / {m.goal}g</span>
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.07]">
                  <div className="h-full rounded-full" style={{ width: `${(m.now / m.goal) * 100}%`, background: m.color }} />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Meals */}
        <section className="flex flex-col gap-3">
          <SectionHeader title="Meals" />
          <GlassCard className="divide-y divide-white/[0.06] overflow-hidden">
            <ListRow
              leading={<IconTile tone="primary"><Coffee className="size-5" /></IconTile>}
              title="Breakfast"
              subtitle="Greek yogurt, berries, granola"
              trailing="480"
              trailingSub="kcal"
              onClick={() => setEditOpen(true)}
              chevron
            />
            <ListRow
              leading={<IconTile tone="positive"><Sun className="size-5" /></IconTile>}
              title="Lunch"
              subtitle="Grilled salmon bowl"
              trailing="840"
              trailingSub="kcal"
              onClick={() => setEditOpen(true)}
              chevron
            />
            <ListRow
              leading={<IconTile tone="magenta"><Sparkles className="size-5" /></IconTile>}
              title="Snack"
              subtitle="Protein shake, almonds"
              trailing="520"
              trailingSub="kcal"
              onClick={() => setEditOpen(true)}
              chevron
            />
          </GlassCard>
        </section>

        {/* Empty state for dinner */}
        <section className="flex flex-col gap-3">
          <SectionHeader title="Dinner" />
          <GlassCard className="overflow-hidden">
            <EmptyState
              icon={<Moon className="size-6" />}
              title="No dinner logged"
              description="Add a meal or let SharkForge suggest one within your remaining 760 kcal."
              action="Add dinner"
              onAction={() => openLog("Dinner")}
            />
          </GlassCard>
        </section>
      </div>

      <MealEditSheet open={editOpen} onClose={() => setEditOpen(false)} />
      <MealLogSheet open={logOpen} onClose={() => setLogOpen(false)} meal={logMeal} />
    </>
  )
}
