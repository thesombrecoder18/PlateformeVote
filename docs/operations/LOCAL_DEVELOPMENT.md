# LOCAL_DEVELOPMENT.md

## Prerequis

- Node.js >= 18
- pnpm >= 8 : npm install -g pnpm
- Git
- Supabase CLI (optionnel, pour DB locale)

## Installation

  git clone <repo>
  cd PlateformeVote
  pnpm install
  cp .env.example .env.local
  # Remplir .env.local avec les cles Supabase
  pnpm dev

## Configuration Supabase (Option cloud gratuit)

1. Creer un projet sur app.supabase.com
2. Settings > API : recuperer URL et anon key
3. Remplir NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY
4. Remplir SUPABASE_SERVICE_ROLE_KEY (jamais cote client)

## Multi-tenant en local

Utiliser un parametre URL ou header controle.
Voir src/middleware.ts pour la configuration.

## Commandes

  pnpm dev
  pnpm build
  pnpm lint
  pnpm typecheck
  pnpm test
  pnpm test:e2e
  supabase start
  supabase db reset
  supabase test db
  supabase gen types typescript --local > src/types/database.ts
