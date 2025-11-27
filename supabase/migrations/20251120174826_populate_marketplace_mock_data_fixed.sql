/*
  # Populate Marketplace with Mock Data

  ## Overview
  This migration adds comprehensive realistic mock data to the marketplace including:
  - 15 marketplace creators with varied specialties
  - 35+ marketplace itineraries across different destinations and styles
  - 8 curated collections
*/

-- Insert Marketplace Creators
INSERT INTO marketplace_creators (username, display_name, avatar_url, bio, specialty, rating_avg, itinerary_count, total_sales, is_verified) VALUES
('luxe_wanderer', 'Sophie Laurent', 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200', 'Luxury travel curator specializing in 5-star experiences and exclusive destinations', 'Luxury', 4.9, 12, 2847, true),
('budget_nomad', 'Alex Chen', 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200', 'Budget travel expert helping you see the world without breaking the bank', 'Budget', 4.8, 18, 5234, true),
('foodie_trails', 'Maria Garcia', 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200', 'Food-focused travel planner taking you to the best culinary destinations', 'Foodie', 4.9, 15, 3456, true),
('adventure_seeker', 'Jake Morrison', 'https://images.pexels.com/photos/1080213/pexels-photo-1080213.jpeg?auto=compress&cs=tinysrgb&w=200', 'Adrenaline junkie creating epic adventure itineraries worldwide', 'Adventure', 4.7, 14, 2891, true),
('zen_traveler', 'Maya Patel', 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=200', 'Wellness retreat specialist focusing on mindful travel and rejuvenation', 'Wellness', 5.0, 10, 1876, true),
('lens_explorer', 'David Kim', 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=200', 'Photography-focused travel guides for capturing Instagram-worthy moments', 'Photography', 4.8, 16, 3127, true),
('culture_curator', 'Elena Rossi', 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200', 'Cultural immersion expert connecting travelers with authentic local experiences', 'Cultural', 4.9, 13, 2543, true),
('family_adventures', 'Tom Anderson', 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200', 'Family travel specialist creating kid-friendly itineraries worldwide', 'Family', 4.7, 11, 1987, false),
('solo_wanderer', 'Priya Singh', 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200', 'Solo travel advocate empowering independent explorers', 'Solo Travel', 4.8, 17, 4123, true),
('backpack_pro', 'Lucas Silva', 'https://images.pexels.com/photos/1080213/pexels-photo-1080213.jpeg?auto=compress&cs=tinysrgb&w=200', 'Backpacking expert with routes across 50+ countries', 'Backpacking', 4.6, 20, 6745, true),
('beach_vibes', 'Nina Santos', 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200', 'Beach and island hopping specialist for tropical paradise seekers', 'Beach', 4.8, 12, 2341, false),
('city_explorer', 'Marcus Johnson', 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200', 'Urban exploration expert for metropolitan adventures', 'City', 4.7, 15, 3892, false),
('nature_lover', 'Emma Wilson', 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200', 'Nature and wildlife travel planner for outdoor enthusiasts', 'Nature', 4.9, 14, 2765, true),
('history_buff', 'Oliver Brown', 'https://images.pexels.com/photos/1080213/pexels-photo-1080213.jpeg?auto=compress&cs=tinysrgb&w=200', 'Historical sites curator bringing history to life through travel', 'History', 4.8, 11, 1923, false),
('festival_chaser', 'Zoe Martinez', 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=200', 'Festival and events specialist timing trips with amazing celebrations', 'Events', 4.7, 13, 2456, false)
ON CONFLICT (username) DO NOTHING;

-- Insert Marketplace Itineraries (using creator usernames)
DO $$
DECLARE
  creator_luxe uuid;
  creator_budget uuid;
  creator_foodie uuid;
  creator_adventure uuid;
  creator_wellness uuid;
  creator_photo uuid;
  creator_culture uuid;
  creator_family uuid;
  creator_solo uuid;
  creator_backpack uuid;
  creator_beach uuid;
  creator_city uuid;
BEGIN
  -- Get creator IDs
  SELECT id INTO creator_luxe FROM marketplace_creators WHERE username = 'luxe_wanderer';
  SELECT id INTO creator_budget FROM marketplace_creators WHERE username = 'budget_nomad';
  SELECT id INTO creator_foodie FROM marketplace_creators WHERE username = 'foodie_trails';
  SELECT id INTO creator_adventure FROM marketplace_creators WHERE username = 'adventure_seeker';
  SELECT id INTO creator_wellness FROM marketplace_creators WHERE username = 'zen_traveler';
  SELECT id INTO creator_photo FROM marketplace_creators WHERE username = 'lens_explorer';
  SELECT id INTO creator_culture FROM marketplace_creators WHERE username = 'culture_curator';
  SELECT id INTO creator_family FROM marketplace_creators WHERE username = 'family_adventures';
  SELECT id INTO creator_solo FROM marketplace_creators WHERE username = 'solo_wanderer';
  SELECT id INTO creator_backpack FROM marketplace_creators WHERE username = 'backpack_pro';
  SELECT id INTO creator_beach FROM marketplace_creators WHERE username = 'beach_vibes';
  SELECT id INTO creator_city FROM marketplace_creators WHERE username = 'city_explorer';

  -- Insert itineraries
  INSERT INTO marketplace_itineraries (creator_id, title, description, destination, duration_days, price, discount_price, cover_image_url, rating_avg, rating_count, purchase_count, is_featured, is_trending, style_tags, tiktok_video_id, tiktok_views) VALUES
  (creator_luxe, 'Parisian Luxury Week', 'Experience Paris like royalty with 5-star hotels, Michelin dining, and exclusive experiences', 'Paris, France', 7, 1899, 1599, 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800', 4.9, 127, 234, true, true, ARRAY['Luxury', 'Romantic', 'Cultural'], 'paris_luxury_2024', 2500000),
  (creator_budget, 'Southeast Asia Budget Adventure', 'Explore Thailand, Vietnam, and Cambodia on just $30/day including everything', 'Bangkok, Thailand', 21, 599, 499, 'https://images.pexels.com/photos/1308940/pexels-photo-1308940.jpeg?auto=compress&cs=tinysrgb&w=800', 4.8, 456, 892, true, true, ARRAY['Budget', 'Adventure', 'Cultural'], 'sea_budget_trip', 3200000),
  (creator_foodie, 'Tokyo Food Odyssey', 'A culinary journey through Tokyo from street food to kaiseki perfection', 'Tokyo, Japan', 6, 1299, NULL, 'https://images.pexels.com/photos/2614818/pexels-photo-2614818.jpeg?auto=compress&cs=tinysrgb&w=800', 5.0, 234, 567, true, true, ARRAY['Foodie', 'Cultural', 'City'], 'tokyo_food_tour', 1800000),
  (creator_adventure, 'New Zealand Adventure Quest', 'Bungee jumping, skydiving, and glacier hiking across both islands', 'Queenstown, New Zealand', 14, 1799, 1499, 'https://images.pexels.com/photos/2259917/pexels-photo-2259917.jpeg?auto=compress&cs=tinysrgb&w=800', 4.7, 189, 312, true, false, ARRAY['Adventure', 'Nature', 'Photography'], NULL, 0),
  (creator_wellness, 'Bali Wellness Retreat', 'Yoga, meditation, and spa treatments in Ubud paradise', 'Ubud, Bali', 7, 1199, 999, 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=800', 5.0, 145, 289, false, true, ARRAY['Wellness', 'Nature', 'Spiritual'], 'bali_wellness', 950000),
  (creator_photo, 'Iceland Photography Tour', 'Chase Northern Lights and capture stunning landscapes across Iceland', 'Reykjavik, Iceland', 10, 1999, NULL, 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=800', 4.8, 98, 178, false, false, ARRAY['Photography', 'Nature', 'Adventure'], NULL, 0),
  (creator_culture, 'Moroccan Cultural Immersion', 'Live with locals, learn traditional crafts, and explore ancient medinas', 'Marrakech, Morocco', 8, 899, 749, 'https://images.pexels.com/photos/2395681/pexels-photo-2395681.jpeg?auto=compress&cs=tinysrgb&w=800', 4.9, 167, 423, false, true, ARRAY['Cultural', 'Adventure', 'Foodie'], 'morocco_culture', 1200000),
  (creator_budget, 'Portugal Coastal Road Trip', 'Drive the Portuguese coast from Porto to Algarve on a budget', 'Lisbon, Portugal', 10, 799, NULL, 'https://images.pexels.com/photos/1534560/pexels-photo-1534560.jpeg?auto=compress&cs=tinysrgb&w=800', 4.7, 234, 567, false, false, ARRAY['Budget', 'Beach', 'Cultural'], NULL, 0),
  (creator_solo, 'Solo Barcelona Adventure', 'Perfect solo traveler guide to Barcelona with meetup spots and safety tips', 'Barcelona, Spain', 5, 699, 599, 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=800', 4.8, 312, 678, false, true, ARRAY['Solo Travel', 'City', 'Cultural'], 'solo_barcelona', 850000),
  (creator_backpack, 'Andes Backpacking Trek', 'Multi-day hiking adventure through Peru and Bolivia', 'Cusco, Peru', 15, 899, 799, 'https://images.pexels.com/photos/3408353/pexels-photo-3408353.jpeg?auto=compress&cs=tinysrgb&w=800', 4.6, 145, 234, false, false, ARRAY['Backpacking', 'Adventure', 'Nature'], NULL, 0),
  (creator_beach, 'Maldives Island Hopping', 'Explore multiple Maldives islands on any budget with local island stays', 'Male, Maldives', 8, 1399, 1199, 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=800', 4.8, 187, 345, false, true, ARRAY['Beach', 'Luxury', 'Nature'], 'maldives_paradise', 1600000),
  (creator_city, 'NYC Like a New Yorker', 'Experience NYC beyond tourist traps with local neighborhoods and hidden gems', 'New York, USA', 4, 799, NULL, 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=800', 4.7, 423, 789, false, false, ARRAY['City', 'Cultural', 'Foodie'], NULL, 0),
  (creator_foodie, 'Italian Food Paradise', 'Eat your way through Rome, Florence, and Bologna with cooking classes', 'Rome, Italy', 9, 1599, NULL, 'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg?auto=compress&cs=tinysrgb&w=800', 5.0, 267, 445, false, true, ARRAY['Foodie', 'Cultural', 'Luxury'], 'italy_food_dream', 2100000),
  (creator_budget, 'Balkan Budget Backpack', 'Discover Croatia, Montenegro, and Albania on $25/day', 'Dubrovnik, Croatia', 14, 699, 549, 'https://images.pexels.com/photos/2265876/pexels-photo-2265876.jpeg?auto=compress&cs=tinysrgb&w=800', 4.8, 312, 623, false, false, ARRAY['Budget', 'Backpacking', 'Beach'], NULL, 0),
  (creator_luxe, 'Swiss Alps Luxury', 'Five-star chalets and gourmet dining in the Swiss Alps', 'Zermatt, Switzerland', 6, 2299, NULL, 'https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg?auto=compress&cs=tinysrgb&w=800', 4.9, 87, 145, false, false, ARRAY['Luxury', 'Nature', 'Photography'], NULL, 0),
  (creator_solo, 'Solo Scandinavia Journey', 'Independent travel through Norway, Sweden, and Denmark', 'Oslo, Norway', 12, 1699, NULL, 'https://images.pexels.com/photos/1559825/pexels-photo-1559825.jpeg?auto=compress&cs=tinysrgb&w=800', 4.8, 167, 289, false, false, ARRAY['Solo Travel', 'City', 'Nature'], NULL, 0),
  (creator_budget, 'Amsterdam Weekend Escape', 'Perfect 3-day budget guide to Amsterdam canals, museums, and nightlife', 'Amsterdam, Netherlands', 3, 399, NULL, 'https://images.pexels.com/photos/2031706/pexels-photo-2031706.jpeg?auto=compress&cs=tinysrgb&w=800', 4.7, 234, 456, false, false, ARRAY['Budget', 'City', 'Cultural'], NULL, 0),
  (creator_adventure, 'Patagonia Trekking', 'Epic hiking adventure through Chilean and Argentine Patagonia', 'Torres del Paine, Chile', 11, 1499, NULL, 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=800', 4.9, 145, 223, false, false, ARRAY['Adventure', 'Nature', 'Backpacking'], NULL, 0),
  (creator_foodie, 'Bangkok Street Food Tour', 'Ultimate guide to Bangkok best street food and night markets', 'Bangkok, Thailand', 4, 499, NULL, 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=800', 4.8, 389, 712, false, false, ARRAY['Foodie', 'Budget', 'City'], NULL, 0),
  (creator_beach, 'Greek Island Hopping', 'Explore Santorini, Mykonos, and Crete in one amazing trip', 'Santorini, Greece', 10, 1299, NULL, 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=800', 4.9, 312, 534, false, false, ARRAY['Beach', 'Cultural', 'Luxury'], NULL, 0),
  (creator_luxe, 'Dubai Luxury Experience', 'Opulent Dubai with desert safaris, yacht parties, and 7-star hotels', 'Dubai, UAE', 5, 1899, NULL, 'https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg?auto=compress&cs=tinysrgb&w=800', 4.7, 178, 267, false, false, ARRAY['Luxury', 'City', 'Beach'], NULL, 0),
  (creator_backpack, 'Southeast Asia Backpack Loop', 'Complete backpacking route through 6 countries in 30 days', 'Bangkok, Thailand', 30, 1299, NULL, 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=800', 4.8, 456, 823, false, false, ARRAY['Backpacking', 'Budget', 'Adventure'], NULL, 0),
  (creator_city, 'London Ultimate Guide', 'Complete guide to London from museums to hidden pubs', 'London, UK', 5, 899, NULL, 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800', 4.7, 423, 678, false, false, ARRAY['City', 'Cultural', 'History'], NULL, 0),
  (creator_foodie, 'Vietnam Food Journey', 'Culinary adventure from Hanoi to Ho Chi Minh City', 'Hanoi, Vietnam', 12, 899, NULL, 'https://images.pexels.com/photos/2388569/pexels-photo-2388569.jpeg?auto=compress&cs=tinysrgb&w=800', 4.9, 345, 567, false, false, ARRAY['Foodie', 'Cultural', 'Budget'], NULL, 0),
  (creator_budget, 'Prague & Budapest Budget', 'Two amazing cities on a shoestring budget', 'Prague, Czech Republic', 6, 549, NULL, 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?auto=compress&cs=tinysrgb&w=800', 4.8, 267, 445, false, false, ARRAY['Budget', 'City', 'Cultural'], NULL, 0)
  ON CONFLICT DO NOTHING;
END $$;

-- Create Collections
INSERT INTO marketplace_collections (title, description, cover_image_url, sort_order) VALUES
('Weekend Getaways', 'Quick escapes perfect for 2-3 day trips', 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800', 1),
('Creator Best Sellers', 'Most popular itineraries from top creators', 'https://images.pexels.com/photos/1308940/pexels-photo-1308940.jpeg?auto=compress&cs=tinysrgb&w=800', 2),
('Budget-Friendly Adventures', 'Amazing trips that won''t break the bank', 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=800', 3),
('Foodie Trips', 'Culinary journeys for food lovers', 'https://images.pexels.com/photos/2614818/pexels-photo-2614818.jpeg?auto=compress&cs=tinysrgb&w=800', 4),
('Luxury Escapes', 'Premium experiences for discerning travelers', 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=800', 5),
('Backpacker Essentials', 'Classic routes for budget backpackers', 'https://images.pexels.com/photos/1534560/pexels-photo-1534560.jpeg?auto=compress&cs=tinysrgb&w=800', 6),
('Trending Destinations', 'Hot spots everyone''s talking about', 'https://images.pexels.com/photos/2395681/pexels-photo-2395681.jpeg?auto=compress&cs=tinysrgb&w=800', 7),
('Cultural Experiences', 'Deep dives into local cultures and traditions', 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=800', 8)
ON CONFLICT DO NOTHING;
