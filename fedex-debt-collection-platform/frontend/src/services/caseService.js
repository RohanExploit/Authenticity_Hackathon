import { api } from './api';

const API_URL = 'https://authenticity-hackathon.onrender.com/api/cases';

export const getCases = async () => {
  try {
    const response = await api.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching cases:', error);
    throw error;
  }
};
