import { getAPIUrl } from '@/contsts/api.const';
import axios from 'axios';
import toast from 'react-hot-toast';

const axiosInstance = axios.create({
  baseURL: getAPIUrl(),
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // const token = localStorage?.getItem('token')
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (response?.config?.method !== 'get') toast.success('Удачно');
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      toast.error('Неавторизован! Выполните вход.');
    }
    toast.error('Что то пошло не так');
    return Promise.reject(error);
  },
);

export default axiosInstance;
