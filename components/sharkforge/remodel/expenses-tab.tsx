"use client"

import { useMemo, useState } from "react"
import { Search, Plus, Minus, Receipt } from "lucide-react"
import { ExpenseCard, ChipRow } from "./parts"
import { EmptyState } from "../ui-kit"
import { EXPENSES, expenseTotal, projectById, fmtMoney, type Expense } from "./data"

const FILTERS = ["All", "Materials", "Labor", "Receipts", "Returns", "Trash"]

export function ExpensesTab({
  onNewExpense,
  onNewReturn,
  onOpenExpense,
}: {
  onNewExpense: () => void
  onNewReturn: () => void
  onOpenExpense: (e: Expense) => void
}) {
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState("All")

  const list = useMemo(() => {
    let r = [...EXPENSES]
    const q = query.trim().toLowerCase()
    if (q)
      r = r.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          (projectById(e.projectId)?.name.toLowerCase().includes(q) ?? false) ||
          (e.notes?.toLowerCase().includes(q) ?? false),
      )
    if (filter === "Trash") r = r.filter((e) => e.trashed)
    else r = r.filter((e) => !e.trashed)

    if (filter === "Materials") r = r.filter((e) => e.materials > 0 && e.labor === 0)
    else if (filter === "Labor") r = r.filter((e) => e.labor > 0)
    else if (filter === "Receipts") r = r.filter((e) => e.hasReceipt)
    else if (filter === "Returns") r = r.filter((e) => e.isReturn)

    return r.sort((a, b) => b.date.localeCompare(a.date))
  }, [query, filter])

  const total = list.reduce((acc, e) => acc + expenseTotal(e), 0)

  return (
    <div className="space-y-4">
      {/* search */}
      <div className="flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-3">
        <Search className="size-4 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search receipts, projects, items…"
          className="min-w-0 flex-1 bg-transparent text-[0.9375rem] text-foreground outline-none placeholder:text-muted-foreground/60"
        />
      </div>

      {/* actions */}
      <div className="flex gap-2.5">
        <button
          type="button"
          onClick={onNewReturn}
          className="sf-glass flex flex-1 items-center justify-center gap-1.5 rounded-xl py-3 text-[0.75rem] font-semibold uppercase tracking-wider text-muted-foreground transition-transform active:scale-95"
        >
          <Minus className="size-3.5" />
          Return
        </button>
        <button
          type="button"
          onClick={onNewExpense}
          className="flex flex-[1.4] items-center justify-center gap-1.5 rounded-xl bg-primary py-3 text-[0.75rem] font-semibold uppercase tracking-wider text-primary-foreground transition-transform active:scale-95"
        >
          <Plus className="size-3.5" />
          New Expense
        </button>
      </div>

      <ChipRow options={FILTERS} value={filter} onChange={setFilter} />

      {/* results header */}
      <div className="flex items-center justify-between px-1">
        <p className="sf-eyebrow">{list.length} Results</p>
        <p className="sf-num text-[0.9375rem] font-semibold text-foreground">{fmtMoney(total)}</p>
      </div>

      <div key={`${filter}-${query}`} className="sf-animate-rise space-y-2.5">
        {list.length === 0 ? (
          <EmptyState
            icon={<Receipt className="size-6" />}
            title="No expenses found"
            description="Adjust your search or filters, or capture a new receipt."
            action="New Expense"
            onAction={onNewExpense}
          />
        ) : (
          list.map((e) => <ExpenseCard key={e.id} expense={e} onOpen={onOpenExpense} />)
        )}
      </div>
    </div>
  )
}
