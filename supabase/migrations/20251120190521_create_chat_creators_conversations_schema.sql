/*
  # Create Chat Creators and Conversations Schema

  ## Overview
  This migration creates the foundation for a creator-driven chat interface where users can chat with travel creators/experts.
  The existing chat_messages table will be preserved for backward compatibility.

  ## New Tables
  
  ### `chat_creators`
  Travel content creators who provide chat assistance
  - `id` (uuid, primary key)
  - `name` (text) - Creator's display name
  - `avatar_url` (text) - Profile picture URL
  - `bio` (text) - Short biography
  - `specialties` (text[]) - Areas of expertise
  - `rating` (numeric) - Average rating out of 5
  - `total_chats` (integer) - Total conversations handled
  - `response_time` (text) - Average response time
  - `is_online` (boolean) - Current online status
  - `verified` (boolean) - Verification badge status
  - `created_at` (timestamptz)
  
  ### `chat_conversations`
  Individual chat conversations between users and creators
  - `id` (uuid, primary key)
  - `user_id` (uuid) - References auth.users
  - `creator_id` (uuid) - References chat_creators
  - `title` (text) - Conversation title/summary
  - `trip_id` (uuid, nullable) - Related trip if applicable
  - `last_message_at` (timestamptz) - Timestamp of last message
  - `is_archived` (boolean) - Archive status
  - `created_at` (timestamptz)
  
  ### `chat_conversation_messages`
  Individual messages within conversations
  - `id` (uuid, primary key)
  - `conversation_id` (uuid) - References chat_conversations
  - `sender_type` (text) - 'user' or 'creator'
  - `sender_id` (uuid) - ID of sender
  - `content` (text) - Message text content
  - `media_url` (text, nullable) - Attached media if any
  - `media_type` (text, nullable) - Type of media
  - `is_read` (boolean) - Read status
  - `created_at` (timestamptz)
  
  ### `chat_quick_actions`
  Pre-defined quick action templates for creators
  - `id` (uuid, primary key)
  - `creator_id` (uuid) - References chat_creators
  - `action_text` (text) - Display text for the action
  - `category` (text) - Category
  - `order_index` (integer) - Display order
  - `created_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Users can read all creators (public data)
  - Users can only access their own conversations
  - Users can only read/write messages in their conversations
  - Only authenticated users can create conversations/messages
*/

CREATE TABLE IF NOT EXISTS chat_creators (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  avatar_url text NOT NULL,
  bio text DEFAULT '',
  specialties text[] DEFAULT '{}',
  rating numeric(3,2) DEFAULT 0,
  total_chats integer DEFAULT 0,
  response_time text DEFAULT '< 5 min',
  is_online boolean DEFAULT false,
  verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS chat_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  creator_id uuid NOT NULL REFERENCES chat_creators(id) ON DELETE CASCADE,
  title text DEFAULT 'New Conversation',
  trip_id uuid,
  last_message_at timestamptz DEFAULT now(),
  is_archived boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS chat_conversation_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid NOT NULL REFERENCES chat_conversations(id) ON DELETE CASCADE,
  sender_type text NOT NULL CHECK (sender_type IN ('user', 'creator')),
  sender_id uuid NOT NULL,
  content text NOT NULL,
  media_url text,
  media_type text,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS chat_quick_actions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id uuid NOT NULL REFERENCES chat_creators(id) ON DELETE CASCADE,
  action_text text NOT NULL,
  category text DEFAULT 'general',
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_chat_conversations_user_id ON chat_conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_conversations_creator_id ON chat_conversations(creator_id);
CREATE INDEX IF NOT EXISTS idx_chat_conversation_messages_conversation_id ON chat_conversation_messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_chat_conversation_messages_created_at ON chat_conversation_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_chat_quick_actions_creator_id ON chat_quick_actions(creator_id);

ALTER TABLE chat_creators ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_conversation_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_quick_actions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view creators"
  ON chat_creators FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can view own conversations"
  ON chat_conversations FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own conversations"
  ON chat_conversations FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own conversations"
  ON chat_conversations FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own conversations"
  ON chat_conversations FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can view messages in their conversations"
  ON chat_conversation_messages FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM chat_conversations
      WHERE chat_conversations.id = chat_conversation_messages.conversation_id
      AND chat_conversations.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can send messages in their conversations"
  ON chat_conversation_messages FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM chat_conversations
      WHERE chat_conversations.id = chat_conversation_messages.conversation_id
      AND chat_conversations.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own messages"
  ON chat_conversation_messages FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM chat_conversations
      WHERE chat_conversations.id = chat_conversation_messages.conversation_id
      AND chat_conversations.user_id = auth.uid()
    )
    AND sender_type = 'user'
    AND sender_id = auth.uid()
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM chat_conversations
      WHERE chat_conversations.id = chat_conversation_messages.conversation_id
      AND chat_conversations.user_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can view quick actions"
  ON chat_quick_actions FOR SELECT
  TO authenticated
  USING (true);