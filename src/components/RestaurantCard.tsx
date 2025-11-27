import { Star, Heart } from 'lucide-react';
import { useState } from 'react';

interface RestaurantCardProps {
  restaurant: {
    id: string;
    name: string;
    cuisine: string;
    location: string;
    priceRange: string;
    image_url: string;
    rating_avg: number;
    rating_count: number;
  };
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden rounded-xl mb-3">
        <div className="relative aspect-[4/3]">
          <img
            src={restaurant.image_url}
            alt={restaurant.name}
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
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[15px] font-semibold text-gray-900 leading-tight line-clamp-1">
            {restaurant.name}
          </h3>
          {restaurant.rating_avg && (
            <div className="flex items-center gap-1 flex-shrink-0">
              <Star className="w-3 h-3 fill-gray-900 text-gray-900" />
              <span className="text-[15px] font-normal text-gray-900">{restaurant.rating_avg}</span>
            </div>
          )}
        </div>

        <p className="text-[15px] text-gray-600 line-clamp-1 leading-tight">
          {restaurant.cuisine}
        </p>

        <p className="text-sm text-gray-600">
          {restaurant.location}
        </p>

        <div className="flex items-baseline gap-1 mt-1">
          <span className="text-[15px] font-semibold text-gray-900">{restaurant.priceRange}</span>
          <span className="text-[15px] text-gray-600">· {restaurant.rating_count} reviews</span>
        </div>
      </div>
    </div>
  );
}
