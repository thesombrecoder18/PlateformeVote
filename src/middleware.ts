import { createServerClient } from "@supabase/ssr"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import createMiddleware from "next-intl/middleware"
import { routing } from "@/lib/i18n/routing"
import { readPublicSupabaseEnv } from "@/lib/supabase/env"
import type { Database } from "@/types/database"

const handleI18n = createMiddleware(routing)

export async function middleware(request: NextRequest) {
  const { url, anonKey, configured } = readPublicSupabaseEnv()
  const pendingCookies: Array<{
    name: string
    value: string
    options?: Parameters<NextResponse["cookies"]["set"]>[2]
  }> = []

  if (configured) {
    const supabase = createServerClient<Database>(url, anonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          pendingCookies.splice(0, pendingCookies.length, ...cookiesToSet)
        },
      },
    })

    try {
      await supabase.auth.getUser()
    } catch {
      // La page publique reste servie. Le detail reseau n est pas renvoye au navigateur.
    }
  }

  const response = handleI18n(request)
  pendingCookies.forEach(({ name, value, options }) => {
    response.cookies.set(name, value, options)
  })
  return response
}

export const config = {
  matcher: ["/((?!_next|_vercel|.*\\..*).*)"],
}
