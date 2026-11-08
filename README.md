# Plateforme SaaS de vote electronique

Plateforme SaaS multi-organisations pour organiser des scrutins en ligne.
Cible : associations, entreprises, universites, syndicats, clubs et federations.

## Statut

Phase A - Fondations (Sprint S00 en cours)
Sandbox uniquement - aucun scrutin reel active

## Quatre espaces

1. Portail public institutionnel
2. Espace electeur (mobile-first)
3. Backoffice organisation
4. Backoffice central de la plateforme

## Stack technique

- Next.js App Router + TypeScript strict
- Supabase (PostgreSQL, Auth, Storage)
- Tailwind CSS
- pnpm

## Prerequis

- Node.js >= 18
- pnpm >= 8 (installer : npm install -g pnpm)
- Compte Supabase (gratuit pour dev)

## Installation

  git clone <repo>
  pnpm install
  cp .env.example .env.local
  # Remplir les variables dans .env.local
  pnpm dev

## Documentation

- AGENTS.md : consignes pour agents de developpement
- STATUS.md : etat actuel du projet
- docs/product/CAHIER_DES_CHARGES_COMPLET.md : cahier des charges
- docs/roadmap/SPRINTS.md : plan des 34 sprints
- docs/ai/START_HERE.md : guide de demarrage rapide

## Avertissement securite

Ce projet est en developpement. Le mode sandbox ne constitue pas
une certification de securite electorale. Aucun scrutin reel
ne doit utiliser ce logiciel sans audit de securite independant.

Voir SECURITY.md et docs/security/PRODUCTION_SECURITY_GATE.md.

## Licence

A definir.
