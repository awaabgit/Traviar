import { Sparkles } from 'lucide-react';
import { MarketplaceItinerary } from '../../types';
import { ItineraryProductCard } from './ItineraryProductCard';

interface RecommendationsSectionProps {
  itineraries: MarketplaceItinerary[];
  onItineraryClick: (itinerary: MarketplaceItinerary) => void;
}

export function RecommendationsSection({ itineraries, onItineraryClick }: RecommendationsSectionProps) {
  if (itineraries.length === 0) return null;

  return (
    <section>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-8 h-8 text-coral-500" />
          <h2 className="text-3xl font-bold text-gray-900">Recommended For You</h2>
        </div>
        <p className="text-gray-600 text-lg">Based on your interests and browsing history</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {itineraries.map((itinerary) => (
          <div key={itinerary.id} onClick={() => onItineraryClick(itinerary)}>
            <ItineraryProductCard itinerary={itinerary} />
          </div>
        ))}
      </div>
    </section>
  );
}
