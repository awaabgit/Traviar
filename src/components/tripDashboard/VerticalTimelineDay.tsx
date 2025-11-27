import { useState } from 'react';
import { ChevronDown, ChevronUp, Plus, Sparkles } from 'lucide-react';
import { TripDay } from '../../hooks/useTripData';
import { TimelineActivityCard } from './TimelineActivityCard';
import { DistanceIndicator } from './DistanceIndicator';

interface VerticalTimelineDayProps {
  day: TripDay;
  isExpanded: boolean;
  onToggle: () => void;
  onAddPlace: () => void;
  onDeleteActivity: (activityId: string) => Promise<{ success: boolean; error?: string }>;
  onMoveActivity: (activityId: string, targetDayId: string) => Promise<{ success: boolean; error?: string }>;
  days: TripDay[];
}

export function VerticalTimelineDay({
  day,
  isExpanded,
  onToggle,
  onAddPlace,
  onDeleteActivity,
  onMoveActivity,
  days,
}: VerticalTimelineDayProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };

  const totalDuration = day.activities.reduce((sum, a) => sum + (a.duration_minutes || 0), 0);
  const hours = Math.floor(totalDuration / 60);
  const minutes = totalDuration % 60;
  const durationText = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

  return (
    <div className="mb-6 animate-fade-in">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 px-6 bg-white rounded-xl
                 border border-gray-200 hover:border-gray-300 hover:shadow-md
                 transition-all duration-300 transform hover:scale-[1.01]
                 active:scale-[0.99] group"
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-black text-white font-bold text-lg
                        transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
            {day.day_number}
          </div>
          <div className="text-left">
            <h3 className="text-lg font-bold text-gray-900">
              Day {day.day_number}
            </h3>
            <p className="text-sm text-gray-500">{formatDate(day.date)}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-gray-600">
              {day.activities.length} {day.activities.length === 1 ? 'stop' : 'stops'}
            </p>
            {day.activities.length > 0 && (
              <p className="text-xs text-gray-500">{durationText}</p>
            )}
          </div>
          <div className="transition-transform duration-300">
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-600 animate-fade-in" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-600 animate-fade-in" />
            )}
          </div>
        </div>
      </button>

      {isExpanded && (
        <div className="mt-4 pl-6 border-l-4 border-gray-200 ml-6 animate-slide-in-down origin-top">
          {day.activities.length === 0 ? (
            <div className="ml-8 py-12 text-center">
              <div className="max-w-sm mx-auto">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <Plus className="w-8 h-8 text-gray-400" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  No activities yet
                </h4>
                <p className="text-sm text-gray-500 mb-6">
                  Start building your perfect day by adding places or let AI help you
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={onAddPlace}
                    className="px-5 py-2.5 bg-black hover:bg-gray-800 text-white font-semibold
                             rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Activity
                  </button>
                  <button
                    className="px-5 py-2.5 bg-white hover:bg-gray-50 text-gray-900 font-semibold
                             rounded-lg border border-gray-300 transition-colors flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    AI Replan
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="ml-8 py-4">
                {day.activities.map((activity, index) => (
                  <div key={activity.id}>
                    <TimelineActivityCard
                      activity={activity}
                      isLast={index === day.activities.length - 1}
                      onDelete={() => onDeleteActivity(activity.id)}
                      onMove={onMoveActivity}
                      days={days}
                    />
                    {index < day.activities.length - 1 && (
                      <DistanceIndicator
                        distance={Math.random() * 3000 + 500}
                        duration={Math.floor(Math.random() * 15) + 5}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="ml-8 mt-6 mb-4 flex gap-3">
                <button
                  onClick={onAddPlace}
                  className="px-5 py-2.5 bg-white hover:bg-gray-50 text-gray-900 font-semibold
                           rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400
                           transition-all flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Activity
                </button>
                <button
                  className="px-5 py-2.5 bg-white hover:bg-gray-50 text-gray-600 font-medium
                           rounded-lg border border-gray-300 hover:border-gray-400
                           transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  AI Replan Day
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
