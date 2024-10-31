import axios from 'axios';

const API_URL = 'https://environment.data.gov.uk/flood-monitoring/id/floods';

export const getFloodData = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching flood data:', error);
    return { items: [] };
  }
};

