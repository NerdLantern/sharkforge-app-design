"use client"

import { useMemo } from "react"
import { Archive } from "lucide-react"
import { GlassCard, EmptyState } from "../ui-kit"
import { ArchiveRow } from "./parts"
import { type Task, taskDate } from "./data"

const DOW = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
const MON = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]

export function HistoryTab({
  tasks,
  onClearAll,
}: {
  tasks: Task[]
  onClearAll: () => void
}) {
  const groups = useMemo(() => {
    const map = new Map<string, Task[]>()
    const sorted = [...tasks].sort((a, b) => taskDate(b).getTime() - taskDate(a).getTime())
    for (const t of sorted) {
      const key = `${t.year}-${t.month}-${t.day}`
      const list = map.get(key) ?? []
      list.push(t)
      map.set(key, list)
    }
    return Array.from(map.values())
  }, [tasks])

  return (
    <div className="flex flex-col gap-4 px-4 pb-32">
      <div className="flex items-center justify-between px-1">
        <p className="sf-eyebrow">Archive · {tasks.length}</p>
        {tasks.length > 0 ? (
          <button
            type="button"
            onClick={onClearAll}
            className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground transition-colors active:text-negative"
          >
            Clear all
          </button>
        ) : null}
      </div>

      {groups.length === 0 ? (
        <GlassCard>
          <EmptyState
            icon={<Archive className="size-6" />}
            title="History is empty"
            description="Completed tasks land here so you can look back on everything you've shipped."
          />
        </GlassCard>
      ) : (
        groups.map((group, gi) => {
          const head = group[0]
          const d = taskDate(head)
          return (
            <GlassCard key={`${head.year}-${head.month}-${head.day}`} className="overflow-hidden">
              <div className="flex items-center justify-between px-4 pb-1 pt-3.5">
                <p className="sf-eyebrow">
                  {DOW[d.getDay()]} · {MON[head.month]} {head.day}
                </p>
                <span className="sf-num text-[0.8125rem] text-muted-foreground/70">{group.length}</span>
              </div>
              <div className="divide-y divide-white/[0.05]">
                {group.map((t, i) => (
                  <ArchiveRow key={t.id} task={t} index={gi === 0 ? i : 0} />
                ))}
              </div>
            </GlassCard>
          )
        })
      )}
    </div>
  )
}
