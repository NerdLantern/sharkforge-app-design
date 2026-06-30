"use client"

import { LayoutGrid, CheckCircle2, Dumbbell, UtensilsCrossed, Wallet, Hammer } from "lucide-react"
import { cn } from "@/lib/utils"

export type TabKey = "home" | "tasks" | "train" | "fuel" | "money" | "remodel"

const TABS: { key: TabKey; label: string; icon: typeof LayoutGrid }[] = [
  { key: "home", label: "Dash", icon: LayoutGrid },
  { key: "tasks", label: "Tasks", icon: CheckCircle2 },
  { key: "train", label: "Fit", icon: Dumbbell },
  { key: "fuel", label: "Fuel", icon: UtensilsCrossed },
  { key: "money", label: "Money", icon: Wallet },
  { key: "remodel", label: "Remodel", icon: Hammer },
]

export function BottomNav({ active, onChange }: { active: TabKey; onChange: (t: TabKey) => void }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 px-4 pb-3">
      <nav className="sf-chrome pointer-events-auto mx-auto flex max-w-sm items-center justify-around rounded-[1.75rem] px-2 py-2">
        {TABS.map(({ key, label, icon: Icon }) => {
          const isActive = key === active
          return (
            <button
              key={key}
              type="button"
              onClick={() => onChange(key)}
              className="relative flex flex-1 flex-col items-center gap-1 rounded-2xl py-2 transition-colors"
            >
              {isActive ? (
                <span
                  className="absolute inset-x-2 inset-y-0 rounded-2xl bg-primary/10"
                  style={{ boxShadow: "inset 0 0 0 1px oklch(0.82 0.115 212 / 25%)" }}
                />
              ) : null}
              <Icon
                className={cn("relative size-[1.35rem] transition-colors", isActive ? "text-primary" : "text-muted-foreground")}
                strokeWidth={isActive ? 2.4 : 2}
              />
              <span
                className={cn(
                  "relative text-[0.625rem] font-medium tracking-wide transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground",
                )}
              >
                {label}
              </span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}
