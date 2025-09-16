import axios from './api';


export async function createOrder(orderData, token) {
  const response = await axios.post('/orders', orderData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
}

export async function getOrders(token) {
  const response = await axios.get('/orders', {
    headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }

export async function getOrderById(id, token) {
  const response = await axios.get(`/orders/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
}

export async function updateOrder(id, updateData, token) {
  const response = await axios.put(`/orders/${id}`, updateData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
}

export async function deleteOrder(id, token) {
  const response = await axios.delete(`/orders/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
}

export async function getMyOrders(token) {
  const response = await axios.get('/orders/my', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
}

export async function updateOrderStatus(id, statusData, token) {
  const response = await axios.put(`/orders/${id}/status`, statusData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
}