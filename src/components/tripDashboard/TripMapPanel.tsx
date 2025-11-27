import { MapView } from '../MapView';
import { TripDay } from '../../hooks/useTripData';

interface TripMapPanelProps {
  day: TripDay | undefined;
  days: TripDay[];
  onSelectDay: (dayNumber: number) => void;
  selectedActivityId?: string;
  onActivitySelect?: (activityId: string) => void;
}

export function TripMapPanel({ day, days, onSelectDay, selectedActivityId, onActivitySelect }: TripMapPanelProps) {
  const locations = day?.activities
    .filter(a => a.location_lat && a.location_lng)
    .map(a => ({
      id: a.id,
      name: a.title,
      lat: a.location_lat!,
      lng: a.location_lng!,
      type: a.category === 'restaurant' ? 'restaurant' as const : 'attraction' as const,
      category: a.category,
      isSelected: a.id === selectedActivityId,
    })) || [];

  const allDayLocations = days.flatMap(d =>
    d.activities
      .filter(a => a.location_lat && a.location_lng)
      .map(a => ({
        id: a.id,
        name: a.title,
        lat: a.location_lat!,
        lng: a.location_lng!,
        type: a.category === 'restaurant' ? 'restaurant' as const : 'attraction' as const,
        category: a.category,
        dayNumber: d.day_number,
        isSelected: a.id === selectedActivityId,
      }))
  );

  const displayLocations = day ? locations : allDayLocations;

  const center: [number, number] = displayLocations.length > 0
    ? [displayLocations[0].lat, displayLocations[0].lng]
    : [48.8584, 2.2945];

  const getCityName = (dayData: TripDay | undefined) => {
    if (!dayData) return 'Day 1';
    const firstActivity = dayData.activities[0];
    return firstActivity?.location_name || `Day ${dayData.day_number}`;
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="relative h-full">
        <MapView
          locations={displayLocations}
          center={center}
          zoom={13}
        />

        <div className="absolute top-4 left-4 z-[1000]">
          <div className="bg-black/60 backdrop-blur-md border border-white/20 px-4 py-2 rounded-lg shadow-lg text-sm font-medium text-white">
            {day ? `Day ${day.day_number}` : 'All Days'} · {getCityName(day)}
          </div>
        </div>

        <div className="absolute bottom-4 left-4 z-[1000]">
          <button className="bg-black/60 backdrop-blur-md border border-white/20 px-4 py-2 rounded-lg shadow-lg text-sm font-medium text-white hover:bg-black/70 transition-colors">
            Suggest nearby places
          </button>
        </div>
      </div>
    </div>
  );
}
