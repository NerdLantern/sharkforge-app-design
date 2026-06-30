"use client"

import { useState } from "react"
import { Signal, Wifi, BatteryFull } from "lucide-react"
import { BottomNav, type TabKey } from "./bottom-nav"
import { DashboardScreen } from "./screens/dashboard-screen"
import { TasksScreen } from "./screens/tasks-screen"
import { FinanceScreen } from "./screens/finance-screen"
import { NutritionScreen } from "./screens/nutrition-screen"
import { FitScreen } from "./screens/fit-screen"

type View = TabKey

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-7 pt-3 text-foreground">
      <span className="sf-num text-sm font-semibold">9:41</span>
      <div className="flex items-center gap-1.5">
        <Signal className="size-4" />
        <Wifi className="size-4" />
        <BatteryFull className="size-5" />
      </div>
    </div>
  )
}

export function AppShell() {
  const [tab, setTab] = useState<TabKey>("home")
  const [view, setView] = useState<View>("home")

  const goTab = (t: TabKey) => {
    setTab(t)
    setView(t)
  }

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-[radial-gradient(120%_80%_at_50%_-10%,oklch(0.24_0.05_250)_0%,oklch(0.12_0.025_258)_55%)] p-0 sm:p-6">
      {/* Phone frame */}
      <div className="relative h-[100dvh] w-full max-w-[420px] overflow-hidden bg-background sm:h-[860px] sm:rounded-[3rem] sm:border sm:border-white/10 sm:shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]">
        {/* Ambient environmental glows */}
        <div className="pointer-events-none absolute -left-20 -top-10 size-72 rounded-full bg-glow-teal/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-1/3 size-72 rounded-full bg-glow-magenta/[0.07] blur-3xl" />

        <div className="relative flex h-full flex-col">
          <StatusBar />

          {/* Scrollable content */}
          <div className="sf-scroll relative flex-1 overflow-y-auto">
            {view === "home" && <DashboardScreen onOpenExercise={() => goTab("train")} />}
            {view === "tasks" && <TasksScreen />}
            {view === "money" && <FinanceScreen />}
            {view === "fuel" && <NutritionScreen />}
            {view === "train" && <FitScreen />}
          </div>

          <BottomNav active={tab} onChange={goTab} />
        </div>
      </div>
    </main>
  )
}
