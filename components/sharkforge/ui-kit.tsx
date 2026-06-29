"use client"

import type { ReactNode } from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  Eyebrow + Section header                                          */
/* ------------------------------------------------------------------ */

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("sf-eyebrow", className)}>{children}</p>
}

export function SectionHeader({
  title,
  action,
  onAction,
}: {
  title: string
  action?: string
  onAction?: () => void
}) {
  return (
    <div className="flex items-end justify-between px-1">
      <h2 className="text-[1.0625rem] font-semibold tracking-tight text-foreground">{title}</h2>
      {action ? (
        <button
          type="button"
          onClick={onAction}
          className="flex items-center gap-0.5 text-[0.8125rem] font-medium text-primary transition-opacity active:opacity-60"
        >
          {action}
          <ChevronRight className="size-3.5" />
        </button>
      ) : null}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Glass card archetypes                                             */
/* ------------------------------------------------------------------ */

export function GlassCard({
  children,
  className,
  hero,
  onClick,
}: {
  children: ReactNode
  className?: string
  hero?: boolean
  onClick?: () => void
}) {
  const Comp = onClick ? "button" : "div"
  return (
    <Comp
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={cn(
        hero ? "sf-hero" : "sf-glass",
        "rounded-3xl text-left",
        onClick && "transition-transform duration-200 active:scale-[0.985]",
        className,
      )}
    >
      {children}
    </Comp>
  )
}

/* ------------------------------------------------------------------ */
/*  KPI card                                                          */
/* ------------------------------------------------------------------ */

export function KpiCard({
  label,
  value,
  unit,
  delta,
  trend = "up",
  icon,
  className,
}: {
  label: string
  value: string
  unit?: string
  delta?: string
  trend?: "up" | "down" | "flat"
  icon?: ReactNode
  className?: string
}) {
  const trendColor =
    trend === "up" ? "text-positive" : trend === "down" ? "text-negative" : "text-muted-foreground"
  return (
    <GlassCard className={cn("p-4", className)}>
      <div className="flex items-center justify-between">
        <Eyebrow>{label}</Eyebrow>
        {icon ? <span className="text-muted-foreground">{icon}</span> : null}
      </div>
      <div className="mt-3 flex items-baseline gap-1">
        <span className="sf-num text-[1.75rem] font-semibold leading-none text-foreground">{value}</span>
        {unit ? <span className="text-sm font-medium text-muted-foreground">{unit}</span> : null}
      </div>
      {delta ? <p className={cn("sf-num mt-2 text-xs font-medium", trendColor)}>{delta}</p> : null}
    </GlassCard>
  )
}

/* ------------------------------------------------------------------ */
/*  Segmented tabs                                                    */
/* ------------------------------------------------------------------ */

export function SegmentedTabs({
  options,
  value,
  onChange,
  className,
}: {
  options: string[]
  value: string
  onChange: (v: string) => void
  className?: string
}) {
  return (
    <div className={cn("sf-inset flex rounded-2xl p-1", className)}>
      {options.map((opt) => {
        const active = opt === value
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={cn(
              "relative flex-1 rounded-xl py-2 text-[0.8125rem] font-medium transition-colors duration-200",
              active ? "text-foreground" : "text-muted-foreground",
            )}
          >
            {active ? (
              <span
                className="absolute inset-0 rounded-xl border border-white/10 bg-white/[0.07]"
                style={{ boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.12)" }}
              />
            ) : null}
            <span className="relative">{opt}</span>
          </button>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  List row                                                          */
/* ------------------------------------------------------------------ */

export function ListRow({
  leading,
  title,
  subtitle,
  trailing,
  trailingSub,
  onClick,
  chevron,
  className,
}: {
  leading?: ReactNode
  title: string
  subtitle?: string
  trailing?: ReactNode
  trailingSub?: string
  onClick?: () => void
  chevron?: boolean
  className?: string
}) {
  const Comp = onClick ? "button" : "div"
  return (
    <Comp
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-3.5 px-4 py-3 text-left transition-colors",
        onClick && "active:bg-white/[0.03]",
        className,
      )}
    >
      {leading ? <div className="shrink-0">{leading}</div> : null}
      <div className="min-w-0 flex-1">
        <p className="truncate text-[0.9375rem] font-medium text-foreground">{title}</p>
        {subtitle ? <p className="truncate text-[0.8125rem] text-muted-foreground">{subtitle}</p> : null}
      </div>
      {trailing || trailingSub ? (
        <div className="flex shrink-0 flex-col items-end">
          {trailing ? <div className="text-[0.9375rem] font-medium text-foreground">{trailing}</div> : null}
          {trailingSub ? <p className="text-xs text-muted-foreground">{trailingSub}</p> : null}
        </div>
      ) : null}
      {chevron ? <ChevronRight className="size-4 shrink-0 text-muted-foreground/60" /> : null}
    </Comp>
  )
}

/* ------------------------------------------------------------------ */
/*  Icon tile (consistent leading glyph container)                    */
/* ------------------------------------------------------------------ */

export function IconTile({
  children,
  tone = "default",
  className,
}: {
  children: ReactNode
  tone?: "default" | "primary" | "positive" | "negative" | "magenta"
  className?: string
}) {
  const tones: Record<string, string> = {
    default: "text-muted-foreground bg-white/[0.05]",
    primary: "text-primary bg-primary/12",
    positive: "text-positive bg-positive/12",
    negative: "text-negative bg-negative/12",
    magenta: "text-glow-magenta bg-glow-magenta/12",
  }
  return (
    <div
      className={cn(
        "flex size-10 items-center justify-center rounded-xl border border-white/[0.06]",
        tones[tone],
        className,
      )}
    >
      {children}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Divider                                                           */
/* ------------------------------------------------------------------ */

export function Divider() {
  return <div className="h-px w-full bg-white/[0.06]" />
}

/* ------------------------------------------------------------------ */
/*  Empty state                                                       */
/* ------------------------------------------------------------------ */

export function EmptyState({
  icon,
  title,
  description,
  action,
  onAction,
}: {
  icon: ReactNode
  title: string
  description: string
  action?: string
  onAction?: () => void
}) {
  return (
    <div className="flex flex-col items-center px-8 py-12 text-center">
      <div className="flex size-14 items-center justify-center rounded-2xl border border-white/[0.07] bg-white/[0.04] text-muted-foreground">
        {icon}
      </div>
      <h3 className="mt-4 text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-1.5 max-w-[15rem] text-pretty text-[0.8125rem] leading-relaxed text-muted-foreground">
        {description}
      </p>
      {action ? (
        <button
          type="button"
          onClick={onAction}
          className="mt-5 rounded-full bg-primary px-5 py-2.5 text-[0.8125rem] font-semibold text-primary-foreground transition-transform active:scale-95"
        >
          {action}
        </button>
      ) : null}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Progress ring (SVG)                                               */
/* ------------------------------------------------------------------ */

export function ProgressRing({
  value,
  size = 96,
  stroke = 8,
  label,
  sublabel,
}: {
  value: number
  size?: number
  stroke?: number
  label?: string
  sublabel?: string
}) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const offset = c - (Math.min(100, Math.max(0, value)) / 100) * c
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="oklch(1 0 0 / 8%)" strokeWidth={stroke} />
        <defs>
          <linearGradient id={`ring-${label}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.82 0.115 212)" />
            <stop offset="100%" stopColor="oklch(0.78 0.13 175)" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={`url(#ring-${label})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.9s cubic-bezier(0.22,1,0.36,1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {label ? <span className="sf-num text-lg font-semibold text-foreground">{label}</span> : null}
        {sublabel ? <span className="text-[0.625rem] uppercase tracking-wider text-muted-foreground">{sublabel}</span> : null}
      </div>
    </div>
  )
}
