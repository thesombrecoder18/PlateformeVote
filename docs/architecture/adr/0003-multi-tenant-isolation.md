# ADR-0003 : Isolation multi-tenant

## Statut
Accepte - 2026-11-03

## Decision

Isolation par tenant_id (UUID stable) sur toutes les tables metier,
RLS PostgreSQL, grants/revokes explicites, et tests inter-tenant.

## Regles

1. Chaque table metier porte un tenant_id non nullable
2. Le sous-domaine identifie le contexte, n autorise rien
3. Le tenant est resolu cote serveur depuis la session auth
4. Un tenant_id fourni par le navigateur n est jamais cru
5. RLS activee sur toute table exposee
6. Tests negatifs : user du tenant A ne peut pas lire les donnees du tenant B

## Consequences

- Middleware Next.js obligatoire pour la resolution tenant
- Pas de table sans tenant_id (sauf tables plateforme globales)
- Tests d isolation obligatoires pour chaque entite
