"use client"

import { useMemo, useState } from "react"
import { LogOut, QrCode, Plus, Trophy, TrendingUp, Dumbbell } from "lucide-react"
import { Eyebrow, GlassCard, EmptyState } from "../ui-kit"
import { BodyPartSelector, ExerciseRow } from "../fit/parts"
import { NewPrSheet } from "../sheets/new-pr-sheet"
import { ExerciseDetailSheet } from "../sheets/exercise-detail-sheet"
import { PfCheckinModal } from "../sheets/pf-checkin-modal"
import {
  EXERCISES,
  BODY_PARTS,
  type BodyPart,
  type Exercise,
  currentPr,
  previousPr,
} from "../fit/data"

const CURRENT_MONTH = "2026-06"

export function FitScreen() {
  const [exercises, setExercises] = useState<Exercise[]>(EXERCISES)
  const [active, setActive] = useState<BodyPart>("Chest")
  const [prOpen, setPrOpen] = useState(false)
  const [checkinOpen, setCheckinOpen] = useState(false)
  const [detail, setDetail] = useState<Exercise | null>(null)

  const counts = useMemo(() => {
    const c: Record<string, number> = {}
    for (const p of BODY_PARTS) c[p] = 0
    for (const e of exercises) c[e.bodyPart] = (c[e.bodyPart] ?? 0) + 1
    return c
  }, [exercises])

  const filtered = useMemo(
    () =>
      exercises
        .filter((e) => e.bodyPart === active)
        .slice()
        .sort((a, b) => currentPr(b).weight - currentPr(a).weight),
    [exercises, active],
  )

  // Summary stats (premium upgrade)
  const stats = useMemo(() => {
    let prsThisMonth = 0
    let biggestGain = 0
    for (const e of exercises) {
      const cur = currentPr(e)
      if (cur.date.startsWith(CURRENT_MONTH)) prsThisMonth++
      const prev = previousPr(e)
      if (prev) biggestGain = Math.max(biggestGain, cur.weight - prev.weight)
    }
    return { prsThisMonth, biggestGain, total: exercises.length }
  }, [exercises])

  function handleSaveNew(payload: { name: string; bodyPart: BodyPart; weight: number }) {
    setExercises((prev) => {
      const existing = prev.find((e) => e.name.toLowerCase() === payload.name.toLowerCase())
      if (existing) {
        return prev.map((e) =>
          e.id === existing.id
            ? { ...e, history: [...e.history, { date: "2026-06-30", weight: payload.weight }] }
            : e,
        )
      }
      const id = payload.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")
      return [
        ...prev,
        { id, name: payload.name, bodyPart: payload.bodyPart, history: [{ date: "2026-06-30", weight: payload.weight }] },
      ]
    })
    setActive(payload.bodyPart)
  }

  function handleUpdate(updated: Exercise) {
    setExercises((prev) => prev.map((e) => (e.id === updated.id ? updated : e)))
    setDetail(updated)
  }

  return (
    <>
      <div className="flex flex-col gap-5 px-4 pb-32 pt-2">
        {/* Header */}
        <header className="flex items-start justify-between px-1 pt-1">
          <div>
            <Eyebrow>Training</Eyebrow>
            <h1 className="mt-1 text-[2rem] font-semibold leading-none tracking-tight text-foreground">Fit</h1>
          </div>
          <button
            type="button"
            aria-label="Sign out"
            className="flex size-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.05] text-foreground active:scale-95"
          >
            <LogOut className="size-5" />
          </button>
        </header>

        {/* Actions */}
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setCheckinOpen(true)}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-foreground transition-transform active:scale-95"
          >
            <QrCode className="size-4 text-primary" />
            PF Check-In
          </button>
          <button
            type="button"
            onClick={() => setPrOpen(true)}
            className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-transform active:scale-95"
          >
            <Plus className="size-4" />
            New PR
          </button>
        </div>

        {/* Summary strip (upgrade) */}
        <GlassCard className="grid grid-cols-3 divide-x divide-white/[0.06] overflow-hidden p-0">
          {[
            { icon: <Trophy className="size-3.5" />, value: stats.prsThisMonth, label: "PRs · Jun" },
            { icon: <TrendingUp className="size-3.5" />, value: `+${stats.biggestGain}`, label: "Best gain" },
            { icon: <Dumbbell className="size-3.5" />, value: stats.total, label: "Lifts" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1 px-2 py-3.5">
              <span className="flex items-center gap-1 text-muted-foreground">{s.icon}</span>
              <span className="sf-num text-xl font-semibold text-foreground">{s.value}</span>
              <span className="text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </GlassCard>

        {/* Body part selector */}
        <div className="px-1">
          <Eyebrow>Body Part</Eyebrow>
          <div className="mt-2">
            <BodyPartSelector active={active} counts={counts} onSelect={setActive} />
          </div>
        </div>

        {/* Section header */}
        <div className="flex items-end justify-between px-1">
          <h2 className="text-[1.25rem] font-semibold tracking-tight text-foreground">
            {active}{" "}
            <span className="text-[0.8125rem] font-normal text-muted-foreground">{filtered.length} records</span>
          </h2>
          <button
            type="button"
            onClick={() => setPrOpen(true)}
            className="flex items-center gap-1 text-[0.8125rem] font-semibold text-primary active:opacity-60"
          >
            <Plus className="size-3.5" />
            PR
          </button>
        </div>

        {/* Exercise list */}
        {filtered.length > 0 ? (
          <GlassCard className="divide-y divide-white/[0.06] overflow-hidden sf-animate-fade" key={active}>
            {filtered.map((ex) => (
              <ExerciseRow key={ex.id} ex={ex} onClick={() => setDetail(ex)} />
            ))}
          </GlassCard>
        ) : (
          <GlassCard className="overflow-hidden">
            <EmptyState
              icon={<Dumbbell className="size-6" />}
              title={`No ${active.toLowerCase()} lifts yet`}
              description="Log your first personal record for this body part to start tracking progress."
              action="Log a PR"
              onAction={() => setPrOpen(true)}
            />
          </GlassCard>
        )}
      </div>

      <NewPrSheet open={prOpen} onClose={() => setPrOpen(false)} defaultBodyPart={active} onSave={handleSaveNew} />
      <ExerciseDetailSheet
        exercise={detail}
        open={detail !== null}
        onClose={() => setDetail(null)}
        onUpdate={handleUpdate}
      />
      <PfCheckinModal open={checkinOpen} onClose={() => setCheckinOpen(false)} />
    </>
  )
}
