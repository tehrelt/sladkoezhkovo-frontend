import { api } from '@/api/axios.config';
import { City } from '@/lib/types/city';

export class CitiesService {
  static async list(): Promise<City[]> {
    const response = await api.get<City[]>('/cities');
    return response.data;
  }

  static async find(id: string): Promise<City> {
    const response = await api.get<City>(`/cities/${id}`);
    return response.data;
  }
}
