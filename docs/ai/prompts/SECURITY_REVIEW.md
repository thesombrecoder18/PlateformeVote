# SECURITY_REVIEW.md

## Checklist de revue securite

### Authentification et sessions
- [ ] Endpoints sensibles verifient le niveau d assurance MFA
- [ ] Cookies : HttpOnly, Secure, SameSite
- [ ] Rate limiting sur les endpoints de connexion
- [ ] Tokens d invitation : usage unique, expiration

### Multi-tenant
- [ ] Chaque mutation verifie le tenant cote serveur
- [ ] Aucun tenant_id du navigateur cru directement
- [ ] RLS testee : refuse inter-tenant
- [ ] Pas d IDOR sur les ressources

### Vote (gate S22)
- [ ] Aucun lien direct identite-bulletin
- [ ] Journaux sans choix de vote
- [ ] Mode sandbox clairement marque NON_PRODUCTION

### Secrets
- [ ] Aucun secret dans le bundle client
- [ ] Aucun secret dans les logs
- [ ] SERVICE_ROLE_KEY cote serveur uniquement

### Dependances
- [ ] pnpm audit sans vulnerabilite critique
- [ ] Versions lockees (pnpm-lock.yaml)
