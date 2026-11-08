# ROLLBACK.md - Runbook rollback

## Rollback application

1. Identifier le commit ou tag stable precedent
2. Deployer la version anterieure
3. Verifier que l application repond
4. Verifier les tests de smoke

## Rollback base de donnees

Attention : le rollback SQL peut causer une perte de donnees.
1. Evaluer l impact du rollback
2. Sauvegarder l etat actuel
3. Executer la migration inverse
4. Verifier l integrite

## Cas particulier : scrutin en cours

Un rollback pendant un scrutin ouvert necessite :
- Decision humaine habilitee
- Analyse d impact sur les bulletins
- Communication aux electeurs
- Audit complet de l operation

## Jamais

- Rollback sans sauvegarde prealable
- Rollback SQL d une table bulletins sans procedure electorale
