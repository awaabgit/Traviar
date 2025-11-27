/*
  # Update Categories to Array

  Changes the user_trips.category field from a single text value to an array
  to support multiple category selection for better recommendations.

  ## Changes to `user_trips` Table
  
  ### Modified Columns
  - `category` - Changed from text to text[] array to support multiple selections
  - `categories` (new name) - Renamed from category for clarity
  
  ## Migration Steps
  
  1. Add new categories column as text array
  2. Migrate existing category data to array format
  3. Drop old category column
  
  ## Notes
  
  - Preserves existing single category data by converting to single-item array
  - NULL values become empty arrays
  - RLS policies remain unchanged
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_trips' AND column_name = 'categories'
  ) THEN
    ALTER TABLE user_trips ADD COLUMN categories text[] DEFAULT ARRAY[]::text[];
    
    UPDATE user_trips 
    SET categories = CASE 
      WHEN category IS NOT NULL THEN ARRAY[category]
      ELSE ARRAY[]::text[]
    END;
    
    IF EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_name = 'user_trips' AND column_name = 'category'
    ) THEN
      ALTER TABLE user_trips DROP COLUMN category;
    END IF;
  END IF;
END $$;
