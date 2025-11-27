import { MapPin, Clock } from 'lucide-react';
import { DayActivity } from '../../hooks/useTripData';

interface CompactActivityPreviewProps {
  activity: DayActivity;
  onClick?: () => void;
  isSelected?: boolean;
}

export function CompactActivityPreview({ activity, onClick, isSelected }: CompactActivityPreviewProps) {
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

  const formatTime = (time?: string) => {
    if (!time) return null;
    try {
      return new Date(time).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    } catch {
      return null;
    }
  };

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-all text-left
        ${isSelected ? 'bg-coral-50 border border-coral-200' : 'bg-white border border-gray-100'}`}
    >
      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
        {activity.photo_url ? (
          <img
            src={activity.photo_url}
            alt={activity.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-2xl bg-gray-200">
            {getCategoryIcon(activity.category)}
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h5 className="font-medium text-gray-900 text-sm truncate mb-0.5">
          {activity.title}
        </h5>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          {activity.start_time && (
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{formatTime(activity.start_time)}</span>
            </div>
          )}
          {activity.location_name && (
            <>
              {activity.start_time && <span>·</span>}
              <div className="flex items-center gap-1 truncate">
                <MapPin className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">{activity.location_name}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </button>
  );
}
