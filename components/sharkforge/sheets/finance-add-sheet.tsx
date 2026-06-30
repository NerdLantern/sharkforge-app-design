"use client"

import { useState } from "react"
import { X, Check } from "lucide-react"
import { Sheet } from "../sheet"
import { Eyebrow } from "../ui-kit"
import { cn } from "@/lib/utils"

export type AddKind = "asset" | "expense" | "debt"

const CONFIG: Record<
  AddKind,
  { eyebrow: string; title: string; categories: string[]; nameLabel: string; cta: string }
> = {
  asset: {
    eyebrow: "Portfolio",
    title: "Add Asset",
    nameLabel: "Asset name",
    categories: ["Cash & Savings", "Retirement Account", "Investment Account", "Real Estate", "Vehicle"],
    cta: "Add asset",
  },
  expense: {
    eyebrow: "Recurring",
    title: "Add Bill",
    nameLabel: "Bill name",
    categories: ["Housing", "Transport", "Subscription", "Utilities", "Insurance"],
    cta: "Add bill",
  },
  debt: {
    eyebrow: "Outstanding",
    title: "Add Debt",
    nameLabel: "Debt name",
    categories: ["Auto Loan", "Mortgage", "Credit Card", "Student Loan", "Personal Loan"],
    cta: "Add debt",
  },
}

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  )
}

const inputCls =
  "w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-[0.9375rem] text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-primary/40"

export function FinanceAddSheet({
  open,
  onClose,
  kind,
}: {
  open: boolean
  onClose: () => void
  kind: AddKind
}) {
  const cfg = CONFIG[kind]
  const [category, setCategory] = useState(cfg.categories[0])

  return (
    <Sheet open={open} onClose={onClose}>
      <div className="flex max-h-[88vh] flex-col px-5 pb-8 pt-4">
        <div className="flex items-start justify-between">
          <div>
            <Eyebrow>{cfg.eyebrow}</Eyebrow>
            <h2 className="mt-1 text-xl font-semibold tracking-tight text-foreground">{cfg.title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-muted-foreground active:scale-90"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="sf-scroll mt-5 flex-1 space-y-4 overflow-y-auto">
          {/* Category chips */}
          <div>
            <span className="mb-2 block text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Category
            </span>
            <div className="flex flex-wrap gap-2">
              {cfg.categories.map((c) => {
                const active = c === category
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCategory(c)}
                    className={cn(
                      "rounded-full border px-3.5 py-2 text-[0.8125rem] font-medium transition-colors active:scale-95",
                      active
                        ? "border-primary/40 bg-primary/15 text-primary"
                        : "border-white/10 bg-white/[0.04] text-muted-foreground",
                    )}
                  >
                    {c}
                  </button>
                )
              })}
            </div>
          </div>

          <Field label={cfg.nameLabel}>
            <input className={inputCls} placeholder={kind === "asset" ? "e.g. Checking" : kind === "debt" ? "e.g. Auto Loan" : "e.g. Spotify"} />
          </Field>

          <Field label={kind === "debt" ? "Outstanding balance" : "Amount"}>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[0.9375rem] text-muted-foreground">$</span>
              <input
                inputMode="decimal"
                className={cn(inputCls, "sf-num pl-8")}
                placeholder="0.00"
              />
            </div>
          </Field>

          {/* Kind-specific extras */}
          {kind === "expense" && (
            <Field label="Cadence">
              <div className="sf-inset flex rounded-2xl p-1">
                {["Monthly", "Yearly", "Weekly"].map((c, i) => (
                  <button
                    key={c}
                    type="button"
                    className={cn(
                      "flex-1 rounded-xl py-2 text-[0.8125rem] font-medium transition-colors",
                      i === 0 ? "bg-white/[0.07] text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </Field>
          )}

          {kind === "debt" && (
            <div className="grid grid-cols-2 gap-3">
              <Field label="APR %">
                <input inputMode="decimal" className={cn(inputCls, "sf-num")} placeholder="0.00" />
              </Field>
              <Field label="Min / mo">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[0.9375rem] text-muted-foreground">$</span>
                  <input inputMode="decimal" className={cn(inputCls, "sf-num pl-8")} placeholder="0" />
                </div>
              </Field>
            </div>
          )}

          {kind === "asset" && (
            <Field label="Note / link (optional)">
              <input className={inputCls} placeholder="e.g. Primary residence estimate" />
            </Field>
          )}

          {kind === "expense" && (
            <label className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5">
              <span className="text-[0.9375rem] text-foreground">Show quick-pay link</span>
              <span className="relative inline-flex h-6 w-10 items-center rounded-full bg-primary/80">
                <span className="absolute right-0.5 size-5 rounded-full bg-primary-foreground" />
              </span>
            </label>
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-[0.9375rem] font-semibold text-primary-foreground transition-transform active:scale-[0.98]"
        >
          <Check className="size-4" strokeWidth={2.5} />
          {cfg.cta}
        </button>
      </div>
    </Sheet>
  )
}
