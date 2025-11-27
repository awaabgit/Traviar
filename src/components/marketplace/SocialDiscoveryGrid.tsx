import { Video, Image as ImageIcon, Play } from 'lucide-react';
import { MarketplaceItinerary } from '../../types';

interface SocialDiscoveryGridProps {
  itineraries: MarketplaceItinerary[];
  onItineraryClick: (itinerary: MarketplaceItinerary) => void;
}

export function SocialDiscoveryGrid({ itineraries, onItineraryClick }: SocialDiscoveryGridProps) {
  if (itineraries.length === 0) return null;

  return (
    <section>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Travel Inspiration From Creators</h2>
        <p className="text-gray-600 text-lg">See real trips from real travelers — buy the exact itineraries they used</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {itineraries.map((itinerary, index) => {
          const isVideo = itinerary.tiktok_video_id && index % 3 === 0;
          const isTall = index % 7 === 0;

          return (
            <div
              key={itinerary.id}
              onClick={() => onItineraryClick(itinerary)}
              className={`relative overflow-hidden rounded-2xl cursor-pointer group
                        ${isTall ? 'row-span-2' : ''}`}
              style={{ minHeight: isTall ? '400px' : '200px' }}
            >
              <img
                src={itinerary.cover_image_url}
                alt={itinerary.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {isVideo && (
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1.5
                              bg-black/60 backdrop-blur-sm rounded-full">
                  <Video className="w-3.5 h-3.5 text-white" />
                  <span className="text-white text-xs font-bold">TikTok</span>
                </div>
              )}

              {!isVideo && (
                <div className="absolute top-3 left-3 p-2 bg-white/20 backdrop-blur-sm rounded-full">
                  <ImageIcon className="w-4 h-4 text-white" />
                </div>
              )}

              {isVideo && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0
                              group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full
                                flex items-center justify-center transform group-hover:scale-110
                                transition-transform duration-300">
                    <Play className="w-7 h-7 text-gray-900 ml-1" />
                  </div>
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2
                            opacity-0 group-hover:translate-y-0 group-hover:opacity-100
                            transition-all duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src={itinerary.creator?.avatar_url || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100'}
                    alt={itinerary.creator?.username}
                    className="w-6 h-6 rounded-full border-2 border-white"
                  />
                  <span className="text-white text-sm font-medium">
                    @{itinerary.creator?.username || 'creator'}
                  </span>
                </div>

                <h3 className="text-white font-bold text-sm line-clamp-2 mb-1">
                  {itinerary.title}
                </h3>

                <p className="text-white/80 text-xs">
                  {itinerary.destination}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
