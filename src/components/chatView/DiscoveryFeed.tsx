import { TrendingNearYou } from './discovery/TrendingNearYou';
import { WatchAndPlan } from './discovery/WatchAndPlan';
import { RecommendedItineraries } from './discovery/RecommendedItineraries';
import { JumpBackIn } from './discovery/JumpBackIn';
import { BasedOnSearches } from './discovery/BasedOnSearches';

export function DiscoveryFeed() {
  return (
    <div className="w-[420px] border-l border-gray-200 bg-gray-50 overflow-y-auto flex-shrink-0">
      <div className="sticky top-0 bg-gray-50 z-10 px-6 py-5 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">For You</h2>
        <p className="text-sm text-gray-600 mt-0.5">Personalized travel inspiration</p>
      </div>

      <div className="p-6 space-y-8">
        <TrendingNearYou />
        <WatchAndPlan />
        <RecommendedItineraries />
        <JumpBackIn />
        <BasedOnSearches />
      </div>
    </div>
  );
}
