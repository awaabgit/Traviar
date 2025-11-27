import { Heart } from 'lucide-react';
import { useState } from 'react';

interface LocationCardProps {
  location: {
    id: string;
    name: string;
    country: string;
    theme: string;
    image_url: string;
    itinerary_count?: number;
  };
  size?: 'small' | 'large';
}

export function LocationCard({ location, size = 'large' }: LocationCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden rounded-xl mb-3">
        <div className={`relative ${size === 'large' ? 'aspect-[4/3]' : 'aspect-[3/4]'}`}>
          <img
            src={location.image_url}
            alt={location.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsSaved(!isSaved);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/95 backdrop-blur-sm
                     hover:scale-110 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isSaved ? 'fill-coral-500 text-coral-500' : 'text-gray-800 hover:text-gray-900'
            }`}
          />
        </button>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-[15px] font-semibold text-gray-900 leading-tight line-clamp-1">
          {location.name}
        </h3>

        <p className="text-[15px] text-gray-600 line-clamp-1 leading-tight">
          {location.country}
        </p>

        <p className="text-sm text-gray-600 mt-0.5">
          {location.theme}
        </p>

        {location.itinerary_count && (
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-[15px] text-gray-900">{location.itinerary_count} itineraries</span>
          </div>
        )}
      </div>
    </div>
  );
}
