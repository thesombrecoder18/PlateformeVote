import type { ReactNode } from "react"
import { cn } from "@/lib/cn"

const variants = {
  info: "border-status-info bg-status-infoSurface text-status-info",
  success: "border-status-success bg-status-successSurface text-status-success",
  warning: "border-status-warning bg-status-warningSurface text-status-warning",
  danger: "border-status-danger bg-status-dangerSurface text-status-danger",
} as const

export type AlertVariant = keyof typeof variants

export function Alert({
  variant = "info",
  title,
  children,
}: {
  variant?: AlertVariant
  title: string
  children?: ReactNode
}) {
  const role = variant === "danger" || variant === "warning" ? "alert" : "status"

  return (
    <div role={role} className={cn("border p-4 text-sm", variants[variant])}>
      <p className="font-semibold">{title}</p>
      {children ? <div className="mt-1">{children}</div> : null}
    </div>
  )
}
