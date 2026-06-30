"use client"

import type { ReactNode } from "react"
import { Pencil, Trash2, Plus, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

export function TabHeader({
  eyebrow,
  title,
  addLabel,
  onAdd,
}: {
  eyebrow: string
  title: string
  addLabel: string
  onAdd: () => void
}) {
  return (
    <div className="flex items-end justify-between px-1">
      <div>
        <p className="sf-eyebrow">{eyebrow}</p>
        <h2 className="mt-1 text-xl font-semibold tracking-tight text-foreground">{title}</h2>
      </div>
      <button
        type="button"
        onClick={onAdd}
        className="flex items-center gap-1 rounded-full border border-primary/30 bg-primary/12 px-3.5 py-2 text-[0.75rem] font-semibold uppercase tracking-wider text-primary transition-transform active:scale-95"
      >
        <Plus className="size-3.5" strokeWidth={2.5} />
        {addLabel}
      </button>
    </div>
  )
}

export function GroupCard({
  category,
  total,
  children,
}: {
  category: string
  total: string
  children: ReactNode
}) {
  return (
    <div className="sf-glass overflow-hidden rounded-3xl">
      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-primary/90">
          {category}
        </span>
        <span className="sf-num text-[0.8125rem] font-medium text-muted-foreground">{total}</span>
      </div>
      <div className="h-px w-full bg-white/[0.06]" />
      <div className="divide-y divide-white/[0.05]">{children}</div>
    </div>
  )
}

export function RowActions({ onEdit, onDelete }: { onEdit?: () => void; onDelete?: () => void }) {
  return (
    <div className="flex shrink-0 items-center gap-1.5">
      <button
        type="button"
        onClick={onEdit}
        aria-label="Edit"
        className="flex size-7 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-muted-foreground transition-colors active:scale-90 active:text-foreground"
      >
        <Pencil className="size-3" />
      </button>
      <button
        type="button"
        onClick={onDelete}
        aria-label="Delete"
        className="flex size-7 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-muted-foreground transition-colors active:scale-90 active:text-negative"
      >
        <Trash2 className="size-3" />
      </button>
    </div>
  )
}

export function PayPill({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1 rounded-full border border-primary/30 bg-primary/12 px-2.5 py-1 text-[0.625rem] font-bold uppercase tracking-wider text-primary active:scale-95"
    >
      <ExternalLink className="size-3" />
      Pay
    </button>
  )
}

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-md border border-negative/40 px-1.5 py-0.5 text-[0.625rem] font-bold uppercase tracking-wider text-negative",
        className,
      )}
    >
      {children}
    </span>
  )
}
