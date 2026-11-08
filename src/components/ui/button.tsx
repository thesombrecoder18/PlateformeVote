import type { ButtonHTMLAttributes } from "react"
import { cn } from "@/lib/cn"

const variants = {
  primary: "bg-brand-teal text-white hover:bg-brand-tealHover",
  secondary: "border border-control-border bg-white text-brand-night hover:bg-surface-base",
  ghost: "bg-transparent text-brand-night hover:bg-surface-base",
  danger: "bg-status-danger text-white hover:bg-status-dangerHover",
} as const

export type ButtonVariant = keyof typeof variants

export function buttonClassName({
  variant = "primary",
  className,
}: {
  variant?: ButtonVariant
  className?: string
} = {}) {
  return cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium disabled:cursor-not-allowed disabled:border-transparent disabled:bg-surface-border disabled:text-ink-muted",
    variants[variant],
    className,
  )
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
}

export function Button({ className, variant = "primary", type = "button", ...props }: ButtonProps) {
  return <button {...props} type={type} className={buttonClassName({ variant, className })} />
}
