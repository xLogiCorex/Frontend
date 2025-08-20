import axios from 'axios';
import Constants from 'expo-constants';

// Backend portszám fejlesztéshez
const PORT = 3000;

// Fix cím éles környezethez
const PROD_URL = 'http://localhost:3000'; // <-- ezt állítsd be

// Megpróbáljuk kinyerni az Expo fejlesztői IP-t
const debuggerHost =
  Constants.expoConfig?.hostUri || Constants.expoConfig?.debuggerHost;
const localIP = debuggerHost?.split(':').shift();

// Eldöntjük, hogy dev vagy prod módban futunk
const isDev = __DEV__; // Expo/React Native automatikusan true dev módban

// Ha dev módban vagyunk és találtunk IP-t → azt használjuk
// Ha nem, akkor fallback a PROD_URL-re
const BASE_URL = isDev && localIP
  ? `http://${localIP}:${PORT}`
  : PROD_URL;

// Axios példány
const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export { BASE_URL };
export default instance;