import type { ReactNode } from "react"
import type { Locale } from "@/types"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { Inter } from "next/font/google"
import "@/styles/globals.css"

const inter = Inter({ subsets: ["latin"] })

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const messages = await getMessages()
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
