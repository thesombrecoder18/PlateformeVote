# NEXT_SESSION.md - Reprise pour n importe quel agent IA

## Prochaine action
Sprint S04 - Architecture Supabase et migrations

S03 est termine : dates, heures, nombres et pourcentages suivent la locale.
Ne pas refaire le routage ni les dictionnaires.
Definir les criteres dans docs/roadmap/sprints/SPRINT-04.md avant d etendre le perimetre.

## Lire dans cet ordre
1. AGENTS.md
2. STATUS.md
3. docs/roadmap/sprints/SPRINT-04.md
4. docs/architecture/adr/0002-supabase-postgres.md

## Repo et etat
- GitHub : https://github.com/thesombrecoder18/PlateformeVote
- Branch : main
- Dernier commit : f898552 docs(session): update reprise files for any agent handoff
- S02 et S03 sont implementes dans le working tree et ne sont pas encore commites
- pnpm dev : /fr, /en, /fr/design, /en/design

## Fichiers source utiles
src/lib/i18n/format.ts            dates, heures, nombres, pourcentages
src/lib/i18n/routing.ts           locales fr, en
src/i18n/request.ts               messages + fuseau Africa/Dakar
src/lib/supabase/client.ts        client navigateur
src/lib/supabase/server.ts        client serveur
src/types/database.ts             placeholder, a remplacer par les types generes

## Variables .env.local (ne pas committer)
NEXT_PUBLIC_SUPABASE_URL         rempli
NEXT_PUBLIC_SUPABASE_ANON_KEY    rempli
SUPABASE_SERVICE_ROLE_KEY        rempli
SUPABASE_JWT_SECRET              rempli
GMAIL_CLIENT_ID                  rempli (utilise a S29)
SESSION_SECRET                   vide - requis au S07

## Commandes avant tout travail
  pnpm install       si node_modules absent
  pnpm typecheck     doit passer zero erreur
  pnpm lint          doit passer zero erreur
  pnpm test          doit passer
  pnpm build         doit passer

## Objectif S04
- Definir les criteres dans SPRINT-04.md avant implementation
- Connexion Supabase, types generes, premiere migration, tests RLS
- RLS activee sur toute table exposee
- SERVICE_ROLE_KEY cote serveur uniquement
- Aucune donnee electorale reelle

## Conventions
- Server Components par defaut, use client si interaction
- Imports via @/ (src/)
- Pas de any TypeScript sans justification
- Commits : feat(db): description
- Aucune mention outil IA dans les commits
- Sandbox NON_PRODUCTION : pas de donnees reelles
- Ne pas pousser sur remote sans instruction explicite
