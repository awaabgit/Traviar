import { useState } from 'react';
import { X, Search, Star, Clock, DollarSign, MapPin } from 'lucide-react';
import { TripDay, DayActivity } from '../../../hooks/useTripData';

interface AddPlaceModalProps {
  dayId: string;
  days: TripDay[];
  onClose: () => void;
  onAddActivity: (dayId: string, activity: Omit<DayActivity, 'id' | 'day_id' | 'created_at' | 'sort_order'>) => Promise<{ success: boolean; error?: string }>;
}

type ModalTab = 'search' | 'saved' | 'fromChat' | 'custom';

interface PlaceResult {
  id: string;
  title: string;
  category: DayActivity['category'];
  description: string;
  location: string;
  rating: number;
  reviews: number;
  priceLevel: string;
  duration: string;
  imageUrl: string;
  lat: number;
  lng: number;
}

const MOCK_PLACES: PlaceResult[] = [
  {
    id: '1',
    title: 'Eiffel Tower',
    category: 'attraction',
    description: 'Iconic iron lattice tower and symbol of Paris',
    location: 'Champ de Mars, Paris',
    rating: 4.7,
    reviews: 125000,
    priceLevel: '$$',
    duration: '2-3 hrs',
    imageUrl: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=400&h=300&fit=crop',
    lat: 48.8584,
    lng: 2.2945,
  },
  {
    id: '2',
    title: 'Le Comptoir du Relais',
    category: 'restaurant',
    description: 'Classic French bistro with seasonal menu',
    location: 'Saint-Germain-des-Prés, Paris',
    rating: 4.5,
    reviews: 2840,
    priceLevel: '$$$',
    duration: '1-2 hrs',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
    lat: 48.8534,
    lng: 2.3392,
  },
  {
    id: '3',
    title: 'Louvre Museum',
    category: 'attraction',
    description: 'World\'s largest art museum and historic monument',
    location: 'Rue de Rivoli, Paris',
    rating: 4.8,
    reviews: 98000,
    priceLevel: '$$',
    duration: '3-4 hrs',
    imageUrl: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&h=300&fit=crop',
    lat: 48.8606,
    lng: 2.3376,
  },
  {
    id: '4',
    title: 'Seine River Cruise',
    category: 'activity',
    description: 'Scenic boat tour along the Seine with commentary',
    location: 'Port de la Bourdonnais, Paris',
    rating: 4.6,
    reviews: 15200,
    priceLevel: '$$',
    duration: '1-2 hrs',
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop',
    lat: 48.8606,
    lng: 2.2946,
  },
];

