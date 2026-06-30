"use client"

import { Pencil, Waves } from "lucide-react"
import { GlassCard, Eyebrow } from "../ui-kit"
import { ALLOCATION, ASSETS_TOTAL, DEBTS_TOTAL, EXPENSES, FREE, INCOME, NET_WORTH, fmt } from "./data"

const ASSET_PCT = Math.round((ASSETS_TOTAL / (ASSETS_TOTAL + DEBTS_TOTAL)) * 100)
const DEBT_PCT = 100 - ASSET_PCT

export function OverviewTab() {
  return (
    <div className="flex flex-col gap-6">
      {/* Net worth hero */}
      <GlassCard hero className="overflow-hidden p-5">
        <Eyebrow>Net Worth</Eyebrow>
        <p className="sf-num mt-1 text-[3rem] font-semibold leading-none text-foreground">{fmt(NET_WORTH)}</p>

        <div className="sf-inset mt-5 grid grid-cols-2 gap-4 rounded-2xl p-4">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full" style={{ background: "oklch(0.82 0.115 212)" }} />
              <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Assets
              </span>
            </div>
            <p className="sf-num mt-1.5 text-xl font-semibold text-foreground">{fmt(ASSETS_TOTAL)}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end gap-1.5">
              <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Debts
              </span>
              <span className="size-1.5 rounded-full bg-negative" />
            </div>
            <p className="sf-num mt-1.5 text-xl font-semibold text-foreground">{fmt(DEBTS_TOTAL)}</p>
          </div>
        </div>

        {/* ratio bar */}
        <div className="mt-4 flex h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
          <div className="h-full" style={{ width: `${ASSET_PCT}%`, background: "oklch(0.82 0.115 212)" }} />
          <div className="h-full flex-1 bg-negative" />
        </div>
        <div className="mt-2 flex justify-between text-[0.6875rem] font-medium uppercase tracking-wider text-muted-foreground">
          <span>{ASSET_PCT}% Assets</span>
          <span>{DEBT_PCT}% Debts</span>
        </div>
      </GlassCard>

      {/* Cashflow KPIs */}
      <div className="grid grid-cols-3 gap-3">
        <GlassCard className="p-3.5">
          <div className="flex items-center justify-between">
            <Eyebrow>Income</Eyebrow>
            <Pencil className="size-3 text-muted-foreground/60" />
          </div>
          <p className="sf-num mt-2 text-lg font-semibold text-foreground">{fmt(INCOME)}</p>
          <p className="text-[0.625rem] uppercase tracking-wider text-muted-foreground">Per month</p>
        </GlassCard>
        <GlassCard className="p-3.5">
          <Eyebrow>Expenses</Eyebrow>
          <p className="sf-num mt-2 text-lg font-semibold text-foreground">{fmt(EXPENSES)}</p>
          <p className="text-[0.625rem] uppercase tracking-wider text-muted-foreground">Per month</p>
        </GlassCard>
        <GlassCard className="p-3.5">
          <Eyebrow>Free</Eyebrow>
          <p className="sf-num mt-2 text-lg font-semibold text-primary">{fmt(FREE + 1)}</p>
          <p className="text-[0.625rem] uppercase tracking-wider text-muted-foreground">Per month</p>
        </GlassCard>
      </div>

      {/* Allocation */}
      <section className="flex flex-col gap-3">
        <div className="px-1">
          <Eyebrow>Allocation</Eyebrow>
          <h3 className="mt-1 text-[1.0625rem] font-semibold tracking-tight text-foreground">
            Where your income flows
          </h3>
        </div>
        <GlassCard className="p-4">
          {/* stacked bar */}
          <div className="flex h-2.5 overflow-hidden rounded-full">
            {ALLOCATION.map((a) => (
              <div key={a.name} style={{ width: `${(a.amount / INCOME) * 100}%`, background: a.color }} />
            ))}
            <div className="flex-1" style={{ background: "oklch(0.82 0.115 212 / 35%)" }} />
          </div>

          <div className="mt-4 flex flex-col divide-y divide-white/[0.05]">
            {ALLOCATION.map((a) => (
              <div key={a.name} className="flex items-center justify-between py-2.5">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full" style={{ background: a.color }} />
                  <span className="text-[0.9375rem] font-medium text-foreground">{a.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="sf-num text-[0.9375rem] font-medium text-foreground">
                    {fmt(a.amount)}
                    <span className="text-muted-foreground">/mo</span>
                  </span>
                  <span className="sf-num w-8 text-right text-[0.8125rem] font-medium text-muted-foreground">
                    {Math.round((a.amount / INCOME) * 100)}%
                  </span>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between py-2.5">
              <div className="flex items-center gap-2 text-primary">
                <Waves className="size-4" />
                <span className="text-[0.9375rem] font-medium">Free cash flow</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="sf-num text-[0.9375rem] font-medium text-primary">
                  {fmt(FREE + 1)}
                  <span className="text-primary/60">/mo</span>
                </span>
                <span className="sf-num w-8 text-right text-[0.8125rem] font-medium text-primary/80">
                  {Math.round(((FREE + 1) / INCOME) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </GlassCard>
      </section>
    </div>
  )
}
