# Cahier des charges fonctionnel, UX, technique et sécurité

## Plateforme SaaS de vote électronique multi-organisations

**Version :** 1.0 — 3 novembre 2026  
**Statut :** socle produit validé ; spécification de référence pour le démarrage du projet  
**Langue de travail :** français ; produit bilingue français / anglais dès le lancement  
**Cadre technique de départ :** Next.js (React, App Router) + Supabase (PostgreSQL, Auth, Storage et fonctions lorsque nécessaires)  
**Contrainte financière initiale :** 0 FCFA de dépenses récurrentes ; offres gratuites uniquement pour le développement, les tests et la démonstration, sans prétendre qu'elles suffisent à une production électorale réelle.

---

# 1. Résumé exécutif

Le produit est une plateforme SaaS de vote électronique destinée à plusieurs organisations indépendantes : associations, entreprises, universités, établissements, syndicats, clubs, fédérations et autres structures ayant besoin d'organiser des scrutins internes.

Chaque organisation dispose d'un espace isolé, identifiable par un sous-domaine lorsque le domaine et l'hébergement le permettront. La plateforme fournit quatre environnements cohérents mais distincts :

1. un portail public de présentation et de demande d'espace ;
2. un espace électeur simple et rassurant ;
3. un backoffice propre à chaque organisation ;
4. un backoffice central réservé à l'équipe de la plateforme.

Le service doit privilégier la confiance, la neutralité, la simplicité, la traçabilité, la confidentialité et la disponibilité. Le secret du vote est une exigence d'architecture et de sécurité, pas un simple attribut d'interface ou une promesse marketing.

**Décision de cadrage essentielle :** la première base de code peut inclure un mode de démonstration/sandbox et les fondations du produit. Aucun scrutin réel ne devra être présenté comme sécurisé ou autorisé tant que le protocole de vote secret, les contrôles techniques, la conformité applicable et l'audit indépendant n'auront pas été validés.

# 2. Vision, objectifs et principes directeurs

## 2.1 Vision

Fournir un outil professionnel qui permet à des organisations de préparer, administrer, suivre et publier des résultats de scrutins en ligne, sans devoir construire leur propre infrastructure électorale.

## 2.2 Objectifs produit

- Permettre à une organisation de demander un espace, d'être vérifiée, puis d'être activée.
- Donner aux organisations des outils de préparation et d'administration des scrutins.
- Proposer aux électeurs un parcours mobile-first, compréhensible et sans ambiguïté.
- Préserver l'anonymat du bulletin et l'intégrité du dépouillement.
- Fournir des résultats lisibles selon des règles de publication définies avant le scrutin.
- Assurer une isolation stricte entre organisations.
- Maintenir une traçabilité des actions administratives sans journaliser le choix de vote.
- Être bilingue français/anglais dès le lancement.
- Construire une base modulaire, testable et transmissible entre différents agents de développement.

## 2.3 Principes non négociables

1. **Secret du vote :** aucune interface, table, journal ou fonction administrative ne doit permettre de relier directement un bulletin à l'identité de l'électeur.
2. **Isolation multi-tenant :** une organisation ne doit jamais pouvoir lire ou modifier les données d'une autre organisation.
3. **Moindre privilège :** chaque personne ne reçoit que les permissions nécessaires.
4. **Séparation des responsabilités :** préparer, vérifier, approuver, ouvrir et publier peuvent relever de personnes distinctes selon les permissions.
5. **Traçabilité :** les actions sensibles sont auditables ; les journaux ne contiennent jamais le choix exprimé.
6. **Pas de mutation silencieuse :** une opération sensible doit être contrôlée, justifiée et journalisée.
7. **Résilience :** l'enregistrement confirmé d'un bulletin ne doit pas être perdu lors d'une panne applicative.
8. **Bilinguisme réel :** le français et l'anglais couvrent les quatre espaces, les messages, les erreurs et les contenus système.
9. **Mobile-first :** l'expérience électeur est prioritairement conçue pour smartphone.
10. **Sobriété :** pas d'effets IA génériques, de dégradés violets, d'animations décoratives, de cartes inutiles ou de graphiques sans valeur opérationnelle.
11. **Gratuité initiale :** aucune dépendance payante n'est acceptée sans décision explicite. Une limite gratuite ne doit jamais être masquée.
12. **Honnêteté de sécurité :** un prototype, un test automatisé ou une bonne pratique ne constituent pas à eux seuls une certification de sécurité électorale.

# 3. Périmètre fonctionnel

## 3.1 Inclus dans la vision produit

- Portail public institutionnel.
- Demande d'espace organisation avec parcours simple ou détaillé.
- Vérification obligatoire de chaque organisation avant approbation.
- Provisionnement du tenant et invitation du premier administrateur après approbation.
- Comptes créés sur invitation, sans inscription publique classique.
- Authentification email/mot de passe, réinitialisation, sessions et MFA.
- Gestion multi-tenant et sous-domaines organisationnels.
- Gestion des membres, rôles et permissions granulaires.
- Gestion des scrutins, candidats, électeurs, règles, calendrier et états.
- Préparation, validation et gel de la liste électorale.
- Parcours de vote à choix unique pour la première version.
- Quorum optionnel par scrutin.
- Vote blanc optionnel par scrutin.
- Règle d'égalité définie avant ouverture.
- Préparation assistée d'un second tour.
- Résultats provisoires et définitifs avec publication contrôlée.
- Visibilité des résultats configurable avant ouverture.
- Notifications internes et Gmail API.
- Modèles d'emails personnalisables dans un cadre protégé.
- Journaux d'audit, exports, rapports et supervision.
- Personnalisation de marque niveau étendu mais encadrée.
- FR/EN dans tout le produit.
- Surveillance, sauvegarde, restauration et gestion d'incident.
- Tests, audit de sécurité indépendant et critères de mise en production.

## 3.2 Hors périmètre de la première version

- Vote préférentiel, classement, vote pondéré ou approbation multi-choix.
- Application mobile native iOS/Android.
- Notifications push natives au lancement.
- Traduction automatique des contenus électoraux sans validation humaine.
- Personnalisation libre de la structure UX par organisation.
- Automatisation d'une décision électorale contestée sans intervention habilitée.
- Garantie de résistance à la coercition d'un électeur, à un appareil compromis ou à une surveillance de son environnement domestique. Ces risques doivent être documentés ; une application web ne peut les éliminer à elle seule.
- Mise en production réelle sur une offre gratuite sans mécanismes suffisants de disponibilité, de sauvegarde, d'observabilité et d'audit.

# 4. Utilisateurs, rôles et permissions

## 4.1 Les cinq rôles prédéfinis

1. **Super administrateur de plateforme :** gère la plateforme, les demandes d'organisations, le provisionnement, la supervision et les paramètres globaux.
2. **Administrateur d'organisation :** contrôle l'espace de son organisation, ses membres, ses paramètres et les opérations soumises à ses permissions.
3. **Gestionnaire électoral :** prépare et gère les opérations électorales qui lui sont attribuées, sans recevoir automatiquement tous les privilèges de l'administrateur.
4. **Auditeur :** consulte les informations et traces auxquelles il est autorisé, sans pouvoir modifier les objets audités ni intervenir dans le vote.
5. **Électeur :** consulte les scrutins auxquels il est éligible, vote une seule fois conformément aux règles et consulte les résultats publiés.

