import React from 'react';
import styles from './SortDropdown.module.scss';

import { Dropdown } from 'react-bootstrap';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';

const SortDropdown = ({ handleSort, sortType, sortDirection }) => {
	return (
		<Dropdown className={styles.sortDropdown} autoClose='outside'>
			<Dropdown.Toggle id='dropdown-autoclose-outside'>
				Сортировать по
			</Dropdown.Toggle>

			<Dropdown.Menu>
				<Dropdown.Item>
					<button
						className={styles.sortButton}
						onClick={() => handleSort('year')}
					>
						Году
						{sortType === 'year' && sortDirection === 'asc' ? (
							<AiOutlineArrowUp />
						) : (
							<AiOutlineArrowDown />
						)}
					</button>
				</Dropdown.Item>
				<Dropdown.Item>
					<button
						className={styles.sortButton}
						onClick={() => handleSort('price')}
					>
						Цене
						{sortType === 'price' && sortDirection === 'asc' ? (
							<AiOutlineArrowUp />
						) : (
							<AiOutlineArrowDown />
						)}
					</button>
				</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	);
};

export default SortDropdown;
