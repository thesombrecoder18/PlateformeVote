import { useTranslations } from "next-intl"
import { ConfigWarning } from "@/components/config-warning"

export default function HomePage() {
  const t = useTranslations()
  const hasSupabase = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  return (
    <main className="min-h-screen bg-[#F5F7F8]">
      {!hasSupabase && <ConfigWarning />}
      <div className="container mx-auto px-4 py-16">
        <div className="mb-4 rounded border border-amber-300 bg-amber-50 p-3 text-sm font-medium text-amber-800">
          SANDBOX - NON_PRODUCTION
        </div>
        <h1 className="text-4xl font-bold text-[#14283F]">
          {t("app.name")}
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          {t("app.tagline")}
        </p>
      </div>
    </main>
  )
}