Le rôle « responsable de scrutin » n'existe pas comme rôle prédéfini. Ses responsabilités sont représentées par des permissions attribuables à un administrateur ou à un gestionnaire sur un scrutin déterminé.

## 4.2 Permissions granulaires

Le système doit séparer les rôles de base des permissions effectives. Prévoir notamment des permissions de type :

- `organization.view`, `organization.settings.manage`, `organization.branding.manage` ;
- `members.view`, `members.invite`, `members.roles.manage`, `members.revoke` ;
- `elections.view`, `elections.create`, `elections.edit_draft`, `elections.submit_for_review` ;
- `elections.approve_list`, `elections.freeze_list`, `elections.schedule`, `elections.open`, `elections.pause`, `elections.close` ;
- `candidates.manage`, `electorate.import`, `electorate.validate`, `electorate.exceptional_edit` ;
- `results.review`, `results.validate`, `results.publish`, `results.export` ;
- `communications.manage`, `communications.send`, `templates.manage` ;
- `audit.view`, `reports.view`, `reports.export` ;
- permissions limitées à un scrutin et à une période lorsque pertinent.

Les identifiants de permissions sont stables, documentés et testés. Les permissions sont vérifiées côté serveur et en base, pas seulement en masquant des boutons.

## 4.3 Règles de séparation des responsabilités

- Un utilisateur ne peut pas s'attribuer des permissions supérieures à celles qu'il possède.
- Un administrateur d'organisation ne peut administrer que son organisation.
- Le super administrateur ne reçoit pas de capacité ordinaire de lecture du contenu des bulletins ou du choix individuel.
- Le rôle auditeur est en lecture seule sur le périmètre accordé ; il ne peut pas modifier une règle, une liste, un bulletin ou un résultat.
- La plateforme peut imposer une seconde validation pour les opérations critiques.
- Les permissions ponctuelles sont limitées à un scrutin, révoquées à expiration et journalisées.
- Les comptes administratifs sensibles exigent un MFA TOTP ; le MFA électeur est facultatif ou configurable.

# 5. Modèle multi-tenant et espaces

## 5.1 Architecture multi-tenant

Une application SaaS unique héberge plusieurs organisations. Chaque organisation possède un identifiant technique stable (`tenant_id`) qui ne dépend ni de son nom ni de son sous-domaine.

Le sous-domaine permet d'identifier le contexte d'organisation, mais **ne constitue jamais une autorisation**. Chaque requête doit résoudre le tenant puis vérifier l'appartenance de l'utilisateur et ses permissions. Le serveur ne doit jamais faire confiance à un `tenant_id` fourni librement par le navigateur.

## 5.2 Isolation

- Toute table métier appartenant à une organisation porte un `tenant_id` non nullable quand cela s'applique.
- Les relations doivent empêcher les références croisées entre tenants.
- Les politiques PostgreSQL RLS sont activées sur chaque table exposée.
- Les privilèges SQL (`GRANT`/`REVOKE`) sont définis en complément de RLS.
- Les vues, fonctions SQL, triggers, fichiers Storage et fonctions serveur sont examinés pour détecter les contournements.
- La clé Supabase `service_role` ou toute clé secrète équivalente reste exclusivement côté serveur et est utilisée au strict minimum.
- Des tests négatifs démontrent qu'un utilisateur du tenant A ne peut pas lire, insérer, modifier ou supprimer des données du tenant B.

## 5.3 États d'organisation

- `pending` : demande soumise / vérification en cours ; aucun backoffice actif.
- `needs_information` : justificatifs ou informations supplémentaires requis.
- `approved` : demande acceptée ; provisionnement en cours.
- `active` : espace opérationnel.
- `suspended` : accès opérationnel suspendu selon procédure et motif.
- `disabled` ou `archived` : espace fermé/archivé, selon politique de conservation.
- `rejected` : demande refusée.

## 5.4 Sous-domaines

Exemple cible : `organisation.voteplateforme.tld`. Le routage des sous-domaines doit être abstrait de la logique métier. En développement, prévoir un mode localhost, un paramètre d'hôte contrôlé ou un chemin de démonstration documenté. Le domaine personnalisé, le DNS et les certificats ne doivent pas être considérés comme gratuits ou disponibles avant vérification.

# 6. Portail public et intégration des organisations

## 6.1 Portail public

Pages : Accueil, Solutions, Fonctionnement, Sécurité, À propos, Aide/FAQ, Contact, Connexion, Demander un espace, pages légales et politiques de confidentialité.

Le portail doit expliquer clairement le service, les publics concernés, le fonctionnement général, les limites et les principes de sécurité. Il ne doit pas prétendre à une certification qui n'existe pas.

## 6.2 Demande d'espace

Parcours unique « Demander un espace » avec deux modes :

- **Demande simple :** collecte initiale des informations essentielles ;
- **Demande détaillée :** collecte complémentaire et préconfiguration de l'espace.

Aucune organisation ni aucun backoffice n'est activé avant approbation. Le simple dépôt d'un formulaire ne crée pas un tenant exploitable.

## 6.3 Vérification obligatoire

Toute organisation, quel que soit son type ou sa taille, est vérifiée avant approbation. Le super administrateur peut :

- consulter le dossier ;
- demander des justificatifs ;
- demander des compléments ;
- approuver ou refuser avec motif ;
- consulter l'historique de décision.

Chaque décision est datée, attribuée à un acteur et auditée. Les documents justificatifs disposent de permissions restrictives, d'une durée de conservation définie et d'un accès journalisé.

## 6.4 États de demande

`draft` → `submitted` → `under_review` → `needs_information` → retour à `under_review` → `approved` ou `rejected` → `provisioning` → `active`.

Les transitions invalides sont refusées côté serveur. Une demande refusée conserve son historique selon la politique de conservation.

## 6.5 Provisionnement

Après approbation uniquement : créer le tenant, générer un slug contrôlé, réserver/associer le sous-domaine lorsque disponible, créer la configuration initiale, inviter le premier administrateur et envoyer un email d'activation. Le provisionnement doit être idempotent et reprendre proprement après erreur.

# 7. Comptes, authentification et sécurité des sessions

- Pas d'inscription publique classique.
- Les comptes sont créés via invitation email par un utilisateur habilité ou par le flux d'approbation.
- Connexion email + mot de passe.
- Vérification email selon les capacités Supabase et la configuration retenue.
- Réinitialisation de mot de passe avec jeton à durée limitée, usage unique et messages anti-énumération de comptes.
- Déconnexion et révocation des sessions/appareils.
- Gestion des invitations expirées, révoquées et déjà utilisées.
- Protection contre brute force, credential stuffing, CSRF, XSS, injections et abus des endpoints.
- Cookies de session sécurisés, HttpOnly, Secure en production, SameSite approprié.
- Utiliser les guides SSR Supabase officiels et vérifier les versions/API en vigueur à l'implémentation.

## 7.1 MFA

MFA obligatoire par TOTP pour le super administrateur, l'administrateur d'organisation et les gestionnaires ayant des permissions sensibles. L'auditeur est soumis au MFA selon le niveau d'accès ; le système peut l'imposer par politique. L'électeur dispose d'un MFA facultatif ou activable par organisation.

