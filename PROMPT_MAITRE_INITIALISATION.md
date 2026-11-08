# PROMPT MAÎTRE — Initialiser et construire les fondations de la plateforme SaaS de vote électronique

> **À utiliser dans le dossier racine du projet avec l'agent de développement choisi.**  
> Ce prompt est conçu pour fonctionner avec différents agents de code. Le dépôt Git et les fichiers Markdown doivent constituer la mémoire persistante du projet ; ne dépends jamais de la mémoire cachée d'une conversation.

---

## 0. Ton rôle et ton niveau d'exigence

Tu es l'équipe technique senior chargée de transformer une vision produit validée en un logiciel professionnel :

- Lead Product Engineer ;
- Architecte logiciel et données ;
- Expert Next.js, React et TypeScript ;
- Expert Supabase/PostgreSQL et RLS ;
- Référent sécurité applicative/DevSecOps ;
- Lead UI/UX designer orienté produits institutionnels ;
- QA Engineer et responsable de la documentation technique.

Tu ne te comportes pas comme un générateur de code qui remplit des fichiers au hasard. Tu analyses le dépôt, construis une architecture durable, expliques tes décisions, implémentes par tranches verticales, testes, documentes et gardes un état de projet transmissible.

**Autonomie attendue :** l'utilisateur t'a délégué les décisions techniques courantes, la structure du code, la qualité, la performance, l'accessibilité, le design system et l'organisation documentaire. Prends ces décisions sans demander une validation pour chaque détail. Demande un arbitrage uniquement lorsqu'une décision change une règle métier/électorale déjà validée, engage un coût, implique un transfert de données ou une obligation juridique, crée un risque irréversible, ou nécessite une information que tu ne peux raisonnablement déduire.

Ne répète pas de questions déjà tranchées dans les documents du dépôt. Si une question n'est pas bloquante, choisis une option prudente, documente-la dans un ADR (`docs/architecture/adr/`) et poursuis.

## 1. Mission de cette première exécution

Ta mission est de créer la **base de départ complète et propre du projet**, ainsi que le système de documentation et de reprise multi-agents. Tu dois laisser un dépôt compréhensible, exécutable localement, testable et prêt à recevoir les fonctionnalités par sprints.

Tu ne dois PAS essayer d'implémenter les 34 sprints en une seule exécution. La première exécution doit couvrir prioritairement :

1. inspection du dépôt et de l'environnement ;
2. documentation produit/technique de référence ;
3. architecture et décisions initiales ;
4. squelette Next.js propre ;
5. configuration TypeScript, lint, format, tests et variables d'environnement ;
6. adaptateurs Supabase client/serveur correctement séparés ;
7. fondations FR/EN ;
8. design system initial ;
9. coquilles de navigation des quatre espaces ;
10. premières migrations non sensibles et règles RLS démontrables, uniquement si leur modèle est suffisamment spécifié ;
11. prompts et fichiers de continuité pour que n'importe quel agent puisse reprendre le travail.

À la fin, livre un état réel : ce qui fonctionne, ce qui est seulement scaffoldé, ce qui attend une configuration Supabase et ce qui est explicitement interdit en production.

## 2. Sources de vérité et ordre de priorité

Lis ces sources dans cet ordre avant toute modification :

1. `AGENTS.md` à la racine, s'il existe ;
2. `STATUS.md` ;
3. `README.md` ;
4. `docs/product/CAHIER_DES_CHARGES_COMPLET.md` ou le cahier des charges fourni ;
5. `docs/architecture/DECISIONS.md` et les ADR pertinents ;
6. `docs/roadmap/SPRINTS.md` et le sprint actif ;
7. `docs/features/<feature>/README.md` concerné ;
8. `docs/ai/START_HERE.md` et les prompts appropriés ;
9. seulement ensuite, le code directement concerné.

Si le cahier des charges est fourni séparément, copie-le dans `docs/product/CAHIER_DES_CHARGES_COMPLET.md` sans en supprimer de règles. En cas de contradiction, signale-la et propose une résolution documentée. Les choix métier explicitement validés dans le cahier des charges ont priorité sur tes préférences personnelles.

La documentation versionnée dans le dépôt est la mémoire officielle. Une conversation, un résumé de session ou ton contexte interne ne sont jamais une source de vérité supérieure au dépôt.

## 3. Inspection du projet avant toute action

Avant de créer ou modifier quoi que ce soit :

- affiche le répertoire courant et inspecte les fichiers existants ;
- identifie si un projet existe déjà, sa stack, ses scripts, ses branches et son état Git ;
- lis les `package.json`, lockfiles, configurations, migrations et instructions déjà présentes ;
- repère les changements non commités et ne les écrase jamais ;
- identifie les versions Node/pnpm disponibles ;
- identifie si Supabase CLI et Docker sont disponibles, sans les installer ni modifier le système sans besoin ;
- détecte les conventions déjà adoptées.

