import { AccessTokenService } from '@/services/access-token';
import { AuthService } from '@/services/auth.service';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4200/api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = AccessTokenService.get();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (config) => config,
  async (error) => {
    if (error.response.status === 401 && !error.config._isRetry) {
      const originalRequest = error.config;
      originalRequest._isRetry = true;
      try {
        const res = await AuthService.refresh();
        return api.request(originalRequest);
      } catch (e) {
        console.log(e);
        AccessTokenService.remove();
      }
    }
    return error;
  },
);

export { api };
