import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.0.10:3000',
  timeout: 10000,
});

export default instance;