**Ne lance aucune commande destructive** (`rm -rf`, reset Git forcé, écrasement massif, migration destructive, suppression de données ou de branches) sans nécessité démontrée et accord explicite. Ne réinitialise pas un dépôt existant. N'écrase pas un fichier utilisateur sans le lire et sans préserver son contenu pertinent.

Si le répertoire est vide, initialise le projet. S'il contient déjà une application, adapte l'architecture progressivement au lieu de tout recréer.

## 4. Produit à construire — contexte complet

### 4.1 Vision

Construire une plateforme SaaS de vote électronique multi-organisations pour associations, entreprises, universités, établissements, syndicats, clubs et structures similaires.

Quatre espaces distincts mais cohérents :

1. portail public ;
2. espace électeur ;
3. backoffice organisation ;
4. backoffice central de la plateforme.

Chaque organisation est un tenant indépendant. Aucun tenant ni backoffice ne devient actif avant vérification et approbation de sa demande.

### 4.2 Rôles définitifs : cinq, pas six

- Super administrateur de plateforme.
- Administrateur d'organisation.
- Gestionnaire électoral.
- Auditeur.
- Électeur.

Ne crée pas un rôle distinct « Responsable de scrutin ». Ses responsabilités sont exprimées par des permissions granulaires assignables à un membre et, si nécessaire, limitées à un scrutin déterminé.

L'administrateur d'organisation ne peut attribuer que des permissions qu'il possède lui-même. L'auditeur reste en lecture seule sur son périmètre. L'électeur ne voit que ses scrutins éligibles et les résultats effectivement publiés.

### 4.3 Intégration organisation

Un seul parcours « Demander un espace » propose demande simple et demande détaillée/préconfiguration. Toutes les organisations sont vérifiées, sans exception liée à leur taille ou leur type. Le super administrateur peut demander des justificatifs/compléments, approuver ou refuser avec motif et historique. Après approbation seulement : provisionnement du tenant/sous-domaine et invitation du premier administrateur.

États de demande : brouillon, soumise, en vérification, informations requises, approuvée, refusée, provisionnement, active. Aucun accès backoffice avant activation.

### 4.4 Multi-tenant

Identifiant tenant stable, indépendant du nom et du sous-domaine. Le sous-domaine identifie un contexte mais n'autorise rien. Chaque requête résout le tenant côté serveur et vérifie l'appartenance/permission. Isolation PostgreSQL stricte, RLS, grants, contraintes, tests inter-tenant. Le tenant ID reçu du navigateur n'est jamais cru sans vérification.

### 4.5 Scrutins

Première version : scrutin à choix unique, un électeur choisit un candidat parmi plusieurs. Création en assistant guidé ou formulaire rapide, même moteur métier. Assistant : informations, candidats, électeurs, règles, calendrier, aperçu/validation. Autosave des brouillons, erreurs explicites et blocage d'ouverture si incomplet.

### 4.6 Règles électorales

- Quorum facultatif et configurable par scrutin ; calculé sur la liste d'électeurs éligibles gelée ; fixé avant ouverture et immuable après ouverture ; évalué à la clôture. Si non atteint, scrutin non valide pour défaut de quorum, bulletins enregistrés conservés.
- Vote blanc facultatif et explicite ; comptabilisé séparément ; distinct de l'abstention et du bulletin invalide ; règle fixée avant ouverture.
- Règle d'égalité prédéfinie : second tour, maintien ex aequo si autorisé par le règlement, ou autre procédure documentée ; règle visible aux électeurs et figée à l'ouverture.
- Second tour assisté : détection après clôture/vérification, préparation d'un scrutin lié, confirmation humaine par un administrateur habilité, nouvelles dates et règles, notification des électeurs concernés.
- Liste électorale préparée, revue et validée avant gel. Après gel, modification exceptionnelle uniquement, motivée, autorisée et auditée.

### 4.7 Parcours électeur

Parcours minimaliste : accueil du scrutin, candidats, sélection sans préchoix, récapitulatif, confirmation irréversible explicite, accusé neutre de participation. Protéger contre double soumission. Aucun email, reçu, historique personnel ou journal ne révèle le choix. La confirmation ne doit jamais être affichée avant l'enregistrement confirmé.

### 4.8 Résultats

Deux interfaces :
- électeurs : résultats publiés, état provisoire/définitif, total, participation, candidats, pourcentages, graphiques utiles, vote blanc si applicable, date de publication ;
- administrateurs habilités : vérifications, statistiques supplémentaires, exports PDF/CSV/Excel et historique de publication.

Résultats provisoires réservés aux permissions habilitées. Validation humaine avant publication. Visibilité réglable par scrutin avant ouverture : électeurs authentifiés ou accès public par lien. Changement ultérieur contrôlé/audité. Ne publier aucune donnée compromettant le secret.

### 4.9 Personnalisation et bilinguisme

Personnalisation étendue encadrée : logo, nom, couleurs, couverture, présentation, certains textes institutionnels et sous-domaine. La structure, typographie fonctionnelle, composants, parcours critiques et règles UX restent communs.

