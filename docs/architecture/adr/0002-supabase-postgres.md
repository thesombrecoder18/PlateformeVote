# ADR-0002 : Supabase + PostgreSQL

## Statut
Accepte - 2026-11-03

## Contexte

Besoin d une base de donnees avec :
- RLS (Row Level Security) pour l isolation multi-tenant
- Authentification integree (invitation-only)
- Storage prive pour documents
- Budget initial 0 FCFA

## Decision

Utiliser Supabase (PostgreSQL, Auth, Storage).

## Justification

- PostgreSQL avec RLS natif : isolation tenant robuste
- Auth integree : invitation, MFA TOTP, sessions
- Storage prive avec politiques d acces
- Supabase Free suffisant pour dev et demo
- CLI pour migrations versionnees et tests
- Types TypeScript generes depuis le schema

## Limites Supabase Free (a verifier periodiquement)

- 2 projets actifs maximum
- 500 MB par base de donnees
- 5 GB egress
- 1 GB storage
- Mise en pause apres une semaine d inactivite
- Pas de sauvegardes automatiques comme le plan payant

## Consequences

- Aucune donnee electorale reelle sur Supabase Free
- Adaptateur SSR isole dans src/lib/supabase/
- SERVICE_ROLE_KEY cote serveur uniquement
- Migrations SQL versionnees, pas de modifications manuelles
- Tests RLS obligatoires
