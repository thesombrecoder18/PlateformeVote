# Cahier des charges fonctionnel, UX, technique et sÃ©curitÃ©

## Plateforme SaaS de vote Ã©lectronique multi-organisations

**Version :** 1.0 â€” 3 novembre 2026  
**Statut :** socle produit validÃ© ; spÃ©cification de rÃ©fÃ©rence pour le dÃ©marrage du projet  
**Langue de travail :** franÃ§ais ; produit bilingue franÃ§ais / anglais dÃ¨s le lancement  
**Cadre technique de dÃ©part :** Next.js (React, App Router) + Supabase (PostgreSQL, Auth, Storage et fonctions lorsque nÃ©cessaires)  
**Contrainte financiÃ¨re initiale :** 0 FCFA de dÃ©penses rÃ©currentes ; offres gratuites uniquement pour le dÃ©veloppement, les tests et la dÃ©monstration, sans prÃ©tendre qu'elles suffisent Ã  une production Ã©lectorale rÃ©elle.

---

# 1. RÃ©sumÃ© exÃ©cutif

Le produit est une plateforme SaaS de vote Ã©lectronique destinÃ©e Ã  plusieurs organisations indÃ©pendantes : associations, entreprises, universitÃ©s, Ã©tablissements, syndicats, clubs, fÃ©dÃ©rations et autres structures ayant besoin d'organiser des scrutins internes.

Chaque organisation dispose d'un espace isolÃ©, identifiable par un sous-domaine lorsque le domaine et l'hÃ©bergement le permettront. La plateforme fournit quatre environnements cohÃ©rents mais distincts :

1. un portail public de prÃ©sentation et de demande d'espace ;
2. un espace Ã©lecteur simple et rassurant ;
3. un backoffice propre Ã  chaque organisation ;
4. un backoffice central rÃ©servÃ© Ã  l'Ã©quipe de la plateforme.

Le service doit privilÃ©gier la confiance, la neutralitÃ©, la simplicitÃ©, la traÃ§abilitÃ©, la confidentialitÃ© et la disponibilitÃ©. Le secret du vote est une exigence d'architecture et de sÃ©curitÃ©, pas un simple attribut d'interface ou une promesse marketing.

**DÃ©cision de cadrage essentielle :** la premiÃ¨re base de code peut inclure un mode de dÃ©monstration/sandbox et les fondations du produit. Aucun scrutin rÃ©el ne devra Ãªtre prÃ©sentÃ© comme sÃ©curisÃ© ou autorisÃ© tant que le protocole de vote secret, les contrÃ´les techniques, la conformitÃ© applicable et l'audit indÃ©pendant n'auront pas Ã©tÃ© validÃ©s.

# 2. Vision, objectifs et principes directeurs

## 2.1 Vision

Fournir un outil professionnel qui permet Ã  des organisations de prÃ©parer, administrer, suivre et publier des rÃ©sultats de scrutins en ligne, sans devoir construire leur propre infrastructure Ã©lectorale.

## 2.2 Objectifs produit

- Permettre Ã  une organisation de demander un espace, d'Ãªtre vÃ©rifiÃ©e, puis d'Ãªtre activÃ©e.
- Donner aux organisations des outils de prÃ©paration et d'administration des scrutins.
- Proposer aux Ã©lecteurs un parcours mobile-first, comprÃ©hensible et sans ambiguÃ¯tÃ©.
- PrÃ©server l'anonymat du bulletin et l'intÃ©gritÃ© du dÃ©pouillement.
- Fournir des rÃ©sultats lisibles selon des rÃ¨gles de publication dÃ©finies avant le scrutin.
- Assurer une isolation stricte entre organisations.
- Maintenir une traÃ§abilitÃ© des actions administratives sans journaliser le choix de vote.
- ÃŠtre bilingue franÃ§ais/anglais dÃ¨s le lancement.
- Construire une base modulaire, testable et transmissible entre diffÃ©rents agents de dÃ©veloppement.

## 2.3 Principes non nÃ©gociables

1. **Secret du vote :** aucune interface, table, journal ou fonction administrative ne doit permettre de relier directement un bulletin Ã  l'identitÃ© de l'Ã©lecteur.
2. **Isolation multi-tenant :** une organisation ne doit jamais pouvoir lire ou modifier les donnÃ©es d'une autre organisation.
3. **Moindre privilÃ¨ge :** chaque personne ne reÃ§oit que les permissions nÃ©cessaires.
4. **SÃ©paration des responsabilitÃ©s :** prÃ©parer, vÃ©rifier, approuver, ouvrir et publier peuvent relever de personnes distinctes selon les permissions.
5. **TraÃ§abilitÃ© :** les actions sensibles sont auditables ; les journaux ne contiennent jamais le choix exprimÃ©.
6. **Pas de mutation silencieuse :** une opÃ©ration sensible doit Ãªtre contrÃ´lÃ©e, justifiÃ©e et journalisÃ©e.
7. **RÃ©silience :** l'enregistrement confirmÃ© d'un bulletin ne doit pas Ãªtre perdu lors d'une panne applicative.
8. **Bilinguisme rÃ©el :** le franÃ§ais et l'anglais couvrent les quatre espaces, les messages, les erreurs et les contenus systÃ¨me.
9. **Mobile-first :** l'expÃ©rience Ã©lecteur est prioritairement conÃ§ue pour smartphone.
10. **SobriÃ©tÃ© :** pas d'effets IA gÃ©nÃ©riques, de dÃ©gradÃ©s violets, d'animations dÃ©coratives, de cartes inutiles ou de graphiques sans valeur opÃ©rationnelle.
11. **GratuitÃ© initiale :** aucune dÃ©pendance payante n'est acceptÃ©e sans dÃ©cision explicite. Une limite gratuite ne doit jamais Ãªtre masquÃ©e.
12. **HonnÃªtetÃ© de sÃ©curitÃ© :** un prototype, un test automatisÃ© ou une bonne pratique ne constituent pas Ã  eux seuls une certification de sÃ©curitÃ© Ã©lectorale.

# 3. PÃ©rimÃ¨tre fonctionnel

## 3.1 Inclus dans la vision produit

- Portail public institutionnel.
- Demande d'espace organisation avec parcours simple ou dÃ©taillÃ©.
- VÃ©rification obligatoire de chaque organisation avant approbation.
- Provisionnement du tenant et invitation du premier administrateur aprÃ¨s approbation.
- Comptes crÃ©Ã©s sur invitation, sans inscription publique classique.
- Authentification email/mot de passe, rÃ©initialisation, sessions et MFA.
- Gestion multi-tenant et sous-domaines organisationnels.
- Gestion des membres, rÃ´les et permissions granulaires.
- Gestion des scrutins, candidats, Ã©lecteurs, rÃ¨gles, calendrier et Ã©tats.
- PrÃ©paration, validation et gel de la liste Ã©lectorale.
- Parcours de vote Ã  choix unique pour la premiÃ¨re version.
- Quorum optionnel par scrutin.
- Vote blanc optionnel par scrutin.
- RÃ¨gle d'Ã©galitÃ© dÃ©finie avant ouverture.
- PrÃ©paration assistÃ©e d'un second tour.
- RÃ©sultats provisoires et dÃ©finitifs avec publication contrÃ´lÃ©e.
- VisibilitÃ© des rÃ©sultats configurable avant ouverture.
- Notifications internes et Gmail API.
- ModÃ¨les d'emails personnalisables dans un cadre protÃ©gÃ©.
- Journaux d'audit, exports, rapports et supervision.
- Personnalisation de marque niveau Ã©tendu mais encadrÃ©e.
- FR/EN dans tout le produit.
- Surveillance, sauvegarde, restauration et gestion d'incident.
- Tests, audit de sÃ©curitÃ© indÃ©pendant et critÃ¨res de mise en production.

## 3.2 Hors pÃ©rimÃ¨tre de la premiÃ¨re version

- Vote prÃ©fÃ©rentiel, classement, vote pondÃ©rÃ© ou approbation multi-choix.
- Application mobile native iOS/Android.
- Notifications push natives au lancement.
- Traduction automatique des contenus Ã©lectoraux sans validation humaine.
- Personnalisation libre de la structure UX par organisation.
- Automatisation d'une dÃ©cision Ã©lectorale contestÃ©e sans intervention habilitÃ©e.
- Garantie de rÃ©sistance Ã  la coercition d'un Ã©lecteur, Ã  un appareil compromis ou Ã  une surveillance de son environnement domestique. Ces risques doivent Ãªtre documentÃ©s ; une application web ne peut les Ã©liminer Ã  elle seule.
- Mise en production rÃ©elle sur une offre gratuite sans mÃ©canismes suffisants de disponibilitÃ©, de sauvegarde, d'observabilitÃ© et d'audit.

# 4. Utilisateurs, rÃ´les et permissions

## 4.1 Les cinq rÃ´les prÃ©dÃ©finis

1. **Super administrateur de plateforme :** gÃ¨re la plateforme, les demandes d'organisations, le provisionnement, la supervision et les paramÃ¨tres globaux.
2. **Administrateur d'organisation :** contrÃ´le l'espace de son organisation, ses membres, ses paramÃ¨tres et les opÃ©rations soumises Ã  ses permissions.
3. **Gestionnaire Ã©lectoral :** prÃ©pare et gÃ¨re les opÃ©rations Ã©lectorales qui lui sont attribuÃ©es, sans recevoir automatiquement tous les privilÃ¨ges de l'administrateur.
4. **Auditeur :** consulte les informations et traces auxquelles il est autorisÃ©, sans pouvoir modifier les objets auditÃ©s ni intervenir dans le vote.
5. **Ã‰lecteur :** consulte les scrutins auxquels il est Ã©ligible, vote une seule fois conformÃ©ment aux rÃ¨gles et consulte les rÃ©sultats publiÃ©s.