Prévoir enrôlement, QR code, vérification initiale, challenge à la connexion, codes de récupération si pris en charge par la stratégie retenue, révocation, ré-enrôlement et journalisation des changements MFA. Un écran MFA ne suffit pas : les actions et endpoints sensibles doivent vérifier le niveau d'assurance de session côté serveur et, quand possible, en RLS.

# 8. Gestion des organisations et personnalisation

Chaque organisation peut configurer, dans des limites de design communes :

- nom officiel et nom d'affichage ;
- logo ;
- couleurs principales et secondaires encadrées ;
- image de couverture ;
- présentation et description ;
- sous-domaine ;
- certains textes institutionnels et contenus de pages publiques ;
- langue par défaut ;
- identité d'expéditeur et configuration Gmail autorisée.

La personnalisation ne peut pas casser la hiérarchie, la lisibilité, la typographie fonctionnelle, l'accessibilité, les composants critiques ou les parcours de vote. Les couleurs sont validées par des contrôles de contraste. Les logos et images ont des contraintes de format et de poids.

# 9. Internationalisation FR/EN

Le français et l'anglais sont disponibles dès le lancement sur le portail, les demandes, l'authentification, l'espace électeur, les deux backoffices, les notifications, les emails, les erreurs, les confirmations et les rapports pertinents.

- Sélecteur de langue accessible sans déconnexion.
- Langue mémorisée au niveau utilisateur.
- Langue par défaut définie par organisation.
- Préférence utilisateur prioritaire sur la langue par défaut de l'organisation.
- Dates, heures, nombres et pourcentages formatés selon la locale.
- Contenus électoraux rédigés séparément dans les deux langues lorsque l'organisation souhaite les proposer.
- Aucune traduction automatique non validée n'est présentée comme officielle.
- Les clés de traduction sont stables, testées et ne sont pas disséminées dans les composants.

# 10. Backoffice organisation

## 10.1 Navigation

Navigation hybride : sidebar gauche rétractable pour les rubriques et barre supérieure pour recherche globale (selon permissions), fil d'Ariane, notifications, langue, profil et actions contextuelles. Sur mobile : navigation adaptée, drawer ou navigation secondaire compacte ; pas de sidebar desktop simplement écrasée.

## 10.2 Rubriques

- Vue d'ensemble ;
- Élections : scrutins, candidats, listes électorales, résultats et seconds tours ;
- Population électorale ;
- Administration : membres, rôles, permissions et invitations ;
- Communication : connexion Gmail, modèles, envois et historique ;
- Rapports et audit ;
- Paramètres : profil, branding, sous-domaine, langues, sécurité.

Le contenu est conditionné aux permissions réelles. Un utilisateur ne doit pas voir des fonctionnalités qu'il ne peut pas utiliser, tout en gardant une compréhension claire des responsabilités qui lui sont déléguées.

## 10.3 Tableau de bord

Dashboard hybride : indicateurs essentiels, actions prioritaires, scrutins actifs/à venir, échéances, alertes, activité récente et raccourcis pertinents. Graphiques uniquement lorsqu'ils permettent une décision ou révèlent une évolution utile. Pas de KPI décoratifs.

# 11. Backoffice central

Fonctions :

- tableau de bord de supervision ;
- demandes d'organisations et vérification ;
- organisations actives/suspendues/archivées ;
- comptes et administrateurs de plateforme ;
- vue de santé technique des scrutins sans accès au contenu secret des bulletins ;
- incidents et alertes ;
- suivi Gmail et notifications ;
- sécurité, journaux et audits ;
- rapports de plateforme ;
- configuration globale et langues.

Le super administrateur peut suspendre une organisation selon une procédure documentée et auditée. Il ne peut pas éditer un bulletin ou modifier un résultat électoral.

# 12. Cycle de vie d'un scrutin

## 12.1 États recommandés

`draft` → `ready_for_review` → `approved` → `scheduled` → `open` → `paused` si nécessaire → `closed` → `counting` → `results_under_review` → `results_provisional` ou `results_final` → `published` → `archived`.

Des états annexes `cancelled` ou `invalid_quorum` peuvent exister, avec transitions contrôlées et motifs obligatoires. Le modèle doit expliciter les transitions, rôles autorisés, effets et notifications. Un scrutin ne doit pas être ouvert avec une configuration incomplète.

## 12.2 Deux modes de création

- **Assistant guidé :** infos générales, candidats, électeurs, règles, calendrier, vérification/aperçu.
- **Formulaire rapide :** création directe pour un utilisateur expérimenté.

Les deux modes utilisent le même moteur métier et les mêmes validations. Sauvegarde automatique, retour aux étapes sans perte, erreurs explicites, brouillon persistant et blocage si une condition obligatoire manque.

## 12.3 Informations d'un scrutin

- titre et description FR/EN ;
- organisation et périmètre ;
- type : choix unique pour V1 ;
- nombre de sièges/candidats selon le mode initial ;
- dates/heures d'ouverture et de fermeture, fuseau explicite ;
- liste électorale associée et version figée ;
- quorum facultatif et seuil ;
- vote blanc facultatif ;
- règle d'égalité ;
- visibilité des résultats ;
- texte de présentation/instructions ;
- responsable(s) et approbateurs selon permissions ;
- paramètres de communication.

## 12.4 Règles figées

Les règles électorales sont fixées et présentées avant ouverture. Après ouverture, toute modification d'une règle essentielle est interdite ou soumise à une procédure exceptionnelle clairement définie, avec justification, autorisation, journalisation et analyse d'impact. Les données et règles figées doivent être versionnées et pouvoir être prouvées lors d'un audit.

# 13. Candidats

- Création et modification pendant la période autorisée.
- Nom, photo facultative, biographie et présentation FR/EN.
- Ordre d'affichage explicite et stable.
- Contrôle des formats d'image, poids et contenus.
- Validation avant gel du scrutin.
- Après ouverture, aucune modification silencieuse du candidat ou de son ordre.
- Toute correction exceptionnelle doit suivre une procédure d'incident et être auditée.

# 14. Population électorale et liste électorale

- Import CSV avec aperçu, détection des colonnes, validation, rapport d'erreurs et déduplication.
- Ajout/modification manuels selon permissions.
- Invitations individuelles et relances contrôlées.
- Statut d'éligibilité, statut d'invitation et statut de participation conservés séparément.
- Une liste est préparée par un responsable habilité, puis vérifiée et validée par un administrateur habilité.
- Après validation, la liste est gelée et versionnée avant ouverture.
- Toute modification après gel est exceptionnelle, justifiée, autorisée, limitée et auditée.
- Les changements après ouverture sont soumis à une analyse de sécurité et d'équité ; aucune modification de routine n'est acceptée.
- Le décompte du quorum se base sur le nombre d'électeurs éligibles de la liste gelée.

Les fichiers importés contiennent des données personnelles : accès restreint, stockage privé, validation stricte, taille limitée, antivirus/inspection si possible et suppression des fichiers temporaires après traitement selon politique.

# 15. Parcours de vote électeur

Parcours cible :

