import { TripFilter } from '../hooks/useUserTrips';

interface TripFilterBarProps {
  activeFilter: TripFilter;
  onFilterChange: (filter: TripFilter) => void;
}

const filters: { id: TripFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'past', label: 'Past' },
  { id: 'booked', label: 'Booked' },
  { id: 'drafts', label: 'Drafts' },
  { id: 'shared', label: 'Shared with me' },
];

export function TripFilterBar({ activeFilter, onFilterChange }: TripFilterBarProps) {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          aria-label={`Filter by ${filter.label}`}
          aria-pressed={activeFilter === filter.id}
          className={`
            px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
            transition-all duration-200
            ${activeFilter === filter.id
              ? 'bg-black text-white shadow-soft'
              : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }
          `}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
