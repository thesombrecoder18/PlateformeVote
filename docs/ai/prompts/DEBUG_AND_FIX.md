# DEBUG_AND_FIX.md

## Pour diagnostiquer et corriger un bug

1. Reproduire le bug de facon deterministe
2. Identifier la couche concernee (UI, action, service, DB)
3. Lire le code concerne AVANT de le modifier
4. Formuler une hypothese sur la cause racine
5. Ecrire un test qui echoue (prouve le bug)
6. Corriger
7. Verifier que le test passe
8. Verifier qu aucune regression n est introduite

## Regles

- Ne pas masquer le probleme (try/catch silencieux)
- Ne pas corriger sans comprendre la cause
- Un fix sans test peut se regresser
- Si le bug touche la securite : suivre SECURITY_REVIEW.md

## Commandes utiles

  pnpm test -- --reporter=verbose
  pnpm typecheck
  supabase db test (si bug en base)
