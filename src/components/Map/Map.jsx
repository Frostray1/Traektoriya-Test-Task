import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import styles from './Map.module.scss';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
	iconRetinaUrl: icon,
	iconUrl: icon,
	shadowUrl: iconShadow
});

const Map = ({ objects }) => {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (objects && objects.length > 0) {
			setIsLoading(false);
		}
	}, [objects]);

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
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
					attribution='Map data &copy; OpenStreetMap contributors'
				/>
				{objects.map(object => (
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
