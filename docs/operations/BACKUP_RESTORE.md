# BACKUP_RESTORE.md

## Objectifs

- RPO (perte maximale) : 0 bulletin confirme
- RTO (reprise cible) : moins d une heure

## Supabase Free - limites

Pas de sauvegardes automatiques comme le plan Pro.
AUCUNE donnee electorale reelle sur cette offre.

## Strategie de sauvegarde (production)

- Sauvegardes automatiques Supabase Pro
- Export periodique via pg_dump
- Stockage chiffre hors site
- Test de restauration mensuel documente

## Procedure de restauration

1. Identifier le snapshot cible
2. Creer un environnement propre
3. Restaurer la base
4. Verifier l integrite des donnees
5. Mettre a jour les variables d environnement
6. Tester avant de basculer le trafic

## Jamais

- Promettre RPO=0 sur Supabase Free
- Restaurer en production sans test prealable
