import { Search, Star, MapPin, Plus, Sparkles, TrendingUp, Heart, Utensils, Hotel, Ticket } from 'lucide-react';

interface ExplorerTabProps {
  tripId: string;
  onPlaceClick?: (placeId: string) => void;
}

const TRENDING_PLACES = [
  {
    id: '1',
    name: 'Eiffel Tower',
    category: 'Landmark',
    rating: 4.8,
    reviews: 125000,
    distance: '2.3 km',
    price: '€€',
    imageUrl: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Iconic iron lattice tower on the Champ de Mars',
  },
  {
    id: '2',
    name: 'Le Comptoir du Relais',
    category: 'Restaurant',
    rating: 4.7,
    reviews: 2840,
    distance: '1.1 km',
    price: '€€€',
    imageUrl: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Classic French bistro with seasonal menu',
  },
  {
    id: '3',
    name: 'Louvre Museum',
    category: 'Museum',
    rating: 4.9,
    reviews: 98000,
    distance: '3.5 km',
    price: '€€',
    imageUrl: 'https://images.pexels.com/photos/2676574/pexels-photo-2676574.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: "World's largest art museum and historic monument",
  },
  {
    id: '4',
    name: 'Seine River Cruise',
    category: 'Activity',
    rating: 4.6,
    reviews: 5200,
    distance: '0.8 km',
    price: '€€',
    imageUrl: 'https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg?auto=compress&cs=tinysrgb&w=600',
    description: 'Scenic boat tour along the Seine',
  },
  {
    id: '5',
    name: 'Montmartre',
    category: 'Neighborhood',
    rating: 4.8,
    reviews: 15600,
    distance: '4.2 km',
    price: 'Free',
    imageUrl: 'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Historic hilltop district with artistic heritage',
  },
  {
    id: '6',
    name: 'Versailles Palace',
    category: 'Landmark',
    rating: 4.9,
    reviews: 45000,
    distance: '20 km',
    price: '€€€',
    imageUrl: 'https://images.pexels.com/photos/2476632/pexels-photo-2476632.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Former royal residence with opulent gardens',
  },
];

const CURATED_EXPERIENCES = [
  { id: '1', icon: Utensils, title: 'Food Tours', count: 12, color: 'orange' },
  { id: '2', icon: Ticket, title: 'Skip-the-Line', count: 8, color: 'purple' },
  { id: '3', icon: Heart, title: 'Local Favorites', count: 24, color: 'red' },
  { id: '4', icon: Hotel, title: 'Best Hotels', count: 15, color: 'blue' },
];

