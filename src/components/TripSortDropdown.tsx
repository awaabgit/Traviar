import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { TripSort } from '../hooks/useUserTrips';

interface TripSortDropdownProps {
  activeSort: TripSort;
  onSortChange: (sort: TripSort) => void;
}

const sortOptions: { id: TripSort; label: string }[] = [
  { id: 'recent', label: 'Recently updated' },
  { id: 'upcoming', label: 'Upcoming first' },
  { id: 'alphabetical', label: 'Alphabetical' },
];

export function TripSortDropdown({ activeSort, onSortChange }: TripSortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const activeSortLabel = sortOptions.find(opt => opt.id === activeSort)?.label || 'Recently updated';

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Sort trips"
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200
                   bg-white text-gray-700 text-sm font-medium hover:border-gray-300
                   hover:bg-gray-50 hover:shadow-sm active:scale-95
                   transition-all duration-200 transform"
      >
        <span>Sort: {activeSortLabel}</span>
        <ChevronDown className={`w-4 h-4 transition-all duration-300 ${isOpen ? 'rotate-180 text-coral-500' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-soft-lg border border-gray-100 py-1 z-10 animate-slide-in-down origin-top">
          {sortOptions.map((option, index) => (
            <button
              key={option.id}
              onClick={() => {
                onSortChange(option.id);
                setIsOpen(false);
              }}
              style={{ animationDelay: `${index * 30}ms` }}
              className={`
                w-full px-4 py-2.5 text-left text-sm transition-all duration-200
                hover:translate-x-1 animate-fade-in
                ${activeSort === option.id
                  ? 'bg-gray-50 text-gray-900 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
                }
              `}
            >
              {option.label}
              {activeSort === option.id && (
                <span className="ml-2 text-coral-500 animate-scale-in">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
