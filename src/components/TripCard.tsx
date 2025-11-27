import { Star, Heart } from 'lucide-react';
import { useState } from 'react';

interface TripCardProps {
  trip: {
    id: string;
    title: string;
    description: string;
    destination: string;
    duration_days: number;
    price: number;
    cover_image_url: string;
    creator_name: string;
    creator_avatar: string;
    rating_avg: number;
    rating_count: number;
    vibe_tags: string[];
  };
  size?: 'small' | 'large';
}

export function TripCard({ trip, size = 'large' }: TripCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="group cursor-pointer transform hover:-translate-y-1 transition-all duration-300">
      <div className="relative overflow-hidden rounded-xl mb-3 shadow-card group-hover:shadow-card-hover transition-shadow duration-300">
        <div className={`relative ${size === 'large' ? 'aspect-[4/3]' : 'aspect-[3/4]'}`}>
          <img
            src={trip.cover_image_url}
            alt={trip.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsSaved(!isSaved);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/95 backdrop-blur-sm
                     hover:scale-110 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg
                     opacity-0 group-hover:opacity-100"
        >
          <Heart
            className={`w-4 h-4 transition-all duration-300 ${
              isSaved ? 'fill-coral-500 text-coral-500 animate-scale-in-bounce' : 'text-gray-800 hover:text-coral-500'
            }`}
          />
        </button>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[15px] font-semibold text-gray-900 leading-tight line-clamp-1">
            {trip.destination}
          </h3>
          {trip.rating_avg && (
            <div className="flex items-center gap-1 flex-shrink-0">
              <Star className="w-3 h-3 fill-gray-900 text-gray-900" />
              <span className="text-[15px] font-normal text-gray-900">{trip.rating_avg}</span>
            </div>
          )}
        </div>

        <p className="text-[15px] text-gray-600 line-clamp-1 leading-tight">
          {trip.title}
        </p>

        <div className="flex items-center gap-1.5 mt-0.5">
          <img
            src={trip.creator_avatar}
            alt={trip.creator_name}
            className="w-5 h-5 rounded-full object-cover"
          />
          <span className="text-sm text-gray-600">{trip.creator_name}</span>
        </div>

        <div className="flex items-baseline gap-1 mt-1">
          <span className="text-[15px] font-semibold text-gray-900">${trip.price}</span>
          <span className="text-[15px] text-gray-600">· {trip.duration_days} days</span>
        </div>
      </div>
    </div>
  );
}
