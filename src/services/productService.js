import axios from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Termékek listázása
export async function fetchProducts(query = '') {
  const token = await AsyncStorage.getItem('token');
  const response = await axios.get('/products', {
    headers: { Authorization: `Bearer ${token}` },
    params: { q: query }
  });
  return response.data;
}

// Új termék létrehozása
export async function createProduct(productData, token) {
    const response = await axios.post('/products', productData, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
}

// Termék módosítása
export async function updateProduct(id, productData, token) {
    const response = await axios.put(`/products/${id}`, productData, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
}