-- RLS on auth.users is usually enabled by default or managed by Supabase.
-- We will skip explicit enabling to avoid permission errors.


-- PROFILES TABLE
-- Linked to auth.users safely
create table public.profiles (
  id uuid not null references auth.users(id) on delete cascade primary key,
  full_name text,
  email text,
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Profiles Policies
create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Handle new user signup automatically
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.email,
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- PRODUCTS TABLE
create table public.products (
  id uuid not null default gen_random_uuid() primary key,
  name text not null,
  description text,
  features text[], -- Array of feature strings
  monthly_price integer not null, -- Stored in cents
  image_url text,
  category text,
  stock_status text default 'in_stock',
  created_at timestamptz default now()
);

alter table public.products enable row level security;

create policy "Products are viewable by everyone."
  on products for select
  using ( true );

-- SUBSCRIPTIONS TABLE
create table public.subscriptions (
  id uuid not null default gen_random_uuid() primary key,
  user_id uuid not null references public.profiles(id),
  product_id uuid not null references public.products(id),
  status text not null check (status in ('active', 'paused', 'cancelled', 'past_due')),
  start_date timestamptz default now(),
  next_billing_date timestamptz,
  stripe_subscription_id text,
  created_at timestamptz default now()
);

alter table public.subscriptions enable row level security;

create policy "Users can view own subscriptions."
  on subscriptions for select
  using ( auth.uid() = user_id );

-- Insert some dummy data for products
insert into public.products (name, description, monthly_price, image_url, category)
values 
('Ray-Ban Meta', 'Smart glasses with AI.', 2900, 'https://placehold.co/400x300?text=Ray-Ban', 'glasses'),
('Rabbit R1', 'AI pocket companion.', 1900, 'https://placehold.co/400x300?text=Rabbit', 'assistant'),
('Whoop 4.0', 'Fitness and health tracker.', 3000, 'https://placehold.co/400x300?text=Whoop', 'wearable');
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
