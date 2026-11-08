# CODE_REVIEW.md

## Checklist de revue de code

### Correctness
- [ ] La logique metier est dans les services, pas dans les composants
- [ ] Les mutations passent par les actions serveur (auth + tenant + perm)
- [ ] Les schemas Zod valident les entrees
- [ ] Les etats loading/error/empty/success sont tous traites

### TypeScript
- [ ] Pas de any non justifie
- [ ] Pas de @ts-ignore sans explication et issue
- [ ] Types generes depuis le schema Supabase utilises

### Securite
- [ ] Pas de secret dans le code ou les logs
- [ ] RLS verifiee pour les nouvelles tables
- [ ] Pas d acces direct a SERVICE_ROLE_KEY cote client

### Qualite
- [ ] Tests unitaires pour la logique metier
- [ ] Tests RLS (autorise et refuse)
- [ ] FR/EN complet, pas de texte systeme en dur
- [ ] Accessibilite : labels, focus, contraste

### Git
- [ ] Conventional Commits
- [ ] Pas de mention d outil IA dans les commits
