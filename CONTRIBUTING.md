# CONTRIBUTING.md

## Branches

- main : branche protegee, code verifie
- dev : integration continue
- feat/<scope>-<slug> : nouvelle fonctionnalite
- fix/<scope>-<slug> : correction de bug
- docs/<slug> : documentation
- security/<slug> : correction securite

## Commits

Conventional Commits : type(scope): resume imperatif

Types : feat, fix, refactor, perf, test, docs, build, ci, chore, security, revert

Exemples :
  feat(auth): add invitation-based activation
  fix(tenants): enforce org scope on queries
  security(db): add tenant isolation policies
  test(voting): cover duplicate submission
  docs(roadmap): define election lifecycle

Aucune mention d outil IA dans les commits.

## Tests

- Lancer pnpm test avant tout PR
- Lancer pnpm typecheck et pnpm lint
- Tests de refus et acces interdit obligatoires

## Migrations

- Creer dans supabase/migrations/
- Nommer : YYYYMMDDHHMMSS_description.sql
- Inclure la migration inverse si possible
- Tester RLS avec supabase db test

## Review

- Code revu par au moins 1 personne
- Aucun merge si les tests ne passent pas
- Mettre a jour STATUS.md et feature doc apres merge
