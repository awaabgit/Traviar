import { MarketplaceItinerary } from '../../types';
import { ItineraryProductCard } from './ItineraryProductCard';
import { Skeleton } from '../Skeleton';

interface MarketplaceGridProps {
  itineraries: MarketplaceItinerary[];
  loading: boolean;
  onItineraryClick: (itinerary: MarketplaceItinerary) => void;
}

export function MarketplaceGrid({ itineraries, loading, onItineraryClick }: MarketplaceGridProps) {
  return (
    <section>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">All Itineraries</h2>
        <p className="text-gray-600 text-lg">
          {itineraries.length} {itineraries.length === 1 ? 'itinerary' : 'itineraries'} available
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <Skeleton className="h-56 w-full" />
              <div className="p-5 space-y-3">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
                <div className="flex justify-between pt-4">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-10 w-24" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : itineraries.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">🗺️</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No itineraries found</h3>
          <p className="text-gray-600">Try adjusting your filters or search query</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {itineraries.map((itinerary) => (
            <div key={itinerary.id} onClick={() => onItineraryClick(itinerary)}>
              <ItineraryProductCard itinerary={itinerary} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
