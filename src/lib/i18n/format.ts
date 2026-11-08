import type { Locale } from "@/types"
import { routing } from "@/lib/i18n/routing"

/** Fuseau d'affichage tant qu'aucune préférence d'organisation n'existe. */
export const DISPLAY_TIME_ZONE = "Africa/Dakar"

const DATE: Intl.DateTimeFormatOptions = {
  timeZone: DISPLAY_TIME_ZONE,
  day: "numeric",
  month: "long",
  year: "numeric",
}

const TIME: Intl.DateTimeFormatOptions = {
  timeZone: DISPLAY_TIME_ZONE,
  hour: "2-digit",
  minute: "2-digit",
  timeZoneName: "short",
}

const DATE_TIME: Intl.DateTimeFormatOptions = {
  timeZone: DISPLAY_TIME_ZONE,
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZoneName: "short",
}

export function isLocale(value: string): value is Locale {
  return (routing.locales as readonly string[]).includes(value)
}

export function resolveLocale(value: string): Locale {
  return isLocale(value) ? value : routing.defaultLocale
}

export function formatDate(value: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, DATE).format(value)
}

export function formatTime(value: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, TIME).format(value)
}

export function formatDateTime(value: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, DATE_TIME).format(value)
}

export function formatNumber(value: number, locale: Locale): string {
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(value)
}

/** `ratio` est une part entre 0 et 1, par exemple 0,125 pour 12,5 %. */
export function formatPercent(ratio: number, locale: Locale): string {
  return new Intl.NumberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 1,
  }).format(ratio)
}
