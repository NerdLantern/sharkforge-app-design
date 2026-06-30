"use client"

import { MoreHorizontal, ArrowRight, Receipt, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import { GlassCard, ProgressRing } from "../ui-kit"
import {
  type Project,
  type Expense,
  projectExpenses,
  projectSpend,
  expenseTotal,
  daysUntil,
  fmtMoney,
  fmtDate,
  projectById,
} from "./data"

/* ---------- Scrollable chip row ---------- */

export function ChipRow({
  options,
  value,
  onChange,
}: {
  options: string[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="sf-scroll-x -mx-5 flex gap-2 overflow-x-auto px-5 pb-1">
      {options.map((opt) => {
        const active = opt === value
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={cn(
              "shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-wider transition-colors",
              active
                ? "border-primary/40 bg-primary/15 text-primary"
                : "border-white/[0.08] bg-white/[0.03] text-muted-foreground active:bg-white/[0.06]",
            )}
          >
            {opt}
          </button>
        )
      })}
    </div>
  )
}

/* ---------- Sort row (text links) ---------- */

export function SortRow({
  options,
  value,
  onChange,
}: {
  options: string[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="sf-scroll-x -mx-5 flex items-center gap-3 overflow-x-auto px-5 text-[0.8125rem]">
      <span className="shrink-0 text-muted-foreground/70">⇅</span>
      {options.map((opt) => {
        const active = opt === value
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={cn(
              "shrink-0 whitespace-nowrap font-medium transition-colors",
              active ? "text-foreground" : "text-muted-foreground/70 active:text-foreground",
            )}
          >
            {opt}
          </button>
        )
      })}
    </div>
  )
}

/* ---------- Project card ---------- */

const STATUS_META: Record<Project["status"], { label: string; dot: string; text: string }> = {
  "in-flight": { label: "In Flight", dot: "bg-primary", text: "text-primary" },
  completed: { label: "Completed", dot: "bg-positive", text: "text-positive" },
  planning: { label: "Planning", dot: "bg-muted-foreground", text: "text-muted-foreground" },
}

export function ProjectCard({
  project,
  onOpen,
}: {
  project: Project
  onOpen?: (p: Project) => void
}) {
  const expenses = projectExpenses(project.id)
  const spend = projectSpend(project.id)
  const days = daysUntil(project.targetDate)
  const status = STATUS_META[project.status]
  const ringValue =
    project.status === "completed"
      ? 100
      : days != null && days > 0
        ? Math.max(8, Math.min(100, 100 - (days / 60) * 100))
        : project.progress

  return (
    <GlassCard className="overflow-hidden p-5" onClick={onOpen ? () => onOpen(project) : undefined}>
      <div className="flex items-start gap-4">
        <div className="shrink-0">
          <ProgressRing
            value={ringValue}
            size={64}
            stroke={5}
            label={project.status === "completed" ? "✓" : days != null ? String(Math.abs(days)) : "—"}
            sublabel={project.status === "completed" ? "done" : "days"}
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="truncate text-[1.0625rem] font-semibold tracking-tight text-foreground">{project.name}</h3>
            <MoreHorizontal className="size-4 shrink-0 text-muted-foreground/50" />
          </div>
          <p className="mt-0.5 text-[0.75rem] text-muted-foreground">Started {fmtDate(project.startDate)}</p>
          <p className="mt-2 text-pretty text-[0.8125rem] leading-relaxed text-muted-foreground/90">
            {project.description}
          </p>
        </div>
      </div>

      {/* progress */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-[0.6875rem] font-semibold uppercase tracking-wider">
          <span className={cn("flex items-center gap-1.5", status.text)}>
            <span className={cn("size-1.5 rounded-full", status.dot)} />
            {status.label}
          </span>
          <span className="sf-num text-muted-foreground">{project.progress}%</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className="h-full rounded-full bg-[linear-gradient(90deg,oklch(0.82_0.115_212),oklch(0.78_0.13_175))]"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      {/* footer */}
      <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-3">
        <span className="flex items-center gap-1 text-[0.75rem] font-medium uppercase tracking-wide text-muted-foreground">
          {expenses.length} expenses <ArrowRight className="size-3" />
        </span>
        <span className="sf-num text-lg font-semibold text-foreground">{fmtMoney(spend)}</span>
      </div>
    </GlassCard>
  )
}

/* ---------- Expense row card ---------- */

export function ExpenseCard({
  expense,
  onOpen,
  showProject = true,
}: {
  expense: Expense
  onOpen?: (e: Expense) => void
  showProject?: boolean
}) {
  const project = projectById(expense.projectId)
  const total = expenseTotal(expense)
  return (
    <GlassCard className="p-4" onClick={onOpen ? () => onOpen(expense) : undefined}>
      <div className="flex items-center gap-3.5">
        <div
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.07]",
            expense.isReturn ? "bg-negative/10 text-negative" : "bg-white/[0.04] text-muted-foreground",
          )}
        >
          {expense.isReturn ? (
            <RotateCcw className="size-4" />
          ) : expense.hasReceipt ? (
            <Receipt className="size-4" />
          ) : (
            <span className="size-4 rounded-full border border-white/15" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          {showProject && project ? (
            <p className="truncate text-[0.625rem] font-semibold uppercase tracking-wider text-primary/80">
              {project.name}
            </p>
          ) : null}
          <p className="truncate text-[0.9375rem] font-semibold text-foreground">{expense.name}</p>
          <p className="text-[0.75rem] text-muted-foreground">{fmtDate(expense.date)}</p>
        </div>
        <span
          className={cn(
            "sf-num shrink-0 text-[1.0625rem] font-semibold",
            expense.isReturn ? "text-negative" : "text-foreground",
          )}
        >
          {expense.isReturn ? "−" : ""}
          {fmtMoney(Math.abs(total))}
        </span>
      </div>
    </GlassCard>
  )
}
