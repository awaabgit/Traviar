import { Navigation } from 'lucide-react';

interface DistanceIndicatorProps {
  distance?: number;
  duration?: number;
}

export function DistanceIndicator({ distance, duration }: DistanceIndicatorProps) {
  const formatDistance = (meters?: number) => {
    if (!meters) return '0.5 mi';
    const miles = meters / 1609.34;
    return miles < 1 ? `${(miles * 5280).toFixed(0)} ft` : `${miles.toFixed(1)} mi`;
  };

  const formatDuration = (minutes?: number) => {
    if (!minutes) return '2 min';
    return `${minutes} min`;
  };

  return (
    <div className="relative flex justify-center -my-3 py-6">
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
           style={{
             backgroundImage: 'repeating-linear-gradient(0deg, #d1d5db 0, #d1d5db 6px, transparent 6px, transparent 12px)',
           }}
      />
      <div className="flex items-center gap-2 text-xs text-gray-500 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm relative z-10">
        <Navigation className="w-3 h-3" />
        <span className="font-medium">{formatDistance(distance)}</span>
        <span>·</span>
        <span>{formatDuration(duration)}</span>
      </div>
    </div>
  );
}
