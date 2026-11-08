"use client"
import { useTranslations } from "next-intl"

export function ConfigWarning() {
  const t = useTranslations("config")
  return (
    <div role="alert" className="border border-red-300 bg-red-50 p-4 text-sm text-red-800">
      <strong>{t("missing")}</strong>
      <p className="mt-1">{t("instructions")}</p>
    </div>
  )
}
