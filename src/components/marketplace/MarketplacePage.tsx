import { useState, useEffect } from 'react';
import { MarketplaceHeader } from './MarketplaceHeader';
import { HeroBanner } from './HeroBanner';
import { TrendingTikTokCarousel } from './TrendingTikTokCarousel';
import { CollectionsGrid } from './CollectionsGrid';
import { SocialDiscoveryGrid } from './SocialDiscoveryGrid';
import { FeaturedCreators } from './FeaturedCreators';
import { MarketplaceGrid } from './MarketplaceGrid';
import { RecommendationsSection } from './RecommendationsSection';
import { MarketplaceItineraryDrawer } from './MarketplaceItineraryDrawer';
import { MarketplaceFilters, MarketplaceItinerary } from '../../types';
import { useMarketplaceData } from '../../hooks/useMarketplaceData';

export function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<MarketplaceFilters>({
    sortBy: 'popular',
  });
  const [selectedItinerary, setSelectedItinerary] = useState<MarketplaceItinerary | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const {
    itineraries,
    featuredItineraries,
    trendingItineraries,
    collections,
    creators,
    loading,
  } = useMarketplaceData(filters, searchQuery);

  const handleItineraryClick = (itinerary: MarketplaceItinerary) => {
    setSelectedItinerary(itinerary);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedItinerary(null), 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <MarketplaceHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filters={filters}
        onFiltersChange={setFilters}
      />

      <div className="max-w-[1600px] mx-auto px-6 lg:px-8 space-y-16 pb-16">
        <HeroBanner
          featuredItineraries={featuredItineraries}
          onItineraryClick={handleItineraryClick}
        />

        <TrendingTikTokCarousel
          itineraries={trendingItineraries}
          onItineraryClick={handleItineraryClick}
        />

        <CollectionsGrid
          collections={collections}
          onItineraryClick={handleItineraryClick}
        />

        <SocialDiscoveryGrid
          itineraries={itineraries.slice(0, 12)}
          onItineraryClick={handleItineraryClick}
        />

        <FeaturedCreators creators={creators} />

        <MarketplaceGrid
          itineraries={itineraries}
          loading={loading}
          onItineraryClick={handleItineraryClick}
        />

        <RecommendationsSection
          itineraries={itineraries.slice(0, 6)}
          onItineraryClick={handleItineraryClick}
        />
      </div>

      <footer className="border-t border-gray-200 mt-24 py-12 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Creators</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900 transition-colors">Creator Program</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Sell Itineraries</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Resources</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Trust & Safety</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
            © 2025 Traviar. All rights reserved.
          </div>
        </div>
      </footer>

      <MarketplaceItineraryDrawer
        itinerary={selectedItinerary}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
      />
    </div>
  );
}
