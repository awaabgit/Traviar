/*
  # Add Trip Management Fields

  Extends the user_trips table with additional fields for better trip categorization,
  visualization, and sharing capabilities.

  ## Changes to `user_trips` Table
  
  ### New Columns
  - `hero_image_url` (text, optional) - Cover image URL for the trip card
  - `trip_status` (text) - Current status: 'draft', 'upcoming', 'in_progress', 'past', 'booked'
  - `travelers_count` (integer) - Number of travelers on this trip
  - `is_shared` (boolean) - Whether this trip is shared with other users
  - `locations` (text array) - Array of location names for quick display
  - `thumbnail_url` (text, optional) - Smaller thumbnail for list views
  
  ## Notes
  
  - Trip status is automatically calculated based on dates but can be manually set to 'draft' or 'booked'
  - Default status is 'draft' for new trips
  - RLS policies remain unchanged - users still only see their own trips
  - Indexes added for efficient filtering by status
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_trips' AND column_name = 'hero_image_url'
  ) THEN
    ALTER TABLE user_trips ADD COLUMN hero_image_url text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_trips' AND column_name = 'trip_status'
  ) THEN
    ALTER TABLE user_trips ADD COLUMN trip_status text DEFAULT 'draft' 
      CHECK (trip_status IN ('draft', 'upcoming', 'in_progress', 'past', 'booked'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_trips' AND column_name = 'travelers_count'
  ) THEN
    ALTER TABLE user_trips ADD COLUMN travelers_count integer DEFAULT 1;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_trips' AND column_name = 'is_shared'
  ) THEN
    ALTER TABLE user_trips ADD COLUMN is_shared boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_trips' AND column_name = 'locations'
  ) THEN
    ALTER TABLE user_trips ADD COLUMN locations text[] DEFAULT ARRAY[]::text[];
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_trips' AND column_name = 'thumbnail_url'
  ) THEN
    ALTER TABLE user_trips ADD COLUMN thumbnail_url text;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_user_trips_status ON user_trips(user_id, trip_status);
CREATE INDEX IF NOT EXISTS idx_user_trips_dates ON user_trips(user_id, start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_user_trips_shared ON user_trips(user_id, is_shared) WHERE is_shared = true;