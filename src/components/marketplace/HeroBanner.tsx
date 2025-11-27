import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Video } from 'lucide-react';
import { MarketplaceItinerary } from '../../types';

interface HeroBannerProps {
  featuredItineraries: MarketplaceItinerary[];
  onItineraryClick: (itinerary: MarketplaceItinerary) => void;
}

export function HeroBanner({ featuredItineraries, onItineraryClick }: HeroBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (featuredItineraries.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredItineraries.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [featuredItineraries.length]);

  if (featuredItineraries.length === 0) {
    return null;
  }

  const current = featuredItineraries[currentIndex];
  const hasDiscount = current.discount_price && current.discount_price < current.price;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredItineraries.length) % featuredItineraries.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredItineraries.length);
  };

  return (
    <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl group">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{ backgroundImage: `url(${current.cover_image_url})` }}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

      <div className="absolute inset-0 flex flex-col justify-end p-12">
        <div className="max-w-2xl">
          {current.tiktok_video_id && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full
                          bg-black/40 backdrop-blur-sm border border-white/20 mb-4">
              <Video className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-medium">Trending on TikTok</span>
            </div>
          )}

          <h2 className="text-5xl font-bold text-white mb-4 leading-tight">
            {current.title}
          </h2>

          <p className="text-xl text-white/90 mb-6 line-clamp-2">
            {current.description}
          </p>

          <div className="flex items-center gap-6 mb-6 text-white">
            <div className="flex items-center gap-2">
              <img
                src={current.creator?.avatar_url || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100'}
                alt={current.creator?.display_name}
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <span className="font-medium">{current.creator?.display_name || 'Featured Creator'}</span>
            </div>

            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{current.rating_avg.toFixed(1)}</span>
              <span className="text-white/70">({current.rating_count})</span>
            </div>

            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
              {current.duration_days} days
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-baseline gap-2">
              {hasDiscount ? (
                <>
                  <span className="text-4xl font-bold text-white">
                    ${current.discount_price}
                  </span>
                  <span className="text-2xl text-white/60 line-through">
                    ${current.price}
                  </span>
                  <span className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full">
                    SAVE ${(current.price - current.discount_price).toFixed(0)}
                  </span>
                </>
              ) : (
                <span className="text-4xl font-bold text-white">
                  ${current.price}
                </span>
              )}
            </div>

            <button
              onClick={() => onItineraryClick(current)}
              className="px-8 py-4 bg-gradient-sunset text-white rounded-full font-bold
                       hover:shadow-2xl transform hover:scale-105 transition-all duration-300
                       shadow-xl"
            >
              View Itinerary
            </button>
          </div>
        </div>
      </div>

      {featuredItineraries.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm
                     hover:bg-white/30 rounded-full flex items-center justify-center
                     transition-all duration-200 opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm
                     hover:bg-white/30 rounded-full flex items-center justify-center
                     transition-all duration-200 opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {featuredItineraries.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'w-8 bg-white' : 'w-1.5 bg-white/50'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
