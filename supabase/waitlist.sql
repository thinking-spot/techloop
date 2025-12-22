-- Create Waitlist Table
create table if not exists public.waitlist (
  id uuid not null default gen_random_uuid() primary key,
  email text not null unique,
  device_interest text,
  created_at timestamptz default now()
);

-- Enable RLS (Security)
alter table public.waitlist enable row level security;

-- Allow anyone to insert (public form)
create policy "Anyone can join waitlist"
  on public.waitlist
  for insert
  with check (true);

-- Only admins/service role can view (default deny for select/update/delete for public)
