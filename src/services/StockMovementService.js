import axios from './api';

// Készletmozgások listázása
export async function getStockMovements(query = {}, token) {
  const response = await axios.get('/stockMovements', {
    headers: { Authorization: `Bearer ${token}` },
    params: query 
  });
  return response.data;
}

// Saját készletmozgások listázása
export async function getMyStockMovements(query = {}, token) {
  const response = await axios.get('/stockMovements/my', {
    headers: { Authorization: `Bearer ${token}` },
    params: query
  });
  return response.data;
}

// Készlet bevételezése
export async function stockIn(movementData, token) {
  const response = await axios.post('/stockMovements/in', movementData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
}

// Készlet kivezetése
export async function stockOut(movementData, token) {
  const response = await axios.post('/stockMovements/out', movementData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
}

// Készlet áthelyezése
export async function stockTransfer(movementData, token) {
  const response = await axios.post('/stockMovements/transfer', movementData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
}