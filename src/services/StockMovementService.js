import axios from './api';

export async function createMovement(movementData, token) {
  const response = await axios.post('/stock-movements', movementData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
}