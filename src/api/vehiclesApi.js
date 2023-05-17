import axios from 'axios';

export const fetchVehicles = async () => {
  try {
    const response = await axios.get(
      'https://test.tspb.su/test-task/vehicles',
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
