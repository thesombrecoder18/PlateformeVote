# THREAT_MODEL.md

## Surfaces d attaque principales

### Authentification
- Brute force sur les endpoints de connexion
- Credential stuffing
- Attaques sur les invitations (expiration, replay)
- Contournement MFA

### Multi-tenant
- IDOR (acces aux ressources d un autre tenant)
- Injection de tenant_id dans les requetes
- Escalade de privileges inter-organisation

### Vote
- Double soumission d un bulletin
- Correlation identite-bulletin via metadonnees
- Manipulation des bulletins par un administrateur
- Attaque sur le comptage des resultats

### Infrastructure
- Compromission des cles Supabase
- Fuite de la base de donnees
- Compromission du serveur applicatif

### Communication
- Divulgation du choix de vote dans un email
- Manipulation des modeles d emails

## Mesures de mitigation

Voir docs/security/SECURITY_BASELINE.md

## Statut

A completer avant S22 (etude protocole de vote).
Revision lors de l audit independant.
