import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.1.251:3000',
  timeout: 10000,
});

export default instance;