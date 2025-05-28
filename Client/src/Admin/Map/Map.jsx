import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Fix marker icon issue in some setups
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const Map = () => {
  const position = [28.6139, 77.2090]; // Example: New Delhi coordinates

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            You are here — <strong>New Delhi</strong>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
