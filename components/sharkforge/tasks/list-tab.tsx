"use client"

import { useMemo, useState } from "react"
import { CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { GlassCard, EmptyState } from "../ui-kit"
import { TaskRow } from "./parts"
import { type Task, dayDelta } from "./data"

type Filter = "all" | "overdue" | "today" | "upcoming"

function Stat({
  value,
  label,
  tone,
  active,
  onClick,
}: {
  value: number
  label: string
  tone: "overdue" | "today" | "upcoming"
  active: boolean
  onClick: () => void
}) {
  const valueColor =
    tone === "overdue" ? "text-negative" : tone === "today" ? "text-foreground" : "text-primary"
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative flex flex-1 flex-col items-center gap-0.5 rounded-2xl py-3 transition-all duration-200 active:scale-[0.97]",
        active && "bg-white/[0.06]",
      )}
    >
      {active ? (
        <span
          className="absolute inset-0 rounded-2xl border border-white/10"
          style={{ boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.1)" }}
        />
      ) : null}
      <span className={cn("sf-num relative text-2xl font-semibold leading-none", valueColor)}>{value}</span>
      <span className="sf-eyebrow relative text-[0.625rem]">{label}</span>
    </button>
  )
}

function Group({
  label,
  count,
  children,
}: {
  label: string
  count: number
  children: React.ReactNode
}) {
  return (
    <GlassCard className="overflow-hidden">
      <div className="flex items-center justify-between px-4 pb-1 pt-3.5">
        <p className="sf-eyebrow">{label}</p>
        <span className="sf-num text-[0.8125rem] text-muted-foreground/70">{count}</span>
      </div>
      <div className="divide-y divide-white/[0.05]">{children}</div>
    </GlassCard>
  )
}

export function ListTab({
  tasks,
  onToggle,
}: {
  tasks: Task[]
  onToggle: (id: string) => void
}) {
  const [filter, setFilter] = useState<Filter>("all")

  const { overdue, today, upcoming } = useMemo(() => {
    const active = tasks.filter((t) => !t.completed)
    return {
      overdue: active.filter((t) => dayDelta(t) < 0).sort((a, b) => dayDelta(a) - dayDelta(b)),
      today: active.filter((t) => dayDelta(t) === 0),
      upcoming: active.filter((t) => dayDelta(t) > 0).sort((a, b) => dayDelta(a) - dayDelta(b)),
    }
  }, [tasks])

  const toggleFilter = (f: Filter) => setFilter((cur) => (cur === f ? "all" : f))
  const show = (f: Filter) => filter === "all" || filter === f

  const nothing =
    (!show("overdue") || overdue.length === 0) &&
    (!show("today") || today.length === 0) &&
    (!show("upcoming") || upcoming.length === 0)

  return (
    <div className="flex flex-col gap-4 px-4 pb-32">
      <GlassCard hero className="flex items-stretch gap-1 p-1.5">
        <Stat value={overdue.length} label="Overdue" tone="overdue" active={filter === "overdue"} onClick={() => toggleFilter("overdue")} />
        <span className="my-3 w-px bg-white/[0.07]" />
        <Stat value={today.length} label="Due Today" tone="today" active={filter === "today"} onClick={() => toggleFilter("today")} />
        <span className="my-3 w-px bg-white/[0.07]" />
        <Stat value={upcoming.length} label="Upcoming" tone="upcoming" active={filter === "upcoming"} onClick={() => toggleFilter("upcoming")} />
      </GlassCard>

      <div key={filter} className="flex flex-col gap-4">
        {show("overdue") && overdue.length > 0 ? (
          <Group label="Overdue" count={overdue.length}>
            {overdue.map((t, i) => (
              <TaskRow key={t.id} task={t} index={i} onToggle={onToggle} />
            ))}
          </Group>
        ) : null}

        {show("today") && today.length > 0 ? (
          <Group label="Today" count={today.length}>
            {today.map((t, i) => (
              <TaskRow key={t.id} task={t} index={i} onToggle={onToggle} />
            ))}
          </Group>
        ) : null}

        {show("upcoming") && upcoming.length > 0 ? (
          <Group label="Later" count={upcoming.length}>
            {upcoming.map((t, i) => (
              <TaskRow key={t.id} task={t} index={i} onToggle={onToggle} />
            ))}
          </Group>
        ) : null}

        {nothing ? (
          <GlassCard>
            <EmptyState
              icon={<CheckCircle2 className="size-6" />}
              title="All clear"
              description="Nothing in this view. Capture a new task to get moving."
            />
          </GlassCard>
        ) : null}
      </div>
    </div>
  )
}
