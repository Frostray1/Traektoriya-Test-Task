import React, { useEffect, useState } from 'react';
import styles from './Home.module.scss';
import axios from 'axios';
import { Dropdown } from 'react-bootstrap';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';

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

	return (
		<div>
			<div className={styles.header}>
				<Dropdown  className={styles.sortDropdown} autoClose='outside'>
					<Dropdown.Toggle id='dropdown-autoclose-outside'>
						Сортировать по
					</Dropdown.Toggle>

					<Dropdown.Menu>
						<Dropdown.Item href='#'>
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
						<Dropdown.Item href='#'>
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
						<h3>{object.name}</h3>
						<p>Model: {object.model}</p>
						<p>Price: {object.price}</p>
						<p>Year: {object.year}</p>
						<p>Color: {object.color}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Home;
