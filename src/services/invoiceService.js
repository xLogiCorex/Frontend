import axios from './api';

export async function generateInvoice(orderId, token) {
  const response = await axios.post(`/Invoice/generate`, { orderId }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
}