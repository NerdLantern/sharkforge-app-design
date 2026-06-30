"use client"

import { Plus, Receipt } from "lucide-react"
import { GlassCard, Eyebrow, SectionHeader } from "../ui-kit"
import { ProjectCard, ExpenseCard } from "./parts"
import {
  PROJECTS,
  EXPENSES,
  activeCount,
  totalInvested,
  fmtMoney,
  type Project,
  type Expense,
} from "./data"

export function OverviewTab({
  onNewProject,
  onNewExpense,
  onOpenProject,
  onOpenExpense,
}: {
  onNewProject: () => void
  onNewExpense: () => void
  onOpenProject: (p: Project) => void
  onOpenExpense: (e: Expense) => void
}) {
  const active = PROJECTS.filter((p) => p.status === "in-flight")
  const recent = [...EXPENSES]
    .filter((e) => !e.trashed)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 4)

  return (
    <div className="sf-animate-rise space-y-6">
      {/* Quick actions */}
      <div>
        <Eyebrow>Quick Actions</Eyebrow>
        <div className="mt-2 flex gap-2.5">
          <button
            type="button"
            onClick={onNewProject}
            className="sf-hero flex flex-[1.4] items-center justify-center gap-2 rounded-2xl py-3.5 text-[0.8125rem] font-semibold uppercase tracking-wider text-foreground transition-transform active:scale-[0.98]"
          >
            <Plus className="size-4 text-primary" />
            New Project
          </button>
          <button
            type="button"
            onClick={onNewExpense}
            className="sf-glass flex flex-1 items-center justify-center gap-2 rounded-2xl py-3.5 text-[0.8125rem] font-semibold uppercase tracking-wider text-muted-foreground transition-transform active:scale-[0.98]"
          >
            <Receipt className="size-4" />
            Expense
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2.5">
        <GlassCard className="p-4 text-center">
          <Eyebrow>Projects</Eyebrow>
          <p className="sf-num mt-2 text-2xl font-semibold text-foreground">{PROJECTS.length}</p>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <Eyebrow>Active</Eyebrow>
          <p className="sf-num mt-2 text-2xl font-semibold text-primary">{activeCount()}</p>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <Eyebrow>Invested</Eyebrow>
          <p className="sf-num mt-2 text-2xl font-semibold text-foreground">
            {fmtMoney(totalInvested()).replace(/\.\d+$/, "")}
          </p>
        </GlassCard>
      </div>

      {/* Active projects */}
      <div className="space-y-3">
        <SectionHeader title="Active Projects" action="New" onAction={onNewProject} />
        {active.map((p) => (
          <ProjectCard key={p.id} project={p} onOpen={onOpenProject} />
        ))}
      </div>

      {/* Recent expenses */}
      <div className="space-y-2.5">
        <SectionHeader title="Recent Expenses" />
        {recent.map((e) => (
          <ExpenseCard key={e.id} expense={e} onOpen={onOpenExpense} />
        ))}
      </div>
    </div>
  )
}
