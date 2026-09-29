-- Waitlist v2: record where signups come from and who they are.
--
-- Safe to run more than once. Apply this BEFORE (or right after) deploying the
-- new signup form. Until it is applied the site still saves signups, but only
-- their email and device (see submitWaitlist in src/lib/waitlist.ts).

-- The original table (also in supabase/waitlist.sql). No-op if it exists.
create table if not exists public.waitlist (
  id uuid not null default gen_random_uuid() primary key,
  email text not null unique,
  device_interest text,
  created_at timestamptz default now()
);

alter table public.waitlist enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'waitlist'
      and policyname = 'Anyone can join waitlist'
  ) then
    create policy "Anyone can join waitlist"
      on public.waitlist
      for insert
      with check (true);
  end if;
end $$;

-- New columns.
--   role          optional self-description (developer, creator, ...)
--   source        page the form was submitted from, path only
--   referrer      referring site, hostname only
--   utm_*         campaign tags from the landing URL
--   consented_at  when they submitted the form (the launch-email disclosure sits next to the button)
--   form_version  1 = the original form, 2 = this one
alter table public.waitlist
  add column if not exists role text,
  add column if not exists source text,
  add column if not exists referrer text,
  add column if not exists utm_source text,
  add column if not exists utm_medium text,
  add column if not exists utm_campaign text,
  add column if not exists consented_at timestamptz,
  add column if not exists form_version smallint not null default 1;

comment on column public.waitlist.form_version is
  '1 = original form, whose device dropdown defaulted to Meta Ray-Ban, so device_interest on these rows is unreliable. 2 = current form, device is blank unless chosen.';

-- Anyone can insert (the public form), so bound what a direct API call can
-- write. NOT VALID means existing rows are left alone; only new rows are checked.
do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'waitlist_email_shape') then
    alter table public.waitlist
      add constraint waitlist_email_shape
      check (char_length(email) <= 254 and position('@' in email) > 1) not valid;
  end if;

  if not exists (select 1 from pg_constraint where conname = 'waitlist_field_lengths') then
    alter table public.waitlist
      add constraint waitlist_field_lengths
      check (
        char_length(coalesce(device_interest, '')) <= 64 and
        char_length(coalesce(role, '')) <= 32 and
        char_length(coalesce(source, '')) <= 200 and
        char_length(coalesce(referrer, '')) <= 100 and
        char_length(coalesce(utm_source, '')) <= 100 and
        char_length(coalesce(utm_medium, '')) <= 100 and
        char_length(coalesce(utm_campaign, '')) <= 100
      ) not valid;
  end if;
end $$;