1. L'électeur s'authentifie.
2. Le système vérifie l'organisation, l'éligibilité, le scrutin, la période et l'absence de participation déjà enregistrée.
3. L'écran présente le scrutin, ses règles principales, les candidats et les éventuelles options.
4. L'électeur sélectionne un candidat ; aucun choix n'est pré-coché.
5. Un écran de récapitulatif explicite distingue la sélection de la validation définitive.
6. L'électeur confirme explicitement l'action irréversible.
7. Le bulletin est transmis selon le protocole sécurisé validé.
8. Une confirmation de participation neutre est affichée ; elle ne révèle jamais le choix.

Exigences :

- aucune sélection pré-cochée ;
- distinction visuelle et textuelle entre sélectionner et voter ;
- protection contre double clic et double soumission ;
- réponse idempotente en cas de retry réseau ;
- aucune donnée du choix dans les emails, reçus, historiques personnels ou journaux ;
- confirmation qui prouve au mieux l'enregistrement/la participation selon le protocole, sans révéler le choix ;
- reprise claire en cas de réseau interrompu, sans indiquer à tort qu'un vote est enregistré.

# 16. Secret du vote et architecture électorale

C'est le domaine le plus critique. La solution doit distinguer au minimum :

1. **Identité et éligibilité :** savoir qui est authentifié et a droit de participer.
2. **Droit de participation :** empêcher qu'un électeur vote deux fois.
3. **Bulletin :** recevoir et compter le choix sans conserver l'identité civile de l'électeur.

Une simple séparation de tables ou le retrait du champ `user_id` ne prouve pas l'anonymat. Les horodatages, journaux, identifiants de requête, traces applicatives, métadonnées et accès administrateurs peuvent permettre une corrélation.

Exigences minimales de conception :

- séparation des domaines identité/éligibilité et urne/bulletins ;
- identifiants et journaux différents, sans identifiant de compte dans l'urne ;
- minimisation et traitement des horodatages et métadonnées pouvant faciliter une corrélation ;
- protection de l'intégrité des bulletins et des opérations de comptage ;
- empêchement technique de double participation ;
- accès administratif au strict minimum ;
- protocole de vérifiabilité et de dépouillement documenté ;
- modèle de menace couvrant administrateur malveillant, équipe technique, compromission de compte, compromission de navigateur, fuite de base, corrélation temporelle et attaque multi-tenant.

**Interdiction absolue :** ne pas inventer de cryptographie, de signature aveugle, de chiffrement homomorphe, de protocole de mélange ou de vérification maison. L'équipe doit comparer des protocoles et implémentations éprouvés, documenter le choix, faire effectuer une revue spécialisée indépendante et intégrer le résultat via un adaptateur isolé. La première version du dépôt peut contenir un mode sandbox clairement marqué `NON_PRODUCTION`, sans prétendre à une confidentialité électorale réelle.

**Gate de production :** aucun vote réel ne peut être activé avant validation du protocole, revue du code, tests de sécurité, audit externe indépendant et correction vérifiée des vulnérabilités critiques et élevées.

# 17. Quorum, vote blanc, égalité et second tour

## 17.1 Quorum

Le quorum est facultatif et configurable par scrutin. Si activé : seuil en pourcentage du nombre d'électeurs éligibles inscrit dans la version gelée de la liste. Il est fixé avant ouverture, immuable après ouverture et évalué à clôture. En cas de quorum non atteint, le scrutin est déclaré non valide pour défaut de quorum ; les bulletins déjà enregistrés sont conservés et ne sont pas supprimés.

Le dénominateur, la règle d'arrondi et la définition de la participation doivent être explicites, affichés avant ouverture et testés. Un bulletin blanc valablement soumis compte comme participation si la règle du scrutin le prévoit ; cette règle est fixée avant ouverture.

## 17.2 Vote blanc

Le vote blanc est facultatif. S'il est activé, il apparaît comme option explicite et est comptabilisé séparément des votes candidats. Il ne doit jamais être confondu avec l'abstention, l'absence de réponse ou un bulletin invalide. La règle est fixée avant ouverture et figée ensuite.

## 17.3 Égalité

La règle en cas d'égalité est choisie avant le scrutin et montrée aux électeurs : second tour, maintien ex aequo si le règlement l'autorise, ou autre procédure réglementaire documentée. Elle est figée à l'ouverture et auditée.

## 17.4 Second tour assisté

Après clôture et vérification des résultats, le système détecte la situation d'égalité selon la règle configurée et prépare un nouveau scrutin lié au premier. Un administrateur habilité vérifie et confirme le lancement. Le second tour possède ses propres dates, règles, liste éligible et paramètres. Les électeurs concernés sont informés sans divulguer leur choix précédent.

# 18. Dépouillement, résultats et publication

## 18.1 Deux niveaux d'interface

**Électeurs :** résultats publiés uniquement, avec nom du scrutin et de l'organisation, état provisoire/définitif, total de voix, participation, résultats candidats, pourcentages, graphiques utiles, votes blancs si applicables et date de publication.

**Administrateurs habilités :** statistiques supplémentaires, vérifications, comparaisons avec les règles, exports PDF/CSV/Excel, historique des validations/publications et états d'audit autorisés.

Les résultats provisoires ne sont accessibles qu'aux rôles et permissions habilités. Une validation humaine est nécessaire avant publication. Le portail public ou l'espace électeur n'affiche que ce qui a été publié.

## 18.2 Visibilité

Avant ouverture, chaque scrutin définit l'une des options suivantes :

- résultats réservés aux électeurs authentifiés autorisés ;
- résultats publics par lien sans connexion.

Le changement après ouverture est contrôlé et audité. Aucun résultat ne peut exposer des données personnelles ni des détails permettant de compromettre le secret du vote.

## 18.3 Intégrité

Aucun administrateur, y compris un super administrateur de la plateforme, ne peut modifier discrètement des bulletins ou un résultat calculé. Toute correction relève d'une procédure documentée, traçable, vérifiable et compatible avec le protocole électoral. Les résultats sont calculés à partir des bulletins selon une procédure déterministe et testée.

# 19. Notifications, Gmail et communication

## 19.1 Canaux initiaux

- Notifications internes.
- Emails via Gmail API.
- Pas de push smartphone au lancement ; prévoir une architecture extensible.

La réussite du vote ne dépend jamais de Gmail. Un défaut d'email ne doit pas annuler ou bloquer un bulletin confirmé. Les envois échoués peuvent être retentés selon une politique idempotente.

## 19.2 Gmail

- Intégration via Gmail API et OAuth 2.0 ; jamais de mot de passe Gmail stocké.
- Un compte Gmail central de la plateforme.
- Possibilité pour chaque organisation de connecter son propre compte Gmail.
- Mode d'expéditeur configurable par organisation ; choix éventuel par type de communication.
- Scopes OAuth les plus restreints possibles, adaptés à l'envoi requis.
- Stockage chiffré des jetons d'accès/refresh côté serveur, rotation, révocation et gestion de consentement.
- Gestion des quotas, erreurs, expirations, déconnexions et renouvellements.
- Historique des envois : demandé, accepté par API, livré/rebondi si le fournisseur fournit l'information ; ne jamais assimiler « accepté par Gmail » à « arrivé dans la boîte de réception ».

## 19.3 Modèles d'emails

Modèles professionnels prédéfinis et personnalisables : logo, couleurs encadrées, texte autorisé, signature et éléments de présentation.

