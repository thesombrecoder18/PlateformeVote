# SECURITY_BASELINE.md

## Exigences minimales de securite

### Base de donnees
- RLS activee sur toute table exposee
- Grants/revokes explicites par role et operation
- Une policy par action (SELECT, INSERT, UPDATE, DELETE)
- Tests autorise ET refuse par tenant et par role
- Vues et fonctions SECURITY DEFINER examinees

### Authentification
- Invitation uniquement, pas d inscription publique
- Mots de passe : hashage bcrypt/argon2 (via Supabase Auth)
- Protection brute force (rate limiting)
- Tokens d invitation : usage unique, duree limitee
- Messages d erreur anti-enumeration de comptes
- Cookies : HttpOnly, Secure en production, SameSite
- MFA TOTP obligatoire pour comptes sensibles

### API et mutations
- Validation des entrees avec schemas Zod
- Verification auth + tenant + permission + etat avant mutation
- Protection CSRF sur les mutations
- Pas d IDOR : verification de l appartenance tenant
- Rate limiting adapte

### Secrets et configuration
- SERVICE_ROLE_KEY uniquement cote serveur
- Jamais de secret dans NEXT_PUBLIC_*, logs ou Git
- Rotation des secrets documentee

### Journalisation
- Jamais de choix de vote, contenu bulletin, mot de passe, secret OAuth
- Journaux d audit append-only
- Evenements de securite separes des evenements metier

### Dependances
- pnpm audit regulier
- Versions lockees dans pnpm-lock.yaml
- Pas de package inutile