const AI_RECOMMENDATIONS = [
  {
    id: '1',
    title: 'Morning at Musée d\'Orsay',
    reason: 'Based on your interest in impressionist art',
    time: 'Best before 10 AM',
    imageUrl: 'https://images.pexels.com/photos/2563681/pexels-photo-2563681.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '2',
    title: 'Jazz Club in Le Marais',
    reason: 'Matches your nightlife preferences',
    time: 'Evening entertainment',
    imageUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '3',
    title: 'Picnic at Luxembourg Gardens',
    reason: 'Perfect for your travel style',
    time: 'Afternoon relaxation',
    imageUrl: 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

const CATEGORIES = ['All', 'Restaurants', 'Attractions', 'Activities', 'Hotels', 'Shopping', 'Nightlife'];

export function ExplorerTab({ tripId, onPlaceClick }: ExplorerTabProps) {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search places, restaurants, activities..."
          className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200
                   focus:outline-none focus:border-coral-400 focus:ring-2 focus:ring-coral-100
                   transition-all duration-200 text-gray-900 placeholder-gray-400
                   hover:border-gray-300 hover:shadow-sm"
        />
      </div>

      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
        {CATEGORIES.map((category, index) => (
          <button
            key={category}
            style={{ animationDelay: `${index * 40}ms` }}
            className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap
                     transition-all duration-200 animate-slide-up-fade
                     transform hover:scale-105 active:scale-95 ${
                       index === 0
                         ? 'bg-coral-500 text-white shadow-md hover:bg-coral-600'
                         : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300 hover:shadow-sm'
                     }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="bg-gradient-to-r from-coral-50 to-orange-50 rounded-[20px] p-6 border border-coral-100
                    animate-slide-up-fade" style={{ animationDelay: '100ms' }}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-coral-600" />
              <h3 className="text-lg font-semibold text-gray-900">AI Recommendations</h3>
            </div>
            <p className="text-sm text-gray-600">Personalized suggestions for your trip</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {AI_RECOMMENDATIONS.map((rec, index) => (
            <div
              key={rec.id}
              style={{ animationDelay: `${150 + index * 75}ms` }}
              className="bg-white rounded-xl p-4 hover:shadow-md transition-all duration-200
                       cursor-pointer animate-slide-up-fade transform hover:scale-[1.02] group"
            >
              <div className="relative h-32 rounded-lg overflow-hidden mb-3">
                <img
                  src={rec.imageUrl}
                  alt={rec.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-2 left-2">
                  <span className="text-xs font-medium text-white bg-black/40 backdrop-blur-sm px-2 py-1 rounded">
                    {rec.time}
                  </span>
                </div>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1 text-sm">{rec.title}</h4>
              <p className="text-xs text-gray-600 mb-3">{rec.reason}</p>
              <button
                className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg
                         bg-coral-500 hover:bg-coral-600 text-white text-xs font-medium
                         transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" />
                Add to Trip
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-1">Curated Experiences</h3>
            <p className="text-sm text-gray-600">Handpicked collections for you</p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {CURATED_EXPERIENCES.map((exp, index) => {
            const Icon = exp.icon;
            const colorClasses = {
              orange: 'bg-orange-100 text-orange-600 hover:bg-orange-200',
              purple: 'bg-purple-100 text-purple-600 hover:bg-purple-200',
              red: 'bg-red-100 text-red-600 hover:bg-red-200',
              blue: 'bg-blue-100 text-blue-600 hover:bg-blue-200',
            };

            return (
              <button
                key={exp.id}
                style={{ animationDelay: `${200 + index * 75}ms` }}
                className="flex flex-col items-center gap-3 p-5 rounded-xl border border-gray-200
                         hover:border-gray-300 hover:shadow-md bg-white transition-all duration-200
                         animate-slide-up-fade transform hover:scale-105 active:scale-95"
              >
                <div className={`p-3 rounded-xl transition-colors duration-200 ${colorClasses[exp.color as keyof typeof colorClasses]}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-900 text-sm mb-1">{exp.title}</div>
                  <div className="text-xs text-gray-600">{exp.count} options</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-5 h-5 text-coral-600" />
              <h3 className="text-xl font-semibold text-gray-900">Trending Near You</h3>
            </div>
            <p className="text-sm text-gray-600">Popular places travelers are adding</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRENDING_PLACES.map((place, index) => (
            <div
              key={place.id}
              onClick={() => onPlaceClick?.(place.id)}
              style={{ animationDelay: `${300 + index * 60}ms` }}
              className="bg-white rounded-[18px] shadow-soft border border-gray-100 overflow-hidden
                       hover:shadow-soft-lg transition-all duration-300 cursor-pointer
                       animate-slide-up-fade transform hover:scale-[1.02] group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={place.imageUrl}
                  alt={place.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-3 right-3">
                  <button
                    className="p-2 rounded-full bg-white/95 backdrop-blur-sm shadow-md
                             hover:bg-white transition-all duration-200
                             transform hover:scale-110 active:scale-95"
                  >
                    <Plus className="w-4 h-4 text-gray-700" />
                  </button>
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm
                               text-xs font-medium text-gray-900">
                    {place.category}
                  </span>
                  <span className="inline-block px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm
                               text-xs font-medium text-gray-900">
                    {place.price}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h4 className="font-semibold text-gray-900 mb-2">{place.name}</h4>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{place.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{place.rating}</span>
                    <span className="text-gray-500">({place.reviews.toLocaleString()})</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{place.distance}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 rounded-[20px] p-8 border border-gray-200 text-center
                    animate-slide-up-fade" style={{ animationDelay: '500ms' }}>
        <Sparkles className="w-12 h-12 text-coral-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Can't find what you're looking for?</h3>
        <p className="text-gray-600 mb-6">Let AI suggest personalized places based on your preferences</p>
        <button
          className="px-6 py-3 rounded-xl bg-coral-500 hover:bg-coral-600 text-white font-semibold
                   shadow-lg hover:shadow-xl transition-all duration-200
                   transform hover:scale-105 active:scale-95"
        >
          Get AI Suggestions
        </button>
      </div>
    </div>
  );
}
