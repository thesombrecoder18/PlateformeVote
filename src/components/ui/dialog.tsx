"use client"

import { useId, useRef, type ReactNode } from "react"
import { buttonClassName } from "@/components/ui/button"

export function Dialog({
  triggerLabel,
  title,
  description,
  closeLabel,
  children,
}: {
  triggerLabel: string
  title: string
  description?: string
  closeLabel: string
  children?: ReactNode
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const descriptionId = useId()

  return (
    <>
      <button
        type="button"
        className={buttonClassName({ variant: "secondary" })}
        onClick={() => dialogRef.current?.showModal()}
      >
        {triggerLabel}
      </button>
      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        className="m-auto w-[min(32rem,calc(100%-2rem))] max-h-[calc(100vh-2rem)] overflow-y-auto border border-control-border bg-white p-0 text-brand-night shadow-panel backdrop:bg-brand-night/40"
      >
        <div className="p-6">
          <h2 id={titleId} className="text-xl font-semibold">
            {title}
          </h2>
          {description ? (
            <p id={descriptionId} className="mt-2 text-sm leading-6 text-ink-muted">
              {description}
            </p>
          ) : null}
          {children}
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              className={buttonClassName()}
              onClick={() => dialogRef.current?.close()}
            >
              {closeLabel}
            </button>
          </div>
        </div>
      </dialog>
    </>
  )
}