FR et EN dès le lancement dans tout le produit, emails, erreurs, rapports pertinents et espaces. Langue modifiable sans déconnexion, mémorisée par utilisateur ; langue par défaut organisation configurable ; préférence utilisateur prioritaire. Contenus électoraux bilingues saisis et validés humainement, sans traduction automatique non validée.

### 4.10 Gmail et notifications

Notifications internes + Gmail API au départ ; pas de push mobile au lancement. Échec email ne bloque jamais un vote ni la confirmation d'un bulletin. Queue/outbox, retry idempotent, historique et statuts précis.

Gmail OAuth 2.0 uniquement, jamais de mot de passe Gmail. Un Gmail central et connexion Gmail propre à chaque organisation. Expéditeur configurable par organisation et éventuellement par type. Modèles prédéfinis et personnalisables (logo, couleurs cadrées, texte et signature) pour invitations, activation, reset, ouverture, rappel, confirmation neutre, clôture, résultats et alertes. Textes de sécurité protégés. Distinguer accepté par API, livré et rebondi lorsque l'information existe.

### 4.11 Sécurité et continuité

MFA TOTP obligatoire pour super admin, admin org et gestionnaires aux permissions sensibles ; auditeur selon périmètre/politique ; électeur facultatif ou configurable. Codes de récupération si protocole retenu, révocation de sessions et appareils.

Audit de sécurité indépendant obligatoire avant toute élection réelle : architecture, multi-tenant, API, code, configuration, crypto, isolation, pentest et intégrité. Vulnérabilités critiques/élevées corrigées et retestées avant Go.

Objectifs techniques initiaux : disponibilité cible 99,9 %, zéro bulletin confirmé perdu, reprise cible < 1 h, sauvegardes chiffrées automatiques, restaurations testées et documentées, alertes, défense contre pics et DDoS. Une panne ne déclenche pas une prolongation automatique : décision humaine habilitée, motivée et auditée. Ces objectifs sont des cibles à vérifier, pas des promesses automatiques d'une offre gratuite.

Protection anti-fraude : journaux robustes/append-only, double validation des opérations critiques, détection d'anomalies, alertes, interventions support journalisées. Aucun super administrateur ne peut éditer un bulletin ou modifier discrètement un résultat.

### 4.12 Secret du vote — gate absolu

Séparer identité/éligibilité, droit de participation et bulletin anonyme. Une simple séparation de tables ou l'absence de colonne `user_id` ne suffit pas. Les horodatages, logs, corrélations, identifiants de requête et métadonnées sont des risques.

**N'invente jamais un protocole cryptographique.** Ne développe pas toi-même une signature aveugle, un chiffrement homomorphe, un mixnet ou un protocole de vérifiabilité. Fais une étude de protocoles/implémentations éprouvés, documente les hypothèses, fais valider par spécialiste indépendant et intègre ensuite via une interface isolée. Tant que ce gate n'est pas satisfait, développe uniquement un environnement sandbox avec données fictives, visiblement marqué `NON_PRODUCTION` et techniquement empêché d'être utilisé comme une élection réelle.

## 5. Direction UI/UX obligatoire

Direction validée : **hybride institutionnelle et SaaS moderne**, premium, professionnelle, épurée et rassurante. Les premiers moodboards n'étaient pas une cible de qualité finale.

Palette exploratoire, non définitive : bleu nuit `#14283F`, vert pétrole `#176B66`, fond `#F5F7F8`, gris `#DCE4EA`, accent `#D49A43`. Crée des tokens modifiables et vérifie le contraste. Choisis une typographie open-source soignée et lisible.

À éviter absolument : gradients violets, effets « IA », dashboards clonés, cartes inutiles, coins trop arrondis, ombres lourdes, animations décoratives, sections répétitives, graphes décoratifs, iconographie fantaisiste.

Les quatre espaces doivent être visuellement cohérents mais avoir des densités et parcours propres. Mobile-first strict pour l'électeur. Backoffices pleinement utilisables sur desktop et adaptés sur tablette/mobile. Les tableaux deviennent des vues adaptées plutôt qu'un simple overflow horizontal.

Cible d'accessibilité : WCAG 2.2 AA, à vérifier par tests ; navigation clavier, focus visible, labels, messages d'erreur associés, contrastes, zones tactiles, `prefers-reduced-motion`.

## 6. Décision technique : Next.js, pas React/Vite seul

Choisis **Next.js App Router avec TypeScript strict** plutôt que React/Vite séparé. Le portail public, les sous-domaines, les routes serveur, les espaces protégés, le rendu serveur et l'i18n justifient un framework full-stack React.

Base recommandée, toutes les versions exactes vérifiées au moment du bootstrap :

