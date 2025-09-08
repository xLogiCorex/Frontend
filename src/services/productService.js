import axios from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function fetchProducts(query = '') {
  const token = await AsyncStorage.getItem('token');
  const response = await axios.get('/products', {
    headers: { Authorization: `Bearer ${token}` },
    params: { q: query }
  });
  return response.data;
}