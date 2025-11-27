import { Star, Clock, Users, Moon } from 'lucide-react';
import { PlaceDetail } from '../../types';

interface OverviewSectionProps {
  place: PlaceDetail;
}

export function OverviewSection({ place }: OverviewSectionProps) {
  const getBestTimeIcon = () => {
    switch (place.bestTime) {
      case 'morning':
        return '🌅';
      case 'afternoon':
        return '☀️';
      case 'evening':
        return '🌆';
      case 'night':
        return '🌙';
      default:
        return '';
    }
  };

  return (
    <section id="overview" className="px-6 py-6 space-y-6">
      <div className="animate-slide-up-fade" style={{ animationDelay: '100ms' }}>
        <p className="text-gray-700 leading-relaxed">{place.description}</p>
      </div>

      <div
        className="flex flex-wrap gap-2 animate-slide-up-fade"
        style={{ animationDelay: '150ms' }}
      >
        {place.vibes.map((vibe) => (
          <span
            key={vibe}
            className="inline-block px-3 py-1.5 rounded-full bg-gray-100
                     text-sm font-medium text-gray-700"
          >
            {vibe}
          </span>
        ))}
        {place.tags.map((tag) => (
          <span
            key={tag}
            className="inline-block px-3 py-1.5 rounded-full bg-coral-50
                     text-sm font-medium text-coral-700 border border-coral-200"
          >
            {tag}
          </span>
        ))}
      </div>

      <div
        className="grid grid-cols-2 gap-4 animate-slide-up-fade"
        style={{ animationDelay: '200ms' }}
      >
        <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
          <div className="p-2 rounded-lg bg-white">
            <Star className="w-5 h-5 text-yellow-500" />
          </div>
          <div>
            <div className="text-sm text-gray-600">Rating</div>
            <div className="font-semibold text-gray-900">
              {place.rating} ({place.reviewCount.toLocaleString()})
            </div>
          </div>
        </div>

        {place.suggestedDuration && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
            <div className="p-2 rounded-lg bg-white">
              <Clock className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Time needed</div>
              <div className="font-semibold text-gray-900">
                {place.suggestedDuration}
              </div>
            </div>
          </div>
        )}

        {place.bestFor && place.bestFor.length > 0 && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
            <div className="p-2 rounded-lg bg-white">
              <Users className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Best for</div>
              <div className="font-semibold text-gray-900">
                {place.bestFor.slice(0, 2).join(', ')}
              </div>
            </div>
          </div>
        )}

        {place.bestTime && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
            <div className="p-2 rounded-lg bg-white text-xl">
              {getBestTimeIcon()}
            </div>
            <div>
              <div className="text-sm text-gray-600">Best time</div>
              <div className="font-semibold text-gray-900 capitalize">
                {place.bestTime}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
