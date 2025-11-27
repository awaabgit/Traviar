/*
  # Create Marketplace Schema

  ## Overview
  This migration creates the complete marketplace infrastructure for buying and selling
  creator-made travel itineraries. It establishes tables for marketplace listings,
  creator profiles, collections, purchases, and reviews.

  ## New Tables

  ### `marketplace_creators`
  Creator profiles for the marketplace with verified status and performance metrics.
  - `id` (uuid, primary key)
  - `user_id` (uuid, references auth.users) - linked user account
  - `username` (text, unique) - @handle
  - `display_name` (text) - full display name
  - `avatar_url` (text) - profile photo
  - `bio` (text) - creator description
  - `specialty` (text) - travel niche (luxury, budget, foodie, etc.)
  - `rating_avg` (numeric) - average creator rating
  - `itinerary_count` (integer) - total published itineraries
  - `total_sales` (integer) - total purchases across all itineraries
  - `is_verified` (boolean) - verified creator badge
  - `created_at` (timestamptz)

  ### `marketplace_itineraries`
  Purchasable travel itineraries created by marketplace creators.
  - `id` (uuid, primary key)
  - `creator_id` (uuid, references marketplace_creators)
  - `title` (text) - itinerary name
  - `description` (text) - detailed description
  - `destination` (text) - primary destination
  - `duration_days` (integer) - trip length
  - `price` (numeric) - base price in USD
  - `discount_price` (numeric, nullable) - sale price if applicable
  - `cover_image_url` (text) - hero image
  - `rating_avg` (numeric) - average rating
  - `rating_count` (integer) - number of ratings
  - `purchase_count` (integer) - total purchases
  - `is_featured` (boolean) - featured in hero banner
  - `is_trending` (boolean) - trending on platform
  - `style_tags` (text[]) - categorization tags
  - `tiktok_video_id` (text, nullable) - linked TikTok content
  - `tiktok_views` (integer) - TikTok video views
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `marketplace_collections`
  Curated collections of itineraries (Weekend Getaways, Best Sellers, etc.)
  - `id` (uuid, primary key)
  - `title` (text) - collection name
  - `description` (text) - collection description
  - `cover_image_url` (text) - collection banner
  - `itinerary_ids` (uuid[]) - array of itinerary IDs
  - `sort_order` (integer) - display order on page
  - `created_at` (timestamptz)

  ### `marketplace_purchases`
  Purchase history for tracking user-bought itineraries.
  - `id` (uuid, primary key)
  - `user_id` (uuid, references auth.users)
  - `itinerary_id` (uuid, references marketplace_itineraries)
  - `amount_paid` (numeric) - actual purchase price
  - `purchase_date` (timestamptz)

  ### `marketplace_reviews`
  User reviews and ratings for purchased itineraries.
  - `id` (uuid, primary key)
  - `itinerary_id` (uuid, references marketplace_itineraries)
  - `user_id` (uuid, references auth.users)
  - `rating` (integer) - 1-5 stars
  - `review_text` (text, nullable) - written review
  - `created_at` (timestamptz)

  ## Security
  - Enable RLS on all marketplace tables
  - Public read access for browsing marketplace content
  - Authenticated write access for purchases and reviews
  - Creator-only access for managing their own itineraries
  - Proper ownership checks on all modification operations
*/

