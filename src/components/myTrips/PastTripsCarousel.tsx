import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useRef } from 'react';
import { UserTrip } from '../../hooks/useUserTrips';
import { getHeroImageForDestination } from '../../utils/heroImages';

interface PastTripsCarouselProps {
  trips: UserTrip[];
  onSelectTrip: (tripId: string) => void;
}

export function PastTripsCarousel({ trips, onSelectTrip }: PastTripsCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScrollButtons, 300);
    }
  };

  const formatDateRange = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const year = startDate.getFullYear();
    return `${startDate.toLocaleDateString('en-US', { month: 'short' })} - ${endDate.toLocaleDateString('en-US', { month: 'short' })} ${year}`;
  };

  if (trips.length === 0) return null;

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Past Trips</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`p-2 rounded-lg border transition-all ${
              canScrollLeft
                ? 'border-gray-300 hover:bg-gray-50 text-gray-700'
                : 'border-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`p-2 rounded-lg border transition-all ${
              canScrollRight
                ? 'border-gray-300 hover:bg-gray-50 text-gray-700'
                : 'border-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        onScroll={checkScrollButtons}
        className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide"
      >
        {trips.map((trip) => {
          const heroImage = trip.hero_image_url || getHeroImageForDestination(trip.destination, trip.locations);
          const destinationText = trip.locations && trip.locations.length > 0
            ? trip.locations.slice(0, 2).join(' · ')
            : trip.destination;

          return (
            <div
              key={trip.id}
              onClick={() => onSelectTrip(trip.id)}
              className="group flex-shrink-0 w-80 bg-white rounded-2xl overflow-hidden
                       border border-gray-200 hover:shadow-lg transition-all duration-300
                       cursor-pointer"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={heroImage}
                  alt={trip.trip_name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0
                           transition-all duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-gray-700
                             transition-colors">
                  {trip.trip_name}
                </h3>
                <p className="text-sm text-gray-600">{destinationText}</p>
                <p className="text-xs text-gray-500 mt-1">{formatDateRange(trip.start_date, trip.end_date)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