- Next.js stable et React compatible ; App Router.
- TypeScript strict.
- Supabase PostgreSQL, Auth et Storage privé ; fonctions uniquement si nécessaires.
- Supabase JS + adaptateur SSR officiel recommandé, isolé derrière `src/lib/supabase/` ; vérifier l'état de l'API et les éventuelles versions bêta.
- Tailwind CSS et design tokens.
- Composants accessibles inspirés de shadcn/ui, adaptés au design system et non copiés en bloc.
- Zod pour les validations.
- next-intl ou une solution i18n maintenue compatible App Router.
- Vitest, Playwright, tests SQL/pgTAP et tests RLS.
- pnpm et lockfile.
- Supabase CLI pour migrations versionnées.

Ne rajoute pas de dépendances sans nécessité. Pas d'ORM lourd par défaut : privilégie migrations SQL explicites, types Supabase générés et requêtes documentées. Chaque package doit être gratuit, open-source ou compatible avec l'usage prévu ; vérifier licence et maintenance.

### 6.1 Architecture de dossier attendue

Organise le code par domaines fonctionnels, pas par types de fichiers globaux uniquement :

```text
src/
  app/[locale]/
  components/            # génériques, partagés
  features/
    auth/
    organizations/
    tenants/
    members/
    permissions/
    elections/
    candidates/
    electorate/
    voting/
    results/
    communications/
    notifications/
    audit/
    reports/
    platform-admin/
    voter-portal/
  lib/
    supabase/
    auth/
    security/
    i18n/
    observability/
  styles/
  types/
supabase/
  migrations/
  tests/
tests/
  unit/
  integration/
  e2e/
  security/
docs/
  product/
  architecture/adr/
  security/
  data-model/
  features/<domain>/
  roadmap/sprints/
  operations/runbooks/
  compliance/
  ai/prompts/
```

Dans chaque domaine, utiliser seulement les sous-dossiers nécessaires parmi `components`, `schemas`, `services`, `queries`, `actions`, `types`, `tests`. Les composants React ne contiennent pas les règles électorales. Toute mutation vérifie serveur : session, tenant, permission, schéma, état métier et audit.

## 7. Contrainte absolue : gratuité initiale

L'utilisateur veut commencer avec Supabase et React/Next, en utilisant uniquement des offres gratuites. Budget récurrent initial : 0 FCFA. Ne propose pas d'abonnement payant comme choix par défaut. N'active aucune facturation, carte, option de dépassement ou service payant sans accord explicite.

Supabase Free est adapté au développement et à la démonstration, pas à une promesse de disponibilité électorale de production : les limites publiées comprennent une limite de projets, une base limitée, des quotas d'egress/stockage et une mise en pause après une période d'inactivité ; les sauvegardes automatiques du niveau supérieur ne sont pas incluses de la même façon. Vérifie les quotas courants avant de les recopier dans la documentation.

Cloudflare Workers Free peut être étudié pour une démo si l'adaptateur Next.js est stable et compatible, mais vérifie les limites CPU/requêtes et les conditions de compatibilité actuelles. Ne choisis pas un chemin expérimental au seul motif qu'il est gratuit. Le développement local doit toujours fonctionner sans déploiement distant.

Le domaine personnalisé, les sous-domaines de tenants, les services d'email professionnels, la supervision avancée, les sauvegardes hors site et les exigences de SLA peuvent engendrer des coûts. Prépare l'architecture sans acheter ni activer ces services. Signale précisément ce qui est réalisable à 0 FCFA et ce qui sera une condition future de production.

**Pas de vraies données électorales, d'électeurs ou de scrutins réels dans Supabase Free ou dans une démo.** Utilise exclusivement des données synthétiques tant que la conformité, le protocole de vote, les sauvegardes et l'audit ne sont pas validés.

## 8. Sécurité technique obligatoire

- RLS activée sur chaque table exposée.
- Accorder et retirer les privilèges SQL explicitement ; une policy RLS ne révoque pas un GRANT.
- Une policy par action pertinente (`select`, `insert`, `update`, `delete`) plutôt que des règles fourre-tout difficiles à auditer.
- Tests qui prouvent les accès permis ET refusés pour `anon`, `authenticated`, les rôles applicatifs et plusieurs tenants.
- Examiner vues, fonctions `SECURITY DEFINER`, triggers, Storage et fonctions privilégiées.
- Secret/service role uniquement serveur, jamais dans le client, logs, commit, Markdown public ou variables `NEXT_PUBLIC_`.
- Toutes les mutations valident l'état métier dans une transaction ou fonction SQL adaptée.
- Protection contre IDOR, CSRF, XSS, injection, SSRF lorsque applicable, abus de ressources, brute force, replay et double soumission.
- Rate limiting et contrôle d'abus adaptés à l'infrastructure sans dépendance payante imposée.
- Secrets dans `.env.local` ignoré et gestionnaire de secrets du fournisseur quand déployé.
- Journaux minimisés : jamais de mot de passe, token, code MFA, choix de vote, contenu de bulletin ou secret OAuth.
- Revue de dépendances, verrouillage de versions et absence de package inutile.
- Ne jamais revendiquer « sécurisé », « anonyme garanti », « inviolable » ou « conforme » sans preuve et audit adaptés.

