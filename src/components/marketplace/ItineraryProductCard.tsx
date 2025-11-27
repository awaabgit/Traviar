import { Heart, Star, Video, TrendingUp } from 'lucide-react';
import { MarketplaceItinerary } from '../../types';
import { useState } from 'react';

interface ItineraryProductCardProps {
  itinerary: MarketplaceItinerary;
  compact?: boolean;
}

export function ItineraryProductCard({ itinerary, compact = false }: ItineraryProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const hasDiscount = itinerary.discount_price && itinerary.discount_price < itinerary.price;

  if (compact) {
    return (
      <div className="flex gap-4 bg-white p-4 rounded-2xl hover:shadow-lg transition-all duration-300 cursor-pointer group border border-gray-100">
        <div className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden">
          <img
            src={itinerary.cover_image_url}
            alt={itinerary.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {itinerary.tiktok_video_id && (
            <div className="absolute top-2 left-2 p-1.5 bg-black/60 backdrop-blur-sm rounded-full">
              <Video className="w-3 h-3 text-white" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-gray-900 mb-1 truncate">{itinerary.title}</h4>
          <p className="text-sm text-gray-600 mb-2 truncate">{itinerary.destination}</p>

          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold">{itinerary.rating_avg.toFixed(1)}</span>
            </div>
            <span className="text-sm text-gray-500">{itinerary.duration_days}d</span>
          </div>

          <div className="flex items-baseline gap-2">
            {hasDiscount ? (
              <>
                <span className="font-bold text-lg text-gray-900">${itinerary.discount_price}</span>
                <span className="text-sm text-gray-500 line-through">${itinerary.price}</span>
              </>
            ) : (
              <span className="font-bold text-lg text-gray-900">${itinerary.price}</span>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden hover:shadow-card-hover
                  transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
      <div className="relative h-56 overflow-hidden">
        <img
          src={itinerary.cover_image_url}
          alt={itinerary.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0
                      group-hover:opacity-100 transition-opacity duration-300" />

        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-3 right-3 w-9 h-9 bg-white/95 backdrop-blur-sm rounded-full
                   flex items-center justify-center hover:bg-white transition-all duration-200
                   transform hover:scale-110 shadow-md"
        >
          <Heart
            className={`w-5 h-5 transition-colors duration-200 ${
              isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-700'
            }`}
          />
        </button>

        {itinerary.tiktok_video_id && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1.5
                        bg-black/60 backdrop-blur-sm rounded-full">
            <Video className="w-3.5 h-3.5 text-white" />
            <span className="text-white text-xs font-bold">TikTok</span>
          </div>
        )}

        {hasDiscount && (
          <div className="absolute bottom-3 left-3 px-3 py-1 bg-red-500 text-white
                        text-xs font-bold rounded-full">
            {Math.round(((itinerary.price - itinerary.discount_price!) / itinerary.price) * 100)}% OFF
          </div>
        )}

        {itinerary.is_trending && (
          <div className="absolute bottom-3 right-3 px-3 py-1 bg-gradient-sunset text-white
                        text-xs font-bold rounded-full flex items-center gap-1 shadow-md">
            <TrendingUp className="w-3 h-3" />
            Trending
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <img
            src={itinerary.creator?.avatar_url || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100'}
            alt={itinerary.creator?.username}
            className="w-7 h-7 rounded-full"
          />
          <span className="text-sm text-gray-600 font-medium truncate">
            {itinerary.creator?.display_name || 'Creator'}
          </span>
        </div>

        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 leading-snug">
          {itinerary.title}
        </h3>

        <p className="text-gray-600 text-sm mb-3 line-clamp-1">
          {itinerary.destination}
        </p>

        <div className="flex items-center gap-3 mb-4 text-sm">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{itinerary.rating_avg.toFixed(1)}</span>
            <span className="text-gray-500">({itinerary.rating_count})</span>
          </div>

          <span className="text-gray-400">•</span>

          <span className="text-gray-600">{itinerary.duration_days} days</span>
        </div>

        {itinerary.style_tags && itinerary.style_tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {itinerary.style_tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 bg-gradient-sunset-soft text-gray-700 text-xs font-semibold rounded-full border border-orange-100"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-baseline gap-2">
            {hasDiscount ? (
              <>
                <span className="text-2xl font-bold text-gray-900">
                  ${itinerary.discount_price}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ${itinerary.price}
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold text-gray-900">
                ${itinerary.price}
              </span>
            )}
          </div>

          <button className="px-5 py-2.5 bg-gradient-sunset text-white
                           rounded-full font-bold text-sm transition-all duration-300
                           transform hover:scale-105 shadow-md hover:shadow-lg">
            View
          </button>
        </div>
      </div>
    </div>
  );
}
