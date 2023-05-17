import React, { useEffect, useState } from 'react';

import { fetchVehicles } from 'api/vehiclesApi';
import Map from 'components/Map';
import SortDropdown from 'components/SortDropdown';
import VehicleCard from 'components/VehicleCard';

import styles from './Home.module.scss';

const Home = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetchVehicles()
      .then(result => setVehicles(result))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const deleteCard = (id) => {
    const updatedObjects = vehicles.filter(object => object.id !== id);
    setVehicles(updatedObjects);
  };

  const updateCard = (id, fieldName, fieldValue) => {
    setVehicles(
      (prev) => prev.map((vehicle) => {
        if (vehicle.id === id) {
          return {
            ...vehicle,
            [fieldName]: fieldValue,
          };
        }
        return vehicle;
      }));
  };

  const sortCallback = (first, second, sortDirection, sortField) =>
    sortDirection === 'asc'
      ? first[sortField] - second[sortField]
      : second[sortField] - first[sortField];

  const onSortData = (sortType, sortDirection) => {
    if (!vehicles.length) return;

    const sortedVehicles = vehicles.sort(
      (first, second) => sortCallback(first, second, sortDirection, sortType),
    );
    setVehicles([...sortedVehicles]);
  };

  return (
    <div>
      <div className={styles.header}>
        <SortDropdown onSortData={onSortData} />
      </div>
      <div className={styles.grid}>
        {vehicles.map(vehicle => (
					  <VehicleCard
					    key={vehicle.id}
					    vehicle={vehicle}
					    updateCard={updateCard}
					    deleteCard={deleteCard}
					  />
        ))}
      </div>
      <Map vehicles={vehicles} />
    </div>
  );
};

export default Home;
