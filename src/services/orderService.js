import axios from './api';

export async function createOrder(orderData, token) {
  const response = await axios.post('/orders', orderData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
}