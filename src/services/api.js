import axios from 'axios'
import Constants from 'expo-constants'

const PORT = 3000;
const PROD_URL = 'http://localhost:3000'

// Itt nyernjük ki az Expo fejlesztői IP-t
const debuggerHost =
  Constants.expoConfig?.hostUri || Constants.manifest?.debuggerHost;
const localIP = debuggerHost?.split(':').shift()

const isDev = __DEV__
const BASE_URL = isDev && localIP
  ? `http://${localIP}:${PORT}`
  : PROD_URL;

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
})

export { BASE_URL }
export default instance
//
// Ha nem működik az automatikus IP lehívás akkor a lenti kódot kell aktiválni és az Expo fejlesztői IP-t a BASE_URL-be beírni!
// 
/*
import axios from 'axios'

const BASE_URL = 'http://192.168.0.10:3000'
const PORT = 3000
const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
})

export { BASE_URL }
export default instance
*/