# SESSION_MEMORY_RULES.md

## La source de verite est le depot, pas la conversation

Une conversation ou le contexte interne ne sont jamais superieurs au depot.

## Fichiers a mettre a jour a chaque session

- STATUS.md : etat reel, sprint, bloquants
- NEXT_SESSION.md : prochaine action concrete
- docs/roadmap/sprints/SPRINT-XX.md : statut livrables
- docs/features/<domaine>/README.md : si feature avance
- docs/architecture/adr/XXXX.md : si decision prise

## Regles

- Ne pas dupliquer le cahier des charges dans STATUS.md
- Ne pas coller de logs massifs
- Jamais de secrets ni donnees personnelles
- Statuts : fait | partiel | non commence | bloque | non verifie
