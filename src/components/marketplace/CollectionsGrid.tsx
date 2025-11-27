import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { MarketplaceCollection, MarketplaceItinerary } from '../../types';
import { ItineraryProductCard } from './ItineraryProductCard';

interface CollectionsGridProps {
  collections: MarketplaceCollection[];
  onItineraryClick: (itinerary: MarketplaceItinerary) => void;
}

export function CollectionsGrid({ collections, onItineraryClick }: CollectionsGridProps) {
  const [expandedCollection, setExpandedCollection] = useState<string | null>(null);

  if (collections.length === 0) return null;

  return (
    <section>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Curated Collections</h2>
        <p className="text-gray-600 text-lg">Handpicked itineraries for every travel style</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {collections.map((collection) => {
          const isExpanded = expandedCollection === collection.id;

          return (
            <div key={collection.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div
                className="relative h-64 overflow-hidden cursor-pointer group"
                onClick={() => setExpandedCollection(isExpanded ? null : collection.id)}
              >
                <img
                  src={collection.cover_image_url}
                  alt={collection.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{collection.title}</h3>
                  <p className="text-white/90 text-sm mb-3">{collection.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-sm">
                      {collection.itineraries?.length || 0} itineraries
                    </span>
                    <button className="flex items-center gap-1 text-white font-medium text-sm
                                     px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg
                                     hover:bg-white/30 transition-colors duration-200">
                      {isExpanded ? 'Hide' : 'Explore'}
                      <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>

              {isExpanded && collection.itineraries && (
                <div className="p-6 bg-gray-50 border-t border-gray-200 animate-slide-in-down">
                  <div className="grid grid-cols-1 gap-4">
                    {collection.itineraries.slice(0, 4).map((itinerary) => (
                      <div key={itinerary.id} onClick={() => onItineraryClick(itinerary)}>
                        <ItineraryProductCard itinerary={itinerary} compact />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