-- Create marketplace_creators table
CREATE TABLE IF NOT EXISTS marketplace_creators (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE NOT NULL,
  display_name text NOT NULL,
  avatar_url text,
  bio text,
  specialty text NOT NULL,
  rating_avg numeric DEFAULT 0 CHECK (rating_avg >= 0 AND rating_avg <= 5),
  itinerary_count integer DEFAULT 0,
  total_sales integer DEFAULT 0,
  is_verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create marketplace_itineraries table
CREATE TABLE IF NOT EXISTS marketplace_itineraries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id uuid REFERENCES marketplace_creators(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  destination text NOT NULL,
  duration_days integer NOT NULL CHECK (duration_days > 0),
  price numeric NOT NULL CHECK (price >= 0),
  discount_price numeric CHECK (discount_price >= 0 AND discount_price < price),
  cover_image_url text NOT NULL,
  rating_avg numeric DEFAULT 0 CHECK (rating_avg >= 0 AND rating_avg <= 5),
  rating_count integer DEFAULT 0,
  purchase_count integer DEFAULT 0,
  is_featured boolean DEFAULT false,
  is_trending boolean DEFAULT false,
  style_tags text[] DEFAULT '{}',
  tiktok_video_id text,
  tiktok_views integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create marketplace_collections table
CREATE TABLE IF NOT EXISTS marketplace_collections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  cover_image_url text NOT NULL,
  itinerary_ids uuid[] DEFAULT '{}',
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create marketplace_purchases table
CREATE TABLE IF NOT EXISTS marketplace_purchases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  itinerary_id uuid REFERENCES marketplace_itineraries(id) ON DELETE CASCADE NOT NULL,
  amount_paid numeric NOT NULL CHECK (amount_paid >= 0),
  purchase_date timestamptz DEFAULT now(),
  UNIQUE(user_id, itinerary_id)
);

-- Create marketplace_reviews table
CREATE TABLE IF NOT EXISTS marketplace_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  itinerary_id uuid REFERENCES marketplace_itineraries(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, itinerary_id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_marketplace_itineraries_creator ON marketplace_itineraries(creator_id);
CREATE INDEX IF NOT EXISTS idx_marketplace_itineraries_featured ON marketplace_itineraries(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_marketplace_itineraries_trending ON marketplace_itineraries(is_trending) WHERE is_trending = true;
CREATE INDEX IF NOT EXISTS idx_marketplace_itineraries_destination ON marketplace_itineraries(destination);
CREATE INDEX IF NOT EXISTS idx_marketplace_itineraries_price ON marketplace_itineraries(price);
CREATE INDEX IF NOT EXISTS idx_marketplace_itineraries_rating ON marketplace_itineraries(rating_avg DESC);
CREATE INDEX IF NOT EXISTS idx_marketplace_purchases_user ON marketplace_purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_marketplace_reviews_itinerary ON marketplace_reviews(itinerary_id);

-- Enable Row Level Security
ALTER TABLE marketplace_creators ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_itineraries ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies for marketplace_creators
CREATE POLICY "Anyone can view creator profiles"
  ON marketplace_creators FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create creator profiles"
  ON marketplace_creators FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Creators can update own profile"
  ON marketplace_creators FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for marketplace_itineraries
CREATE POLICY "Anyone can view marketplace itineraries"
  ON marketplace_itineraries FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Creators can insert own itineraries"
  ON marketplace_itineraries FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM marketplace_creators
      WHERE marketplace_creators.id = creator_id
      AND marketplace_creators.user_id = auth.uid()
    )
  );

CREATE POLICY "Creators can update own itineraries"
  ON marketplace_itineraries FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM marketplace_creators
      WHERE marketplace_creators.id = creator_id
      AND marketplace_creators.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM marketplace_creators
      WHERE marketplace_creators.id = creator_id
      AND marketplace_creators.user_id = auth.uid()
    )
  );

CREATE POLICY "Creators can delete own itineraries"
  ON marketplace_itineraries FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM marketplace_creators
      WHERE marketplace_creators.id = creator_id
      AND marketplace_creators.user_id = auth.uid()
    )
  );

-- RLS Policies for marketplace_collections
CREATE POLICY "Anyone can view collections"
  ON marketplace_collections FOR SELECT
  TO public
  USING (true);

-- RLS Policies for marketplace_purchases
CREATE POLICY "Users can view own purchases"
  ON marketplace_purchases FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can make purchases"
  ON marketplace_purchases FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for marketplace_reviews
CREATE POLICY "Anyone can view reviews"
  ON marketplace_reviews FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can insert own reviews"
  ON marketplace_reviews FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reviews"
  ON marketplace_reviews FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own reviews"
  ON marketplace_reviews FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
