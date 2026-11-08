# PRODUCT_OVERVIEW.md

## Vision

Plateforme SaaS de vote electronique multi-organisations.
Associations, entreprises, universites, syndicats, clubs, federations.

## Les quatre espaces

1. Portail public : presentation du service, demande d espace
2. Espace electeur : mobile-first, parcours de vote minimaliste
3. Backoffice organisation : gestion scrutins, membres, communication
4. Backoffice central : supervision, organisations, incidents

## Cinq roles

1. Super administrateur de plateforme
2. Administrateur d organisation
3. Gestionnaire electoral
4. Auditeur (lecture seule)
5. Electeur

## Stack technique

Next.js App Router + TypeScript strict + Supabase + Tailwind CSS
Voir ADR-0001 et ADR-0002.

## Contraintes fondamentales

- Budget initial : 0 FCFA (offres gratuites uniquement)
- Secret du vote : gate absolue avant toute election reelle (ADR-0006)
- Multi-tenant : isolation stricte RLS + tenant_id (ADR-0003)
- Bilingue FR/EN des le lancement (ADR-0005)
- Sandbox uniquement jusqu a audit independant (PRODUCTION_SECURITY_GATE.md)

## Pour aller plus loin

Voir docs/product/CAHIER_DES_CHARGES_COMPLET.md
