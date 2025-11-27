import { X, Search, TrendingUp, Clock, MapPin, Utensils, Map } from 'lucide-react';
import { useState, useEffect } from 'react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTripClick?: (tripId: string) => void;
  onDestinationClick?: (destId: string) => void;
  onRestaurantClick?: (restId: string) => void;
}

const POPULAR_SEARCHES = [
  'Paris itineraries',
  'Beach destinations',
  'Budget trips',
  'Romantic getaways',
  'Food tours',
  'Adventure travel'
];

const MOCK_SEARCH_RESULTS = {
  trips: [
    { id: '1', title: 'Romantic Paris Escape', destination: 'Paris, France', price: 299, type: 'trip' },
    { id: '2', title: 'Tokyo Adventure Week', destination: 'Tokyo, Japan', price: 599, type: 'trip' }
  ],
  destinations: [
    { id: '1', name: 'Santorini', country: 'Greece', itineraries: 34, type: 'destination' },
    { id: '2', name: 'Bali', country: 'Indonesia', itineraries: 63, type: 'destination' }
  ],
  restaurants: [
    { id: '1', name: 'Le Comptoir du Relais', cuisine: 'French Bistro', location: 'Paris', type: 'restaurant' },
    { id: '2', name: 'Sukiyabashi Jiro', cuisine: 'Sushi Master', location: 'Tokyo', type: 'restaurant' }
  ]
};

export function SearchModal({
  isOpen,
  onClose,
  onTripClick,
  onDestinationClick,
  onRestaurantClick
}: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'trips' | 'destinations' | 'restaurants'>('all');
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Santorini trips',
    'Best restaurants Paris',
    'Weekend getaways'
  ]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query && !recentSearches.includes(query)) {
      setRecentSearches([query, ...recentSearches].slice(0, 5));
    }
  };

  const showResults = searchQuery.length > 0;

  return (
    <div className="fixed inset-0 z-[9999] bg-white animate-fade-in">
      <div className="max-w-4xl mx-auto h-full flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search destinations, trips, restaurants, or creators..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                autoFocus
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200
                         focus:outline-none focus:border-coral-400 focus:ring-2 focus:ring-coral-100
                         text-gray-900 placeholder-gray-400"
              />
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {showResults && (
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {['all', 'trips', 'destinations', 'restaurants'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap
                           transition-all duration-200 ${
                             activeTab === tab
                               ? 'bg-coral-500 text-white'
                               : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                           }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {!showResults ? (
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-gray-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Recent searches</h3>
                </div>
                <div className="space-y-2">
                  {recentSearches.map((search, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSearchQuery(search)}
                      className="w-full flex items-center justify-between p-3 rounded-lg
                               hover:bg-gray-50 transition-colors duration-200 text-left group"
                    >
                      <span className="text-gray-700">{search}</span>
                      <Search className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-coral-500" />
                  <h3 className="text-lg font-semibold text-gray-900">Popular searches</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.map((search, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSearchQuery(search)}
                      className="px-4 py-2 rounded-full bg-gray-100 text-gray-700
                               hover:bg-coral-50 hover:text-coral-700 font-medium text-sm
                               transition-all duration-200"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {(activeTab === 'all' || activeTab === 'trips') && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Map className="w-5 h-5 text-coral-500" />
                    Trips
                  </h3>
                  <div className="space-y-2">
                    {MOCK_SEARCH_RESULTS.trips.map(trip => (
                      <button
                        key={trip.id}
                        onClick={() => {
                          onTripClick?.(trip.id);
                          onClose();
                        }}
                        className="w-full flex items-center justify-between p-4 rounded-xl
                                 border border-gray-200 hover:border-coral-300 hover:shadow-md
                                 transition-all duration-200 text-left"
                      >
                        <div>
                          <p className="font-semibold text-gray-900">{trip.title}</p>
                          <p className="text-sm text-gray-600">{trip.destination}</p>
                        </div>
                        <span className="text-coral-600 font-semibold">${trip.price}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {(activeTab === 'all' || activeTab === 'destinations') && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-500" />
                    Destinations
                  </h3>
                  <div className="space-y-2">
                    {MOCK_SEARCH_RESULTS.destinations.map(dest => (
                      <button
                        key={dest.id}
                        onClick={() => {
                          onDestinationClick?.(dest.id);
                          onClose();
                        }}
                        className="w-full flex items-center justify-between p-4 rounded-xl
                                 border border-gray-200 hover:border-blue-300 hover:shadow-md
                                 transition-all duration-200 text-left"
                      >
                        <div>
                          <p className="font-semibold text-gray-900">{dest.name}</p>
                          <p className="text-sm text-gray-600">{dest.country}</p>
                        </div>
                        <span className="text-sm text-gray-600">{dest.itineraries} itineraries</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {(activeTab === 'all' || activeTab === 'restaurants') && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Utensils className="w-5 h-5 text-green-500" />
                    Restaurants
                  </h3>
                  <div className="space-y-2">
                    {MOCK_SEARCH_RESULTS.restaurants.map(rest => (
                      <button
                        key={rest.id}
                        onClick={() => {
                          onRestaurantClick?.(rest.id);
                          onClose();
                        }}
                        className="w-full flex items-center justify-between p-4 rounded-xl
                                 border border-gray-200 hover:border-green-300 hover:shadow-md
                                 transition-all duration-200 text-left"
                      >
                        <div>
                          <p className="font-semibold text-gray-900">{rest.name}</p>
                          <p className="text-sm text-gray-600">{rest.cuisine}</p>
                        </div>
                        <span className="text-sm text-gray-600">{rest.location}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {searchQuery.length > 2 && (
                <p className="text-center text-sm text-gray-500 py-8">
                  Can't find what you're looking for? Try different keywords.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
