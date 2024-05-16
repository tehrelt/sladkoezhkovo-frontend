import { api } from '@/api/axios.config';
import { City } from '@/lib/types/domain/city.dto';
import { ListDto } from '@/lib/types/list.dto';

export class CityService {
  static async create(data: { name: string }): Promise<City> {
    const response = await api.post<City>('/cities', data);
    return response.data;
  }
  static async list(): Promise<ListDto<City>> {
    const response = await api.get<ListDto<City>>('/cities');
    return response.data;
  }

  static async find(id: string): Promise<City> {
    const response = await api.get<City>(`/cities/${id}`);
    return response.data;
  }
}
