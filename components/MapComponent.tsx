import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Activity } from '../types';

// Fix for default icon issue which can occur with bundlers like Webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface MapComponentProps {
  activities: Activity[];
  onMarkerClick?: (activityId: string) => void;
}

// A helper component to automatically fit the map bounds to the markers
const FitBounds: React.FC<{ activities: Activity[] }> = ({ activities }) => {
    const map = useMap();
    useEffect(() => {
        if (activities.length > 1) {
            const bounds = L.latLngBounds(activities.map(a => [a.coordinates.lat, a.coordinates.lng]));
            if (bounds.isValid()) {
                map.fitBounds(bounds, { padding: [50, 50] });
            }
        }
    }, [activities, map]);
    return null;
};

const MapComponent: React.FC<MapComponentProps> = ({ activities, onMarkerClick }) => {
  if (activities.length === 0) {
    return (
       <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center">
         <p className="text-gray-500">Aucune activité à afficher sur la carte.</p>
       </div>
    );
  }

  // Set initial map center to the first activity's location
  const position = [activities[0].coordinates.lat, activities[0].coordinates.lng];

  return (
    <div className="h-96 md:h-[500px] w-full rounded-lg overflow-hidden shadow-md">
      <MapContainer center={position as L.LatLngExpression} zoom={activities.length === 1 ? 13 : 5} scrollWheelZoom={true} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {activities.map(activity => (
          <Marker key={activity.id} position={[activity.coordinates.lat, activity.coordinates.lng]}>
            <Popup>
              <div className="font-semibold">{activity.title}</div>
              {onMarkerClick && (
                <button
                  onClick={() => onMarkerClick(activity.id)}
                  className="text-sm text-teal-600 hover:underline mt-1"
                >
                  Voir les détails
                </button>
              )}
            </Popup>
          </Marker>
        ))}
        <FitBounds activities={activities} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;