# ADR-0001 : Next.js App Router

## Statut
Accepte - 2026-11-03

## Contexte

Le projet necessite :
- Un portail public (SSR, SEO)
- Des espaces proteges multi-tenant avec sous-domaines
- Des routes serveur pour les mutations securisees
- Une internationalisation FR/EN complete
- Un seul depot, une seule base de code

## Decision

Utiliser Next.js App Router avec TypeScript strict.

## Justification

- SSR natif pour le portail public et l espace electeur
- Middleware pour la resolution de tenant par sous-domaine
- Server Components pour limiter le JS cote client
- Server Actions et Route Handlers pour les mutations securisees
- App Router mature avec support i18n via next-intl
- Un seul deploiement pour les quatre espaces

## Alternatives considerees

- React/Vite seul : pas de SSR natif, complexite d integration API
- Remix : ecosysteme plus petit, moins de ressources
- Nuxt.js : Vue.js, pas l expertise d equipe

## Consequences

- Necessite de bien separer Server/Client Components
- Middleware critique pour la securite multi-tenant
- Les versions Next.js doivent etre verifiees a l installation
