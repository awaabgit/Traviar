import { Calendar, MapPin, Users, DollarSign, Edit2 } from 'lucide-react';
import { UserTrip } from '../../../hooks/useTripData';
import { getHeroImageForDestination } from '../../../utils/heroImages';

interface HeroSummaryCardProps {
  trip: UserTrip;
  onEditTrip: () => void;
}

export function HeroSummaryCard({ trip, onEditTrip }: HeroSummaryCardProps) {
  const formatDateRange = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const startMonth = startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const endMonth = endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    return `${startMonth} - ${endMonth}`;
  };

  const heroImage = trip.hero_image_url || getHeroImageForDestination(trip.destination, trip.locations);
  const locations = trip.locations && trip.locations.length > 0 ? trip.locations : [trip.destination];

  return (
    <div className="bg-white rounded-[18px] shadow-soft-lg overflow-hidden border border-gray-100
                    transform hover:shadow-soft-xl transition-all duration-300">
      <div className="relative h-[400px] overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
        <img
          src={heroImage}
          alt={trip.trip_name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          style={{ transformOrigin: 'center center' }}
        />

        <div className="absolute top-6 left-6 right-6">
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md
                          shadow-lg border border-white/20 animate-slide-in-down">
              <Calendar className="w-4 h-4 text-gray-700" />
              <span className="text-sm font-medium text-gray-900">
                {formatDateRange(trip.start_date, trip.end_date)}
              </span>
            </div>
            {trip.travelers_count && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md
                            shadow-lg border border-white/20 animate-slide-in-down"
                   style={{ animationDelay: '50ms' }}>
                <Users className="w-4 h-4 text-gray-700" />
                <span className="text-sm font-medium text-gray-900">
                  {trip.travelers_count} {trip.travelers_count === 1 ? 'traveler' : 'travelers'}
                </span>
              </div>
            )}
            {trip.budget_tier && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md
                            shadow-lg border border-white/20 animate-slide-in-down"
                   style={{ animationDelay: '100ms' }}>
                <DollarSign className="w-4 h-4 text-gray-700" />
                <span className="text-sm font-medium text-gray-900 capitalize">
                  {trip.budget_tier}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg animate-slide-up-fade">
            {trip.trip_name}
          </h1>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md
                          border border-white/20 animate-slide-up-fade" style={{ animationDelay: '100ms' }}>
              <MapPin className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">
                {locations.slice(0, 3).join(' · ')}
                {locations.length > 3 && ` +${locations.length - 3}`}
              </span>
            </div>
          </div>

          <button
            onClick={onEditTrip}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-gray-50
                     text-gray-900 font-semibold shadow-lg hover:shadow-xl
                     transition-all duration-200 transform hover:scale-105 active:scale-95
                     animate-slide-up-fade"
            style={{ animationDelay: '200ms' }}
          >
            <Edit2 className="w-4 h-4" />
            Edit Trip
          </button>
        </div>
      </div>
    </div>
  );
}
