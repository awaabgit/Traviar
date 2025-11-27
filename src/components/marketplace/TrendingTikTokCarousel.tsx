import { useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Video, TrendingUp } from 'lucide-react';
import { MarketplaceItinerary } from '../../types';

interface TrendingTikTokCarouselProps {
  itineraries: MarketplaceItinerary[];
  onItineraryClick: (itinerary: MarketplaceItinerary) => void;
}

export function TrendingTikTokCarousel({ itineraries, onItineraryClick }: TrendingTikTokCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (itineraries.length === 0) return null;

  return (
    <section className="relative">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-8 h-8 text-coral-500" />
            <h2 className="text-3xl font-bold text-gray-900">Trending on TikTok</h2>
          </div>
          <p className="text-gray-600 text-lg">Itineraries going viral right now</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="w-10 h-10 rounded-full bg-white border border-gray-300 hover:border-gray-400
                     flex items-center justify-center transition-all duration-200 hover:shadow-md"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-10 h-10 rounded-full bg-white border border-gray-300 hover:border-gray-400
                     flex items-center justify-center transition-all duration-200 hover:shadow-md"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {itineraries.map((itinerary) => (
          <div
            key={itinerary.id}
            onClick={() => onItineraryClick(itinerary)}
            className="flex-none w-[350px] bg-white rounded-2xl shadow-lg overflow-hidden
                     hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300
                     cursor-pointer group"
          >
            <div className="relative h-[200px] overflow-hidden">
              <img
                src={itinerary.cover_image_url}
                alt={itinerary.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1.5
                            bg-black/60 backdrop-blur-sm rounded-full">
                <Video className="w-4 h-4 text-white" />
                <span className="text-white text-xs font-bold">TikTok</span>
              </div>

              {itinerary.tiktok_views > 0 && (
                <div className="absolute top-3 right-3 px-2.5 py-1.5 bg-white/90 backdrop-blur-sm rounded-full">
                  <span className="text-xs font-bold text-gray-900">
                    {itinerary.tiktok_views > 1000000
                      ? `${(itinerary.tiktok_views / 1000000).toFixed(1)}M`
                      : `${(itinerary.tiktok_views / 1000).toFixed(0)}K`} views
                  </span>
                </div>
              )}

              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                <img
                  src={itinerary.creator?.avatar_url || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100'}
                  alt={itinerary.creator?.username}
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
                <span className="text-white text-sm font-medium">
                  @{itinerary.creator?.username || 'creator'}
                </span>
              </div>
            </div>

            <div className="p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">
                {itinerary.title}
              </h3>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {itinerary.destination}
              </p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-sm">{itinerary.rating_avg.toFixed(1)}</span>
                  <span className="text-gray-500 text-xs">({itinerary.rating_count})</span>
                </div>

                <span className="text-sm text-gray-600 font-medium">
                  {itinerary.duration_days} days
                </span>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-baseline gap-2">
                  {itinerary.discount_price ? (
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

                <button className="px-4 py-2 bg-coral-500 hover:bg-coral-600 text-white
                                 rounded-lg font-medium text-sm transition-colors duration-200">
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
