/*
  # Add Budget and Category Fields to User Trips

  Extends the user_trips table with budget tier and trip category fields
  for enhanced trip planning and filtering capabilities.

  ## Changes to `user_trips` Table
  
  ### New Columns
  - `budget_tier` (text) - Budget level: 'budget', 'moderate', 'premium', 'luxury'
  - `category` (text, optional) - Trip category: 'adventure', 'food_wine', 'cultural', 'beaches', or custom
  - `date_flexibility` (text, optional) - Date flexibility option: 'exact', 'flexible'
  - `flexible_months` (text array, optional) - Selected months for flexible dates
  
  ## Notes
  
  - Budget tier defaults to 'moderate' for moderate budget
  - Category is optional and can be set for personalized recommendations
  - Date flexibility fields support both exact and flexible date trip planning
  - RLS policies remain unchanged
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_trips' AND column_name = 'budget_tier'
  ) THEN
    ALTER TABLE user_trips ADD COLUMN budget_tier text DEFAULT 'moderate' 
      CHECK (budget_tier IN ('budget', 'moderate', 'premium', 'luxury'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_trips' AND column_name = 'category'
  ) THEN
    ALTER TABLE user_trips ADD COLUMN category text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_trips' AND column_name = 'date_flexibility'
  ) THEN
    ALTER TABLE user_trips ADD COLUMN date_flexibility text DEFAULT 'exact'
      CHECK (date_flexibility IN ('exact', 'flexible'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_trips' AND column_name = 'flexible_months'
  ) THEN
    ALTER TABLE user_trips ADD COLUMN flexible_months text[] DEFAULT ARRAY[]::text[];
  END IF;
END $$;