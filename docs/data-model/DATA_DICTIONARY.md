# DATA_DICTIONARY.md

## Champs communs a toutes les tables metier

tenant_id : UUID NOT NULL - identifiant de l organisation
id : UUID PRIMARY KEY DEFAULT gen_random_uuid()
created_at : TIMESTAMPTZ DEFAULT now()
updated_at : TIMESTAMPTZ DEFAULT now()

## Statuts d organisation

pending | needs_information | approved | active | suspended | disabled | archived | rejected

## Statuts de demande

draft | submitted | under_review | needs_information | approved | rejected | provisioning | active

## Statuts de scrutin

draft | ready_for_review | approved | scheduled | open | paused | closed | counting
results_under_review | results_provisional | results_final | published | archived
cancelled | invalid_quorum

## Statuts d electeur

eligible | ineligible | invited | accepted | voted | abstained

## Codes de permissions (exemples)

organization.view | organization.settings.manage | organization.branding.manage
members.view | members.invite | members.roles.manage | members.revoke
elections.view | elections.create | elections.edit_draft | elections.submit_for_review
elections.approve_list | elections.freeze_list | elections.schedule | elections.open
candidates.manage | electorate.import | electorate.validate
results.review | results.validate | results.publish | results.export
audit.view | reports.view | reports.export
