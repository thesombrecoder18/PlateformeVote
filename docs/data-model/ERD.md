# ERD.md - Description des entites et relations

## Domaine : Plateforme

organizations : tenant_id, slug, name, status, created_at
organization_requests : id, organization data, status, reviewer_id, history
organization_documents : id, org_id, type, storage_path, access_log
domains : id, org_id, subdomain, verified
platform_settings : key, value

## Domaine : Identite et acces

profiles : id (= auth.users.id), tenant_id, display_name, locale
memberships : id, tenant_id, user_id, role, status
roles : id, name, description
permissions : id, code, description
role_permissions : role_id, permission_id
member_permissions : membership_id, permission_id, scope, expires_at
invitations : id, tenant_id, email, role, token, expires_at, used_at

## Domaine : Scrutins

elections : id, tenant_id, title_fr, title_en, status, rules, dates
election_rules : election_id, quorum, blank_vote, tie_rule, result_visibility
election_state_transitions : id, election_id, from, to, actor_id, reason, ts
candidates : id, election_id, tenant_id, order, photo_path
candidate_translations : candidate_id, locale, name, bio

## Domaine : Electorat

electoral_lists : id, election_id, tenant_id, version, frozen_at
electors : id, list_id, tenant_id, email, eligibility_status
imports : id, tenant_id, election_id, file_path, status
import_errors : id, import_id, row, error

## Domaine : Vote (schema definitif depend du protocole S22)

ATTENTION : Les tables ci-dessous sont indicatives.
Le schema reel sera defini apres validation du protocole (S22).
voting_credentials : (isole du bulletin)
ballots : (sans lien direct vers l identite)

## Domaine : Resultats

tallies : id, election_id, candidate_id, count, computed_at
result_reviews : id, election_id, reviewer_id, status, ts
result_publications : id, election_id, level, published_at, published_by
runoff_links : id, parent_election_id, child_election_id

## Domaine : Communication

gmail_connections : id, tenant_id, email, tokens_encrypted, scopes
email_templates : id, tenant_id, type, subject_fr, subject_en, body
notification_events : id, tenant_id, user_id, type, read_at
email_outbox : id, tenant_id, template_id, status, attempts

## Domaine : Audit

audit_events : id, tenant_id, actor_id, action, target, ts, result
security_events : id, type, ip, ts, details
incident_records : id, type, status, description, created_at

## Domaine : Configuration

organization_branding : tenant_id, logo_path, colors, cover_path
organization_preferences : tenant_id, default_locale, settings
retention_policies : tenant_id, category, duration_days