Le rÃ´le Â« responsable de scrutin Â» n'existe pas comme rÃ´le prÃ©dÃ©fini. Ses responsabilitÃ©s sont reprÃ©sentÃ©es par des permissions attribuables Ã  un administrateur ou Ã  un gestionnaire sur un scrutin dÃ©terminÃ©.

## 4.2 Permissions granulaires

Le systÃ¨me doit sÃ©parer les rÃ´les de base des permissions effectives. PrÃ©voir notamment des permissions de type :

- `organization.view`, `organization.settings.manage`, `organization.branding.manage` ;
- `members.view`, `members.invite`, `members.roles.manage`, `members.revoke` ;
- `elections.view`, `elections.create`, `elections.edit_draft`, `elections.submit_for_review` ;
- `elections.approve_list`, `elections.freeze_list`, `elections.schedule`, `elections.open`, `elections.pause`, `elections.close` ;
- `candidates.manage`, `electorate.import`, `electorate.validate`, `electorate.exceptional_edit` ;
- `results.review`, `results.validate`, `results.publish`, `results.export` ;
- `communications.manage`, `communications.send`, `templates.manage` ;
- `audit.view`, `reports.view`, `reports.export` ;
- permissions limitÃ©es Ã  un scrutin et Ã  une pÃ©riode lorsque pertinent.

Les identifiants de permissions sont stables, documentÃ©s et testÃ©s. Les permissions sont vÃ©rifiÃ©es cÃ´tÃ© serveur et en base, pas seulement en masquant des boutons.

## 4.3 RÃ¨gles de sÃ©paration des responsabilitÃ©s

- Un utilisateur ne peut pas s'attribuer des permissions supÃ©rieures Ã  celles qu'il possÃ¨de.
- Un administrateur d'organisation ne peut administrer que son organisation.
- Le super administrateur ne reÃ§oit pas de capacitÃ© ordinaire de lecture du contenu des bulletins ou du choix individuel.
- Le rÃ´le auditeur est en lecture seule sur le pÃ©rimÃ¨tre accordÃ© ; il ne peut pas modifier une rÃ¨gle, une liste, un bulletin ou un rÃ©sultat.
- La plateforme peut imposer une seconde validation pour les opÃ©rations critiques.
- Les permissions ponctuelles sont limitÃ©es Ã  un scrutin, rÃ©voquÃ©es Ã  expiration et journalisÃ©es.
- Les comptes administratifs sensibles exigent un MFA TOTP ; le MFA Ã©lecteur est facultatif ou configurable.

# 5. ModÃ¨le multi-tenant et espaces

## 5.1 Architecture multi-tenant

Une application SaaS unique hÃ©berge plusieurs organisations. Chaque organisation possÃ¨de un identifiant technique stable (`tenant_id`) qui ne dÃ©pend ni de son nom ni de son sous-domaine.

Le sous-domaine permet d'identifier le contexte d'organisation, mais **ne constitue jamais une autorisation**. Chaque requÃªte doit rÃ©soudre le tenant puis vÃ©rifier l'appartenance de l'utilisateur et ses permissions. Le serveur ne doit jamais faire confiance Ã  un `tenant_id` fourni librement par le navigateur.

## 5.2 Isolation

- Toute table mÃ©tier appartenant Ã  une organisation porte un `tenant_id` non nullable quand cela s'applique.
- Les relations doivent empÃªcher les rÃ©fÃ©rences croisÃ©es entre tenants.
- Les politiques PostgreSQL RLS sont activÃ©es sur chaque table exposÃ©e.
- Les privilÃ¨ges SQL (`GRANT`/`REVOKE`) sont dÃ©finis en complÃ©ment de RLS.
- Les vues, fonctions SQL, triggers, fichiers Storage et fonctions serveur sont examinÃ©s pour dÃ©tecter les contournements.
- La clÃ© Supabase `service_role` ou toute clÃ© secrÃ¨te Ã©quivalente reste exclusivement cÃ´tÃ© serveur et est utilisÃ©e au strict minimum.
- Des tests nÃ©gatifs dÃ©montrent qu'un utilisateur du tenant A ne peut pas lire, insÃ©rer, modifier ou supprimer des donnÃ©es du tenant B.

## 5.3 Ã‰tats d'organisation

- `pending` : demande soumise / vÃ©rification en cours ; aucun backoffice actif.
- `needs_information` : justificatifs ou informations supplÃ©mentaires requis.
- `approved` : demande acceptÃ©e ; provisionnement en cours.
- `active` : espace opÃ©rationnel.
- `suspended` : accÃ¨s opÃ©rationnel suspendu selon procÃ©dure et motif.
- `disabled` ou `archived` : espace fermÃ©/archivÃ©, selon politique de conservation.
- `rejected` : demande refusÃ©e.

## 5.4 Sous-domaines

Exemple cible : `organisation.voteplateforme.tld`. Le routage des sous-domaines doit Ãªtre abstrait de la logique mÃ©tier. En dÃ©veloppement, prÃ©voir un mode localhost, un paramÃ¨tre d'hÃ´te contrÃ´lÃ© ou un chemin de dÃ©monstration documentÃ©. Le domaine personnalisÃ©, le DNS et les certificats ne doivent pas Ãªtre considÃ©rÃ©s comme gratuits ou disponibles avant vÃ©rification.

# 6. Portail public et intÃ©gration des organisations

## 6.1 Portail public

Pages : Accueil, Solutions, Fonctionnement, SÃ©curitÃ©, Ã€ propos, Aide/FAQ, Contact, Connexion, Demander un espace, pages lÃ©gales et politiques de confidentialitÃ©.

Le portail doit expliquer clairement le service, les publics concernÃ©s, le fonctionnement gÃ©nÃ©ral, les limites et les principes de sÃ©curitÃ©. Il ne doit pas prÃ©tendre Ã  une certification qui n'existe pas.

## 6.2 Demande d'espace

Parcours unique Â« Demander un espace Â» avec deux modes :

- **Demande simple :** collecte initiale des informations essentielles ;
- **Demande dÃ©taillÃ©e :** collecte complÃ©mentaire et prÃ©configuration de l'espace.

Aucune organisation ni aucun backoffice n'est activÃ© avant approbation. Le simple dÃ©pÃ´t d'un formulaire ne crÃ©e pas un tenant exploitable.

## 6.3 VÃ©rification obligatoire

Toute organisation, quel que soit son type ou sa taille, est vÃ©rifiÃ©e avant approbation. Le super administrateur peut :

- consulter le dossier ;
- demander des justificatifs ;
- demander des complÃ©ments ;
- approuver ou refuser avec motif ;
- consulter l'historique de dÃ©cision.

Chaque dÃ©cision est datÃ©e, attribuÃ©e Ã  un acteur et auditÃ©e. Les documents justificatifs disposent de permissions restrictives, d'une durÃ©e de conservation dÃ©finie et d'un accÃ¨s journalisÃ©.

## 6.4 Ã‰tats de demande

`draft` â†’ `submitted` â†’ `under_review` â†’ `needs_information` â†’ retour Ã  `under_review` â†’ `approved` ou `rejected` â†’ `provisioning` â†’ `active`.

Les transitions invalides sont refusÃ©es cÃ´tÃ© serveur. Une demande refusÃ©e conserve son historique selon la politique de conservation.

## 6.5 Provisionnement

AprÃ¨s approbation uniquement : crÃ©er le tenant, gÃ©nÃ©rer un slug contrÃ´lÃ©, rÃ©server/associer le sous-domaine lorsque disponible, crÃ©er la configuration initiale, inviter le premier administrateur et envoyer un email d'activation. Le provisionnement doit Ãªtre idempotent et reprendre proprement aprÃ¨s erreur.

# 7. Comptes, authentification et sÃ©curitÃ© des sessions

- Pas d'inscription publique classique.
- Les comptes sont crÃ©Ã©s via invitation email par un utilisateur habilitÃ© ou par le flux d'approbation.
- Connexion email + mot de passe.
- VÃ©rification email selon les capacitÃ©s Supabase et la configuration retenue.
- RÃ©initialisation de mot de passe avec jeton Ã  durÃ©e limitÃ©e, usage unique et messages anti-Ã©numÃ©ration de comptes.
- DÃ©connexion et rÃ©vocation des sessions/appareils.
- Gestion des invitations expirÃ©es, rÃ©voquÃ©es et dÃ©jÃ  utilisÃ©es.
- Protection contre brute force, credential stuffing, CSRF, XSS, injections et abus des endpoints.
- Cookies de session sÃ©curisÃ©s, HttpOnly, Secure en production, SameSite appropriÃ©.
- Utiliser les guides SSR Supabase officiels et vÃ©rifier les versions/API en vigueur Ã  l'implÃ©mentation.

## 7.1 MFA

MFA obligatoire par TOTP pour le super administrateur, l'administrateur d'organisation et les gestionnaires ayant des permissions sensibles. L'auditeur est soumis au MFA selon le niveau d'accÃ¨s ; le systÃ¨me peut l'imposer par politique. L'Ã©lecteur dispose d'un MFA facultatif ou activable par organisation.

PrÃ©voir enrÃ´lement, QR code, vÃ©rification initiale, challenge Ã  la connexion, codes de rÃ©cupÃ©ration si pris en charge par la stratÃ©gie retenue, rÃ©vocation, rÃ©-enrÃ´lement et journalisation des changements MFA. Un Ã©cran MFA ne suffit pas : les actions et endpoints sensibles doivent vÃ©rifier le niveau d'assurance de session cÃ´tÃ© serveur et, quand possible, en RLS.

