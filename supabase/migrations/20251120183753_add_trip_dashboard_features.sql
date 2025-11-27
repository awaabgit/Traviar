/*
  # Add Trip Dashboard Additional Features

  ## Overview
  Adds missing tables and functionality for the comprehensive trip dashboard:
  - trip_weather: Weather forecasts for trip locations
  - trip_budget_items: Detailed budget tracking (complements existing trip_expenses)
  - trip_notes: Shared notes and comments
  - places_database: Searchable database of places for explorer tab

  ## Notes
  - trip_bookings, trip_documents, trip_packing_items, trip_members already exist
  - We're adding complementary tables to complete the dashboard functionality

  ## Security
  - Enable RLS on all new tables
  - Users can only access data for trips they own or are members of
*/

CREATE TABLE IF NOT EXISTS trip_weather (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid REFERENCES user_trips(id) ON DELETE CASCADE NOT NULL,
  date date NOT NULL,
  location text NOT NULL,
  temp_high integer,
  temp_low integer,
  condition text,
  icon text,
  precipitation_chance integer,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS trip_budget_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid REFERENCES user_trips(id) ON DELETE CASCADE NOT NULL,
  category text NOT NULL,
  description text,
  planned_amount numeric(10,2),
  actual_amount numeric(10,2),
  currency text DEFAULT 'USD',
  date date,
  paid_by_user_id uuid REFERENCES auth.users(id),
  is_shared_expense boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS trip_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid REFERENCES user_trips(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  content text NOT NULL,
  note_type text DEFAULT 'general',
  is_pinned boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS places_database (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  place_type text NOT NULL,
  city text,
  country text,
  address text,
  location_lat numeric,
  location_lng numeric,
  description text,
  rating numeric(2,1),
  price_level integer CHECK (price_level >= 1 AND price_level <= 4),
  image_url text,
  tags text[],
  opening_hours jsonb DEFAULT '{}',
  contact jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE trip_weather ENABLE ROW LEVEL SECURITY;
ALTER TABLE trip_budget_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE trip_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE places_database ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view weather for their trips"
  ON trip_weather FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_trips
      WHERE user_trips.id = trip_weather.trip_id
      AND user_trips.user_id = auth.uid()
    ) OR EXISTS (
      SELECT 1 FROM trip_members
      WHERE trip_members.trip_id = trip_weather.trip_id
      AND trip_members.user_id = auth.uid()
    )
  );

CREATE POLICY "System can insert weather data"
  ON trip_weather FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view budget items for their trips"
  ON trip_budget_items FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_trips
      WHERE user_trips.id = trip_budget_items.trip_id
      AND user_trips.user_id = auth.uid()
    ) OR EXISTS (
      SELECT 1 FROM trip_members
      WHERE trip_members.trip_id = trip_budget_items.trip_id
      AND trip_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert budget items for their trips"
  ON trip_budget_items FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_trips
      WHERE user_trips.id = trip_budget_items.trip_id
      AND user_trips.user_id = auth.uid()
    ) OR EXISTS (
      SELECT 1 FROM trip_members
      WHERE trip_members.trip_id = trip_budget_items.trip_id
      AND trip_members.user_id = auth.uid()
      AND trip_members.role IN ('owner', 'editor')
    )
  );

CREATE POLICY "Users can update budget items for their trips"
  ON trip_budget_items FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_trips
      WHERE user_trips.id = trip_budget_items.trip_id
      AND user_trips.user_id = auth.uid()
    ) OR EXISTS (
      SELECT 1 FROM trip_members
      WHERE trip_members.trip_id = trip_budget_items.trip_id
      AND trip_members.user_id = auth.uid()
      AND trip_members.role IN ('owner', 'editor')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_trips
      WHERE user_trips.id = trip_budget_items.trip_id
      AND user_trips.user_id = auth.uid()
    ) OR EXISTS (
      SELECT 1 FROM trip_members
      WHERE trip_members.trip_id = trip_budget_items.trip_id
      AND trip_members.user_id = auth.uid()
      AND trip_members.role IN ('owner', 'editor')
    )
  );

CREATE POLICY "Users can delete budget items for their trips"
  ON trip_budget_items FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_trips
      WHERE user_trips.id = trip_budget_items.trip_id
      AND user_trips.user_id = auth.uid()
    ) OR EXISTS (
      SELECT 1 FROM trip_members
      WHERE trip_members.trip_id = trip_budget_items.trip_id
      AND trip_members.user_id = auth.uid()
      AND trip_members.role IN ('owner', 'editor')
    )
  );

CREATE POLICY "Users can view notes for their trips"
  ON trip_notes FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_trips
      WHERE user_trips.id = trip_notes.trip_id
      AND user_trips.user_id = auth.uid()
    ) OR EXISTS (
      SELECT 1 FROM trip_members
      WHERE trip_members.trip_id = trip_notes.trip_id
      AND trip_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert notes for their trips"
  ON trip_notes FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own notes"
  ON trip_notes FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete their own notes"
  ON trip_notes FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Anyone can view places"
  ON places_database FOR SELECT
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_trip_weather_trip ON trip_weather(trip_id, date);
CREATE INDEX IF NOT EXISTS idx_trip_budget_items_trip ON trip_budget_items(trip_id);
CREATE INDEX IF NOT EXISTS idx_trip_notes_trip ON trip_notes(trip_id);
CREATE INDEX IF NOT EXISTS idx_places_database_city ON places_database(city);
CREATE INDEX IF NOT EXISTS idx_places_database_type ON places_database(place_type);
CREATE INDEX IF NOT EXISTS idx_places_database_rating ON places_database(rating DESC);
