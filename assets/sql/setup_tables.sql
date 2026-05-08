-- 1. Setup Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create Enums
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'module_status') THEN
        CREATE TYPE module_status AS ENUM ('disponible', 'reservado', 'vendido');
    END IF;
END$$;

-- 3. Create Modules Table
CREATE TABLE IF NOT EXISTS modules (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    price NUMERIC NOT NULL,
    status module_status DEFAULT 'disponible',
    image_url TEXT,
    model_3d_url TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create Leads Table
CREATE TABLE IF NOT EXISTS leads (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT,
    module_interest_id UUID REFERENCES modules(id),
    status TEXT DEFAULT 'nuevo',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Row Level Security (RLS)
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Policies for Modules
DROP POLICY IF EXISTS "Public modules are viewable by everyone" ON modules;
CREATE POLICY "Public modules are viewable by everyone" 
ON modules FOR SELECT 
USING (true);

DROP POLICY IF EXISTS "Only authenticated users can modify modules" ON modules;
CREATE POLICY "Only authenticated users can modify modules" 
ON modules FOR ALL 
TO authenticated 
USING (true);

-- Policies for Leads
DROP POLICY IF EXISTS "Anyone can insert leads" ON leads;
CREATE POLICY "Anyone can insert leads" 
ON leads FOR INSERT 
WITH CHECK (true);

DROP POLICY IF EXISTS "Only authenticated users can view leads" ON leads;
CREATE POLICY "Only authenticated users can view leads" 
ON leads FOR SELECT 
TO authenticated 
USING (true);

-- 6. Trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_modules_updated_at
    BEFORE UPDATE ON modules
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
