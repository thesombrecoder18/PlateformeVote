# NEXT_SESSION.md - Reprise pour n importe quel agent IA

## Prochaine action
Sprint S02 - Design system initial

## Lire dans cet ordre
1. AGENTS.md         <- regles, securite, commandes
2. STATUS.md                          <- etat reel du code
3. docs/roadmap/sprints/SPRINT-02.md      <- objectif sprint
4. docs/features/voter-experience/README.md  <- priorite UX

## Repo et etat
- GitHub : https://github.com/thesombrecoder18/PlateformeVote
- Branch : main
- Commit : 8f5eae0 fix(i18n): use static message loaders map
- pnpm dev : fonctionne sur /fr et /en sans erreur

## Fichiers source existants
src/app/[locale]/layout.tsx       layout Next.js + NextIntlClientProvider
src/app/[locale]/page.tsx         page accueil + banniere SANDBOX
src/components/config-warning.tsx composant alerte config manquante
src/lib/supabase/client.ts        createClient() pour Client Components
src/lib/supabase/server.ts        createServerSupabaseClient()
src/middleware.ts                  refresh session Supabase + routing i18n
src/i18n/request.ts                config next-intl loaders statiques FR/EN
src/lib/i18n/messages/fr.json     messages FR
src/lib/i18n/messages/en.json     messages EN
src/styles/globals.css            Tailwind + tokens CSS
tailwind.config.ts                tokens: brand.night, brand.teal, brand.accent

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
  pnpm build         doit passer

## Objectif S02
Creer src/components/ui/ :
- button.tsx   composant Button accessible
- input.tsx    composant Input accessible
- label.tsx    composant Label
- alert.tsx    composant Alert
- badge.tsx    composant Badge
Page demo : src/app/[locale]/design/page.tsx
Accessibilite WCAG 2.2 AA, FR/EN, build+lint+typecheck OK

## Conventions
- Server Components par defaut, use client si interaction
- Imports via @/ (src/)
- Pas de any TypeScript sans justification
- Commits : feat(design-system): description
- Aucune mention outil IA dans les commits
- Sandbox NON_PRODUCTION : pas de donnees reelles
