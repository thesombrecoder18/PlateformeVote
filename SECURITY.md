# SECURITY.md

## Signalement

Contacter l equipe avant toute divulgation publique.

## Donnees interdites dans Git

- Cles API, tokens, secrets OAuth, SERVICE_ROLE_KEY
- Mots de passe, codes MFA, tokens de session
- Donnees personnelles reelles (electeurs, membres, candidats)
- Contenu de bulletins ou choix de vote individuels

## Environnements demo

AUCUNE DONNEE ELECTORALE REELLE en dev et demo.
Donnees synthetiques uniquement.

## Gate production - Vote secret

Un scrutin reel ne peut etre active que si :
1. Protocole cryptographique valide et documente
2. Audit de securite independant effectue
3. Vulnerabilites critiques/elevees corrigees et retestees
4. Plan de sauvegarde/restauration teste
5. Monitoring et procedure d incident operationnels
6. Conformite donnees personnelles (loi senegalaise 2008-12)
7. Approbation explicite de mise en production

SANDBOX NON_PRODUCTION : le mode sandbox ne peut pas etre
presente comme securise pour une election reelle.

## Securite technique

- RLS activee et testee sur toute table exposee
- SERVICE_ROLE_KEY uniquement cote serveur
- Journaux sans contenu de bulletin ni choix de vote
- Cookies HttpOnly, Secure en production, SameSite
- MFA TOTP obligatoire pour comptes sensibles
