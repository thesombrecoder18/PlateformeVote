# SPRINTS.md - Plan des 34 sprints

Un sprint ne se ferme pas si les tests, documents ou criteres d acceptation ne passent pas.
Chaque sprint depend des precedents. Les sujets de securite electorale peuvent necessiter des recherches externes.

## Phase A - Fondations (S00-S04)

| Sprint | Titre | Statut | Depend de |
|--------|-------|--------|-----------|
| S00 | Audit depot et documentation | DONE | - |
| S01 | Bootstrap Next.js | DONE | S00 |
| S02 | Design system initial | DONE | S01 |
| S03 | Internationalisation FR/EN | DONE | S01 |
| S04 | Architecture Supabase et migrations | IN PROGRESS | S01 |

## Phase B - Identite, tenant, controle d acces (S05-S10)

| Sprint | Titre | Statut | Depend de |
|--------|-------|--------|-----------|
| S05 | Modele organisation/tenant | NOT STARTED | S04 |
| S06 | Isolation RLS et tests inter-tenant | NOT STARTED | S05 |
| S07 | Authentification invitation-only | NOT STARTED | S04 |
| S08 | MFA et sessions | NOT STARTED | S07 |
| S09 | Roles et permissions | NOT STARTED | S07 |
| S10 | Backoffice central initial | NOT STARTED | S09 |

## Phase C - Organisations (S11-S16)

| Sprint | Titre | Statut | Depend de |
|--------|-------|--------|-----------|
| S11 | Portail public | NOT STARTED | S03 |
| S12 | Demande d espace | NOT STARTED | S11 |
| S13 | Verification et decision | NOT STARTED | S10 |
| S14 | Provisionnement idempotent | NOT STARTED | S13 |
| S15 | Backoffice org et branding | NOT STARTED | S09 |
| S16 | Membres et delegation | NOT STARTED | S15 |

## Phase D - Scrutins (S17-S21)

| Sprint | Titre | Statut | Depend de |
|--------|-------|--------|-----------|
| S17 | Modele et cycle de vie du scrutin | NOT STARTED | S16 |
| S18 | Candidats et contenus bilingues | NOT STARTED | S17 |
| S19 | Import et gestion de l electorat | NOT STARTED | S17 |
| S20 | Validation et gel de la liste | NOT STARTED | S19 |
| S21 | Regles de scrutin | NOT STARTED | S17 |

## Phase E - Vote, secret et resultats (S22-S27)

| Sprint | Titre | Statut | Depend de |
|--------|-------|--------|-----------|
| S22 | Etude et decision protocole de vote | NOT STARTED | S21 |
| S23 | Adaptateur de vote sandbox | NOT STARTED | S22 |
| S24 | Parcours electeur | NOT STARTED | S23 |
| S25 | Comptage et verification | NOT STARTED | S23 |
| S26 | Publication et acces resultats | NOT STARTED | S25 |
| S27 | Second tour assiste | NOT STARTED | S25 |

## Phase F - Exploitation (S28-S33)

| Sprint | Titre | Statut | Depend de |
|--------|-------|--------|-----------|
| S28 | Notifications internes | NOT STARTED | S24 |
| S29 | Gmail OAuth/API et file d envoi | NOT STARTED | S14 |
| S30 | Modeles de communication | NOT STARTED | S29 |
| S31 | Audit, rapports et exports | NOT STARTED | S26 |
| S32 | Fiabilite et observabilite | NOT STARTED | S31 |
| S33 | Qualite finale, conformite et pilote sandbox | NOT STARTED | S32 |

## Notes importantes

- Ne pas commencer S22 a S27 comme systeme de vote reel sans gate cryptographique
- S22 est une etude et une decision, pas du code de vote
- L audit independant (S33) engage un cout - planifier comme investissement
