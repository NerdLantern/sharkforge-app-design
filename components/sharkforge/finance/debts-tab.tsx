"use client"

import { GlassCard } from "../ui-kit"
import { DEBTS, DEBTS_TOTAL, fmt, sum } from "./data"
import { RowActions, Tag, TabHeader } from "./parts"

export function DebtsTab({ onAdd }: { onAdd: () => void }) {
  const minTotal = sum(DEBTS.map((d) => ({ amount: d.min ?? 0 })))

  return (
    <div className="flex flex-col gap-4">
      <TabHeader eyebrow="Outstanding" title="Debts & Liabilities" addLabel="Add debt" onAdd={onAdd} />

      {/* Summary strip */}
      <GlassCard className="flex items-center justify-between p-4">
        <div>
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Total outstanding
          </p>
          <p className="sf-num mt-1 text-2xl font-semibold text-negative">{fmt(DEBTS_TOTAL)}</p>
        </div>
        <div className="text-right">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Min / mo
          </p>
          <p className="sf-num mt-1 text-lg font-semibold text-foreground">{fmt(minTotal)}</p>
        </div>
      </GlassCard>

      {DEBTS.map((d) => (
        <GlassCard key={d.name} className="p-4">
          <div className="flex items-start gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-[0.9375rem] font-semibold text-foreground">{d.name}</p>
              <div className="mt-1.5 flex flex-wrap items-center gap-2">
                <Tag>{d.type}</Tag>
                {d.apr ? (
                  <span className="sf-num text-[0.75rem] font-medium text-muted-foreground">{d.apr}% APR</span>
                ) : null}
              </div>
            </div>
            <div className="shrink-0 text-right">
              <p className="sf-num text-lg font-semibold text-negative">{fmt(d.balance)}</p>
              <p className="text-[0.625rem] font-semibold uppercase tracking-wider text-muted-foreground">
                Outstanding
              </p>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-white/[0.06] pt-3">
            <span className="sf-num text-[0.8125rem] text-muted-foreground">
              {d.min ? `Min: ${fmt(d.min)}/mo` : "No minimum set"}
            </span>
            <RowActions />
          </div>
        </GlassCard>
      ))}
    </div>
  )
}