Modèles prévus : invitation, activation, réinitialisation, ouverture du scrutin, rappel, confirmation de participation neutre, clôture, publication des résultats, alerte et demande de compléments.

Les clauses de sécurité et textes obligatoires sont protégés contre suppression/altération. Prévisualisation avant envoi. Les emails ne révèlent jamais le candidat choisi ni le contenu du bulletin.

# 20. Audit, fraude et supervision

- Journal d'audit append-only autant que possible, avec protections contre modification/suppression et contrôles d'intégrité.
- Acteur, action, cible, tenant, horodatage, résultat, motif et contexte minimal utile.
- Pas de contenu de bulletin ni de choix électoral dans les journaux.
- Détection des connexions inhabituelles, tentatives répétées, changements de permissions, opérations sensibles et anomalies de flux.
- Alertes aux responsables habilités.
- Double validation pour opérations critiques : ouverture selon configuration, modification exceptionnelle de liste gelée, suspension/reprise, publication, révocation d'administrateur et autres opérations définies par politique.
- Les interventions des équipes techniques sont également journalisées.
- Aucun accès de support ou de super administrateur ne doit devenir un moyen de consulter les choix individuels.
- Les événements de sécurité sont séparés des événements métier et les durées de conservation sont définies.

# 21. Rapports et exports

- Exports PDF, CSV et Excel selon permissions.
- Les exports sont générés côté serveur, temporaires, protégés, journalisés et expirent.
- Les exports publics ne contiennent que les résultats officiellement publiés.
- Les exports administratifs peuvent contenir des données nominatives d'éligibilité uniquement lorsque strictement nécessaire et autorisé ; jamais le lien identité-choix.
- Rapports d'activité, de participation, de validation, d'incident, de communication et d'audit.
- Marquer la date, le fuseau, l'état des résultats et la version du scrutin dans chaque rapport.

# 22. Direction UI/UX et design system

## 22.1 Direction visuelle

Direction validée : **hybride institutionnelle et SaaS moderne**. L'objectif est une interface premium, lisible, calme, reconnaissable et crédible. Les références d'images vues précédemment étaient des moodboards exploratoires, pas une référence de qualité finale.

Palette exploratoire non définitive : bleu nuit `#14283F`, vert pétrole `#176B66`, fond `#F5F7F8`, bordures `#DCE4EA`, accent chaud `#D49A43`. La palette finale doit être testée en contraste et en modes d'état.

La typographie, la densité et les espacements doivent établir une hiérarchie nette. Éviter les dégradés violets, l'esthétique « dashboard IA », les cartes répétitives, les coins excessivement arrondis, les ombres lourdes et les animations sans fonction.

## 22.2 Quatre expériences

- **Portail public :** expérience SaaS institutionnelle, éditoriale, informative et rassurante.
- **Électeur :** interface minimaliste, concentrée sur le scrutin, le vote et la confirmation ; mobile-first strict.
- **Backoffice organisation :** outil de travail dense mais maîtrisé ; tableaux efficaces, filtres, actions contextuelles, états clairs.
- **Backoffice central :** supervision et contrôle opérationnel, sans accès indu au contenu secret des votes.

## 22.3 Règles de conception

- Mobile-first pour chaque parcours, priorité extrême au parcours électeur.
- Tables desktop transformées en vues cartes/lignes adaptées sur petits écrans, sans défilement horizontal inutile.
- États chargement, vide, succès, erreur, interdit, suspension, expiration et hors-ligne traités explicitement.
- Accessibilité WCAG 2.2 AA comme cible de conception et de test, sans prétendre à une conformité certifiée avant audit.
- Navigation clavier, focus visible, labels, erreurs associées, contrastes et tailles tactiles.
- Animations rares, fonctionnelles, respect de `prefers-reduced-motion`.
- Pas de données factices présentées comme réelles ; les environnements de démonstration sont identifiés.
- Les composants partagés ne doivent pas uniformiser les quatre expériences au point de les rendre identiques.

# 23. Architecture technique recommandée

## 23.1 Choix principal

**Next.js App Router + TypeScript strict + Supabase.** Next.js est préféré à une application React/Vite séparée pour réunir le portail public, les espaces protégés, les routes serveur, le rendu côté serveur et l'internationalisation dans un seul projet. La documentation Next.js distingue les Server Components, Client Components, Route Handlers et la gestion des locales ; la documentation Supabase propose un quickstart Next.js et des guides SSR. Vérifier systématiquement les versions et les API officiellement supportées au moment de l'installation.

## 23.2 Stack de départ

- Next.js stable compatible App Router ; version exacte vérifiée lors du bootstrap.
- React fourni/compatible avec cette version de Next.js.
- TypeScript strict.
- Supabase : PostgreSQL, Auth, Storage privé, fonctions seulement si le besoin le justifie.
- `@supabase/supabase-js` et intégration SSR officiellement recommandée et isolée dans un adaptateur ; vérifier le statut et les changements de l'API `@supabase/ssr` avant installation.
- Tailwind CSS pour les tokens et styles utilitaires.
- Composants accessibles de type shadcn/ui, copiés/adaptés avec discernement, sans adopter un template générique.
- Zod pour la validation de frontières et de schémas.
- React Hook Form si cela simplifie les formulaires complexes.
- `next-intl` ou solution i18n maintenue compatible App Router, choisie après vérification des versions.
- TanStack Table uniquement pour les tableaux complexes nécessitant tri/filtre/visibilité.
- Vitest pour tests unitaires ; Playwright pour tests E2E ; tests SQL/pgTAP et tests RLS pour la base.
- pnpm comme gestionnaire de paquets, lockfile versionné.
- Supabase CLI pour migrations reproductibles et tests de base.

Ne pas ajouter un ORM ou une couche d'abstraction lourde par réflexe. Le typage Supabase généré depuis le schéma et les requêtes explicites sont préférés au départ. Toute nouvelle dépendance doit avoir une raison, une licence compatible et un coût nul.

## 23.3 Architecture applicative

Architecture modulaire par domaine métier, avec séparation UI / application / domaine / infrastructure. Les composants visuels ne contiennent pas les règles électorales. Les Server Actions et Route Handlers valident leurs entrées, authentifient l'acteur, résolvent le tenant et vérifient les permissions avant d'effectuer une mutation.

La logique sensible est centralisée dans des services et fonctions SQL audités. Les appels directs depuis le navigateur ne doivent pas pouvoir contourner les règles. La base demeure la dernière ligne de défense via contraintes, transactions, privilèges et RLS.

## 23.4 Architecture de données

Domaines indicatifs :

- plateforme : `organizations`, `organization_requests`, `organization_documents`, `domains`, `platform_settings` ;
- identité/accès : `profiles`, `memberships`, `roles`, `permissions`, `role_permissions`, `member_permissions`, `invitations`, `sessions_metadata` ;
- scrutin : `elections`, `election_translations`, `election_rules`, `election_state_transitions`, `candidates`, `candidate_translations` ;
- électorat : `electoral_lists`, `electoral_list_versions`, `electors`, `eligibility_records`, `imports`, `import_errors` ;
- vote : interfaces isolées pour `voting_credentials`, `ballots`, `ballot_events` uniquement selon le protocole cryptographique choisi ;
- résultats : `tallies`, `result_reviews`, `result_publications`, `runoff_links` ;
- communication : `gmail_connections`, `email_templates`, `notification_events`, `email_outbox`, `email_attempts` ;
- audit : `audit_events`, `security_events`, `incident_records` ;
- configuration : `organization_branding`, `organization_preferences`, `retention_policies`.

