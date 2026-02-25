-- TechLoop Initial Schema Migration (Version 1.0)
-- Based on the v1.2 Specification

-- Enable the "uuid-ossp" extension for UUID generation if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

--------------------------------------------------------------------------------
-- 1. ENUMS
--------------------------------------------------------------------------------
-- Subscription Status Enum
CREATE TYPE subscription_status AS ENUM ('active', 'paused', 'cancelled');

-- Point Transaction Type Enum
CREATE TYPE point_transaction_type AS ENUM ('REFERRAL', 'SWAP_BONUS', 'QA_SUBMISSION', 'DAILY_VESTING');

--------------------------------------------------------------------------------
-- 2. TABLES
--------------------------------------------------------------------------------

-- profiles: Links to Supabase auth.users
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    email TEXT UNIQUE NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- products: Product catalog/inventory
CREATE TABLE public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    monthly_price INTEGER NOT NULL, -- Stored in cents, e.g., 2800 = $28.00
    tier INTEGER,                   -- e.g., 1, 2, 3
    stock_status TEXT DEFAULT 'in_stock' CHECK (stock_status IN ('in_stock', 'out_of_stock', 'waitlist', 'coming_soon')),
    category TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- subscriptions: Tracks active product rentals per user
CREATE TABLE public.subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id),
    status subscription_status DEFAULT 'active' NOT NULL,
    monthly_rate INTEGER NOT NULL, -- Snapshot of rate at time of sub in cents
    stripe_subscription_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- explorer_points: Tracks user gamification status
CREATE TABLE public.explorer_points (
    user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    score INTEGER DEFAULT 0 NOT NULL,
    level INTEGER DEFAULT 1 NOT NULL,
    referral_code TEXT UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- point_transactions: Ledger of point changes
CREATE TABLE public.point_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    amount INTEGER NOT NULL,
    transaction_type point_transaction_type NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

--------------------------------------------------------------------------------
-- 3. ROW LEVEL SECURITY (RLS) POLICIES
--------------------------------------------------------------------------------

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.explorer_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.point_transactions ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read and update only their own profile
CREATE POLICY "Users can view own profile" 
    ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" 
    ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Products: Anyone can read products
CREATE POLICY "Public profiles are viewable by everyone" 
    ON public.products FOR SELECT USING (true);

-- Subscriptions: Users can read only their own subscriptions
CREATE POLICY "Users can view own subscriptions" 
    ON public.subscriptions FOR SELECT USING (auth.uid() = user_id);

-- Explorer Points: Users can read only their own point totals
CREATE POLICY "Users can view own points" 
    ON public.explorer_points FOR SELECT USING (auth.uid() = user_id);

-- Point Transactions: Users can view their own ledger history
CREATE POLICY "Users can view own point history" 
    ON public.point_transactions FOR SELECT USING (auth.uid() = user_id);

--------------------------------------------------------------------------------
-- 4. FUNCTION FOR AUTOMATIC PROFILE CREATION (Optional but recommended)
--------------------------------------------------------------------------------
-- This trigger automatically creates a profile row when a new user signs up via auth
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, email, avatar_url)
    VALUES (
        new.id,
        new.raw_user_meta_data->>'full_name',
        new.email,
        new.raw_user_meta_data->>'avatar_url'
    );
    -- Also initialize their gamification points
    INSERT INTO public.explorer_points (user_id, score, level)
    VALUES (new.id, 0, 1);
    
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger the function every time a user is created
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
