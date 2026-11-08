# DATA_FLOW.md

## Flux de donnees principaux

### 1. Demande d organisation
Navigateur -> Portail public -> Route Handler -> Service organizations
-> Supabase (organization_requests) -> Email invitation admin

### 2. Authentification
Navigateur -> Page connexion -> Supabase Auth -> Middleware Next.js
-> Resolution tenant -> Verification permissions -> Page protegee

### 3. Vote (sandbox - schema definitif depend du protocole S22)
Electeur authentifie -> Verification eligibilite -> Selection candidat
-> Confirmation explicite -> Action serveur -> Verification double vote
-> Enregistrement bulletin (domaine vote isole) -> Accuse neutre

ATTENTION : Ce flux est sandbox. Le flux reel depend du protocole S22.

### 4. Publication resultats
Comptage cote serveur -> Validation par habilite
-> Resultats provisoires (acces restreint)
-> Validation finale -> Publication -> Acces electeurs/public

### 5. Provisionnement tenant
Approbation super admin -> Creation tenant (idempotent)
-> Invitation premier administrateur -> Email activation
-> Premiere connexion -> Backoffice actif

## Regles generales

- Toutes les mutations passent par les actions serveur
- Les actions verifient : auth + tenant + permission + etat avant mutation
- Les donnees sensibles (bulletins) sont isolees du flux identite
- Les emails ne revelent jamais le choix de vote
