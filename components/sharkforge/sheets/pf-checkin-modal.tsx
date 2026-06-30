"use client"

import { useEffect, useState } from "react"
import QRCode from "qrcode"
import { X, UserPlus } from "lucide-react"

const MEMBER = {
  name: "Yohan Mercedes",
  date: "Jun 30, 2026",
  number: "6462808278",
}

export function PfCheckinModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [qr, setQr] = useState<string>("")

  useEffect(() => {
    if (!open) return
    QRCode.toDataURL(`PF-CHECKIN:${MEMBER.number}`, {
      margin: 1,
      width: 320,
      color: { dark: "#0b1220", light: "#ffffff" },
      errorCorrectionLevel: "H",
    })
      .then(setQr)
      .catch(() => setQr(""))
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center px-5">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="sf-animate-fade absolute inset-0 bg-black/65 backdrop-blur-md"
      />

      <div className="sf-animate-rise sf-chrome relative w-full max-w-[340px] overflow-hidden rounded-[2rem] p-5">
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close check-in"
          className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-muted-foreground active:scale-90"
        >
          <X className="size-4" />
        </button>

        <div className="pt-1 text-center">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-primary">Planet Fitness</p>
          <h2 className="mt-1 text-xl font-semibold tracking-tight text-foreground">Check-In Pass</h2>
        </div>

        {/* Membership card */}
        <div className="relative mt-4 overflow-hidden rounded-[1.5rem] border border-white/15 bg-[oklch(0.17_0.03_262)] p-5 shadow-[0_0_30px_-8px_var(--primary),inset_0_1px_0_0_rgba(255,255,255,0.08)]">
          <div className="pointer-events-none absolute -right-8 -top-10 size-32 rounded-full bg-primary/10 blur-2xl" />

          <div className="relative text-center">
            <p className="text-[1.0625rem] font-semibold tracking-tight text-foreground">{MEMBER.name}</p>
            <p className="mt-0.5 text-[0.75rem] text-muted-foreground">{MEMBER.date}</p>
          </div>

          {/* QR */}
          <div className="relative mx-auto mt-4 w-fit rounded-2xl bg-white p-3">
            {qr ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={qr || "/placeholder.svg"} alt="Membership QR code" className="size-40" />
            ) : (
              <div className="size-40 animate-pulse rounded bg-black/5" />
            )}
          </div>

          <p className="sf-num relative mt-3 text-center text-[0.8125rem] tracking-[0.3em] text-muted-foreground">
            {MEMBER.number}
          </p>

          <p className="relative mt-3 text-center text-[1.0625rem] font-semibold tracking-tight text-foreground">
            PF Black Card<span className="align-super text-[0.625rem]">®</span> Membership
          </p>
          <p className="relative mt-2 text-pretty text-center text-[0.75rem] leading-relaxed text-muted-foreground">
            Have an awesome workout, Yohan! You got this!
          </p>

          {/* Refer a friend */}
          <button
            type="button"
            className="relative mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[oklch(0.86_0.17_95)] py-3 text-[0.8125rem] font-semibold text-[oklch(0.2_0.03_262)] transition-transform active:scale-95"
          >
            <UserPlus className="size-4" />
            Refer a Friend
          </button>
        </div>

        <p className="mt-4 text-pretty text-center text-[0.8125rem] leading-relaxed text-muted-foreground">
          Hold this up to the scanner at the entrance.
        </p>

        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full rounded-full border border-white/10 bg-white/[0.05] py-3 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-foreground transition-transform active:scale-95"
        >
          Close
        </button>
      </div>
    </div>
  )
}