# 8. Gestion des organisations et personnalisation

Chaque organisation peut configurer, dans des limites de design communes :

- nom officiel et nom d'affichage ;
- logo ;
- couleurs principales et secondaires encadrÃ©es ;
- image de couverture ;
- prÃ©sentation et description ;
- sous-domaine ;
- certains textes institutionnels et contenus de pages publiques ;
- langue par dÃ©faut ;
- identitÃ© d'expÃ©diteur et configuration Gmail autorisÃ©e.

La personnalisation ne peut pas casser la hiÃ©rarchie, la lisibilitÃ©, la typographie fonctionnelle, l'accessibilitÃ©, les composants critiques ou les parcours de vote. Les couleurs sont validÃ©es par des contrÃ´les de contraste. Les logos et images ont des contraintes de format et de poids.

# 9. Internationalisation FR/EN

Le franÃ§ais et l'anglais sont disponibles dÃ¨s le lancement sur le portail, les demandes, l'authentification, l'espace Ã©lecteur, les deux backoffices, les notifications, les emails, les erreurs, les confirmations et les rapports pertinents.

- SÃ©lecteur de langue accessible sans dÃ©connexion.
- Langue mÃ©morisÃ©e au niveau utilisateur.
- Langue par dÃ©faut dÃ©finie par organisation.
- PrÃ©fÃ©rence utilisateur prioritaire sur la langue par dÃ©faut de l'organisation.
- Dates, heures, nombres et pourcentages formatÃ©s selon la locale.
- Contenus Ã©lectoraux rÃ©digÃ©s sÃ©parÃ©ment dans les deux langues lorsque l'organisation souhaite les proposer.
- Aucune traduction automatique non validÃ©e n'est prÃ©sentÃ©e comme officielle.
- Les clÃ©s de traduction sont stables, testÃ©es et ne sont pas dissÃ©minÃ©es dans les composants.

# 10. Backoffice organisation

## 10.1 Navigation

Navigation hybride : sidebar gauche rÃ©tractable pour les rubriques et barre supÃ©rieure pour recherche globale (selon permissions), fil d'Ariane, notifications, langue, profil et actions contextuelles. Sur mobile : navigation adaptÃ©e, drawer ou navigation secondaire compacte ; pas de sidebar desktop simplement Ã©crasÃ©e.

## 10.2 Rubriques

- Vue d'ensemble ;
- Ã‰lections : scrutins, candidats, listes Ã©lectorales, rÃ©sultats et seconds tours ;
- Population Ã©lectorale ;
- Administration : membres, rÃ´les, permissions et invitations ;
- Communication : connexion Gmail, modÃ¨les, envois et historique ;
- Rapports et audit ;
- ParamÃ¨tres : profil, branding, sous-domaine, langues, sÃ©curitÃ©.

Le contenu est conditionnÃ© aux permissions rÃ©elles. Un utilisateur ne doit pas voir des fonctionnalitÃ©s qu'il ne peut pas utiliser, tout en gardant une comprÃ©hension claire des responsabilitÃ©s qui lui sont dÃ©lÃ©guÃ©es.

## 10.3 Tableau de bord

Dashboard hybride : indicateurs essentiels, actions prioritaires, scrutins actifs/Ã  venir, Ã©chÃ©ances, alertes, activitÃ© rÃ©cente et raccourcis pertinents. Graphiques uniquement lorsqu'ils permettent une dÃ©cision ou rÃ©vÃ¨lent une Ã©volution utile. Pas de KPI dÃ©coratifs.

# 11. Backoffice central

Fonctions :

- tableau de bord de supervision ;
- demandes d'organisations et vÃ©rification ;
- organisations actives/suspendues/archivÃ©es ;
- comptes et administrateurs de plateforme ;
- vue de santÃ© technique des scrutins sans accÃ¨s au contenu secret des bulletins ;
- incidents et alertes ;
- suivi Gmail et notifications ;
- sÃ©curitÃ©, journaux et audits ;
- rapports de plateforme ;
- configuration globale et langues.

Le super administrateur peut suspendre une organisation selon une procÃ©dure documentÃ©e et auditÃ©e. Il ne peut pas Ã©diter un bulletin ou modifier un rÃ©sultat Ã©lectoral.

# 12. Cycle de vie d'un scrutin

## 12.1 Ã‰tats recommandÃ©s

`draft` â†’ `ready_for_review` â†’ `approved` â†’ `scheduled` â†’ `open` â†’ `paused` si nÃ©cessaire â†’ `closed` â†’ `counting` â†’ `results_under_review` â†’ `results_provisional` ou `results_final` â†’ `published` â†’ `archived`.

Des Ã©tats annexes `cancelled` ou `invalid_quorum` peuvent exister, avec transitions contrÃ´lÃ©es et motifs obligatoires. Le modÃ¨le doit expliciter les transitions, rÃ´les autorisÃ©s, effets et notifications. Un scrutin ne doit pas Ãªtre ouvert avec une configuration incomplÃ¨te.

## 12.2 Deux modes de crÃ©ation

- **Assistant guidÃ© :** infos gÃ©nÃ©rales, candidats, Ã©lecteurs, rÃ¨gles, calendrier, vÃ©rification/aperÃ§u.
- **Formulaire rapide :** crÃ©ation directe pour un utilisateur expÃ©rimentÃ©.

Les deux modes utilisent le mÃªme moteur mÃ©tier et les mÃªmes validations. Sauvegarde automatique, retour aux Ã©tapes sans perte, erreurs explicites, brouillon persistant et blocage si une condition obligatoire manque.

## 12.3 Informations d'un scrutin

- titre et description FR/EN ;
- organisation et pÃ©rimÃ¨tre ;
- type : choix unique pour V1 ;
- nombre de siÃ¨ges/candidats selon le mode initial ;
- dates/heures d'ouverture et de fermeture, fuseau explicite ;
- liste Ã©lectorale associÃ©e et version figÃ©e ;
- quorum facultatif et seuil ;
- vote blanc facultatif ;
- rÃ¨gle d'Ã©galitÃ© ;
- visibilitÃ© des rÃ©sultats ;
- texte de prÃ©sentation/instructions ;
- responsable(s) et approbateurs selon permissions ;
- paramÃ¨tres de communication.

## 12.4 RÃ¨gles figÃ©es

Les rÃ¨gles Ã©lectorales sont fixÃ©es et prÃ©sentÃ©es avant ouverture. AprÃ¨s ouverture, toute modification d'une rÃ¨gle essentielle est interdite ou soumise Ã  une procÃ©dure exceptionnelle clairement dÃ©finie, avec justification, autorisation, journalisation et analyse d'impact. Les donnÃ©es et rÃ¨gles figÃ©es doivent Ãªtre versionnÃ©es et pouvoir Ãªtre prouvÃ©es lors d'un audit.

# 13. Candidats

- CrÃ©ation et modification pendant la pÃ©riode autorisÃ©e.
- Nom, photo facultative, biographie et prÃ©sentation FR/EN.
- Ordre d'affichage explicite et stable.
- ContrÃ´le des formats d'image, poids et contenus.
- Validation avant gel du scrutin.
- AprÃ¨s ouverture, aucune modification silencieuse du candidat ou de son ordre.
- Toute correction exceptionnelle doit suivre une procÃ©dure d'incident et Ãªtre auditÃ©e.

# 14. Population Ã©lectorale et liste Ã©lectorale

- Import CSV avec aperÃ§u, dÃ©tection des colonnes, validation, rapport d'erreurs et dÃ©duplication.
- Ajout/modification manuels selon permissions.
- Invitations individuelles et relances contrÃ´lÃ©es.
- Statut d'Ã©ligibilitÃ©, statut d'invitation et statut de participation conservÃ©s sÃ©parÃ©ment.
- Une liste est prÃ©parÃ©e par un responsable habilitÃ©, puis vÃ©rifiÃ©e et validÃ©e par un administrateur habilitÃ©.
- AprÃ¨s validation, la liste est gelÃ©e et versionnÃ©e avant ouverture.
- Toute modification aprÃ¨s gel est exceptionnelle, justifiÃ©e, autorisÃ©e, limitÃ©e et auditÃ©e.
- Les changements aprÃ¨s ouverture sont soumis Ã  une analyse de sÃ©curitÃ© et d'Ã©quitÃ© ; aucune modification de routine n'est acceptÃ©e.
- Le dÃ©compte du quorum se base sur le nombre d'Ã©lecteurs Ã©ligibles de la liste gelÃ©e.

Les fichiers importÃ©s contiennent des donnÃ©es personnelles : accÃ¨s restreint, stockage privÃ©, validation stricte, taille limitÃ©e, antivirus/inspection si possible et suppression des fichiers temporaires aprÃ¨s traitement selon politique.

# 15. Parcours de vote Ã©lecteur

Parcours cible :

1. L'Ã©lecteur s'authentifie.
2. Le systÃ¨me vÃ©rifie l'organisation, l'Ã©ligibilitÃ©, le scrutin, la pÃ©riode et l'absence de participation dÃ©jÃ  enregistrÃ©e.
3. L'Ã©cran prÃ©sente le scrutin, ses rÃ¨gles principales, les candidats et les Ã©ventuelles options.
4. L'Ã©lecteur sÃ©lectionne un candidat ; aucun choix n'est prÃ©-cochÃ©.
5. Un Ã©cran de rÃ©capitulatif explicite distingue la sÃ©lection de la validation dÃ©finitive.
6. L'Ã©lecteur confirme explicitement l'action irrÃ©versible.
7. Le bulletin est transmis selon le protocole sÃ©curisÃ© validÃ©.
8. Une confirmation de participation neutre est affichÃ©e ; elle ne rÃ©vÃ¨le jamais le choix.

