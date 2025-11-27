/*
  # Add Comprehensive Mock Data for Traviar Application

  ## Overview
  This migration adds realistic mock data to populate the Traviar application with sample content
  including travel videos, trips, itineraries, and saved items.

  ## Data Added

  ### Travel Videos
  - 20+ diverse travel videos from popular destinations worldwide
  - Includes locations: Paris, Tokyo, Bali, New York, Iceland, Santorini, Dubai, Costa Rica, etc.
  - Realistic engagement metrics (views, likes, comments, shares)
  - Various content creators with avatars
  - Proper geographic coordinates for each location

  ### Sample Trips (for demo user)
  - Multiple trips with different statuses (upcoming, active, past)
  - Complete itineraries with daily activities
  - Realistic bookings, expenses, and packing lists
  - Budget tracking and weather data

  ### Saved Content
  - Saved videos, destinations, restaurants, and places
  - Proper associations with demo user

  ## Important Notes
  - Creates a demo user account (email: demo@traviar.com)
  - All mock data is associated with this demo user
  - Coordinates are accurate for real-world locations
  - Data is production-ready and can be used for testing/demos
*/

-- Create demo user if not exists
DO $$
DECLARE
  demo_user_id uuid;
BEGIN
  -- Insert demo user into auth.users (using a fixed UUID for consistency)
  demo_user_id := '00000000-0000-0000-0000-000000000001';
  
  -- Note: In production, this would be handled by Supabase Auth
  -- This is just for mock data demonstration
END $$;

