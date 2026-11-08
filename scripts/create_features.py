import pathlib
def w(path, content):
    p = pathlib.Path(path)
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(content, encoding='utf-8')
    print('OK:', path)
features = {
  'auth': ('Authentification et comptes', 'specified', 'S07, S08', 'Invitation-only, connexion email+mdp, reinitialisation, MFA TOTP, sessions, revocation'),
  'organizations': ('Organisations et demandes', 'specified', 'S11-S14', 'Portail demande, verification, provisionnement, etats, sous-domaines'),
  'tenants': ('Gestion multi-tenant', 'specified', 'S05, S06', 'tenant_id stable, RLS, isolation, resolution tenant cote serveur'),
  'members-permissions': ('Membres et permissions', 'specified', 'S09, S16', 'Cinq roles, permissions granulaires, delegation, revocation'),
  'elections': ('Scrutins - cycle de vie', 'specified', 'S17, S21', 'Etats, transitions, assistant guide, regles, gel'),
  'candidates': ('Candidats', 'specified', 'S18', 'CRUD, medias, biographies FR/EN, ordre, gel apres ouverture'),
  'electorate': ('Population electorale', 'specified', 'S19, S20', 'Import CSV, validation, gel liste, modification exceptionnelle'),
  'voting': ('Vote et secret electoral', 'not_for_production', 'S22-S24', 'GATE S22 : protocole cryptographique requis avant implementation'),
  'results': ('Resultats et publication', 'specified', 'S25, S26', 'Comptage, validation, publication controlee, exports'),
  'communications': ('Gmail et notifications', 'specified', 'S28-S30', 'Gmail OAuth2, outbox, modeles FR/EN, notifications internes'),
  'audit': ('Audit et journaux', 'specified', 'S31', 'Journal append-only, alertes, securite, conformite, sans choix vote'),
  'reporting': ('Rapports et exports', 'specified', 'S31', 'PDF/CSV/Excel, generes cote serveur, temporaires, journalises'),
  'voter-experience': ('Espace electeur', 'specified', 'S24', 'Mobile-first, selection sans prechoix, confirmation, accuse neutre'),
  'platform-admin': ('Backoffice central', 'specified', 'S10', 'Supervision, organisations, incidents, securite, config globale'),
}
TEMPLATE = '''# {name}
## Statut: {status}
## Objectif
{desc}
## Sprints: {sprints}
## Perimetre
Voir cahier des charges docs/product/CAHIER_DES_CHARGES_COMPLET.md
## Acteurs et permissions
A definir lors du sprint concerne.
## Parcours et workflows
A definir lors du sprint concerne.
## Etats et transitions
A definir lors du sprint concerne.
## Regles metier
Voir docs/product/CAHIER_DES_CHARGES_COMPLET.md pour les regles validees.
## Donnees et confidentialite
A documenter lors du sprint concerne.
## API et actions serveur
A definir lors du sprint concerne.
## Securite et menaces
Voir docs/security/SECURITY_BASELINE.md et THREAT_MODEL.md.
## Audit et notifications
Journaux sans contenu de bulletin ni choix de vote.
## Internationalisation
FR et EN obligatoires. Voir ADR-0005.
## UI/UX et responsive
WCAG 2.2 AA cible. Mobile-first pour l espace electeur.
## Tests attendus
Tests fonctionnels, RLS, acces refuse, FR/EN, etats.
## Criteres d acceptation
A definir avant demarrage du sprint.
## Dependances et ADR
Voir docs/architecture/adr/.
## Questions ouvertes
A preciser lors du sprint.
'''
for slug, (name, status, sprints, desc) in features.items():
  content = TEMPLATE.format(name=name, status=status, desc=desc, sprints=sprints)
  w(f'docs/features/{slug}/README.md', content)
print('Features done')