Exigences :

- aucune sÃ©lection prÃ©-cochÃ©e ;
- distinction visuelle et textuelle entre sÃ©lectionner et voter ;
- protection contre double clic et double soumission ;
- rÃ©ponse idempotente en cas de retry rÃ©seau ;
- aucune donnÃ©e du choix dans les emails, reÃ§us, historiques personnels ou journaux ;
- confirmation qui prouve au mieux l'enregistrement/la participation selon le protocole, sans rÃ©vÃ©ler le choix ;
- reprise claire en cas de rÃ©seau interrompu, sans indiquer Ã  tort qu'un vote est enregistrÃ©.

# 16. Secret du vote et architecture Ã©lectorale

C'est le domaine le plus critique. La solution doit distinguer au minimum :

1. **IdentitÃ© et Ã©ligibilitÃ© :** savoir qui est authentifiÃ© et a droit de participer.
2. **Droit de participation :** empÃªcher qu'un Ã©lecteur vote deux fois.
3. **Bulletin :** recevoir et compter le choix sans conserver l'identitÃ© civile de l'Ã©lecteur.

Une simple sÃ©paration de tables ou le retrait du champ `user_id` ne prouve pas l'anonymat. Les horodatages, journaux, identifiants de requÃªte, traces applicatives, mÃ©tadonnÃ©es et accÃ¨s administrateurs peuvent permettre une corrÃ©lation.

Exigences minimales de conception :

- sÃ©paration des domaines identitÃ©/Ã©ligibilitÃ© et urne/bulletins ;
- identifiants et journaux diffÃ©rents, sans identifiant de compte dans l'urne ;
- minimisation et traitement des horodatages et mÃ©tadonnÃ©es pouvant faciliter une corrÃ©lation ;
- protection de l'intÃ©gritÃ© des bulletins et des opÃ©rations de comptage ;
- empÃªchement technique de double participation ;
- accÃ¨s administratif au strict minimum ;
- protocole de vÃ©rifiabilitÃ© et de dÃ©pouillement documentÃ© ;
- modÃ¨le de menace couvrant administrateur malveillant, Ã©quipe technique, compromission de compte, compromission de navigateur, fuite de base, corrÃ©lation temporelle et attaque multi-tenant.

**Interdiction absolue :** ne pas inventer de cryptographie, de signature aveugle, de chiffrement homomorphe, de protocole de mÃ©lange ou de vÃ©rification maison. L'Ã©quipe doit comparer des protocoles et implÃ©mentations Ã©prouvÃ©s, documenter le choix, faire effectuer une revue spÃ©cialisÃ©e indÃ©pendante et intÃ©grer le rÃ©sultat via un adaptateur isolÃ©. La premiÃ¨re version du dÃ©pÃ´t peut contenir un mode sandbox clairement marquÃ© `NON_PRODUCTION`, sans prÃ©tendre Ã  une confidentialitÃ© Ã©lectorale rÃ©elle.

**Gate de production :** aucun vote rÃ©el ne peut Ãªtre activÃ© avant validation du protocole, revue du code, tests de sÃ©curitÃ©, audit externe indÃ©pendant et correction vÃ©rifiÃ©e des vulnÃ©rabilitÃ©s critiques et Ã©levÃ©es.

# 17. Quorum, vote blanc, Ã©galitÃ© et second tour

## 17.1 Quorum

Le quorum est facultatif et configurable par scrutin. Si activÃ© : seuil en pourcentage du nombre d'Ã©lecteurs Ã©ligibles inscrit dans la version gelÃ©e de la liste. Il est fixÃ© avant ouverture, immuable aprÃ¨s ouverture et Ã©valuÃ© Ã  clÃ´ture. En cas de quorum non atteint, le scrutin est dÃ©clarÃ© non valide pour dÃ©faut de quorum ; les bulletins dÃ©jÃ  enregistrÃ©s sont conservÃ©s et ne sont pas supprimÃ©s.

Le dÃ©nominateur, la rÃ¨gle d'arrondi et la dÃ©finition de la participation doivent Ãªtre explicites, affichÃ©s avant ouverture et testÃ©s. Un bulletin blanc valablement soumis compte comme participation si la rÃ¨gle du scrutin le prÃ©voit ; cette rÃ¨gle est fixÃ©e avant ouverture.

## 17.2 Vote blanc

Le vote blanc est facultatif. S'il est activÃ©, il apparaÃ®t comme option explicite et est comptabilisÃ© sÃ©parÃ©ment des votes candidats. Il ne doit jamais Ãªtre confondu avec l'abstention, l'absence de rÃ©ponse ou un bulletin invalide. La rÃ¨gle est fixÃ©e avant ouverture et figÃ©e ensuite.

## 17.3 Ã‰galitÃ©

La rÃ¨gle en cas d'Ã©galitÃ© est choisie avant le scrutin et montrÃ©e aux Ã©lecteurs : second tour, maintien ex aequo si le rÃ¨glement l'autorise, ou autre procÃ©dure rÃ©glementaire documentÃ©e. Elle est figÃ©e Ã  l'ouverture et auditÃ©e.

## 17.4 Second tour assistÃ©

AprÃ¨s clÃ´ture et vÃ©rification des rÃ©sultats, le systÃ¨me dÃ©tecte la situation d'Ã©galitÃ© selon la rÃ¨gle configurÃ©e et prÃ©pare un nouveau scrutin liÃ© au premier. Un administrateur habilitÃ© vÃ©rifie et confirme le lancement. Le second tour possÃ¨de ses propres dates, rÃ¨gles, liste Ã©ligible et paramÃ¨tres. Les Ã©lecteurs concernÃ©s sont informÃ©s sans divulguer leur choix prÃ©cÃ©dent.

# 18. DÃ©pouillement, rÃ©sultats et publication

## 18.1 Deux niveaux d'interface

**Ã‰lecteurs :** rÃ©sultats publiÃ©s uniquement, avec nom du scrutin et de l'organisation, Ã©tat provisoire/dÃ©finitif, total de voix, participation, rÃ©sultats candidats, pourcentages, graphiques utiles, votes blancs si applicables et date de publication.

**Administrateurs habilitÃ©s :** statistiques supplÃ©mentaires, vÃ©rifications, comparaisons avec les rÃ¨gles, exports PDF/CSV/Excel, historique des validations/publications et Ã©tats d'audit autorisÃ©s.

Les rÃ©sultats provisoires ne sont accessibles qu'aux rÃ´les et permissions habilitÃ©s. Une validation humaine est nÃ©cessaire avant publication. Le portail public ou l'espace Ã©lecteur n'affiche que ce qui a Ã©tÃ© publiÃ©.

## 18.2 VisibilitÃ©

Avant ouverture, chaque scrutin dÃ©finit l'une des options suivantes :

- rÃ©sultats rÃ©servÃ©s aux Ã©lecteurs authentifiÃ©s autorisÃ©s ;
- rÃ©sultats publics par lien sans connexion.

Le changement aprÃ¨s ouverture est contrÃ´lÃ© et auditÃ©. Aucun rÃ©sultat ne peut exposer des donnÃ©es personnelles ni des dÃ©tails permettant de compromettre le secret du vote.

## 18.3 IntÃ©gritÃ©

Aucun administrateur, y compris un super administrateur de la plateforme, ne peut modifier discrÃ¨tement des bulletins ou un rÃ©sultat calculÃ©. Toute correction relÃ¨ve d'une procÃ©dure documentÃ©e, traÃ§able, vÃ©rifiable et compatible avec le protocole Ã©lectoral. Les rÃ©sultats sont calculÃ©s Ã  partir des bulletins selon une procÃ©dure dÃ©terministe et testÃ©e.

# 19. Notifications, Gmail et communication

## 19.1 Canaux initiaux

- Notifications internes.
- Emails via Gmail API.
- Pas de push smartphone au lancement ; prÃ©voir une architecture extensible.

La rÃ©ussite du vote ne dÃ©pend jamais de Gmail. Un dÃ©faut d'email ne doit pas annuler ou bloquer un bulletin confirmÃ©. Les envois Ã©chouÃ©s peuvent Ãªtre retentÃ©s selon une politique idempotente.

## 19.2 Gmail

- IntÃ©gration via Gmail API et OAuth 2.0 ; jamais de mot de passe Gmail stockÃ©.
- Un compte Gmail central de la plateforme.
- PossibilitÃ© pour chaque organisation de connecter son propre compte Gmail.
- Mode d'expÃ©diteur configurable par organisation ; choix Ã©ventuel par type de communication.
- Scopes OAuth les plus restreints possibles, adaptÃ©s Ã  l'envoi requis.
- Stockage chiffrÃ© des jetons d'accÃ¨s/refresh cÃ´tÃ© serveur, rotation, rÃ©vocation et gestion de consentement.
- Gestion des quotas, erreurs, expirations, dÃ©connexions et renouvellements.
- Historique des envois : demandÃ©, acceptÃ© par API, livrÃ©/rebondi si le fournisseur fournit l'information ; ne jamais assimiler Â« acceptÃ© par Gmail Â» Ã  Â« arrivÃ© dans la boÃ®te de rÃ©ception Â».

## 19.3 ModÃ¨les d'emails

ModÃ¨les professionnels prÃ©dÃ©finis et personnalisables : logo, couleurs encadrÃ©es, texte autorisÃ©, signature et Ã©lÃ©ments de prÃ©sentation.

