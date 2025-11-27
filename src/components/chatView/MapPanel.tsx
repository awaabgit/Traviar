import { MapView } from '../MapView';

const MOCK_LOCATIONS = [
  {
    id: '1',
    name: 'Eiffel Tower',
    lat: 48.8584,
    lng: 2.2945,
    category: 'attraction',
  },
  {
    id: '2',
    name: 'Louvre Museum',
    lat: 48.8606,
    lng: 2.3376,
    category: 'attraction',
  },
  {
    id: '3',
    name: 'Le Cinq',
    lat: 48.8698,
    lng: 2.3059,
    category: 'restaurant',
  },
  {
    id: '4',
    name: 'Arc de Triomphe',
    lat: 48.8738,
    lng: 2.2950,
    category: 'attraction',
  },
  {
    id: '5',
    name: 'Sacré-Cœur',
    lat: 48.8867,
    lng: 2.3431,
    category: 'attraction',
  },
];

export function MapPanel() {
  const center: [number, number] = [48.8584, 2.2945];

  return (
    <div className="flex-1 overflow-hidden p-4">
      <div className="h-full rounded-xl overflow-hidden border border-gray-200 shadow-sm relative">
        <MapView
          locations={MOCK_LOCATIONS}
          center={center}
          zoom={12}
        />

        <div className="absolute top-4 left-4 z-[1000]">
          <div className="bg-white/95 backdrop-blur-sm border border-gray-200 px-4 py-2 rounded-lg shadow-lg">
            <p className="text-sm font-semibold text-gray-900">Chat locations</p>
            <p className="text-xs text-gray-600 mt-0.5">{MOCK_LOCATIONS.length} places</p>
          </div>
        </div>
      </div>
    </div>
  );
}
