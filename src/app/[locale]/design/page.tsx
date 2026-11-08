import type { ReactNode } from "react"
import Link from "next/link"
import { getLocale, getTranslations } from "next-intl/server"
import { SandboxBanner } from "@/components/sandbox-banner"
import { Alert } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog } from "@/components/ui/dialog"
import { Field } from "@/components/ui/field"
import { Nav } from "@/components/ui/nav"
import { DataTable, type TableRow } from "@/components/ui/table"
import {
  DISPLAY_TIME_ZONE,
  formatDate,
  formatDateTime,
  formatNumber,
  formatPercent,
  formatTime,
  resolveLocale,
} from "@/lib/i18n/format"

type DesignRow = {
  id: string
  state: string
  usage: string
}

const SAMPLE_INSTANT = new Date("2026-11-08T18:30:00.000Z")
const SAMPLE_QUANTITY = 1_234_567.89
const SAMPLE_RATIO = 0.125

function readRows(value: unknown): DesignRow[] {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return []
  return Object.entries(value).flatMap(([id, row]) => {
    if (
      typeof row === "object" &&
      row !== null &&
      "state" in row &&
      "usage" in row &&
      typeof row.state === "string" &&
      typeof row.usage === "string"
    ) {
      return [{ id, state: row.state, usage: row.usage }]
    }
    return []
  })
}

