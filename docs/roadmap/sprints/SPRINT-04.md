# S04 - Architecture Supabase et migrations

## Phase: A
## Statut: IN PROGRESS
## Objectif
Connexion client/serveur separee, premiere migration versionnee, types et tests RLS
## Dependances: S01
## Livrables
- [x] Conventions SQL documentees
- [x] Migration initiale `platform_settings` (table plateforme, sans tenant)
- [x] RLS forcee, grants explicites, une policy par operation
- [x] Migration inverse
- [x] Test pgTAP ecrit, pas encore execute (CLI et Docker absents)
- [x] Test statique de la migration
- [x] Types TypeScript alignes sur la migration
- [x] Client navigateur, client session serveur, client admin serveur
- [x] Cle service role absente du code navigateur et du bundle client
## Criteres d acceptation
- [x] Le navigateur ne recoit que l URL publique et la cle anon
- [x] `SUPABASE_SERVICE_ROLE_KEY` n est lue que dans le client admin serveur
- [x] Sans URL ou cle anon, les pages publiques restent servies et l accueil affiche l alerte de configuration
- [x] `platform_settings` est en RLS forcee dans la migration
- [x] `anon` et `authenticated` n ont aucun privilege dans la migration
- [x] Une policy de refus existe pour SELECT, INSERT, UPDATE et DELETE
- [x] La seule donnee inseree est le marqueur synthetique `sandbox_non_production`
- [x] Aucune table d organisation, de membre ou de scrutin dans cette migration
- [x] typecheck, lint, tests et build passent
- [ ] `supabase test db` execute sur une base locale
## Hors perimetre
- Tables organisation, slug, domaines : S05
- Tests d isolation entre tenants : S06
- Authentification invitation-only : S07
- Application de la migration sur le projet Supabase distant, sans instruction explicite
## Verification de cette session
- pnpm typecheck, pnpm lint, pnpm test (20 tests), pnpm build : passent
- Bundle client `.next/static` : aucune occurrence de la cle service role
- Pages /fr, /en, /fr/design : HTTP 200, banniere sandbox, pas d alerte de configuration manquante
- Supabase CLI et Docker : absents de la machine, pgTAP non execute
