import axios from 'axios';

const useApi = () => {
	const fetchData = async () => {
		try {
			const result = await axios.get('https://test.tspb.su/test-task/vehicles');
			return result;
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};
	return {
		fetchData
	};
};

export default useApi;
