import React, { useEffect, useState } from 'react';


import Leaflet from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import PropTypes from 'prop-types'; // ES6
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

import styles from './Map.module.scss';

import 'leaflet/dist/leaflet.css';

Leaflet.Icon.Default.mergeOptions({
  iconRetinaUrl: icon,
  iconUrl: icon,
  shadowUrl: iconShadow,
});

const Map = ({ vehicles }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (vehicles && vehicles.length > 0) {
      setIsLoading(false);
    }
  }, [vehicles]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.mapWindow}>
      <MapContainer
        className={styles.mapContainer}
        center={[59.9343, 30.3351]}
        zoom={10}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="Map data &copy; OpenStreetMap contributors"
        />
        {vehicles.map(object => (
          <Marker
            key={object.id}
            position={[object.latitude, object.longitude]}
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;

Map.propTypes = {
  vehicles: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    year: PropTypes.number,
    color: PropTypes.string,
  })),
};
