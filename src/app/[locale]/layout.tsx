import type { ReactNode } from "react"
import type { Locale } from "@/types"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import { Inter } from "next/font/google"
import { SkipLink } from "@/components/ui/skip-link"
import { DISPLAY_TIME_ZONE } from "@/lib/i18n/format"
import "@/styles/globals.css"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const messages = await getMessages()
  const t = await getTranslations("common")
  return (
    <html lang={locale}>
      <body className={`${inter.className} bg-surface-base text-brand-night antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages} timeZone={DISPLAY_TIME_ZONE}>
          <SkipLink href="#content">{t("skipToContent")}</SkipLink>
          <div id="content" tabIndex={-1}>
            {children}
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
