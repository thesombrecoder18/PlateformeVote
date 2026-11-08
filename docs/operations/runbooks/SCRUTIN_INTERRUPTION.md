# SCRUTIN_INTERRUPTION.md - Runbook scrutin interrompu

## Cas declencheurs

- Panne infrastructure pendant scrutin ouvert
- Detection de fraude ou anomalie
- Decision administrative de suspension

## Procedure

1. Suspendre le scrutin (etat paused) - decision humaine habilitee
2. Aucune prolongation automatique : decision motivee, auditee
3. Conserver tous les bulletins deja enregistres
4. Notifier les electeurs sans reveler leur choix
5. Documenter la cause et la duree
6. Decision : reprendre (avec nouvelles dates) ou invalider
7. Si reprise : verifier l integrite avant rouverture
8. Si invalidation : procedure electorale documentee

## Regles absolues

- Les bulletins confirmes ne sont jamais supprimes
- La suspension est journalisee avec motif et acteur
- Le super admin ne peut pas modifier les bulletins
- Toute modification exceptionnelle suit une procedure auditee
