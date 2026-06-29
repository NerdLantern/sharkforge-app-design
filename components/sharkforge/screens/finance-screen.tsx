"use client"

import { useState } from "react"
import { ArrowDownLeft, ArrowUpRight, Building2, CreditCard, LineChart, MoreHorizontal, TrendingUp } from "lucide-react"
import { Eyebrow, GlassCard, ListRow, IconTile, SectionHeader, SegmentedTabs } from "../ui-kit"
import { MiniChart } from "../mini-chart"

const SERIES: Record<string, number[]> = {
  "1W": [276, 278, 277, 280, 279, 283, 284],
  "1M": [262, 268, 264, 271, 269, 278, 284],
  "1Y": [198, 212, 230, 224, 248, 266, 284],
}

const ACCOUNTS = [
  { name: "Investments", inst: "Fidelity · brokerage", value: "$182,400", delta: "+1.8%", tone: "positive" as const, icon: <TrendingUp className="size-5" /> },
  { name: "Cash", inst: "Mercury · checking", value: "$48,900", delta: "+0.1%", tone: "primary" as const, icon: <Building2 className="size-5" /> },
  { name: "Crypto", inst: "Coinbase · wallet", value: "$52,900", delta: "-2.3%", tone: "magenta" as const, icon: <LineChart className="size-5" /> },
]

const TXNS = [
  { name: "Whole Foods Market", cat: "Groceries", amt: "-$142.80", out: true },
  { name: "Dividend — VOO", cat: "Investment income", amt: "+$386.20", out: false },
  { name: "Equinox", cat: "Health & fitness", amt: "-$285.00", out: true },
]

export function FinanceScreen() {
  const [range, setRange] = useState("1M")

  return (
    <div className="flex flex-col gap-6 px-4 pb-32 pt-2">
      <header className="flex items-center justify-between px-1 pt-1">
        <div>
          <Eyebrow>Private Cockpit</Eyebrow>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">Finance</h1>
        </div>
        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.05] text-foreground active:scale-95"
        >
          <MoreHorizontal className="size-5" />
        </button>
      </header>

      {/* HERO — net worth */}
      <GlassCard hero className="overflow-hidden p-5">
        <Eyebrow>Total Net Worth</Eyebrow>
        <div className="mt-2 flex items-end justify-between">
          <span className="sf-num text-[2.75rem] font-semibold leading-none text-foreground">$284,200</span>
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-positive">
          <ArrowUpRight className="size-4" />
          <span className="sf-num text-sm font-medium">+$6,640 (2.4%)</span>
          <span className="text-sm text-muted-foreground">this month</span>
        </div>
        <MiniChart data={SERIES[range]} tone="primary" className="mt-4" height={132} />
        <SegmentedTabs options={["1W", "1M", "1Y"]} value={range} onChange={setRange} className="mt-4" />
      </GlassCard>

      {/* Cashflow KPIs */}
      <div className="grid grid-cols-2 gap-3">
        <GlassCard className="p-4">
          <div className="flex items-center gap-2 text-positive">
            <ArrowDownLeft className="size-4" />
            <Eyebrow className="text-muted-foreground">Income</Eyebrow>
          </div>
          <p className="sf-num mt-3 text-xl font-semibold text-foreground">$18,420</p>
          <p className="mt-1 text-xs text-muted-foreground">June, to date</p>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="flex items-center gap-2 text-negative">
            <ArrowUpRight className="size-4" />
            <Eyebrow className="text-muted-foreground">Spending</Eyebrow>
          </div>
          <p className="sf-num mt-3 text-xl font-semibold text-foreground">$9,180</p>
          <p className="mt-1 text-xs text-muted-foreground">49% of income</p>
        </GlassCard>
      </div>

      {/* Accounts */}
      <section className="flex flex-col gap-3">
        <SectionHeader title="Accounts" action="Manage" />
        <GlassCard className="divide-y divide-white/[0.06] overflow-hidden">
          {ACCOUNTS.map((a) => (
            <ListRow
              key={a.name}
              leading={<IconTile tone={a.tone}>{a.icon}</IconTile>}
              title={a.name}
              subtitle={a.inst}
              trailing={a.value}
              trailingSub={a.delta}
              chevron
            />
          ))}
        </GlassCard>
      </section>

      {/* Transactions */}
      <section className="flex flex-col gap-3">
        <SectionHeader title="Recent Activity" action="See all" />
        <GlassCard className="divide-y divide-white/[0.06] overflow-hidden">
          {TXNS.map((t) => (
            <ListRow
              key={t.name}
              leading={
                <IconTile tone={t.out ? "default" : "positive"}>
                  {t.out ? <CreditCard className="size-5" /> : <ArrowDownLeft className="size-5" />}
                </IconTile>
              }
              title={t.name}
              subtitle={t.cat}
              trailing={<span className={t.out ? "text-foreground" : "text-positive"}>{t.amt}</span>}
            />
          ))}
        </GlassCard>
      </section>
    </div>
  )
}
