import { Compass, Sparkles } from 'lucide-react';

interface EmptyTripsStateProps {
  filterType: string;
  onCreateTrip: () => void;
  onPlanWithAI: () => void;
}

export function EmptyTripsState({ filterType, onCreateTrip, onPlanWithAI }: EmptyTripsStateProps) {
  const getMessage = () => {
    const messages = {
      all: {
        title: 'No trips yet — start your first one',
        subtitle: 'Plan with AI or build manually anytime.',
      },
      upcoming: {
        title: 'No upcoming trips',
        subtitle: 'Start planning your next adventure.',
      },
      past: {
        title: 'No past trips',
        subtitle: 'Your completed adventures will appear here.',
      },
      booked: {
        title: 'No booked trips',
        subtitle: 'Trips with confirmed bookings will appear here.',
      },
      drafts: {
        title: 'No draft trips',
        subtitle: 'Create a new trip to start planning.',
      },
      shared: {
        title: 'No shared trips',
        subtitle: 'Trips shared with you by others will appear here.',
      },
    };

    return messages[filterType as keyof typeof messages] || messages.all;
  };

  const { title, subtitle } = getMessage();

  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 animate-fade-in">
      <div className="w-32 h-32 mb-6 rounded-full bg-gradient-to-br from-coral-50 to-teal-50
                    flex items-center justify-center">
        <svg
          className="w-16 h-16 text-coral-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
          />
        </svg>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
        {title}
      </h2>
      <p className="text-gray-600 text-center mb-8 max-w-md">
        {subtitle}
      </p>

      {filterType === 'all' && (
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onPlanWithAI}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg
                     bg-coral-500 hover:bg-coral-600 text-white font-medium
                     transition-all duration-200 hover:shadow-soft-lg"
          >
            <Sparkles className="w-5 h-5" />
            Plan with AI
          </button>
          <button
            onClick={onCreateTrip}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg
                     bg-white hover:bg-gray-50 text-gray-900 font-medium
                     border border-gray-200 hover:border-gray-300
                     transition-all duration-200"
          >
            <Compass className="w-5 h-5" />
            Create Trip
          </button>
        </div>
      )}
    </div>
  );
}
