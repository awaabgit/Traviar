import { useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, CheckCircle, Package } from 'lucide-react';
import { MarketplaceCreator } from '../../types';

interface FeaturedCreatorsProps {
  creators: MarketplaceCreator[];
}

export function FeaturedCreators({ creators }: FeaturedCreatorsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 350;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (creators.length === 0) return null;

  return (
    <section className="relative">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Top Creators You'll Love</h2>
          <p className="text-gray-600 text-lg">Discover expert travel planners and their unique itineraries</p>
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
        {creators.map((creator) => (
          <div
            key={creator.id}
            className="flex-none w-[320px] bg-white rounded-2xl shadow-lg p-6
                     hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300
                     cursor-pointer group"
          >
            <div className="flex items-start gap-4 mb-5">
              <div className="relative">
                <img
                  src={creator.avatar_url || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200'}
                  alt={creator.display_name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-gray-100"
                />
                {creator.is_verified && (
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-blue-500 rounded-full
                                flex items-center justify-center border-3 border-white">
                    <CheckCircle className="w-4 h-4 text-white fill-current" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-lg text-gray-900 truncate">
                  {creator.display_name}
                </h3>
                <p className="text-gray-600 text-sm mb-1">@{creator.username}</p>
                <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-coral-50 text-coral-700
                              rounded-full text-xs font-medium">
                  {creator.specialty}
                </div>
              </div>
            </div>

            {creator.bio && (
              <p className="text-gray-600 text-sm mb-5 line-clamp-2 leading-relaxed">
                {creator.bio}
              </p>
            )}

            <div className="grid grid-cols-3 gap-4 mb-5 py-4 border-y border-gray-100">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-lg text-gray-900">
                    {creator.rating_avg.toFixed(1)}
                  </span>
                </div>
                <p className="text-xs text-gray-500">Rating</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Package className="w-4 h-4 text-coral-500" />
                  <span className="font-bold text-lg text-gray-900">
                    {creator.itinerary_count}
                  </span>
                </div>
                <p className="text-xs text-gray-500">Trips</p>
              </div>

              <div className="text-center">
                <div className="font-bold text-lg text-gray-900 mb-1">
                  {creator.total_sales > 1000 ? `${(creator.total_sales / 1000).toFixed(1)}K` : creator.total_sales}
                </div>
                <p className="text-xs text-gray-500">Sales</p>
              </div>
            </div>

            <button className="w-full py-3 bg-gray-900 hover:bg-gray-800 text-white
                             rounded-xl font-semibold transition-all duration-200
                             transform group-hover:scale-105">
              View Storefront
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
