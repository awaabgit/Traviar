import { MapPin, Star } from 'lucide-react';

const TRENDING_PLACES = [
  {
    id: '1',
    name: "The Butcher's Daughter",
    category: 'Restaurant',
    image: 'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=600',
    distance: '0.8 mi',
    location: 'Lower East Side',
    rating: 4.6,
  },
  {
    id: '2',
    name: 'Brooklyn Bridge Park',
    category: 'Attraction',
    image: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=600',
    distance: '1.2 mi',
    location: 'Brooklyn',
    rating: 4.8,
  },
  {
    id: '3',
    name: 'Smorgasburg',
    category: 'Food Market',
    image: 'https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=600',
    distance: '2.3 mi',
    location: 'Williamsburg',
    rating: 4.7,
  },
];

export function TrendingNearYou() {
  return (
    <section className="animate-fade-in">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">Trending Near You</h3>

      <div className="space-y-3">
        {TRENDING_PLACES.map((place, index) => (
          <button
            key={place.id}
            className="w-full group animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-sm border border-gray-200
                          bg-white hover:shadow-lg transition-all duration-300 transform
                          hover:scale-[1.02] active:scale-[0.98]">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                <div className="absolute top-3 right-3 flex gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm
                                 text-xs font-medium text-gray-700">
                    {place.category}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3">
                  <h4 className="font-semibold text-white text-lg mb-1">{place.name}</h4>
                  <div className="flex items-center gap-3 text-white/90 text-sm">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{place.distance}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <span>{place.rating}</span>
                    </div>
                    <span>• {place.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
