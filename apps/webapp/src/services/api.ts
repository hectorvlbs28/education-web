import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:4500/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const apiService = {
  async get<T>(url: string, params?: any): Promise<T> {
    const response = await axiosInstance.get<T>(url, { params });
    return response.data;
  },

  async post<T>(url: string, data: any): Promise<T> {
    const response = await axiosInstance.post<T>(url, data);
    return response.data;
  },

  async postFile<T>(url: string, data: FormData): Promise<T> {
    const response = await axiosInstance.post<T>(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

export default apiService;
