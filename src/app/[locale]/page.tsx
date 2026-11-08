import Link from "next/link"
import { getLocale, getTranslations } from "next-intl/server"
import { ConfigWarning } from "@/components/config-warning"
import { SandboxBanner } from "@/components/sandbox-banner"
import { DISPLAY_TIME_ZONE, formatDateTime, resolveLocale } from "@/lib/i18n/format"
import { readPublicSupabaseEnv } from "@/lib/supabase/env"

export default async function HomePage() {
  const t = await getTranslations("app")
  const locale = resolveLocale(await getLocale())
  const designHref = locale === "en" ? "/en/design" : "/fr/design"
  const now = new Date()
  const localClock = formatDateTime(now, locale)
  const hasSupabase = readPublicSupabaseEnv().configured

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-6 px-4 py-10">
      {!hasSupabase && <ConfigWarning />}
      <SandboxBanner />
      <h1 className="text-4xl font-semibold tracking-tight text-brand-night">{t("name")}</h1>
      <p className="text-lg leading-8 text-ink-muted">{t("tagline")}</p>
      <p className="text-sm leading-6 text-ink-muted">
        <time dateTime={now.toISOString()}>
          {t("localClock", { timeZone: DISPLAY_TIME_ZONE, value: localClock })}
        </time>
      </p>
      <Link
        href={designHref}
        className="inline-flex min-h-11 items-center self-start text-sm font-medium text-brand-teal underline underline-offset-4"
      >
        {t("designLink")}
      </Link>
    </main>
  )
}
