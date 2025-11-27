/*
  # Trip Itinerary Schema

  Creates tables for managing user trips, itinerary days, and daily activities.

  ## New Tables
  
  ### `user_trips`
  Stores user trip information with dates and destinations
  - `id` (uuid, primary key) - Unique trip identifier
  - `user_id` (uuid) - Reference to auth.users
  - `trip_name` (text) - Name of the trip
  - `destination` (text) - Trip destination
  - `start_date` (date) - Trip start date
  - `end_date` (date) - Trip end date
  - `duration_days` (integer) - Calculated trip duration
  - `is_active` (boolean) - Whether this is the current active trip
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Record update timestamp

  ### `trip_days`
  Stores individual days within a trip itinerary
  - `id` (uuid, primary key) - Unique day identifier
  - `trip_id` (uuid) - Reference to user_trips
  - `day_number` (integer) - Sequential day number (1, 2, 3...)
  - `date` (date) - Actual calendar date for this day
  - `title` (text, optional) - Optional title for the day
  - `notes` (text, optional) - Optional notes for the day
  - `created_at` (timestamptz) - Record creation timestamp

  ### `day_activities`
  Stores activities, restaurants, attractions for each day
  - `id` (uuid, primary key) - Unique activity identifier
  - `day_id` (uuid) - Reference to trip_days
  - `category` (text) - Type: accommodation, restaurant, attraction, activity, transport, other
  - `title` (text) - Activity title
  - `description` (text, optional) - Activity description
  - `location_name` (text, optional) - Location name
  - `location_lat` (numeric, optional) - Latitude coordinate
  - `location_lng` (numeric, optional) - Longitude coordinate
  - `start_time` (time, optional) - Scheduled start time
  - `duration_minutes` (integer, optional) - Estimated duration
  - `cost` (numeric) - Estimated or actual cost
  - `booking_url` (text, optional) - External booking link
  - `sort_order` (integer) - Display order within the day
  - `created_at` (timestamptz) - Record creation timestamp

  ## Security
  
  All tables have Row Level Security (RLS) enabled with restrictive policies:
  - Users can only view their own trips and related data
  - Users can create, update, and delete their own trips
  - No public access to trip data
*/

CREATE TABLE IF NOT EXISTS user_trips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  trip_name text NOT NULL DEFAULT 'My Trip',
  destination text NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  duration_days integer GENERATED ALWAYS AS (end_date - start_date + 1) STORED,
  is_active boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS trip_days (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid REFERENCES user_trips(id) ON DELETE CASCADE NOT NULL,
  day_number integer NOT NULL,
  date date NOT NULL,
  title text,
  notes text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(trip_id, day_number)
);

CREATE TABLE IF NOT EXISTS day_activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  day_id uuid REFERENCES trip_days(id) ON DELETE CASCADE NOT NULL,
  category text NOT NULL CHECK (category IN ('accommodation', 'restaurant', 'attraction', 'activity', 'transport', 'other')),
  title text NOT NULL,
  description text,
  location_name text,
  location_lat numeric(10, 8),
  location_lng numeric(11, 8),
  start_time time,
  duration_minutes integer,
  cost numeric(10, 2) DEFAULT 0,
  booking_url text,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE user_trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE trip_days ENABLE ROW LEVEL SECURITY;
ALTER TABLE day_activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own trips"
  ON user_trips FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own trips"
  ON user_trips FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own trips"
  ON user_trips FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own trips"
  ON user_trips FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view own trip days"
  ON trip_days FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_trips
      WHERE user_trips.id = trip_days.trip_id
      AND user_trips.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create trip days"
  ON trip_days FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_trips
      WHERE user_trips.id = trip_days.trip_id
      AND user_trips.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update trip days"
  ON trip_days FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_trips
      WHERE user_trips.id = trip_days.trip_id
      AND user_trips.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_trips
      WHERE user_trips.id = trip_days.trip_id
      AND user_trips.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete trip days"
  ON trip_days FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_trips
      WHERE user_trips.id = trip_days.trip_id
      AND user_trips.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view own activities"
  ON day_activities FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM trip_days
      JOIN user_trips ON user_trips.id = trip_days.trip_id
      WHERE trip_days.id = day_activities.day_id
      AND user_trips.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create activities"
  ON day_activities FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM trip_days
      JOIN user_trips ON user_trips.id = trip_days.trip_id
      WHERE trip_days.id = day_activities.day_id
      AND user_trips.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update activities"
  ON day_activities FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM trip_days
      JOIN user_trips ON user_trips.id = trip_days.trip_id
      WHERE trip_days.id = day_activities.day_id
      AND user_trips.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM trip_days
      JOIN user_trips ON user_trips.id = trip_days.trip_id
      WHERE trip_days.id = day_activities.day_id
      AND user_trips.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete activities"
  ON day_activities FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM trip_days
      JOIN user_trips ON user_trips.id = trip_days.trip_id
      WHERE trip_days.id = day_activities.day_id
      AND user_trips.user_id = auth.uid()
    )
  );

CREATE INDEX IF NOT EXISTS idx_user_trips_user_id ON user_trips(user_id);
CREATE INDEX IF NOT EXISTS idx_user_trips_is_active ON user_trips(user_id, is_active);
CREATE INDEX IF NOT EXISTS idx_trip_days_trip_id ON trip_days(trip_id);
CREATE INDEX IF NOT EXISTS idx_day_activities_day_id ON day_activities(day_id);
CREATE INDEX IF NOT EXISTS idx_day_activities_location ON day_activities(location_lat, location_lng) WHERE location_lat IS NOT NULL AND location_lng IS NOT NULL;
