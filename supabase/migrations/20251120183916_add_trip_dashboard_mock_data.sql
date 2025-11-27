/*
  # Add Mock Data for Trip Dashboard

  ## Overview
  Populates the new trip dashboard tables with sample data for testing:
  - Weather forecasts for existing trips
  - Budget items and expense tracking
  - Notes and reminders for collaboration
  - Places database for explorer tab
  
  ## Security
  - Uses existing user_trips and creates realistic test data
  - Only adds data if tables are empty
*/

DO $$
DECLARE
  sample_trip_id uuid;
BEGIN
  SELECT id INTO sample_trip_id FROM user_trips LIMIT 1;
  
  IF sample_trip_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM trip_weather LIMIT 1) THEN
    INSERT INTO trip_weather (trip_id, date, location, temp_high, temp_low, condition, icon, precipitation_chance)
    VALUES
      (sample_trip_id, CURRENT_DATE, 'Paris', 22, 15, 'Partly Cloudy', '⛅', 20),
      (sample_trip_id, CURRENT_DATE + 1, 'Paris', 24, 16, 'Sunny', '☀️', 5),
      (sample_trip_id, CURRENT_DATE + 2, 'Paris', 20, 14, 'Rainy', '🌧️', 80),
      (sample_trip_id, CURRENT_DATE + 3, 'Paris', 23, 17, 'Cloudy', '☁️', 30),
      (sample_trip_id, CURRENT_DATE + 4, 'Paris', 25, 18, 'Sunny', '☀️', 10);
  END IF;

  IF sample_trip_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM trip_budget_items LIMIT 1) THEN
    INSERT INTO trip_budget_items (trip_id, category, description, planned_amount, actual_amount, date)
    VALUES
      (sample_trip_id, 'accommodation', 'Hotel Booking', 800.00, 750.00, CURRENT_DATE),
      (sample_trip_id, 'food', 'Restaurants & Dining', 500.00, 320.00, CURRENT_DATE),
      (sample_trip_id, 'transport', 'Local Transportation', 200.00, 150.00, CURRENT_DATE + 1),
      (sample_trip_id, 'activities', 'Museum Tickets', 150.00, 150.00, CURRENT_DATE + 2),
      (sample_trip_id, 'shopping', 'Souvenirs', 300.00, NULL, CURRENT_DATE + 3);
  END IF;
END $$;

INSERT INTO places_database (name, place_type, city, country, address, location_lat, location_lng, description, rating, price_level, image_url, tags)
SELECT * FROM (VALUES
  ('Eiffel Tower', 'attraction', 'Paris', 'France', 'Champ de Mars, 5 Av. Anatole France', 48.8584, 2.2945, 'Iconic iron lattice tower on the Champ de Mars in Paris', 4.6, 2, 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg', ARRAY['landmark', 'iconic', 'photography']),
  ('Louvre Museum', 'museum', 'Paris', 'France', 'Rue de Rivoli', 48.8606, 2.3376, 'The world''s largest art museum', 4.7, 2, 'https://images.pexels.com/photos/2676574/pexels-photo-2676574.jpeg', ARRAY['art', 'culture', 'history']),
  ('Le Jules Verne', 'restaurant', 'Paris', 'France', 'Eiffel Tower, 2nd Floor', 48.8584, 2.2945, 'Michelin-starred restaurant in the Eiffel Tower', 4.5, 4, 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg', ARRAY['fine-dining', 'french', 'romantic']),
  ('Sacré-Cœur', 'attraction', 'Paris', 'France', '35 Rue du Chevalier de la Barre', 48.8867, 2.3431, 'Stunning basilica atop Montmartre hill', 4.7, 1, 'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg', ARRAY['religious', 'architecture', 'viewpoint']),
  ('Musée d''Orsay', 'museum', 'Paris', 'France', '1 Rue de la Légion d''Honneur', 48.8600, 2.3266, 'Museum housing impressionist masterpieces', 4.7, 2, 'https://images.pexels.com/photos/2563681/pexels-photo-2563681.jpeg', ARRAY['art', 'impressionism', 'culture']),
  ('Seine River Cruise', 'activity', 'Paris', 'France', 'Port de la Bourdonnais', 48.8606, 2.2937, 'Scenic boat tour along the Seine', 4.4, 2, 'https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg', ARRAY['cruise', 'romantic', 'sightseeing']),
  ('Versailles Palace', 'attraction', 'Versailles', 'France', 'Place d''Armes', 48.8049, 2.1204, 'Opulent former royal residence', 4.6, 3, 'https://images.pexels.com/photos/2476632/pexels-photo-2476632.jpeg', ARRAY['palace', 'gardens', 'history']),
  ('L''Ami Jean', 'restaurant', 'Paris', 'France', '27 Rue Malar', 48.8588, 2.3031, 'Lively Basque bistro with hearty fare', 4.5, 3, 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg', ARRAY['bistro', 'basque', 'cozy']),
  ('Montmartre Walking Tour', 'activity', 'Paris', 'France', 'Place du Tertre', 48.8867, 2.3404, 'Explore the artistic heart of Paris', 4.6, 1, 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg', ARRAY['walking', 'art', 'history']),
  ('Notre-Dame Cathedral', 'attraction', 'Paris', 'France', '6 Parvis Notre-Dame', 48.8530, 2.3499, 'Medieval Catholic cathedral', 4.7, 1, 'https://images.pexels.com/photos/1466335/pexels-photo-1466335.jpeg', ARRAY['cathedral', 'gothic', 'landmark']),
  ('Le Marais District', 'neighborhood', 'Paris', 'France', 'Le Marais', 48.8589, 2.3617, 'Historic district with trendy shops', 4.6, 2, 'https://images.pexels.com/photos/3886816/pexels-photo-3886816.jpeg', ARRAY['shopping', 'historic', 'trendy']),
  ('Sainte-Chapelle', 'attraction', 'Paris', 'France', '8 Bd du Palais', 48.8554, 2.3450, 'Gothic chapel with stunning stained glass', 4.7, 2, 'https://images.pexels.com/photos/1470405/pexels-photo-1470405.jpeg', ARRAY['chapel', 'stained-glass', 'gothic']),
  ('Breizh Café', 'restaurant', 'Paris', 'France', '109 Rue Vieille du Temple', 48.8608, 2.3631, 'Authentic Breton crêperie', 4.4, 2, 'https://images.pexels.com/photos/4869499/pexels-photo-4869499.jpeg', ARRAY['creperie', 'casual', 'breton']),
  ('Luxembourg Gardens', 'park', 'Paris', 'France', 'Rue de Médicis', 48.8462, 2.3372, 'Beautiful public garden with palace', 4.7, 1, 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg', ARRAY['park', 'gardens', 'relaxation']),
  ('Arc de Triomphe', 'attraction', 'Paris', 'France', 'Place Charles de Gaulle', 48.8738, 2.2950, 'Iconic triumphal arch monument', 4.7, 2, 'https://images.pexels.com/photos/1530259/pexels-photo-1530259.jpeg', ARRAY['monument', 'landmark', 'historic'])
) AS t(name, place_type, city, country, address, location_lat, location_lng, description, rating, price_level, image_url, tags)
WHERE NOT EXISTS (SELECT 1 FROM places_database WHERE places_database.name = t.name);
