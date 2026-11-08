-- Table plateforme globale, exception ADR-0003 : aucune colonne d organisation.
-- Aucune donnee electorale. Le marqueur ci-dessous est synthetique.

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

revoke all on function public.touch_updated_at() from public;
revoke all on function public.touch_updated_at() from anon;
revoke all on function public.touch_updated_at() from authenticated;

create table public.platform_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now(),
  constraint platform_settings_key_format check (key ~ '^[a-z][a-z0-9_]{1,63}$')
);

insert into public.platform_settings (key, value)
values ('runtime_mode', '{"mode":"sandbox_non_production"}'::jsonb);

create trigger platform_settings_touch_updated_at
  before update on public.platform_settings
  for each row
  execute function public.touch_updated_at();

alter table public.platform_settings enable row level security;
alter table public.platform_settings force row level security;

revoke all on table public.platform_settings from public;
revoke all on table public.platform_settings from anon;
revoke all on table public.platform_settings from authenticated;
grant select, insert, update, delete on table public.platform_settings to service_role;

create policy platform_settings_select_deny
  on public.platform_settings
  for select
  to anon, authenticated
  using (false);

create policy platform_settings_insert_deny
  on public.platform_settings
  for insert
  to anon, authenticated
  with check (false);

create policy platform_settings_update_deny
  on public.platform_settings
  for update
  to anon, authenticated
  using (false)
  with check (false);

create policy platform_settings_delete_deny
  on public.platform_settings
  for delete
  to anon, authenticated
  using (false);
