import { Calendar, MapPin, Users, Sparkles } from 'lucide-react';
import { UserTrip } from '../../hooks/useUserTrips';
import { getHeroImageForDestination } from '../../utils/heroImages';

interface TripCardGridProps {
  trips: UserTrip[];
  onSelectTrip: (tripId: string) => void;
  onImproveWithAI?: (tripId: string) => void;
}

export function TripCardGrid({ trips, onSelectTrip, onImproveWithAI }: TripCardGridProps) {
  const formatDateRange = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const startMonth = startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const endMonth = endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    return `${startMonth} - ${endMonth}`;
  };

  const getTripBadge = (trip: UserTrip) => {
    const badges = {
      draft: { label: 'Draft', color: 'bg-gray-100 text-gray-700' },
      upcoming: { label: 'Upcoming', color: 'bg-blue-50 text-blue-700' },
      in_progress: { label: 'In Progress', color: 'bg-green-50 text-green-700' },
      past: { label: 'Past', color: 'bg-gray-100 text-gray-600' },
      booked: { label: 'Booked', color: 'bg-orange-50 text-orange-700' },
    };
    return badges[trip.trip_status];
  };

  if (trips.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg">No trips found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {trips.map((trip) => {
        const heroImage = trip.hero_image_url || getHeroImageForDestination(trip.destination, trip.locations);
        const badge = getTripBadge(trip);
        const destinationText = trip.locations && trip.locations.length > 0
          ? trip.locations.slice(0, 2).join(' · ')
          : trip.destination;

        return (
          <div
            key={trip.id}
            className="group bg-white rounded-2xl overflow-hidden border border-gray-200
                     hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <div
              onClick={() => onSelectTrip(trip.id)}
              className="relative aspect-[4/3] overflow-hidden"
            >
              <img
                src={heroImage}
                alt={trip.trip_name}
                className="w-full h-full object-cover transition-transform duration-500
                         group-hover:scale-110"
              />
              <div className="absolute top-3 right-3">
                <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${badge.color}`}>
                  {badge.label}
                </span>
              </div>
            </div>

            <div className="p-5">
              <h3
                onClick={() => onSelectTrip(trip.id)}
                className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 hover:text-gray-700
                         transition-colors"
              >
                {trip.trip_name}
              </h3>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="line-clamp-1">{destinationText}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4 flex-shrink-0" />
                  <span>{formatDateRange(trip.start_date, trip.end_date)}</span>
                </div>
                {trip.travelers_count > 0 && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4 flex-shrink-0" />
                    <span>{trip.travelers_count} {trip.travelers_count === 1 ? 'traveler' : 'travelers'}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-3 border-t border-gray-100">
                <button
                  onClick={() => onSelectTrip(trip.id)}
                  className="flex-1 px-4 py-2 bg-black hover:bg-gray-800 text-white
                           text-sm font-semibold rounded-lg transition-colors"
                >
                  View Trip
                </button>
                {onImproveWithAI && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onImproveWithAI(trip.id);
                    }}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700
                             text-sm font-semibold rounded-lg transition-colors
                             flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    AI
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
