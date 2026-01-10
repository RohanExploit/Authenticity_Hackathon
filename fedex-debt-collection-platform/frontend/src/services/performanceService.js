import { api } from './api';

const API_URL = 'https://authenticity-hackathon.onrender.com/api/performance';

export const getPerformanceData = async () => {
  try {
    const response = await api.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching performance data:', error);
    throw error;
  }
};
