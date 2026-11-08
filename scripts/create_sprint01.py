import pathlib
def w(path, lines):
    p = pathlib.Path(path)
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text('\n'.join(lines)+'\n', encoding='utf-8')
    print('OK:', path)
lines = ['# S01 - Bootstrap Next.js et outillage']
lines += ['## Phase: A', '## Statut: NOT STARTED', '## Dependances: S00', '']
lines += ['## Objectif', 'Creer la base Next.js App Router avec TypeScript strict, Tailwind et pnpm.', '']
lines += ['## Livrables', '- [ ] Next.js App Router initialise (version stable)']
lines += ['- [ ] TypeScript strict (strict: true)', '- [ ] Tailwind CSS', '- [ ] ESLint + Prettier']
lines += ['- [ ] Scripts : dev, build, lint, typecheck, test, test:e2e']
lines += ['- [ ] Structure src/app/[locale]/, components/, features/, lib/, styles/, types/']
lines += ['- [ ] 14 sous-dossiers features/ (auth, tenants, elections...)', '- [ ] Adaptateurs Supabase : src/lib/supabase/client.ts, server.ts']
lines += ['- [ ] .env.example + .gitignore mis a jour', '- [ ] Page etat config si Supabase absent', '- [ ] Vitest + Playwright configures', '- [ ] Build propre', '']
lines += ['## Criteres d acceptation']
pm = 'pnpm'
lines += [f'- {pm} dev demarre', f'- {pm} build passe', f'- {pm} typecheck zero erreur', f'- {pm} lint zero erreur']
lines += ['- Aucun secret dans le bundle client', '- Page config si .env.local absent', '- /fr et /en accessibles']
w('docs/roadmap/sprints/SPRINT-01.md', lines)
print('SPRINT-01 done')