export function AddPlaceModal({ dayId, days, onClose, onAddActivity }: AddPlaceModalProps) {
  const [activeTab, setActiveTab] = useState<ModalTab>('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [customPlace, setCustomPlace] = useState({
    title: '',
    category: 'other' as DayActivity['category'],
    description: '',
    location: '',
  });

  const selectedDay = days.find(d => d.id === dayId);
  const dayNumber = selectedDay?.day_number || 1;

  const filteredPlaces = MOCK_PLACES.filter(place =>
    place.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    place.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddPlace = async (place: PlaceResult) => {
    await onAddActivity(dayId, {
      category: place.category,
      title: place.title,
      description: place.description,
      location_name: place.location,
      location_lat: place.lat,
      location_lng: place.lng,
      duration_minutes: place.duration.includes('2-3') ? 150 : 120,
      cost: 0,
    });
  };

  const handleAddCustom = async () => {
    if (!customPlace.title.trim()) return;

    await onAddActivity(dayId, {
      category: customPlace.category,
      title: customPlace.title,
      description: customPlace.description || undefined,
      location_name: customPlace.location || undefined,
      duration_minutes: 60,
      cost: 0,
    });

    setCustomPlace({ title: '', category: 'other', description: '', location: '' });
    onClose();
  };

  const PlaceCard = ({ place }: { place: PlaceResult }) => (
    <div className="flex gap-4 p-4 rounded-lg border border-gray-200 hover:border-coral-400 hover:shadow-md
                  transition-all duration-300 bg-white transform hover:scale-[1.01]">
      <img
        src={place.imageUrl}
        alt={place.title}
        className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-gray-900 mb-1">{place.title}</h4>
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
          <span className="capitalize">{place.category}</span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            {place.rating} ({place.reviews.toLocaleString()})
          </span>
          <span>·</span>
          <span>{place.priceLevel}</span>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2 mb-2">{place.description}</p>
        <div className="flex items-center gap-2">
          <span className="text-xs px-2 py-1 rounded-md bg-gray-100 text-gray-700">
            <Clock className="w-3 h-3 inline mr-1" />
            {place.duration}
          </span>
          <span className="text-xs px-2 py-1 rounded-md bg-gray-100 text-gray-700">
            <MapPin className="w-3 h-3 inline mr-1" />
            {place.location}
          </span>
        </div>
      </div>
      <button
        onClick={() => handleAddPlace(place)}
        className="self-start px-4 py-2 rounded-lg bg-coral-500 hover:bg-coral-600 text-white text-sm font-medium
                 transition-all duration-200 transform hover:scale-105 active:scale-95 hover:shadow-md flex-shrink-0"
      >
        Add to Day {dayNumber}
      </button>
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Add a place</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <div className="flex gap-4 border-b border-gray-200">
            {[
              { id: 'search' as const, label: 'Search' },
              { id: 'saved' as const, label: 'Saved' },
              { id: 'fromChat' as const, label: 'From chat' },
              { id: 'custom' as const, label: 'Custom' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative pb-3 font-medium transition-colors ${
                  activeTab === tab.id ? 'text-coral-600' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-coral-500 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(85vh-180px)]">
          {activeTab === 'search' && (
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search places, restaurants, or things to do"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-coral-500 focus:ring-2 focus:ring-coral-500/20 outline-none transition-all"
                  autoFocus
                />
              </div>
              <div className="space-y-3">
                {filteredPlaces.map((place) => (
                  <PlaceCard key={place.id} place={place} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'saved' && (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-600">No saved places yet</p>
              <p className="text-sm text-gray-500 mt-1">
                Save places from search to quickly add them later
              </p>
            </div>
          )}

          {activeTab === 'fromChat' && (
            <div className="space-y-3">
              <p className="text-sm text-gray-600 mb-4">
                Places suggested by Traviar AI
              </p>
              {MOCK_PLACES.slice(0, 2).map((place) => (
                <PlaceCard key={place.id} place={place} />
              ))}
            </div>
          )}

          {activeTab === 'custom' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Place name *
                </label>
                <input
                  type="text"
                  value={customPlace.title}
                  onChange={(e) => setCustomPlace({ ...customPlace, title: e.target.value })}
                  placeholder="e.g., Local bakery"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-coral-500 focus:ring-2 focus:ring-coral-500/20 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={customPlace.location}
                  onChange={(e) => setCustomPlace({ ...customPlace, location: e.target.value })}
                  placeholder="e.g., Montmartre, Paris"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-coral-500 focus:ring-2 focus:ring-coral-500/20 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={customPlace.category}
                  onChange={(e) => setCustomPlace({ ...customPlace, category: e.target.value as DayActivity['category'] })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-coral-500 focus:ring-2 focus:ring-coral-500/20 outline-none transition-all"
                >
                  <option value="restaurant">Restaurant</option>
                  <option value="attraction">Attraction</option>
                  <option value="activity">Activity</option>
                  <option value="accommodation">Accommodation</option>
                  <option value="transport">Transport</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes
                </label>
                <textarea
                  value={customPlace.description}
                  onChange={(e) => setCustomPlace({ ...customPlace, description: e.target.value })}
                  placeholder="Add any notes or details..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-coral-500 focus:ring-2 focus:ring-coral-500/20 outline-none transition-all resize-none"
                />
              </div>

              <button
                onClick={handleAddCustom}
                disabled={!customPlace.title.trim()}
                className="w-full py-3 rounded-lg bg-coral-500 hover:bg-coral-600 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add custom stop
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
