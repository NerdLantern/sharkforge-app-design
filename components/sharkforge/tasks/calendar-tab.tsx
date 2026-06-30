"use client"

import { useMemo, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { GlassCard } from "../ui-kit"
import { CheckToggle, DeltaPill } from "./parts"
import { type Task, NOW, dayDelta, formatTime } from "./data"

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]
const WEEK = ["M", "T", "W", "T", "F", "S", "S"]

export function CalendarTab({
  tasks,
  onToggle,
}: {
  tasks: Task[]
  onToggle: (id: string) => void
}) {
  const [month, setMonth] = useState(NOW.month)
  const [year, setYear] = useState(NOW.year)
  const [selected, setSelected] = useState(NOW.day)

  // Monday-first leading blanks
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const byDay = useMemo(() => {
    const map = new Map<number, { incomplete: number; completed: number }>()
    for (const t of tasks) {
      if (t.year !== year || t.month !== month) continue
      const e = map.get(t.day) ?? { incomplete: 0, completed: 0 }
      if (t.completed) e.completed += 1
      else e.incomplete += 1
      map.set(t.day, e)
    }
    return map
  }, [tasks, year, month])

  const selectedTasks = tasks
    .filter((t) => t.year === year && t.month === month && t.day === selected)
    .sort((a, b) => a.hour * 60 + a.minute - (b.hour * 60 + b.minute))

  const isToday = (d: number) => d === NOW.day && month === NOW.month && year === NOW.year

  const step = (dir: -1 | 1) => {
    let m = month + dir
    let y = year
    if (m < 0) {
      m = 11
      y -= 1
    } else if (m > 11) {
      m = 0
      y += 1
    }
    setMonth(m)
    setYear(y)
    setSelected(1)
  }

  const dows = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const selDow = dows[new Date(year, month, selected).getDay()]

  return (
    <div className="flex flex-col gap-4 px-4 pb-32">
      <GlassCard hero className="p-4">
        <div className="flex items-center justify-between px-1">
          <button
            type="button"
            aria-label="Previous month"
            onClick={() => step(-1)}
            className="flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-muted-foreground transition-colors active:bg-white/10"
          >
            <ChevronLeft className="size-4" />
          </button>
          <h2 className="text-[1.0625rem] font-semibold tracking-tight text-foreground">
            {MONTH_NAMES[month]} {year}
          </h2>
          <button
            type="button"
            aria-label="Next month"
            onClick={() => step(1)}
            className="flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-muted-foreground transition-colors active:bg-white/10"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-7 gap-y-1">
          {WEEK.map((d, i) => (
            <div key={i} className="pb-1 text-center text-[0.6875rem] font-medium uppercase tracking-wider text-muted-foreground/70">
              {d}
            </div>
          ))}
          {Array.from({ length: firstWeekday }).map((_, i) => (
            <div key={`blank-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1
            const marks = byDay.get(day)
            const active = day === selected
            const today = isToday(day)
            return (
              <button
                key={day}
                type="button"
                onClick={() => setSelected(day)}
                className={cn(
                  "relative mx-auto flex size-10 flex-col items-center justify-center rounded-2xl transition-all duration-200 active:scale-90",
                  active && "bg-white/[0.08]",
                  today && !active && "ring-1 ring-primary/50",
                )}
              >
                {active ? (
                  <span className="absolute inset-0 rounded-2xl border border-primary/40" style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)" }} />
                ) : null}
                <span
                  className={cn(
                    "sf-num relative text-[0.9375rem] font-medium",
                    today ? "text-primary" : active ? "text-foreground" : "text-foreground/80",
                  )}
                >
                  {day}
                </span>
                <span className="relative mt-0.5 flex h-1 items-center gap-0.5">
                  {marks?.incomplete ? <span className="size-1 rounded-full bg-negative" /> : null}
                  {marks?.completed ? <span className="size-1 rounded-full bg-positive" /> : null}
                </span>
              </button>
            )
          })}
        </div>
      </GlassCard>

      <GlassCard key={`${year}-${month}-${selected}`} className="sf-animate-rise overflow-hidden">
        <div className="flex items-center justify-between px-4 pb-1 pt-3.5">
          <p className="sf-eyebrow">
            {selDow} · {MONTH_NAMES[month].slice(0, 3)} {selected}
          </p>
          <span className="sf-num text-[0.8125rem] text-muted-foreground/70">{selectedTasks.length}</span>
        </div>
        {selectedTasks.length === 0 ? (
          <p className="px-4 pb-5 pt-2 text-[0.875rem] text-muted-foreground">Nothing scheduled.</p>
        ) : (
          <div className="divide-y divide-white/[0.05]">
            {selectedTasks.map((t) => (
              <div key={t.id} className="flex items-center gap-3 px-4 py-3">
                <CheckToggle checked={t.completed} onToggle={() => onToggle(t.id)} tone={dayDelta(t) < 0 ? "overdue" : "soon"} />
                <div className="min-w-0 flex-1">
                  <p className={cn("truncate text-[0.9375rem] font-medium", t.completed ? "text-muted-foreground line-through" : "text-foreground")}>
                    {t.title}
                  </p>
                  <p className="sf-num text-[0.8125rem] text-muted-foreground">{formatTime(t)}</p>
                </div>
                {!t.completed ? <DeltaPill delta={dayDelta(t)} /> : null}
              </div>
            ))}
          </div>
        )}
      </GlassCard>
    </div>
  )
}
