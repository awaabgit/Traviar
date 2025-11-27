import { useState } from 'react';
import { Calendar, ChevronDown, ChevronUp, Settings } from 'lucide-react';
import { TripDay } from '../hooks/useTripData';
import { CompactActivityPreview } from './tripDashboard/CompactActivityPreview';

interface ItineraryDaysProps {
  tripId?: string;
  days?: TripDay[];
  selectedDayNumber?: number;
  onDaySelect?: (dayNumber: number) => void;
  selectedActivityId?: string;
  onActivityClick?: (activityId: string, dayNumber: number) => void;
  onCustomizeClick?: () => void;
}

export function ItineraryDays({
  tripId,
  days = [],
  selectedDayNumber = 1,
  onDaySelect,
  selectedActivityId,
  onActivityClick,
  onCustomizeClick,
}: ItineraryDaysProps) {
  const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set([selectedDayNumber]));

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch {
      return '';
    }
  };

  const toggleDay = (dayNumber: number) => {
    const newExpanded = new Set(expandedDays);
    if (newExpanded.has(dayNumber)) {
      newExpanded.delete(dayNumber);
    } else {
      newExpanded.add(dayNumber);
    }
    setExpandedDays(newExpanded);
    onDaySelect?.(dayNumber);
  };

  if (!tripId || days.length === 0) {
    return (
      <div className="px-4 pb-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-600" />
            <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
              Trip Days
            </span>
          </div>
        </div>
        <div className="text-center py-6 text-sm text-gray-400">
          No trip selected
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pb-3">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-600" />
          <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
            Trip Days
          </span>
        </div>
        {onCustomizeClick && (
          <button
            onClick={onCustomizeClick}
            className="p-1 rounded hover:bg-gray-100 transition-colors"
            title="Customize trip"
          >
            <Settings className="w-4 h-4 text-gray-500" />
          </button>
        )}
      </div>

      <div className="space-y-2">
        {days.map((day, index) => {
          const isExpanded = expandedDays.has(day.day_number);
          const isSelected = day.day_number === selectedDayNumber;
          const activities = day.activities || [];
          const displayActivities = activities.slice(0, 3);
          const remainingCount = Math.max(0, activities.length - 3);

          return (
            <div
              key={day.id}
              style={{ animationDelay: `${index * 60}ms` }}
              className={`rounded-lg border transition-all duration-200 animate-slide-up-fade
                       transform hover:scale-[1.02] ${
                isSelected
                  ? 'border-coral-300 bg-coral-50 shadow-sm'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
              }`}
            >
              <button
                onClick={() => toggleDay(day.day_number)}
                className="w-full flex items-center justify-between p-2.5 text-left
                         transition-all duration-200"
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0
                             transition-all duration-200 transform hover:scale-110 ${
                      isSelected
                        ? 'bg-coral-500 text-white shadow-md'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {day.day_number}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-gray-900 truncate">
                      Day {day.day_number}
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatDate(day.date)} · {activities.length} {activities.length === 1 ? 'stop' : 'stops'}
                    </div>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200" />
                )}
              </button>

              {isExpanded && activities.length > 0 && (
                <div className="px-2 pb-2 space-y-1 animate-slide-in-down">
                  {displayActivities.map((activity) => (
                    <CompactActivityPreview
                      key={activity.id}
                      activity={activity}
                      isSelected={selectedActivityId === activity.id}
                      onClick={() => onActivityClick?.(activity.id, day.day_number)}
                    />
                  ))}
                  {remainingCount > 0 && (
                    <div className="text-center py-1.5 text-xs text-gray-500 font-medium">
                      + {remainingCount} more
                    </div>
                  )}
                </div>
              )}

              {isExpanded && activities.length === 0 && (
                <div className="px-3 pb-3">
                  <div className="text-center py-4 text-xs text-gray-400 bg-gray-50 rounded-md">
                    No activities yet
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
