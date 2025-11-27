/*
  # Create Additional Saved Items Tables

  1. New Tables
    - `saved_destinations` - Save favorite destinations
    - `saved_restaurants` - Save favorite restaurants  
    - `saved_places` - Save any general places

  2. Security
    - Enable RLS on all tables
    - Users can only manage their own saved items
*/

CREATE TABLE IF NOT EXISTS saved_destinations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  destination_id text NOT NULL,
  destination_name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, destination_id)
);

CREATE TABLE IF NOT EXISTS saved_restaurants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  restaurant_id text NOT NULL,
  restaurant_name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, restaurant_id)
);

CREATE TABLE IF NOT EXISTS saved_places (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  place_id text NOT NULL,
  place_name text NOT NULL,
  place_type text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, place_id)
);

ALTER TABLE saved_destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_places ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'saved_destinations' 
    AND policyname = 'Users can view own saved destinations'
  ) THEN
    CREATE POLICY "Users can view own saved destinations"
      ON saved_destinations FOR SELECT
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'saved_destinations' 
    AND policyname = 'Users can add saved destinations'
  ) THEN
    CREATE POLICY "Users can add saved destinations"
      ON saved_destinations FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'saved_destinations' 
    AND policyname = 'Users can remove saved destinations'
  ) THEN
    CREATE POLICY "Users can remove saved destinations"
      ON saved_destinations FOR DELETE
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'saved_restaurants' 
    AND policyname = 'Users can view own saved restaurants'
  ) THEN
    CREATE POLICY "Users can view own saved restaurants"
      ON saved_restaurants FOR SELECT
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'saved_restaurants' 
    AND policyname = 'Users can add saved restaurants'
  ) THEN
    CREATE POLICY "Users can add saved restaurants"
      ON saved_restaurants FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'saved_restaurants' 
    AND policyname = 'Users can remove saved restaurants'
  ) THEN
    CREATE POLICY "Users can remove saved restaurants"
      ON saved_restaurants FOR DELETE
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'saved_places' 
    AND policyname = 'Users can view own saved places'
  ) THEN
    CREATE POLICY "Users can view own saved places"
      ON saved_places FOR SELECT
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'saved_places' 
    AND policyname = 'Users can add saved places'
  ) THEN
    CREATE POLICY "Users can add saved places"
      ON saved_places FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'saved_places' 
    AND policyname = 'Users can remove saved places'
  ) THEN
    CREATE POLICY "Users can remove saved places"
      ON saved_places FOR DELETE
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_saved_destinations_user_id ON saved_destinations(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_restaurants_user_id ON saved_restaurants(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_places_user_id ON saved_places(user_id);