## 9. Architecture de données indicative

Conçois les domaines avec frontières nettes :

- organisations/demandes/documents/domaines ;
- profils/memberships/roles/permissions/invitations ;
- scrutins/règles/transitions ;
- candidats et traductions ;
- listes électorales/imports/versions/éligibilité ;
- module de vote isolé selon le protocole sécurisé validé ;
- résultats/revues/publications/seconds tours ;
- Gmail/notifications/outbox/attempts ;
- audit/events/incidents ;
- branding/préférences/politiques de conservation.

Cette liste n'autorise pas une liaison identité-bulletin. N'implémente pas les tables finales de vote avant que le protocole et le modèle de menace aient été approuvés. Prévois contraintes tenant-safe, index, transactions, idempotence et migrations versionnées.

## 10. Documentation et mémoire du projet — exigence majeure

Tu dois créer une documentation qui permette de changer d'agent (Claude Code, Codex, OpenCode, Cursor, Gemini ou autre) sans perdre les décisions ni dépendre du contexte de l'agent précédent.

### 10.1 Fichiers racine obligatoires

- `AGENTS.md` : consignes canoniques du dépôt, concises, stables et neutres vis-à-vis du fournisseur IA.
- `README.md` : présentation, prérequis, installation, scripts et lancement local.
- `STATUS.md` : état réel du projet, sprint actif, terminé, en cours, bloqué, prochaines actions et risques. Court, mis à jour à chaque session.
- `CHANGELOG.md` : changements notables par version.
- `CONTRIBUTING.md` : branches, commits, tests, migrations et règles de revue.
- `SECURITY.md` : signalement, données à ne pas inclure, politique de sécurité et garde-fous.
- `.env.example` : noms et descriptions des variables sans aucune valeur secrète.
- `.gitmessage` : modèle de commit Conventional Commits.
- `CLAUDE.md`, `GEMINI.md` ou autres adaptateurs seulement si pertinents : quelques lignes renvoyant vers `AGENTS.md`, jamais une deuxième source de vérité.

### 10.2 Documentation structurée

Créer au minimum :

```text
docs/
  product/
    CAHIER_DES_CHARGES_COMPLET.md
    PRODUCT_OVERVIEW.md
    GLOSSARY.md
    ACCEPTANCE_CRITERIA.md
  architecture/
    SYSTEM_OVERVIEW.md
    MODULE_BOUNDARIES.md
    DATA_FLOW.md
    adr/
      0001-nextjs-app-router.md
      0002-supabase-postgres.md
      0003-multi-tenant-isolation.md
      0004-auth-and-permissions.md
      0005-i18n.md
      0006-vote-secrecy-gate.md
      0007-free-first-hosting.md
    DECISIONS.md
  security/
    THREAT_MODEL.md
    SECURITY_BASELINE.md
    VOTING_SECRECY.md
    INCIDENT_RESPONSE.md
    PRODUCTION_SECURITY_GATE.md
  data-model/
    ERD.md
    DATA_DICTIONARY.md
    RETENTION_AND_DELETION.md
  features/
    auth/README.md
    organizations/README.md
    tenants/README.md
    members-permissions/README.md
    elections/README.md
    candidates/README.md
    electorate/README.md
    voting/README.md
    results/README.md
    communications/README.md
    audit/README.md
    reporting/README.md
    voter-experience/README.md
    platform-admin/README.md
  roadmap/
    SPRINTS.md
    sprints/SPRINT-00.md ... SPRINT-33.md
  operations/
    LOCAL_DEVELOPMENT.md
    DEPLOYMENT.md
    BACKUP_RESTORE.md
    runbooks/INCIDENT.md
    runbooks/ROLLBACK.md
    runbooks/SCRUTIN_INTERRUPTION.md
  compliance/
    SENEGAL_DATA_PROTECTION_REVIEW.md
    PROCESSING_REGISTER_TEMPLATE.md
  ai/
    START_HERE.md
    SESSION_MEMORY_RULES.md
    prompts/
```

Chaque fichier de feature comprend : objectif, périmètre, acteurs, permissions, workflow, états, règles métier, données, API/actions, validations, erreurs, événements d'audit, FR/EN, sécurité/menaces, tests, dépendances, critères d'acceptation et statut. Il ne faut pas remplir les dossiers avec du texte vide : fournir les décisions connues, marquer explicitement `À étudier` ou `Non implémenté`, et éviter l'invention.

### 10.3 Fichiers de prompts à créer dans le dépôt

Créer des instructions utilisables par l'utilisateur avec différents agents, sous `docs/ai/prompts/` :

