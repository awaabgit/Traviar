/*
  # Trip Dashboard Schema Extensions

  1. New Tables
    - `trip_bookings` - Store flight, hotel, activity, and restaurant bookings
    - `trip_expenses` - Manual expenses for budget tracking
    - `trip_packing_items` - Packing list items with categories
    - `trip_documents` - Uploaded important documents
    - `trip_reminders` - Custom trip reminders
    - `trip_members` - Shared trip members and permissions
    - `trip_polls` - Group polls for decision making
    - `trip_expense_splits` - Cost splitting data for shared expenses
    - `trip_saved_places` - Places saved from Explorer for later
    - `trip_activity_feed` - Activity log for collaborative features

  2. Table Extensions
    - Add `weather_data` JSON field to `user_trips`
    - Add `budget_total` and `budget_breakdown` to `user_trips`
    - Add `is_shared` boolean to `user_trips`

  3. Security
    - Enable RLS on all new tables
    - Add policies for authenticated users
*/

-- Extend user_trips table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_trips' AND column_name = 'weather_data'
  ) THEN
    ALTER TABLE user_trips ADD COLUMN weather_data jsonb DEFAULT '{}';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_trips' AND column_name = 'budget_total'
  ) THEN
    ALTER TABLE user_trips ADD COLUMN budget_total numeric DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_trips' AND column_name = 'budget_breakdown'
  ) THEN
    ALTER TABLE user_trips ADD COLUMN budget_breakdown jsonb DEFAULT '{}';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_trips' AND column_name = 'is_shared'
  ) THEN
    ALTER TABLE user_trips ADD COLUMN is_shared boolean DEFAULT false;
  END IF;
END $$;

-- Create trip_bookings table
CREATE TABLE IF NOT EXISTS trip_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid NOT NULL REFERENCES user_trips(id) ON DELETE CASCADE,
  booking_type text NOT NULL CHECK (booking_type IN ('flight', 'hotel', 'activity', 'restaurant', 'other')),
  title text NOT NULL,
  provider text,
  confirmation_code text,
  status text DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'pending', 'cancelled')),
  booking_date timestamptz,
  booking_time text,
  location_name text,
  location_lat numeric,
  location_lng numeric,
  details jsonb DEFAULT '{}',
  cost numeric DEFAULT 0,
  qr_code_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE trip_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own trip bookings"
  ON trip_bookings FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_trips
      WHERE user_trips.id = trip_bookings.trip_id
      AND user_trips.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own trip bookings"
  ON trip_bookings FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_trips
      WHERE user_trips.id = trip_bookings.trip_id
      AND user_trips.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own trip bookings"
  ON trip_bookings FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_trips
      WHERE user_trips.id = trip_bookings.trip_id
      AND user_trips.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_trips
      WHERE user_trips.id = trip_bookings.trip_id
      AND user_trips.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own trip bookings"
  ON trip_bookings FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_trips
      WHERE user_trips.id = trip_bookings.trip_id
      AND user_trips.user_id = auth.uid()
    )
  );

-- Create trip_expenses table
CREATE TABLE IF NOT EXISTS trip_expenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid NOT NULL REFERENCES user_trips(id) ON DELETE CASCADE,
  category text NOT NULL,
  description text NOT NULL,
  amount numeric NOT NULL,
  currency text DEFAULT 'USD',
  expense_date timestamptz DEFAULT now(),
  paid_by uuid REFERENCES auth.users(id),
  receipt_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE trip_expenses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own trip expenses"
  ON trip_expenses FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_trips
      WHERE user_trips.id = trip_expenses.trip_id
      AND user_trips.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage own trip expenses"
  ON trip_expenses FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_trips
      WHERE user_trips.id = trip_expenses.trip_id
      AND user_trips.user_id = auth.uid()
    )
  );

-- Create trip_packing_items table
CREATE TABLE IF NOT EXISTS trip_packing_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid NOT NULL REFERENCES user_trips(id) ON DELETE CASCADE,
  category text NOT NULL DEFAULT 'Other',
  item_name text NOT NULL,
  is_packed boolean DEFAULT false,
  quantity integer DEFAULT 1,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE trip_packing_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own packing items"
  ON trip_packing_items FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_trips
      WHERE user_trips.id = trip_packing_items.trip_id
      AND user_trips.user_id = auth.uid()
    )
  );

