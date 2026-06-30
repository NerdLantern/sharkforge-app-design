"use client"

import { useState } from "react"
import { CalendarClock, Mic, Plus, Repeat as RepeatIcon, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Sheet } from "../sheet"
import { type Repeat } from "../tasks/data"

const REPEATS: Repeat[] = ["None", "Daily", "Weekly", "Monthly"]

function FieldButton({
  icon,
  label,
  active,
  onClick,
  children,
}: {
  icon: React.ReactNode
  label: string
  active?: boolean
  onClick?: () => void
  children: React.ReactNode
}) {
  return (
    <button type="button" onClick={onClick} className="flex flex-1 flex-col items-start gap-1 text-left">
      <span className={cn("flex items-center gap-1 text-[0.625rem] font-medium uppercase tracking-[0.16em]", active ? "text-primary" : "text-muted-foreground")}>
        {icon}
        {label}
      </span>
      <span className="text-[0.9375rem] font-medium text-foreground">{children}</span>
    </button>
  )
}

export function NewTaskSheet({
  open,
  onClose,
  whenLabel,
}: {
  open: boolean
  onClose: () => void
  whenLabel: string
}) {
  const [title, setTitle] = useState("")
  const [repeat, setRepeat] = useState<Repeat>("None")
  const [showRepeat, setShowRepeat] = useState(false)
  const [subtasks, setSubtasks] = useState<string[]>([])

  const reset = () => {
    setTitle("")
    setRepeat("None")
    setShowRepeat(false)
    setSubtasks([])
  }
  const close = () => {
    reset()
    onClose()
  }

  return (
    <Sheet open={open} onClose={close} className="px-5 pb-5">
      <div className="flex items-center justify-between pt-4">
        <div>
          <p className="sf-eyebrow">New Task</p>
          <h2 className="mt-0.5 text-2xl font-semibold tracking-tight text-foreground">Capture</h2>
        </div>
        <button
          type="button"
          aria-label="Close"
          onClick={close}
          className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-muted-foreground transition-colors active:bg-white/10"
        >
          <X className="size-4" />
        </button>
      </div>

      {/* Title input */}
      <div className="mt-5 flex items-center gap-3">
        <input
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          className="min-w-0 flex-1 bg-transparent text-lg font-medium text-foreground outline-none placeholder:text-muted-foreground/70"
        />
        <button
          type="button"
          aria-label="Voice capture"
          className="flex size-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors active:text-primary"
        >
          <Mic className="size-[1.15rem]" />
        </button>
      </div>

      <div className="mt-4 h-px w-full bg-white/[0.07]" />

      {/* Meta row */}
      <div className="mt-4 flex items-start gap-4">
        <FieldButton icon={<CalendarClock className="size-3" />} label="When">
          {whenLabel}
        </FieldButton>
        <FieldButton
          icon={<RepeatIcon className="size-3" />}
          label="Repeat"
          active={showRepeat || repeat !== "None"}
          onClick={() => setShowRepeat((v) => !v)}
        >
          {repeat === "None" ? <span className="text-muted-foreground">—</span> : repeat}
        </FieldButton>
        <FieldButton
          icon={<Plus className="size-3" />}
          label="Subtasks"
          active={subtasks.length > 0}
          onClick={() => setSubtasks((s) => [...s, ""])}
        >
          {subtasks.length > 0 ? `${subtasks.length}` : <span className="text-primary">+</span>}
        </FieldButton>
      </div>

      {/* Repeat picker */}
      {showRepeat ? (
        <div className="sf-animate-expand mt-4 flex gap-2">
          {REPEATS.map((r) => {
            const active = r === repeat
            return (
              <button
                key={r}
                type="button"
                onClick={() => setRepeat(r)}
                className={cn(
                  "flex-1 rounded-full border px-3 py-2 text-[0.8125rem] font-medium transition-colors",
                  active
                    ? "border-primary/40 bg-primary/15 text-primary"
                    : "border-white/10 bg-white/[0.04] text-muted-foreground active:bg-white/10",
                )}
              >
                {r}
              </button>
            )
          })}
        </div>
      ) : null}

      {/* Subtasks */}
      {subtasks.length > 0 ? (
        <div className="sf-animate-expand mt-4 flex flex-col gap-2">
          {subtasks.map((s, i) => (
            <div key={i} className="flex items-center gap-2.5 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2">
              <span className="size-3.5 rounded-full border border-white/25" />
              <input
                value={s}
                onChange={(e) => setSubtasks((arr) => arr.map((v, j) => (j === i ? e.target.value : v)))}
                placeholder={`Subtask ${i + 1}`}
                className="min-w-0 flex-1 bg-transparent text-[0.875rem] text-foreground outline-none placeholder:text-muted-foreground/60"
              />
              <button
                type="button"
                aria-label="Remove subtask"
                onClick={() => setSubtasks((arr) => arr.filter((_, j) => j !== i))}
                className="text-muted-foreground/60 transition-colors active:text-negative"
              >
                <X className="size-3.5" />
              </button>
            </div>
          ))}
        </div>
      ) : null}

      {/* Footer */}
      <div className="mt-6 flex items-center gap-3">
        <button
          type="button"
          onClick={close}
          className="flex-1 rounded-full border border-white/10 bg-white/[0.04] py-3.5 text-[0.875rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground transition-colors active:bg-white/10"
        >
          Cancel
        </button>
        <button
          type="button"
          disabled={!title.trim()}
          onClick={close}
          className="flex-[1.6] rounded-full bg-primary py-3.5 text-[0.875rem] font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-all active:scale-[0.98] disabled:opacity-40"
        >
          Add Task
        </button>
      </div>
    </Sheet>
  )
}