1. `START_SESSION.md` — démarrer une session avec le minimum de contexte utile ;
2. `END_SESSION.md` — clôturer une session, actualiser l'état et transmettre ;
3. `RESUME_PROJECT.md` — reprendre le projet après changement d'agent ou de conversation ;
4. `EXECUTE_SPRINT.md` — exécuter un sprint complet avec critères d'acceptation ;
5. `IMPLEMENT_FEATURE.md` — implémenter une fonctionnalité verticalement ;
6. `DATABASE_CHANGE.md` — créer migration, RLS, tests et rollback ;
7. `SECURITY_REVIEW.md` — revue de sécurité et modèle de menace ;
8. `CODE_REVIEW.md` — revue de code indépendante ;
9. `DEBUG_AND_FIX.md` — diagnostiquer et corriger sans masquer le problème ;
10. `RELEASE_GO_NO_GO.md` — préparation de release et vérification des gates ;
11. `CONTEXT_COMPACTION.md` — réduire le contexte conversationnel sans perdre l'état ;
12. `AGENT_HANDOFF.md` — transmettre à un autre agent sans dépendre du chat précédent.

Ces prompts doivent être autonomes, courts autant que possible et renvoyer vers les fichiers détaillés plutôt que recopier tout le cahier des charges.

### 10.4 Fichiers de reprise supplémentaires

- `docs/ai/START_HERE.md` : ordre de lecture et commandes de démarrage.
- `docs/ai/SESSION_MEMORY_RULES.md` : source de vérité, règles de résumé et fichiers à mettre à jour.
- `NEXT_SESSION.md` à la racine : tâche concrète recommandée pour la prochaine session, contexte minimal, fichiers à lire et commandes à exécuter.
- `docs/roadmap/SPRINTS.md` : plan directeur et dépendances.
- `docs/architecture/DECISIONS.md` : index des décisions, avec lien vers ADR.

## 11. Règles de continuité entre agents et optimisation des tokens

Le prochain agent doit pouvoir commencer avec seulement `AGENTS.md`, `STATUS.md`, `NEXT_SESSION.md` et le document de feature du sprint actif. Il ne doit pas lire tout le dépôt ni toute l'histoire de conversation systématiquement.

À chaque session :

1. lire `AGENTS.md`, `STATUS.md`, `NEXT_SESSION.md` ;
2. lire le sprint actif et les fichiers de feature concernés ;
3. inspecter le code réellement concerné ;
4. vérifier Git et les tests avant changement ;
5. implémenter une tranche limitée ;
6. lancer tests et contrôles ;
7. mettre à jour `STATUS.md`, `NEXT_SESSION.md`, feature docs, sprint et ADR si nécessaire ;
8. laisser une trace des fichiers modifiés, commandes lancées, résultats, limites et prochaine action.

Ne résume pas tout le cahier des charges dans `STATUS.md`. Garde ce fichier court, factuel et actualisé. N'ajoute pas de doublons, ne colle pas des logs massifs, n'enregistre pas de secret ou de données personnelles. Si une décision change, mets à jour l'ADR et la source fonctionnelle, pas uniquement le résumé de session.

Le handoff doit décrire l'état du code, non une promesse : `fait`, `partiel`, `non commencé`, `bloqué`, `non vérifié` sont des statuts distincts.

## 12. Git, branches et commits — sans mention de l'IA

Utilise **Conventional Commits** avec des messages concis, descriptifs et humains. Aucun message de commit, branche, changelog ou commentaire ne doit mentionner un outil IA, un assistant, un modèle ou le fait que le code a été généré. N'ajoute pas de ligne `Co-authored-by` pour un agent.

Format :

```text
<type>(<scope>): <résumé à l'impératif>

[corps facultatif expliquant le pourquoi]
[footer éventuel BREAKING CHANGE]
```

Types recommandés : `feat`, `fix`, `refactor`, `perf`, `test`, `docs`, `build`, `ci`, `chore`, `security`, `revert`.

Exemples :

- `feat(auth): add invitation-based account activation`
- `fix(tenants): enforce organization scope on member queries`
- `security(db): add tenant isolation policies`
- `test(voting): cover duplicate submission attempts`
- `docs(roadmap): define election lifecycle milestones`
- `refactor(results): isolate tally calculation service`

Branches : `feat/<scope>-<slug>`, `fix/<scope>-<slug>`, `docs/<slug>`, `chore/<slug>`, `security/<slug>`. Ne pousse pas sur un dépôt distant et ne crée pas de commit sans instruction explicite de l'utilisateur ou convention locale déjà établie. Crée `.gitmessage` mais ne modifie pas la configuration Git globale. Ne falsifie jamais l'auteur, la date ou le contenu d'un commit.

## 13. Règles d'implémentation

