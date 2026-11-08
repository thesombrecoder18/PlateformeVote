# S03 - Internationalisation FR/EN

## Phase: A
## Statut: DONE
## Objectif
Routage [locale], next-intl, dictionnaires, formatage date, heure, nombre et pourcentage
## Dependances: S01
## Livrables
- [x] Routage [locale], next-intl et dictionnaires FR/EN (poses en S01, conserves)
- [x] Formatage date, heure, date-heure, nombre et pourcentage selon la locale active
- [x] Fuseau d affichage explicite Africa/Dakar, en attendant une preference d organisation
- [x] Demonstration sur l accueil et sur /fr/design, /en/design
- [x] Cles FR/EN alignees
## Criteres d acceptation
- [x] Le meme instant et le meme nombre produisent un rendu different en fr et en en
- [x] L heure francaise est sur 24 h et le fuseau est visible
- [x] Le pourcentage suit la locale (part entre 0 et 1)
- [x] Aucune chaine systeme majeure en dur sur l accueil et la page design
- [x] Tests, typecheck, lint et build passent

## Hors perimetre
- Langue memorisee utilisateur et langue par defaut d organisation : S05 et suivants
- Contenus electoraux bilingues saisis : sprints scrutins
- Fuseau propre a un scrutin : cahier section 12.3, pas ce sprint