Cette liste est conceptuelle, pas un schéma SQL final. Les données d'identité et l'urne ne doivent pas être liées par une clé étrangère permettant de reconstruire le voteur. La conception définitive du domaine vote dépend du protocole choisi et audité.

## 23.5 Données et accès

- Migrations SQL versionnées ; aucun changement manuel non documenté en environnement partagé.
- RLS sur toute table exposée ; grants et policies testés par opération.
- Tables privées/essentielles non exposées par la Data API sans justification.
- Vues et fonctions évaluées pour les risques de bypass RLS.
- Tests d'accès autorisé et interdit, par tenant et par rôle.
- Index sur `tenant_id`, clés de recherche, états et relations utilisées.
- Contraintes uniques/étrangères et transactions sur les opérations critiques.
- Service role seulement côté serveur, secrets jamais préfixés `NEXT_PUBLIC_`.

# 24. Gratuité, hébergement et limites de l'offre gratuite

Le développement local et la démonstration doivent rester à 0 FCFA autant que possible. Utiliser Supabase Free pour un environnement de développement/démonstration, sans données réelles sensibles.

Les limites publiées actuellement par Supabase Free incluent notamment 2 projets actifs au maximum, une base de 500 MB par projet, 5 GB d'egress, 1 GB de stockage et la mise en pause des projets après une semaine d'inactivité ; les sauvegardes automatiques ne sont pas incluses comme dans les plans payants. Ces quotas peuvent changer et doivent être revérifiés avant le choix d'environnement.

Cloudflare Workers Free peut être étudié pour une démonstration de déploiement ; ses limites publiées incluent un quota de requêtes quotidiennes et une limite CPU par invocation. La compatibilité Next.js/Cloudflare doit être vérifiée au moment du déploiement. Ne pas choisir un adaptateur expérimental uniquement pour afficher un hébergement gratuit.

**Conséquence :** l'objectif de disponibilité 99,9 %, la reprise en moins d'une heure, les sauvegardes fiables et les sous-domaines personnalisés sont des exigences produit, pas une promesse réalisable automatiquement avec le plan gratuit. Aucune élection réelle ne doit dépendre d'une configuration gratuite sans sauvegarde, supervision, support et capacité de restauration appropriés. Ne jamais activer le paiement automatique, un dépassement de quota ou une offre payante sans accord explicite.

# 25. Sécurité, disponibilité et reprise après incident

## 25.1 Exigences validées

- Disponibilité cible initiale : 99,9 %.
- Perte maximale de bulletins confirmés : 0.
- Objectif de reprise : moins d'une heure, sous réserve de l'infrastructure choisie et de tests réalistes.
- Sauvegardes automatiques, chiffrées, régulières et protégées.
- Tests de restauration documentés et répétés.
- Surveillance, alertes, protection contre les pics de trafic et attaques DDoS.
- Procédure d'incident avec responsabilités et communication.
- Suspension contrôlée d'un scrutin si son intégrité ou son équité est menacée.
- Pas de prolongation automatique lors d'une panne : décision humaine habilitée, motivée, auditée et appliquée selon une règle prédéfinie.

Les objectifs doivent être mesurés : distinguer RPO (perte de données acceptable) et RTO (temps de reprise). Le RPO de bulletins confirmés visé est zéro, ce qui exige une architecture et des transactions adaptées ; ne pas le déclarer atteint sans test de panne et preuve.

## 25.2 Audit indépendant

Audit de sécurité indépendant obligatoire avant toute mise en production électorale réelle. Périmètre : architecture, isolation tenant, authentification, autorisations, RLS, code, dépendances, API, infrastructure, cryptographie, intégrité, gestion des clés, confidentialité, tests d'intrusion et procédures opérationnelles.

Aucune mise en production réelle si une vulnérabilité critique ou élevée reste non corrigée et non revérifiée. Un rapport, un plan de remédiation et les preuves de correction sont conservés.

## 25.3 Continuité

Définir runbooks, personnes habilitées, stratégie de sauvegarde hors du projet principal lorsque possible, restauration dans un environnement propre, rotation des secrets, retour arrière de version et procédure d'arrêt contrôlé. Tester la reprise et les procédures de scrutin interrompu.

# 26. Protection des données et conformité

La plateforme sera initialement conçue depuis le Sénégal et peut traiter des informations personnelles d'électeurs, de membres, de candidats et de représentants d'organisations. La loi sénégalaise n° 2008-12 du 25 janvier 2008 relative à la protection des données à caractère personnel et les formalités de la Commission de Protection des Données Personnelles (CDP) doivent être examinées par une personne compétente avant tout traitement réel.

Le dossier de conformité doit couvrir : finalités, base juridique, catégories de données, minimisation, durée de conservation, droits des personnes, sous-traitants, transferts internationaux, sécurité, information, suppression/archivage et procédure de violation de données. La CDP publie des formalités distinctes, notamment déclaration normale et demande d'autorisation pour certains traitements sensibles ou transferts vers un pays tiers. L'applicabilité exacte dépend de la configuration réelle, des données et des flux ; ne pas conclure automatiquement qu'une déclaration ou autorisation est suffisante.

Pour chaque organisation, définir les responsabilités respectives de responsable de traitement et sous-traitant, les clauses contractuelles, les instructions et les modalités de gestion des demandes de droits.

Aucune donnée réelle d'élection ne doit être importée avant examen juridique/réglementaire et validations requises. Ce cahier des charges ne constitue pas un avis juridique.

# 27. Qualité, tests et critères d'acceptation transverses

Chaque fonctionnalité livrée doit satisfaire au minimum :

- critères d'acceptation fonctionnels documentés ;
- validation de formulaire côté client et serveur ;
- contrôle de permissions serveur ;
- contrôle RLS sur les données concernées ;
- tests unitaires des règles métier ;
- tests d'intégration des transitions et transactions ;
- tests E2E des parcours critiques ;
- tests de refus et d'accès interdit ;
- comportement FR/EN complet ;
- états de chargement, erreur, vide et succès ;
- accessibilité clavier et contraste vérifiés ;
- journalisation sans donnée sensible superflue ;
- documentation de fonctionnalité et de configuration actualisée.

Les tests sensibles doivent couvrir notamment : double participation, double soumission, simultanéité de deux requêtes, gel de liste, seuil de quorum, vote blanc, égalité, second tour, visibilité des résultats, suspension, reprise, publication, révocation de permission et isolation entre deux tenants.

# 28. Structure de dépôt recommandée

```text
/
├── AGENTS.md
├── CLAUDE.md                      # adaptateur court vers AGENTS.md si utile
├── GEMINI.md                      # adaptateur court vers AGENTS.md si utile
├── README.md
├── STATUS.md
├── CHANGELOG.md
├── CONTRIBUTING.md
├── SECURITY.md
├── .env.example
├── .gitignore
├── .gitmessage
├── package.json
├── pnpm-lock.yaml
├── src/
│   ├── app/[locale]/               # routes et layouts App Router
│   ├── components/                 # composants partagés réellement génériques
│   ├── features/                   # modules verticaux par domaine
│   ├── lib/                        # infrastructure transversale
│   ├── styles/
│   └── types/
├── supabase/
│   ├── migrations/
│   ├── seed.sql
│   ├── tests/
│   └── config.toml
├── tests/
│   ├── unit/
│   ├── integration/
│   ├── e2e/
│   └── security/
├── docs/
│   ├── product/
│   ├── architecture/adr/
│   ├── security/
│   ├── data-model/
│   ├── features/<feature>/
│   ├── roadmap/sprints/
│   ├── operations/runbooks/
│   ├── compliance/
│   └── ai/prompts/
└── scripts/
```

