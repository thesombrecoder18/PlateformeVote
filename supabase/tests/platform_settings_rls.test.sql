begin;

select plan(8);

select has_table('public', 'platform_settings', 'platform_settings existe');

select ok(
  (
    select c.relrowsecurity and c.relforcerowsecurity
    from pg_class c
    join pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'public' and c.relname = 'platform_settings'
  ),
  'RLS activee et forcee'
);

select is(
  (
    select count(*)::integer
    from pg_policies
    where schemaname = 'public' and tablename = 'platform_settings'
  ),
  4,
  'une policy par operation'
);

select ok(
  not has_table_privilege('anon', 'public.platform_settings', 'select')
  and not has_table_privilege('anon', 'public.platform_settings', 'insert')
  and not has_table_privilege('anon', 'public.platform_settings', 'update')
  and not has_table_privilege('anon', 'public.platform_settings', 'delete'),
  'anon n a aucun privilege'
);

select ok(
  not has_table_privilege('authenticated', 'public.platform_settings', 'select')
  and not has_table_privilege('authenticated', 'public.platform_settings', 'insert')
  and not has_table_privilege('authenticated', 'public.platform_settings', 'update')
  and not has_table_privilege('authenticated', 'public.platform_settings', 'delete'),
  'authenticated n a aucun privilege'
);

select ok(
  has_table_privilege('service_role', 'public.platform_settings', 'select'),
  'service_role peut lire'
);

set local role anon;

select throws_ok(
  'select key from public.platform_settings',
  '42501',
  null,
  'anon est refuse en SELECT'
);

reset role;
set local role authenticated;

select throws_ok(
  $$insert into public.platform_settings (key, value) values ('intrusion', '{"mode":"no"}'::jsonb)$$,
  '42501',
  null,
  'authenticated est refuse en INSERT'
);

select * from finish();

rollback;
