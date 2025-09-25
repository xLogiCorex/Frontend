import axios from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Bejelentkezés funkció
export async function login(email, password) {
    const response = await axios.post('/login', { newEmail: email, newPassword: password });
    const { token, userId } = response.data;
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('userId', String(userId));
    return response.data;
}

// Kijelentkezés Funkció
export async function logout() {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('userId');
}

// Felhasználók lekérése
export async function getUsers(token) {
    const response = await axios.get('/users', {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
}

// Új felhasználó regisztrálása
export async function registerUser(userData, token) {
    const response = await axios.post('/register', userData, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
}

// Felhasználó státuszának aktiválása/inaktiválása
export async function updateUserStatus(id, isActive, token) {
    const response = await axios.put(`/users/${id}/status`, { isActive }, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
}