Organisation recommandée d'un domaine `src/features/<domain>/` : `components/`, `schemas/`, `services/`, `queries/`, `actions/`, `types/`, `tests/` et `index.ts` lorsque utile. Éviter les dossiers vides décoratifs. Les migrations Supabase restent la source de vérité du schéma.

# 29. Plan de réalisation détaillé — 34 sprints

Les sprints sont des unités de livraison, pas une estimation calendaire. Un sprint ne se ferme que lorsque ses critères d'acceptation, tests et documents sont à jour. Chaque sprint dépend des précédents ; les sujets de sécurité électorale peuvent nécessiter des recherches et revues externes.

## Phase A — Cadrage exécutable et fondations

### Sprint 00 — Audit du dépôt et initialisation documentaire
- Inspecter le dépôt, l'environnement et les fichiers existants avant toute modification.
- Créer/mettre à jour `AGENTS.md`, `README.md`, `STATUS.md`, `CHANGELOG.md`, `CONTRIBUTING.md`, `SECURITY.md` et les prompts de session.
- Importer le cahier des charges comme référence versionnée.
- Définir les conventions de nommage, commits, branches, tests et décisions ADR.
- **Acceptation :** un nouvel agent peut comprendre l'état du projet en lisant les fichiers de reprise sans relire les conversations.

### Sprint 01 — Bootstrap Next.js et outillage
- Créer Next.js App Router avec TypeScript strict, Tailwind et pnpm.
- Installer uniquement les dépendances validées et gratuites.
- Configurer lint, format, scripts `dev`, `build`, `typecheck`, `test`.
- Créer `.env.example` sans secret et vérifier `.gitignore`.
- **Acceptation :** application démarre localement, build et vérifications passent, aucun secret n'est commité.

### Sprint 02 — Design system initial
- Tokens couleur, typographie, espacements, rayons, ombres et focus.
- Boutons, champs, labels, alertes, badges d'état, dialogues, tableaux de base, navigation.
- Contraste et composants clavier accessibles.
- **Acceptation :** page de démonstration du système, tokens documentés, aucun style décoratif superflu.

### Sprint 03 — Internationalisation FR/EN
- Routage locale, dictionnaires, sélection de langue, formatage date/heure/nombres.
- Tests de clés manquantes et navigation bilingue.
- **Acceptation :** aucune chaîne système majeure codée en dur dans les pages initiales.

### Sprint 04 — Architecture Supabase et migrations
- Configurer projet local ou projet distant de développement gratuit.
- Créer adaptateurs client/serveur, typage généré et gestion d'erreurs.
- Première migration, conventions SQL, test DB.
- **Acceptation :** connexion serveur/client correctement séparée ; clés secrètes absentes du bundle navigateur.

## Phase B — Identité, tenant et contrôle d'accès

### Sprint 05 — Modèle organisation/tenant
- Tables organisation, domaine/slug, états, préférences et branding.
- Résolution tenant côté serveur sans faire confiance à l'URL seule.
- Contraintes d'intégrité et premiers tests de collision de slug.
- **Acceptation :** le contexte tenant est explicite et testé.

### Sprint 06 — Isolation RLS et tests inter-tenant
- RLS, grants/revokes, politiques par opération, fonctions de support minimales.
- Tests autorisé/refusé pour tenant A et B.
- Revue des vues, fonctions et Storage.
- **Acceptation :** aucune table exposée sans RLS/grants appropriés ; tests négatifs verts.

### Sprint 07 — Authentification invitation-only
- Connexion, déconnexion, invitation, acceptation, réinitialisation, expiration et révocation.
- Messages sécurisés anti-énumération.
- **Acceptation :** aucun endpoint d'inscription publique classique ; tests de cycle de vie des invitations.

### Sprint 08 — MFA et sessions
- TOTP, enrôlement, challenge, vérification, révocation et niveau d'assurance.
- Règles obligatoires pour comptes sensibles.
- **Acceptation :** endpoints sensibles refusent une session insuffisamment forte.

### Sprint 09 — Rôles et permissions
- Cinq rôles prédéfinis et permissions granulaires.
- Permissions personnalisées limitées par celles de l'administrateur.
- Attributions au niveau organisation et au niveau scrutin.
- **Acceptation :** matrice testée, auditeur en lecture seule, gestionnaire sans privilèges implicites d'administrateur.

### Sprint 10 — Backoffice central initial
- Shell central, navigation, supervision des organisations et état système.
- **Acceptation :** accès réservé au super administrateur, audit des actions.

## Phase C — Demandes et espaces organisationnels

### Sprint 11 — Portail public
- Pages principales, navigation, responsive, FR/EN, pages légales provisoires.
- **Acceptation :** parcours public accessible, textes de démonstration identifiés.

### Sprint 12 — Demande d'espace
- Formulaire simple et détaillé, brouillon, validations, pièces justificatives.
- Upload privé et contrôles de fichier.
- **Acceptation :** soumission n'active aucun tenant ni backoffice.

### Sprint 13 — Vérification et décision
- File de demandes, demandes de compléments, approbation/refus avec motif.
- Journal d'audit et historique.
- **Acceptation :** transitions contrôlées et décision traçable.

### Sprint 14 — Provisionnement idempotent
- Création tenant et paramètres initiaux après approbation.
- Invitation du premier administrateur.
- Reprise après échec partiel.
- **Acceptation :** aucune organisation en état actif avant provisionnement complet.

### Sprint 15 — Backoffice organisation et branding
- Shell org, navigation, profil, identité visuelle, préférences, langue.
- **Acceptation :** isolation tenant vérifiée et rendu personnalisé sans casser les règles design.

### Sprint 16 — Membres et délégation
- Invitations, rôles, permissions, révocation, liste des membres, MFA status.
- **Acceptation :** contrôle des privilèges, événements auditables.

## Phase D — Gestion des scrutins

### Sprint 17 — Modèle et cycle de vie du scrutin
- États, transitions, calendrier, fuseau, validations et brouillons.
- Assistant guidé et formulaire rapide utilisant le même domaine.
- **Acceptation :** machine à états testée ; impossible d'ouvrir un scrutin incomplet.

### Sprint 18 — Candidats et contenus bilingues
- CRUD contrôlé, médias, biographies FR/EN, ordre et gel.
- **Acceptation :** changements interdits après l'étape de gel sauf procédure exceptionnelle.

### Sprint 19 — Import et gestion de l'électorat
- CSV, mapping, erreurs, doublons, édition manuelle, invitations et statuts.
- **Acceptation :** import atomique ou rapport d'échec explicite ; données tenant-isolées.

