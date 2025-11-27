import { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { TripCard } from './TripCard';
import { RestaurantCard } from './RestaurantCard';
import { LocationCard } from './LocationCard';
import { PromotionalBanner, FeaturedCategory } from './PromotionalBanner';
import { VideoCarousel } from './VideoCarousel';
import { TripDetailDrawer } from './tripDetail/TripDetailDrawer';
import { DestinationDetailDrawer } from './destinationDetail/DestinationDetailDrawer';
import { PlaceDetailDrawer } from './placeDetail/PlaceDetailDrawer';
import { FiltersModal, FilterValues } from './explore/FiltersModal';
import { SearchModal } from './explore/SearchModal';

const MOCK_TRIPS = [
  {
    id: '1',
    title: 'Romantic Paris Escape',
    description: 'Experience the city of love with curated dining and hidden gems',
    destination: 'Paris, France',
    duration_days: 3,
    price: 299,
    cover_image_url: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800',
    creator_name: 'Sophie Martin',
    creator_avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating_avg: 4.8,
    rating_count: 124,
    vibe_tags: ['romantic', 'cultural', 'luxury'],
  },
  {
    id: '2',
    title: 'Tokyo Adventure Week',
    description: 'Dive into Japanese culture with street food, temples, and nightlife',
    destination: 'Tokyo, Japan',
    duration_days: 7,
    price: 599,
    cover_image_url: 'https://images.pexels.com/photos/2614818/pexels-photo-2614818.jpeg?auto=compress&cs=tinysrgb&w=800',
    creator_name: 'Kenji Tanaka',
    creator_avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating_avg: 4.9,
    rating_count: 256,
    vibe_tags: ['adventure', 'cultural', 'foodie'],
  },
  {
    id: '3',
    title: 'Bali Wellness Retreat',
    description: 'Find peace with yoga, nature, and traditional healing',
    destination: 'Bali, Indonesia',
    duration_days: 5,
    price: 449,
    cover_image_url: 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=800',
    creator_name: 'Maya Patel',
    creator_avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating_avg: 5.0,
    rating_count: 89,
    vibe_tags: ['wellness', 'nature', 'spiritual'],
  },
  {
    id: '4',
    title: 'Iceland Road Trip',
    description: 'Chase waterfalls, glaciers, and the Northern Lights',
    destination: 'Reykjavik, Iceland',
    duration_days: 10,
    price: 899,
    cover_image_url: 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=800',
    creator_name: 'Erik Johansson',
    creator_avatar: 'https://images.pexels.com/photos/1080213/pexels-photo-1080213.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating_avg: 4.7,
    rating_count: 178,
    vibe_tags: ['adventure', 'nature', 'photography'],
  },
  {
    id: '5',
    title: 'New York City Explorer',
    description: 'The ultimate NYC experience from Broadway to Brooklyn',
    destination: 'New York, USA',
    duration_days: 4,
    price: 549,
    cover_image_url: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=800',
    creator_name: 'Alex Rivera',
    creator_avatar: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating_avg: 4.6,
    rating_count: 203,
    vibe_tags: ['urban', 'foodie', 'cultural'],
  },
  {
    id: '6',
    title: 'Amsterdam Weekend',
    description: 'Canals, museums, and cycling through charming streets',
    destination: 'Amsterdam, Netherlands',
    duration_days: 3,
    price: 379,
    cover_image_url: 'https://images.pexels.com/photos/2031706/pexels-photo-2031706.jpeg?auto=compress&cs=tinysrgb&w=800',
    creator_name: 'Lisa Van Berg',
    creator_avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating_avg: 4.7,
    rating_count: 167,
    vibe_tags: ['cultural', 'relaxed', 'artistic'],
  },
];

const MOCK_RESTAURANTS = [
  {
    id: '1',
    name: 'Le Comptoir du Relais',
    cuisine: 'French Bistro',
    location: 'Paris, France',
    priceRange: '$$$',
    image_url: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating_avg: 4.7,
    rating_count: 892,
  },
  {
    id: '2',
    name: 'Sukiyabashi Jiro',
    cuisine: 'Sushi Master',
    location: 'Tokyo, Japan',
    priceRange: '$$$$',
    image_url: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating_avg: 5.0,
    rating_count: 1240,
  },
  {
    id: '3',
    name: 'Osteria Francescana',
    cuisine: 'Modern Italian',
    location: 'Modena, Italy',
    priceRange: '$$$$',
    image_url: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating_avg: 4.9,
    rating_count: 673,
  },
  {
    id: '4',
    name: 'Quintonil',
    cuisine: 'Contemporary Mexican',
    location: 'Mexico City, Mexico',
    priceRange: '$$$',
    image_url: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating_avg: 4.8,
    rating_count: 534,
  },
];

const MOCK_LOCATIONS = [
  {
    id: '1',
    name: 'Santorini',
    country: 'Greece',
    theme: 'Romantic sunset views',
    image_url: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=800',
    itinerary_count: 34,
  },
  {
    id: '2',
    name: 'Kyoto',
    country: 'Japan',
    theme: 'Ancient temples & gardens',
    image_url: 'https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg?auto=compress&cs=tinysrgb&w=800',
    itinerary_count: 52,
  },
  {
    id: '3',
    name: 'Marrakech',
    country: 'Morocco',
    theme: 'Vibrant markets & culture',
    image_url: 'https://images.pexels.com/photos/2433467/pexels-photo-2433467.jpeg?auto=compress&cs=tinysrgb&w=800',
    itinerary_count: 28,
  },
  {
    id: '4',
    name: 'Amalfi Coast',
    country: 'Italy',
    theme: 'Coastal beauty & cuisine',
    image_url: 'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=800',
    itinerary_count: 41,
  },
  {
    id: '5',
    name: 'Banff',
    country: 'Canada',
    theme: 'Mountain adventures',
    image_url: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800',
    itinerary_count: 19,
  },
  {
    id: '6',
    name: 'Dubai',
    country: 'UAE',
    theme: 'Luxury & modern wonders',
    image_url: 'https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg?auto=compress&cs=tinysrgb&w=800',
    itinerary_count: 37,
  },
  {
    id: '7',
    name: 'Bali',
    country: 'Indonesia',
    theme: 'Wellness & spirituality',
    image_url: 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=800',
    itinerary_count: 63,
  },
  {
    id: '8',
    name: 'Patagonia',
    country: 'Argentina',
    theme: 'Wild landscapes',
    image_url: 'https://images.pexels.com/photos/1424246/pexels-photo-1424246.jpeg?auto=compress&cs=tinysrgb&w=800',
    itinerary_count: 15,
  },
];

const FILTER_CATEGORIES = [
  'Beach',
  'Adventure',
  'Cultural',
  'Food & Wine',
  'Wellness',
  'Romance',
];

interface ExploreViewProps {
  onCreateTrip?: () => void;
  onViewTrip?: (tripId: string) => void;
}

export function ExploreView({ onCreateTrip, onViewTrip }: ExploreViewProps) {
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null);
  const [selectedDestinationId, setSelectedDestinationId] = useState<string | null>(null);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string | null>(null);
  const [tripDrawerOpen, setTripDrawerOpen] = useState(false);
  const [destinationDrawerOpen, setDestinationDrawerOpen] = useState(false);
  const [restaurantDrawerOpen, setRestaurantDrawerOpen] = useState(false);
  const [filtersModalOpen, setFiltersModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterValues | null>(null);

  const handleTripClick = (tripId: string) => {
    setSelectedTripId(tripId);
    setTripDrawerOpen(true);
  };

  const handleDestinationClick = (destId: string) => {
    setSelectedDestinationId(destId);
    setDestinationDrawerOpen(true);
  };

  const handleRestaurantClick = (restId: string) => {
    setSelectedRestaurantId(restId);
    setRestaurantDrawerOpen(true);
  };

  const handleViewFullItinerary = (tripId: string) => {
    setTripDrawerOpen(false);
    onViewTrip?.(tripId);
  };

  const handlePurchaseTrip = (tripId: string) => {
    console.log('Purchase trip:', tripId);
  };

  const handleApplyFilters = (filterValues: FilterValues) => {
    setFilters(filterValues);
    console.log('Apply filters:', filterValues);
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  return (
    <div className="bg-white relative">
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-sunset-soft rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-sunset-soft rounded-full blur-3xl opacity-30" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 lg:py-8 relative">
        <div className="mb-10">
          <div className="relative mb-8">
            <div className="relative group">
              <div className="absolute left-5 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-gradient-sunset flex items-center justify-center">
                <Search className="w-5 h-5 text-white" />
              </div>
              <input
                type="text"
                placeholder="Search destinations, trips, or creators..."
                onClick={() => setSearchModalOpen(true)}
                readOnly
                className="w-full pl-20 pr-32 py-5 rounded-full border-2 border-gray-100
                         focus:outline-none focus:border-transparent focus:ring-2 focus:ring-sunset-pink/30
                         text-gray-900 placeholder-gray-500 transition-all duration-300 text-base font-medium
                         hover:shadow-floating cursor-pointer bg-white shadow-floating
                         group-hover:border-gray-200"
              />
              <button
                onClick={() => setFiltersModalOpen(true)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2
                             px-5 py-2.5 rounded-full hover:bg-gradient-sunset-soft active:scale-95
                             text-gray-700 hover:text-gray-900 font-semibold text-sm
                             transition-all duration-200 flex items-center gap-2
                             border-2 border-gray-100 hover:border-sunset-orange/20 hover:shadow-sm bg-white">
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters</span>
              </button>
            </div>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-6 px-6 lg:mx-0 lg:px-0">
            {FILTER_CATEGORIES.map((category, index) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                style={{ animationDelay: `${index * 40}ms` }}
                className={`px-6 py-3 rounded-full animate-slide-up-fade
                         text-sm font-semibold whitespace-nowrap
                         transition-all duration-200 border-2
                         transform hover:scale-105 hover:-translate-y-0.5 active:scale-95 ${
                           activeCategory === category
                             ? 'bg-gradient-sunset text-white border-transparent shadow-md'
                             : 'bg-white hover:bg-gradient-sunset-soft text-gray-700 hover:text-gray-900 border-gray-100 hover:border-sunset-orange/20 shadow-sm hover:shadow-md'
                         }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <section className="mb-12">
          <PromotionalBanner
            title="Discover Your Next Adventure"
            description="Curated itineraries from expert travelers around the world"
            ctaText="Explore itineraries"
            image_url="https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=1600"
            theme="dark"
            size="large"
            onClick={() => console.log('View all itineraries')}
          />
        </section>

        <VideoCarousel />

        <section className="mb-12">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-2 tracking-tighter">
              Featured Destinations
            </h2>
            <p className="text-gray-600 text-lg">Explore our most loved locations</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FeaturedCategory
              title="Beach Escapes"
              subtitle="Tropical paradises and coastal gems"
              image_url="https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=800"
              onClick={() => handleCategoryClick('Beach')}
            />
            <FeaturedCategory
              title="Urban Adventures"
              subtitle="Discover world-class cities"
              image_url="https://images.pexels.com/photos/2422461/pexels-photo-2422461.jpeg?auto=compress&cs=tinysrgb&w=800"
              onClick={() => handleCategoryClick('Urban')}
            />
          </div>
        </section>

        <section className="mb-12">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-2 tracking-tighter">
              Curated Itineraries
            </h2>
            <p className="text-gray-600 text-lg">Handpicked trips based on your interests</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
            {MOCK_TRIPS.slice(0, 3).map((trip, index) => (
              <div
                key={trip.id}
                onClick={() => handleTripClick(trip.id)}
                className="animate-slide-up-fade"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <TripCard trip={trip} />
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-baseline justify-between mb-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 tracking-tighter">
                Trending Destinations
              </h2>
              <p className="text-gray-600 text-lg mt-2">Discover the hottest destinations right now</p>
            </div>
            <button className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-sunset hover:opacity-80 transition-opacity">
              Show all →
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
            {MOCK_LOCATIONS.map((location, index) => (
              <div
                key={location.id}
                onClick={() => handleDestinationClick(location.id)}
                className="animate-slide-up-fade"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <LocationCard location={location} size="small" />
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-2 tracking-tighter">
              Must-Try Restaurants
            </h2>
            <p className="text-gray-600 text-lg">Dining experiences worth traveling for</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
            {MOCK_RESTAURANTS.map((restaurant, index) => (
              <div
                key={restaurant.id}
                onClick={() => handleRestaurantClick(restaurant.id)}
                className="animate-slide-up-fade"
                style={{ animationDelay: `${index * 75}ms` }}
              >
                <RestaurantCard restaurant={restaurant} />
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <PromotionalBanner
            title="Create Your Own Journey"
            description="Not finding what you're looking for? Build a custom itinerary tailored to your travel style"
            ctaText="Start planning"
            image_url="https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=1600"
            theme="light"
            size="small"
            onClick={() => onCreateTrip?.()}
          />
        </section>

        <section className="mb-12">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-900 tracking-tighter">
              Weekend Getaways
            </h2>
            <p className="text-gray-600 text-lg mt-2">Quick escapes for your next adventure</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
            {MOCK_TRIPS.slice(0, 3).map((trip) => (
              <div key={trip.id} onClick={() => handleTripClick(trip.id)}>
                <TripCard trip={trip} />
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-900 tracking-tighter">
              Popular With Travelers
            </h2>
            <p className="text-gray-600 text-lg mt-2">Top-rated trips loved by our community</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
            {MOCK_TRIPS.slice(1, 4).map((trip) => (
              <div key={trip.id} onClick={() => handleTripClick(trip.id)}>
                <TripCard trip={trip} />
              </div>
            ))}
          </div>
        </section>
      </div>

      <TripDetailDrawer
        tripId={selectedTripId}
        isOpen={tripDrawerOpen}
        onClose={() => setTripDrawerOpen(false)}
        onPurchase={handlePurchaseTrip}
        onViewFullItinerary={handleViewFullItinerary}
      />

      <DestinationDetailDrawer
        destinationId={selectedDestinationId}
        isOpen={destinationDrawerOpen}
        onClose={() => setDestinationDrawerOpen(false)}
        onTripClick={handleTripClick}
        onViewAllItineraries={(dest) => console.log('View all for:', dest)}
      />

      <PlaceDetailDrawer
        placeId={selectedRestaurantId}
        isOpen={restaurantDrawerOpen}
        onClose={() => setRestaurantDrawerOpen(false)}
      />

      <FiltersModal
        isOpen={filtersModalOpen}
        onClose={() => setFiltersModalOpen(false)}
        onApply={handleApplyFilters}
      />

      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onTripClick={handleTripClick}
        onDestinationClick={handleDestinationClick}
        onRestaurantClick={handleRestaurantClick}
      />
    </div>
  );
}
