import { Star, MapPin } from 'lucide-react';
import { NearbyPlace } from '../../types';

interface NearbySectionProps {
  places: NearbyPlace[];
  onPlaceClick: (placeId: string) => void;
}

export function NearbySection({ places, onPlaceClick }: NearbySectionProps) {
  if (places.length === 0) {
    return null;
  }

  return (
    <section
      id="nearby"
      className="py-6 border-t border-gray-100 animate-slide-up-fade"
      style={{ animationDelay: '100ms' }}
    >
      <div className="px-6 mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          Nearby & similar spots
        </h3>
        <p className="text-sm text-gray-600">Explore more options</p>
      </div>

      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 px-6 pb-2">
          {places.map((place, index) => (
            <button
              key={place.id}
              onClick={() => onPlaceClick(place.id)}
              style={{ animationDelay: `${150 + index * 75}ms` }}
              className="flex-shrink-0 w-64 text-left group animate-slide-up-fade"
            >
              <div
                className="bg-white rounded-xl border border-gray-200 overflow-hidden
                         hover:shadow-lg transition-all duration-200
                         transform hover:scale-[1.02]"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={place.imageUrl}
                    alt={place.name}
                    className="w-full h-full object-cover group-hover:scale-110
                             transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                  <div className="absolute top-3 left-3">
                    <span className="inline-block px-2.5 py-1 rounded-full
                                 bg-white/95 backdrop-blur-sm text-xs font-medium text-gray-900">
                      {place.category}
                    </span>
                  </div>

                  {place.priceLevel && (
                    <div className="absolute top-3 right-3">
                      <span className="inline-block px-2.5 py-1 rounded-full
                                   bg-white/95 backdrop-blur-sm text-xs font-medium text-gray-900">
                        {place.priceLevel}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2 line-clamp-1">
                    {place.name}
                  </h4>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium text-gray-900">{place.rating}</span>
                    </div>

                    <div className="flex items-center gap-1 text-gray-600">
                      <MapPin className="w-3.5 h-3.5" />
                      <span className="text-xs">{place.distance}</span>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
