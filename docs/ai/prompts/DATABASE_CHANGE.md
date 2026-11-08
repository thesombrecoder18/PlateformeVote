# DATABASE_CHANGE.md

## Pour toute modification de base de donnees

1. Creer la migration dans supabase/migrations/
   Nom : YYYYMMDDHHMMSS_description_au_passe.sql
2. Inclure la migration inverse si possible
3. Ajouter les politiques RLS (une policy par operation)
4. Definir les grants/revokes explicitement
5. Creer des tests dans supabase/tests/
6. Regenerer les types TypeScript

## Tests obligatoires

Pour chaque table :
- SELECT autorise (bon tenant, bon role)
- SELECT refuse (mauvais tenant, anon)
- INSERT autorise
- INSERT refuse (mauvais tenant)
- UPDATE autorise
- UPDATE refuse
- DELETE selon politique

## Commandes

  supabase db diff
  supabase migration new <nom>
  supabase db reset
  supabase db test
  supabase gen types typescript --local > src/types/database.ts

## Regles absolues

- Jamais de modification manuelle en base partagee
- RLS activee sur toute table exposee
- SERVICE_ROLE_KEY jamais cote client
