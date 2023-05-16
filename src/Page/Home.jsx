import React, { useEffect, useState } from 'react';
import styles from './Home.module.scss';
import { Dropdown } from 'react-bootstrap';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { fetchData } from '../hooks/useApi';
import {
	updateModelCard,
	updateNameCard,
	updatePriceCard
} from '../hooks/useUpdateCard';

const Home = () => {
	const [objects, setObjects] = useState([]);
	const [sortType, setSortType] = useState('year');
	const [sortDirection, setSortDirection] = useState('asc');

	useEffect(() => {
		fetchData()
			.then(result => setObjects(result))
			.catch(error => console.error('Error fetching data:', error));
	}, []);

	const updateName = (id, newName) => {
		setObjects(updateNameCard(objects, id, newName));
	};
	const updatePrice = (id, newPrice) => {
		setObjects(updatePriceCard(objects, id, newPrice));
	};
	const updateModel = (id, newModel) => {
		setObjects(updateModelCard(objects, id, newModel));
	};
	const deleteCard = (id) => {
		const updatedObjects = objects.filter(object => object.id !== id);
		setObjects(updatedObjects);
	};

	const handleSort = type => {
		if (type === sortType) {
			setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
		} else {
			setSortType(type);
			setSortDirection('asc');
		}
	};

	const sortedObjects =
		objects.length > 0 &&
		objects.sort((a, b) => {
			if (sortType === 'year') {
				return sortDirection === 'asc'
					? a.year - b.year
					: b.year - a.year;
			} else if (sortType === 'price') {
				return sortDirection === 'asc'
					? a.price - b.price
					: b.price - a.price;
			}
			return 0;
		});

	return (
		<div>
			<div className={styles.header}>
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
								{sortType === 'year' &&
								sortDirection === 'asc' ? (
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
								{sortType === 'price' &&
								sortDirection === 'asc' ? (
									<AiOutlineArrowUp />
								) : (
									<AiOutlineArrowDown />
								)}
							</button>
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</div>
			<div className={styles.grid}>
				{sortedObjects &&
					sortedObjects.map(object => (
						<div key={object.id} className={styles.card}>
							<div className={styles.cardHeader}>
								<h3>
									<input
										className={styles.input}
										type='text'
										value={object.name || ''}
										onChange={e =>
											updateName(
												object.id,
												e.target.value
											)
										}
									/>
								</h3>

								<MdDelete
									onClick={() => deleteCard(object.id)}
								/>
							</div>

							<p>
								Model:{' '}
								<input
									className={styles.input}
									type='text'
									value={object.model || ''}
									onChange={e =>
										updateModel(object.id, e.target.value)
									}
								/>
							</p>
							<p>
								Price:{' '}
								<input
									className={styles.input}
									type='number'
									value={object.price || ''}
									onChange={e =>
										updatePrice(object.id, e.target.value)
									}
								/>
							</p>
							<p>Year: {object.year}</p>
							<p>Color: {object.color}</p>
						</div>
					))}
			</div>
		</div>
	);
};

export default Home;
