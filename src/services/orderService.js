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

export async function getOrderById(orderId, token) {
  const response = await axios.get(`/orders/${orderId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
}

export async function updateOrder(orderId, updateData, token) {
  const response = await axios.put(`/orders/${orderId}`, updateData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
}

export async function deleteOrder(orderId, token) {
  const response = await axios.delete(`/orders/${orderId}`, {
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