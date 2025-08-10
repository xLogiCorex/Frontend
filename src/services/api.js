import axios from 'axios';

const BASE_URL = 'http://192.168.1.2:3000';

const instance = axios.create({
<<<<<<< Updated upstream
  baseURL: 'http://192.168.1.3:3000',
=======
  baseURL: BASE_URL,
>>>>>>> Stashed changes
  timeout: 10000,
});

export {BASE_URL};
export default instance;