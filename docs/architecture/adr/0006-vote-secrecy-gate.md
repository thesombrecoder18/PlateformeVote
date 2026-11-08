# ADR-0006 : Gate du secret du vote

## Statut
Accepte - 2026-11-03 (GATE ABSOLUE)

## Decision

Aucun scrutin reel ne peut etre active avant que le protocole
cryptographique de vote soit selectionne, documente, valide
par une revue specialisee independante et integre via un adaptateur isole.

## Probleme a resoudre

Le secret du vote exige de separer :
1. Identite et eligibilite : qui peut voter
2. Droit de participation : empecher le double vote
3. Bulletin : recevoir le choix sans conserver l identite

Une simple separation de tables ou l absence de user_id dans l urne
ne prouve pas l anonymat. Les horodatages, journaux, identifiants
de requete et metadonnees peuvent permettre une correlation.

## Regles absolues

- Ne PAS inventer de cryptographie maison
- Ne PAS implementer de signature aveugle, mixnet ou homomorphe DIY
- Etudier des protocoles eprouves, documenter le choix, faire valider
- Integrer via une interface isolee apres validation externe
- Jusqu a validation : mode sandbox uniquement, marque NON_PRODUCTION
- La variable NEXT_PUBLIC_VOTE_MODE=sandbox_non_production doit etre presente

## Gate de production

Un scrutin reel necessite cumulativement :
1. Protocole selectionne, documente et evalue
2. Audit de securite independant (architecture + code + crypto + pentest)
3. Vulnerabilites critiques/elevees corrigees et retestees
4. Plan de sauvegarde/restauration teste
5. Monitoring et procedure incident operationnels
6. Conformite donnees personnelles (loi 2008-12 Senegal)
7. Approbation explicite de mise en production

## Consequences

- S22 est une etape de recherche et decision (pas de code de vote)
- S23 cree uniquement un adaptateur sandbox
- Le schema de la table bulletins depend du protocole (pas avant S22)
