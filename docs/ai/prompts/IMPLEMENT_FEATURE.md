# IMPLEMENT_FEATURE.md

## Pour implementer une feature verticalement

1. Lire docs/features/<slug>/README.md
2. Verifier les ADR pertinents
3. Schema SQL + migration + RLS + tests d acces
4. Types TypeScript generes ou definis
5. Service/queries (pas de logique metier dans les composants)
6. Schemas Zod pour validation
7. Actions serveur (auth + tenant + permission + etat)
8. UI Server Component
9. Client Component uniquement si interaction requise
10. Tests (unit + integration + E2E du parcours)

## Checklist securite

- Validation cote serveur (pas seulement client)
- Verification tenant avant toute mutation
- Jamais de secret dans les logs ou reponses API
- RLS testee par tenant (autorise ET refuse)
