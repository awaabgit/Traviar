import { useState } from 'react';
import { ChevronDown, ChevronUp, Settings } from 'lucide-react';
import { TripDay } from '../../hooks/useTripData';
import { CompactActivityPreview } from './CompactActivityPreview';

interface TripDaySidebarProps {
  days: TripDay[];
  selectedDayNumber: number;
  onSelectDay: (dayNumber: number) => void;
  selectedActivityId?: string;
  onActivityClick?: (activityId: string, dayNumber: number) => void;
}

export function TripDaySidebar({
  days,
  selectedDayNumber,
  onSelectDay,
  selectedActivityId,
  onActivityClick,
}: TripDaySidebarProps) {
  const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set([selectedDayNumber]));

  const toggleDay = (dayNumber: number) => {
    const newExpanded = new Set(expandedDays);
    if (newExpanded.has(dayNumber)) {
      newExpanded.delete(dayNumber);
    } else {
      newExpanded.add(dayNumber);
    }
    setExpandedDays(newExpanded);
    onSelectDay(dayNumber);
  };

  const formatDate = (date: string) => {
    try {
      return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return '';
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Trip Days</h3>
          <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {days.map((day) => {
          const isExpanded = expandedDays.has(day.day_number);
          const isSelected = day.day_number === selectedDayNumber;
          const activities = day.activities || [];
          const displayActivities = activities.slice(0, 3);
          const remainingCount = Math.max(0, activities.length - 3);

          return (
            <div
              key={day.id}
              className={`rounded-xl border transition-all ${
                isSelected
                  ? 'border-coral-300 bg-white shadow-sm'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <button
                onClick={() => toggleDay(day.day_number)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                      isSelected
                        ? 'bg-coral-500 text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {day.day_number}
                    </span>
                    <h4 className="font-semibold text-gray-900 text-sm">
                      Day {day.day_number}
                    </h4>
                  </div>
                  <p className="text-xs text-gray-500">
                    {formatDate(day.date)} · {activities.length} {activities.length === 1 ? 'stop' : 'stops'}
                  </p>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>

              {isExpanded && activities.length > 0 && (
                <div className="px-3 pb-3 space-y-2 animate-in slide-in-from-top-2 duration-200">
                  {displayActivities.map((activity) => (
                    <CompactActivityPreview
                      key={activity.id}
                      activity={activity}
                      isSelected={selectedActivityId === activity.id}
                      onClick={() => onActivityClick?.(activity.id, day.day_number)}
                    />
                  ))}
                  {remainingCount > 0 && (
                    <div className="text-center py-2 text-xs text-gray-500 font-medium">
                      + {remainingCount} more {remainingCount === 1 ? 'activity' : 'activities'}
                    </div>
                  )}
                </div>
              )}

              {isExpanded && activities.length === 0 && (
                <div className="px-4 pb-4">
                  <div className="text-center py-6 text-sm text-gray-400 bg-gray-50 rounded-lg">
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
