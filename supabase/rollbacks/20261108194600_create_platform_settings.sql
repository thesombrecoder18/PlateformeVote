drop trigger if exists platform_settings_touch_updated_at on public.platform_settings;
drop policy if exists platform_settings_select_deny on public.platform_settings;
drop policy if exists platform_settings_insert_deny on public.platform_settings;
drop policy if exists platform_settings_update_deny on public.platform_settings;
drop policy if exists platform_settings_delete_deny on public.platform_settings;
drop table if exists public.platform_settings;
drop function if exists public.touch_updated_at();
