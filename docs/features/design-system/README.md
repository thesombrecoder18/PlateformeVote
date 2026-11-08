# Systeme de conception
## Statut: implemented
## Objectif
Base visuelle commune : tokens, composants accessibles, page de demonstration
## Sprints: S02
## Perimetre
Tokens, boutons, champs, labels, alertes, badges, dialogue, tableau, navigation, lien d evitement.
Les quatre experiences (public, electeur, backoffice organisation, backoffice central) restent distinctes. Ce socle ne les uniformise pas.
## Acteurs et permissions
Aucun. Pas de donnee metier.
## Parcours et workflows
Page /[locale]/design pour verifier les composants. Accueil lie vers cette page.
## Etats et transitions
Bouton indisponible, champ en erreur, alertes info/succes/avertissement/danger, tableau vide, dialogue ouvert ou ferme.
## Regles metier
Aucune regle electorale. Voir docs/product/CAHIER_DES_CHARGES_COMPLET.md section 22.
## Donnees et confidentialite
Exemples synthetiques uniquement. La banniere SANDBOX NON_PRODUCTION reste visible.
## API et actions serveur
Aucune.
## Securite et menaces
Pas de secret, pas de journal, pas de donnee electorale.
## Audit et notifications
Sans objet.
## Internationalisation
FR et EN. Voir ADR-0005.
## UI/UX et responsive
WCAG 2.2 AA comme cible de conception, sans certification.
Palette de travail : bleu nuit #14283F, vert petrole #176B66, fond #F5F7F8, bordure decorative #DCE4EA, bordure de controle #6E8498, accent chaud #D49A43.
L accent chaud est decoratif. Il n est lisible que sur le bleu nuit. Il ne sert pas de texte sur fond clair.
Typographie Inter. Espacements et rayons : echelle Tailwind. Ombre unique et legere sur le dialogue.
Liens soulignes, cibles tactiles d au moins 44 px, focus visible, mouvement reduit si prefers-reduced-motion.
Tableau : table a partir de md, cartes en dessous.
## Tests attendus
Contraste des paires de tokens, alignement FR/EN, associations label/erreur, roles alert et status, dialogue, tableau vide.
## Criteres d acceptation
Voir docs/roadmap/sprints/SPRINT-02.md.
## Dependances et ADR
ADR-0001, ADR-0005. Aucun ADR de palette : la palette reste exploratoire.
## Questions ouvertes
La palette finale reste a figer avant une identite de marque publique.
