import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.1.3:3000',
  timeout: 10000,
});

export default instance;