# RESUME_PROJECT.md

## Pour reprendre apres un changement d agent ou de conversation

1. Lire AGENTS.md - regles et commandes
2. Lire STATUS.md - ou en est le projet
3. Lire NEXT_SESSION.md - que faire maintenant
4. Lire docs/roadmap/sprints/<sprint>.md - details du sprint
5. Inspecter le code concerne : git diff HEAD~1, git log --oneline -5

## Ne pas

- Reconstruire ce qui existe deja
- Se fier a la memoire conversationnelle
- Changer l architecture sans lire les ADR

## Verification rapide

  pnpm typecheck
  pnpm lint
  pnpm test
