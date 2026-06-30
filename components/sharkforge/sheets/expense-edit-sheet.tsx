"use client"

import { useEffect } from "react"
import { X } from "lucide-react"
import { Sheet } from "../sheet"
import { ExpenseForm, useExpenseDraft } from "../remodel/expense-form"
import type { Expense } from "../remodel/data"

export function ExpenseEditSheet({
  open,
  onClose,
  expense,
}: {
  open: boolean
  onClose: () => void
  expense: Expense | null
}) {
  const [draft, setDraft] = useExpenseDraft()

  useEffect(() => {
    if (open && expense) {
      setDraft({
        name: expense.name,
        projectId: expense.projectId,
        materials: expense.materials,
        labor: expense.labor,
        date: expense.date,
        notes: expense.notes ?? "",
      })
    }
  }, [open, expense, setDraft])

  return (
    <Sheet open={open} onClose={onClose} className="px-5 pb-6 pt-2">
      <div className="flex items-start justify-between pt-2">
        <div>
          <p className="sf-eyebrow">Modify</p>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Edit Expense</h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex size-8 items-center justify-center rounded-full bg-white/[0.06] text-muted-foreground active:scale-90"
        >
          <X className="size-4" />
        </button>
      </div>

      <div className="mt-5 max-h-[58vh] overflow-y-auto sf-scroll">
        <ExpenseForm draft={draft} onChange={setDraft} isReturn={expense?.isReturn} />
      </div>

      <div className="mt-5 flex items-center gap-3 border-t border-white/[0.06] pt-4">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 rounded-full py-3 text-[0.8125rem] font-semibold uppercase tracking-wider text-muted-foreground active:opacity-60"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onClose}
          className="flex-[1.4] rounded-full bg-primary py-3 text-[0.8125rem] font-semibold uppercase tracking-wider text-primary-foreground transition-transform active:scale-95"
        >
          Save
        </button>
      </div>
    </Sheet>
  )
}
