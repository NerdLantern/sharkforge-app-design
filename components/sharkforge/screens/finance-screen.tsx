"use client"

import { useState } from "react"
import { LogOut } from "lucide-react"
import { Eyebrow, SegmentedTabs } from "../ui-kit"
import { OverviewTab } from "../finance/overview-tab"
import { AssetsTab } from "../finance/assets-tab"
import { ExpensesTab } from "../finance/expenses-tab"
import { DebtsTab } from "../finance/debts-tab"
import { FinanceAddSheet, type AddKind } from "../sheets/finance-add-sheet"

const TABS = ["Overview", "Assets", "Expenses", "Debts"]

export function FinanceScreen() {
  const [tab, setTab] = useState("Overview")
  const [addOpen, setAddOpen] = useState(false)
  const [addKind, setAddKind] = useState<AddKind>("asset")

  const openAdd = (kind: AddKind) => {
    setAddKind(kind)
    setAddOpen(true)
  }

  return (
    <div className="flex flex-col gap-5 px-4 pb-32 pt-2">
      <header className="flex items-start justify-between px-1 pt-1">
        <div>
          <Eyebrow>Private Finance</Eyebrow>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-foreground">Finances</h1>
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

      {tab === "Overview" && <OverviewTab />}
      {tab === "Assets" && <AssetsTab onAdd={() => openAdd("asset")} />}
      {tab === "Expenses" && <ExpensesTab onAdd={() => openAdd("expense")} />}
      {tab === "Debts" && <DebtsTab onAdd={() => openAdd("debt")} />}

      <FinanceAddSheet open={addOpen} onClose={() => setAddOpen(false)} kind={addKind} />
    </div>
  )
}
