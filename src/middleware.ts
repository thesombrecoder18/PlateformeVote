import { createServerClient } from "@supabase/ssr"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import createMiddleware from "next-intl/middleware"
import { routing } from "@/lib/i18n/routing"

const handleI18n = createMiddleware(routing)

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request })
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(c) {
          c.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options))
        },
      },
    },
  )
  await supabase.auth.getUser()
  return handleI18n(request)
}

export const config = {
  matcher: ["/((?!_next|_vercel|.*\\..*).*)"],
}
