# CONTEXT_COMPACTION.md

## Pour reduire le contexte sans perdre l etat

1. Mettre a jour STATUS.md avec l etat REEL du code
2. Mettre a jour NEXT_SESSION.md avec la prochaine action
3. Mettre a jour le sprint doc actif
4. Lister les fichiers modifies dans la session
5. Committer les changements stables

## Ce qu il faut conserver

- Decisions prises (ADR)
- Etat reel du code (pas une promesse)
- Tests passes et failes
- Prochaine action concrete

## Ce qu on peut abandonner

- Le detail des conversations
- Les explorations qui n ont pas abouti
- Les logs intermediaires

## Format de transmission minimal

  Lire : AGENTS.md + STATUS.md + NEXT_SESSION.md + SPRINT-XX.md
  Etat : [liste des fichiers cles modifies]
  Prochaine action : [une phrase concrete]
