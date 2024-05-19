import { AccessTokenService } from '@/services/access-token';
import { AuthService } from '@/services/auth.service';
import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  try {
    console.log(config.headers);
    const token = AccessTokenService.get();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {
    console.log('interceptor', e);
  }
  return config;
});

api.interceptors.response.use(
  (config) => config,
  async (error) => {
    console.log(error.response.status);
    if (error.response.status === 401 && !error.config._isRetry) {
      const originalRequest = error.config;
      originalRequest._isRetry = true;
      try {
        const res = await AuthService.refresh();
        return api.request(originalRequest);
      } catch (e) {
        AccessTokenService.remove();
      }
    }
    throw error;
  },
);

export { api };
