import { createBrowserClient } from "@supabase/ssr"
import type { Database } from "@/types/database"

// Compatibilite ANON_KEY (ancienne) et PUBLISHABLE_KEY (nouvelle nomenclature Supabase)
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? ""

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseAnonKey,
  )
}
