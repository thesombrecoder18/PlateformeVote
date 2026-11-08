# Conventions SQL

Reference pour toute migration a partir de S04. La migration versionnee reste la source de verite du schema.

## Fichiers

- Migration : `supabase/migrations/YYYYMMDDHHMMSS_verbe_objet.sql`
- Inverse : `supabase/rollbacks/` avec le meme nom de fichier
- Tests : `supabase/tests/*.sql` (pgTAP), lances par `supabase test db`
- Donnees de demonstration : uniquement synthetiques, jamais de donnees electorales reelles

## Nommage

- snake_case pour tables, colonnes, fonctions, policies
- Une table, un sujet
- Cle primaire metier : `id uuid primary key default gen_random_uuid()`
- Temps : `timestamptz`, colonnes `created_at` et `updated_at`
- `updated_at` est maintenu par `public.touch_updated_at()`

## Tenant

- Toute table metier porte `tenant_id uuid not null` (ADR-0003)
- Une table sans `tenant_id` est une table plateforme globale, nommee dans la migration
- `platform_settings` est la premiere table plateforme globale

## Privileges et RLS

- `enable row level security` et `force row level security` sur chaque table exposee
- `revoke all` pour `public`, `anon` et `authenticated`, puis `grant` explicite
- Une policy par operation : SELECT, INSERT, UPDATE, DELETE
- Les fonctions fixent `search_path` et ne sont pas `security definer` sans revue
- `execute` retire a `public`, `anon` et `authenticated` sauf besoin explicite

## Types applicatifs

Regenerer apres chaque migration locale :

```text
supabase gen types typescript --local > src/types/database.ts
```

Tant que la CLI locale n est pas disponible, `src/types/database.ts` est tenu a la main et doit citer les memes colonnes que la migration.
