# GLOSSARY.md

## Tenant
Espace logique d une organisation dans le SaaS.
Identifie par un tenant_id (UUID stable, independant du nom et sous-domaine).

## RLS (Row Level Security)
Politique d acces aux lignes appliquee directement par PostgreSQL.
Garantit qu un utilisateur ne peut lire que les donnees de son tenant.

## MFA / TOTP
Authentification multi-facteur par code temporaire (Time-based One-Time Password).
Obligatoire pour les comptes sensibles.

## RPO (Recovery Point Objective)
Quantite maximale de donnees qu on accepte de perdre apres incident.
Objectif : 0 bulletin confirme perdu.

## RTO (Recovery Time Objective)
Delai cible pour retablir le service apres incident.
Objectif initial : moins d une heure.

## Quorum
Seuil de participation requis pour valider un scrutin (si active).
Calcule sur la liste d electeurs eligibles gelee.

## Bulletin
Expression du vote. Doit etre separe de l identite de l electeur.

## Sandbox
Environnement de demonstration avec donnees synthetiques.
Marque NON_PRODUCTION. Ne peut pas etre utilise pour une election reelle.

## ADR (Architecture Decision Record)
Note documentant une decision d architecture : contexte, decision, consequences.
Localisation : docs/architecture/adr/

## Idempotence
Propriete d une operation qui peut etre repetee sans effet metier duplique.
Essentiel pour les soumissions de bulletins et le provisionnement.

## Gate de production
Ensemble de conditions obligatoires avant de passer en production reelle.
Voir docs/security/PRODUCTION_SECURITY_GATE.md.
