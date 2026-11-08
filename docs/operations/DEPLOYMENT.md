# DEPLOYMENT.md

## Environnements

### Developpement local
Outil : Next.js dev server + Supabase Free ou local
Cout : 0 FCFA
Donnees : synthetiques uniquement

### Demonstration / Staging
Outil : Vercel Hobby + Supabase Free
Cout : 0 FCFA (limites a verifier)
Donnees : synthetiques uniquement, sandbox NON_PRODUCTION

### Production (conditions Gate)
Outil : a decider lors du Go/No-Go
Cout : non gratuit (Supabase Pro min, domaine, monitoring)
Conditions : voir PRODUCTION_SECURITY_GATE.md

## Limites offre gratuite (a reverifier periodiquement)

Supabase Free :
- 2 projets actifs
- 500 MB base de donnees
- 5 GB egress
- 1 GB storage
- Mise en pause apres 1 semaine d inactivite
- Pas de sauvegardes auto comme Pro

Vercel Hobby :
- 100 GB bandwidth
- Pas de domaines custom en SSL sur plan gratuit (a verifier)
- Limites de fonctions serverless

## Ce qui ne peut pas rester gratuit en production

- Supabase Pro : sauvegardes, SLA, disponibilite
- Domaine personnalise + sous-domaines tenants
- CDN et protection DDoS
- Monitoring et observabilite avancee
- Emails transactionnels a volume

## Jamais

- Activer un service payant sans accord explicite
- Mettre des donnees electorales reelles sur Supabase Free
