import axios from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function fetchProducts() {
  const token = await AsyncStorage.getItem('token');
  const response = await axios.get('/products', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
}