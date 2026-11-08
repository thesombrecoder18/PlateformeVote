import type { ComponentProps } from "react"
import { FieldError, FieldHint, Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type FieldProps = {
  id: string
  label: string
  hint?: string
  error?: string
} & Omit<ComponentProps<"input">, "id" | "aria-invalid" | "aria-describedby">

export function Field({ id, label, hint, error, ...props }: FieldProps) {
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined

  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input {...props} id={id} invalid={Boolean(error)} aria-describedby={describedBy} />
      {hint && hintId ? <FieldHint id={hintId}>{hint}</FieldHint> : null}
      {error && errorId ? <FieldError id={errorId}>{error}</FieldError> : null}
    </div>
  )
}
