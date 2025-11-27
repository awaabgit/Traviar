import { Heart, Share2, ExternalLink, Star, MapPin } from 'lucide-react';
import { PlaceDetail } from '../../types';

interface HeroSectionProps {
  place: PlaceDetail;
  isSaved: boolean;
  onSave: () => void;
  onShare: () => void;
}

export function HeroSection({ place, isSaved, onSave, onShare }: HeroSectionProps) {
  const mainImage = place.images[0];
  const hasMultipleImages = place.images.length > 1;

  const handleOpenInMaps = () => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${place.latitude},${place.longitude}`,
      '_blank'
    );
  };

  return (
    <div className="relative h-80 flex-shrink-0">
      {hasMultipleImages ? (
        <div className="grid grid-cols-2 h-full gap-1">
          <div className="col-span-2 h-2/3">
            <img
              src={mainImage}
              alt={place.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="h-1/3">
            <img
              src={place.images[1]}
              alt={`${place.name} 2`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="h-1/3">
            <img
              src={place.images[2] || place.images[1]}
              alt={`${place.name} 3`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      ) : (
        <img
          src={mainImage}
          alt={place.name}
          className="w-full h-full object-cover"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      <div className="absolute top-4 right-4 flex gap-2 animate-fade-in" style={{ animationDelay: '200ms' }}>
        <button
          onClick={onSave}
          className="p-2.5 rounded-full bg-white/95 backdrop-blur-sm shadow-lg
                   hover:bg-white transition-all duration-200
                   transform hover:scale-110 active:scale-95 group"
          aria-label={isSaved ? 'Unsave place' : 'Save place'}
        >
          <Heart
            className={`w-5 h-5 transition-colors duration-200 ${
              isSaved
                ? 'fill-red-500 text-red-500'
                : 'text-gray-700 group-hover:text-red-500'
            }`}
          />
        </button>

        <button
          onClick={onShare}
          className="p-2.5 rounded-full bg-white/95 backdrop-blur-sm shadow-lg
                   hover:bg-white transition-all duration-200
                   transform hover:scale-110 active:scale-95"
          aria-label="Share place"
        >
          <Share2 className="w-5 h-5 text-gray-700" />
        </button>

        <button
          onClick={handleOpenInMaps}
          className="p-2.5 rounded-full bg-white/95 backdrop-blur-sm shadow-lg
                   hover:bg-white transition-all duration-200
                   transform hover:scale-110 active:scale-95"
          aria-label="Open in Maps"
        >
          <ExternalLink className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 animate-slide-up-fade">
        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
          {place.name}
        </h1>

        <div className="flex items-center gap-2 text-white/90 text-sm mb-4">
          <span className="font-medium">{place.category}</span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{place.city}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
                       bg-white/95 backdrop-blur-sm text-sm font-medium">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-gray-900">{place.rating}</span>
            <span className="text-gray-600">•</span>
            <span className="text-gray-600">
              {place.reviewCount.toLocaleString()} reviews
            </span>
          </div>

          <span className="inline-block px-3 py-1.5 rounded-full
                       bg-white/95 backdrop-blur-sm text-sm font-medium text-gray-900">
            {place.priceLevel}
          </span>

          {place.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="inline-block px-3 py-1.5 rounded-full
                       bg-coral-500/90 backdrop-blur-sm text-sm font-medium text-white"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
