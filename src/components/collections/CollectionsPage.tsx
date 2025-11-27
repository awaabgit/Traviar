import { useState } from 'react';
import { Search, SlidersHorizontal, Compass, Coffee, DollarSign, Sparkles, Backpack, Calendar, Users, Heart, User, ChevronRight } from 'lucide-react';
import { CollectionsHero } from './CollectionsHero';
import { CollectionCard, Collection } from './CollectionCard';
import { CollectionDetailDrawer } from './CollectionDetailDrawer';

const THEME_CHIPS = [
  'Beach & islands',
  'City breaks',
  'Foodie',
  'Budget',
  'Luxury',
  'Backpacking',
  'Weekend',
  'Family',
  'Romantic',
  'Solo',
];

const FEATURED_COLLECTIONS: Collection[] = [
  {
    id: '1',
    title: 'Weekend Getaways',
    description: 'Quick escapes perfect for 2–3 day trips. Explore nearby cities without taking too much time off.',
    coverImage: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=800',
    itineraryCount: 24,
    averageRating: 4.8,
    startingPrice: 49,
    tags: ['Weekend', 'Quick'],
  },
  {
    id: '2',
    title: 'Budget-Friendly Adventures',
    description: 'Travel smart without breaking the bank. Affordable itineraries for the budget-conscious explorer.',
    coverImage: 'https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=800',
    itineraryCount: 32,
    averageRating: 4.7,
    startingPrice: 29,
    tags: ['Budget', 'Value'],
  },
  {
    id: '3',
    title: 'Luxury Escapes',
    description: 'Indulge in premium experiences. High-end accommodations, fine dining, and exclusive activities.',
    coverImage: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800',
    itineraryCount: 18,
    averageRating: 4.9,
    startingPrice: 199,
    tags: ['Luxury', 'Premium'],
  },
  {
    id: '4',
    title: 'Backpacker Essentials',
    description: 'Ultimate guides for long-term travelers. Hostels, local transport, and authentic experiences.',
    coverImage: 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=800',
    itineraryCount: 28,
    averageRating: 4.6,
    startingPrice: 39,
    tags: ['Backpacking', 'Adventure'],
  },
  {
    id: '5',
    title: 'Foodie Trips',
    description: 'Culinary adventures around the world. From street food tours to Michelin-starred restaurants.',
    coverImage: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    itineraryCount: 21,
    averageRating: 4.9,
    startingPrice: 69,
    tags: ['Food', 'Culture'],
  },
  {
    id: '6',
    title: 'Cultural Experiences',
    description: 'Immerse yourself in local traditions. Museums, festivals, and historical landmarks.',
    coverImage: 'https://images.pexels.com/photos/2675269/pexels-photo-2675269.jpeg?auto=compress&cs=tinysrgb&w=800',
    itineraryCount: 26,
    averageRating: 4.8,
    startingPrice: 59,
    tags: ['Culture', 'History'],
  },
  {
    id: '7',
    title: 'Creator Best Sellers',
    description: 'Most popular itineraries from top-rated creators. Proven favorites that travelers love.',
    coverImage: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=800',
    itineraryCount: 35,
    averageRating: 4.9,
    startingPrice: 45,
    tags: ['Popular', 'Top Rated'],
  },
  {
    id: '8',
    title: 'Trending Destinations',
    description: 'Hottest travel spots right now. Discover what everyone is talking about this season.',
    coverImage: 'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=800',
    itineraryCount: 29,
    averageRating: 4.7,
    startingPrice: 55,
    tags: ['Trending', 'Popular'],
  },
];

const TRAVEL_STYLES = [
  { id: 'adventure', name: 'Adventure', icon: Compass },
  { id: 'relax', name: 'Relax & recharge', icon: Sparkles },
  { id: 'food', name: 'Food & wine', icon: Coffee },
  { id: 'culture', name: 'Culture & history', icon: Backpack },
];

const TRIP_LENGTHS = [
  { id: 'weekend', label: 'Weekend' },
  { id: '3-5', label: '3–5 days' },
  { id: '1week', label: '1 week' },
  { id: '2weeks', label: '2+ weeks' },
];

