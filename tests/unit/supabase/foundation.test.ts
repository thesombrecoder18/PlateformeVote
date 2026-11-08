import { readFileSync, readdirSync, statSync } from "node:fs"
import path from "node:path"
import { describe, expect, it } from "vitest"
import { readPublicSupabaseEnv, requirePublicSupabaseEnv } from "@/lib/supabase/env"

const root = process.cwd()

function read(relativePath: string) {
  return readFileSync(path.join(root, relativePath), "utf8")
}

function sourceFiles(directory: string): string[] {
  return readdirSync(directory).flatMap((entry) => {
    const fullPath = path.join(directory, entry)
    if (statSync(fullPath).isDirectory()) return sourceFiles(fullPath)
    return fullPath.endsWith(".ts") || fullPath.endsWith(".tsx") ? [fullPath] : []
  })
}

describe("public supabase env", () => {
  it("requires both the public url and the anon key", () => {
    expect(readPublicSupabaseEnv({}).configured).toBe(false)
    expect(
      readPublicSupabaseEnv({
        NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co",
        NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "anon",
      }).configured,
    ).toBe(true)
  })

  it("throws a message without secret values", () => {
    expect.assertions(2)
    try {
      requirePublicSupabaseEnv({
        NEXT_PUBLIC_SUPABASE_URL: "",
        SUPABASE_SERVICE_ROLE_KEY: "secret-value",
      })
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect((error as Error).message).toBe("Configuration Supabase publique manquante")
    }
  })
})

describe("supabase client boundary", () => {
  it("reads the service role key only from the admin client", () => {
    const offenders = sourceFiles(path.join(root, "src"))
      .filter((file) => readFileSync(file, "utf8").includes("SUPABASE_SERVICE_ROLE_KEY"))
      .map((file) => path.relative(root, file).replaceAll("\\", "/"))

    expect(offenders).toEqual(["src/lib/supabase/admin.ts"])
    expect(read("src/lib/supabase/admin.ts")).toContain('import "server-only"')
    expect(read("src/lib/supabase/client.ts")).not.toContain("SERVICE_ROLE")
    expect(read("src/middleware.ts")).not.toContain("SERVICE_ROLE")
  })

  it("keeps the service role key out of the example env name", () => {
    const example = read(".env.example")
    expect(example).toContain("SUPABASE_SERVICE_ROLE_KEY=")
    expect(example).not.toContain("NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY")
  })
})

describe("platform settings migration", () => {
  const migration = read("supabase/migrations/20261108194600_create_platform_settings.sql")
  const types = read("src/types/database.ts")

  it("locks the table with forced RLS and one deny policy per operation", () => {
    expect(migration).toContain("enable row level security")
    expect(migration).toContain("force row level security")
    expect(migration).toContain("revoke all on table public.platform_settings from anon")
    expect(migration).toContain("revoke all on table public.platform_settings from authenticated")
    expect(migration).toContain("for select")
    expect(migration).toContain("for insert")
    expect(migration).toContain("for update")
    expect(migration).toContain("for delete")
    expect(migration).toContain("using (false)")
    const tableDefinition = migration.slice(
      migration.indexOf("create table"),
      migration.indexOf(");") + 2,
    )
    expect(tableDefinition).not.toContain("tenant_id")
    expect(migration).toContain("sandbox_non_production")
  })

  it("mirrors the columns in the TypeScript types", () => {
    for (const column of ["key", "value", "updated_at"]) {
      expect(migration).toContain(column)
      expect(types).toContain(`${column}:`)
    }
    expect(types).toContain("platform_settings")
  })
})
