import type { ReactNode } from "react"
import { cn } from "@/lib/cn"

const variants = {
  neutral: "border-control-border bg-surface-base text-brand-night",
  info: "border-status-info bg-status-infoSurface text-status-info",
  success: "border-status-success bg-status-successSurface text-status-success",
  warning: "border-status-warning bg-status-warningSurface text-status-warning",
  danger: "border-status-danger bg-status-dangerSurface text-status-danger",
} as const

export type BadgeVariant = keyof typeof variants

export function Badge({
  variant = "neutral",
  children,
}: {
  variant?: BadgeVariant
  children: ReactNode
}) {
  return (
    <span
      className={cn(
        "inline-flex min-h-8 items-center rounded-md border px-2 py-1 text-sm font-medium",
        variants[variant],
      )}
    >
      {children}
    </span>
  )
}
