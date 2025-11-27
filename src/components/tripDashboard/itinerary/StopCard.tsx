import { useState } from 'react';
import { GripVertical, Clock, Trash2, Copy, MoveRight, MapPin, Star } from 'lucide-react';
import { DayActivity, TripDay } from '../../../hooks/useTripData';

interface StopCardProps {
  activity: DayActivity;
  isLast: boolean;
  onDelete: () => void;
  onMove: (activityId: string, targetDayId: string) => Promise<{ success: boolean; error?: string }>;
  days: TripDay[];
}

export function StopCard({ activity, isLast, onDelete, onMove, days }: StopCardProps) {
  const [showMoveMenu, setShowMoveMenu] = useState(false);

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      restaurant: '🍽️',
      attraction: '🎨',
      activity: '🎯',
      accommodation: '🏨',
      transport: '🚗',
      other: '📍',
    };
    return icons[category] || '📍';
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      restaurant: 'bg-orange-100 text-orange-700',
      attraction: 'bg-blue-100 text-blue-700',
      activity: 'bg-green-100 text-green-700',
      accommodation: 'bg-purple-100 text-purple-700',
      transport: 'bg-gray-100 text-gray-700',
      other: 'bg-gray-100 text-gray-700',
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  const formatDuration = (minutes?: number) => {
    if (!minutes) return null;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}–${hours + 1} hrs`;
    }
    return `${mins} min`;
  };

  const handleMoveToDay = async (targetDayId: string) => {
    await onMove(activity.id, targetDayId);
    setShowMoveMenu(false);
  };

  return (
    <div className="group relative flex gap-3 p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all bg-white">
      <div className="flex flex-col items-center flex-shrink-0">
        <button className="p-1 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing">
          <GripVertical className="w-4 h-4" />
        </button>
        <div className="w-2 h-2 rounded-full bg-coral-500 my-1" />
        {!isLast && <div className="w-0.5 h-full bg-gray-200 flex-1 min-h-[20px]" />}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-900 mb-1 truncate">{activity.title}</h4>
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mb-2">
              <span className="capitalize">{activity.category}</span>
              {activity.location_name && (
                <>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {activity.location_name}
                  </span>
                </>
              )}
              <span>·</span>
              <span className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                4.5 (1.2k)
              </span>
            </div>
            {activity.description && (
              <p className="text-sm text-gray-600 line-clamp-1 mb-2">{activity.description}</p>
            )}
          </div>

          {activity.location_lat && activity.location_lng && (
            <div className="w-20 h-20 rounded-lg bg-gray-200 flex-shrink-0 overflow-hidden">
              <img
                src={`https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=200&h=200&fit=crop`}
                alt={activity.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {activity.duration_minutes && (
            <span className={`px-2 py-1 rounded-md text-xs font-medium ${getCategoryColor(activity.category)}`}>
              {formatDuration(activity.duration_minutes)}
            </span>
          )}
          <span className={`px-2 py-1 rounded-md text-xs font-medium ${getCategoryColor(activity.category)}`}>
            {getCategoryIcon(activity.category)} {activity.category}
          </span>
        </div>

        <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="text-xs px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors">
            <Clock className="w-3 h-3 inline mr-1" />
            Add time
          </button>
          <button className="text-xs px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors">
            Add note
          </button>
          <div className="relative">
            <button
              onClick={() => setShowMoveMenu(!showMoveMenu)}
              className="text-xs p-1.5 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
              title="Move to another day"
            >
              <MoveRight className="w-3.5 h-3.5" />
            </button>
            {showMoveMenu && (
              <div className="absolute left-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[120px] z-10">
                {days.map((day) => (
                  <button
                    key={day.id}
                    onClick={() => handleMoveToDay(day.id)}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 text-gray-700"
                  >
                    Day {day.day_number}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button className="text-xs p-1.5 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors">
            <Copy className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onDelete}
            className="text-xs p-1.5 rounded-md bg-red-100 hover:bg-red-200 text-red-700 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
