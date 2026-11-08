# S01 - Bootstrap Next.js et outillage
## Phase: A
## Statut: DONE
## Dependances: S00

## Objectif
Creer la base Next.js App Router avec TypeScript strict, Tailwind et pnpm.

## Livrables
- [ ] Next.js App Router initialise (version stable)
- [ ] TypeScript strict (strict: true)
- [ ] Tailwind CSS
- [ ] ESLint + Prettier
- [ ] Scripts : dev, build, lint, typecheck, test, test:e2e
- [ ] Structure src/app/[locale]/, components/, features/, lib/, styles/, types/
- [ ] 14 sous-dossiers features/ (auth, tenants, elections...)
- [ ] Adaptateurs Supabase : src/lib/supabase/client.ts, server.ts
- [ ] .env.example + .gitignore mis a jour
- [ ] Page etat config si Supabase absent
- [ ] Vitest + Playwright configures
- [ ] Build propre

## Criteres d acceptation
- pnpm dev demarre
- pnpm build passe
- pnpm typecheck zero erreur
- pnpm lint zero erreur
- Aucun secret dans le bundle client
- Page config si .env.local absent
- /fr et /en accessibles
