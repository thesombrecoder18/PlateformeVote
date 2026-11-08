# -*- coding: utf-8 -*-
import pathlib, json
def w(path, content):
    p = pathlib.Path(path)
    p.parent.mkdir(parents=True, exist_ok=True)
    if isinstance(content, list): content = chr(10).join(content)
    p.write_text(content, encoding='utf-8')
    print('OK:', path)
pkg = {
  'name': 'plateforme-vote',
  'version': '0.1.0', 'private': True,
  'scripts': {
    'dev': 'next dev',
    'build': 'next build',
    'start': 'next start',
    'lint': 'next lint',
    'typecheck': 'tsc --noEmit',
    'test': 'vitest run',
    'test:watch': 'vitest',
    'test:e2e': 'playwright test',
    'test:e2e:ui': 'playwright test --ui',
    'format': 'prettier --write .',
    'format:check': 'prettier --check .'
  },
  'dependencies': {
    'next': '15.1.0',
    'react': '19.0.0',
    'react-dom': '19.0.0',
    '@supabase/supabase-js': '2.49.1',
    '@supabase/ssr': '0.12.4',
    'next-intl': '3.26.3',
    'zod': '3.24.1',
    'lucide-react': '0.468.0',
    'clsx': '2.1.1',
    'tailwind-merge': '2.6.0'
  },
  'devDependencies': {
    '@types/node': '22.10.2',
    '@types/react': '19.0.1',
    '@types/react-dom': '19.0.1',
    'typescript': '5.7.2',
    'tailwindcss': '3.4.17',
    'postcss': '8.4.49',
    'autoprefixer': '10.4.20',
    'eslint': '8.57.1',
    'eslint-config-next': '15.1.0',
    '@typescript-eslint/eslint-plugin': '8.18.1',
    '@typescript-eslint/parser': '8.18.1',
    'prettier': '3.4.2',
    'prettier-plugin-tailwindcss': '0.6.9',
    'vitest': '2.1.8',
    '@vitejs/plugin-react': '4.3.4',
    '@testing-library/react': '16.1.0',
    '@testing-library/jest-dom': '6.6.3',
    '@playwright/test': '1.49.1',
    'jsdom': '25.0.1'
  }
}
w('package.json', json.dumps(pkg, indent=2, ensure_ascii=False))
tsconfig = {
  'compilerOptions': {
    'lib': ['dom', 'dom.iterable', 'esnext'],
    'allowJs': True, 'skipLibCheck': True, 'strict': True,
    'noEmit': True, 'esModuleInterop': True,
    'module': 'esnext', 'moduleResolution': 'bundler',
    'resolveJsonModule': True, 'isolatedModules': True,
    'jsx': 'preserve', 'incremental': True,
    'plugins': [{'name': 'next'}],
    'paths': {'@/*': ['./src/*']}
  },
  'include': ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'],
  'exclude': ['node_modules']
}
w('tsconfig.json', json.dumps(tsconfig, indent=2))
# removed bad line
next_config_lines = [
  'import type { NextConfig } from next',
  'import createNextIntlPlugin from next-intl/plugin',
  '',
  'const withNextIntl = createNextIntlPlugin()',
  '',
  'const config: NextConfig = {',
  '  experimental: {',
  '    typedRoutes: true,',
  '  },',
  '}',
  '',
  'export default withNextIntl(config)'
]
w('next.config.ts', '\n'.join(next_config_lines))
tailwind_lines = [
  'import type { Config } from tailwindcss',
  '',
  '// Design tokens - Plateforme vote',
  '// Palette exploratoire (non definitive - voir cahier des charges s 22.1)',
  'const config: Config = {',
  '  content: [',
  '    ./src/**/*.{ts,tsx},',
  '  ],',
  '  theme: {',
  '    extend: {',
  '      colors: {',
  '        brand: {',
  '          night: #14283F,',
  '          teal: #176B66,',
  '          accent: #D49A43,',
  '        },',
  '        surface: {',
  '          base: #F5F7F8,',
  '          border: #DCE4EA,',
  '        },',
  '      },',
  '    },',
  '  },',
  '  plugins: [],',
  '}',
  '',
  'export default config'
]
w('tailwind.config.ts', '\n'.join(tailwind_lines))
postcss = {'plugins': {'tailwindcss': {}, 'autoprefixer': {}}}
w('postcss.config.mjs', 'const config = ' + json.dumps(postcss, indent=2) + '\nexport default config')
prettier = {
  'semi': False, 'singleQuote': True, 'tabWidth': 2,
  'trailingComma': 'all', 'printWidth': 100,
  'plugins': ['prettier-plugin-tailwindcss']
}
w('.prettierrc', json.dumps(prettier, indent=2))
eslint_lines = [
  'import type { Linter } from eslint',
  '',
  'const config: Linter.Config = {',
  '  extends: [next/core-web-vitals, next/typescript],',
  '  rules: {',
  '    // Interdit any non justifie',
  '    @typescript-eslint/no-explicit-any: error,',
  '    // Oblige les composants client a etre explicites',
  '    react/display-name: error,',
  '  },',
  '}',
  '',
  'export default config'
]
w('eslint.config.mjs', '\n'.join(eslint_lines))
vitest_lines = [
  'import { defineConfig } from vitest/config',
  'import react from @vitejs/plugin-react',
  '', 'export default defineConfig({',
  '  plugins: [react()],',
  '  test: {',
  '    environment: jsdom,',
  '    globals: true,'
]
w('vitest.config.ts', '\n'.join(vitest_lines))
playwright_lines = [
  'import { defineConfig, devices } from @playwright/test',
  '',
  'export default defineConfig({',
  '  testDir: ./tests/e2e,',
  '  fullyParallel: true,',
  '  forbidOnly: !!process.env.CI,',
  '  retries: process.env.CI ? 2 : 0,',
  '  reporter: html,',
  '  use: { baseURL: http://localhost:3000 },',
  '  projects: [{ name: chromium, use: { ...devices[Desktop Chrome] } }],',
  '})'
]
w('playwright.config.ts', '\n'.join(playwright_lines))
gitignore_lines = [
  '# Dependencies', 'node_modules/', '.pnp', '.pnp.js', '# Next.js', '.next/', 'out/', '# Build', 'dist/', 'build/', '# Env - JAMAIS DE SECRETS ICI', '.env.local', '.env.*.local', '.env.production', '# Tests', 'playwright-report/', 'test-results/', 'coverage/', '# Editor', '.vscode/', '.idea/', '*.swp', '*.swo', '# OS', '.DS_Store', 'Thumbs.db', '# TypeScript', '*.tsbuildinfo', 'next-env.d.ts', '# Supabase', '.supabase/', '# Logs', '*.log', 'npm-debug.log*'
]
w('.gitignore', '\n'.join(gitignore_lines))
# --- Source files ---
w('src/styles/globals.css', ['@tailwind base;', '@tailwind components;', '@tailwind utilities;', '', '/* Design tokens - Plateforme vote */', ':root {', '  --color-brand-night: #14283F;', '  --color-brand-teal: #176B66;', '  --color-accent: #D49A43;', '  --color-surface-base: #F5F7F8;', '  --color-surface-border: #DCE4EA;', '}'])
w('src/styles/globals.css', '\n'.join(['@tailwind base;', '@tailwind components;', '@tailwind utilities;', '', ':root {', '  --color-brand-night: #14283F;', '  --color-brand-teal: #176B66;', '  --color-surface-base: #F5F7F8;', '}']))
supabase_client_lines = [
  'import { createBrowserClient } from @supabase/ssr',
  'import type { Database } from @/types/database',
  '',
  '/**',
  ' * Cree un client Supabase cote navigateur (Client Component).',
  ' * Utiliser uniquement dans les composants marques use client.',
  ' */',
  'export function createClient() {',
  '  return createBrowserClient<Database>(',
  '    process.env.NEXT_PUBLIC_SUPABASE_URL!,',
  '    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,',
  '  )',
  '}'
]
w('src/lib/supabase/client.ts', '\n'.join(supabase_client_lines))
supabase_server_lines = [
  'import { createServerClient } from @supabase/ssr',
  'import { cookies } from next/headers',
  'import type { Database } from @/types/database',
  '',
  '/**',
  ' * Cree un client Supabase cote serveur (Server Component / Route Handler).',
  ' * SECURITE : ne jamais exposer SERVICE_ROLE_KEY dans ce client.',
  ' */',
  'export async function createServerSupabaseClient() {',
  '  const cookieStore = await cookies()',
  '  return createServerClient<Database>(',
  '    process.env.NEXT_PUBLIC_SUPABASE_URL!,',
  '    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,',
  '    {',
  '      cookies: {',
  '        getAll() { return cookieStore.getAll() },',
  '        setAll(cookiesToSet) {',
  '          try { cookiesToSet.forEach(({ name, value, options }) =>',
  '            cookieStore.set(name, value, options)) } catch { }',
  '        },',
  '      },',
  '    },',
  '  )',
  '}'
]
w('src/lib/supabase/server.ts', '\n'.join(supabase_server_lines))
middleware_lines = [
  'import { createServerClient } from @supabase/ssr',
  'import { NextResponse } from next/server',
  'import type { NextRequest } from next/server',
  'import createMiddleware from next-intl/middleware',
  'import { routing } from @/lib/i18n/routing',
  '',
  'const handleI18n = createMiddleware(routing)',
  '',
  'export async function middleware(request: NextRequest) {',
  '  let response = NextResponse.next({ request })',
  '',
  '  // Rafraichissement de session Supabase',
  '  const supabase = createServerClient(',
  '    process.env.NEXT_PUBLIC_SUPABASE_URL!,',
  '    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,',
  '    { cookies: { getAll() { return request.cookies.getAll() },',
  '      setAll(c) { c.forEach(({ name, value, options }) => response.cookies.set(name, value, options)) } } },',
  '  )',
  '  await supabase.auth.getUser()',
  '',
  '  // Gestion i18n',
  '  return handleI18n(request)',
  '}',
  '',
  'export const config = {',
  '  matcher: [/((?!_next|_vercel|.*\\..*).*)],',
  '}'
]
w('src/middleware.ts', '\n'.join(middleware_lines))
w('src/lib/i18n/routing.ts', ['import { defineRouting } from next-intl/routing', '', 'export const routing = defineRouting({', '  locales: [fr, en],', '  defaultLocale: fr,', '  localePrefix: always,', '})'])
w('src/lib/i18n/messages/fr.json', json.dumps({'app': {'name': 'Plateforme Vote', 'tagline': 'Votes electroniques securises pour votre organisation'}, 'nav': {'home': 'Accueil', 'login': 'Connexion', 'logout': 'Deconnexion', 'dashboard': 'Tableau de bord'}, 'common': {'loading': 'Chargement...', 'error': 'Une erreur est survenue', 'save': 'Enregistrer', 'cancel': 'Annuler', 'confirm': 'Confirmer', 'back': 'Retour'}, 'config': {'missing': 'Configuration Supabase manquante', 'instructions': 'Copier .env.example en .env.local et renseigner les variables Supabase.'}}, indent=2, ensure_ascii=False))
w('src/lib/i18n/messages/en.json', json.dumps({'app': {'name': 'Vote Platform', 'tagline': 'Secure electronic voting for your organization'}, 'nav': {'home': 'Home', 'login': 'Sign in', 'logout': 'Sign out', 'dashboard': 'Dashboard'}, 'common': {'loading': 'Loading...', 'error': 'An error occurred', 'save': 'Save', 'cancel': 'Cancel', 'confirm': 'Confirm', 'back': 'Back'}, 'config': {'missing': 'Supabase configuration missing', 'instructions': 'Copy .env.example to .env.local and fill in Supabase variables.'}}, indent=2, ensure_ascii=False))
w('src/types/database.ts', ['// Types generes par Supabase CLI', '// Regenerer avec : supabase gen types typescript --local > src/types/database.ts', '', 'export type Database = {', '  public: {', '    Tables: Record<string, never>', '    Views: Record<string, never>', '    Functions: Record<string, never>', '  }', '}'])
w('src/types/index.ts', ['// Types globaux du projet', 'export type Locale = fr | en', 'export type { Database } from ./database'])
root_layout_lines = [
  'import type { ReactNode } from react',
  'import type { Locale } from @/types',
  'import { NextIntlClientProvider } from next-intl',
  'import { getMessages } from next-intl/server',
  'import { Inter } from next/font/google',
  'import @/styles/globals.css',
  '',
  'const inter = Inter({ subsets: [latin] })',
  '',
  'export default async function LocaleLayout({',
  '  children, params,',
  '}: {',
  '  children: ReactNode',
  '  params: Promise<{ locale: Locale }>',
  '}) {',
  '  const { locale } = await params',
  '  const messages = await getMessages()',
  '  return (',
  '    <html lang={locale}>',
  '      <body className={inter.className}>',
  '        <NextIntlClientProvider messages={messages}>',
  '          {children}',
  '        </NextIntlClientProvider>',
  '      </body>',
  '    </html>',
  '  )',
  '}'
]
w('src/app/[locale]/layout.tsx', '\n'.join(root_layout_lines))
home_page_lines = [
  'import { useTranslations } from next-intl',
  'import { ConfigWarning } from @/components/config-warning',
  '',
  'export default function HomePage() {',
  '  const t = useTranslations()',
  '  const hasSupabase = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)',
  '  return (',
  '    <main className=min-h-screen bg-surface-base>',
  '      {!hasSupabase && <ConfigWarning />}',
  '      <div className=container mx-auto px-4 py-16>',
  '        <h1 className=text-4xl font-bold text-brand-night>',
  '          {t(app.name)}',
  '        </h1>',
  '        <p className=mt-4 text-lg text-gray-600>',
  '          {t(app.tagline)}',
  '        </p>',
  '        <div className=mt-4 rounded border border-amber-300 bg-amber-50 p-4 text-sm>',
  '          <strong>SANDBOX - NON_PRODUCTION</strong>',
  '          <p>Ce depot est en phase de developpement. Aucun vote reel ne peut etre effectue.</p>',
  '        </div>',
  '      </div>',
  '    </main>',
  '  )',
  '}'
]
w('src/app/[locale]/page.tsx', '\n'.join(home_page_lines))
config_warning_lines = [
  'use client',
  'import { useTranslations } from next-intl',
  '',
  '/**',
  ' * Affiche un avertissement si les variables Supabase sont absentes.',
  ' * Remplace un rendu simule par un etat reel de configuration.',
  ' */',
  'export function ConfigWarning() {',
  '  const t = useTranslations(config)',
  '  return (',
  '    <div role=alert className=border border-red-300 bg-red-50 p-4 text-sm text-red-800>',
  '      <strong>{t(missing)}</strong>',
  '      <p className=mt-1>{t(instructions)}</p>',
  '    </div>',
  '  )',
  '}'
]
w('src/components/config-warning.tsx', '\n'.join(config_warning_lines))
w('tests/unit/setup.ts', ['import @testing-library/jest-dom'])
w('tests/e2e/example.spec.ts', ['import { test, expect } from @playwright/test', '', 'test(home page loads - FR', 'async ({ page }) => {', '  await page.goto(/fr)', '  await expect(page).toHaveTitle(/Plateforme Vote/)', '})', '', 'test(home page loads - EN', 'async ({ page }) => {', '  await page.goto(/en)', '  await expect(page).toHaveTitle(/Vote Platform/)', '})'])
w('supabase/config.toml', ['# Supabase local config', 'project_id = plateforme-vote', '', '[api]', 'port = 54321', '', '[db]', 'port = 54322', 'major_version = 15', '', '[studio]', 'port = 54323', '', '[auth]', 'site_url = http://localhost:3000', 'jwt_expiry = 3600'])
print('All Next.js config files created')
