import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { describe, expect, it } from "vitest"
import { contrastRatio } from "@/lib/design/contrast"
import { colors, contrastPairs, cssVariables } from "@/lib/design/tokens"

describe("design tokens", () => {
  it("meets the contrast floor for text and control boundaries", () => {
    for (const pair of contrastPairs) {
      expect(contrastRatio(pair.fg, pair.bg), pair.name).toBeGreaterThanOrEqual(pair.min)
    }
  })

  it("keeps the warm accent below text contrast on white", () => {
    expect(contrastRatio(colors.brand.accent, colors.white)).toBeLessThan(3)
  })

  it("keeps CSS variables aligned with the token source", () => {
    const css = readFileSync(resolve(process.cwd(), "src/styles/globals.css"), "utf8")
    for (const [name, hex] of Object.entries(cssVariables)) {
      expect(css).toContain(`${name}: ${hex};`)
    }
  })
})
