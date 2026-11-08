# AGENT_HANDOFF.md

## Pour transmettre a un autre agent

Le nouvel agent n a pas acces a l historique de conversation.
Il doit pouvoir demarrer uniquement depuis le depot.

## Fichiers minimum a lire

1. AGENTS.md
2. STATUS.md
3. NEXT_SESSION.md
4. docs/roadmap/sprints/<sprint_actif>.md

## Message de transmission type

  Projet : Plateforme SaaS de vote electronique
  Sprint actif : Sxx - <titre>
  Etat : voir STATUS.md (mis a jour)
  Prochaine action : voir NEXT_SESSION.md
  Stack : Next.js App Router + TypeScript + Supabase

## Regles pour le nouvel agent

- Lire AGENTS.md avant tout
- Ne pas reconstruire ce qui existe
- Ne pas changer la stack sans ADR
- Suivre les regles Git (pas de mention IA dans les commits)
- Gate vote : voir ADR-0006 et PRODUCTION_SECURITY_GATE.md
