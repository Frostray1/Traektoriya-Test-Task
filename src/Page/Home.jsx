import React, { useEffect, useState } from 'react';
import styles from './Home.module.scss';
import axios from 'axios';
import { Dropdown } from 'react-bootstrap';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';

const Home = () => {
	const [objects, setObjects] = useState([]);
	const [sortType, setSortType] = useState('year');
	const [sortDirection, setSortDirection] = useState('asc');

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const response = await axios.get(
				'https://test.tspb.su/test-task/vehicles'
			);
			setObjects(response.data);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	const handleSort = type => {
		if (type === sortType) {
			setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
		} else {
			setSortType(type);
			setSortDirection('asc');
		}
	};

	const sortedObjects = objects.sort((a, b) => {
		if (sortType === 'year') {
			return sortDirection === 'asc' ? a.year - b.year : b.year - a.year;
		} else if (sortType === 'price') {
			return sortDirection === 'asc'
				? a.price - b.price
				: b.price - a.price;
		}
		return 0;
	});

	const deleteCard = id => {
		const updatedObjects = objects.filter(object => object.id !== id);
		setObjects(updatedObjects);
	};

	const updateName = (id, newName) => {
		const updatedObjects = objects.map(object => {
			if (object.id === id) {
				return { ...object, name: newName };
			}
			return object;
		});
		setObjects(updatedObjects);
	};

	const updatePrice = (id, newPrice) => {
		const updatedObjects = objects.map(object => {
			if (object.id === id) {
				return { ...object, price: newPrice };
			}
			return object;
		});
		setObjects(updatedObjects);
	};
	const updateModel = (id, newModel) => {
		const updatedObjects = objects.map(object => {
			if (object.id === id) {
				return { ...object, model: newModel };
			}
			return object;
		});
		setObjects(updatedObjects);
	};

	// console.log(objects);
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
				{sortedObjects.map(object => (
					<div key={object.id} className={styles.card}>
						<div className={styles.cardHeader}>
							<h3>
								<input
									className={styles.input}
									type='text'
									value={object.name || ''}
									onChange={e =>
										updateName(object.id, e.target.value)
									}
								/>
							</h3>

							<MdDelete onClick={() => deleteCard(object.id)} />
						</div>

						<p>Model: <input
									className={styles.input}
									type='text'
									value={object.model || ''}
									onChange={e =>
										updateModel(object.id, e.target.value)
									}
								/></p>
						<p>Price: <input
									className={styles.input}
									type='number'
									value={object.price || ''}
									onChange={e =>
										updatePrice(object.id, e.target.value)
									}
								/></p>
						<p>Year: {object.year}</p>
						<p>Color: {object.color}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Home;
