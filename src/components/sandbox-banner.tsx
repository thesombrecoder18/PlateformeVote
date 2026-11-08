import { getTranslations } from "next-intl/server"
import { Alert } from "@/components/ui/alert"

export async function SandboxBanner() {
  const t = await getTranslations("app")
  return (
    <Alert variant="warning" title={t("sandbox")}>
      {t("sandboxDetail")}
    </Alert>
  )
}