export default async function DesignPage() {
  const t = await getTranslations("design")
  const app = await getTranslations("app")
  const common = await getTranslations("common")
  const locale = resolveLocale(await getLocale())
  const homeHref = locale === "en" ? "/en" : "/fr"
  const languageHref = locale === "en" ? "/fr/design" : "/en/design"
  const rows: TableRow[] = readRows(t.raw("table.rows"))

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-12 px-4 py-10">
      <SandboxBanner />
      <header className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-medium text-ink-muted">{app("name")}</p>
          <div className="flex flex-wrap gap-4">
            <Link
              href={homeHref}
              className="inline-flex min-h-11 items-center text-sm font-medium text-brand-night underline underline-offset-4"
            >
              {common("back")}
            </Link>
            <Link
              href={languageHref}
              hrefLang={locale === "en" ? "fr" : "en"}
              className="inline-flex min-h-11 items-center text-sm font-medium text-brand-night underline underline-offset-4"
            >
              {t("language")}
            </Link>
          </div>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">{t("title")}</h1>
        <p className="max-w-2xl text-base leading-7">{t("intro")}</p>
        <Nav
          label={t("navLabel")}
          items={[
            { href: "#type", label: t("sections.type") },
            { href: "#formats", label: t("sections.formats") },
            { href: "#color", label: t("sections.color") },
            { href: "#buttons", label: t("sections.buttons") },
            { href: "#fields", label: t("sections.fields") },
            { href: "#alerts", label: t("sections.alerts") },
            { href: "#badges", label: t("sections.badges") },
            { href: "#dialog", label: t("sections.dialog") },
            { href: "#table", label: t("sections.table") },
          ]}
        />
      </header>

      <section id="type" className="flex scroll-mt-6 flex-col gap-3">
        <h2 className="text-xl font-semibold">{t("sections.type")}</h2>
        <p className="text-base leading-7">{t("typeSample")}</p>
        <p className="text-sm leading-6 text-ink-muted">{t("typeMuted")}</p>
      </section>

      <section id="formats" className="flex scroll-mt-6 flex-col gap-4">
        <h2 className="text-xl font-semibold">{t("sections.formats")}</h2>
        <p className="text-sm leading-6 text-ink-muted">
          {t("formats.intro", { timeZone: DISPLAY_TIME_ZONE })}
        </p>
        <dl className="grid gap-3 sm:grid-cols-2">
          <FormatItem label={t("formats.date")}>
            <time dateTime={SAMPLE_INSTANT.toISOString()}>{formatDate(SAMPLE_INSTANT, locale)}</time>
          </FormatItem>
          <FormatItem label={t("formats.time")}>
            <time dateTime={SAMPLE_INSTANT.toISOString()}>{formatTime(SAMPLE_INSTANT, locale)}</time>
          </FormatItem>
          <FormatItem label={t("formats.dateTime")}>
            <time dateTime={SAMPLE_INSTANT.toISOString()}>{formatDateTime(SAMPLE_INSTANT, locale)}</time>
          </FormatItem>
          <FormatItem label={t("formats.number")}>{formatNumber(SAMPLE_QUANTITY, locale)}</FormatItem>
          <FormatItem label={t("formats.percent")}>{formatPercent(SAMPLE_RATIO, locale)}</FormatItem>
        </dl>
      </section>

      <section id="color" className="flex scroll-mt-6 flex-col gap-4">
        <h2 className="text-xl font-semibold">{t("sections.color")}</h2>
        <ul className="flex flex-col gap-3">
          <Swatch className="bg-brand-night" label={t("swatches.night")} />
          <Swatch className="bg-brand-teal" label={t("swatches.teal")} />
          <Swatch className="bg-brand-accent" label={t("swatches.accent")} />
          <Swatch className="border border-control-border bg-surface-base" label={t("swatches.surface")} />
          <Swatch className="bg-surface-border" label={t("swatches.divider")} />
          <Swatch className="bg-control-border" label={t("swatches.control")} />
        </ul>
        <p className="bg-brand-night px-4 py-3 text-sm font-medium text-brand-accent">
          {t("accentOnNight")}
        </p>
      </section>

      <section id="buttons" className="flex scroll-mt-6 flex-col gap-4">
        <h2 className="text-xl font-semibold">{t("sections.buttons")}</h2>
        <p className="text-sm leading-6 text-ink-muted">{t("buttonsHint")}</p>
        <div className="flex flex-wrap gap-3">
          <Button>{common("save")}</Button>
          <Button variant="secondary">{common("cancel")}</Button>
          <Button variant="ghost">{common("back")}</Button>
          <Button variant="danger">{common("confirm")}</Button>
          <Button disabled>{t("disabled")}</Button>
        </div>
      </section>

      <section id="fields" className="flex scroll-mt-6 flex-col gap-4">
        <h2 className="text-xl font-semibold">{t("sections.fields")}</h2>
        <Field
          id="demo-name"
          name="demo-name"
          label={t("fields.name")}
          hint={t("fields.nameHint")}
          autoComplete="off"
        />
        <Field
          id="demo-reference"
          name="demo-reference"
          label={t("fields.reference")}
          error={t("fields.referenceError")}
          autoComplete="off"
        />
      </section>

      <section id="alerts" className="flex scroll-mt-6 flex-col gap-3">
        <h2 className="text-xl font-semibold">{t("sections.alerts")}</h2>
        <Alert variant="info" title={t("alerts.infoTitle")}>
          {t("alerts.infoBody")}
        </Alert>
        <Alert variant="warning" title={t("alerts.warningTitle")}>
          {t("alerts.warningBody")}
        </Alert>
        <Alert variant="success" title={t("alerts.successTitle")}>
          {t("alerts.successBody")}
        </Alert>
        <Alert variant="danger" title={t("alerts.dangerTitle")}>
          {t("alerts.dangerBody")}
        </Alert>
      </section>

      <section id="badges" className="flex scroll-mt-6 flex-col gap-4">
        <h2 className="text-xl font-semibold">{t("sections.badges")}</h2>
        <ul className="flex flex-wrap gap-2">
          <li>
            <Badge>{t("badges.neutral")}</Badge>
          </li>
          <li>
            <Badge variant="info">{t("badges.info")}</Badge>
          </li>
          <li>
            <Badge variant="success">{t("badges.success")}</Badge>
          </li>
          <li>
            <Badge variant="warning">{t("badges.warning")}</Badge>
          </li>
          <li>
            <Badge variant="danger">{t("badges.danger")}</Badge>
          </li>
        </ul>
      </section>

      <section id="dialog" className="flex scroll-mt-6 flex-col gap-4">
        <h2 className="text-xl font-semibold">{t("sections.dialog")}</h2>
        <Dialog
          triggerLabel={t("dialog.open")}
          title={t("dialog.title")}
          description={t("dialog.description")}
          closeLabel={t("dialog.close")}
        />
      </section>

      <section id="table" className="flex scroll-mt-6 flex-col gap-8">
        <h2 className="text-xl font-semibold">{t("sections.table")}</h2>
        <DataTable
          id="interface-states"
          caption={t("table.caption")}
          columns={[
            { key: "state", header: t("table.columns.state") },
            { key: "usage", header: t("table.columns.usage") },
          ]}
          rows={rows}
          emptyLabel={t("table.empty")}
        />
        <DataTable
          id="empty-states"
          caption={t("table.emptyCaption")}
          columns={[
            { key: "state", header: t("table.columns.state") },
            { key: "usage", header: t("table.columns.usage") },
          ]}
          rows={[]}
          emptyLabel={t("table.empty")}
        />
      </section>
    </main>
  )
}

function FormatItem({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="text-sm font-medium text-ink-muted">{label}</dt>
      <dd className="text-base leading-7">{children}</dd>
    </div>
  )
}

function Swatch({ className, label }: { className: string; label: string }) {
  return (
    <li className="flex items-center gap-3">
      <span className={`h-10 w-10 shrink-0 ${className}`} aria-hidden="true" />
      <span className="text-sm leading-6">{label}</span>
    </li>
  )
}
