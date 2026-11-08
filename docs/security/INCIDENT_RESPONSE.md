# INCIDENT_RESPONSE.md

## Classification des incidents

- P0 : Securite critique, donnees exposees, scrutin compromis
- P1 : Service indisponible, perte de donnees potentielle
- P2 : Degradation de service, anomalie detectee
- P3 : Probleme mineur, correctif planifie

## Procedure P0/P1

1. Detection : monitoring, alerte, signalement
2. Isolation : suspendre le scrutin si necessaire (decision humaine habilitee)
3. Evaluation : determiner l impact et la portee
4. Communication : informer les parties concernees
5. Correction : appliquer le correctif
6. Post-mortem : documenter et ameliorer

## Regles importantes

- Aucune prolongation automatique en cas de panne
- La suspension d un scrutin est une decision humaine habilitee
- Toute intervention technique est journalisee
- Le super administrateur ne peut pas modifier un bulletin ou resultat

## Contacts

A definir lors du passage en production.

## Runbooks

Voir docs/operations/runbooks/
