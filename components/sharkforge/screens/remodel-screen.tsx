"use client"

import { useState } from "react"
import { LogOut } from "lucide-react"
import { Eyebrow, SegmentedTabs } from "../ui-kit"
import { OverviewTab } from "../remodel/overview-tab"
import { ProjectsTab } from "../remodel/projects-tab"
import { ExpensesTab } from "../remodel/expenses-tab"
import { NewProjectSheet } from "../sheets/new-project-sheet"
import { CaptureSheet } from "../sheets/capture-sheet"
import { ExpenseEditSheet } from "../sheets/expense-edit-sheet"
import type { Project, Expense } from "../remodel/data"

const TABS = ["Overview", "Projects", "Expenses"]

export function RemodelScreen() {
  const [tab, setTab] = useState("Overview")
  const [projectOpen, setProjectOpen] = useState(false)
  const [captureOpen, setCaptureOpen] = useState(false)
  const [captureMode, setCaptureMode] = useState<"expense" | "return">("expense")
  const [editExpense, setEditExpense] = useState<Expense | null>(null)
  const [editOpen, setEditOpen] = useState(false)

  const openCapture = (mode: "expense" | "return") => {
    setCaptureMode(mode)
    setCaptureOpen(true)
  }

  const openEdit = (e: Expense) => {
    setEditExpense(e)
    setEditOpen(true)
  }

  // Projects open as an expense filter for now — surface their expenses
  const openProject = (_p: Project) => setTab("Expenses")

  return (
    <div className="flex flex-col gap-5 px-4 pb-32 pt-2">
      <header className="flex items-start justify-between px-1 pt-1">
        <div>
          <Eyebrow>Home Projects</Eyebrow>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-foreground">Remodel</h1>
        </div>
        <button
          type="button"
          aria-label="Sign out"
          className="flex size-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.05] text-foreground active:scale-95"
        >
          <LogOut className="size-5" />
        </button>
      </header>

      <SegmentedTabs options={TABS} value={tab} onChange={setTab} />

      {tab === "Overview" && (
        <OverviewTab
          onNewProject={() => setProjectOpen(true)}
          onNewExpense={() => openCapture("expense")}
          onOpenProject={openProject}
          onOpenExpense={openEdit}
        />
      )}
      {tab === "Projects" && (
        <ProjectsTab onNewProject={() => setProjectOpen(true)} onOpenProject={openProject} />
      )}
      {tab === "Expenses" && (
        <ExpensesTab
          onNewExpense={() => openCapture("expense")}
          onNewReturn={() => openCapture("return")}
          onOpenExpense={openEdit}
        />
      )}

      <NewProjectSheet open={projectOpen} onClose={() => setProjectOpen(false)} />
      <CaptureSheet open={captureOpen} onClose={() => setCaptureOpen(false)} mode={captureMode} />
      <ExpenseEditSheet open={editOpen} onClose={() => setEditOpen(false)} expense={editExpense} />
    </div>
  )
}