ModÃ¨les prÃ©vus : invitation, activation, rÃ©initialisation, ouverture du scrutin, rappel, confirmation de participation neutre, clÃ´ture, publication des rÃ©sultats, alerte et demande de complÃ©ments.

Les clauses de sÃ©curitÃ© et textes obligatoires sont protÃ©gÃ©s contre suppression/altÃ©ration. PrÃ©visualisation avant envoi. Les emails ne rÃ©vÃ¨lent jamais le candidat choisi ni le contenu du bulletin.

# 20. Audit, fraude et supervision

- Journal d'audit append-only autant que possible, avec protections contre modification/suppression et contrÃ´les d'intÃ©gritÃ©.
- Acteur, action, cible, tenant, horodatage, rÃ©sultat, motif et contexte minimal utile.
- Pas de contenu de bulletin ni de choix Ã©lectoral dans les journaux.
- DÃ©tection des connexions inhabituelles, tentatives rÃ©pÃ©tÃ©es, changements de permissions, opÃ©rations sensibles et anomalies de flux.
- Alertes aux responsables habilitÃ©s.
- Double validation pour opÃ©rations critiques : ouverture selon configuration, modification exceptionnelle de liste gelÃ©e, suspension/reprise, publication, rÃ©vocation d'administrateur et autres opÃ©rations dÃ©finies par politique.
- Les interventions des Ã©quipes techniques sont Ã©galement journalisÃ©es.
- Aucun accÃ¨s de support ou de super administrateur ne doit devenir un moyen de consulter les choix individuels.
- Les Ã©vÃ©nements de sÃ©curitÃ© sont sÃ©parÃ©s des Ã©vÃ©nements mÃ©tier et les durÃ©es de conservation sont dÃ©finies.

# 21. Rapports et exports

- Exports PDF, CSV et Excel selon permissions.
- Les exports sont gÃ©nÃ©rÃ©s cÃ´tÃ© serveur, temporaires, protÃ©gÃ©s, journalisÃ©s et expirent.
- Les exports publics ne contiennent que les rÃ©sultats officiellement publiÃ©s.
- Les exports administratifs peuvent contenir des donnÃ©es nominatives d'Ã©ligibilitÃ© uniquement lorsque strictement nÃ©cessaire et autorisÃ© ; jamais le lien identitÃ©-choix.
- Rapports d'activitÃ©, de participation, de validation, d'incident, de communication et d'audit.
- Marquer la date, le fuseau, l'Ã©tat des rÃ©sultats et la version du scrutin dans chaque rapport.

# 22. Direction UI/UX et design system

## 22.1 Direction visuelle

Direction validÃ©e : **hybride institutionnelle et SaaS moderne**. L'objectif est une interface premium, lisible, calme, reconnaissable et crÃ©dible. Les rÃ©fÃ©rences d'images vues prÃ©cÃ©demment Ã©taient des moodboards exploratoires, pas une rÃ©fÃ©rence de qualitÃ© finale.

Palette exploratoire non dÃ©finitive : bleu nuit `#14283F`, vert pÃ©trole `#176B66`, fond `#F5F7F8`, bordures `#DCE4EA`, accent chaud `#D49A43`. La palette finale doit Ãªtre testÃ©e en contraste et en modes d'Ã©tat.

La typographie, la densitÃ© et les espacements doivent Ã©tablir une hiÃ©rarchie nette. Ã‰viter les dÃ©gradÃ©s violets, l'esthÃ©tique Â« dashboard IA Â», les cartes rÃ©pÃ©titives, les coins excessivement arrondis, les ombres lourdes et les animations sans fonction.

## 22.2 Quatre expÃ©riences

- **Portail public :** expÃ©rience SaaS institutionnelle, Ã©ditoriale, informative et rassurante.
- **Ã‰lecteur :** interface minimaliste, concentrÃ©e sur le scrutin, le vote et la confirmation ; mobile-first strict.
- **Backoffice organisation :** outil de travail dense mais maÃ®trisÃ© ; tableaux efficaces, filtres, actions contextuelles, Ã©tats clairs.
- **Backoffice central :** supervision et contrÃ´le opÃ©rationnel, sans accÃ¨s indu au contenu secret des votes.

## 22.3 RÃ¨gles de conception

- Mobile-first pour chaque parcours, prioritÃ© extrÃªme au parcours Ã©lecteur.
- Tables desktop transformÃ©es en vues cartes/lignes adaptÃ©es sur petits Ã©crans, sans dÃ©filement horizontal inutile.
- Ã‰tats chargement, vide, succÃ¨s, erreur, interdit, suspension, expiration et hors-ligne traitÃ©s explicitement.
- AccessibilitÃ© WCAG 2.2 AA comme cible de conception et de test, sans prÃ©tendre Ã  une conformitÃ© certifiÃ©e avant audit.
- Navigation clavier, focus visible, labels, erreurs associÃ©es, contrastes et tailles tactiles.
- Animations rares, fonctionnelles, respect de `prefers-reduced-motion`.
- Pas de donnÃ©es factices prÃ©sentÃ©es comme rÃ©elles ; les environnements de dÃ©monstration sont identifiÃ©s.
- Les composants partagÃ©s ne doivent pas uniformiser les quatre expÃ©riences au point de les rendre identiques.

# 23. Architecture technique recommandÃ©e

## 23.1 Choix principal

**Next.js App Router + TypeScript strict + Supabase.** Next.js est prÃ©fÃ©rÃ© Ã  une application React/Vite sÃ©parÃ©e pour rÃ©unir le portail public, les espaces protÃ©gÃ©s, les routes serveur, le rendu cÃ´tÃ© serveur et l'internationalisation dans un seul projet. La documentation Next.js distingue les Server Components, Client Components, Route Handlers et la gestion des locales ; la documentation Supabase propose un quickstart Next.js et des guides SSR. VÃ©rifier systÃ©matiquement les versions et les API officiellement supportÃ©es au moment de l'installation.

## 23.2 Stack de dÃ©part

- Next.js stable compatible App Router ; version exacte vÃ©rifiÃ©e lors du bootstrap.
- React fourni/compatible avec cette version de Next.js.
- TypeScript strict.
- Supabase : PostgreSQL, Auth, Storage privÃ©, fonctions seulement si le besoin le justifie.
- `@supabase/supabase-js` et intÃ©gration SSR officiellement recommandÃ©e et isolÃ©e dans un adaptateur ; vÃ©rifier le statut et les changements de l'API `@supabase/ssr` avant installation.
- Tailwind CSS pour les tokens et styles utilitaires.
- Composants accessibles de type shadcn/ui, copiÃ©s/adaptÃ©s avec discernement, sans adopter un template gÃ©nÃ©rique.
- Zod pour la validation de frontiÃ¨res et de schÃ©mas.
- React Hook Form si cela simplifie les formulaires complexes.
- `next-intl` ou solution i18n maintenue compatible App Router, choisie aprÃ¨s vÃ©rification des versions.
- TanStack Table uniquement pour les tableaux complexes nÃ©cessitant tri/filtre/visibilitÃ©.
- Vitest pour tests unitaires ; Playwright pour tests E2E ; tests SQL/pgTAP et tests RLS pour la base.
- pnpm comme gestionnaire de paquets, lockfile versionnÃ©.
- Supabase CLI pour migrations reproductibles et tests de base.

Ne pas ajouter un ORM ou une couche d'abstraction lourde par rÃ©flexe. Le typage Supabase gÃ©nÃ©rÃ© depuis le schÃ©ma et les requÃªtes explicites sont prÃ©fÃ©rÃ©s au dÃ©part. Toute nouvelle dÃ©pendance doit avoir une raison, une licence compatible et un coÃ»t nul.

## 23.3 Architecture applicative

Architecture modulaire par domaine mÃ©tier, avec sÃ©paration UI / application / domaine / infrastructure. Les composants visuels ne contiennent pas les rÃ¨gles Ã©lectorales. Les Server Actions et Route Handlers valident leurs entrÃ©es, authentifient l'acteur, rÃ©solvent le tenant et vÃ©rifient les permissions avant d'effectuer une mutation.

La logique sensible est centralisÃ©e dans des services et fonctions SQL auditÃ©s. Les appels directs depuis le navigateur ne doivent pas pouvoir contourner les rÃ¨gles. La base demeure la derniÃ¨re ligne de dÃ©fense via contraintes, transactions, privilÃ¨ges et RLS.

## 23.4 Architecture de donnÃ©es

Domaines indicatifs :

- plateforme : `organizations`, `organization_requests`, `organization_documents`, `domains`, `platform_settings` ;
- identitÃ©/accÃ¨s : `profiles`, `memberships`, `roles`, `permissions`, `role_permissions`, `member_permissions`, `invitations`, `sessions_metadata` ;
- scrutin : `elections`, `election_translations`, `election_rules`, `election_state_transitions`, `candidates`, `candidate_translations` ;
- Ã©lectorat : `electoral_lists`, `electoral_list_versions`, `electors`, `eligibility_records`, `imports`, `import_errors` ;
- vote : interfaces isolÃ©es pour `voting_credentials`, `ballots`, `ballot_events` uniquement selon le protocole cryptographique choisi ;
- rÃ©sultats : `tallies`, `result_reviews`, `result_publications`, `runoff_links` ;
- communication : `gmail_connections`, `email_templates`, `notification_events`, `email_outbox`, `email_attempts` ;
- audit : `audit_events`, `security_events`, `incident_records` ;
- configuration : `organization_branding`, `organization_preferences`, `retention_policies`.

Cette liste est conceptuelle, pas un schÃ©ma SQL final. Les donnÃ©es d'identitÃ© et l'urne ne doivent pas Ãªtre liÃ©es par une clÃ© Ã©trangÃ¨re permettant de reconstruire le voteur. La conception dÃ©finitive du domaine vote dÃ©pend du protocole choisi et auditÃ©.

