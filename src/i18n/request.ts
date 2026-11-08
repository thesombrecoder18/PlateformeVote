import { getRequestConfig } from "next-intl/server"
import type { AbstractIntlMessages } from "next-intl"
import { DISPLAY_TIME_ZONE } from "@/lib/i18n/format"
import { routing } from "@/lib/i18n/routing"

const messageLoaders = {
  fr: () => import("@/lib/i18n/messages/fr.json"),
  en: () => import("@/lib/i18n/messages/en.json"),
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale = routing.locales.includes(requested as typeof routing.locales[number])
    ? (requested as typeof routing.locales[number])
    : routing.defaultLocale

  const mod = await messageLoaders[locale]()

  return {
    locale,
    messages: mod.default as AbstractIntlMessages,
    timeZone: DISPLAY_TIME_ZONE,
  }
})
