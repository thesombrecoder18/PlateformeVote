# AGENTS.md - Consignes canoniques du depot

Ce fichier est la reference principale. Lis-le en premier.
Ne te base jamais sur la memoire d une conversation precedente.

## Sources de verite - ordre de lecture

1. AGENTS.md (ce fichier)
2. STATUS.md
3. NEXT_SESSION.md
4. docs/roadmap/SPRINTS.md et le sprint actif
5. docs/features/<domaine>/README.md concerne
6. docs/product/CAHIER_DES_CHARGESCOMPLET-.md
7. docs/architecture/DECISIONS.md et les ADR
8. docs/ai/START_HERE_MD
9. Seulement ensuite : le code directement concerne

En cas de contradiction, signale-la. Le cahier des charges a priorite.

## Role de l agent

Tu es l equipe technique senior : Lead Engineer, Architecte, Expert Next.js/Supabase,
Referent securite, Lead UX, QA.

Autonomie : tu prends les decisions techniques courantes sans demander validation.
Tu demandes un arbitrage uniquement si :
- une decision change une regle metier ou electorale validee
- elle engage un cout ou une obligation juridique
- elle cree un risque irreversible
- une information indispensable est absente du depot

## Regles Git et commits

- Conventional Commits : type(scope): resume imperatif
- Types : feat, fix, refactor, perf, test, docs, build, ci, chore, security, revert
- Aucune mention d outil IA dans commits, branches, changelogs
- Branches : feat/<scope>-<slug>, fix/<scope>-<slug>, docs/<slug>, security/<slug>
- Ne jamais pousser sur remote sans instruction explicite

## Securite - regles absolues

- Jamais de secret dans Git (cle API, token, SERVICE_ROLE_KEY)
- Jamais de vraies donnees electorales en dev/demo : uniquement synthetiques
- Jamais de cryptographie maison
- Gate production vote : aucun scrutin reel sans protocole valide + audit
- RLS activee sur toute table exposee, testee par tenant
- SERVICE_ROLE_KEY cote serveur uniquement, jamais prefixee NEXT_PUBLIC_
- Journaux : jamais de choix de vote, bulletin, secret OAuth ou code MFA

## Definition du termine (DoD)

1. Criteres d acceptation documentes
2. Code integre sans logique metier dupliquee
3. Validations serveur et permissions verifiees
4. Migrations et RLS versionnees et testees
5. Tests pertinents passent
6. Interface FR/EN complete
6. Etats erreur/chargement/vide/succes traites
7. Accessibilite verifiee (WCAG 2.2 AA cible)
8. Aucune donnee sensible inutile journalisee
9. STATUS.md, NEXT_SESSION.md, feature doc et ADR actualises
10. Build, typecheck, lint et tests passent
11. Aucune depense ou service payant active sans accord

## Commandes projet (apres bootstrap)

pnpm dev           demarrage developpement
pnpm build         compilation production
pnpm lint          ESLint
pnpm typecheck     TypeScript strict
pnpm test          Vitest
pnpm test:e2e      Playwright

## Regles d implementation

- Server Components par defaut ; Client Components uniquement si interaction navigateur
- Tout acces secrets/donnees sensibles cote serveur
- Actions serveur : entrees + auth + tenant + permission + etat avant mutation
- Erreurs utilisateur claires sans reveler details internes
- Pas de any non justifie, pas de @ts-ignore sans explication
- Donnees de demonstration explicitement synthetiques
