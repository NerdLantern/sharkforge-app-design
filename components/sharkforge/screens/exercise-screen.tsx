"use client"

import { useState } from "react"
import { ArrowLeft, Trophy, Trash2, Plus, Minus, Repeat, Timer } from "lucide-react"
import { Eyebrow, GlassCard, ListRow, SectionHeader, SegmentedTabs } from "../ui-kit"
import { MiniChart } from "../mini-chart"
import { DestructiveSheet } from "../sheets/destructive-sheet"

const HISTORY: Record<string, number[]> = {
  "3M": [120, 125, 122.5, 130, 132.5, 135, 140],
  "6M": [102.5, 110, 115, 120, 128, 135, 140],
  "1Y": [85, 95, 102.5, 115, 122.5, 132.5, 140],
}

const SETS = [
  { set: "Set 1", weight: "100 kg", reps: "8 reps", done: true },
  { set: "Set 2", weight: "120 kg", reps: "6 reps", done: true },
  { set: "Set 3", weight: "140 kg", reps: "3 reps", done: false, pr: true },
]

export function ExerciseScreen({ onBack }: { onBack: () => void }) {
  const [range, setRange] = useState("6M")
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [working, setWorking] = useState(140)

  return (
    <>
      <div className="flex flex-col gap-6 px-4 pb-32 pt-2">
        {/* Nav header */}
        <header className="flex items-center justify-between px-1 pt-1">
          <button
            type="button"
            onClick={onBack}
            className="flex size-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.05] text-foreground active:scale-95"
          >
            <ArrowLeft className="size-5" />
          </button>
          <Eyebrow>Strength · Lower</Eyebrow>
          <button
            type="button"
            onClick={() => setConfirmOpen(true)}
            className="flex size-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.05] text-destructive active:scale-95"
          >
            <Trash2 className="size-[1.15rem]" />
          </button>
        </header>

        <div className="px-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Barbell Back Squat</h1>
          <p className="mt-1 text-[0.8125rem] text-muted-foreground">Quadriceps · Glutes · 4 sessions this month</p>
        </div>

        {/* HERO — PR + progress graph */}
        <GlassCard hero className="overflow-hidden p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-primary">
                <Trophy className="size-4" />
                <Eyebrow className="text-primary">Personal Record</Eyebrow>
              </div>
              <div className="mt-2 flex items-end gap-1.5">
                <span className="sf-num text-[2.75rem] font-semibold leading-none text-foreground">140</span>
                <span className="mb-1 text-base font-medium text-muted-foreground">kg × 3</span>
              </div>
              <p className="mt-1.5 text-[0.8125rem] text-positive">+17.5 kg in {range.toLowerCase()}</p>
            </div>
            <div className="text-right">
              <p className="sf-num text-sm font-semibold text-foreground">1RM est.</p>
              <p className="sf-num text-xl font-semibold text-primary">154 kg</p>
            </div>
          </div>

          <MiniChart data={HISTORY[range]} tone="primary" className="mt-4" height={132} showDots />
          <SegmentedTabs options={["3M", "6M", "1Y"]} value={range} onChange={setRange} className="mt-4" />
        </GlassCard>

        {/* Working set stepper */}
        <GlassCard className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <Eyebrow>Working Weight</Eyebrow>
              <p className="sf-num mt-1 text-2xl font-semibold text-foreground">
                {working} <span className="text-base font-medium text-muted-foreground">kg</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setWorking((w) => Math.max(20, w - 2.5))}
                className="flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-foreground active:scale-90"
              >
                <Minus className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => setWorking((w) => w + 2.5)}
                className="flex size-11 items-center justify-center rounded-full border border-primary/30 bg-primary/15 text-primary active:scale-90"
              >
                <Plus className="size-4" />
              </button>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="sf-inset flex items-center gap-2.5 rounded-2xl px-4 py-3">
              <Repeat className="size-4 text-muted-foreground" />
              <div>
                <p className="sf-num text-sm font-semibold text-foreground">3 × 3</p>
                <p className="text-[0.625rem] uppercase tracking-wide text-muted-foreground">Sets × reps</p>
              </div>
            </div>
            <div className="sf-inset flex items-center gap-2.5 rounded-2xl px-4 py-3">
              <Timer className="size-4 text-muted-foreground" />
              <div>
                <p className="sf-num text-sm font-semibold text-foreground">3:00</p>
                <p className="text-[0.625rem] uppercase tracking-wide text-muted-foreground">Rest</p>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Today's sets */}
        <section className="flex flex-col gap-3">
          <SectionHeader title="Today's Sets" action="Add set" />
          <GlassCard className="divide-y divide-white/[0.06] overflow-hidden">
            {SETS.map((s) => (
              <ListRow
                key={s.set}
                leading={
                  <span
                    className={`flex size-9 items-center justify-center rounded-xl border text-[0.8125rem] font-semibold ${
                      s.done
                        ? "border-positive/30 bg-positive/12 text-positive"
                        : "border-primary/30 bg-primary/12 text-primary"
                    }`}
                  >
                    {s.set.split(" ")[1]}
                  </span>
                }
                title={s.weight}
                subtitle={s.reps}
                trailing={
                  s.pr ? (
                    <span className="flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-1 text-xs font-medium text-primary">
                      <Trophy className="size-3" /> PR
                    </span>
                  ) : s.done ? (
                    <span className="text-xs font-medium text-positive">Logged</span>
                  ) : (
                    <span className="text-xs font-medium text-muted-foreground">Pending</span>
                  )
                }
              />
            ))}
          </GlassCard>
        </section>
      </div>

      <DestructiveSheet open={confirmOpen} onClose={() => setConfirmOpen(false)} />
    </>
  )
}
