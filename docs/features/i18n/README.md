# Internationalisation FR/EN
## Statut: implemented
## Objectif
Francais et anglais des le socle : routage, dictionnaires, dates, heures, nombres et pourcentages.
## Sprints: S03
## Perimetre
Routage [locale], messages FR/EN, formatage Intl. La langue utilisateur et la langue d organisation ne sont pas encore stockees.
## Acteurs et permissions
Aucun. Pas de donnee metier.
## Parcours et workflows
/fr et /en, page d accueil et /[locale]/design. Le lien de langue de la page design bascule la locale.
## Etats et transitions
Locale inconnue : repli sur fr.
## Regles metier
Voir cahier section 9 et ADR-0005. Aucune traduction automatique. Les contenus electoraux seront saisis dans les deux langues plus tard.
## Donnees et confidentialite
Exemples synthetiques uniquement. Pas de journal.
## API et actions serveur
Aucune.
## Securite et menaces
Pas de secret. Le formatage ne recoit pas de bulletin ni de choix de vote.
## Audit et notifications
Sans objet pour ce socle. Emails et notifications seront FR/EN quand ils existeront.
## Internationalisation
Cles stables dans src/lib/i18n/messages. Formatage dans src/lib/i18n/format.ts.
Fuseau d affichage : Africa/Dakar. Le fuseau d un scrutin restera une donnee du scrutin.
formatPercent attend une part entre 0 et 1.
## UI/UX et responsive
L accueil affiche l heure courante. La page design montre un instant fixe, un nombre et un pourcentage.
## Tests attendus
Alignement des cles FR/EN. Meme instant et meme nombre, rendus fr et en distincts.
## Criteres d acceptation
Voir docs/roadmap/sprints/SPRINT-03.md.
## Dependances et ADR
ADR-0005.
## Questions ouvertes
La preference de langue utilisateur et le fuseau par organisation arriveront avec le modele organisation.
