import { useState, useRef, useEffect } from 'react';
import { Calendar, MapPin, Users, MoreVertical } from 'lucide-react';
import { UserTrip } from '../hooks/useUserTrips';

interface MyTripCardProps {
  trip: UserTrip;
  onRename: (tripId: string) => void;
  onDuplicate: (tripId: string) => void;
  onDelete: (tripId: string) => void;
  onClick: (tripId: string) => void;
}

export function MyTripCard({ trip, onRename, onDuplicate, onDelete, onClick }: MyTripCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const formatDateRange = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const startMonth = startDate.toLocaleDateString('en-US', { month: 'short' });
    const endMonth = endDate.toLocaleDateString('en-US', { month: 'short' });
    const startDay = startDate.getDate();
    const endDay = endDate.getDate();
    const year = startDate.getFullYear();

    if (startMonth === endMonth) {
      return `${startMonth} ${startDay}-${endDay}, ${year}`;
    }
    return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`;
  };

  const getStatusBadge = () => {
    const badges = {
      draft: { label: 'Draft', color: 'bg-gray-100 text-gray-700' },
      upcoming: { label: 'Upcoming', color: 'bg-blue-100 text-blue-700' },
      in_progress: { label: 'In Progress', color: 'bg-green-100 text-green-700' },
      past: { label: 'Past', color: 'bg-gray-100 text-gray-600' },
      booked: { label: 'Booked', color: 'bg-coral-100 text-coral-700' },
    };

    const badge = badges[trip.trip_status];
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${badge.color}`}>
        {badge.label}
      </span>
    );
  };

  const defaultImage = 'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=800';

  return (
    <div
      className="group relative bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover
                 transition-all duration-300 cursor-pointer"
      onClick={() => onClick(trip.id)}
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={trip.hero_image_url || defaultImage}
          alt={trip.trip_name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="absolute top-3 right-3 flex items-center gap-2">
          {getStatusBadge()}
          <div className="relative" ref={menuRef}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
              aria-label="Trip actions"
              aria-expanded={isMenuOpen}
              aria-haspopup="true"
              className="p-2 rounded-full bg-white/90 hover:bg-white text-gray-700
                       transition-all duration-200 backdrop-blur-sm"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-soft-lg
                            border border-gray-100 py-1 z-10 animate-fade-in">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRename(trip.id);
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Rename
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDuplicate(trip.id);
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Duplicate
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(trip.id);
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
            {trip.trip_name}
          </h3>
          <div className="flex items-center gap-3 text-white/90 text-sm">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{formatDateRange(trip.start_date, trip.end_date)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4" />
            <span className="line-clamp-1">
              {trip.locations.length > 0
                ? trip.locations.join(', ')
                : trip.destination
              }
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            <span>{trip.travelers_count}</span>
          </div>
        </div>

        {trip.is_shared && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Shared trip
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