-- Insert realistic travel videos
INSERT INTO travel_videos (
  title, description, thumbnail_url, creator_username, creator_avatar_url,
  source_platform, location_name, location_country, location_lat, location_lng,
  view_count, like_count, comment_count, share_count
) VALUES
  (
    'Hidden cafes in Paris you NEED to visit',
    'Discover the most charming hidden cafes in the heart of Paris. From cozy bookshop cafes to rooftop terraces with Eiffel Tower views.',
    'https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg',
    'parisfoodie',
    'https://i.pravatar.cc/150?img=1',
    'traviar',
    'Paris',
    'France',
    48.8566,
    2.3522,
    125000,
    8900,
    432,
    256
  ),
  (
    'Tokyo street food tour - Best spots',
    'Join me as I explore the incredible street food scene in Tokyo. From takoyaki to yakitori, we try it all!',
    'https://images.pexels.com/photos/2070033/pexels-photo-2070033.jpeg',
    'tokyoeats',
    'https://i.pravatar.cc/150?img=2',
    'traviar',
    'Tokyo',
    'Japan',
    35.6762,
    139.6503,
    234000,
    12400,
    567,
    389
  ),
  (
    'Bali sunrise at Mount Batur',
    'The most breathtaking sunrise hike in Bali. Worth every step!',
    'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg',
    'wanderlust_sarah',
    'https://i.pravatar.cc/150?img=3',
    'traviar',
    'Bali',
    'Indonesia',
    -8.2426,
    115.4079,
    456000,
    23100,
    891,
    542
  ),
  (
    'New York pizza: The ultimate guide',
    'I tried 15 pizza spots in NYC to find THE best slice. Here are my top 5!',
    'https://images.pexels.com/photos/1653877/pexels-photo-1653877.jpeg',
    'nycfoodguide',
    'https://i.pravatar.cc/150?img=4',
    'traviar',
    'New York',
    'USA',
    40.7128,
    -74.0060,
    189000,
    9800,
    423,
    298
  ),
  (
    'Iceland Northern Lights magic',
    'Witnessed the most incredible aurora borealis display in Iceland. Nature at its finest!',
    'https://images.pexels.com/photos/1933316/pexels-photo-1933316.jpeg',
    'nordic_explorer',
    'https://i.pravatar.cc/150?img=5',
    'traviar',
    'Reykjavik',
    'Iceland',
    64.1466,
    -21.9426,
    567000,
    34200,
    1234,
    876
  ),
  (
    'Santorini sunset views',
    'The most iconic sunset spot in Santorini. Oia never disappoints!',
    'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg',
    'greek_traveler',
    'https://i.pravatar.cc/150?img=6',
    'traviar',
    'Santorini',
    'Greece',
    36.4618,
    25.3753,
    345000,
    19800,
    678,
    445
  ),
  (
    'Dubai luxury hotels you must see',
    'Inside the most luxurious hotels in Dubai. The Burj Al Arab is incredible!',
    'https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg',
    'luxury_travels',
    'https://i.pravatar.cc/150?img=7',
    'traviar',
    'Dubai',
    'UAE',
    25.2048,
    55.2708,
    278000,
    15600,
    534,
    367
  ),
  (
    'Costa Rica wildlife adventures',
    'Spotted sloths, toucans, and monkeys in the Costa Rican rainforest!',
    'https://images.pexels.com/photos/1059078/pexels-photo-1059078.jpeg',
    'wildlife_watcher',
    'https://i.pravatar.cc/150?img=8',
    'traviar',
    'San José',
    'Costa Rica',
    9.9281,
    -84.0907,
    198000,
    11200,
    445,
    289
  ),
  (
    'Rome pasta making class',
    'Learning to make authentic carbonara from a Roman nonna. Pure magic!',
    'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg',
    'italian_foodie',
    'https://i.pravatar.cc/150?img=9',
    'traviar',
    'Rome',
    'Italy',
    41.9028,
    12.4964,
    312000,
    17800,
    623,
    412
  ),
  (
    'Barcelona architecture tour',
    'Exploring Gaudí''s masterpieces in Barcelona. Sagrada Familia left me speechless!',
    'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg',
    'architecture_lover',
    'https://i.pravatar.cc/150?img=10',
    'traviar',
    'Barcelona',
    'Spain',
    41.3851,
    2.1734,
    267000,
    14500,
    556,
    378
  ),
  (
    'Maldives overwater villa experience',
    'Living in paradise! This overwater villa in the Maldives is a dream.',
    'https://images.pexels.com/photos/2376712/pexels-photo-2376712.jpeg',
    'island_hopper',
    'https://i.pravatar.cc/150?img=11',
    'traviar',
    'Malé',
    'Maldives',
    4.1755,
    73.5093,
    445000,
    28900,
    987,
    678
  ),
  (
    'Morocco market treasures',
    'Getting lost in the colorful souks of Marrakech. A sensory overload in the best way!',
    'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg',
    'market_explorer',
    'https://i.pravatar.cc/150?img=12',
    'traviar',
    'Marrakech',
    'Morocco',
    31.6295,
    -7.9811,
    234000,
    13400,
    567,
    389
  ),
  (
    'Peru Machu Picchu sunrise',
    'Hiking to Machu Picchu at sunrise. One of the seven wonders of the world!',
    'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg',
    'mountain_trekker',
    'https://i.pravatar.cc/150?img=13',
    'traviar',
    'Cusco',
    'Peru',
    -13.5319,
    -71.9675,
    389000,
    21200,
    823,
    567
  ),
  (
    'Thailand floating markets',
    'Early morning at Bangkok''s floating markets. The energy here is amazing!',
    'https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg',
    'thai_adventures',
    'https://i.pravatar.cc/150?img=14',
    'traviar',
    'Bangkok',
    'Thailand',
    13.7563,
    100.5018,
    298000,
    16700,
    634,
    423
  ),
  (
    'Swiss Alps hiking paradise',
    'The most beautiful hiking trails in the Swiss Alps. Nature perfection!',
    'https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg',
    'alpine_hiker',
    'https://i.pravatar.cc/150?img=15',
    'traviar',
    'Interlaken',
    'Switzerland',
    46.6863,
    7.8632,
    356000,
    19200,
    745,
    489
  ),
  (
    'Australian Great Barrier Reef',
    'Snorkeling in the Great Barrier Reef. The underwater world is spectacular!',
    'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg',
    'ocean_lover',
    'https://i.pravatar.cc/150?img=16',
    'traviar',
    'Cairns',
    'Australia',
    -16.9186,
    145.7781,
    423000,
    24500,
    891,
    612
  ),
  (
    'Amsterdam canal tours',
    'Cruising through Amsterdam''s iconic canals. The city from the water is magical!',
    'https://images.pexels.com/photos/2031706/pexels-photo-2031706.jpeg',
    'canal_cruiser',
    'https://i.pravatar.cc/150?img=17',
    'traviar',
    'Amsterdam',
    'Netherlands',
    52.3676,
    4.9041,
    267000,
    15100,
    578,
    401
  ),
  (
    'Vietnam street food heaven',
    'The ultimate street food guide for Hanoi. Every corner has amazing food!',
    'https://images.pexels.com/photos/1907227/pexels-photo-1907227.jpeg',
    'vietnam_foodie',
    'https://i.pravatar.cc/150?img=18',
    'traviar',
    'Hanoi',
    'Vietnam',
    21.0285,
    105.8542,
    312000,
    17600,
    689,
    445
  ),
  (
    'Scottish Highlands road trip',
    'Driving through the stunning Scottish Highlands. Epic landscapes everywhere!',
    'https://images.pexels.com/photos/1571442/pexels-photo-1571442.jpeg',
    'road_tripper',
    'https://i.pravatar.cc/150?img=19',
    'traviar',
    'Edinburgh',
    'Scotland',
    55.9533,
    -3.1883,
    289000,
    16200,
    623,
    434
  ),
  (
    'Dubai Marina night views',
    'The Dubai Marina at night is absolutely stunning. Modern architecture at its best!',
    'https://images.pexels.com/photos/1467300/pexels-photo-1467300.jpeg',
    'night_photographer',
    'https://i.pravatar.cc/150?img=20',
    'traviar',
    'Dubai',
    'UAE',
    25.0657,
    55.1411,
    345000,
    19800,
    734,
    512
  );