## 23.5 DonnÃ©es et accÃ¨s

- Migrations SQL versionnÃ©es ; aucun changement manuel non documentÃ© en environnement partagÃ©.
- RLS sur toute table exposÃ©e ; grants et policies testÃ©s par opÃ©ration.
- Tables privÃ©es/essentielles non exposÃ©es par la Data API sans justification.
- Vues et fonctions Ã©valuÃ©es pour les risques de bypass RLS.
- Tests d'accÃ¨s autorisÃ© et interdit, par tenant et par rÃ´le.
- Index sur `tenant_id`, clÃ©s de recherche, Ã©tats et relations utilisÃ©es.
- Contraintes uniques/Ã©trangÃ¨res et transactions sur les opÃ©rations critiques.
- Service role seulement cÃ´tÃ© serveur, secrets jamais prÃ©fixÃ©s `NEXT_PUBLIC_`.

# 24. GratuitÃ©, hÃ©bergement et limites de l'offre gratuite

Le dÃ©veloppement local et la dÃ©monstration doivent rester Ã  0 FCFA autant que possible. Utiliser Supabase Free pour un environnement de dÃ©veloppement/dÃ©monstration, sans donnÃ©es rÃ©elles sensibles.

Les limites publiÃ©es actuellement par Supabase Free incluent notamment 2 projets actifs au maximum, une base de 500 MB par projet, 5 GB d'egress, 1 GB de stockage et la mise en pause des projets aprÃ¨s une semaine d'inactivitÃ© ; les sauvegardes automatiques ne sont pas incluses comme dans les plans payants. Ces quotas peuvent changer et doivent Ãªtre revÃ©rifiÃ©s avant le choix d'environnement.

Cloudflare Workers Free peut Ãªtre Ã©tudiÃ© pour une dÃ©monstration de dÃ©ploiement ; ses limites publiÃ©es incluent un quota de requÃªtes quotidiennes et une limite CPU par invocation. La compatibilitÃ© Next.js/Cloudflare doit Ãªtre vÃ©rifiÃ©e au moment du dÃ©ploiement. Ne pas choisir un adaptateur expÃ©rimental uniquement pour afficher un hÃ©bergement gratuit.

**ConsÃ©quence :** l'objectif de disponibilitÃ© 99,9 %, la reprise en moins d'une heure, les sauvegardes fiables et les sous-domaines personnalisÃ©s sont des exigences produit, pas une promesse rÃ©alisable automatiquement avec le plan gratuit. Aucune Ã©lection rÃ©elle ne doit dÃ©pendre d'une configuration gratuite sans sauvegarde, supervision, support et capacitÃ© de restauration appropriÃ©s. Ne jamais activer le paiement automatique, un dÃ©passement de quota ou une offre payante sans accord explicite.

# 25. SÃ©curitÃ©, disponibilitÃ© et reprise aprÃ¨s incident

## 25.1 Exigences validÃ©es

- DisponibilitÃ© cible initiale : 99,9 %.
- Perte maximale de bulletins confirmÃ©s : 0.
- Objectif de reprise : moins d'une heure, sous rÃ©serve de l'infrastructure choisie et de tests rÃ©alistes.
- Sauvegardes automatiques, chiffrÃ©es, rÃ©guliÃ¨res et protÃ©gÃ©es.
- Tests de restauration documentÃ©s et rÃ©pÃ©tÃ©s.
- Surveillance, alertes, protection contre les pics de trafic et attaques DDoS.
- ProcÃ©dure d'incident avec responsabilitÃ©s et communication.
- Suspension contrÃ´lÃ©e d'un scrutin si son intÃ©gritÃ© ou son Ã©quitÃ© est menacÃ©e.
- Pas de prolongation automatique lors d'une panne : dÃ©cision humaine habilitÃ©e, motivÃ©e, auditÃ©e et appliquÃ©e selon une rÃ¨gle prÃ©dÃ©finie.

Les objectifs doivent Ãªtre mesurÃ©s : distinguer RPO (perte de donnÃ©es acceptable) et RTO (temps de reprise). Le RPO de bulletins confirmÃ©s visÃ© est zÃ©ro, ce qui exige une architecture et des transactions adaptÃ©es ; ne pas le dÃ©clarer atteint sans test de panne et preuve.

## 25.2 Audit indÃ©pendant

Audit de sÃ©curitÃ© indÃ©pendant obligatoire avant toute mise en production Ã©lectorale rÃ©elle. PÃ©rimÃ¨tre : architecture, isolation tenant, authentification, autorisations, RLS, code, dÃ©pendances, API, infrastructure, cryptographie, intÃ©gritÃ©, gestion des clÃ©s, confidentialitÃ©, tests d'intrusion et procÃ©dures opÃ©rationnelles.

Aucune mise en production rÃ©elle si une vulnÃ©rabilitÃ© critique ou Ã©levÃ©e reste non corrigÃ©e et non revÃ©rifiÃ©e. Un rapport, un plan de remÃ©diation et les preuves de correction sont conservÃ©s.

## 25.3 ContinuitÃ©

DÃ©finir runbooks, personnes habilitÃ©es, stratÃ©gie de sauvegarde hors du projet principal lorsque possible, restauration dans un environnement propre, rotation des secrets, retour arriÃ¨re de version et procÃ©dure d'arrÃªt contrÃ´lÃ©. Tester la reprise et les procÃ©dures de scrutin interrompu.

# 26. Protection des donnÃ©es et conformitÃ©

La plateforme sera initialement conÃ§ue depuis le SÃ©nÃ©gal et peut traiter des informations personnelles d'Ã©lecteurs, de membres, de candidats et de reprÃ©sentants d'organisations. La loi sÃ©nÃ©galaise nÂ° 2008-12 du 25 janvier 2008 relative Ã  la protection des donnÃ©es Ã  caractÃ¨re personnel et les formalitÃ©s de la Commission de Protection des DonnÃ©es Personnelles (CDP) doivent Ãªtre examinÃ©es par une personne compÃ©tente avant tout traitement rÃ©el.

Le dossier de conformitÃ© doit couvrir : finalitÃ©s, base juridique, catÃ©gories de donnÃ©es, minimisation, durÃ©e de conservation, droits des personnes, sous-traitants, transferts internationaux, sÃ©curitÃ©, information, suppression/archivage et procÃ©dure de violation de donnÃ©es. La CDP publie des formalitÃ©s distinctes, notamment dÃ©claration normale et demande d'autorisation pour certains traitements sensibles ou transferts vers un pays tiers. L'applicabilitÃ© exacte dÃ©pend de la configuration rÃ©elle, des donnÃ©es et des flux ; ne pas conclure automatiquement qu'une dÃ©claration ou autorisation est suffisante.

Pour chaque organisation, dÃ©finir les responsabilitÃ©s respectives de responsable de traitement et sous-traitant, les clauses contractuelles, les instructions et les modalitÃ©s de gestion des demandes de droits.

Aucune donnÃ©e rÃ©elle d'Ã©lection ne doit Ãªtre importÃ©e avant examen juridique/rÃ©glementaire et validations requises. Ce cahier des charges ne constitue pas un avis juridique.

# 27. QualitÃ©, tests et critÃ¨res d'acceptation transverses

Chaque fonctionnalitÃ© livrÃ©e doit satisfaire au minimum :

- critÃ¨res d'acceptation fonctionnels documentÃ©s ;
- validation de formulaire cÃ´tÃ© client et serveur ;
- contrÃ´le de permissions serveur ;
- contrÃ´le RLS sur les donnÃ©es concernÃ©es ;
- tests unitaires des rÃ¨gles mÃ©tier ;
- tests d'intÃ©gration des transitions et transactions ;
- tests E2E des parcours critiques ;
- tests de refus et d'accÃ¨s interdit ;
- comportement FR/EN complet ;
- Ã©tats de chargement, erreur, vide et succÃ¨s ;
- accessibilitÃ© clavier et contraste vÃ©rifiÃ©s ;
- journalisation sans donnÃ©e sensible superflue ;
- documentation de fonctionnalitÃ© et de configuration actualisÃ©e.

Les tests sensibles doivent couvrir notamment : double participation, double soumission, simultanÃ©itÃ© de deux requÃªtes, gel de liste, seuil de quorum, vote blanc, Ã©galitÃ©, second tour, visibilitÃ© des rÃ©sultats, suspension, reprise, publication, rÃ©vocation de permission et isolation entre deux tenants.

# 28. Structure de dÃ©pÃ´t recommandÃ©e