### Sprint 20 — Validation et gel de la liste
- Préparation, revue par personne habilitée, validation et version immuable.
- Procédure exceptionnelle de correction.
- **Acceptation :** le quorum se base sur une version gelée ; aucune mutation silencieuse.

### Sprint 21 — Règles de scrutin
- Quorum facultatif, vote blanc facultatif, égalité, visibilité des résultats.
- Paramètres confirmés avant ouverture et figés ensuite.
- **Acceptation :** tests limites et affichage des règles avant vote.

## Phase E — Vote, secret et résultats

### Sprint 22 — Étude et décision du protocole de vote
- Analyse de menace, comparaison de protocoles éprouvés, vérification de bibliothèques, revue spécialisée.
- Définir le modèle d'identité, credential, urne, chiffrement, dépouillement et preuve.
- ADR obligatoire et validation externe.
- **Acceptation :** protocole documenté et accepté par revue compétente ; sinon rester en sandbox.

### Sprint 23 — Adaptateur de vote sandbox
- Développer une interface isolée et un mode de test marqué non-production.
- Simuler les opérations sans exposer de données réelles.
- **Acceptation :** bannière non-production et garde-fous empêchant activation réelle sans gate documenté.

### Sprint 24 — Parcours électeur
- Accueil, détails, sélection, confirmation, soumission et accusé neutre.
- Réactivité mobile, erreurs réseau et double soumission.
- **Acceptation :** aucune confirmation mensongère ; choix absent des emails et historiques.

### Sprint 25 — Comptage et vérification
- Calcul déterministe selon protocole, quorum, bulletins blancs et égalités.
- Validation des résultats par acteurs habilités.
- **Acceptation :** tests reproductibles, preuves/versioning, aucun edit manuel direct.

### Sprint 26 — Publication et accès résultats
- Résultats provisoires/définitifs, authentifiés/publics selon règle préconfigurée.
- Exports et historique publication.
- **Acceptation :** seuls les résultats publiés sont visibles aux électeurs/public.

### Sprint 27 — Second tour assisté
- Détection égalité, préparation d'un scrutin lié, validation humaine, invitations.
- **Acceptation :** second tour distinct avec ses propres règles/dates et relation historique.

## Phase F — Communication, audit et exploitation

### Sprint 28 — Notifications internes
- Centre de notifications, préférences, événements, non-lus et permissions.
- **Acceptation :** notification n'expose pas le choix individuel.

### Sprint 29 — Gmail OAuth/API et file d'envoi
- Compte central et connexion par organisation, consentement, refresh/revoke, outbox, retry.
- **Acceptation :** l'échec email n'affecte jamais l'écriture d'un bulletin ; statut d'envoi correctement qualifié.

### Sprint 30 — Modèles de communication
- Modèles FR/EN, prévisualisation, branding encadré, clauses système verrouillées.
- **Acceptation :** tests anti-fuite du choix et historique d'envoi.

### Sprint 31 — Audit, rapports et exports
- Audit append-only, alertes, sécurité, rapports et exports autorisés.
- **Acceptation :** absence de contenu de bulletin dans les journaux ; export protégé et journalisé.

### Sprint 32 — Fiabilité et observabilité
- Monitoring, alertes, sauvegardes, restauration, runbooks, protection trafic et réponse incident.
- **Acceptation :** test de restauration documenté ; scénario de suspension/reprise exercé.

### Sprint 33 — Qualité finale, conformité et pilote sandbox
- Tests de charge, E2E multi-tenant, accessibilité, revue sécurité interne, dossier CDP/juridique, audit indépendant planifié puis exécuté avant production réelle.
- **Acceptation :** aucun défaut critique non traité ; pilote limité en sandbox ; rapport de décision Go/No-Go.

# 30. Définition du « terminé » (Definition of Done)

Une tâche est terminée uniquement si :

1. le besoin et ses critères d'acceptation sont documentés ;
2. le code est intégré sans dupliquer la logique métier ;
3. les validations serveur et permissions existent ;
4. migrations et RLS sont versionnées et testées si données concernées ;
5. tests pertinents passent ;
6. l'interface FR/EN est complète ;
7. les états d'erreur, chargement, vide et succès sont traités ;
8. l'accessibilité de base est vérifiée ;
9. aucune donnée sensible inutile n'est journalisée ;
10. docs de fonctionnalité, statut, changelog et ADR sont actualisés si nécessaire ;
11. build, typecheck, lint et tests passent ;
12. aucune dépense ou activation de service payant n'a été engagée sans accord.

# 31. Critères Go/No-Go pour les élections réelles

Une démonstration ou un pilote sandbox peut être réalisé avant ces conditions, avec données fictives uniquement. Un scrutin réel exige cumulativement :

- protocole de secret du vote sélectionné, documenté et évalué ;
- architecture d'isolation tenant vérifiée ;
- audit de sécurité indépendant effectué ;
- vulnérabilités critiques/élevées corrigées et retestées ;
- plan de sauvegarde, restauration et continuité testé ;
- monitoring et procédure d'incident opérationnels ;
- exigences de disponibilité atteintes sur l'infrastructure retenue ;
- conformité données personnelles examinée et formalités applicables accomplies ;
- procédures électorales, publication et contestation documentées ;
- tests de charge correspondant au volume prévu ;
- approbation explicite de mise en production.

# 32. Glossaire

- **Tenant :** espace logique d'une organisation dans le SaaS.
- **RLS :** Row Level Security, politique d'accès aux lignes appliquée par PostgreSQL.
- **MFA/TOTP :** authentification multi-facteur par code temporaire.
- **RPO :** quantité maximale de données qu'on accepte de perdre après incident.
- **RTO :** délai cible pour rétablir un service.
- **Quorum :** seuil de participation requis si le scrutin l'active.
- **Bulletin :** expression du vote, séparée de l'identité de l'électeur.
- **Sandbox :** environnement de démonstration non autorisé pour une élection réelle.
- **ADR :** Architecture Decision Record, note de décision d'architecture.
- **Idempotence :** répétition d'une requête sans effet métier dupliqué.

# 33. Références techniques et réglementaires à revérifier

Les liens suivants constituent les premières sources de travail. L'agent doit revérifier la version, les limites et la date des documentations avant d'appliquer une procédure.

- Next.js App Router : https://nextjs.org/docs/app
- Next.js internationalisation : https://nextjs.org/docs/app/guides/internationalization
- Supabase Next.js quickstart : https://supabase.com/docs/guides/getting-started/quickstarts/nextjs
- Supabase SSR Auth : https://supabase.com/docs/guides/auth/server-side
- Supabase Row Level Security : https://supabase.com/docs/guides/database/postgres/row-level-security
- Supabase MFA : https://supabase.com/docs/guides/auth/auth-mfa
- Supabase tarifs et limites : https://supabase.com/pricing et https://supabase.com/docs/guides/platform/billing-on-supabase
- Cloudflare Workers limites : https://developers.cloudflare.com/workers/platform/limits/
- Loi sénégalaise n° 2008-12, Archives publiques : https://www.archives.sn/docs/codes/loi-protection-donnees-a-caractere-personnel
- CDP Sénégal, formalités : https://www.cdp.sn/conformite/formalites

---

**Fin du cahier des charges.** Ce document est la référence produit de départ. Toute évolution doit être accompagnée d'une décision documentée, d'un historique et d'une mise à jour des critères d'acceptation.
