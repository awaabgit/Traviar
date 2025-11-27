import { ChevronDown, ChevronUp, MoreVertical, Plus } from 'lucide-react';
import { TripDay } from '../../../hooks/useTripData';
import { StopCard } from './StopCard';

interface DaySectionProps {
  day: TripDay;
  isExpanded: boolean;
  onToggle: () => void;
  onAddPlace: () => void;
  onDeleteActivity: (activityId: string) => Promise<{ success: boolean; error?: string }>;
  onMoveActivity: (activityId: string, targetDayId: string) => Promise<{ success: boolean; error?: string }>;
  days: TripDay[];
}

export function DaySection({
  day,
  isExpanded,
  onToggle,
  onAddPlace,
  onDeleteActivity,
  onMoveActivity,
  days,
}: DaySectionProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const dayNum = date.getDate();
    return `${dayName} · ${month} ${dayNum}`;
  };

  const totalDuration = day.activities.reduce((sum, a) => sum + (a.duration_minutes || 0), 0);
  const hours = Math.floor(totalDuration / 60);
  const minutes = totalDuration % 60;
  const durationText = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

  const summary = day.activities.length > 0
    ? `${day.activities.length} ${day.activities.length === 1 ? 'stop' : 'stops'} · ${durationText}`
    : 'No stops yet';

  return (
    <div className="bg-white rounded-2xl shadow-soft-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900">Day {day.day_number}</span>
              <span className="text-sm text-gray-500">{formatDate(day.date)}</span>
            </div>
            <div className="text-sm text-gray-600 mt-0.5">{summary}</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-600" />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="px-6 pb-6 space-y-3">
          {day.activities.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-gray-500 text-sm mb-4">
                This day is empty. Start by adding a place or let AI suggest one.
              </p>
              <button
                onClick={onAddPlace}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-coral-500 hover:bg-coral-600 text-white font-medium transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add a place
              </button>
            </div>
          ) : (
            <>
              {day.activities.map((activity, index) => (
                <StopCard
                  key={activity.id}
                  activity={activity}
                  isLast={index === day.activities.length - 1}
                  onDelete={() => onDeleteActivity(activity.id)}
                  onMove={onMoveActivity}
                  days={days}
                />
              ))}

              <button
                onClick={onAddPlace}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-coral-400 hover:bg-coral-50 transition-colors text-gray-600 hover:text-coral-600 font-medium flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add a place
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
