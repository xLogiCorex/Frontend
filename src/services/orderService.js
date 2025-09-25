import axios from './api';

// Megrendelés létrehozása
export async function createOrder(orderData, token) {
  const response = await axios.post('/orders', orderData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
}

// Megrendelések listázása
export async function getOrders(token) {
  const response = await axios.get('/orders', {
    headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }

// Rendelés részleteinek lekérése
export async function getOrderById(id, token) {
  const response = await axios.get(`/orders/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
}

// Saját megrendelések
export async function getMyOrders(token) {
  const response = await axios.get('/orders/my', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
}

// Megrendelési státusz módosítás + számla létrehozása
export async function updateOrderStatus(id, statusData, token) {
  const response = await axios.put(`/orders/${id}/status`, statusData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
}