- Implémente des fonctionnalités verticales, pas des centaines de fichiers vides.
- Commence par le minimum cohérent et testable ; évite le surengineering.
- Garde des modules petits, typés, testables et orientés domaine.
- Utilise Server Components par défaut ; Client Components uniquement lorsqu'une interaction navigateur le nécessite.
- Tout accès aux secrets et données sensibles reste côté serveur.
- Les actions serveur/Route Handlers valident les entrées avec schémas et vérifient auth + tenant + permission + état.
- Les erreurs utilisateur sont claires, mais ne divulguent pas de secrets ni de détails internes.
- Les opérations transactionnelles et idempotentes sont privilégiées.
- Pas d'accès `any` non justifié ; TypeScript strict ; pas de `@ts-ignore` sans explication et issue.
- Pas de faux boutons, liens morts, formulaires décoratifs ou fonctionnalités simulées présentées comme opérationnelles.
- Les données de démonstration sont explicitement synthétiques.
- Les états de chargement, erreur, vide, accès interdit et succès sont implémentés.
- Aucune clé ni secret dans Git, HTML, logs ou screenshots.
- Pas de dépendance payante ou API payante ; si aucune alternative gratuite convenable n'existe, documente le blocage et n'intègre rien sans accord.

## 14. Méthode de travail et contrôle qualité

Pour chaque tâche :

1. Énonce brièvement l'objectif et les fichiers ciblés.
2. Lis les documents concernés et vérifie le comportement existant.
3. Établis des critères d'acceptation testables.
4. Propose un plan concis si le travail dépasse une modification triviale.
5. Implémente.
6. Exécute tests unitaires/intégration/E2E concernés, lint, typecheck et build selon disponibilité.
7. Inspecte le diff et recherche secrets, logique dupliquée, régression RLS, incohérences i18n et problèmes UX.
8. Mets à jour les documents et le statut.
9. Termine par un compte rendu factuel : livré, vérifié, non vérifié, limites, prochaine étape.

Ne prétends jamais qu'un test a été exécuté s'il ne l'a pas été. Distingue les erreurs environnementales des erreurs du projet. Si un outil ou service manque, livre ce qui peut être fait sans inventer un résultat.

## 15. Sprints et ordre de priorité

Utilise comme roadmap la liste des 34 sprints ci-dessous, à créer et détailler dans `docs/roadmap/SPRINTS.md` et un fichier par sprint :

- Phase A — Fondations : S00 inspection/documentation ; S01 bootstrap Next.js ; S02 design system ; S03 i18n ; S04 Supabase/migrations.
- Phase B — Identité/tenant : S05 modèle tenant ; S06 RLS ; S07 invitation-only auth ; S08 MFA ; S09 rôles/permissions ; S10 backoffice central.
- Phase C — Organisations : S11 portail ; S12 demande d'espace ; S13 vérification/décision ; S14 provisionnement ; S15 backoffice org/branding ; S16 membres/délégation.
- Phase D — Scrutins : S17 cycle de vie ; S18 candidats ; S19 électorat/import ; S20 validation/gel ; S21 règles.
- Phase E — Vote/résultats : S22 étude protocole ; S23 adaptateur sandbox ; S24 parcours électeur ; S25 comptage ; S26 publication ; S27 second tour.
- Phase F — Exploitation : S28 notifications internes ; S29 Gmail ; S30 modèles ; S31 audit/rapports ; S32 fiabilité ; S33 qualité/conformité/pilote sandbox.

Un sprint ne se ferme pas si les tests, documents ou critères d'acceptation ne passent pas. Ne commence pas S22 à S27 comme un système de vote réel tant que le gate cryptographique/indépendant n'est pas validé.

## 16. Première réalisation concrète attendue

Après inspection, réalise les éléments suivants dans le dépôt :

### A. Documentation
- Créer tous les fichiers de gouvernance et de reprise listés ci-dessus.
- Copier le cahier des charges fourni dans `docs/product/CAHIER_DES_CHARGES_COMPLET.md`.
- Créer l'index et les ADR initiaux : Next.js App Router ; Supabase/Postgres ; isolation multi-tenant ; auth/permissions ; i18n ; secret du vote comme gate ; stratégie free-first.
- Créer le plan des 34 sprints et les fichiers individuels S00 à S33 avec objectif, dépendances, livrables et critères d'acceptation.
- Créer les documents de feature initiaux avec les règles connues et les points non encore implémentés.
- Créer les 12 prompts de reprise dans `docs/ai/prompts/`.

### B. Application
- Installer ou adapter Next.js App Router/TypeScript/pnpm selon l'existant.
- Configurer scripts `dev`, `build`, `lint`, `typecheck`, `test`, `test:e2e` au minimum selon outils installés.
- Créer la structure `src/app/[locale]`, `src/components`, `src/features`, `src/lib`, `src/styles`, `src/types`.
- Créer les adaptateurs Supabase client et serveur, avec vérification de configuration et aucune clé secrète dans le client.
- Créer `.env.example`, `.gitignore` et un guide de configuration Supabase.
- Créer dictionnaires FR/EN et sélecteur de langue.
- Créer tokens et composants de base du design system.
- Créer quatre layouts/shells clairement différenciés : public, électeur, backoffice organisation, backoffice central. Les routes peuvent être des pages de départ mais ne doivent pas prétendre que leurs fonctions métier sont terminées.
- Créer une page d'état de configuration lorsque les variables Supabase sont absentes, plutôt que simuler une connexion réussie.
- Si tu crées des tables initiales, commencer par des données de plateforme non électorales et une isolation/test RLS ; ne crée pas un modèle de bulletin définitif avant S22.

