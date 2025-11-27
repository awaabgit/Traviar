import { useState, useRef, useEffect } from 'react';
import { Clock, MapPin, DollarSign, MoreVertical, Trash2, MoveRight, Star, GripVertical } from 'lucide-react';
import { DayActivity, TripDay } from '../../hooks/useTripData';

interface TimelineActivityCardProps {
  activity: DayActivity;
  isLast: boolean;
  onDelete: () => void;
  onMove: (activityId: string, targetDayId: string) => Promise<{ success: boolean; error?: string }>;
  days: TripDay[];
}

export function TimelineActivityCard({ activity, isLast, onDelete, onMove, days }: TimelineActivityCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showMoveMenu, setShowMoveMenu] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
        setShowMoveMenu(false);
      }
    };

    if (showMenu || showMoveMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu, showMoveMenu]);

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
      restaurant: 'bg-orange-50 text-orange-700 border-orange-200',
      attraction: 'bg-blue-50 text-blue-700 border-blue-200',
      activity: 'bg-green-50 text-green-700 border-green-200',
      accommodation: 'bg-purple-50 text-purple-700 border-purple-200',
      transport: 'bg-gray-50 text-gray-700 border-gray-200',
      other: 'bg-gray-50 text-gray-700 border-gray-200',
    };
    return colors[category] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const formatDuration = (minutes?: number) => {
    if (!minutes) return null;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0 && mins > 0) {
      return `${hours}h ${mins}m`;
    } else if (hours > 0) {
      return `${hours}h`;
    }
    return `${mins} min`;
  };

  const handleMoveToDay = async (targetDayId: string) => {
    await onMove(activity.id, targetDayId);
    setShowMoveMenu(false);
    setShowMenu(false);
  };

  const getThumbnail = () => {
    if (activity.photo_url) {
      return activity.photo_url;
    }
    if (activity.category === 'restaurant') {
      return 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=300&h=200';
    } else if (activity.category === 'attraction') {
      return 'https://images.pexels.com/photos/1796727/pexels-photo-1796727.jpeg?auto=compress&cs=tinysrgb&w=300&h=200';
    }
    return 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=300&h=200';
  };

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('activityId', activity.id);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const draggedActivityId = e.dataTransfer.getData('activityId');
    if (draggedActivityId && draggedActivityId !== activity.id) {
      console.log('Reorder:', draggedActivityId, 'to position of', activity.id);
    }
  };

  return (
    <div
      id={`activity-${activity.id}`}
      className="relative flex gap-4 scroll-mt-8"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center flex-shrink-0 pt-2">
        <div className="w-3 h-3 rounded-full bg-black border-4 border-white shadow-sm" />
        {!isLast && <div className="w-0.5 flex-1 bg-gray-200 mt-2 min-h-[60px]" />}
      </div>

      <div className="flex-1 pb-6">
        <div className={`bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all group ${
          isDragging ? 'opacity-50 scale-95' : ''
        }`}>
          <div className="flex gap-4 p-4">
            <div className="flex items-center cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity -ml-2 mr-1">
              <GripVertical className="w-5 h-5 text-gray-400" />
            </div>

            <div className="w-32 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
              <img
                src={getThumbnail()}
                alt={activity.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">
                    {activity.title}
                  </h4>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <span className={`px-2 py-0.5 rounded-md text-xs font-medium border ${getCategoryColor(activity.category)}`}>
                      {getCategoryIcon(activity.category)} {activity.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      4.5 (1.2k)
                    </span>
                  </div>
                </div>

                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>

                  {showMenu && (
                    <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                      <button
                        onClick={() => setShowMoveMenu(!showMoveMenu)}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-gray-700 flex items-center gap-2"
                      >
                        <MoveRight className="w-4 h-4" />
                        Move to...
                      </button>
                      <button
                        onClick={onDelete}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-red-50 text-red-600 flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  )}

                  {showMoveMenu && (
                    <div className="absolute right-44 top-full mt-1 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                      {days.map((day) => (
                        <button
                          key={day.id}
                          onClick={() => handleMoveToDay(day.id)}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-gray-700"
                        >
                          Day {day.day_number}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {activity.description && (
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {activity.description}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-3 text-sm">
                {activity.duration_minutes && (
                  <div className="flex items-center gap-1.5 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{formatDuration(activity.duration_minutes)}</span>
                  </div>
                )}
                {activity.location_name && (
                  <div className="flex items-center gap-1.5 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="line-clamp-1">{activity.location_name}</span>
                  </div>
                )}
                {activity.cost > 0 && (
                  <div className="flex items-center gap-1.5 text-gray-600">
                    <DollarSign className="w-4 h-4" />
                    <span>${activity.cost}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
