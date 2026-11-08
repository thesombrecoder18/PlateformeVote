import { describe, expect, it } from "vitest"
import {
  formatDate,
  formatDateTime,
  formatNumber,
  formatPercent,
  formatTime,
  resolveLocale,
} from "@/lib/i18n/format"

const instant = new Date("2026-11-08T18:30:00.000Z")

describe("locale formatting", () => {
  it("formats the same instant in French", () => {
    expect(formatDate(instant, "fr")).toBe("8 novembre 2026")
    expect(formatTime(instant, "fr")).toBe("18:30 UTC+0")
    expect(formatDateTime(instant, "fr")).toBe("8 novembre 2026 à 18:30 UTC+0")
  })

  it("formats the same instant in English", () => {
    expect(formatDate(instant, "en")).toBe("November 8, 2026")
    expect(formatTime(instant, "en")).toBe("06:30 PM GMT")
    expect(formatDateTime(instant, "en")).toBe("November 8, 2026 at 06:30 PM GMT")
  })

  it("formats numbers and percentages by locale", () => {
    expect(formatNumber(1234567.89, "fr")).toBe("1\u202f234\u202f567,89")
    expect(formatNumber(1234567.89, "en")).toBe("1,234,567.89")
    expect(formatPercent(0.125, "fr")).toBe("12,5\u00a0%")
    expect(formatPercent(0.125, "en")).toBe("12.5%")
  })

  it("falls back to French for an unknown locale", () => {
    expect(resolveLocale("en")).toBe("en")
    expect(resolveLocale("de")).toBe("fr")
  })
})
