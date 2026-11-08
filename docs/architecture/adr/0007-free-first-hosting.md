# ADR-0007 : Strategie free-first

## Statut
Accepte - 2026-11-03

## Decision

Budget initial : 0 FCFA de depenses recurrentes.
Supabase Free pour le developpement et la demonstration uniquement.

## Ce qui est gratuit

- Supabase Free : dev et demo (2 projets, 500MB, 5GB egress)
- Vercel Hobby : deploiement demo (limites a verifier)
- pnpm, Next.js, TypeScript, Tailwind : open-source
- GitHub : depot prive (plan gratuit)

## Ce qui ne peut pas etre gratuit en production

- Supabase Pro : sauvegardes automatiques, disponibilite 99.9%
- Domaine personnalise et sous-domaines tenants
- Emails professionnels a volume
- Monitoring et observabilite avancee
- Audit de securite independant
- CDN et protection DDoS

## Regles

- N activer aucun service payant sans accord explicite
- Ne pas masquer une limite gratuite
- Documenter precisement ce qui est gratuit et ses limites
- AUCUNE donnee electorale reelle sur offre gratuite

## Consequences

- La disponibilite 99.9% et le RPO 0 sont des objectifs de production
- Ils ne sont pas garantis par Supabase Free
- Le passage en production necessite un budget et une decision explicite
