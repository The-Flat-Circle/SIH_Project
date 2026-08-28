-- YATRAFLOW SUPABASE POSTGRESQL DATABASE SCHEMA (SIH 2026)

-- 1. Gates Table
CREATE TABLE IF NOT EXISTS public.gates (
    gate_id TEXT PRIMARY KEY,
    gate_name TEXT NOT NULL,
    max_capacity INT NOT NULL DEFAULT 500,
    current_crowd INT DEFAULT 0,
    status TEXT DEFAULT 'NORMAL',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Crowd Raw Logs (Computer Vision Outputs)
CREATE TABLE IF NOT EXISTS public.crowd_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    camera_id TEXT NOT NULL,
    gate_no TEXT NOT NULL,
    crowd_number INT NOT NULL,
    density TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. Analytics Output Logs (Prophet Surge Forecasts)
CREATE TABLE IF NOT EXISTS public.analytics_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    zone TEXT NOT NULL,
    capacity_utilization NUMERIC(5,2) NOT NULL,
    risk_level TEXT NOT NULL,
    risk_score INT NOT NULL,
    predicted_crowd INT NOT NULL,
    congestion_probability INT NOT NULL,
    recommended_action TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 4. Authorized Admins Table
CREATE TABLE IF NOT EXISTS public.admins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Seed Initial Authorized Admin KIIT Emails
INSERT INTO public.admins (email) VALUES
  ('2405872@kiit.ac.in'),
  ('2405915@kiit.ac.in'),
  ('24051439@kiit.ac.in'),
  ('2405780@kiit.ac.in'),
  ('24051454@kiit.ac.in'),
  ('2405785@kiit.ac.in')
ON CONFLICT (email) DO NOTHING;
