"use client"

import {
  Activity,
  ArrowUpRight,
  Bell,
  Dumbbell,
  Flame,
  CheckCircle2,
  Circle,
  Wallet,
  Droplets,
} from "lucide-react"
import { Eyebrow, GlassCard, KpiCard, ListRow, IconTile, SectionHeader, ProgressRing } from "../ui-kit"
import { MiniChart } from "../mini-chart"

export function DashboardScreen({ onOpenExercise }: { onOpenExercise: () => void }) {
  return (
    <div className="flex flex-col gap-6 px-4 pb-32 pt-2">
      {/* Greeting header */}
      <header className="flex items-center justify-between px-1 pt-1">
        <div>
          <Eyebrow>Tuesday · June 29</Eyebrow>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground text-balance">
            Good morning, Marcus
          </h1>
        </div>
        <button
          type="button"
          className="relative flex size-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.05] text-foreground active:scale-95"
        >
          <Bell className="size-[1.15rem]" />
          <span className="absolute right-2.5 top-2.5 size-1.5 rounded-full bg-primary" />
        </button>
      </header>

      {/* HERO — daily readiness */}
      <GlassCard hero className="overflow-hidden p-5">
        <div className="flex items-center justify-between">
          <div>
            <Eyebrow>Today&apos;s Readiness</Eyebrow>
            <div className="mt-2 flex items-end gap-2">
              <span className="sf-num text-5xl font-semibold leading-none text-foreground">92</span>
              <span className="mb-1 text-sm font-medium text-positive">Peak</span>
            </div>
            <p className="mt-2.5 max-w-[11rem] text-pretty text-[0.8125rem] leading-relaxed text-muted-foreground">
              Recovery is high. A heavy lower session is optimal today.
            </p>
          </div>
          <ProgressRing value={92} size={104} label="92%" sublabel="Ready" />
        </div>
        <div className="mt-5 grid grid-cols-3 gap-3">
          {[
            { k: "Sleep", v: "7h 48m", i: <Activity className="size-3.5" /> },
            { k: "Resting HR", v: "48 bpm", i: <Flame className="size-3.5" /> },
            { k: "Strain", v: "12.4", i: <ArrowUpRight className="size-3.5" /> },
          ].map((s) => (
            <div key={s.k} className="sf-inset rounded-2xl px-3 py-2.5">
              <div className="flex items-center gap-1.5 text-muted-foreground">{s.i}</div>
              <p className="sf-num mt-1.5 text-sm font-semibold text-foreground">{s.v}</p>
              <p className="text-[0.625rem] uppercase tracking-wide text-muted-foreground">{s.k}</p>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* KPI row */}
      <div className="grid grid-cols-2 gap-3">
        <KpiCard
          label="Calories"
          value="1,840"
          unit="/ 2,600"
          delta="+ 312 to go"
          trend="flat"
          icon={<Flame className="size-4" />}
        />
        <KpiCard
          label="Net Worth"
          value="$284.2k"
          delta="+ 2.4% this month"
          trend="up"
          icon={<Wallet className="size-4" />}
        />
      </div>

      {/* Activity module */}
      <GlassCard className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <Eyebrow>Weekly Volume</Eyebrow>
            <p className="sf-num mt-2 text-2xl font-semibold text-foreground">48,250 <span className="text-sm font-medium text-muted-foreground">kg</span></p>
          </div>
          <span className="rounded-full bg-positive/12 px-2.5 py-1 text-xs font-medium text-positive">+8.2%</span>
        </div>
        <MiniChart data={[28, 33, 30, 41, 38, 46, 48]} tone="primary" className="mt-3" height={96} />
      </GlassCard>

      {/* Focus tasks */}
      <section className="flex flex-col gap-3">
        <SectionHeader title="Today's Focus" action="All tasks" />
        <GlassCard className="divide-y divide-white/[0.06] overflow-hidden">
          <ListRow
            leading={<CheckCircle2 className="size-5 text-positive" />}
            title="Morning mobility — 12 min"
            subtitle="Completed · 6:40 AM"
            className="opacity-60"
          />
          <ListRow
            leading={<Circle className="size-5 text-muted-foreground/60" />}
            title="Lower body — heavy"
            subtitle="Strength · 5 exercises"
            chevron
            onClick={onOpenExercise}
          />
          <ListRow
            leading={<Circle className="size-5 text-muted-foreground/60" />}
            title="Review Q3 portfolio rebalance"
            subtitle="Finance · due 4:00 PM"
            chevron
          />
        </GlassCard>
      </section>

      {/* Quick modules */}
      <section className="flex flex-col gap-3">
        <SectionHeader title="Modules" />
        <GlassCard className="divide-y divide-white/[0.06] overflow-hidden">
          <ListRow
            leading={<IconTile tone="primary"><Dumbbell className="size-5" /></IconTile>}
            title="Training"
            subtitle="Next: Lower body, today"
            trailing="92"
            trailingSub="readiness"
            onClick={onOpenExercise}
          />
          <ListRow
            leading={<IconTile tone="positive"><Droplets className="size-5" /></IconTile>}
            title="Nutrition"
            subtitle="1,840 / 2,600 kcal"
            trailing="71%"
            chevron
          />
          <ListRow
            leading={<IconTile tone="magenta"><Wallet className="size-5" /></IconTile>}
            title="Finance"
            subtitle="3 accounts synced"
            trailing="$284.2k"
            chevron
          />
        </GlassCard>
      </section>
    </div>
  )
}
