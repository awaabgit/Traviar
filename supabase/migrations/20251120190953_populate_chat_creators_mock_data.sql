/*
  # Populate Chat Creators Mock Data

  ## Overview
  This migration adds sample travel creators and quick actions to demonstrate the chat interface functionality.

  ## Mock Data Added
  
  ### Chat Creators
  - 6 diverse travel creators with different specialties
  - Mix of online and offline status
  - Varied expertise levels and ratings
  - Realistic response times and chat history
  
  ### Quick Actions
  - Pre-defined helpful prompts for each creator
  - Categorized by type (planning, booking, recommendations, etc.)

  ## Important Notes
  - This is demonstration data only
  - Profile images use placeholder URLs
  - Can be safely deleted and regenerated
*/

INSERT INTO chat_creators (id, name, avatar_url, bio, specialties, rating, total_chats, response_time, is_online, verified)
VALUES
  (
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'Emma Rodriguez',
    'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
    'Adventure travel expert specializing in South America. I help you discover hidden gems and authentic experiences off the beaten path.',
    ARRAY['Adventure Travel', 'South America', 'Budget Travel', 'Backpacking'],
    4.9,
    1247,
    '< 2 min',
    true,
    true
  ),
  (
    'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    'James Chen',
    'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
    'Luxury travel consultant with 15 years experience. Specializing in premium destinations, fine dining, and exclusive experiences.',
    ARRAY['Luxury Travel', 'Asia', 'Fine Dining', 'Hotels'],
    4.8,
    892,
    '< 5 min',
    true,
    true
  ),
  (
    'c3d4e5f6-a7b8-9012-cdef-123456789012',
    'Sophie Martin',
    'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200',
    'Family travel planner helping parents create memorable vacations. Expert in kid-friendly destinations and stress-free itineraries.',
    ARRAY['Family Travel', 'Europe', 'Theme Parks', 'All-Inclusive'],
    4.7,
    1105,
    '< 3 min',
    false,
    true
  ),
  (
    'd4e5f6a7-b8c9-0123-def1-234567890123',
    'Marcus Johnson',
    'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=200',
    'Digital nomad and remote work travel specialist. I help you find the perfect workation spots with great wifi and coworking spaces.',
    ARRAY['Digital Nomad', 'Southeast Asia', 'Coworking', 'Long-term Travel'],
    4.6,
    763,
    '< 10 min',
    true,
    false
  ),
  (
    'e5f6a7b8-c9d0-1234-ef12-345678901234',
    'Aria Patel',
    'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    'Sustainable and eco-conscious travel advocate. Helping you explore the world while minimizing your environmental impact.',
    ARRAY['Eco Travel', 'Sustainability', 'Wildlife', 'Conservation'],
    4.9,
    654,
    '< 15 min',
    false,
    true
  ),
  (
    'f6a7b8c9-d0e1-2345-f123-456789012345',
    'Diego Santos',
    'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
    'Food and culture travel expert. Passionate about authentic culinary experiences and local traditions around the world.',
    ARRAY['Food Travel', 'Cultural Tours', 'Street Food', 'Wine Tours'],
    4.8,
    981,
    '< 5 min',
    false,
    true
  )
ON CONFLICT (id) DO NOTHING;

INSERT INTO chat_quick_actions (creator_id, action_text, category, order_index)
VALUES
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Plan a 2-week backpacking trip through Peru', 'planning', 0),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'What are the best hiking trails in Patagonia?', 'recommendations', 1),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Help me budget $50/day in Colombia', 'planning', 2),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Where can I find authentic local experiences?', 'recommendations', 3),
  
  ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Recommend luxury hotels in Bali', 'recommendations', 0),
  ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Plan a romantic anniversary trip to Maldives', 'planning', 1),
  ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Best Michelin star restaurants in Tokyo', 'recommendations', 2),
  ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Book private villa with chef in Tuscany', 'booking', 3),
  
  ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'Family-friendly activities in Orlando', 'recommendations', 0),
  ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'Plan a week in Disney with young kids', 'planning', 1),
  ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'Best beaches for toddlers in Greece', 'recommendations', 2),
  ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'All-inclusive resorts with kids clubs', 'booking', 3),
  
  ('d4e5f6a7-b8c9-0123-def1-234567890123', 'Best coworking spaces in Chiang Mai', 'recommendations', 0),
  ('d4e5f6a7-b8c9-0123-def1-234567890123', 'Plan 3 months as digital nomad in Bali', 'planning', 1),
  ('d4e5f6a7-b8c9-0123-def1-234567890123', 'Visa requirements for long-term stay', 'general', 2),
  ('d4e5f6a7-b8c9-0123-def1-234567890123', 'Affordable apartments with good wifi', 'recommendations', 3),
  
  ('e5f6a7b8-c9d0-1234-ef12-345678901234', 'Eco-friendly safari lodges in Kenya', 'recommendations', 0),
  ('e5f6a7b8-c9d0-1234-ef12-345678901234', 'Plan carbon-neutral trip to Costa Rica', 'planning', 1),
  ('e5f6a7b8-c9d0-1234-ef12-345678901234', 'Best wildlife conservation volunteering', 'recommendations', 2),
  ('e5f6a7b8-c9d0-1234-ef12-345678901234', 'Sustainable transport options in Europe', 'general', 3),
  
  ('f6a7b8c9-d0e1-2345-f123-456789012345', 'Best street food markets in Bangkok', 'recommendations', 0),
  ('f6a7b8c9-d0e1-2345-f123-456789012345', 'Plan a culinary tour through Italy', 'planning', 1),
  ('f6a7b8c9-d0e1-2345-f123-456789012345', 'Wine tasting regions in Argentina', 'recommendations', 2),
  ('f6a7b8c9-d0e1-2345-f123-456789012345', 'Cooking classes with local chefs', 'booking', 3)
ON CONFLICT (id) DO NOTHING;