import { Calendar, MapPin, Users, Share2, Edit, DollarSign } from 'lucide-react';
import { UserTrip } from '../../hooks/useUserTrips';
import { getHeroImageForDestination } from '../../utils/heroImages';

interface ActiveTripHeroProps {
  trip: UserTrip;
  onViewItinerary: () => void;
  onEditTrip: () => void;
}

export function ActiveTripHero({ trip, onViewItinerary, onEditTrip }: ActiveTripHeroProps) {
  const formatDateRange = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const startMonth = startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const endMonth = endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return `${startMonth} - ${endMonth}`;
  };

  const calculateProgress = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const start = new Date(trip.start_date);
    const end = new Date(trip.end_date);

    const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    const daysElapsed = Math.ceil((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    if (trip.trip_status === 'in_progress') {
      return {
        current: Math.max(1, Math.min(daysElapsed, totalDays)),
        total: totalDays,
        percentage: Math.min((daysElapsed / totalDays) * 100, 100)
      };
    }

    return { current: 0, total: totalDays, percentage: 0 };
  };

  const progress = calculateProgress();
  const heroImage = trip.hero_image_url || getHeroImageForDestination(trip.destination, trip.locations);
  const destinationText = trip.locations && trip.locations.length > 0
    ? trip.locations.slice(0, 2).join(' · ')
    : trip.destination;

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
      <div className="relative h-80 lg:h-96">
        <img
          src={heroImage}
          alt={trip.trip_name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="absolute top-6 left-6 right-6">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black/60 backdrop-blur-md border border-white/20">
              <MapPin className="w-4 h-4 text-white" />
              <span className="text-white font-medium text-sm">{destinationText}</span>
            </div>
            {trip.travelers_count > 0 && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black/60 backdrop-blur-md border border-white/20">
                <Users className="w-4 h-4 text-white" />
                <span className="text-white font-medium text-sm">{trip.travelers_count} {trip.travelers_count === 1 ? 'traveler' : 'travelers'}</span>
              </div>
            )}
            {trip.budget_level && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black/60 backdrop-blur-md border border-white/20">
                <DollarSign className="w-4 h-4 text-white" />
                <span className="text-white font-medium text-sm capitalize">{trip.budget_level}</span>
              </div>
            )}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl">
            <h2 className="text-4xl font-bold text-white mb-3 drop-shadow-lg">
              {trip.trip_name}
            </h2>

            <div className="flex items-center gap-3 text-white/90 mb-6">
              <Calendar className="w-5 h-5" />
              <span className="font-medium">{formatDateRange(trip.start_date, trip.end_date)}</span>
            </div>

            {trip.trip_status === 'in_progress' && (
              <div className="mb-6">
                <div className="flex items-center justify-between text-white text-sm mb-2">
                  <span className="font-medium">Trip Progress</span>
                  <span>Day {progress.current} of {progress.total}</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                  <div
                    className="h-full bg-white rounded-full transition-all duration-500"
                    style={{ width: `${progress.percentage}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <button
                onClick={onViewItinerary}
                className="px-6 py-3 bg-white hover:bg-white/95 text-gray-900 font-semibold
                         rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                View Itinerary
              </button>
              <button
                onClick={onEditTrip}
                className="px-6 py-3 bg-black/60 hover:bg-black/70 text-white font-semibold
                         rounded-xl transition-all duration-200 backdrop-blur-md
                         border border-white/20 hover:border-white/30 flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit Trip
              </button>
              <button
                className="px-6 py-3 bg-black/60 hover:bg-black/70 text-white font-semibold
                         rounded-xl transition-all duration-200 backdrop-blur-md
                         border border-white/20 hover:border-white/30 flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