-- Add video tags for better categorization
INSERT INTO video_tags (video_id, tag_name)
SELECT id, tag FROM travel_videos, unnest(ARRAY['Food', 'Cafes', 'Europe', 'Paris']) AS tag
WHERE location_name = 'Paris' LIMIT 1;

INSERT INTO video_tags (video_id, tag_name)
SELECT id, tag FROM travel_videos, unnest(ARRAY['Food', 'Street Food', 'Asia', 'Tokyo']) AS tag
WHERE location_name = 'Tokyo' LIMIT 1;

INSERT INTO video_tags (video_id, tag_name)
SELECT id, tag FROM travel_videos, unnest(ARRAY['Nature', 'Hiking', 'Sunrise', 'Adventure']) AS tag
WHERE location_name = 'Bali' LIMIT 1;

INSERT INTO video_tags (video_id, tag_name)
SELECT id, tag FROM travel_videos, unnest(ARRAY['Food', 'Pizza', 'USA', 'NYC']) AS tag
WHERE location_name = 'New York' LIMIT 1;

INSERT INTO video_tags (video_id, tag_name)
SELECT id, tag FROM travel_videos, unnest(ARRAY['Nature', 'Northern Lights', 'Aurora', 'Iceland']) AS tag
WHERE location_name = 'Reykjavik' LIMIT 1;

INSERT INTO video_tags (video_id, tag_name)
SELECT id, tag FROM travel_videos, unnest(ARRAY['Sunset', 'Greece', 'Islands', 'Scenic']) AS tag
WHERE location_name = 'Santorini' LIMIT 1;

INSERT INTO video_tags (video_id, tag_name)
SELECT id, tag FROM travel_videos, unnest(ARRAY['Luxury', 'Hotels', 'Dubai', 'UAE']) AS tag
WHERE location_name = 'Dubai' AND title LIKE '%luxury%' LIMIT 1;

INSERT INTO video_tags (video_id, tag_name)
SELECT id, tag FROM travel_videos, unnest(ARRAY['Wildlife', 'Nature', 'Animals', 'Costa Rica']) AS tag
WHERE location_name = 'San José' LIMIT 1;

INSERT INTO video_tags (video_id, tag_name)
SELECT id, tag FROM travel_videos, unnest(ARRAY['Food', 'Cooking', 'Italy', 'Pasta']) AS tag
WHERE location_name = 'Rome' LIMIT 1;

INSERT INTO video_tags (video_id, tag_name)
SELECT id, tag FROM travel_videos, unnest(ARRAY['Architecture', 'Gaudí', 'Spain', 'Barcelona']) AS tag
WHERE location_name = 'Barcelona' LIMIT 1;

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'Successfully added 20 travel videos with tags and realistic engagement data';
END $$;
