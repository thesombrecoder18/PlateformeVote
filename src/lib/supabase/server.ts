import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import type { Database } from "@/types/database"
import { requirePublicSupabaseEnv } from "@/lib/supabase/env"

export async function createServerSupabaseClient() {
  const { url, anonKey } = requirePublicSupabaseEnv()
  const cookieStore = await cookies()

  return createServerClient<Database>(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // Un Server Component ne peut pas ecrire les cookies. Le middleware s en charge.
        }
      },
    },
  })
}
