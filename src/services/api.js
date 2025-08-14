import axios from 'axios';

const BASE_URL = 'http://192.168.1.2:3000';

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export {BASE_URL};
export default instance;