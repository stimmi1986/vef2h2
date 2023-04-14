import { BaseUrl } from '$/components/Layout';
import axios from 'axios';

const api = axios.create({
  baseURL: `${BaseUrl}/`,
});

const middleware = (token: string) => {
  api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
  console.log('token: ',token)
};

export default middleware;