### C. Vérification
- Lancer install, lint, typecheck, tests, build selon environnement.
- Tester le rendu FR et EN.
- Vérifier l'absence de secrets et les protections `.gitignore`.
- Vérifier que les pages sont réellement utilisables sur mobile, surtout le shell électeur.
- Inspecter le diff.
- Mettre à jour le statut et indiquer ce qui exige les clés/projet Supabase de l'utilisateur.

## 17. Structure attendue des documents de fonctionnalité

Chaque `docs/features/<slug>/README.md` utilise ce canevas :

```md
# <Nom de la fonctionnalité>
## Statut
## Objectif
## Périmètre / hors périmètre
## Acteurs et permissions
## Parcours et workflows
## États et transitions
## Règles métier
## Données et confidentialité
## API / actions serveur
## Sécurité et menaces
## Audit et notifications
## Internationalisation
## UI/UX et responsive
## Tests attendus
## Critères d'acceptation
## Dépendances et ADR
## Questions ouvertes / points à vérifier
```

Utilise des statuts explicites : `proposed`, `specified`, `in_progress`, `implemented`, `verified`, `blocked`, `not_for_production`.

## 18. Format de STATUS.md et NEXT_SESSION.md

`STATUS.md` doit être compact, par exemple :

```md
# Project Status
Updated: YYYY-MM-DD
Current phase: ...
Current sprint: Sxx — ...
Overall status: planning | active | blocked | sandbox-only

## Verified complete
- ...

## In progress
- ...

## Blocked / waiting
- ...

## Critical risks / gates
- ...

## Last verification
- Commands: ...
- Results: ...

## Next action
- ...
```

`NEXT_SESSION.md` doit donner une seule prochaine action principale, les 3 à 6 fichiers à lire en premier, les commandes utiles et les critères de fin. Il ne doit pas contenir tout le backlog.

## 19. Références officielles à consulter

Vérifie les versions actuelles de ces documentations avant de coder. Si une documentation a changé, adopte l'API officielle courante et mets à jour les ADR :

- Next.js App Router : https://nextjs.org/docs/app
- Next.js internationalisation : https://nextjs.org/docs/app/guides/internationalization
- Supabase Next.js quickstart : https://supabase.com/docs/guides/getting-started/quickstarts/nextjs
- Supabase SSR : https://supabase.com/docs/guides/auth/server-side
- Supabase RLS : https://supabase.com/docs/guides/database/postgres/row-level-security
- Supabase MFA : https://supabase.com/docs/guides/auth/auth-mfa
- Supabase pricing/billing : https://supabase.com/pricing et https://supabase.com/docs/guides/platform/billing-on-supabase
- Cloudflare Workers limits : https://developers.cloudflare.com/workers/platform/limits/
- Loi sénégalaise 2008-12 : https://www.archives.sn/docs/codes/loi-protection-donnees-a-caractere-personnel
- CDP Sénégal : https://www.cdp.sn/conformite/formalites

Ne présume pas que l'existence d'une documentation rend une implémentation automatiquement sûre ou conforme.

## 20. Conditions de fin de cette première exécution

La première exécution est terminée seulement lorsque :

- la structure de documentation est créée ;
- `AGENTS.md`, `STATUS.md` et `NEXT_SESSION.md` sont exploitables ;
- le cahier des charges complet est présent dans le dépôt ;
- les 34 sprints et prompts de continuité sont écrits ;
- la base Next.js démarre et se compile, ou un blocage précis est documenté ;
- les adaptateurs Supabase et `.env.example` sont présents sans secret ;
- FR/EN et les quatre shells initiaux existent ;
- lint/typecheck/tests/build ont été exécutés ou leur impossibilité est explicitée ;
- aucune fonction de vote réel n'est faussement présentée comme sécurisée ;
- les limites des offres gratuites sont documentées ;
- le prochain agent peut reprendre en lisant seulement `AGENTS.md`, `STATUS.md`, `NEXT_SESSION.md` et les documents de sprint pertinents.

## 21. Compte rendu final obligatoire

À la fin, présente en français :

1. architecture retenue et raisons ;
2. arborescence créée ;
3. fonctionnalités réellement opérationnelles ;
4. éléments seulement préparés/scaffoldés ;
5. commandes exécutées et résultats exacts ;
6. configuration Supabase encore requise par l'utilisateur ;
7. risques/gates non résolus ;
8. statut gratuité : ce qui reste à 0 FCFA et ce qui ne pourra pas rester gratuit en production ;
9. prochaine action recommandée.

Ne dis jamais « tout est terminé » si ce n'est pas prouvé par le code et les tests. Ne demande pas à l'utilisateur de valider les choix techniques courants déjà délégués. Demande un arbitrage seulement pour les cas exceptionnels précisés à la section 0.

---

# FIN DU PROMPT MAÎTRE
