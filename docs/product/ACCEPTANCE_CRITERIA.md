# ACCEPTANCE_CRITERIA.md - Criteres d acceptation transverses

Source : cahier des charges - section 27.

## Pour chaque fonctionnalite livree

- [ ] Criteres d acceptation fonctionnels documentes
- [ ] Validation formulaire cote client ET serveur
- [ ] Controle de permissions cote serveur
- [ ] Controle RLS sur les donnees concernees
- [ ] Tests unitaires des regles metier
- [ ] Tests d integration des transitions et transactions
- [ ] Tests E2E des parcours critiques
- [ ] Tests de refus et d acces interdit
- [ ] Comportement FR/EN complet
- [ ] Etats de chargement, erreur, vide et succes
- [ ] Accessibilite clavier et contraste verifies
- [ ] Journalisation sans donnee sensible superflue
- [ ] Documentation et configuration actualisees

## Tests sensibles obligatoires

- Double participation (un electeur ne vote qu une fois)
- Double soumission (idempotence)
- Simultaneite de deux requetes
- Gel de liste (modifications bloquees apres gel)
- Seuil de quorum (calcul correct sur liste gelee)
- Vote blanc (comptage separe, distinct abstention)
- Egalite et regles pre-configurees
- Second tour (scrutin lie, nouvelles regles)
- Visibilite des resultats (controle d acces)
- Suspension et reprise de scrutin
- Publication des resultats (workflow validation)
- Revocation de permission (effet immediat)
- Isolation entre deux tenants (acces refuse)
