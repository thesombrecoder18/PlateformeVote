# VOTING_SECRECY.md

## Le probleme fondamental

Le secret du vote exige de separer trois domaines :
1. Identite et eligibilite : qui est authentifie et a droit de participer
2. Droit de participation : empecher qu un electeur vote deux fois
3. Bulletin : recevoir et compter le choix sans conserver l identite civile

## Ce qui ne suffit pas

- Separer les tables identite et bulletins
- Supprimer le champ user_id de la table bulletins
- Des cookies securises et un HTTPS

Les horodatages, journaux, identifiants de requete, traces applicatives,
metadonnees et acces administrateurs peuvent permettre une correlation.

## Exigences minimales de conception

- Separation des domaines identite/eligibilite et urne/bulletins
- Identifiants et journaux differents, sans identifiant de compte dans l urne
- Minimisation des horodatages et metadonnees
- Protection de l integrite des bulletins et du comptage
- Empechement technique du double vote
- Acces administratif au strict minimum
- Protocole de verifiabilite et depouillement documente

## Modele de menace

Acteurs a considerer :
- Administrateur malveillant
- Equipe technique (acces base de donnees)
- Compromission de compte administrateur
- Compromission du navigateur electeur
- Fuite de base de donnees
- Correlation temporelle (logs + horodatages)
- Attaque multi-tenant (acces aux donnees d une autre org)

## Statut

NON IMPLEMENTE - Gate S22
Un mode sandbox est utilise jusqu a validation du protocole.
Voir ADR-0006 et PRODUCTION_SECURITY_GATE.md
