import React from 'react';

import PropTypes from 'prop-types'; // ES6
import { MdDelete } from 'react-icons/md';

import CardInput from 'components/CardInput';

import styles from './VehicleCard.module.scss';

const VehicleCard = ({ updateCard, deleteCard, vehicle }) => {
  const { id, name , price, model, color, year } = vehicle;

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3>
          <CardInput
            value={name}
            onChange={({ target }) => updateCard(id, 'name', target.value)}
          />
        </h3>

        <MdDelete
          onClick={() => deleteCard(id)}
        />
      </div>

      <p>
        Model:{' '}
        <CardInput
          value={model}
          onChange={({ target }) => updateCard(id, 'model', target.value)}
        />

      </p>
      <p>
				Price:{' '}
        <CardInput
          value={price}
          type="number"
          onChange={({ target }) => updateCard(id, 'price', target.value)}
        />
      </p>
      <p>Year: {year}</p>
      <p>Color: {color}</p>
    </div>
  );
};

export default VehicleCard;

VehicleCard.propTypes = {
  vehicle: PropTypes.object,
  updateCard: PropTypes.func,
  deleteCard: PropTypes.func,
};