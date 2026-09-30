-- profiles holds each user's email, so only the owner may read their row.
--
-- supabase/schema.sql used to create "Public profiles are viewable by everyone."
-- (select using (true)). With that policy, anyone holding the public anon key
-- could list every user's email address straight from the API. The init
-- migration already had the owner-only rule, so which one your database has
-- depends on which file it was built from. This is safe to run either way:
-- it removes the open policy if it exists and makes sure the owner-only one does.
--
-- Only policies on public.profiles are touched. The public read policy on
-- public.products (which the init migration oddly names "Public profiles are
-- viewable by everyone") is intentional and stays.

drop policy if exists "Public profiles are viewable by everyone." on public.profiles;
drop policy if exists "Public profiles are viewable by everyone" on public.profiles;
drop policy if exists "Users can view own profile" on public.profiles;

create policy "Users can view own profile"
  on public.profiles
  for select
  using ( auth.uid() = id );
