import axios from 'axios';
import { API_CONFIG, API_HEADERS } from '../config/api';

const rapidApiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: API_HEADERS,
  timeout: 10000
});

rapidApiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 429) {
      return Promise.reject(new Error('Limite de requêtes atteinte. Veuillez réessayer plus tard.'));
    }
    return Promise.reject(error);
  }
);

export default rapidApiClient;