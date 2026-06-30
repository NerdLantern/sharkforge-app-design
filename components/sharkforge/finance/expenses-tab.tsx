"use client"

import { EXPENSE_GROUPS, fmt, sum } from "./data"
import { GroupCard, PayPill, RowActions, TabHeader } from "./parts"

export function ExpensesTab({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex flex-col gap-4">
      <TabHeader eyebrow="Recurring" title="Bills & Subscriptions" addLabel="Add" onAdd={onAdd} />

      {EXPENSE_GROUPS.map((g) => (
        <GroupCard key={g.category} category={g.category} total={`${fmt(sum(g.items))}/mo`}>
          {g.items.map((item) => (
            <div key={item.name} className="flex items-center gap-3 px-4 py-3">
              <div className="min-w-0 flex-1">
                <p className="text-[0.9375rem] font-semibold text-foreground">{item.name}</p>
                <p className="text-[0.6875rem] font-medium uppercase tracking-wider text-muted-foreground">
                  {item.cadence}
                </p>
              </div>
              <span className="sf-num shrink-0 text-[0.9375rem] font-semibold text-foreground">{fmt(item.amount)}</span>
              {item.payable ? <PayPill /> : null}
              <RowActions />
            </div>
          ))}
        </GroupCard>
      ))}
    </div>
  )
}
