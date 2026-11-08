import { getRequestConfig } from "next-intl/server"
import { routing } from "@/lib/i18n/routing"

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale

  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    // notFound() non appele ici - laisse le middleware gerer
  }

  return {
    locale,
    messages: (await import("@/lib/i18n/messages/" + locale + ".json")).default,
  }
})
