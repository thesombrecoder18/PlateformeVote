export type PublicSupabaseEnv = {
  url: string
  anonKey: string
  configured: boolean
}

type EnvSource = Record<string, string | undefined>

export function readPublicSupabaseEnv(source: EnvSource = process.env): PublicSupabaseEnv {
  const url = source.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? ""
  const anonKey = (
    source.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    source.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    ""
  ).trim()

  return {
    url,
    anonKey,
    configured: url.length > 0 && anonKey.length > 0,
  }
}

export function requirePublicSupabaseEnv(source?: EnvSource): PublicSupabaseEnv {
  const env = readPublicSupabaseEnv(source)
  if (!env.configured) {
    throw new Error("Configuration Supabase publique manquante")
  }
  return env
}