-- Create trip_documents table
CREATE TABLE IF NOT EXISTS trip_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid NOT NULL REFERENCES user_trips(id) ON DELETE CASCADE,
  document_type text NOT NULL,
  document_name text NOT NULL,
  file_url text NOT NULL,
  file_size integer,
  uploaded_at timestamptz DEFAULT now()
);

ALTER TABLE trip_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own trip documents"
  ON trip_documents FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_trips
      WHERE user_trips.id = trip_documents.trip_id
      AND user_trips.user_id = auth.uid()
    )
  );

-- Create trip_reminders table
CREATE TABLE IF NOT EXISTS trip_reminders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid NOT NULL REFERENCES user_trips(id) ON DELETE CASCADE,
  reminder_type text NOT NULL,
  title text NOT NULL,
  description text,
  reminder_date timestamptz NOT NULL,
  is_completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE trip_reminders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own trip reminders"
  ON trip_reminders FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_trips
      WHERE user_trips.id = trip_reminders.trip_id
      AND user_trips.user_id = auth.uid()
    )
  );

-- Create trip_members table
CREATE TABLE IF NOT EXISTS trip_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid NOT NULL REFERENCES user_trips(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role text DEFAULT 'viewer' CHECK (role IN ('owner', 'editor', 'viewer')),
  joined_at timestamptz DEFAULT now(),
  UNIQUE(trip_id, user_id)
);

ALTER TABLE trip_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Trip members can view themselves"
  ON trip_members FOR SELECT
  TO authenticated
  USING (user_id = auth.uid() OR trip_id IN (
    SELECT id FROM user_trips WHERE user_id = auth.uid()
  ));

CREATE POLICY "Trip owners can manage members"
  ON trip_members FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_trips
      WHERE user_trips.id = trip_members.trip_id
      AND user_trips.user_id = auth.uid()
    )
  );

-- Create trip_polls table
CREATE TABLE IF NOT EXISTS trip_polls (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid NOT NULL REFERENCES user_trips(id) ON DELETE CASCADE,
  question text NOT NULL,
  options jsonb NOT NULL DEFAULT '[]',
  votes jsonb DEFAULT '{}',
  created_by uuid REFERENCES auth.users(id),
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE trip_polls ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Trip members can view polls"
  ON trip_polls FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_trips
      WHERE user_trips.id = trip_polls.trip_id
      AND (user_trips.user_id = auth.uid() OR user_trips.is_shared = true)
    )
  );

-- Create trip_saved_places table
CREATE TABLE IF NOT EXISTS trip_saved_places (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid NOT NULL REFERENCES user_trips(id) ON DELETE CASCADE,
  place_name text NOT NULL,
  place_category text,
  place_data jsonb DEFAULT '{}',
  saved_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE trip_saved_places ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage saved places"
  ON trip_saved_places FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_trips
      WHERE user_trips.id = trip_saved_places.trip_id
      AND user_trips.user_id = auth.uid()
    )
  );

-- Create trip_activity_feed table
CREATE TABLE IF NOT EXISTS trip_activity_feed (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid NOT NULL REFERENCES user_trips(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id),
  action_type text NOT NULL,
  action_data jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE trip_activity_feed ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Trip members can view activity feed"
  ON trip_activity_feed FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_trips
      WHERE user_trips.id = trip_activity_feed.trip_id
      AND (user_trips.user_id = auth.uid() OR user_trips.is_shared = true)
    )
  );

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_trip_bookings_trip_id ON trip_bookings(trip_id);
CREATE INDEX IF NOT EXISTS idx_trip_expenses_trip_id ON trip_expenses(trip_id);
CREATE INDEX IF NOT EXISTS idx_trip_packing_items_trip_id ON trip_packing_items(trip_id);
CREATE INDEX IF NOT EXISTS idx_trip_documents_trip_id ON trip_documents(trip_id);
CREATE INDEX IF NOT EXISTS idx_trip_reminders_trip_id ON trip_reminders(trip_id);
CREATE INDEX IF NOT EXISTS idx_trip_members_trip_id ON trip_members(trip_id);
CREATE INDEX IF NOT EXISTS idx_trip_members_user_id ON trip_members(user_id);
CREATE INDEX IF NOT EXISTS idx_trip_polls_trip_id ON trip_polls(trip_id);
CREATE INDEX IF NOT EXISTS idx_trip_saved_places_trip_id ON trip_saved_places(trip_id);
CREATE INDEX IF NOT EXISTS idx_trip_activity_feed_trip_id ON trip_activity_feed(trip_id);
