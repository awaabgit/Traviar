import { TrendingNearYou } from './discovery/TrendingNearYou';
import { WatchAndPlan } from './discovery/WatchAndPlan';
import { RecommendedItineraries } from './discovery/RecommendedItineraries';
import { JumpBackIn } from './discovery/JumpBackIn';
import { BasedOnSearches } from './discovery/BasedOnSearches';

export function DiscoverPanel() {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-8">
      <TrendingNearYou />
      <WatchAndPlan />
      <RecommendedItineraries />
      <JumpBackIn />
      <BasedOnSearches />
    </div>
  );
}
