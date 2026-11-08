import type { Config } from "tailwindcss"
import { colors } from "./src/lib/design/tokens"

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          night: colors.brand.night,
          teal: colors.brand.teal,
          tealHover: colors.brand.tealHover,
          accent: colors.brand.accent,
        },
        surface: {
          base: colors.surface.base,
          border: colors.surface.border,
        },
        ink: {
          muted: colors.ink.muted,
        },
        control: {
          border: colors.control.border,
        },
        status: {
          danger: colors.status.danger,
          dangerHover: colors.status.dangerHover,
          dangerSurface: colors.status.dangerSurface,
          success: colors.status.success,
          successSurface: colors.status.successSurface,
          warning: colors.status.warning,
          warningSurface: colors.status.warningSurface,
          info: colors.status.info,
          infoSurface: colors.status.infoSurface,
        },
        focus: colors.focus,
      },
      boxShadow: {
        panel: "0 1px 2px rgb(20 40 63 / 0.06)",
      },
    },
  },
  plugins: [],
}

export default config
