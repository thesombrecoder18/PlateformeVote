# START_HERE.md - Guide de demarrage rapide

## Ordre de lecture au debut de chaque session

1. AGENTS.md - regles canoniques
2. STATUS.md - etat actuel
3. NEXT_SESSION.md - prochaine action
4. docs/roadmap/sprints/SPRINT-XX.md - sprint actif
5. docs/features/<domaine>/README.md si pertinent

## Commandes de base (apres bootstrap Next.js)

  pnpm dev
  pnpm build
  pnpm lint
  pnpm typecheck
  pnpm test
  pnpm test:e2e
  supabase start
  supabase db test

## Regles importantes

- Ne pas lire tout le depot a chaque session
- Verifier tests + typecheck + lint avant commit
- Mettre a jour STATUS.md et NEXT_SESSION.md en fin de session
- Voir docs/ai/prompts/ pour les prompts de session
