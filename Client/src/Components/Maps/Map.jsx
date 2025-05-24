import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';

function CurrentLocationMarker({ onLocationSelect }) {
  const [position, setPosition] = useState(null);
  const map = useMap();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
        map.setView([latitude, longitude], 13);

        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
          .then(res => res.json())
          .then(data => {
            const address = data.display_name;
            onLocationSelect({ lat: latitude, lng: longitude, address });
          });
      },
      (err) => {
        console.error('Location access denied:', err);
      }
    );
  }, [map, onLocationSelect]);

  return position ? <Marker position={position} /> : null;
}

function ClickMarker({ onLocationSelect }) {
  const [position, setPosition] = useState(null);
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
        .then(res => res.json())
        .then(data => {
          const address = data.display_name;
          onLocationSelect({ lat, lng, address });
        });
    },
  });

  return position ? <Marker position={position} /> : null;
}

function Map({ onLocationSelect, useCurrentLocation }) {
  const defaultPosition = [28.6139, 77.2090]; // fallback to Delhi

  return (
    <MapContainer center={defaultPosition} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {useCurrentLocation ? (
        <CurrentLocationMarker onLocationSelect={onLocationSelect} />
      ) : (
        <ClickMarker onLocationSelect={onLocationSelect} />
      )}
    </MapContainer>
  );
}

export default Map;