```text
/
â”œâ”€â”€ AGENTS.md
â”œâ”€â”€ CLAUDE.md                      # adaptateur court vers AGENTS.md si utile
â”œâ”€â”€ GEMINI.md                      # adaptateur court vers AGENTS.md si utile
â”œâ”€â”€ README.md
â”œâ”€â”€ STATUS.md
â”œâ”€â”€ CHANGELOG.md
â”œâ”€â”€ CONTRIBUTING.md
â”œâ”€â”€ SECURITY.md
â”œâ”€â”€ .env.example
â”œâ”€â”€ .gitignore
â”œâ”€â”€ .gitmessage
â”œâ”€â”€ package.json
â”œâ”€â”€ pnpm-lock.yaml
â”œâ”€â”€ src/
â”‚   â”œâ”€â”€ app/[locale]/               # routes et layouts App Router
â”‚   â”œâ”€â”€ components/                 # composants partagÃ©s rÃ©ellement gÃ©nÃ©riques
â”‚   â”œâ”€â”€ features/                   # modules verticaux par domaine
â”‚   â”œâ”€â”€ lib/                        # infrastructure transversale
â”‚   â”œâ”€â”€ styles/
â”‚   â””â”€â”€ types/
â”œâ”€â”€ supabase/
â”‚   â”œâ”€â”€ migrations/
â”‚   â”œâ”€â”€ seed.sql
â”‚   â”œâ”€â”€ tests/
â”‚   â””â”€â”€ config.toml
â”œâ”€â”€ tests/
â”‚   â”œâ”€â”€ unit/
â”‚   â”œâ”€â”€ integration/
â”‚   â”œâ”€â”€ e2e/
â”‚   â””â”€â”€ security/
â”œâ”€â”€ docs/
â”‚   â”œâ”€â”€ product/
â”‚   â”œâ”€â”€ architecture/adr/
â”‚   â”œâ”€â”€ security/
â”‚   â”œâ”€â”€ data-model/
â”‚   â”œâ”€â”€ features/<feature>/
â”‚   â”œâ”€â”€ roadmap/sprints/
â”‚   â”œâ”€â”€ operations/runbooks/
â”‚   â”œâ”€â”€ compliance/
â”‚   â””â”€â”€ ai/prompts/
â””â”€â”€ scripts/
```

Organisation recommandÃ©e d'un domaine `src/features/<domain>/` : `components/`, `schemas/`, `services/`, `queries/`, `actions/`, `types/`, `tests/` et `index.ts` lorsque utile. Ã‰viter les dossiers vides dÃ©coratifs. Les migrations Supabase restent la source de vÃ©ritÃ© du schÃ©ma.

# 29. Plan de rÃ©alisation dÃ©taillÃ© â€” 34 sprints

Les sprints sont des unitÃ©s de livraison, pas une estimation calendaire. Un sprint ne se ferme que lorsque ses critÃ¨res d'acceptation, tests et documents sont Ã  jour. Chaque sprint dÃ©pend des prÃ©cÃ©dents ; les sujets de sÃ©curitÃ© Ã©lectorale peuvent nÃ©cessiter des recherches et revues externes.

## Phase A â€” Cadrage exÃ©cutable et fondations

### Sprint 00 â€” Audit du dÃ©pÃ´t et initialisation documentaire
- Inspecter le dÃ©pÃ´t, l'environnement et les fichiers existants avant toute modification.
- CrÃ©er/mettre Ã  jour `AGENTS.md`, `README.md`, `STATUS.md`, `CHANGELOG.md`, `CONTRIBUTING.md`, `SECURITY.md` et les prompts de session.
- Importer le cahier des charges comme rÃ©fÃ©rence versionnÃ©e.
- DÃ©finir les conventions de nommage, commits, branches, tests et dÃ©cisions ADR.
- **Acceptation :** un nouvel agent peut comprendre l'Ã©tat du projet en lisant les fichiers de reprise sans relire les conversations.

### Sprint 01 â€” Bootstrap Next.js et outillage
- CrÃ©er Next.js App Router avec TypeScript strict, Tailwind et pnpm.
- Installer uniquement les dÃ©pendances validÃ©es et gratuites.
- Configurer lint, format, scripts `dev`, `build`, `typecheck`, `test`.
- CrÃ©er `.env.example` sans secret et vÃ©rifier `.gitignore`.
- **Acceptation :** application dÃ©marre localement, build et vÃ©rifications passent, aucun secret n'est commitÃ©.

### Sprint 02 â€” Design system initial
- Tokens couleur, typographie, espacements, rayons, ombres et focus.
- Boutons, champs, labels, alertes, badges d'Ã©tat, dialogues, tableaux de base, navigation.
- Contraste et composants clavier accessibles.
- **Acceptation :** page de dÃ©monstration du systÃ¨me, tokens documentÃ©s, aucun style dÃ©coratif superflu.

### Sprint 03 â€” Internationalisation FR/EN
- Routage locale, dictionnaires, sÃ©lection de langue, formatage date/heure/nombres.
- Tests de clÃ©s manquantes et navigation bilingue.
- **Acceptation :** aucune chaÃ®ne systÃ¨me majeure codÃ©e en dur dans les pages initiales.

### Sprint 04 â€” Architecture Supabase et migrations
- Configurer projet local ou projet distant de dÃ©veloppement gratuit.
- CrÃ©er adaptateurs client/serveur, typage gÃ©nÃ©rÃ© et gestion d'erreurs.
- PremiÃ¨re migration, conventions SQL, test DB.
- **Acceptation :** connexion serveur/client correctement sÃ©parÃ©e ; clÃ©s secrÃ¨tes absentes du bundle navigateur.

## Phase B â€” IdentitÃ©, tenant et contrÃ´le d'accÃ¨s

### Sprint 05 â€” ModÃ¨le organisation/tenant
- Tables organisation, domaine/slug, Ã©tats, prÃ©fÃ©rences et branding.
- RÃ©solution tenant cÃ´tÃ© serveur sans faire confiance Ã  l'URL seule.
- Contraintes d'intÃ©gritÃ© et premiers tests de collision de slug.
- **Acceptation :** le contexte tenant est explicite et testÃ©.

### Sprint 06 â€” Isolation RLS et tests inter-tenant
- RLS, grants/revokes, politiques par opÃ©ration, fonctions de support minimales.
- Tests autorisÃ©/refusÃ© pour tenant A et B.
- Revue des vues, fonctions et Storage.
- **Acceptation :** aucune table exposÃ©e sans RLS/grants appropriÃ©s ; tests nÃ©gatifs verts.

### Sprint 07 â€” Authentification invitation-only
- Connexion, dÃ©connexion, invitation, acceptation, rÃ©initialisation, expiration et rÃ©vocation.
- Messages sÃ©curisÃ©s anti-Ã©numÃ©ration.
- **Acceptation :** aucun endpoint d'inscription publique classique ; tests de cycle de vie des invitations.

### Sprint 08 â€” MFA et sessions
- TOTP, enrÃ´lement, challenge, vÃ©rification, rÃ©vocation et niveau d'assurance.
- RÃ¨gles obligatoires pour comptes sensibles.
- **Acceptation :** endpoints sensibles refusent une session insuffisamment forte.

### Sprint 09 â€” RÃ´les et permissions
- Cinq rÃ´les prÃ©dÃ©finis et permissions granulaires.
- Permissions personnalisÃ©es limitÃ©es par celles de l'administrateur.
- Attributions au niveau organisation et au niveau scrutin.
- **Acceptation :** matrice testÃ©e, auditeur en lecture seule, gestionnaire sans privilÃ¨ges implicites d'administrateur.

### Sprint 10 â€” Backoffice central initial
- Shell central, navigation, supervision des organisations et Ã©tat systÃ¨me.
- **Acceptation :** accÃ¨s rÃ©servÃ© au super administrateur, audit des actions.

## Phase C â€” Demandes et espaces organisationnels

### Sprint 11 â€” Portail public
- Pages principales, navigation, responsive, FR/EN, pages lÃ©gales provisoires.
- **Acceptation :** parcours public accessible, textes de dÃ©monstration identifiÃ©s.

### Sprint 12 â€” Demande d'espace
- Formulaire simple et dÃ©taillÃ©, brouillon, validations, piÃ¨ces justificatives.
- Upload privÃ© et contrÃ´les de fichier.
- **Acceptation :** soumission n'active aucun tenant ni backoffice.

### Sprint 13 â€” VÃ©rification et dÃ©cision
- File de demandes, demandes de complÃ©ments, approbation/refus avec motif.
- Journal d'audit et historique.
- **Acceptation :** transitions contrÃ´lÃ©es et dÃ©cision traÃ§able.

### Sprint 14 â€” Provisionnement idempotent
- CrÃ©ation tenant et paramÃ¨tres initiaux aprÃ¨s approbation.
- Invitation du premier administrateur.
- Reprise aprÃ¨s Ã©chec partiel.
- **Acceptation :** aucune organisation en Ã©tat actif avant provisionnement complet.

### Sprint 15 â€” Backoffice organisation et branding
- Shell org, navigation, profil, identitÃ© visuelle, prÃ©fÃ©rences, langue.
- **Acceptation :** isolation tenant vÃ©rifiÃ©e et rendu personnalisÃ© sans casser les rÃ¨gles design.

### Sprint 16 â€” Membres et dÃ©lÃ©gation
- Invitations, rÃ´les, permissions, rÃ©vocation, liste des membres, MFA status.
- **Acceptation :** contrÃ´le des privilÃ¨ges, Ã©vÃ©nements auditables.

## Phase D â€” Gestion des scrutins

### Sprint 17 â€” ModÃ¨le et cycle de vie du scrutin
- Ã‰tats, transitions, calendrier, fuseau, validations et brouillons.
- Assistant guidÃ© et formulaire rapide utilisant le mÃªme domaine.
- **Acceptation :** machine Ã  Ã©tats testÃ©e ; impossible d'ouvrir un scrutin incomplet.

### Sprint 18 â€” Candidats et contenus bilingues
- CRUD contrÃ´lÃ©, mÃ©dias, biographies FR/EN, ordre et gel.
- **Acceptation :** changements interdits aprÃ¨s l'Ã©tape de gel sauf procÃ©dure exceptionnelle.

### Sprint 19 â€” Import et gestion de l'Ã©lectorat
- CSV, mapping, erreurs, doublons, Ã©dition manuelle, invitations et statuts.
- **Acceptation :** import atomique ou rapport d'Ã©chec explicite ; donnÃ©es tenant-isolÃ©es.

