/*
  # Create Videos and Engagement System

  ## Overview
  This migration creates a comprehensive video content system for the Traviar platform,
  including videos, comments, tags, and user engagement tracking.

  ## New Tables
  
  ### `travel_videos`
  Stores all travel video content with location and creator information
  - `id` (uuid, primary key) - Unique video identifier
  - `title` (text) - Video title/caption
  - `description` (text) - Detailed video description
  - `thumbnail_url` (text) - Video thumbnail image URL
  - `video_url` (text) - Actual video file URL (for future use)
  - `creator_username` (text) - Username of content creator
  - `creator_avatar_url` (text) - Creator profile picture URL
  - `creator_user_id` (uuid, nullable) - Links to auth.users if Traviar user
  - `source_platform` (text) - Origin platform ('traviar' or 'tiktok')
  - `external_video_id` (text, nullable) - ID on external platform if imported
  - `location_name` (text) - Location/destination name
  - `location_country` (text) - Country name
  - `location_lat` (decimal, nullable) - Latitude coordinate
  - `location_lng` (decimal, nullable) - Longitude coordinate
  - `view_count` (integer) - Total video views
  - `like_count` (integer) - Total likes
  - `comment_count` (integer) - Total comments
  - `share_count` (integer) - Total shares
  - `created_at` (timestamptz) - When video was created/uploaded
  - `updated_at` (timestamptz) - Last update timestamp

  ### `video_comments`
  User comments on videos
  - `id` (uuid, primary key) - Unique comment identifier
  - `video_id` (uuid, foreign key) - References travel_videos
  - `user_id` (uuid, foreign key) - References auth.users
  - `comment_text` (text) - Comment content
  - `created_at` (timestamptz) - When comment was posted
  - `updated_at` (timestamptz) - Last edit timestamp

  ### `video_likes`
  Tracks which users liked which videos
  - `id` (uuid, primary key) - Unique like identifier
  - `video_id` (uuid, foreign key) - References travel_videos
  - `user_id` (uuid, foreign key) - References auth.users
  - `created_at` (timestamptz) - When like was created

  ### `video_saves`
  Tracks saved/bookmarked videos by users
  - `id` (uuid, primary key) - Unique save identifier
  - `video_id` (uuid, foreign key) - References travel_videos
  - `user_id` (uuid, foreign key) - References auth.users
  - `created_at` (timestamptz) - When video was saved

  ### `video_tags`
  Tags/categories for organizing videos
  - `id` (uuid, primary key) - Unique tag identifier
  - `video_id` (uuid, foreign key) - References travel_videos
  - `tag_name` (text) - Tag/category name
  - `created_at` (timestamptz) - When tag was added

  ## Security
  - Enable RLS on all tables
  - Public can view videos and comments
  - Only authenticated users can create comments, likes, and saves
  - Users can only modify/delete their own comments
  - Video creators can manage their own videos

  ## Indexes
  - Index on video_id for fast comment/like/save lookups
  - Index on user_id for user-specific queries
  - Index on location fields for geographic searches
  - Index on created_at for sorting by recency
*/

-- Create travel_videos table
CREATE TABLE IF NOT EXISTS travel_videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  thumbnail_url text NOT NULL,
  video_url text,
  creator_username text NOT NULL,
  creator_avatar_url text,
  creator_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  source_platform text NOT NULL DEFAULT 'traviar' CHECK (source_platform IN ('traviar', 'tiktok')),
  external_video_id text,
  location_name text NOT NULL,
  location_country text NOT NULL,
  location_lat decimal(10, 8),
  location_lng decimal(11, 8),
  view_count integer DEFAULT 0,
  like_count integer DEFAULT 0,
  comment_count integer DEFAULT 0,
  share_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create video_comments table
CREATE TABLE IF NOT EXISTS video_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id uuid NOT NULL REFERENCES travel_videos(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  comment_text text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create video_likes table
CREATE TABLE IF NOT EXISTS video_likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id uuid NOT NULL REFERENCES travel_videos(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(video_id, user_id)
);

-- Create video_saves table
CREATE TABLE IF NOT EXISTS video_saves (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id uuid NOT NULL REFERENCES travel_videos(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(video_id, user_id)
);

-- Create video_tags table
CREATE TABLE IF NOT EXISTS video_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id uuid NOT NULL REFERENCES travel_videos(id) ON DELETE CASCADE,
  tag_name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_video_comments_video_id ON video_comments(video_id);
CREATE INDEX IF NOT EXISTS idx_video_comments_user_id ON video_comments(user_id);
CREATE INDEX IF NOT EXISTS idx_video_comments_created_at ON video_comments(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_video_likes_video_id ON video_likes(video_id);
CREATE INDEX IF NOT EXISTS idx_video_likes_user_id ON video_likes(user_id);
CREATE INDEX IF NOT EXISTS idx_video_saves_video_id ON video_saves(video_id);
CREATE INDEX IF NOT EXISTS idx_video_saves_user_id ON video_saves(user_id);
CREATE INDEX IF NOT EXISTS idx_video_tags_video_id ON video_tags(video_id);
CREATE INDEX IF NOT EXISTS idx_video_tags_tag_name ON video_tags(tag_name);
CREATE INDEX IF NOT EXISTS idx_travel_videos_location ON travel_videos(location_name, location_country);
CREATE INDEX IF NOT EXISTS idx_travel_videos_created_at ON travel_videos(created_at DESC);

-- Enable Row Level Security
ALTER TABLE travel_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_saves ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_tags ENABLE ROW LEVEL SECURITY;

-- RLS Policies for travel_videos
CREATE POLICY "Anyone can view videos"
  ON travel_videos FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create videos"
  ON travel_videos FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = creator_user_id);

CREATE POLICY "Users can update own videos"
  ON travel_videos FOR UPDATE
  TO authenticated
  USING (auth.uid() = creator_user_id)
  WITH CHECK (auth.uid() = creator_user_id);

CREATE POLICY "Users can delete own videos"
  ON travel_videos FOR DELETE
  TO authenticated
  USING (auth.uid() = creator_user_id);

-- RLS Policies for video_comments
CREATE POLICY "Anyone can view comments"
  ON video_comments FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create comments"
  ON video_comments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own comments"
  ON video_comments FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own comments"
  ON video_comments FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for video_likes
CREATE POLICY "Anyone can view likes"
  ON video_likes FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create likes"
  ON video_likes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own likes"
  ON video_likes FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for video_saves
CREATE POLICY "Users can view own saves"
  ON video_saves FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can create saves"
  ON video_saves FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own saves"
  ON video_saves FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for video_tags
CREATE POLICY "Anyone can view tags"
  ON video_tags FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create tags"
  ON video_tags FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
DROP TRIGGER IF EXISTS update_travel_videos_updated_at ON travel_videos;
CREATE TRIGGER update_travel_videos_updated_at
  BEFORE UPDATE ON travel_videos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_video_comments_updated_at ON video_comments;
CREATE TRIGGER update_video_comments_updated_at
  BEFORE UPDATE ON video_comments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
