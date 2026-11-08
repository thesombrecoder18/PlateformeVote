# EXECUTE_SPRINT.md

## Pour executer un sprint complet

1. Lire docs/roadmap/sprints/SPRINT-XX.md
2. Verifier les dependances (sprints precedents termines)
3. Lire les feature docs concernees
4. Etablir les criteres d acceptation testables
5. Impl�menter par tranches verticales (pas tout d un coup)
6. Tester a chaque livrable
7. Mettre a jour le sprint doc au fur et a mesure

## Definition du termine

Voir AGENTS.md section DoD. Un sprint ne se ferme pas sans :
- Tests passes (unit, integration, RLS)
- TypeScript zero erreur
- FR/EN complet
- Accessibilite verifiee
- STATUS.md mis a jour

## Ordre des livrables

Base de donnees (migration + RLS + tests) avant UI.
UI avec etats loading/error/empty/success.
Actions serveur avec validation complete avant Client Components.
