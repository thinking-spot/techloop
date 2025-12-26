-- Create Explorer Points Table
create table if not exists explorer_points (
  user_id uuid references auth.users not null primary key,
  score integer default 0,
  level integer default 1,
  streak_days integer default 0,
  last_active timestamp with time zone default timezone('utc'::text, now()),
  referral_code text unique,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Create Transactions Table
create table if not exists point_transactions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  amount integer not null,
  type text check (type in ('REFERRAL', 'QA_SUBMISSION', 'DAILY_VESTING', 'SWAP_BONUS', 'REDEMPTION')),
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable RLS
alter table explorer_points enable row level security;
alter table point_transactions enable row level security;

-- Policies
create policy "Users can view own points" on explorer_points
  for select using (auth.uid() = user_id);

create policy "Users can view own transactions" on point_transactions
  for select using (auth.uid() = user_id);
