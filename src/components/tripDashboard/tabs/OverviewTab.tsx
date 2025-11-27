import { UserTrip } from '../../../hooks/useTripData';
import { HeroSummaryCard } from '../overview/HeroSummaryCard';
import { WeatherPreview } from '../overview/WeatherPreview';
import { TravelAlertsCard } from '../overview/TravelAlertsCard';
import { QuickActionsRow } from '../overview/QuickActionsRow';
import { DailyHighlightsGrid } from '../overview/DailyHighlightsGrid';
import { BookingSummaryRow } from '../overview/BookingSummaryRow';
import { BudgetSummaryCard } from '../overview/BudgetSummaryCard';
import { AIReminderSuggestions } from '../overview/AIReminderSuggestions';

interface OverviewTabProps {
  trip: UserTrip;
  onEditTrip: () => void;
}

export function OverviewTab({ trip, onEditTrip }: OverviewTabProps) {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="animate-slide-up-fade" style={{ animationDelay: '0ms' }}>
        <HeroSummaryCard trip={trip} onEditTrip={onEditTrip} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="animate-slide-up-fade" style={{ animationDelay: '150ms' }}>
          <WeatherPreview destination={trip.destination} />
        </div>
        <div className="animate-slide-up-fade" style={{ animationDelay: '200ms' }}>
          <TravelAlertsCard destination={trip.destination} />
        </div>
      </div>

      <div className="animate-slide-up-fade" style={{ animationDelay: '250ms' }}>
        <QuickActionsRow tripId={trip.id} />
      </div>

      <div className="animate-slide-up-fade" style={{ animationDelay: '300ms' }}>
        <DailyHighlightsGrid tripId={trip.id} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 animate-slide-up-fade" style={{ animationDelay: '350ms' }}>
          <BookingSummaryRow tripId={trip.id} />
        </div>
        <div className="animate-slide-up-fade" style={{ animationDelay: '400ms' }}>
          <BudgetSummaryCard tripId={trip.id} />
        </div>
      </div>

      <div className="animate-slide-up-fade" style={{ animationDelay: '450ms' }}>
        <AIReminderSuggestions />
      </div>
    </div>
  );
}
