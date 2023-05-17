import React from 'react';

import styles from './CardInput.module.scss';

const CardInput = ({ value, onChange, type = 'text', ...props }) => {
  return (
    <input
      className={styles.input}
      value={value || ''}
      onChange={onChange}
      type={type}
      {...props}
    />
  );
};

export default CardInput;