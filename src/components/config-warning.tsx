import { getTranslations } from "next-intl/server"
import { Alert } from "@/components/ui/alert"

export async function ConfigWarning() {
  const t = await getTranslations("config")
  return (
    <Alert variant="danger" title={t("missing")}>
      {t("instructions")}
    </Alert>
  )
}
