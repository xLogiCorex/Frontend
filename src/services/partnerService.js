import axios from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Partnerek listázása
export async function fetchPartners() {
  const token = await AsyncStorage.getItem('token');
  const response = await axios.get('/partners', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
}

// Új partner létrehozása
export async function createPartner(partnerData, token) {
  const response = await axios.post('/partners', partnerData, {
  headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
}