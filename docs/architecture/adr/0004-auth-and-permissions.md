# ADR-0004 : Authentification et permissions

## Statut
Accepte - 2026-11-03

## Decision

Authentification invitation-only via Supabase Auth.
Cinq roles predefinis avec permissions granulaires.
MFA TOTP obligatoire pour les comptes sensibles.

## Cinq roles

1. Super administrateur de plateforme
2. Administrateur d organisation
3. Gestionnaire electoral
4. Auditeur (lecture seule)
5. Electeur

Pas de role Responsable de scrutin : ses responsabilites sont
exprimees par des permissions granulaires assignables.

## Permissions granulaires

Les permissions sont stables, documentees et testees cote serveur.
Elles ne sont pas seulement masquees cote client.
Un utilisateur ne peut pas s attribuer des permissions superieures.

## MFA

Obligatoire pour super admin, admin org, gestionnaires sensibles.
Auditeur selon niveau d acces.
Electeur : facultatif ou configurable par organisation.

## Consequences

- Pas d inscription publique classique
- Invitations avec tokens a usage unique et duree limitee
- Verification du niveau d assurance de session cote serveur
- Permissions verifiees en base (RLS) et dans les services
