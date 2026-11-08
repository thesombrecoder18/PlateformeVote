import pathlib

def w(path, content):
    p = pathlib.Path(path)
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(content, encoding='utf-8')
    print('  OK:', path)

import base64

def wb(path, b64content):
    w(path, base64.b64decode(b64content).decode('utf-8'))

# ---- FICHIERS RACINE ----
lines = []
lines.append("# SECURITY.md")
import pathlib
P = pathlib.Path
def s(path, lines): P(path).parent.mkdir(parents=True, exist_ok=True); P(path).write_text('\n'.join(lines), encoding='utf-8'); print('OK:', path)
# sprints generiques
sprints = {
  'S02': ('Design system initial', 'A', 'S01', 'Tokens couleur, typographie, composants de base, accessibilite WCAG 2.2 AA'),
  'S03': ('Internationalisation FR/EN', 'A', 'S01', 'Routage [locale], next-intl, dictionnaires, formatage date/heure'),
  'S04': ('Architecture Supabase et migrations', 'A', 'S01', 'Connexion, types generes, premiere migration, tests RLS'),
  'S05': ('Modele organisation/tenant', 'B', 'S04', 'Tables organisation, slug, etats, contraintes, isolation tenant'),
  'S06': ('Isolation RLS et tests inter-tenant', 'B', 'S05', 'Policies RLS, grants/revokes, tests acces refuse entre tenants'),
  'S07': ('Authentification invitation-only', 'B', 'S04', 'Connexion, deconnexion, invitation, reinitialisation, revocation'),
  'S08': ('MFA et sessions', 'B', 'S07', 'TOTP, enrolement, challenge, niveau assurance, codes recuperation'),
  'S09': ('Roles et permissions', 'B', 'S07', 'Cinq roles predefinis, permissions granulaires, matrice testee'),
  'S10': ('Backoffice central initial', 'B', 'S09', 'Shell central, supervision organisations, acces super admin'),
  'S11': ('Portail public', 'C', 'S03', 'Pages principales, navigation, responsive, FR/EN, pages legales'),
  'S12': ('Demande d espace', 'C', 'S11', 'Formulaire simple et detaille, brouillon, validations, justificatifs'),
  'S13': ('Verification et decision', 'C', 'S10', 'File demandes, justificatifs, approbation/refus, audit'),
  'S14': ('Provisionnement idempotent', 'C', 'S13', 'Creation tenant, invitation premier admin, reprise apres echec'),
  'S15': ('Backoffice organisation et branding', 'C', 'S09', 'Shell org, navigation, profil, identite visuelle, preferences'),
  'S16': ('Membres et delegation', 'C', 'S15', 'Invitations, roles, permissions, revocation, liste membres'),
  'S17': ('Modele et cycle de vie du scrutin', 'D', 'S16', 'Etats, transitions, calendrier, assistant guide, formulaire rapide'),
  'S18': ('Candidats et contenus bilingues', 'D', 'S17', 'CRUD controle, medias, biographies FR/EN, ordre, gel'),
  'S19': ('Import et gestion de l electorat', 'D', 'S17', 'CSV, mapping, erreurs, doublons, invitations, statuts'),
  'S20': ('Validation et gel de la liste', 'D', 'S19', 'Preparation, revue, validation, version immuable, modification exceptionnelle'),
  'S21': ('Regles de scrutin', 'D', 'S17', 'Quorum facultatif, vote blanc, egalite, visibilite resultats'),
  'S22': ('Etude et decision protocole de vote', 'E', 'S21', 'GATE: analyse menace, protocoles eprouves, ADR, validation externe'),
  'S23': ('Adaptateur de vote sandbox', 'E', 'S22', 'Interface isolee, mode NON_PRODUCTION, garde-fous'),
  'S24': ('Parcours electeur', 'E', 'S23', 'Accueil, selection, confirmation, accuse neutre, mobile-first'),
  'S25': ('Comptage et verification', 'E', 'S23', 'Calcul deterministe, quorum, blancs, egalites, validation habilites'),
  'S26': ('Publication et acces resultats', 'E', 'S25', 'Resultats prov/definitifs, publics/prives, exports, historique'),
  'S27': ('Second tour assiste', 'E', 'S25', 'Detection egalite, scrutin lie, validation humaine, notifications'),
  'S28': ('Notifications internes', 'F', 'S24', 'Centre notifs, preferences, evenements, non-lus, sans choix vote'),
  'S29': ('Gmail OAuth/API et file d envoi', 'F', 'S14', 'OAuth2, tokens, outbox, retry, statuts precis'),
  'S30': ('Modeles de communication', 'F', 'S29', 'Modeles FR/EN, previsualisation, branding, clauses systeme verrouillees'),
  'S31': ('Audit, rapports et exports', 'F', 'S26', 'Audit append-only, alertes, exports proteges et journalises'),
  'S32': ('Fiabilite et observabilite', 'F', 'S31', 'Monitoring, alertes, sauvegardes, restauration, runbooks'),
  'S33': ('Qualite finale et pilote sandbox', 'F', 'S32', 'Tests de charge, E2E, accessibilite, audit independant, Go/No-Go'),
}
for sid, (title, phase, dep, desc) in sprints.items():
  fn = f'docs/roadmap/sprints/SPRINT-{sid[1:].zfill(2)}.md'
  content = f'# {sid} - {title}\n\n## Phase: {phase}\n## Statut: NOT STARTED\n## Objectif\n{desc}\n## Dependances: {dep}\n## Livrables\n- [ ] A definir en detail\n## Criteres d acceptation\n- A definir avant demarrage\n'
  w(fn, content)
print('Sprints generated')
