# S02 - Design system initial

## Phase: A
## Statut: DONE
## Objectif
Tokens couleur, typographie, composants de base, accessibilite WCAG 2.2 AA
## Dependances: S01
## Livrables
- [x] Tokens couleur dans src/lib/design/tokens.ts, relies a Tailwind et aux variables CSS
- [x] Verification de contraste (texte 4.5:1, contours non textuels 3:1)
- [x] Composants : Button, Input, Label, Field, Alert, Badge, Dialog, DataTable, Nav, SkipLink
- [x] Page de demonstration /fr/design et /en/design
- [x] Banniere SANDBOX NON_PRODUCTION via Alert
- [x] Focus visible, cibles 44 px, prefers-reduced-motion, lien d evitement
## Criteres d acceptation
- [x] Page de demonstration du systeme, FR et EN
- [x] Tokens documentes ; l accent chaud n est pas utilise comme texte sur fond clair
- [x] Aucun style decoratif superflu (pas de degrade, ombre lourde ni animation)
- [x] Contraste, labels, erreurs associees et navigation clavier couverts par les composants
- [x] Tests unitaires, typecheck, lint et build passent

## Fondations retenues
- Typographie : Inter, display swap
- Espacements et rayons : echelle Tailwind (rayon des controles : rounded-md)
- Ombre unique : shadow-panel, reservee au dialogue
- Palette de travail, exploratoire au sens du cahier section 22.1, verifiee en contraste et non certifiee