### Sprint 20 â€” Validation et gel de la liste
- PrÃ©paration, revue par personne habilitÃ©e, validation et version immuable.
- ProcÃ©dure exceptionnelle de correction.
- **Acceptation :** le quorum se base sur une version gelÃ©e ; aucune mutation silencieuse.

### Sprint 21 â€” RÃ¨gles de scrutin
- Quorum facultatif, vote blanc facultatif, Ã©galitÃ©, visibilitÃ© des rÃ©sultats.
- ParamÃ¨tres confirmÃ©s avant ouverture et figÃ©s ensuite.
- **Acceptation :** tests limites et affichage des rÃ¨gles avant vote.

## Phase E â€” Vote, secret et rÃ©sultats

### Sprint 22 â€” Ã‰tude et dÃ©cision du protocole de vote
- Analyse de menace, comparaison de protocoles Ã©prouvÃ©s, vÃ©rification de bibliothÃ¨ques, revue spÃ©cialisÃ©e.
- DÃ©finir le modÃ¨le d'identitÃ©, credential, urne, chiffrement, dÃ©pouillement et preuve.
- ADR obligatoire et validation externe.
- **Acceptation :** protocole documentÃ© et acceptÃ© par revue compÃ©tente ; sinon rester en sandbox.

### Sprint 23 â€” Adaptateur de vote sandbox
- DÃ©velopper une interface isolÃ©e et un mode de test marquÃ© non-production.
- Simuler les opÃ©rations sans exposer de donnÃ©es rÃ©elles.
- **Acceptation :** banniÃ¨re non-production et garde-fous empÃªchant activation rÃ©elle sans gate documentÃ©.

### Sprint 24 â€” Parcours Ã©lecteur
- Accueil, dÃ©tails, sÃ©lection, confirmation, soumission et accusÃ© neutre.
- RÃ©activitÃ© mobile, erreurs rÃ©seau et double soumission.
- **Acceptation :** aucune confirmation mensongÃ¨re ; choix absent des emails et historiques.

### Sprint 25 â€” Comptage et vÃ©rification
- Calcul dÃ©terministe selon protocole, quorum, bulletins blancs et Ã©galitÃ©s.
- Validation des rÃ©sultats par acteurs habilitÃ©s.
- **Acceptation :** tests reproductibles, preuves/versioning, aucun edit manuel direct.

### Sprint 26 â€” Publication et accÃ¨s rÃ©sultats
- RÃ©sultats provisoires/dÃ©finitifs, authentifiÃ©s/publics selon rÃ¨gle prÃ©configurÃ©e.
- Exports et historique publication.
- **Acceptation :** seuls les rÃ©sultats publiÃ©s sont visibles aux Ã©lecteurs/public.

### Sprint 27 â€” Second tour assistÃ©
- DÃ©tection Ã©galitÃ©, prÃ©paration d'un scrutin liÃ©, validation humaine, invitations.
- **Acceptation :** second tour distinct avec ses propres rÃ¨gles/dates et relation historique.

## Phase F â€” Communication, audit et exploitation

### Sprint 28 â€” Notifications internes
- Centre de notifications, prÃ©fÃ©rences, Ã©vÃ©nements, non-lus et permissions.
- **Acceptation :** notification n'expose pas le choix individuel.

### Sprint 29 â€” Gmail OAuth/API et file d'envoi
- Compte central et connexion par organisation, consentement, refresh/revoke, outbox, retry.
- **Acceptation :** l'Ã©chec email n'affecte jamais l'Ã©criture d'un bulletin ; statut d'envoi correctement qualifiÃ©.

### Sprint 30 â€” ModÃ¨les de communication
- ModÃ¨les FR/EN, prÃ©visualisation, branding encadrÃ©, clauses systÃ¨me verrouillÃ©es.
- **Acceptation :** tests anti-fuite du choix et historique d'envoi.

### Sprint 31 â€” Audit, rapports et exports
- Audit append-only, alertes, sÃ©curitÃ©, rapports et exports autorisÃ©s.
- **Acceptation :** absence de contenu de bulletin dans les journaux ; export protÃ©gÃ© et journalisÃ©.

### Sprint 32 â€” FiabilitÃ© et observabilitÃ©
- Monitoring, alertes, sauvegardes, restauration, runbooks, protection trafic et rÃ©ponse incident.
- **Acceptation :** test de restauration documentÃ© ; scÃ©nario de suspension/reprise exercÃ©.

### Sprint 33 â€” QualitÃ© finale, conformitÃ© et pilote sandbox
- Tests de charge, E2E multi-tenant, accessibilitÃ©, revue sÃ©curitÃ© interne, dossier CDP/juridique, audit indÃ©pendant planifiÃ© puis exÃ©cutÃ© avant production rÃ©elle.
- **Acceptation :** aucun dÃ©faut critique non traitÃ© ; pilote limitÃ© en sandbox ; rapport de dÃ©cision Go/No-Go.

# 30. DÃ©finition du Â« terminÃ© Â» (Definition of Done)

Une tÃ¢che est terminÃ©e uniquement si :

1. le besoin et ses critÃ¨res d'acceptation sont documentÃ©s ;
2. le code est intÃ©grÃ© sans dupliquer la logique mÃ©tier ;
3. les validations serveur et permissions existent ;
4. migrations et RLS sont versionnÃ©es et testÃ©es si donnÃ©es concernÃ©es ;
5. tests pertinents passent ;
6. l'interface FR/EN est complÃ¨te ;
7. les Ã©tats d'erreur, chargement, vide et succÃ¨s sont traitÃ©s ;
8. l'accessibilitÃ© de base est vÃ©rifiÃ©e ;
9. aucune donnÃ©e sensible inutile n'est journalisÃ©e ;
10. docs de fonctionnalitÃ©, statut, changelog et ADR sont actualisÃ©s si nÃ©cessaire ;
11. build, typecheck, lint et tests passent ;
12. aucune dÃ©pense ou activation de service payant n'a Ã©tÃ© engagÃ©e sans accord.

# 31. CritÃ¨res Go/No-Go pour les Ã©lections rÃ©elles

Une dÃ©monstration ou un pilote sandbox peut Ãªtre rÃ©alisÃ© avant ces conditions, avec donnÃ©es fictives uniquement. Un scrutin rÃ©el exige cumulativement :

- protocole de secret du vote sÃ©lectionnÃ©, documentÃ© et Ã©valuÃ© ;
- architecture d'isolation tenant vÃ©rifiÃ©e ;
- audit de sÃ©curitÃ© indÃ©pendant effectuÃ© ;
- vulnÃ©rabilitÃ©s critiques/Ã©levÃ©es corrigÃ©es et retestÃ©es ;
- plan de sauvegarde, restauration et continuitÃ© testÃ© ;
- monitoring et procÃ©dure d'incident opÃ©rationnels ;
- exigences de disponibilitÃ© atteintes sur l'infrastructure retenue ;
- conformitÃ© donnÃ©es personnelles examinÃ©e et formalitÃ©s applicables accomplies ;
- procÃ©dures Ã©lectorales, publication et contestation documentÃ©es ;
- tests de charge correspondant au volume prÃ©vu ;
- approbation explicite de mise en production.

# 32. Glossaire

- **Tenant :** espace logique d'une organisation dans le SaaS.
- **RLS :** Row Level Security, politique d'accÃ¨s aux lignes appliquÃ©e par PostgreSQL.
- **MFA/TOTP :** authentification multi-facteur par code temporaire.
- **RPO :** quantitÃ© maximale de donnÃ©es qu'on accepte de perdre aprÃ¨s incident.
- **RTO :** dÃ©lai cible pour rÃ©tablir un service.
- **Quorum :** seuil de participation requis si le scrutin l'active.
- **Bulletin :** expression du vote, sÃ©parÃ©e de l'identitÃ© de l'Ã©lecteur.
- **Sandbox :** environnement de dÃ©monstration non autorisÃ© pour une Ã©lection rÃ©elle.
- **ADR :** Architecture Decision Record, note de dÃ©cision d'architecture.
- **Idempotence :** rÃ©pÃ©tition d'une requÃªte sans effet mÃ©tier dupliquÃ©.

# 33. RÃ©fÃ©rences techniques et rÃ©glementaires Ã  revÃ©rifier

Les liens suivants constituent les premiÃ¨res sources de travail. L'agent doit revÃ©rifier la version, les limites et la date des documentations avant d'appliquer une procÃ©dure.

- Next.js App Router : https://nextjs.org/docs/app
- Next.js internationalisation : https://nextjs.org/docs/app/guides/internationalization
- Supabase Next.js quickstart : https://supabase.com/docs/guides/getting-started/quickstarts/nextjs
- Supabase SSR Auth : https://supabase.com/docs/guides/auth/server-side
- Supabase Row Level Security : https://supabase.com/docs/guides/database/postgres/row-level-security
- Supabase MFA : https://supabase.com/docs/guides/auth/auth-mfa
- Supabase tarifs et limites : https://supabase.com/pricing et https://supabase.com/docs/guides/platform/billing-on-supabase
- Cloudflare Workers limites : https://developers.cloudflare.com/workers/platform/limits/
- Loi sÃ©nÃ©galaise nÂ° 2008-12, Archives publiques : https://www.archives.sn/docs/codes/loi-protection-donnees-a-caractere-personnel
- CDP SÃ©nÃ©gal, formalitÃ©s : https://www.cdp.sn/conformite/formalites

---

**Fin du cahier des charges.** Ce document est la rÃ©fÃ©rence produit de dÃ©part. Toute Ã©volution doit Ãªtre accompagnÃ©e d'une dÃ©cision documentÃ©e, d'un historique et d'une mise Ã  jour des critÃ¨res d'acceptation.
