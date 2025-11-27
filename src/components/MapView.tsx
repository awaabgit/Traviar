import { useEffect, useState, Fragment } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import { Icon, DivIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Location {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type?: 'destination' | 'restaurant' | 'attraction';
  category?: string;
  isSelected?: boolean;
  dayNumber?: number;
}

interface MapViewProps {
  locations?: Location[];
  center?: [number, number];
  zoom?: number;
}

function MapController({ center }: { center: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);

  return null;
}

const getCategoryColor = (category?: string) => {
  const colors: Record<string, string> = {
    restaurant: '#f97316',
    attraction: '#3b82f6',
    activity: '#22c55e',
    accommodation: '#a855f7',
    transport: '#6b7280',
    other: '#6b7280',
  };
  return colors[category || 'other'] || '#6b7280';
};

const getRouteColor = (index: number) => {
  const colors = [
    '#ef4444',
    '#f97316',
    '#eab308',
    '#22c55e',
    '#3b82f6',
    '#a855f7',
    '#ec4899',
  ];
  return colors[index % colors.length];
};

const createCustomIcon = (category?: string, isSelected?: boolean) => {
  const color = getCategoryColor(category);
  const size = isSelected ? 40 : 32;
  const pulseClass = isSelected ? 'animate-pulse' : '';

  return new DivIcon({
    html: `
      <div class="relative flex items-center justify-center ${pulseClass}">
        <div class="absolute w-${size/8} h-${size/8} rounded-full"
             style="background-color: ${color}; opacity: 0.3; width: ${size}px; height: ${size}px;"></div>
        <div class="relative w-8 h-8 rounded-full border-3 border-white shadow-lg flex items-center justify-center"
             style="background-color: ${color}; ${isSelected ? 'box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.4);' : ''}">
          <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
    `,
    className: 'custom-marker',
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  });
};

export function MapView({ locations = [], center = [51.505, -0.09], zoom = 13 }: MapViewProps) {
  const [mapCenter, setMapCenter] = useState<[number, number]>(center);

  useEffect(() => {
    if (locations.length > 0) {
      setMapCenter([locations[0].lat, locations[0].lng]);
    }
  }, [locations]);

  return (
    <div className="h-full w-full relative">
      <MapContainer
        center={mapCenter}
        zoom={zoom}
        scrollWheelZoom={true}
        className="h-full w-full"
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <MapController center={mapCenter} />

        {locations.map((location, index) => {
          if (index < locations.length - 1) {
            const nextLocation = locations[index + 1];
            const routeColor = getRouteColor(index);

            return (
              <Fragment key={location.id}>
                <Polyline
                  key={`route-${location.id}-${nextLocation.id}`}
                  positions={[
                    [location.lat, location.lng],
                    [nextLocation.lat, nextLocation.lng]
                  ]}
                  pathOptions={{
                    color: routeColor,
                    weight: 3,
                    opacity: 0.7,
                    dashArray: '10, 10',
                  }}
                />
                <Marker
                  key={location.id}
                  position={[location.lat, location.lng]}
                  icon={createCustomIcon(location.category, location.isSelected)}
                  zIndexOffset={location.isSelected ? 1000 : index}
                >
                  <Popup>
                    <div className="text-sm">
                      <h3 className="font-semibold text-gray-900 mb-1">{location.name}</h3>
                      {location.category && (
                        <p className="text-xs text-gray-600 capitalize mb-1">{location.category}</p>
                      )}
                      {location.dayNumber && (
                        <p className="text-xs text-gray-500">Day {location.dayNumber}</p>
                      )}
                    </div>
                  </Popup>
                </Marker>
              </Fragment>
            );
          }

          return (
            <Marker
              key={location.id}
              position={[location.lat, location.lng]}
              icon={createCustomIcon(location.category, location.isSelected)}
              zIndexOffset={location.isSelected ? 1000 : index}
            >
              <Popup>
                <div className="text-sm">
                  <h3 className="font-semibold text-gray-900 mb-1">{location.name}</h3>
                  {location.category && (
                    <p className="text-xs text-gray-600 capitalize mb-1">{location.category}</p>
                  )}
                  {location.dayNumber && (
                    <p className="text-xs text-gray-500">Day {location.dayNumber}</p>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
