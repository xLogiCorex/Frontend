import axios from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function login(email, password) {
  const response = await axios.post('/login', { newEmail: email, newPassword: password });
  const { token, userId } = response.data;
  await AsyncStorage.setItem('token', token);
  await AsyncStorage.setItem('userId', String(userId));
  return response.data;
}

export async function logout() {
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('userId');
}