"use client"

import { useState } from "react"
import { Check, ChevronDown, MoreHorizontal, Repeat as RepeatIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { type Task, dayDelta, deltaLabel, formatWhen, formatTime } from "./data"

/* ------------------------------------------------------------------ */
/*  Check toggle                                                      */
/* ------------------------------------------------------------------ */

export function CheckToggle({
  checked,
  onToggle,
  tone = "default",
}: {
  checked: boolean
  onToggle: () => void
  tone?: "default" | "overdue" | "soon"
}) {
  const ring =
    tone === "overdue" ? "border-negative/50" : tone === "soon" ? "border-primary/45" : "border-white/25"
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={checked}
      aria-label={checked ? "Mark incomplete" : "Mark complete"}
      className={cn(
        "flex size-5 shrink-0 items-center justify-center rounded-full border transition-all duration-200 active:scale-90",
        checked ? "border-primary bg-primary text-primary-foreground" : cn("bg-transparent", ring),
      )}
    >
      {checked ? <Check className="sf-animate-pop size-3" strokeWidth={3.5} /> : null}
    </button>
  )
}

/* ------------------------------------------------------------------ */
/*  Delta pill (day offset)                                           */
/* ------------------------------------------------------------------ */

export function DeltaPill({ delta }: { delta: number }) {
  const overdue = delta < 0
  const today = delta === 0
  return (
    <span
      className={cn(
        "sf-num rounded-full px-2 py-0.5 text-[0.6875rem] font-semibold",
        overdue
          ? "bg-negative/15 text-negative"
          : today
            ? "bg-white/10 text-foreground"
            : "bg-primary/15 text-primary",
      )}
    >
      {deltaLabel(delta)}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/*  Active task row (List tab)                                        */
/* ------------------------------------------------------------------ */

export function TaskRow({
  task,
  index = 0,
  onToggle,
}: {
  task: Task
  index?: number
  onToggle: (id: string) => void
}) {
  const [expanded, setExpanded] = useState(false)
  const delta = dayDelta(task)
  const overdue = delta < 0
  const done = task.completed
  const subDone = task.subtasks?.filter((s) => s.done).length ?? 0
  const subTotal = task.subtasks?.length ?? 0

  return (
    <div
      className="sf-animate-rise relative"
      style={{ animationDelay: `${Math.min(index * 45, 280)}ms` }}
    >
      {/* left status accent */}
      <span
        className={cn(
          "absolute left-0 top-3 bottom-3 w-0.5 rounded-full",
          done ? "bg-white/10" : overdue ? "bg-negative/70" : "bg-primary/60",
        )}
      />
      <div className="flex items-start gap-3 px-4 py-3.5 pl-5">
        <div className="pt-0.5">
          <CheckToggle
            checked={done}
            onToggle={() => onToggle(task.id)}
            tone={overdue ? "overdue" : "soon"}
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p
              className={cn(
                "text-[0.9375rem] font-medium leading-snug text-foreground transition-colors",
                done && "text-muted-foreground line-through",
              )}
            >
              {task.title}
            </p>
            <div className="flex shrink-0 items-center gap-1.5">
              <DeltaPill delta={delta} />
              <button
                type="button"
                aria-label="Task options"
                className="text-muted-foreground/60 transition-colors active:text-foreground"
              >
                <MoreHorizontal className="size-4" />
              </button>
            </div>
          </div>

          <div className="mt-1 flex items-center gap-2">
            <p className="text-[0.8125rem] text-muted-foreground">{formatWhen(task)}</p>
            {task.repeat !== "None" ? (
              <span className="flex items-center gap-1 text-[0.6875rem] font-medium text-primary/80">
                <RepeatIcon className="size-3" />
                {task.repeat}
              </span>
            ) : null}
          </div>

          {subTotal > 0 ? (
            <div className="mt-2">
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="flex items-center gap-1.5 text-[0.75rem] font-medium text-muted-foreground transition-colors active:text-foreground"
              >
                <ChevronDown className={cn("size-3.5 transition-transform duration-200", expanded && "rotate-180")} />
                <span className="sf-num">
                  {subDone}/{subTotal}
                </span>
                <span className="h-1 w-16 overflow-hidden rounded-full bg-white/10">
                  <span
                    className="block h-full rounded-full bg-primary transition-all duration-500"
                    style={{ width: `${(subDone / subTotal) * 100}%` }}
                  />
                </span>
              </button>
              {expanded ? (
                <div className="mt-2 flex flex-col gap-1.5 pl-1">
                  {task.subtasks!.map((s, i) => (
                    <div key={i} className="sf-animate-expand flex items-center gap-2" style={{ animationDelay: `${i * 40}ms` }}>
                      <span
                        className={cn(
                          "flex size-3.5 items-center justify-center rounded-full border",
                          s.done ? "border-primary bg-primary text-primary-foreground" : "border-white/25",
                        )}
                      >
                        {s.done ? <Check className="size-2" strokeWidth={4} /> : null}
                      </span>
                      <span className={cn("text-[0.8125rem]", s.done ? "text-muted-foreground line-through" : "text-foreground/90")}>
                        {s.title}
                      </span>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Archive row (History tab)                                         */
/* ------------------------------------------------------------------ */

export function ArchiveRow({ task, index = 0 }: { task: Task; index?: number }) {
  return (
    <div
      className="sf-animate-rise flex items-center gap-3 px-4 py-3"
      style={{ animationDelay: `${Math.min(index * 35, 240)}ms` }}
    >
      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
        <Check className="size-3" strokeWidth={3.5} />
      </span>
      <p className="min-w-0 flex-1 truncate text-[0.9375rem] font-medium text-muted-foreground line-through">{task.title}</p>
      <span className="sf-num shrink-0 text-[0.8125rem] text-muted-foreground/80">{formatTime(task)}</span>
      <button type="button" aria-label="Task options" className="shrink-0 text-muted-foreground/50 transition-colors active:text-foreground">
        <MoreHorizontal className="size-4" />
      </button>
    </div>
  )
}
