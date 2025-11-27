import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TripDay } from '../../../hooks/useTripData';
import { VerticalTimelineDay } from '../VerticalTimelineDay';
import { TripMapPanel } from '../TripMapPanel';

interface PlanTabProps {
  days: TripDay[];
  selectedDayNumber: number;
  onSelectDay: (dayNumber: number) => void;
  selectedActivityId?: string;
  onActivityClick: (activityId: string, dayNumber: number) => void;
  expandedDays: Set<string>;
  onToggleDay: (dayId: string) => void;
  onAddPlace: (dayId: string) => void;
  onDeleteActivity: (activityId: string) => Promise<{ success: boolean; error?: string }>;
  onMoveActivity: (activityId: string, targetDayId: string) => Promise<{ success: boolean; error?: string }>;
  onActivitySelect: (activityId: string | undefined) => void;
}

export function PlanTab({
  days,
  selectedDayNumber,
  onSelectDay,
  selectedActivityId,
  onActivityClick,
  expandedDays,
  onToggleDay,
  onAddPlace,
  onDeleteActivity,
  onMoveActivity,
  onActivitySelect,
}: PlanTabProps) {
  const [isMapCollapsed, setIsMapCollapsed] = useState(false);

  const selectedDay = days.find(d => d.day_number === selectedDayNumber) || days[0];

  return (
    <div className="flex gap-6 h-[calc(100vh-280px)] animate-fade-in">
      <div className={`flex-1 overflow-y-auto transition-all duration-300 ${isMapCollapsed ? 'pr-0' : 'pr-6'}`}>
        <div className="space-y-4">
          {days.map((day, index) => (
            <div
              key={day.id}
              style={{ animationDelay: `${index * 50}ms` }}
              className="animate-slide-up-fade"
            >
              <VerticalTimelineDay
                day={day}
                isExpanded={expandedDays.has(day.id)}
                onToggle={() => onToggleDay(day.id)}
                onAddPlace={() => onAddPlace(day.id)}
                onDeleteActivity={onDeleteActivity}
                onMoveActivity={onMoveActivity}
                days={days}
              />
            </div>
          ))}
        </div>
      </div>

      <div
        className={`relative transition-all duration-300 ${
          isMapCollapsed ? 'w-12' : 'w-[400px] xl:w-[480px]'
        }`}
      >
        <button
          onClick={() => setIsMapCollapsed(!isMapCollapsed)}
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-10
                   w-8 h-8 rounded-full bg-white border border-gray-200 shadow-md
                   flex items-center justify-center hover:bg-gray-50
                   transition-all duration-200 transform hover:scale-110 active:scale-95"
        >
          {isMapCollapsed ? (
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-600" />
          )}
        </button>

        <div
          className={`h-full border-l border-gray-200 bg-gray-50 transition-all duration-300 ${
            isMapCollapsed ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {!isMapCollapsed && (
            <TripMapPanel
              day={selectedDay}
              days={days}
              onSelectDay={onSelectDay}
              selectedActivityId={selectedActivityId}
              onActivitySelect={onActivitySelect}
            />
          )}
        </div>
      </div>
    </div>
  );
}
