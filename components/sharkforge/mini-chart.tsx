"use client"

import { useId } from "react"
import { cn } from "@/lib/utils"

type Props = {
  data: number[]
  className?: string
  height?: number
  tone?: "primary" | "positive" | "magenta"
  showArea?: boolean
  showDots?: boolean
}

const TONES: Record<string, string> = {
  primary: "oklch(0.82 0.115 212)",
  positive: "oklch(0.82 0.13 175)",
  magenta: "oklch(0.7 0.17 330)",
}

export function MiniChart({
  data,
  className,
  height = 120,
  tone = "primary",
  showArea = true,
  showDots = false,
}: Props) {
  const id = useId()
  const w = 320
  const h = height
  const pad = 8
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const stroke = TONES[tone]

  const points = data.map((d, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2)
    const y = pad + (1 - (d - min) / range) * (h - pad * 2)
    return [x, y] as const
  })

  // Smooth path via Catmull-Rom -> cubic bezier
  const line = points
    .map((p, i, arr) => {
      if (i === 0) return `M ${p[0]},${p[1]}`
      const prev = arr[i - 1]
      const cx = (prev[0] + p[0]) / 2
      return `C ${cx},${prev[1]} ${cx},${p[1]} ${p[0]},${p[1]}`
    })
    .join(" ")

  const area = `${line} L ${points[points.length - 1][0]},${h - pad} L ${points[0][0]},${h - pad} Z`
  const last = points[points.length - 1]

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className={cn("w-full", className)}
      style={{ height }}
    >
      <defs>
        <linearGradient id={`area-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.28" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      {showArea ? <path d={area} fill={`url(#area-${id})`} /> : null}
      <path d={line} fill="none" stroke={stroke} strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" />
      {showDots
        ? points.map((p, i) => (
            <circle key={i} cx={p[0]} cy={p[1]} r={2} fill="oklch(0.155 0.028 256)" stroke={stroke} strokeWidth={1.5} />
          ))
        : null}
      <circle cx={last[0]} cy={last[1]} r={4.5} fill={stroke} />
      <circle cx={last[0]} cy={last[1]} r={9} fill={stroke} opacity={0.18} />
    </svg>
  )
}

/* Simple comparative bar module */
export function BarModule({ data, labels, tone = "primary" }: { data: number[]; labels: string[]; tone?: "primary" | "positive" }) {
  const max = Math.max(...data) || 1
  const color = TONES[tone]
  return (
    <div className="flex items-end justify-between gap-2" style={{ height: 96 }}>
      {data.map((d, i) => {
        const isLast = i === data.length - 1
        return (
          <div key={i} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex w-full flex-1 items-end">
              <div
                className="w-full rounded-md"
                style={{
                  height: `${(d / max) * 100}%`,
                  background: isLast ? color : "oklch(1 0 0 / 12%)",
                  boxShadow: isLast ? `0 0 18px -4px ${color}` : "none",
                }}
              />
            </div>
            <span className={cn("text-[0.625rem]", isLast ? "text-foreground" : "text-muted-foreground")}>{labels[i]}</span>
          </div>
        )
      })}
    </div>
  )
}
