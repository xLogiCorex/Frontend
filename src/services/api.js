import axios from 'axios';

const BASE_URL = 'http://192.168.1.251:3000';
=======
// Backend portszám fejlesztéshez
const PORT = 3000;

// Axios példány
const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export { BASE_URL };
export default instance;
