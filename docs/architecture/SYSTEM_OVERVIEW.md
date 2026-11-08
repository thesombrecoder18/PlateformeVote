# SYSTEM_OVERVIEW.md

## Vision systeme

Plateforme SaaS multi-tenant de vote electronique.
Une application unique heberge plusieurs organisations independantes (tenants).

## Les quatre espaces

### 1. Portail public
- Pages institutionnelles, presentation du service
- Formulaire de demande d espace organisation
- Accessible sans authentification

### 2. Espace electeur
- Interface minimaliste, mobile-first strict
- Authentification, liste des scrutins eligibles
- Parcours de vote : selection, confirmation, accuse neutre
- Consultation des resultats publies

### 3. Backoffice organisation
- Gestion des scrutins, candidats, listes electorales
- Administration des membres et permissions
- Communication, rapports, audit
- Personnalisation (logo, couleurs, textes)

### 4. Backoffice central
- Supervision de la plateforme
- Gestion des demandes d organisations
- Monitoring, incidents, securite

## Architecture applicative

Next.js App Router (TypeScript strict) :
- Server Components par defaut
- Client Components pour les interactions navigateur
- Route Handlers pour les API REST
- Server Actions pour les mutations

Supabase :
- PostgreSQL avec RLS
- Auth (invitation-only)
- Storage prive pour documents

## Isolation multi-tenant

Chaque organisation a un tenant_id stable (UUID).
Le sous-domaine identifie le contexte mais n autorise rien.
Chaque requete resout le tenant cote serveur et verifie les permissions.

Voir ADR-0003 : docs/architecture/adr/0003-multi-tenant-isolation.md

## Securite

Voir docs/security/ pour le detail.
Gate absolue : aucun scrutin reel sans protocole valide + audit.

## Modules principaux

Voir docs/architecture/MODULE_BOUNDARIES.md
