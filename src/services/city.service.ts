import { api } from '@/api/axios.config';
import { City } from '@/lib/types/city.dto';
import { ListDto } from '@/lib/types/list.dto';

export class CityService {
  static async list(): Promise<ListDto<City>> {
    const response = await api.get<ListDto<City>>('/cities');
    return response.data;
  }

  static async find(id: string): Promise<City> {
    const response = await api.get<City>(`/cities/${id}`);
    return response.data;
  }
}
