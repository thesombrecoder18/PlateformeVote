# MODULE_BOUNDARIES.md

## Frontieres entre domaines fonctionnels

Chaque domaine est isole. Les composants visuels ne contiennent pas les regles metier.

## Les 14 domaines

### 1. auth
Authentification, comptes, sessions, MFA.
Dependances : aucune (fondation).

### 2. tenants
Resolution tenant, isolation, sous-domaines.
Dependances : auth.

### 3. organizations
Demandes, verification, provisionnement, etats tenant.
Dependances : tenants, auth.

### 4. members-permissions
Roles, permissions granulaires, invitations membres.
Dependances : tenants, auth.

### 5. elections
Cycle de vie scrutin, etats, transitions, regles.
Dependances : members-permissions, tenants.

### 6. candidates
Candidats, medias, traductions, gel.
Dependances : elections.

### 7. electorate
Liste electorale, imports CSV, validation, gel.
Dependances : elections, members-permissions.

### 8. voting
Vote secret (GATE S22). Dependances : electorate, candidates.
NON_PRODUCTION jusqu a validation protocole.

### 9. results
Comptage, validation, publication. Dependances : voting.

### 10. communications
Gmail OAuth, outbox, modeles, notifications.
Dependances : organizations.

### 11. audit
Journal append-only, alertes, securite.
Dependances : toutes (cross-cutting).

### 12. reporting
Exports PDF/CSV/Excel, rapports.
Dependances : results, audit, electorate.

### 13. voter-experience
UI electeur : shell, parcours vote, resultats publies.
Dependances : voting, results, auth.

### 14. platform-admin
Backoffice central : supervision, organisations, incidents.
Dependances : organizations, audit.

## Regles de frontiere

- Pas d import direct entre domaines non adjacents
- Les regles metier elections/vote ne vont pas dans les composants UI
- Les services de chaque domaine exposent une API publique stable
- Les types Supabase generes sont utilises, pas des types custom dupliques
