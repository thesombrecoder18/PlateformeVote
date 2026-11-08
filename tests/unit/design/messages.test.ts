import { describe, expect, it } from "vitest"
import en from "@/lib/i18n/messages/en.json"
import fr from "@/lib/i18n/messages/fr.json"

function keys(value: unknown, prefix = ""): string[] {
  if (typeof value !== "object" || value === null) return [prefix]
  return Object.entries(value).flatMap(([key, child]) => keys(child, prefix ? `${prefix}.${key}` : key))
}

describe("messages", () => {
  it("keeps French and English keys aligned", () => {
    expect(keys(fr).sort()).toEqual(keys(en).sort())
  })
})
