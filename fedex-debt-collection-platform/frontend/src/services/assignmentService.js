import { api } from './api';

const API_URL = 'https://authenticity-hackathon.onrender.com/api/assignments';

export const getAssignments = async () => {
  try {
    const response = await api.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching assignments:', error);
    throw error;
  }
};

export const createAssignment = async (assignment) => {
  try {
    const response = await api.post(API_URL, assignment);
    return response.data;
  } catch (error) {
    console.error('Error creating assignment:', error);
    throw error;
  }
};
