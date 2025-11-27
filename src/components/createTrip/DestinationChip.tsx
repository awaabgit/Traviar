import { X, GripVertical, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export interface Destination {
  name: string;
  country?: string;
  imageUrl: string;
  stayDays?: number;
}

interface DestinationChipProps {
  destination: Destination;
  onRemove: () => void;
  onUpdateDays: (days: number) => void;
  isDragging?: boolean;
}

export function DestinationChip({
  destination,
  onRemove,
  onUpdateDays,
  isDragging,
}: DestinationChipProps) {
  const [showDaysDropdown, setShowDaysDropdown] = useState(false);

  const daysOptions = [1, 2, 3, 4, 5, 6, 7, 10, 14];

  return (
    <div
      className={`
        relative flex items-center gap-3 p-3 bg-white rounded-xl border-2 border-gray-200
        transition-all duration-200 group
        ${isDragging ? 'shadow-card-hover opacity-50' : 'shadow-soft hover:shadow-card'}
      `}
    >
      <button
        type="button"
        className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 transition-colors"
      >
        <GripVertical className="w-5 h-5" />
      </button>

      <div
        className="w-12 h-12 rounded-lg bg-cover bg-center flex-shrink-0"
        style={{ backgroundImage: `url(${destination.imageUrl})` }}
      />

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900 truncate">{destination.name}</p>
        {destination.country && (
          <p className="text-sm text-gray-500 truncate">{destination.country}</p>
        )}
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={() => setShowDaysDropdown(!showDaysDropdown)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200
                   text-sm font-medium text-gray-700 transition-colors"
        >
          {destination.stayDays || 1} {(destination.stayDays || 1) === 1 ? 'day' : 'days'}
          <ChevronDown className="w-4 h-4" />
        </button>

        {showDaysDropdown && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setShowDaysDropdown(false)}
            />
            <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-soft-lg border border-gray-200 py-1 z-20 min-w-[100px]">
              {daysOptions.map((days) => (
                <button
                  key={days}
                  type="button"
                  onClick={() => {
                    onUpdateDays(days);
                    setShowDaysDropdown(false);
                  }}
                  className={`
                    w-full px-4 py-2 text-left text-sm hover:bg-gray-100 transition-colors
                    ${destination.stayDays === days ? 'bg-coral-50 text-coral-600 font-medium' : 'text-gray-700'}
                  `}
                >
                  {days} {days === 1 ? 'day' : 'days'}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <button
        type="button"
        onClick={onRemove}
        className="p-1.5 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-600 transition-all"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
