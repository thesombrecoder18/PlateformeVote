# INCIDENT.md - Runbook incident

## Detection

- Monitoring alerte : P0/P1/P2/P3
- Signalement utilisateur
- Detection anomalie interne

## Isolation

- Suspendre le scrutin si integrite menacee (decision humaine habilitee)
- Aucune prolongation automatique en cas de panne
- Notifier les parties concernees

## Evaluation

- Determiner impact et portee
- Identifier la cause racine
- Estimer le temps de correction

## Correction

- Appliquer le correctif
- Verifier en staging
- Deployer
- Confirmer la resolution

## Post-mortem

- Documenter dans docs/operations/
- Identifier les ameliorations
- Mettre a jour SECURITY.md si securite

## Contacts

A definir lors du passage en production.
