import React, { useState } from 'react';

import PropTypes from 'prop-types'; // ES6
import { Dropdown } from 'react-bootstrap';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';

import styles from './SortDropdown.module.scss';

const defaultSortDirection = 'asc';

const SortDropdown = ({ onSortData }) => {
  const [sortState, setSortState] = useState({
    year: defaultSortDirection,
    price: defaultSortDirection,
  });

  const handleChangeSort = (type) => {
    const direction = sortState[type] === 'asc' ? 'desc' : 'asc';

    setSortState((prev) => ({ ...prev, [type]: direction }));
    // обновляем данные после сортировки
    onSortData(type, direction);
  };

  return (
    <Dropdown className={styles.sortDropdown} autoClose="outside">
      <Dropdown.Toggle id="dropdown-autoclose-outside">
				Сортировать по
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item>
          <button
            className={styles.sortButton}
            onClick={() => handleChangeSort('year')}
          >
						Году
            {sortState.year === 'asc' ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}
          </button>
        </Dropdown.Item>
        <Dropdown.Item>
          <button
            className={styles.sortButton}
            onClick={() => handleChangeSort('price')}
          >
						Цене
            {sortState.price === 'asc' ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}
          </button>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SortDropdown;

SortDropdown.propTypes = {
  onSortData: PropTypes.func,
};