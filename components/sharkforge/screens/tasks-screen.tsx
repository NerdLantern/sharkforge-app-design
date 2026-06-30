"use client"

import { useMemo, useState } from "react"
import { LogOut, Plus } from "lucide-react"
import { Eyebrow, SegmentedTabs } from "../ui-kit"
import { ListTab } from "../tasks/list-tab"
import { CalendarTab } from "../tasks/calendar-tab"
import { HistoryTab } from "../tasks/history-tab"
import { NewTaskSheet } from "../sheets/new-task-sheet"
import { ACTIVE_TASKS, ARCHIVE_TASKS, NOW, type Task } from "../tasks/data"

const TABS = ["List", "Calendar", "History"]

function whenLabel() {
  const period = NOW.hour >= 12 ? "pm" : "am"
  const h = NOW.hour % 12 === 0 ? 12 : NOW.hour % 12
  return `Today ${h}:${String(NOW.minute).padStart(2, "0")} ${period}`
}

export function TasksScreen() {
  const [tab, setTab] = useState("List")
  const [newOpen, setNewOpen] = useState(false)
  const [active, setActive] = useState<Task[]>(ACTIVE_TASKS)
  const [archive, setArchive] = useState<Task[]>(ARCHIVE_TASKS)

  const toggle = (id: string) =>
    setActive((tasks) => tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))

  // Calendar shows both active + archived tasks together.
  const calendarTasks = useMemo(() => [...active, ...archive], [active, archive])

  return (
    <div className="relative">
      {/* Header */}
      <header className="px-5 pb-3 pt-4">
        <div className="flex items-start justify-between">
          <div>
            <Eyebrow>Productivity</Eyebrow>
            <h1 className="mt-1 text-[2rem] font-semibold leading-none tracking-tight text-foreground">Tasks</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setNewOpen(true)}
              className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-[0.8125rem] font-semibold text-primary-foreground transition-transform active:scale-95"
            >
              <Plus className="size-4" strokeWidth={2.6} />
              New
            </button>
            <button
              type="button"
              aria-label="Sign out"
              className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-muted-foreground transition-colors active:bg-white/10"
            >
              <LogOut className="size-[1.05rem]" />
            </button>
          </div>
        </div>

        <SegmentedTabs options={TABS} value={tab} onChange={setTab} className="mt-4" />
      </header>

      {/* Body — keyed for fluid cross-tab transition */}
      <div key={tab} className="sf-animate-rise pt-1">
        {tab === "List" && <ListTab tasks={active} onToggle={toggle} />}
        {tab === "Calendar" && <CalendarTab tasks={calendarTasks} onToggle={toggle} />}
        {tab === "History" && <HistoryTab tasks={archive} onClearAll={() => setArchive([])} />}
      </div>

      <NewTaskSheet open={newOpen} onClose={() => setNewOpen(false)} whenLabel={whenLabel()} />
    </div>
  )
}
