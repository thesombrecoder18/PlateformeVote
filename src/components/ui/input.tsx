import type { ComponentProps, ReactNode } from "react"
import { cn } from "@/lib/cn"

type InputProps = ComponentProps<"input"> & {
  invalid?: boolean
}

export function Input({ className, invalid, ...props }: InputProps) {
  return (
    <input
      {...props}
      aria-invalid={invalid ? true : undefined}
      className={cn(
        "min-h-11 w-full rounded-md border bg-white px-3 text-base text-brand-night placeholder:text-ink-muted disabled:cursor-not-allowed disabled:bg-surface-base",
        invalid ? "border-status-danger" : "border-control-border",
        className,
      )}
    />
  )
}

export function FieldHint({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="text-sm text-ink-muted">
      {children}
    </p>
  )
}

export function FieldError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="text-sm text-status-danger">
      {children}
    </p>
  )
}
