export const colors = {
  white: "#FFFFFF",
  brand: {
    night: "#14283F",
    teal: "#176B66",
    tealHover: "#115650",
    accent: "#D49A43",
  },
  surface: {
    base: "#F5F7F8",
    border: "#DCE4EA",
  },
  ink: {
    muted: "#3E5166",
  },
  control: {
    border: "#6E8498",
  },
  status: {
    danger: "#8E1B1B",
    dangerHover: "#741616",
    dangerSurface: "#FDECEC",
    success: "#0E5C42",
    successSurface: "#E7F6EF",
    warning: "#6A4508",
    warningSurface: "#FFF8EB",
    info: "#176B66",
    infoSurface: "#E5F2F1",
  },
  focus: "#0C4A46",
} as const

/** Paires utilisees pour du texte ou un contour de controle. L accent chaud n y figure pas. */
export const contrastPairs = [
  { name: "night on surface", fg: colors.brand.night, bg: colors.surface.base, min: 4.5 },
  { name: "night on white", fg: colors.brand.night, bg: colors.white, min: 4.5 },
  { name: "white on teal", fg: colors.white, bg: colors.brand.teal, min: 4.5 },
  { name: "white on teal hover", fg: colors.white, bg: colors.brand.tealHover, min: 4.5 },
  { name: "teal on surface", fg: colors.brand.teal, bg: colors.surface.base, min: 4.5 },
  { name: "teal on white", fg: colors.brand.teal, bg: colors.white, min: 4.5 },
  { name: "teal hover on surface", fg: colors.brand.tealHover, bg: colors.surface.base, min: 4.5 },
  { name: "teal hover on white", fg: colors.brand.tealHover, bg: colors.white, min: 4.5 },
  { name: "muted on surface", fg: colors.ink.muted, bg: colors.surface.base, min: 4.5 },
  { name: "muted on white", fg: colors.ink.muted, bg: colors.white, min: 4.5 },
  { name: "white on danger", fg: colors.white, bg: colors.status.danger, min: 4.5 },
  { name: "white on danger hover", fg: colors.white, bg: colors.status.dangerHover, min: 4.5 },
  {
    name: "danger on danger surface",
    fg: colors.status.danger,
    bg: colors.status.dangerSurface,
    min: 4.5,
  },
  {
    name: "success on success surface",
    fg: colors.status.success,
    bg: colors.status.successSurface,
    min: 4.5,
  },
  {
    name: "warning on warning surface",
    fg: colors.status.warning,
    bg: colors.status.warningSurface,
    min: 4.5,
  },
  { name: "info on info surface", fg: colors.status.info, bg: colors.status.infoSurface, min: 4.5 },
  { name: "accent on night", fg: colors.brand.accent, bg: colors.brand.night, min: 4.5 },
  { name: "focus on white", fg: colors.focus, bg: colors.white, min: 3 },
  { name: "control border on white", fg: colors.control.border, bg: colors.white, min: 3 },
  { name: "control border on surface", fg: colors.control.border, bg: colors.surface.base, min: 3 },
] as const

export const cssVariables: Record<string, string> = {
  "--color-brand-night": colors.brand.night,
  "--color-brand-teal": colors.brand.teal,
  "--color-brand-teal-hover": colors.brand.tealHover,
  "--color-accent": colors.brand.accent,
  "--color-surface-base": colors.surface.base,
  "--color-surface-border": colors.surface.border,
  "--color-ink-muted": colors.ink.muted,
  "--color-control-border": colors.control.border,
  "--color-status-danger": colors.status.danger,
  "--color-status-success": colors.status.success,
  "--color-status-warning": colors.status.warning,
  "--color-focus": colors.focus,
}