const MOCK_CREATORS = [
  {
    id: '1',
    name: '@wanderlust_sam',
    displayName: 'Sam Chen',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=200',
    banner: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=400',
    itineraryCount: 24,
    rating: 4.9,
  },
  {
    id: '2',
    name: '@travelwithemma',
    displayName: 'Emma Rodriguez',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    banner: 'https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=400',
    itineraryCount: 32,
    rating: 4.8,
  },
  {
    id: '3',
    name: '@jakeontheroad',
    displayName: 'Jake Morrison',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200',
    banner: 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=400',
    itineraryCount: 18,
    rating: 4.9,
  },
];

export function CollectionsPage() {
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);
  const [activeTheme, setActiveTheme] = useState<string | null>(null);
  const [activeTripLength, setActiveTripLength] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <CollectionsHero />

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search collections, regions, or creators…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300
                         focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-transparent
                         transition-all"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-300
                             hover:bg-gray-50 transition-colors font-medium text-gray-700">
              <SlidersHorizontal className="w-5 h-5" />
              Filters
            </button>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6">
            {THEME_CHIPS.map((chip) => (
              <button
                key={chip}
                onClick={() => setActiveTheme(activeTheme === chip ? null : chip)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium
                         transition-all duration-200 ${
                           activeTheme === chip
                             ? 'bg-coral-500 text-white shadow-sm'
                             : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                         }`}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Featured collections</h2>
            <button className="text-sm text-coral-600 font-medium hover:text-coral-700 transition-colors">
              View all
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FEATURED_COLLECTIONS.map((collection) => (
              <CollectionCard
                key={collection.id}
                collection={collection}
                onClick={() => setSelectedCollection(collection)}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by travel style</h2>
          <div className="grid grid-cols-4 gap-4">
            {TRAVEL_STYLES.map((style) => {
              const Icon = style.icon;
              return (
                <button
                  key={style.id}
                  className="p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all
                           duration-200 group text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-coral-100 mx-auto mb-3
                               flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-coral-600" />
                  </div>
                  <p className="font-semibold text-gray-900 group-hover:text-coral-600 transition-colors">
                    {style.name}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Plan by trip length</h2>

          <div className="flex gap-3 mb-6">
            {TRIP_LENGTHS.map((length) => (
              <button
                key={length.id}
                onClick={() => setActiveTripLength(activeTripLength === length.id ? null : length.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeTripLength === length.id
                    ? 'bg-coral-500 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {length.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {FEATURED_COLLECTIONS.slice(0, 3).map((collection) => (
              <button
                key={collection.id}
                onClick={() => setSelectedCollection(collection)}
                className="text-left rounded-xl overflow-hidden bg-white border border-gray-200
                         hover:shadow-lg transition-all duration-300 group"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={collection.coverImage}
                    alt={collection.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-white font-bold text-lg">{collection.title}</h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600 mb-2">{collection.itineraryCount} itineraries</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">From ${collection.startingPrice}</span>
                    <ChevronRight className="w-4 h-4 text-coral-600" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Creator spotlights</h2>
          <div className="grid grid-cols-3 gap-6">
            {MOCK_CREATORS.map((creator) => (
              <button
                key={creator.id}
                onClick={() => setSelectedCollection(FEATURED_COLLECTIONS[0])}
                className="text-left rounded-xl overflow-hidden bg-white border border-gray-200
                         hover:shadow-lg transition-all duration-300 group"
              >
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={creator.banner}
                    alt={creator.displayName}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={creator.avatar}
                      alt={creator.displayName}
                      className="w-12 h-12 rounded-full border-2 border-white -mt-8 relative z-10"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 group-hover:text-coral-600 transition-colors">
                        {creator.displayName}
                      </h3>
                      <p className="text-sm text-gray-600">{creator.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{creator.itineraryCount} itineraries</span>
                    <span className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      Avg {creator.rating}
                    </span>
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <span className="text-sm text-coral-600 font-medium flex items-center gap-1
                                   group-hover:gap-2 transition-all">
                      View collections
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>

      <CollectionDetailDrawer
        collection={selectedCollection}
        onClose={() => setSelectedCollection(null)}
      />
    </>
  );
}
